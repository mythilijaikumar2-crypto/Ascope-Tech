import React, { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Shield,
  Layers,
  BookOpen,
  Users,
  LifeBuoy,
  TrendingUp,
  Plus,
  Check,
  X,
  Lock,
  Mail,
  ArrowRight,
} from "lucide-react";
import { authService } from "../services/authService";
import { getCourses, createCourse } from "../services/courseService";
import * as adminService from "../services/adminService";

interface Course {
  id?: number;
  title: string;
  price: string;
  duration: string;
}

const CourseAdmin: React.FC = () => {
  const [isAdmin, setIsAdmin] = useState(() => {
    const user = authService.getCurrentUser();
    const token = localStorage.getItem("user_token");
    return !!(token && user && user.role === "admin");
  });
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<
    "analytics" | "courses" | "enrollments" | "users" | "tickets"
  >("analytics");

  // Authentication Check states
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);

  // System Data states
  const [courses, setCourses] = useState<Course[]>([]);
  const [users, setUsers] = useState<adminService.AdminUser[]>([]);
  const [enrollments, setEnrollments] = useState<adminService.AdminEnrollment[]>([]);
  const [tickets, setTickets] = useState<adminService.AdminTicket[]>([]);
  const [analytics, setAnalytics] = useState<adminService.AdminAnalytics>({
    totalUsers: 0,
    totalEnrollments: 0,
    totalCourses: 0,
    totalTickets: 0,
    openTickets: 0,
    resolvedTickets: 0,
    totalContacts: 0,
  });

  // Course Form state
  const [newCourse, setNewCourse] = useState<Course>({
    title: "",
    price: "",
    duration: "",
  });

  // Check auth roles
  const checkAdminAuth = useCallback(() => {
    const user = authService.getCurrentUser();
    const token = localStorage.getItem("user_token");
    return !!(token && user && user.role === "admin");
  }, []);

  // Fetch admin console metrics
  const fetchAdminData = useCallback(async () => {
    try {
      Promise.resolve().then(() => setLoading(true));
      const [analyticsRes, coursesRes, usersRes, enrollmentsRes, ticketsRes] =
        await Promise.all([
          adminService.getAdminAnalytics().catch(() => null),
          getCourses().catch(() => []),
          adminService.getAdminUsers().catch(() => []),
          adminService.getAdminEnrollments().catch(() => []),
          adminService.getAdminTickets().catch(() => []),
        ]);

      if (analyticsRes) setAnalytics(analyticsRes);
      if (coursesRes) setCourses(coursesRes);
      if (usersRes) setUsers(usersRes);
      if (enrollmentsRes) setEnrollments(enrollmentsRes);
      if (ticketsRes) setTickets(ticketsRes);

      // Recompute local analytics in case backend counts require fallback
      if (!analyticsRes) {
        setAnalytics({
          totalUsers: usersRes.length,
          totalEnrollments: enrollmentsRes.length,
          totalCourses: coursesRes.length,
          totalTickets: ticketsRes.length,
          openTickets: ticketsRes.filter((t) => t.status === "open").length,
          resolvedTickets: ticketsRes.filter((t) => t.status === "resolved")
            .length,
          totalContacts: 0,
        });
      }
      setLoading(false);
    } catch (err) {
      console.error("❌ Admin Data Loading Error:", err);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const authorized = checkAdminAuth();
    if (authorized) {
      Promise.resolve().then(() => {
        fetchAdminData();
      });
    } else {
      Promise.resolve().then(() => setLoading(false));
    }
  }, [checkAdminAuth, fetchAdminData]);

  // Handle nested admin login
  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    setLoginLoading(true);

    try {
      const res = await authService.login({
        email: loginEmail,
        password: loginPassword,
      });
      if (res.success && res.user.role === "admin") {
        setIsAdmin(true);
        fetchAdminData();
      } else {
        authService.logout();
        setLoginError("Access denied: You are not authorized as an administrator.");
      }
      setLoginLoading(false);
    } catch (err: unknown) {
      console.error(err);
      const apiErr = err as { error?: string };
      setLoginError(apiErr.error || "Login credentials failed.");
      setLoginLoading(false);
    }
  };

  // Create course action
  const handleAddCourse = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createCourse(newCourse);
      setNewCourse({ title: "", price: "", duration: "" });
      fetchAdminData();
    } catch (err) {
      console.error(err);
      alert("Failed to add course catalog.");
    }
  };

  // Change Student Enrollment Status
  const handleUpdateEnrollment = async (
    id: number,
    status: "approved" | "rejected"
  ) => {
    try {
      await adminService.updateEnrollmentStatus(id, status);
      fetchAdminData();
    } catch (err) {
      console.error(err);
      alert("Failed to update student enrollment status.");
    }
  };

  // Solve student Support Tickets
  const handleResolveTicket = async (id: number) => {
    try {
      await adminService.updateTicketStatus(id, "resolved");
      fetchAdminData();
    } catch (err) {
      console.error(err);
      alert("Failed to mark ticket as resolved.");
    }
  };

  // Render Restrict Access layout if not admin
  if (!isAdmin) {
    return (
      <div className="min-h-screen pt-36 pb-24 bg-white flex items-center justify-center font-sans px-6 relative overflow-hidden">
        {/* Decor Circles */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[80px]" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md bg-white border border-border/80 rounded-[40px] p-8 lg:p-10 shadow-premium z-10 space-y-8 relative overflow-hidden"
        >
          {/* Card Accent */}
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary via-navy to-accent" />

          <div className="text-center space-y-3">
            <div className="w-16 h-16 bg-navy/10 rounded-2xl flex items-center justify-center text-navy mx-auto border border-navy/10">
              <Lock size={32} />
            </div>
            <h2 className="text-3xl font-black text-navy tracking-tight">
              Admin Portal
            </h2>
            <p className="text-navy/50 text-xs font-semibold">
              Restricted Area. Please verify administrator credentials.
            </p>
          </div>

          <form onSubmit={handleAdminLogin} className="space-y-4">
            <div className="relative group">
              <div className="absolute left-5 top-1/2 -translate-y-1/2 text-navy/20 group-focus-within:text-primary transition-colors">
                <Mail size={18} />
              </div>
              <input
                type="email"
                required
                placeholder="Admin Email Address"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                className="w-full pl-14 pr-6 py-4.5 rounded-2xl bg-sky/20 border-2 border-transparent focus:border-primary/20 focus:bg-white outline-none transition-all font-bold text-navy text-sm placeholder:text-navy/20"
              />
            </div>

            <div className="relative group">
              <div className="absolute left-5 top-1/2 -translate-y-1/2 text-navy/20 group-focus-within:text-primary transition-colors">
                <Lock size={18} />
              </div>
              <input
                type="password"
                required
                placeholder="Secret Password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                className="w-full pl-14 pr-6 py-4.5 rounded-2xl bg-sky/20 border-2 border-transparent focus:border-primary/20 focus:bg-white outline-none transition-all font-bold text-navy text-sm placeholder:text-navy/20"
              />
            </div>

            {loginError && (
              <div className="p-4 bg-red-500/10 text-red-500 rounded-xl text-xs font-black text-center border border-red-500/20">
                {loginError}
              </div>
            )}

            <button
              type="submit"
              disabled={loginLoading}
              className="w-full py-5 bg-primary text-white font-black text-xs uppercase tracking-widest rounded-2xl transition-all shadow-xl shadow-primary/20 hover:scale-105 hover:bg-primary/95 flex items-center justify-center gap-3"
            >
              <span>{loginLoading ? "Verifying..." : "SECURE LOGIN"}</span>
              <ArrowRight size={16} />
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 bg-white min-h-screen font-sans relative overflow-x-hidden">
      {/* Decorative Blur Layers */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 space-y-12">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-border/40">
          <div className="space-y-2">
            <span className="text-[10px] font-black uppercase tracking-[0.25em] text-primary block">
              MANAGEMENT CENTER
            </span>
            <h1 className="text-4xl lg:text-5xl font-heading font-black text-navy tracking-tighter flex items-center gap-3">
              <Shield className="text-primary" size={36} />
              <span>Admin Console</span>
            </h1>
          </div>

          {/* Quick Stats overview */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                authService.logout();
                setIsAdmin(false);
              }}
              className="px-5 py-2.5 bg-navy/5 text-navy hover:bg-red-500/10 hover:text-red-500 border border-border rounded-xl text-xs font-black uppercase tracking-wider transition-all"
            >
              Log Out Admin
            </button>
          </div>
        </div>

        {/* Console Nav Tabs */}
        <div className="flex overflow-x-auto flex-nowrap gap-3 pb-2 no-scrollbar scroll-smooth">
          {[
            { id: "analytics", label: "Overview Metrics", Icon: TrendingUp },
            { id: "courses", label: "Course Catalog", Icon: BookOpen },
            { id: "enrollments", label: "Applications", Icon: Layers },
            { id: "users", label: "User Accounts", Icon: Users },
            { id: "tickets", label: "Support Cases", Icon: LifeBuoy },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`px-6 py-3.5 text-xs font-black uppercase tracking-widest rounded-xl transition-all duration-300 border flex items-center gap-3 shrink-0 ${activeTab === tab.id
                  ? "bg-navy text-white shadow-xl scale-105 border-navy"
                  : "bg-white text-navy/60 hover:bg-sky border-border"
                }`}
            >
              <tab.Icon size={16} />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Main Tab Render Space */}
        <AnimatePresence mode="wait">
          {loading ? (
            <div className="flex justify-center items-center py-32">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
          ) : (
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="space-y-8"
            >
              {/* TAB 1: ANALYTICS OVERVIEW */}
              {activeTab === "analytics" && (
                <div className="space-y-10">
                  {/* Stats Cards grid */}
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                    {[
                      {
                        title: "Total Students",
                        val: analytics.totalUsers,
                        color: "text-primary bg-primary/10",
                      },
                      {
                        title: "Course Enrollments",
                        val: analytics.totalEnrollments,
                        color: "text-emerald-500 bg-emerald-500/10",
                      },
                      {
                        title: "Active Courses",
                        val: analytics.totalCourses,
                        color: "text-pink-500 bg-pink-500/10",
                      },
                      {
                        title: "Open Tickets",
                        val: analytics.openTickets,
                        color: "text-red-500 bg-red-500/10",
                      },
                    ].map((stat, i) => (
                      <div
                        key={i}
                        className="bg-white rounded-[32px] p-8 border border-border shadow-soft hover:shadow-premium transition-all duration-300 space-y-4"
                      >
                        <span className="text-[10px] text-navy/40 font-black uppercase tracking-widest block">
                          {stat.title}
                        </span>
                        <div className="flex items-center justify-between">
                          <h3 className="text-4xl lg:text-5xl font-black text-navy">
                            {stat.val}
                          </h3>
                          <span
                            className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm ${stat.color}`}
                          >
                            #
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Operational Summaries */}
                  <div className="bg-sky/20 rounded-[40px] p-8 lg:p-12 border border-border/30 space-y-6">
                    <h3 className="text-2xl font-black text-navy tracking-tight">
                      Platform Operation Health
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="bg-white rounded-3xl p-6 border border-border/30">
                        <span className="text-[10px] text-navy/40 font-black tracking-widest uppercase block mb-1">
                          Support Ticket Resolution
                        </span>
                        <div className="text-2xl font-black text-navy">
                          {analytics.resolvedTickets} / {analytics.totalTickets}
                        </div>
                        <p className="text-navy/50 text-[10px] font-bold mt-2">
                          Tickets resolved successfully.
                        </p>
                      </div>

                      <div className="bg-white rounded-3xl p-6 border border-border/30">
                        <span className="text-[10px] text-navy/40 font-black tracking-widest uppercase block mb-1">
                          Enrollment Ratio
                        </span>
                        <div className="text-2xl font-black text-navy">
                          {analytics.totalEnrollments > 0
                            ? (
                              (enrollments.filter((e) => e.status === "approved")
                                .length /
                                analytics.totalEnrollments) *
                              100
                            ).toFixed(1)
                            : "0.0"}
                          %
                        </div>
                        <p className="text-navy/50 text-[10px] font-bold mt-2">
                          Percentage of accepted enrollments.
                        </p>
                      </div>

                      <div className="bg-white rounded-3xl p-6 border border-border/30">
                        <span className="text-[10px] text-navy/40 font-black tracking-widest uppercase block mb-1">
                          Contact Messages
                        </span>
                        <div className="text-2xl font-black text-navy">
                          {analytics.totalContacts}
                        </div>
                        <p className="text-navy/50 text-[10px] font-bold mt-2">
                          Direct student inquiries raised.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: COURSE CATALOG */}
              {activeTab === "courses" && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                  {/* Left: Add Course Form (4 Columns) */}
                  <div className="lg:col-span-4 bg-white border border-border/80 rounded-[32px] p-6 lg:p-8 shadow-premium space-y-6">
                    <h3 className="text-xl font-black text-navy tracking-tight">
                      Add Catalog Course
                    </h3>
                    <form onSubmit={handleAddCourse} className="space-y-4">
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-black text-navy/40 uppercase tracking-wider block">
                          Course Title *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Python Full Course"
                          value={newCourse.title}
                          onChange={(e) =>
                            setNewCourse({ ...newCourse, title: e.target.value })
                          }
                          className="w-full px-5 py-4 rounded-xl bg-sky/20 border-2 border-transparent focus:border-primary/20 focus:bg-white outline-none transition-all font-bold text-navy text-xs"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[10px] font-black text-navy/40 uppercase tracking-wider block">
                          Course Fee *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. ₹19,999"
                          value={newCourse.price}
                          onChange={(e) =>
                            setNewCourse({ ...newCourse, price: e.target.value })
                          }
                          className="w-full px-5 py-4 rounded-xl bg-sky/20 border-2 border-transparent focus:border-primary/20 focus:bg-white outline-none transition-all font-bold text-navy text-xs"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[10px] font-black text-navy/40 uppercase tracking-wider block">
                          Duration *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. 6 Months"
                          value={newCourse.duration}
                          onChange={(e) =>
                            setNewCourse({ ...newCourse, duration: e.target.value })
                          }
                          className="w-full px-5 py-4 rounded-xl bg-sky/20 border-2 border-transparent focus:border-primary/20 focus:bg-white outline-none transition-all font-bold text-navy text-xs"
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full py-4.5 bg-primary text-white font-black text-xs uppercase tracking-widest rounded-xl transition-all shadow-md hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
                      >
                        <Plus size={16} />
                        <span>PUBLISH COURSE</span>
                      </button>
                    </form>
                  </div>

                  {/* Right: Course Table List (8 Columns) */}
                  <div className="lg:col-span-8 bg-white border border-border/80 rounded-[32px] shadow-premium overflow-hidden">
                    <div className="p-6 border-b border-border/30">
                      <h3 className="text-xl font-black text-navy tracking-tight">
                        Active Courses
                      </h3>
                    </div>
                    <div className="overflow-x-auto w-full">
                      <table className="w-full border-collapse text-left">
                        <thead className="bg-sky/25 border-b border-border/30 text-[10px] text-navy/40 font-black uppercase tracking-widest">
                          <tr>
                            <th className="p-6">ID</th>
                            <th className="p-6">Course Name</th>
                            <th className="p-6">Duration</th>
                            <th className="p-6">Tuition Fee</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-border/20 text-xs text-navy/80 font-bold">
                          {courses.length === 0 ? (
                            <tr>
                              <td colSpan={4} className="p-12 text-center text-navy/40 font-semibold">
                                No courses seeded. Create one.
                              </td>
                            </tr>
                          ) : (
                            courses.map((course) => (
                              <tr key={course.id} className="hover:bg-sky/10 transition-colors">
                                <td className="p-6 text-navy/30">#{course.id}</td>
                                <td className="p-6 text-navy font-black text-sm">{course.title}</td>
                                <td className="p-6">{course.duration}</td>
                                <td className="p-6 text-primary">{course.price}</td>
                              </tr>
                            ))
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 3: STUDENT ENROLLMENTS MANAGER */}
              {activeTab === "enrollments" && (
                <div className="bg-white border border-border/80 rounded-[32px] shadow-premium overflow-hidden">
                  <div className="p-6 border-b border-border/30">
                    <h3 className="text-xl font-black text-navy tracking-tight">
                      Enrollment Applications
                    </h3>
                  </div>
                  <div className="overflow-x-auto w-full">
                    <table className="w-full border-collapse text-left">
                      <thead className="bg-sky/25 border-b border-border/30 text-[10px] text-navy/40 font-black uppercase tracking-widest">
                        <tr>
                          <th className="p-6">ID</th>
                          <th className="p-6">Applicant Name</th>
                          <th className="p-6">Course Applied</th>
                          <th className="p-6">Contact / Phone</th>
                          <th className="p-6">Application Date</th>
                          <th className="p-6">Status</th>
                          <th className="p-6 text-center">Management Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border/20 text-xs text-navy/80 font-bold">
                        {enrollments.length === 0 ? (
                          <tr>
                            <td colSpan={7} className="p-12 text-center text-navy/40 font-semibold">
                              No student enrollment records found in PostgreSQL database.
                            </td>
                          </tr>
                        ) : (
                          enrollments.map((enr) => (
                            <tr key={enr.id} className="hover:bg-sky/10 transition-colors">
                              <td className="p-6 text-navy/30">#{enr.id}</td>
                              <td className="p-6 font-black text-navy">
                                <div className="flex flex-col">
                                  <span>{enr.full_name}</span>
                                  <span className="text-[10px] text-navy/40 font-medium">{enr.email}</span>
                                </div>
                              </td>
                              <td className="p-6 text-navy font-black">
                                {enr.course_title || `Course ID #${enr.course_id}`}
                              </td>
                              <td className="p-6">{enr.phone}</td>
                              <td className="p-6 text-navy/40 font-medium">
                                {new Date(enr.created_at).toLocaleDateString()}
                              </td>
                              <td className="p-6">
                                <span
                                  className={`px-3 py-1.5 rounded-full text-[9px] font-black uppercase tracking-wider ${enr.status === "approved"
                                      ? "bg-emerald-500/10 text-emerald-600 border border-emerald-500/20"
                                      : enr.status === "rejected"
                                        ? "bg-red-500/10 text-red-500 border border-red-500/20"
                                        : "bg-amber-500/10 text-amber-600 border border-amber-500/20"
                                    }`}
                                >
                                  {enr.status}
                                </span>
                              </td>
                              <td className="p-6">
                                {enr.status === "pending" ? (
                                  <div className="flex items-center justify-center gap-2">
                                    <button
                                      onClick={() =>
                                        handleUpdateEnrollment(enr.id, "approved")
                                      }
                                      className="p-2 rounded-lg bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500 hover:text-white transition-all border border-emerald-500/20"
                                      title="Approve Application"
                                    >
                                      <Check size={16} />
                                    </button>
                                    <button
                                      onClick={() =>
                                        handleUpdateEnrollment(enr.id, "rejected")
                                      }
                                      className="p-2 rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-all border border-red-500/20"
                                      title="Decline Application"
                                    >
                                      <X size={16} />
                                    </button>
                                  </div>
                                ) : (
                                  <div className="text-center text-navy/30 italic text-[10px]">
                                    Processed
                                  </div>
                                )}
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* TAB 4: USER ACCOUNTS DIRECTORY */}
              {activeTab === "users" && (
                <div className="bg-white border border-border/80 rounded-[32px] shadow-premium overflow-hidden">
                  <div className="p-6 border-b border-border/30">
                    <h3 className="text-xl font-black text-navy tracking-tight">
                      Platform Student & Staff Directory
                    </h3>
                  </div>
                  <div className="overflow-x-auto w-full">
                    <table className="w-full border-collapse text-left">
                      <thead className="bg-sky/25 border-b border-border/30 text-[10px] text-navy/40 font-black uppercase tracking-widest">
                        <tr>
                          <th className="p-6">ID</th>
                          <th className="p-6">Full Name</th>
                          <th className="p-6">Email Address</th>
                          <th className="p-6">Role Authority</th>
                          <th className="p-6">Mobile Contact</th>
                          <th className="p-6">Joined Date</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border/20 text-xs text-navy/80 font-bold">
                        {users.length === 0 ? (
                          <tr>
                            <td colSpan={6} className="p-12 text-center text-navy/40 font-semibold">
                              No platform users found.
                            </td>
                          </tr>
                        ) : (
                          users.map((usr) => (
                            <tr key={usr.id} className="hover:bg-sky/10 transition-colors">
                              <td className="p-6 text-navy/30">#{usr.id}</td>
                              <td className="p-6 text-navy font-black text-sm">
                                <div className="flex items-center gap-3">
                                  <div className="w-8 h-8 rounded-full bg-navy/10 flex items-center justify-center text-navy text-xs font-black">
                                    {usr.full_name[0]}
                                  </div>
                                  <span>{usr.full_name}</span>
                                </div>
                              </td>
                              <td className="p-6 text-navy/60">{usr.email}</td>
                              <td className="p-6">
                                <span
                                  className={`px-3 py-1.5 rounded-full text-[9px] font-black uppercase tracking-wider ${usr.role === "admin"
                                      ? "bg-navy text-white border border-navy"
                                      : "bg-sky text-navy border border-border"
                                    }`}
                                >
                                  {usr.role}
                                </span>
                              </td>
                              <td className="p-6">{usr.phone || "—"}</td>
                              <td className="p-6 text-navy/40 font-medium">
                                {new Date(usr.created_at).toLocaleDateString()}
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* TAB 5: SUPPORT CASE CENTER */}
              {activeTab === "tickets" && (
                <div className="bg-white border border-border/80 rounded-[32px] shadow-premium overflow-hidden">
                  <div className="p-6 border-b border-border/30">
                    <h3 className="text-xl font-black text-navy tracking-tight">
                      Raised Support Cases
                    </h3>
                  </div>
                  <div className="overflow-x-auto w-full">
                    <table className="w-full border-collapse text-left">
                      <thead className="bg-sky/25 border-b border-border/30 text-[10px] text-navy/40 font-black uppercase tracking-widest">
                        <tr>
                          <th className="p-6">ID</th>
                          <th className="p-6">Student Info</th>
                          <th className="p-6">Subject Case</th>
                          <th className="p-6">Priority</th>
                          <th className="p-6">Submission Date</th>
                          <th className="p-6">Status</th>
                          <th className="p-6 text-center">Solve Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border/20 text-xs text-navy/80 font-bold">
                        {tickets.length === 0 ? (
                          <tr>
                            <td colSpan={7} className="p-12 text-center text-navy/40 font-semibold">
                              No support tickets raised by students.
                            </td>
                          </tr>
                        ) : (
                          tickets.map((t) => (
                            <tr key={t.id} className="hover:bg-sky/10 transition-colors">
                              <td className="p-6 text-navy/30">#{t.id}</td>
                              <td className="p-6 font-black text-navy">
                                <div className="flex flex-col">
                                  <span>{t.student_name || `User ID #${t.user_id}`}</span>
                                  <span className="text-[10px] text-navy/40 font-medium">{t.student_email}</span>
                                </div>
                              </td>
                              <td className="p-6 text-navy font-black">
                                <div className="flex flex-col">
                                  <span>{t.subject}</span>
                                  <span className="text-[10px] text-navy/50 font-normal leading-relaxed max-w-md block mt-1">
                                    {t.description}
                                  </span>
                                </div>
                              </td>
                              <td className="p-6">
                                <span
                                  className={`px-3 py-1.5 rounded-full text-[9px] font-black uppercase tracking-wider ${t.priority === "high"
                                      ? "bg-red-500/10 text-red-500 border border-red-500/20"
                                      : t.priority === "low"
                                        ? "bg-sky text-navy border border-border"
                                        : "bg-amber-500/10 text-amber-600 border border-amber-500/20"
                                    }`}
                                >
                                  {t.priority}
                                </span>
                              </td>
                              <td className="p-6 text-navy/40 font-medium">
                                {new Date(t.created_at).toLocaleDateString()}
                              </td>
                              <td className="p-6">
                                <span
                                  className={`px-3 py-1.5 rounded-full text-[9px] font-black uppercase tracking-wider ${t.status === "resolved"
                                      ? "bg-emerald-500/10 text-emerald-600 border border-emerald-500/20"
                                      : "bg-amber-500/10 text-amber-600 border border-amber-500/20"
                                    }`}
                                >
                                  {t.status}
                                </span>
                              </td>
                              <td className="p-6">
                                {t.status === "open" ? (
                                  <div className="flex justify-center">
                                    <button
                                      onClick={() => handleResolveTicket(t.id)}
                                      className="px-4 py-2 bg-emerald-500/10 hover:bg-emerald-500 hover:text-white border border-emerald-500/20 rounded-xl text-emerald-600 transition-all font-black text-[10px] uppercase tracking-wider"
                                    >
                                      Mark Resolved
                                    </button>
                                  </div>
                                ) : (
                                  <div className="text-center text-navy/30 italic text-[10px]">
                                    Closed Case
                                  </div>
                                )}
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default CourseAdmin;
