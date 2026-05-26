<?php
// backend/config/db.php

class Database {
    private static $pdo = null;

    public static function connect() {
        if (self::$pdo !== null) {
            return self::$pdo;
        }

        $dbUrl = getenv('DATABASE_URL');

        if ($dbUrl) {
            // Support database connection string (e.g. from Heroku/production)
            $dbopts = parse_url($dbUrl);
            $host = $dbopts["host"];
            $port = isset($dbopts["port"]) ? $dbopts["port"] : "5432";
            $user = $dbopts["user"];
            $pass = isset($dbopts["pass"]) ? $dbopts["pass"] : "";
            $dbname = ltrim($dbopts["path"], '/');
            $dsn = "pgsql:host=$host;port=$port;dbname=$dbname";
        } else {
            // Read standard env variables
            $host = getenv('DB_HOST') ?: '127.0.0.1';
            $port = getenv('DB_PORT') ?: '5432';
            $dbname = getenv('DB_NAME') ?: 'ascope_db';
            $user = getenv('DB_USER') ?: 'postgres';
            $pass = getenv('DB_PASSWORD') ?: 'root';
            $dsn = "pgsql:host=$host;port=$port;dbname=$dbname";
        }

        try {
            self::$pdo = new PDO($dsn, $user, $pass, [
                PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                PDO::ATTR_EMULATE_PREPARES => false,
            ]);
            return self::$pdo;
        } catch (PDOException $e) {
            // Gracefully log database connection issues
            error_log("❌ Database Connection Failed: " . $e->getMessage());
            throw $e;
        }
    }

    public static function query($sql, $params = []) {
        $pdo = self::connect();
        $stmt = $pdo->prepare($sql);
        $stmt->execute($params);
        return $stmt;
    }
}
