<?php
// backend/controllers/enrollController.php

require_once __DIR__ . '/../config/db.php';
require_once __DIR__ . '/../middleware/authMiddleware.php';

class EnrollController {
    private static $fallbackFile = __DIR__ . '/../data/enrollments_fallback.json';

    private static function saveFallbackEnrollment($enrollment) {
        try {
            $dir = dirname(self::$fallbackFile);
            if (!is_dir($dir)) {
                mkdir($dir, 0777, true);
            }
            $enrollments = [];
            if (file_exists(self::$fallbackFile)) {
                $enrollments = json_decode(file_get_contents(self::$fallbackFile), true) ?? [];
            }
            $enrollments[] = array_merge([
                'id' => count($enrollments) + 1,
                'status' => 'pending',
                'created_at' => date('c')
            ], $enrollment);
            file_put_contents(self::$fallbackFile, json_encode($enrollments, JSON_PRETTY_PRINT));
        } catch (Exception $e) {
            error_log("❌ Error saving fallback enrollment: " . $e->getMessage());
        }
    }

    public static function submitEnrollment($req) {
        $body = $req['body'] ?? [];
        $courseId = isset($body['courseId']) ? (int)$body['courseId'] : null;
        $fullName = trim($body['fullName'] ?? '');
        $email = trim($body['email'] ?? '');
        $phone = trim($body['phone'] ?? '');

        if (!$courseId || empty($fullName) || empty($email) || empty($phone)) {
            http_response_code(400);
            return [
                'success' => false,
                'message' => 'Please provide all required fields (courseId, fullName, email, phone)'
            ];
        }

        // Check if there is an authenticated user to link user_id if present
        $userId = null;
        try {
            // Optional auth verification
            $userObj = AuthMiddleware::protect();
            $userId = $userObj['id'];
        } catch (Exception $e) {
            // Unauthenticated enrollment is allowed by Node.js endpoint!
        }

        try {
            if ($userId) {
                $stmt = Database::query(
                    "INSERT INTO enrollments (course_id, full_name, email, phone, user_id)
                     VALUES (?, ?, ?, ?, ?) RETURNING *",
                    [$courseId, $fullName, $email, $phone, $userId]
                );
            } else {
                $stmt = Database::query(
                    "INSERT INTO enrollments (course_id, full_name, email, phone)
                     VALUES (?, ?, ?, ?) RETURNING *",
                    [$courseId, $fullName, $email, $phone]
                );
            }
            $row = $stmt->fetch();
            error_log("✅ Enrollment saved to PostgreSQL database successfully.");
            
            // Format ID for response
            if ($row) {
                $row['id'] = (int)$row['id'];
                $row['course_id'] = (int)$row['course_id'];
                if (isset($row['user_id'])) $row['user_id'] = (int)$row['user_id'];
            }
            
            return [
                'success' => true,
                'message' => 'Enrollment successful! Our team will contact you for the next steps.',
                'enrollment' => $row
            ];
        } catch (Exception $dbErr) {
            error_log("⚠️ Database insert failed. Saving enrollment to local JSON data store: " . $dbErr->getMessage());
            $fallbackObj = [
                'id' => time(),
                'course_id' => $courseId,
                'user_id' => $userId,
                'full_name' => $fullName,
                'email' => $email,
                'phone' => $phone,
                'status' => 'pending',
                'created_at' => date('c')
            ];
            self::saveFallbackEnrollment($fallbackObj);
            
            return [
                'success' => true,
                'message' => 'Enrollment successful! Our team will contact you for the next steps.',
                'enrollment' => $fallbackObj
            ];
        }
    }
}
