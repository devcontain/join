<?php
declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');

ini_set('session.use_strict_mode', '1');

session_set_cookie_params([
    'lifetime' => 0,
    'path' => '/',
    'secure' => true,
    'httponly' => true,
    'samesite' => 'Lax'
]);

session_start();

if (!isset($_SESSION['user_id'])) {
    http_response_code(401);
    echo json_encode(['error' => 'Not authenticated']);
    exit;
}

require_once __DIR__ . '/../../join-private/db.php';

$userId = (int) $_SESSION['user_id'];

if ($_SERVER['REQUEST_METHOD'] === 'GET') {

    $stmt = $pdo->prepare(
        'SELECT data FROM user_data WHERE user_id = :user_id'
    );

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

if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    // Zusätzliche Absicherung gegen fremde Webseiten
    $origin = $_SERVER['HTTP_ORIGIN'] ?? '';

    if ($origin !== 'https://join.devcontain.de') {
        http_response_code(403);
        echo json_encode(['error' => 'Origin not allowed']);
        exit;
    }

    $contentType = $_SERVER['CONTENT_TYPE'] ?? '';

    if (!str_starts_with($contentType, 'application/json')) {
        http_response_code(415);
        echo json_encode(['error' => 'JSON required']);
        exit;
    }

    $raw = file_get_contents('php://input');

    if (strlen($raw) > 1048576) {
        http_response_code(413);
        echo json_encode(['error' => 'Data too large']);
        exit;
    }

    $data = json_decode($raw, true);

    if (!is_array($data) || array_is_list($data)) {
        http_response_code(400);
        echo json_encode(['error' => 'Invalid data']);
        exit;
    }

    $stmt = $pdo->prepare(
        'UPDATE user_data
         SET data = :data
         WHERE user_id = :user_id'
    );

    $stmt->execute([
        'data' => json_encode($data),
        'user_id' => $userId
    ]);

    echo json_encode(['success' => true]);
    exit;
}

header('Allow: GET, POST');
http_response_code(405);
echo json_encode(['error' => 'Method not allowed']);
