<?php
// backend/services/paymentService.php

require_once __DIR__ . '/../config/db.php';

class PaymentService {
    public static function createRazorpayOrder($amountInINR, $receiptId) {
        $amountInPaise = (int)round($amountInINR * 100);
        $rzpConfig = require __DIR__ . '/../config/razorpay.php';

        if ($rzpConfig['isMockMode']) {
            $mockOrderId = 'order_mock_' . bin2hex(random_bytes(6));
            return [
                'id' => $mockOrderId,
                'entity' => 'order',
                'amount' => $amountInPaise,
                'amount_paid' => 0,
                'amount_due' => $amountInPaise,
                'currency' => 'INR',
                'receipt' => $receiptId,
                'status' => 'created',
                'attempts' => 0,
                'notes' => ['mode' => 'mock'],
                'created_at' => time()
            ];
        }

        // Live Mode cURL execution (zero-dependencies!)
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, 'https://api.razorpay.com/v1/orders');
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_USERPWD, $rzpConfig['keyId'] . ':' . $rzpConfig['keySecret']);
        
        $data = [
            'amount' => $amountInPaise,
            'currency' => 'INR',
            'receipt' => $receiptId,
            'notes' => ['mode' => 'live']
        ];
        
        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
        curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);
        
        $response = curl_exec($ch);
        $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);

        if ($httpCode !== 200) {
            error_log("❌ Razorpay Live Error (HTTP $httpCode): " . $response);
            throw new Exception("Razorpay Order Error: Unable to create live transaction.");
        }

        return json_decode($response, true);
    }

    public static function verifySignature($razorpayOrderId, $razorpayPaymentId, $razorpaySignature) {
        $rzpConfig = require __DIR__ . '/../config/razorpay.php';

        if ($rzpConfig['isMockMode'] || ($razorpayOrderId && strpos($razorpayOrderId, 'order_mock_') === 0)) {
            error_log("⚙️ Skipping HMAC verification for Mock Sandbox Transaction: " . $razorpayOrderId);
            return true;
        }

        try {
            $body = $razorpayOrderId . "|" . $razorpayPaymentId;
            $expectedSignature = hash_hmac('sha256', $body, $rzpConfig['keySecret']);
            
            $isValid = hash_equals($expectedSignature, $razorpaySignature);
            if (!$isValid) {
                error_log("⚠️ Razorpay Signature Validation FAILED!");
                error_log("   Expected: " . $expectedSignature);
                error_log("   Received: " . $razorpaySignature);
            }
            return $isValid;
        } catch (Exception $e) {
            error_log("❌ Cryptographic signature verification error: " . $e->getMessage());
            return false;
        }
    }

    public static function generateInvoiceNumber() {
        try {
            $stmt = Database::query("SELECT COUNT(*) FROM invoices");
            $count = (int)$stmt->fetchColumn() + 1;
            $year = date('Y');
            return "INV-" . $year . "-" . str_pad($count, 5, '0', STR_PAD_LEFT);
        } catch (Exception $e) {
            error_log("Error generating invoice number: " . $e->getMessage());
            return "INV-" . date('Y') . "-" . rand(10000, 99999);
        }
    }
}
