<?php
// backend/controllers/adminController.php

require_once __DIR__ . '/../config/db.php';
require_once __DIR__ . '/../middleware/authMiddleware.php';

class AdminController {
    public static function getAnalytics($req) {
        $user = AuthMiddleware::protect();
        AuthMiddleware::authorize($user, 'admin');

        try {
            $usersCount = Database::query('SELECT COUNT(*) FROM users')->fetchColumn();
            $enrollmentsCount = Database::query('SELECT COUNT(*) FROM enrollments')->fetchColumn();
            $coursesCount = Database::query('SELECT COUNT(*) FROM courses')->fetchColumn();
            $ticketsCount = Database::query('SELECT COUNT(*) FROM tickets')->fetchColumn();
            $openTicketsCount = Database::query("SELECT COUNT(*) FROM tickets WHERE status = 'open'")->fetchColumn();
            $resolvedTicketsCount = Database::query("SELECT COUNT(*) FROM tickets WHERE status = 'resolved'")->fetchColumn();
            $contactsCount = Database::query('SELECT COUNT(*) FROM contacts')->fetchColumn();
            
            $revenueSum = Database::query("SELECT SUM(amount) FROM payments WHERE status = 'captured'")->fetchColumn();
            $successPayments = Database::query("SELECT COUNT(*) FROM payments WHERE status = 'captured'")->fetchColumn();
            $failedPayments = Database::query("SELECT COUNT(*) FROM payments WHERE status = 'failed'")->fetchColumn();
            
            $topSellingResult = Database::query("
                SELECT c.title, COUNT(p.id) AS sales_count, COALESCE(SUM(p.amount), 0) AS total_sales 
                FROM payments p 
                JOIN courses c ON p.course_id = c.id 
                WHERE p.status = 'captured' 
                GROUP BY c.title 
                ORDER BY total_sales DESC 
                LIMIT 3
            ")->fetchAll();

            $topCourses = [];
            foreach ($topSellingResult as $row) {
                $topCourses[] = [
                    'title' => $row['title'],
                    'sales_count' => (int)$row['sales_count'],
                    'total_sales' => (float)$row['total_sales']
                ];
            }

            return [
                'success' => true,
                'data' => [
                    'totalUsers' => (int)$usersCount,
                    'totalEnrollments' => (int)$enrollmentsCount,
                    'totalCourses' => (int)$coursesCount,
                    'totalTickets' => (int)$ticketsCount,
                    'openTickets' => (int)$openTicketsCount,
                    'resolvedTickets' => (int)$resolvedTicketsCount,
                    'totalContacts' => (int)$contactsCount,
                    'totalRevenue' => (float)($revenueSum ?: 0),
                    'successfulPayments' => (int)$successPayments,
                    'failedPayments' => (int)$failedPayments,
                    'topCourses' => $topCourses
                ]
            ];
        } catch (Exception $error) {
            error_log('❌ Admin Analytics Error: ' . $error->getMessage());
            http_response_code(500);
            return [
                'success' => false,
                'message' => 'Server error: Unable to retrieve analytics data.'
            ];
        }
    }

    public static function getUsers($req) {
        $user = AuthMiddleware::protect();
        AuthMiddleware::authorize($user, 'admin');

        try {
            $stmt = Database::query('SELECT id, full_name, email, role, phone, created_at FROM users ORDER BY created_at DESC');
            $users = $stmt->fetchAll();

            foreach ($users as &$u) {
                $u['id'] = (int)$u['id'];
            }

            return [
                'success' => true,
                'data' => $users
            ];
        } catch (Exception $error) {
            error_log('❌ Admin Users List Error: ' . $error->getMessage());
            http_response_code(500);
            return [
                'success' => false,
                'message' => 'Server error: Unable to retrieve user database records.'
            ];
        }
    }

    public static function getEnrollments($req) {
        $user = AuthMiddleware::protect();
        AuthMiddleware::authorize($user, 'admin');

        try {
            $stmt = Database::query("
                SELECT e.*, c.title AS course_title 
                FROM enrollments e 
                LEFT JOIN courses c ON e.course_id = c.id 
                ORDER BY e.created_at DESC
            ");
            $enrollments = $stmt->fetchAll();

            foreach ($enrollments as &$e) {
                $e['id'] = (int)$e['id'];
                $e['course_id'] = (int)$e['course_id'];
                if (isset($e['user_id'])) $e['user_id'] = (int)$e['user_id'];
            }

            return [
                'success' => true,
                'data' => $enrollments
            ];
        } catch (Exception $error) {
            error_log('❌ Admin Enrollments List Error: ' . $error->getMessage());
            http_response_code(500);
            return [
                'success' => false,
                'message' => 'Server error: Unable to retrieve enrollment requests.'
            ];
        }
    }

    public static function updateEnrollmentStatus($req) {
        $user = AuthMiddleware::protect();
        AuthMiddleware::authorize($user, 'admin');

        $id = (int)$req['params']['id'];
        $body = $req['body'] ?? [];
        $status = $body['status'] ?? '';

        if (empty($status)) {
            http_response_code(400);
            return [
                'success' => false,
                'message' => 'Status value is required'
            ];
        }

        try {
            $stmt = Database::query(
                'UPDATE enrollments SET status = ? WHERE id = ? RETURNING *',
                [$status, $id]
            );
            $updated = $stmt->fetch();

            if (!$updated) {
                http_response_code(404);
                return [
                    'success' => false,
                    'message' => 'Enrollment record not found'
                ];
            }

            $updated['id'] = (int)$updated['id'];
            $updated['course_id'] = (int)$updated['course_id'];
            if (isset($updated['user_id'])) $updated['user_id'] = (int)$updated['user_id'];

            return [
                'success' => true,
                'message' => 'Enrollment status updated successfully',
                'data' => $updated
            ];
        } catch (Exception $error) {
            error_log('❌ Admin Enrollment Status Update Error: ' . $error->getMessage());
            http_response_code(500);
            return [
                'success' => false,
                'message' => 'Server error: Unable to update enrollment status.'
            ];
        }
    }

    public static function getTickets($req) {
        $user = AuthMiddleware::protect();
        AuthMiddleware::authorize($user, 'admin');

        try {
            $stmt = Database::query("
                SELECT t.*, u.full_name AS student_name, u.email AS student_email 
                FROM tickets t 
                LEFT JOIN users u ON t.user_id = u.id 
                ORDER BY t.created_at DESC
            ");
            $tickets = $stmt->fetchAll();

            foreach ($tickets as &$t) {
                $t['id'] = (int)$t['id'];
                $t['user_id'] = (int)$t['user_id'];
            }

            return [
                'success' => true,
                'data' => $tickets
            ];
        } catch (Exception $error) {
            error_log('❌ Admin Tickets List Error: ' . $error->getMessage());
            http_response_code(500);
            return [
                'success' => false,
                'message' => 'Server error: Unable to retrieve support tickets.'
            ];
        }
    }

    public static function updateTicketStatus($req) {
        $user = AuthMiddleware::protect();
        AuthMiddleware::authorize($user, 'admin');

        $id = (int)$req['params']['id'];
        $body = $req['body'] ?? [];
        $status = $body['status'] ?? '';

        if (empty($status)) {
            http_response_code(400);
            return [
                'success' => false,
                'message' => 'Status is required'
            ];
        }

        try {
            $stmt = Database::query(
                'UPDATE tickets SET status = ? WHERE id = ? RETURNING *',
                [$status, $id]
            );
            $updated = $stmt->fetch();

            if (!$updated) {
                http_response_code(404);
                return [
                    'success' => false,
                    'message' => 'Ticket record not found'
                ];
            }

            $updated['id'] = (int)$updated['id'];
            $updated['user_id'] = (int)$updated['user_id'];

            return [
                'success' => true,
                'message' => 'Ticket status updated successfully',
                'data' => $updated
            ];
        } catch (Exception $error) {
            error_log('❌ Admin Ticket Update Error: ' . $error->getMessage());
            http_response_code(500);
            return [
                'success' => false,
                'message' => 'Server error: Unable to update support ticket.'
            ];
        }
    }
}
