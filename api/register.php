<?php
declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Allow: POST');
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

require_once __DIR__ . '/../../join-private/db.php';

$data = json_decode(file_get_contents('php://input'), true);

if (!is_array($data)) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid JSON']);
    exit;
}

$name = trim((string) ($data['name'] ?? ''));
$email = trim((string) ($data['email'] ?? ''));
$password = $data['password'] ?? '';

if (
    $name === '' ||
    mb_strlen($name) > 100 ||
    !filter_var($email, FILTER_VALIDATE_EMAIL) ||
    strlen($email) > 255 ||
    !is_string($password) ||
    strlen($password) < 5
) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid registration data']);
    exit;
}

$hash = password_hash($password, PASSWORD_DEFAULT);

try {
    $stmt = $pdo->prepare(
        'INSERT INTO users (name, email, password_hash)
         VALUES (:name, :email, :password_hash)'
    );

    $stmt->execute([
        'name' => $name,
        'email' => $email,
        'password_hash' => $hash
    ]);

    $userId = (int) $pdo->lastInsertId();

    $initialData = [
        'todo' => [],
        'done' => [],
        'Urgent' => [],
        'tasksinprogress' => [],
        'awaitingfeedback' => [],
        'contacts' => []
    ];

    $stmt = $pdo->prepare(
        'INSERT INTO user_data (user_id, data)
         VALUES (:user_id, :data)'
    );

    $stmt->execute([
        'user_id' => $userId,
        'data' => json_encode($initialData)
    ]);

    http_response_code(201);
    echo json_encode(['success' => true]);

} catch (PDOException $e) {
    error_log($e->getMessage());

    if ($e->getCode() === '23000') {
        http_response_code(409);
        echo json_encode(['error' => 'Email already registered']);
    } else {
        http_response_code(500);
        echo json_encode(['error' => 'Registration failed']);
    }
}
