<?php
// backend/controllers/contactController.php

require_once __DIR__ . '/../config/db.php';

class ContactController {
    private static $fallbackFile = __DIR__ . '/../data/contacts_fallback.json';

    private static function saveFallbackContact($contact) {
        try {
            $dir = dirname(self::$fallbackFile);
            if (!is_dir($dir)) {
                mkdir($dir, 0777, true);
            }
            $contacts = [];
            if (file_exists(self::$fallbackFile)) {
                $contacts = json_decode(file_get_contents(self::$fallbackFile), true) ?? [];
            }
            $contact['id'] = count($contacts) + 1;
            $contact['created_at'] = date('c');
            $contacts[] = $contact;
            file_put_contents(self::$fallbackFile, json_encode($contacts, JSON_PRETTY_PRINT));
        } catch (Exception $e) {
            error_log("❌ Error saving fallback contact: " . $e->getMessage());
        }
    }

    public static function submitContactForm($req) {
        $body = $req['body'] ?? [];
        $firstName = $body['first_name'] ?? $body['firstName'] ?? '';
        $lastName = $body['last_name'] ?? $body['lastName'] ?? '';
        $mobileNumber = $body['mobile_number'] ?? $body['phone'] ?? '';
        $email = $body['email'] ?? '';
        $courseSection = $body['course_section'] ?? $body['course'] ?? '';
        $message = $body['message'] ?? '';

        if (empty($email) || empty($message)) {
            http_response_code(400);
            return [
                'success' => false,
                'message' => 'Please provide at least an email and a message'
            ];
        }

        try {
            Database::query(
                "INSERT INTO contacts (first_name, last_name, email, phone, course, mobile_number, course_section, message) 
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
                [$firstName, $lastName, $email, $mobileNumber, $courseSection, $mobileNumber, $courseSection, $message]
            );
            error_log("✅ Contact saved to PostgreSQL database successfully.");
        } catch (Exception $dbErr) {
            error_log("⚠️ Database insert failed. Saving contact to local JSON data store: " . $dbErr->getMessage());
            self::saveFallbackContact([
                'first_name' => $firstName,
                'last_name' => $lastName,
                'email' => $email,
                'mobile_number' => $mobileNumber,
                'course_section' => $courseSection,
                'message' => $message
            ]);
        }

        return [
            'success' => true,
            'message' => 'Message received! Our counselors will contact you soon.'
        ];
    }
}
