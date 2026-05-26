<?php
// backend/controllers/ticketController.php

require_once __DIR__ . '/../config/db.php';
require_once __DIR__ . '/../middleware/authMiddleware.php';

class TicketController {
    public static function createTicket($req) {
        $user = AuthMiddleware::protect();
        $body = $req['body'] ?? [];
        $subject = trim($body['subject'] ?? '');
        $description = trim($body['description'] ?? '');
        $priority = trim($body['priority'] ?? 'medium');

        if (empty($subject) || empty($description)) {
            http_response_code(400);
            return [
                'success' => false,
                'error' => 'Subject and description are required.'
            ];
        }

        try {
            $stmt = Database::query(
                "INSERT INTO tickets (user_id, subject, description, priority, status) 
                 VALUES (?, ?, ?, ?, 'open') 
                 RETURNING id, subject, description, priority, status, created_at",
                [$user['id'], $subject, $description, $priority]
            );
            $ticket = $stmt->fetch();
            
            if ($ticket) {
                $ticket['id'] = (int)$ticket['id'];
            }

            http_response_code(201);
            return [
                'success' => true,
                'message' => 'Support ticket raised successfully!',
                'ticket' => $ticket
            ];
        } catch (Exception $e) {
            error_log('❌ Create Ticket Error: ' . $e->getMessage());
            http_response_code(500);
            return [
                'success' => false,
                'error' => 'Server error: Unable to raise ticket.'
            ];
        }
    }

    public static function getUserTickets($req) {
        $user = AuthMiddleware::protect();

        try {
            $stmt = Database::query(
                "SELECT id, subject, description, priority, status, created_at 
                 FROM tickets 
                 WHERE user_id = ? 
                 ORDER BY created_at DESC",
                [$user['id']]
            );
            $tickets = $stmt->fetchAll();

            foreach ($tickets as &$t) {
                $t['id'] = (int)$t['id'];
            }

            return [
                'success' => true,
                'tickets' => $tickets
            ];
        } catch (Exception $e) {
            error_log('❌ Get User Tickets Error: ' . $e->getMessage());
            http_response_code(500);
            return [
                'success' => false,
                'error' => 'Server error: Unable to fetch support tickets.'
            ];
        }
    }
}
