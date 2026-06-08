# Ascope Tech — Advanced Training System Integration

Welcome to the **Ascope Tech** full-stack educational training and operations platform. This repository coordinates a production-grade educational architecture utilizing **React (TypeScript)** on the frontend, a **PHP REST API** on the backend, and a **PostgreSQL** relational database layer.

---

## 🏗️ System Architecture & Flow

The application is organized as a monorepo that supports both segregated development environments and a unified production deployment where the PHP backend serves as a single-page application (SPA) static file host for the compiled React frontend.

```mermaid
graph TD
    subgraph Client [Vite React Client (Port 5173)]
        A["Navbar / Footer Layouts"]
        B["Curriculum & Course details"]
        C["Dashboard (Profile/Settings/Tickets)"]
        D["Console Manager (Admin Portal)"]
    end

    subgraph Server [PHP REST API (Port 5004)]
        E["Router & Environment Loader"]
        F["Auth & JWT Validator"]
        G["Enrollment & Ticket Dispatchers"]
        H["Admin Analytics Engine"]
        I["Payment & Coupon Processor"]
    end

    subgraph Data [Relational Storage]
        J[("PostgreSQL DB (Port 5432)")]
    end

    Client -->|API Requests via Axios| Server
    Server -->|Parameterized SQL via PDO| J
    Server -->|Static Fallback| Client
```

---

## 📂 Project Structure

```filepath
.
├── backend/                       # PHP REST API Backend
│   ├── config/                    # Configuration files
│   │   ├── db.php                 # PostgreSQL connection pool & PDO utility
│   │   └── razorpay.php           # Razorpay SDK configuration & sandbox auto-detection
│   ├── controllers/               # Route controllers handling business logic
│   │   ├── adminController.php    # Analytics and master directories (users, tickets, enrollments)
│   │   ├── authController.php     # JWT auth, profile editing, and user settings
│   │   ├── contactController.php  # Contact / general query form handler
│   │   ├── couponController.php   # Coupon validation and discounts
│   │   ├── courseController.php   # Course catalog CRUD actions
│   │   ├── enrollController.php   # Course enrollment requests
│   │   ├── paymentController.php  # Razorpay order generation & signature verification
│   │   └── ticketController.php   # Support case creation and student directory
│   ├── data/                      # Local storage and persistent logs
│   ├── middleware/                # Route middleware
│   │   └── authMiddleware.php     # JWT extraction and role-based route access validation
│   ├── services/                  # External services integration
│   │   └── paymentService.php     # Business logic wrapper for Razorpay transactions
│   ├── utils/                     # Helper modules
│   │   └── jwt.php                # HS256 JWT encoding, decoding, and verification
│   ├── .env                       # Backend local environment variables
│   ├── .htaccess                  # Apache server routing rewrites
│   ├── index.php                  # Primary API gateway, database migrator, and static host
│   ├── init.sql                   # Raw SQL schema definition for manual imports
│   └── package.json               # Backend script definitions
│
├── frontend/                      # React SPA Frontend
│   ├── public/                    # Static assets
│   ├── src/                       # Application source
│   │   ├── animations/            # Custom Framer Motion transition dynamics
│   │   ├── components/            # Shared UI components
│   │   │   ├── auth/              # Input fields and social action triggers
│   │   │   ├── layout/            # Navigation, Footer, SEO, and scroll handlers
│   │   │   └── ui/                # Glassmorphic cards and animated buttons
│   │   ├── pages/                 # Routing pages
│   │   │   ├── auth/              # Signup & Login views
│   │   │   ├── About.tsx          # Institutional overview
│   │   │   ├── Checkout.tsx       # Razorpay order processing and coupon code apply
│   │   │   ├── Contact.tsx        # Query form with interactive mapping
│   │   │   ├── CourseAdmin.tsx    # Administrative control console
│   │   │   ├── CourseDetails.tsx  # In-depth syllabus and enrollment links
│   │   │   ├── Courses.tsx        # Course catalog cataloging
│   │   │   ├── Dashboard.tsx      # Student ticket center, settings, and profile details
│   │   │   ├── Enrollment.tsx     # Student application entry form
│   │   │   ├── Placements.tsx     # Student outcome metrics and corporate partners
│   │   │   └── Trainers.tsx       # Educator directory
│   │   ├── services/              # API configurations
│   │   │   └── api.ts             # Axios service layer with automated JWT interceptor
│   │   ├── index.css              # Styling configurations
│   │   └── main.tsx               # Client bootstrap entrypoint
│   ├── .env                       # Frontend local configuration (Razorpay key)
│   ├── package.json               # Frontend dependencies and Vite configuration
│   ├── tailwind.config.js         # Custom design system configuration
│   └── tsconfig.json              # TypeScript compilation rules
│
├── package.json                   # Root monorepo orchestrator
└── test_integration.js            # Automated E2E programmatic integration audit
```

---

## 🛠️ Technology Stack

- **Frontend**: React.js 19 + TypeScript + Vite + Framer Motion (premium micro-animations) + Tailwind CSS (featuring a tailored navy, gold, cream, and white visual design).
- **Backend**: PHP (v7.4+) utilizing a custom REST router, PDO database connection layer, HS256 JWT validation, and native multi-part requests.
- **Database Layer**: PostgreSQL (v12+) running on port `5432` with parameterized, injection-proof database statements.
- **Payment Gateway**: Razorpay API integrations with built-in auto-mocking fallback when credentials are not configured.

---

## 📊 Database Schema & Auto-Migrations

On server start, the PHP entry point (`backend/index.php`) executes automated DDL queries to verify and construct the database schema.

### Tables Configured:
1. **`courses`**: Holds course catalog metadata including price tags and media path references.
2. **`contacts`**: Stores generalized customer inquiries and contact forms.
3. **`users`**: Manages credentials, BCRYPT hashed passwords, and system roles (`student`, `admin`).
4. **`enrollments`**: Tracks student course admissions and status updates (`pending`, `approved`, `rejected`). Features a composite unique index on `(user_id, course_id)`.
5. **`tickets`**: Tracks support tickets raised by students (`open`, `resolved`).
6. **`user_settings`**: Stores configuration parameters like email/sms notifications and dark mode.
7. **`coupons`**: Contains code patterns, discount details (flat rates or percentages), and validation requirements.
8. **`payments`**: Coordinates payment details linking user, course, coupon, and Razorpay transaction IDs.
9. **`invoices`**: Holds billing records and PDF references with structured billing details in JSONB.

---

## 🚀 Step-by-Step Launch Guide

### 1. Database Configuration
Ensure a PostgreSQL database is created (e.g., `ascope_db`) and is running locally or remotely (default port: `5432`).

### 2. Environment Setup
Configure environment variables by setting up `.env` files.

#### **Backend (`backend/.env`)**
```ini
PORT=5004
DB_HOST=127.0.0.1
DB_PORT=5432
DB_NAME=ascope_db
DB_USER=postgres
DB_PASSWORD=root
JWT_SECRET=your_super_secret_jwt_key
RAZORPAY_KEY_ID=YOUR_KEY_ID_HERE
RAZORPAY_KEY_SECRET=YOUR_SECRET_KEY_HERE
```
*Note: If Razorpay keys are left as placeholders, the backend dynamically falls back to an automated mock mode.*

#### **Frontend (`frontend/.env`)**
```ini
VITE_API_URL=http://localhost:5004
VITE_RAZORPAY_KEY=YOUR_KEY_ID_HERE
```

---

### 3. Install Dependencies & Run

You can manage both folders from the root directory using the monorepo coordinator:

```bash
# Install dependencies for both frontend and backend
npm run install-all

# Build frontend production assets
npm run build

# Start the PHP backend server
npm start
```

#### **Separate Development Execution**

If you prefer running development servers with hot-reloading:

*   **Backend Server**:
    ```bash
    cd backend
    npm start
    ```
    This launches the built-in PHP server at `http://localhost:5004`. Database tables migrate and default admin user seeds automatically (`admin@ascopetech.com` / `adminpassword`).

*   **Frontend Vite Dev Server**:
    ```bash
    cd frontend
    npm run dev
    ```
    This starts the React client at `http://localhost:5173`.

---

## 📡 API Endpoint Reference

All routes require JSON payload structures where applicable and return consistent responses.

### 🔐 Authentication (`/api/auth`)
*   `POST /api/auth/register` — Registers a student account (defaults to `student` role).
*   `POST /api/auth/login` — Authenticates credentials and returns a signed HS256 JWT token.
*   `GET /api/auth/profile` — Retrieves the profile details of the logged-in user (requires Bearer JWT).
*   `PUT /api/auth/profile` — Modifies registration contacts (requires Bearer JWT).
*   `PUT /api/auth/settings` — Updates notification and preference flags (requires Bearer JWT).

### 📚 Course Catalog (`/api/courses`)
*   `GET /api/courses` — Lists all courses.
*   `POST /api/courses` — Publishes a new course to the database catalog (Admin only).
*   `GET /api/courses/:id` — Details of a specific course.
*   `PUT /api/courses/:id` — Modifies course pricing or details (Admin only).
*   `DELETE /api/courses/:id` — Removes a course catalog entry (Admin only).

### 🎓 Enrollments & Support (`/api/enrollments`, `/api/tickets`)
*   `POST /api/enroll` — Submits a course enrollment request.
*   `POST /api/tickets` — Creates a new support ticket (requires Bearer JWT).
*   `GET /api/tickets` — Lists support tickets raised by the authenticated user (requires Bearer JWT).

### 💳 Payments & Billing (`/api/payment`, `/api/coupon`)
*   `POST /api/coupon/apply` — Validates coupon codes and calculates discount amounts.
*   `POST /api/payment/create-order` — Initiates a Razorpay transaction order (requires Bearer JWT).
*   `POST /api/payment/verify` — Validates Razorpay signatures and generates billing invoices.
*   `GET /api/payment/history` — Lists payment history for the logged-in user.
*   `GET /api/payment/invoice/:id` — Generates and retrieves invoice receipt configurations.

### 👑 Administrative Operations (`/api/admin`)
*   `GET /api/admin/analytics` — Gathers real-time database aggregate metrics (Admin only).
*   `GET /api/admin/users` — Directory list of all registered accounts (Admin only).
*   `GET /api/admin/enrollments` — Master directory of course enrollment forms (Admin only).
*   `PUT /api/admin/enrollments/:id` — Approves (`approved`) or rejects (`rejected`) a student application (Admin only).
*   `GET /api/admin/tickets` — Lists all system support tickets (Admin only).
*   `PUT /api/admin/tickets/:id` — Marks support cases as `resolved` (Admin only).

---

## 🏆 Programmatic Integration Audits

To audit the complete platform loop, the root directory includes a programmatic integration test suite (`test_integration.js`). It simulates a full-cycle student and administrator interaction:

1. **Student Registration**: Creates a new test student.
2. **Student Login**: Validates credentials and retrieves a session token.
3. **Course Seeding**: Adds a test course to the catalog.
4. **Enrollment Submission**: Submits a course admission request.
5. **Support Ticket Routing**: Creates an urgent support request.
6. **Admin Authentication**: Logs in the system administrator.
7. **Analytics Verification**: Fetches real-time counts.
8. **Application Approval**: Resolves the pending student enrollment.
9. **Ticket Resolution**: Marks the support request as resolved.
10. **Database Cleanup**: Cleans up test artifacts to keep the database pristine.

Execute the integration audit using:
```bash
node test_integration.js
```

Successful audits will log the following confirmation:
```text
🎉 ========================================================
🏆 E2E AUDIT RESULTS: ALL 10 STEPS COMPLETED 100% SUCCESSFULLY!
🎉 ========================================================
```
