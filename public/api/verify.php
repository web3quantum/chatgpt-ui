<?php
header('Content-Type: application/json');

require_once __DIR__ . '/../../config/database.php';
require_once __DIR__ . '/../../src/Utils/EmailService.php';

try {
    $data = json_decode(file_get_contents('php://input'), true);
    
    if (!isset($data['walletAddress']) || !isset($data['scaiId']) || !isset($data['email'])) {
        throw new Exception('Missing required fields');
    }

    $db = Database::getInstance()->getConnection();
    $token = bin2hex(random_bytes(32));

    $stmt = $db->prepare('
        INSERT INTO verification_requests (email, scai_id, wallet_address, token)
        VALUES (:email, :scai_id, :wallet_address, :token)
    ');

    $stmt->bindValue(':email', $data['email'], SQLITE3_TEXT);
    $stmt->bindValue(':scai_id', $data['scaiId'], SQLITE3_TEXT);
    $stmt->bindValue(':wallet_address', $data['walletAddress'], SQLITE3_TEXT);
    $stmt->bindValue(':token', $token, SQLITE3_TEXT);

    $stmt->execute();

    $emailService = new Utils\EmailService();
    $emailService->sendVerificationEmail($data['email'], $token);

    echo json_encode(['success' => true, 'message' => 'Verification email sent']);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => $e->getMessage()]);
}