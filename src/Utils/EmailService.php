<?php
namespace Utils;

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

class EmailService {
    private $mailer;

    public function __construct() {
        $this->mailer = new PHPMailer(true);
        $this->setupMailer();
    }

    private function setupMailer() {
        $this->mailer->isSMTP();
        $this->mailer->Host = 'smtp.gmail.com';
        $this->mailer->SMTPAuth = true;
        $this->mailer->Username = EMAIL_FROM;
        $this->mailer->Password = EMAIL_PASSWORD;
        $this->mailer->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $this->mailer->Port = 587;
        $this->mailer->setFrom(EMAIL_FROM);
    }

    public function sendVerificationEmail($email, $token) {
        try {
            $this->mailer->addAddress($email);
            $this->mailer->isHTML(true);
            $this->mailer->Subject = 'Verify your email';
            $this->mailer->Body = $this->getVerificationEmailTemplate($token);
            
            return $this->mailer->send();
        } catch (Exception $e) {
            throw new \Exception('Email could not be sent: ' . $e->getMessage());
        }
    }

    private function getVerificationEmailTemplate($token) {
        $verifyUrl = APP_URL . '/verify.php?token=' . $token;
        return "
            <h1>Email Verification</h1>
            <p>Click the link below to verify your email address:</p>
            <a href='{$verifyUrl}'>Verify Email</a>
        ";
    }
}