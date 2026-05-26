<?php
// backend/controllers/authController.php

require_once __DIR__ . '/../config/db.php';
require_once __DIR__ . '/../utils/jwt.php';
require_once __DIR__ . '/../middleware/authMiddleware.php';

class AuthController {
    public static function register($req) {
        $body = $req['body'] ?? [];
        $fullName = trim($body['fullName'] ?? '');
        $email = trim(strtolower($body['email'] ?? ''));
        $password = $body['password'] ?? '';
        $phone = trim($body['phone'] ?? '');
        $dateOfBirth = trim($body['dateOfBirth'] ?? '');

        if (empty($fullName) || empty($email) || strlen($password) < 6) {
            http_response_code(400);
            return [
                'success' => false,
                'error' => 'Full name, valid email, and password of at least 6 characters are required.'
            ];
        }

        try {
            // 1. Check if user already exists
            $stmt = Database::query('SELECT id FROM users WHERE email = ?', [$email]);
            if ($stmt->fetch()) {
                http_response_code(400);
                return [
                    'success' => false,
                    'error' => 'Email is already in use.'
                ];
            }

            // 2. Hash password (identical crypt/bcrypt algorithm as Node's bcryptjs with salt 10)
            $passwordHash = password_hash($password, PASSWORD_BCRYPT, ['cost' => 10]);

            // 3. Create user in DB
            $stmt = Database::query(
                "INSERT INTO users (full_name, email, password_hash, phone, role, date_of_birth) 
                 VALUES (?, ?, ?, ?, ?, ?) RETURNING id, full_name, email, phone, role, date_of_birth, created_at",
                [$fullName, $email, $passwordHash, !empty($phone) ? $phone : null, 'student', !empty($dateOfBirth) ? $dateOfBirth : null]
            );
            $user = $stmt->fetch();

            // 4. Create default settings
            Database::query(
                "INSERT INTO user_settings (user_id, email_notifications, sms_notifications, dark_mode) 
                 VALUES (?, true, false, false)",
                [$user['id']]
            );

            // 5. Generate JWT token
            $secret = getenv('JWT_SECRET') ?: 'ascope_super_secret_key';
            $token = JWT::sign([
                'id' => $user['id'],
                'email' => $user['email'],
                'role' => $user['role']
            ], $secret);

            http_response_code(201);
            return [
                'success' => true,
                'message' => 'Account created successfully!',
                'token' => $token,
                'user' => [
                    'id' => $user['id'],
                    'fullName' => $user['full_name'],
                    'email' => $user['email'],
                    'phone' => $user['phone'],
                    'role' => $user['role'],
                    'dateOfBirth' => $user['date_of_birth']
                ]
            ];
        } catch (Exception $e) {
            error_log('❌ Registration Error: ' . $e->getMessage());
            http_response_code(500);
            return [
                'success' => false,
                'error' => 'Server error: Unable to create account.'
            ];
        }
    }

    public static function login($req) {
        $body = $req['body'] ?? [];
        $email = trim(strtolower($body['email'] ?? ''));
        $password = $body['password'] ?? '';

        if (empty($email) || empty($password)) {
            http_response_code(400);
            return [
                'success' => false,
                'error' => 'Email and password are required.'
            ];
        }

        try {
            // 1. Fetch user from DB
            $stmt = Database::query('SELECT * FROM users WHERE email = ?', [$email]);
            $user = $stmt->fetch();

            if (!$user) {
                http_response_code(400);
                return [
                    'success' => false,
                    'error' => 'Invalid email or password.'
                ];
            }

            // 2. Verify password
            if (!password_verify($password, $user['password_hash'])) {
                http_response_code(400);
                return [
                    'success' => false,
                    'error' => 'Invalid email or password.'
                ];
            }

            // 3. Generate JWT token
            $secret = getenv('JWT_SECRET') ?: 'ascope_super_secret_key';
            $token = JWT::sign([
                'id' => $user['id'],
                'email' => $user['email'],
                'role' => $user['role']
            ], $secret);

            return [
                'success' => true,
                'message' => 'Logged in successfully!',
                'token' => $token,
                'user' => [
                    'id' => $user['id'],
                    'fullName' => $user['full_name'],
                    'email' => $user['email'],
                    'phone' => $user['phone'],
                    'role' => $user['role']
                ]
            ];
        } catch (Exception $e) {
            error_log('❌ Login Error: ' . $e->getMessage());
            http_response_code(500);
            return [
                'success' => false,
                'error' => 'Server error: Authentication failed.'
            ];
        }
    }

    public static function getProfile($req) {
        $userObj = AuthMiddleware::protect();

        try {
            // 1. Fetch user details
            $stmt = Database::query('SELECT id, full_name, email, phone, role, created_at FROM users WHERE id = ?', [$userObj['id']]);
            $user = $stmt->fetch();

            if (!$user) {
                http_response_code(404);
                return [
                    'success' => false,
                    'error' => 'User not found.'
                ];
            }

            // 2. Fetch user settings
            $stmtSettings = Database::query('SELECT email_notifications, sms_notifications, dark_mode FROM user_settings WHERE user_id = ?', [$userObj['id']]);
            $settings = $stmtSettings->fetch();

            if (!$settings) {
                Database::query("INSERT INTO user_settings (user_id, email_notifications, sms_notifications, dark_mode) VALUES (?, true, false, false)", [$user['id']]);
                $stmtSettings = Database::query('SELECT email_notifications, sms_notifications, dark_mode FROM user_settings WHERE user_id = ?', [$userObj['id']]);
                $settings = $stmtSettings->fetch();
            }

            // 3. Fetch user enrollments (using LOWER(e.email) = $1)
            $stmtEnrollments = Database::query(
                "SELECT e.id as enrollment_id, e.status, e.created_at, c.id as course_id, c.title, c.duration, c.price, c.image 
                 FROM enrollments e 
                 JOIN courses c ON e.course_id = c.id 
                 WHERE LOWER(e.email) = ? 
                 ORDER BY e.created_at DESC",
                [strtolower($user['email'])]
            );
            $enrollments = $stmtEnrollments->fetchAll();

            // Format enrollments output (cast course_id/enrollment_id to integers to match Node.js API format)
            foreach ($enrollments as &$enr) {
                $enr['course_id'] = (int)$enr['course_id'];
                $enr['enrollment_id'] = (int)$enr['enrollment_id'];
            }

            return [
                'success' => true,
                'user' => [
                    'id' => (int)$user['id'],
                    'fullName' => $user['full_name'],
                    'email' => $user['email'],
                    'phone' => $user['phone'],
                    'role' => $user['role'],
                    'createdAt' => $user['created_at']
                ],
                'settings' => [
                    'emailNotifications' => (bool)$settings['email_notifications'],
                    'smsNotifications' => (bool)$settings['sms_notifications'],
                    'darkMode' => (bool)$settings['dark_mode']
                ],
                'enrollments' => $enrollments
            ];
        } catch (Exception $e) {
            error_log('❌ Get Profile Error: ' . $e->getMessage());
            http_response_code(500);
            return [
                'success' => false,
                'error' => 'Server error: Unable to retrieve profile data.'
            ];
        }
    }

    public static function updateProfile($req) {
        $userObj = AuthMiddleware::protect();
        $body = $req['body'] ?? [];
        $fullName = trim($body['fullName'] ?? '');
        $email = trim(strtolower($body['email'] ?? ''));
        $phone = trim($body['phone'] ?? '');

        try {
            // Verify email duplicate if changing
            if (!empty($email)) {
                $stmt = Database::query('SELECT id FROM users WHERE email = ? AND id != ?', [$email, $userObj['id']]);
                if ($stmt->fetch()) {
                    http_response_code(400);
                    return [
                        'success' => false,
                        'error' => 'Email is already in use by another account.'
                    ];
                }
            }

            // Perform DB Update
            $stmt = Database::query(
                "UPDATE users 
                 SET full_name = COALESCE(NULLIF(?, ''), full_name), 
                     email = COALESCE(NULLIF(?, ''), email), 
                     phone = COALESCE(NULLIF(?, ''), phone) 
                 WHERE id = ? 
                 RETURNING id, full_name, email, phone, role",
                [$fullName, $email, $phone, $userObj['id']]
            );
            $updatedUser = $stmt->fetch();

            if (!$updatedUser) {
                http_response_code(404);
                return [
                    'success' => false,
                    'error' => 'User not found.'
                ];
            }

            return [
                'success' => true,
                'message' => 'Profile updated successfully!',
                'user' => [
                    'id' => (int)$updatedUser['id'],
                    'fullName' => $updatedUser['full_name'],
                    'email' => $updatedUser['email'],
                    'phone' => $updatedUser['phone'],
                    'role' => $updatedUser['role']
                ]
            ];
        } catch (Exception $e) {
            error_log('❌ Update Profile Error: ' . $e->getMessage());
            http_response_code(500);
            return [
                'success' => false,
                'error' => 'Server error: Unable to update profile details.'
            ];
        }
    }

    public static function updateSettings($req) {
        $userObj = AuthMiddleware::protect();
        $body = $req['body'] ?? [];
        $emailNotifications = isset($body['emailNotifications']) ? (bool)$body['emailNotifications'] : true;
        $smsNotifications = isset($body['smsNotifications']) ? (bool)$body['smsNotifications'] : false;
        $darkMode = isset($body['darkMode']) ? (bool)$body['darkMode'] : false;

        try {
            $stmt = Database::query(
                "INSERT INTO user_settings (user_id, email_notifications, sms_notifications, dark_mode) 
                 VALUES (?, ?, ?, ?)
                 ON CONFLICT (user_id) 
                 DO UPDATE SET 
                   email_notifications = EXCLUDED.email_notifications,
                   sms_notifications = EXCLUDED.sms_notifications,
                   dark_mode = EXCLUDED.dark_mode,
                   updated_at = CURRENT_TIMESTAMP
                 RETURNING email_notifications, sms_notifications, dark_mode",
                [
                    $userObj['id'],
                    $emailNotifications ? 1 : 0,
                    $smsNotifications ? 1 : 0,
                    $darkMode ? 1 : 0
                ]
            );
            $settings = $stmt->fetch();

            return [
                'success' => true,
                'message' => 'Settings updated successfully!',
                'settings' => [
                    'emailNotifications' => (bool)$settings['email_notifications'],
                    'smsNotifications' => (bool)$settings['sms_notifications'],
                    'darkMode' => (bool)$settings['dark_mode']
                ]
            ];
        } catch (Exception $e) {
            error_log('❌ Update Settings Error: ' . $e->getMessage());
            http_response_code(500);
            return [
                'success' => false,
                'error' => 'Server error: Unable to save preferences.'
            ];
        }
    }
}
