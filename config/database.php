<?php
class Database {
    private static $instance = null;
    private $db;

    private function __construct() {
        try {
            $this->db = new SQLite3(__DIR__ . '/../database/scai_wallet.db');
            $this->createTables();
        } catch (Exception $e) {
            die("Database connection failed: " . $e->getMessage());
        }
    }

    public static function getInstance() {
        if (self::$instance === null) {
            self::$instance = new self();
        }
        return self::$instance;
    }

    private function createTables() {
        $this->db->exec('
            CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                email TEXT UNIQUE NOT NULL,
                password TEXT NOT NULL,
                wallet_address TEXT UNIQUE,
                scai_id TEXT UNIQUE,
                verified INTEGER DEFAULT 0,
                verify_token TEXT UNIQUE,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP
            )
        ');

        $this->db->exec('
            CREATE TABLE IF NOT EXISTS verification_requests (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                email TEXT NOT NULL,
                scai_id TEXT NOT NULL,
                wallet_address TEXT NOT NULL,
                token TEXT UNIQUE NOT NULL,
                verified INTEGER DEFAULT 0,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP
            )
        ');
    }

    public function getConnection() {
        return $this->db;
    }
}