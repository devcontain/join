<?php
declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');

$method = $_SERVER['REQUEST_METHOD'] ?? '';
if ($method !== 'GET' && $method !== 'POST') {
    header('Allow: GET, POST');
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

if (empty($_SERVER['HTTPS']) || $_SERVER['HTTPS'] === 'off') {
    http_response_code(403);
    echo json_encode(['error' => 'HTTPS required']);
    exit;
}

if ($method === 'POST') {
    if (($_SERVER['HTTP_ORIGIN'] ?? '') !== 'https://join.devcontain.de') {
        http_response_code(403);
        echo json_encode(['error' => 'Origin not allowed']);
        exit;
    }

    $contentType = $_SERVER['CONTENT_TYPE'] ?? '';
    if (!preg_match('~^application/json(?:\s*;|\s*$)~i', $contentType)) {
        http_response_code(415);
        echo json_encode(['error' => 'JSON required']);
        exit;
    }

    $maxBytes = 1048576;
    if (isset($_SERVER['CONTENT_LENGTH']) && (int) $_SERVER['CONTENT_LENGTH'] > $maxBytes) {
        http_response_code(413);
        echo json_encode(['error' => 'Data too large']);
        exit;
    }

    $raw = file_get_contents('php://input', false, null, 0, $maxBytes + 1);
    if ($raw === false) {
        http_response_code(400);
        echo json_encode(['error' => 'Invalid data']);
        exit;
    }
    if (strlen($raw) > $maxBytes) {
        http_response_code(413);
        echo json_encode(['error' => 'Data too large']);
        exit;
    }

    $object = json_decode($raw, false);
    if (!$object instanceof stdClass || json_last_error() !== JSON_ERROR_NONE) {
        http_response_code(400);
        echo json_encode(['error' => 'Invalid data']);
        exit;
    }

    $requiredFields = [
        'todo',
        'done',
        'Urgent',
        'tasksinprogress',
        'awaitingfeedback',
        'contacts'
    ];

    foreach ($requiredFields as $field) {
        if (!property_exists($object, $field) || !is_array($object->$field)) {
            http_response_code(400);
            echo json_encode(['error' => 'Invalid data structure']);
            exit;
        }
    }

    $json = $raw;
}

ini_set('session.use_strict_mode', '1');
ini_set('session.use_only_cookies', '1');
session_set_cookie_params([
    'lifetime' => 0,
    'path' => '/',
    'secure' => true,
    'httponly' => true,
    'samesite' => 'Lax'
]);
session_start();

if (!isset($_SESSION['user_id']) || !is_int($_SESSION['user_id']) || $_SESSION['user_id'] <= 0) {
    http_response_code(401);
    echo json_encode(['error' => 'Not authenticated']);
    exit;
}

$userId = $_SESSION['user_id'];

try {
    require_once __DIR__ . '/../../join-private/db.php';

    if ($method === 'GET') {
        $stmt = $pdo->prepare('SELECT data FROM user_data WHERE user_id = :user_id');
        $stmt->execute(['user_id' => $userId]);
        $result = $stmt->fetchColumn();

        if ($result === false) {
            http_response_code(404);
            echo json_encode(['error' => 'User data not found']);
            exit;
        }

        echo $result;
        exit;
    }

    $stmt = $pdo->prepare('UPDATE user_data SET data = :data WHERE user_id = :user_id');
    $stmt->execute(['data' => $json, 'user_id' => $userId]);

    echo json_encode(['success' => true]);
} catch (Throwable $e) {
    error_log($e->getMessage());
    http_response_code(500);
    echo json_encode(['error' => 'Server error']);
}
