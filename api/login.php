<?php
declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Allow: POST');
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

if (empty($_SERVER['HTTPS']) || $_SERVER['HTTPS'] === 'off') {
    http_response_code(403);
    echo json_encode(['error' => 'HTTPS required']);
    exit;
}

if (isset($_SERVER['HTTP_ORIGIN']) && $_SERVER['HTTP_ORIGIN'] !== 'https://join.devcontain.de') {
    http_response_code(403);
    echo json_encode(['error' => 'Origin not allowed']);
    exit;
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

require_once __DIR__ . '/../../join-private/db.php';

if ((int) ($_SERVER['CONTENT_LENGTH'] ?? 0) > 8192) {
    http_response_code(413);
    echo json_encode(['error' => 'Request too large']);
    exit;
}

$data = json_decode(file_get_contents('php://input'), true);

if (!is_array($data)) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid JSON']);
    exit;
}

$email = $data['email'] ?? null;
$password = $data['password'] ?? null;

if (!is_string($email) || !is_string($password)) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid login data']);
    exit;
}

$email = strtolower(trim($email));

if (!filter_var($email, FILTER_VALIDATE_EMAIL) || strlen($email) > 255 || $password === '') {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid login data']);
    exit;
}

// Limit failed attempts during a rolling 15-minute window.
$ipHash = hash('sha256', $_SERVER['REMOTE_ADDR'] ?? 'unknown');
$emailHash = hash('sha256', $email);

$pdo->exec('DELETE FROM login_attempts WHERE created_at < NOW() - INTERVAL 15 MINUTE');

$stmt = $pdo->prepare(
    'SELECT
        (SELECT COUNT(*) FROM login_attempts WHERE ip_hash = :ip_hash) AS ip_attempts,
        (SELECT COUNT(*) FROM login_attempts WHERE email_hash = :email_hash) AS email_attempts'
);
$stmt->execute(['ip_hash' => $ipHash, 'email_hash' => $emailHash]);
$attempts = $stmt->fetch(PDO::FETCH_ASSOC);

if ((int) $attempts['ip_attempts'] >= 10 || (int) $attempts['email_attempts'] >= 15) {
    http_response_code(429);
    header('Retry-After: 900');
    echo json_encode(['error' => 'Too many login attempts. Please try again later.']);
    exit;
}

$stmt = $pdo->prepare(
    'SELECT id, name, email, password_hash
     FROM users
     WHERE email = :email
     LIMIT 1'
);
$stmt->execute(['email' => $email]);
$user = $stmt->fetch(PDO::FETCH_ASSOC);

if (!$user || !password_verify($password, $user['password_hash'])) {
    $stmt = $pdo->prepare(
        'INSERT INTO login_attempts (ip_hash, email_hash) VALUES (:ip_hash, :email_hash)'
    );
    $stmt->execute(['ip_hash' => $ipHash, 'email_hash' => $emailHash]);

    http_response_code(401);
    echo json_encode(['error' => 'Invalid email or password']);
    exit;
}

session_regenerate_id(true);
$_SESSION['user_id'] = (int) $user['id'];

// Successful logins clear failed attempts for this account and IP pair.
$stmt = $pdo->prepare(
    'DELETE FROM login_attempts WHERE ip_hash = :ip_hash AND email_hash = :email_hash'
);
$stmt->execute(['ip_hash' => $ipHash, 'email_hash' => $emailHash]);

echo json_encode([
    'success' => true,
    'user' => [
        'id' => (int) $user['id'],
        'name' => $user['name'],
        'email' => $user['email']
    ]
]);
