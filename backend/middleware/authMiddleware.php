<?php
// backend/middleware/authMiddleware.php

require_once __DIR__ . '/../utils/jwt.php';

class AuthMiddleware {
    private static function getAuthHeader() {
        if (function_exists('getallheaders')) {
            $headers = getallheaders();
            if (isset($headers['Authorization'])) {
                return $headers['Authorization'];
            }
            if (isset($headers['authorization'])) {
                return $headers['authorization'];
            }
        }
        if (isset($_SERVER['HTTP_AUTHORIZATION'])) {
            return $_SERVER['HTTP_AUTHORIZATION'];
        }
        if (isset($_SERVER['REDIRECT_HTTP_AUTHORIZATION'])) {
            return $_SERVER['REDIRECT_HTTP_AUTHORIZATION'];
        }
        return '';
    }

    public static function protect() {
        $authHeader = self::getAuthHeader();

        if (empty($authHeader) || strpos($authHeader, 'Bearer ') !== 0) {
            self::respondError('Not authorized, no token provided', 401);
        }

        $token = substr($authHeader, 7);
        $secret = getenv('JWT_SECRET') ?: 'ascope_super_secret_key';
        
        $decoded = JWT::decode($token, $secret);
        if (!$decoded) {
            self::respondError('Not authorized, token failed', 401);
        }

        return [
            'id' => $decoded['id'],
            'email' => $decoded['email'],
            'role' => isset($decoded['role']) ? $decoded['role'] : 'student'
        ];
    }

    public static function authorize($user, ...$roles) {
        if (!$user || !in_array($user['role'], $roles)) {
            self::respondError('Forbidden: You do not have permission to access this resource', 403);
        }
    }

    private static function respondError($message, $statusCode = 401) {
        header('Content-Type: application/json');
        http_response_code($statusCode);
        echo json_encode([
            'success' => false,
            'error' => $message
        ]);
        exit;
    }
}
