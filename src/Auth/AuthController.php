<?php
namespace Auth;

require_once __DIR__ . '/../../config/database.php';
require_once __DIR__ . '/../Utils/EmailService.php';

use Database;
use Utils\EmailService;

class AuthController {
    private $db;
    private $emailService;

    public function __construct() {
        $this->db = Database::getInstance()->getConnection();
        $this->emailService = new EmailService();
    }

    public function register($email, $password) {
        try {
            $stmt = $this->db->prepare('SELECT id FROM users WHERE email = :email');
            $stmt->bindValue(':email', $email, SQLITE3_TEXT);
            $result = $stmt->execute();

            if ($result->fetchArray()) {
                return ['error' => 'Email already registered'];
            }

            $hashedPassword = password_hash($password, PASSWORD_DEFAULT);
            $verifyToken = bin2hex(random_bytes(32));

            $stmt = $this->db->prepare('
                INSERT INTO users (email, password, verify_token)
                VALUES (:email, :password, :verify_token)
            ');
            
            $stmt->bindValue(':email', $email, SQLITE3_TEXT);
            $stmt->bindValue(':password', $hashedPassword, SQLITE3_TEXT);
            $stmt->bindValue(':verify_token', $verifyToken, SQLITE3_TEXT);
            
            $stmt->execute();

            $this->emailService->sendVerificationEmail($email, $verifyToken);

            return ['success' => true, 'message' => 'Registration successful'];
        } catch (\Exception $e) {
            return ['error' => 'Registration failed: ' . $e->getMessage()];
        }
    }
}