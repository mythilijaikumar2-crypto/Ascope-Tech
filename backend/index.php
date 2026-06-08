<?php
// backend/index.php

// 1. CORS headers
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');
header('Access-Control-Max-Age: 86400');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// 2. Load .env file
function loadEnv()
{
    $envPath = __DIR__ . '/.env';
    if (!file_exists($envPath)) {
        return;
    }
    $lines = file($envPath, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    foreach ($lines as $line) {
        $line = trim($line);
        if (empty($line) || strpos($line, '#') === 0) {
            continue;
        }
        $parts = explode('=', $line, 2);
        if (count($parts) === 2) {
            $name = trim($parts[0]);
            $value = trim($parts[1]);
            // Remove surrounding quotes
            if (preg_match('/^"($value)"$/', $value)) {
                $value = substr($value, 1, -1);
            }
            if (!array_key_exists($name, $_SERVER) && !array_key_exists($name, $_ENV)) {
                putenv("$name=$value");
                $_ENV[$name] = $value;
                $_SERVER[$name] = $value;
            }
        }
    }
}
loadEnv();

require_once __DIR__ . '/config/db.php';

// 3. Database Initialization / Migrator (identical tables schema, constraints, indices, defaults, and seeds)
function initDB()
{
    try {
        $db = Database::connect();

        // courses
        Database::query("
            CREATE TABLE IF NOT EXISTS courses (
                id SERIAL PRIMARY KEY,
                title VARCHAR(255) NOT NULL,
                category VARCHAR(100) DEFAULT 'Development',
                duration VARCHAR(100),
                rating NUMERIC(3, 2) DEFAULT 4.8,
                price VARCHAR(100),
                original_price VARCHAR(100),
                image TEXT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        ");

        // contacts
        Database::query("
            CREATE TABLE IF NOT EXISTS contacts (
                id SERIAL PRIMARY KEY,
                first_name VARCHAR(100),
                last_name VARCHAR(100),
                email VARCHAR(100) NOT NULL,
                phone VARCHAR(20),
                course VARCHAR(200),
                mobile_number VARCHAR(20),
                course_section VARCHAR(200),
                message TEXT NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        ");

        Database::query("ALTER TABLE contacts ADD COLUMN IF NOT EXISTS course VARCHAR(200)");
        Database::query("ALTER TABLE contacts ADD COLUMN IF NOT EXISTS first_name VARCHAR(100)");
        Database::query("ALTER TABLE contacts ADD COLUMN IF NOT EXISTS last_name VARCHAR(100)");
        Database::query("ALTER TABLE contacts ADD COLUMN IF NOT EXISTS phone VARCHAR(20)");
        Database::query("ALTER TABLE contacts ADD COLUMN IF NOT EXISTS mobile_number VARCHAR(20)");
        Database::query("ALTER TABLE contacts ADD COLUMN IF NOT EXISTS course_section VARCHAR(200)");

        // users
        Database::query("
            CREATE TABLE IF NOT EXISTS users (
                id SERIAL PRIMARY KEY,
                full_name VARCHAR(100) NOT NULL,
                email VARCHAR(100) UNIQUE NOT NULL,
                password_hash TEXT NOT NULL,
                role VARCHAR(20) DEFAULT 'student',
                phone VARCHAR(20),
                date_of_birth VARCHAR(50),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        ");

        Database::query("
            ALTER TABLE users ADD COLUMN IF NOT EXISTS date_of_birth VARCHAR(50);
        ");

        // enrollments
        Database::query("
            CREATE TABLE IF NOT EXISTS enrollments (
                id SERIAL PRIMARY KEY,
                user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
                course_id INTEGER NOT NULL,
                full_name VARCHAR(100) NOT NULL,
                email VARCHAR(100) NOT NULL,
                phone VARCHAR(20) NOT NULL,
                status VARCHAR(20) DEFAULT 'pending',
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        ");

        Database::query("
            ALTER TABLE enrollments ADD COLUMN IF NOT EXISTS user_id INTEGER REFERENCES users(id) ON DELETE CASCADE;
        ");

        // composite unique constraint
        Database::query("
            DO $$
            BEGIN
                IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'unique_user_course') THEN
                    ALTER TABLE enrollments ADD CONSTRAINT unique_user_course UNIQUE (user_id, course_id);
                END IF;
            END;
            $$;
        ");

        // tickets
        Database::query("
            CREATE TABLE IF NOT EXISTS tickets (
                id SERIAL PRIMARY KEY,
                user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
                subject VARCHAR(200) NOT NULL,
                description TEXT NOT NULL,
                priority VARCHAR(20) DEFAULT 'medium',
                status VARCHAR(20) DEFAULT 'open',
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        ");

        // user_settings
        Database::query("
            CREATE TABLE IF NOT EXISTS user_settings (
                id SERIAL PRIMARY KEY,
                user_id INTEGER UNIQUE REFERENCES users(id) ON DELETE CASCADE,
                email_notifications BOOLEAN DEFAULT TRUE,
                sms_notifications BOOLEAN DEFAULT FALSE,
                dark_mode BOOLEAN DEFAULT FALSE,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        ");

        // coupons
        Database::query("
            CREATE TABLE IF NOT EXISTS coupons (
                id SERIAL PRIMARY KEY,
                code VARCHAR(50) UNIQUE NOT NULL,
                discount_type VARCHAR(20) DEFAULT 'percentage',
                discount_value NUMERIC(10, 2) NOT NULL,
                max_discount NUMERIC(10, 2),
                min_cart_value NUMERIC(10, 2) DEFAULT 0.00,
                active BOOLEAN DEFAULT TRUE,
                expires_at TIMESTAMP,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        ");

        // payments
        Database::query("
            CREATE TABLE IF NOT EXISTS payments (
                id SERIAL PRIMARY KEY,
                user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
                course_id INTEGER REFERENCES courses(id) ON DELETE CASCADE,
                coupon_id INTEGER REFERENCES coupons(id) ON DELETE SET NULL,
                razorpay_order_id VARCHAR(255) UNIQUE,
                razorpay_payment_id VARCHAR(255) UNIQUE,
                razorpay_signature VARCHAR(255),
                amount NUMERIC(10, 2) NOT NULL,
                currency VARCHAR(10) DEFAULT 'INR',
                status VARCHAR(50) DEFAULT 'created',
                error_code VARCHAR(100),
                error_description TEXT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        ");

        // invoices
        Database::query("
            CREATE TABLE IF NOT EXISTS invoices (
                id SERIAL PRIMARY KEY,
                payment_id INTEGER UNIQUE REFERENCES payments(id) ON DELETE CASCADE,
                invoice_number VARCHAR(100) UNIQUE NOT NULL,
                issue_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                pdf_url TEXT,
                billing_details JSONB NOT NULL,
                subtotal NUMERIC(10, 2) NOT NULL,
                discount NUMERIC(10, 2) DEFAULT 0.00,
                tax NUMERIC(10, 2) DEFAULT 0.00,
                total NUMERIC(10, 2) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        ");

        Database::query("CREATE INDEX IF NOT EXISTS idx_payments_user ON payments(user_id)");
        Database::query("CREATE INDEX IF NOT EXISTS idx_payments_order ON payments(razorpay_order_id)");
        Database::query("CREATE INDEX IF NOT EXISTS idx_invoices_payment ON invoices(payment_id)");
        Database::query("CREATE INDEX IF NOT EXISTS idx_enrollments_user ON enrollments(user_id)");

        // Seed mock coupons if empty
        $couponCount = (int) Database::query("SELECT COUNT(*) FROM coupons")->fetchColumn();
        if ($couponCount === 0) {
            Database::query("
                INSERT INTO coupons (code, discount_type, discount_value, max_discount, min_cart_value, expires_at) VALUES
                ('WELCOME10', 'percentage', 10.00, 2000.00, 0.00, CURRENT_TIMESTAMP + INTERVAL '1 year'),
                ('FLAT5000', 'flat', 5000.00, NULL, 10000.00, CURRENT_TIMESTAMP + INTERVAL '6 months'),
                ('ELITE20', 'percentage', 20.00, 5000.00, 12000.00, CURRENT_TIMESTAMP + INTERVAL '3 months');
            ");
            error_log("🌱 Seeded mock coupons successfully.");
        }

        // Seed default admin if empty
        $adminCount = (int) Database::query("SELECT COUNT(*) FROM users WHERE role = 'admin'")->fetchColumn();
        if ($adminCount === 0) {
            $hashedPw = password_hash('adminpassword', PASSWORD_BCRYPT, ['cost' => 10]);
            Database::query("
                INSERT INTO users (full_name, email, password_hash, role)
                VALUES ('Ascope Admin', 'admin@ascopetech.com', ?, 'admin')
            ", [$hashedPw]);
            error_log("🌱 Default Admin User Seeded successfully.");
        }

        // Seed courses catalog if empty
        $coursesCount = (int) Database::query("SELECT COUNT(*) FROM courses")->fetchColumn();
        if ($coursesCount === 0) {
            Database::query("
                INSERT INTO courses (title, category, duration, rating, price, original_price, image) VALUES 
                ('Python Full Course', 'Development', '3 Months', 4.8, '₹11,999', '₹14,399', '/images/pythonfullcourse.png'),
                ('Java Full Stack Development', 'Development', '6 Months', 4.9, '₹19,999', '₹23,999', '/images/javafullstack.png'),
                ('Cyber Security and Ethical Hacking', 'Development', '6 Months', 4.9, '₹25,999', '₹31,199', '/images/cybersecurityimg.png'),
                ('Cloud Computing', 'Development', '4 Months', 4.7, '₹14,999', '₹17,999', '/images/cloudimg.png'),
                ('Mastering in Python and C Programming', 'Development', '3 Months', 4.8, '₹19,999', '₹23,999', '/images/pythoncimg.png'),
                ('Digital Marketing', 'Marketing', '3 Months', 4.6, '₹9,999', '₹11,999', '/images/digitalmarketing.png'),
                ('UI/UX Design', 'Design', '3 Months', 4.8, '₹9,999', '₹11,999', '/images/uiuximg.png'),
                ('Data Science and Machine Learning', 'Data Science', '6 Months', 4.9, '₹19,999', '₹23,999', '/images/datascienceandmachinelerning.png'),
                ('Python and Data Science', 'Data Science', '4 Months', 4.8, '₹16,999', '₹20,399', '/images/pythonanddatascienc.png');
            ");
            error_log("🌱 Seed data inserted into 'courses' table.");
        }

        error_log("✅ Database initialized successfully.");
    } catch (Exception $e) {
        error_log("❌ Database migration/seed error: " . $e->getMessage());
    }
}
initDB();

// 4. API Routing & Request Parsing
$requestUri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$method = $_SERVER['REQUEST_METHOD'];

// Parse incoming request body
$rawBody = file_get_contents('php://input');
$body = json_decode($rawBody, true) ?? [];

$req = [
    'method' => $method,
    'query' => $_GET,
    'body' => $body,
    'params' => []
];

// Clean path
$path = trim($requestUri, '/');

// Include Controller files
require_once __DIR__ . '/controllers/authController.php';
require_once __DIR__ . '/controllers/courseController.php';
require_once __DIR__ . '/controllers/contactController.php';
require_once __DIR__ . '/controllers/enrollController.php';
require_once __DIR__ . '/controllers/ticketController.php';
require_once __DIR__ . '/controllers/adminController.php';
require_once __DIR__ . '/controllers/couponController.php';
require_once __DIR__ . '/controllers/paymentController.php';

// Helper to match paths with params (e.g. api/courses/5)
function matchRoute($pattern, $path, &$params)
{
    $patternParts = explode('/', trim($pattern, '/'));
    $pathParts = explode('/', trim($path, '/'));

    if (count($patternParts) !== count($pathParts)) {
        return false;
    }

    foreach ($patternParts as $index => $part) {
        if (strpos($part, ':') === 0) {
            $paramName = substr($part, 1);
            $params[$paramName] = $pathParts[$index];
        } elseif ($part !== $pathParts[$index]) {
            return false;
        }
    }

    return true;
}

// Router handler
$response = null;
$handled = false;

// 1. API routes
if (strpos($path, 'api') === 0) {
    header('Content-Type: application/json');

    try {
        if ($method === 'POST' && ($path === 'api/auth/register' || $path === 'api/register')) {
            $response = AuthController::register($req);
            $handled = true;
        } elseif ($method === 'POST' && ($path === 'api/auth/login' || $path === 'api/login')) {
            $response = AuthController::login($req);
            $handled = true;
        } elseif ($method === 'GET' && $path === 'api/auth/profile') {
            $response = AuthController::getProfile($req);
            $handled = true;
        } elseif ($method === 'PUT' && $path === 'api/auth/profile') {
            $response = AuthController::updateProfile($req);
            $handled = true;
        } elseif ($method === 'PUT' && $path === 'api/auth/settings') {
            $response = AuthController::updateSettings($req);
            $handled = true;
        } elseif ($method === 'GET' && $path === 'api/courses') {
            $response = CourseController::getAllCourses($req);
            $handled = true;
        } elseif ($method === 'POST' && $path === 'api/courses') {
            $response = CourseController::createCourse($req);
            $handled = true;
        } elseif (matchRoute('api/courses/:id', $path, $params)) {
            $req['params'] = $params;
            if ($method === 'GET') {
                $response = CourseController::getCourseById($req);
            } elseif ($method === 'PUT') {
                $response = CourseController::updateCourse($req);
            } elseif ($method === 'DELETE') {
                $response = CourseController::deleteCourse($req);
            }
            $handled = true;
        } elseif ($method === 'POST' && $path === 'api/contact') {
            $response = ContactController::submitContactForm($req);
            $handled = true;
        } elseif ($method === 'POST' && ($path === 'api/enroll' || $path === 'api/enrollments')) {
            $response = EnrollController::submitEnrollment($req);
            $handled = true;
        } elseif ($method === 'POST' && $path === 'api/tickets') {
            $response = TicketController::createTicket($req);
            $handled = true;
        } elseif ($method === 'GET' && $path === 'api/tickets') {
            $response = TicketController::getUserTickets($req);
            $handled = true;
        } elseif ($method === 'GET' && $path === 'api/admin/analytics') {
            $response = AdminController::getAnalytics($req);
            $handled = true;
        } elseif ($method === 'GET' && $path === 'api/admin/users') {
            $response = AdminController::getUsers($req);
            $handled = true;
        } elseif ($method === 'GET' && $path === 'api/admin/enrollments') {
            $response = AdminController::getEnrollments($req);
            $handled = true;
        } elseif (matchRoute('api/admin/enrollments/:id', $path, $params)) {
            $req['params'] = $params;
            if ($method === 'PUT') {
                $response = AdminController::updateEnrollmentStatus($req);
            }
            $handled = true;
        } elseif ($method === 'GET' && $path === 'api/admin/tickets') {
            $response = AdminController::getTickets($req);
            $handled = true;
        } elseif (matchRoute('api/admin/tickets/:id', $path, $params)) {
            $req['params'] = $params;
            if ($method === 'PUT') {
                $response = AdminController::updateTicketStatus($req);
            }
            $handled = true;
        } elseif ($method === 'POST' && $path === 'api/coupon/apply') {
            $response = CouponController::applyCoupon($req);
            $handled = true;
        } elseif ($method === 'POST' && $path === 'api/payment/create-order') {
            $response = PaymentController::createOrder($req);
            $handled = true;
        } elseif ($method === 'POST' && $path === 'api/payment/verify') {
            $response = PaymentController::verifyPayment($req);
            $handled = true;
        } elseif ($method === 'GET' && $path === 'api/payment/history') {
            $response = PaymentController::getHistory($req);
            $handled = true;
        } elseif (matchRoute('api/payment/invoice/:id', $path, $params)) {
            $req['params'] = $params;
            if ($method === 'GET') {
                $response = PaymentController::getInvoice($req);
            }
            $handled = true;
        } elseif ($method === 'GET' && $path === 'api/trainers') {
            $response = [
                'data' => [
                    [
                        'id' => 1,
                        'name' => 'Mr Aswinraj',
                        'role' => 'Senior Full Stack Developer',
                        'company' => 'Zoho - Software Developer Engineer',
                        'skills' => ['React', 'Node.js', 'MongoDB', 'AWS', 'Docker'],
                        'color' => 'bg-[#0f172a]',
                        'emoji' => '👨‍💻',
                        'socials' => ['linkedin' => 'https://linkedin.com', 'github' => 'https://github.com', 'web' => 'https://ascope.tech']
                    ],
                    [
                        'id' => 2,
                        'name' => 'Ms Mahalakshmi V',
                        'role' => 'Java & DevOps Expert',
                        'company' => 'LT Mindtree - 2 Years Experience',
                        'skills' => ['Java', 'Spring Boot', 'Jenkins'],
                        'color' => 'bg-[#083344]',
                        'emoji' => '☕',
                        'socials' => ['linkedin' => 'https://linkedin.com', 'github' => 'https://github.com', 'web' => 'https://ascope.tech']
                    ],
                    [
                        'id' => 3,
                        'name' => 'Mr Keerthivasan VR',
                        'role' => 'UI/UX Design Expert & Digital Marketing Specialist',
                        'company' => 'Ex- Infinity notion - 5 Years Experience',
                        'skills' => ['Figma', 'Adobe XD', 'Prototyping', 'Research'],
                        'color' => 'bg-[#581c87]',
                        'emoji' => '🎨',
                        'socials' => ['linkedin' => 'https://linkedin.com', 'github' => 'https://github.com', 'web' => 'https://ascope.tech']
                    ],
                    [
                        'id' => 4,
                        'name' => 'Priya',
                        'role' => 'Business Analytics Expert',
                        'company' => 'LT Mindtree - 2 Years Experience',
                        'skills' => ['Excel', 'Tableau', 'SAP', 'JIRA'],
                        'color' => 'bg-[#064e3b]',
                        'emoji' => '📈',
                        'socials' => ['linkedin' => 'https://linkedin.com', 'github' => 'https://github.com', 'web' => 'https://ascope.tech']
                    ],
                    [
                        'id' => 5,
                        'name' => 'Ms Yashmeen',
                        'role' => 'Data Science Lead',
                        'company' => 'Trainer On Ascope Tech',
                        'skills' => ['Python', 'ML', 'TensorFlow', 'SQL', 'Power BI'],
                        'color' => 'bg-[#064e3b]',
                        'emoji' => '👩‍🔬',
                        'socials' => ['linkedin' => 'https://linkedin.com', 'github' => 'https://github.com', 'web' => 'https://ascope.tech']
                    ],
                    [
                        'id' => 6,
                        'name' => 'Ms Brindha A',
                        'role' => 'Junior Full Stack Developer',
                        'company' => 'Ascope Tech - Core Developer',
                        'skills' => ['React', 'Node.js', 'Express.js', 'Tailwind CSS', 'MongoDB', 'Git'],
                        'color' => 'bg-[#075a97]',
                        'emoji' => '👩‍💻',
                        'socials' => ['linkedin' => 'https://linkedin.com', 'github' => 'https://github.com', 'web' => 'https://ascope.tech']
                    ],
                    [
                        'id' => 7,
                        'name' => 'Ms Dharshini S',
                        'role' => 'Data Science, Machine Learning & Data Analytics',
                        'company' => 'Ascope Tech - AI Specialist',
                        'skills' => ['Python', 'Machine Learning', 'Data Analytics', 'Pandas', 'SQL', 'Scikit-Learn'],
                        'color' => 'bg-[#10b981]',
                        'emoji' => '👩‍🔬',
                        'socials' => ['linkedin' => 'https://linkedin.com', 'github' => 'https://github.com', 'web' => 'https://ascope.tech']
                    ],
                    [
                        'id' => 8,
                        'name' => 'Mr Sathiyanarayana J',
                        'role' => 'Cybersecurity & Ethical Hacking',
                        'company' => 'Ascope Tech - Security Lead',
                        'skills' => ['Ethical Hacking', 'Penetration Testing', 'Linux', 'Network Security', 'Wireshark', 'Metasploit'],
                        'color' => 'bg-[#6366f1]',
                        'emoji' => '👨‍💻',
                        'socials' => ['linkedin' => 'https://linkedin.com', 'github' => 'https://github.com', 'web' => 'https://ascope.tech']
                    ]
                ]
            ];
            $handled = true;
        } elseif ($method === 'GET' && $path === 'api/placements') {
            $response = [
                ['id' => 1, 'studentName' => 'Rahul S.', 'company' => 'Google', 'role' => 'Software Engineer'],
                ['id' => 2, 'studentName' => 'Priya K.', 'company' => 'Amazon', 'role' => 'Data Analyst']
            ];
            $handled = true;
        }

        if ($handled) {
            echo json_encode($response);
            exit;
        } else {
            http_response_code(404);
            echo json_encode(['error' => 'API Route Not Found']);
            exit;
        }
    } catch (Exception $e) {
        error_log("❌ API Processing Error: " . $e->getMessage());
        http_response_code(500);
        echo json_encode(['error' => 'Something went wrong: ' . $e->getMessage()]);
        exit;
    }
}

// 5. Serve React Production Build (SPA Static server fallback)
$frontendDistPath = dirname(__DIR__) . '/frontend/dist';

if (is_dir($frontendDistPath)) {
    // Determine target file
    $targetFile = $frontendDistPath . $requestUri;

    if (is_file($targetFile)) {
        // Resolve Content-Type
        $ext = strtolower(pathinfo($targetFile, PATHINFO_EXTENSION));
        $mimes = [
            'html' => 'text/html',
            'css' => 'text/css',
            'js' => 'application/javascript',
            'json' => 'application/json',
            'png' => 'image/png',
            'jpg' => 'image/jpeg',
            'jpeg' => 'image/jpeg',
            'gif' => 'image/gif',
            'svg' => 'image/svg+xml',
            'ico' => 'image/x-icon'
        ];
        $contentType = $mimes[$ext] ?? 'text/plain';
        header("Content-Type: $contentType");
        readfile($targetFile);
        exit;
    } elseif (file_exists($frontendDistPath . '/index.html')) {
        header("Content-Type: text/html");
        readfile($frontendDistPath . '/index.html');
        exit;
    }
}

// Fallback response if dist is not compiled
header('Content-Type: application/json');
echo json_encode(['message' => 'Welcome to Ascope Tech Professional PHP API']);
exit;
