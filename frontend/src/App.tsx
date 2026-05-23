// Force refresh: 1778956625699
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Home from "./pages/Home";
import Courses from "./pages/Courses";
import Trainers from "./pages/Trainers";
import Placements from "./pages/Placements";
import Contact from "./pages/Contact";
import LoginPage from "./pages/auth/LoginPage";
import Signup from "./pages/auth/Signup";
import Enrollment from "./pages/Enrollment";
import CourseAdmin from "./pages/CourseAdmin";
import Dashboard from "./pages/Dashboard";
import ScrollToTop from "./components/layout/ScrollToTop";
import About from "./pages/About";
import CourseDetails from "./pages/CourseDetails";
import Checkout from "./pages/Checkout";
import PaymentSuccess from "./pages/PaymentSuccess";
import PaymentFailed from "./pages/PaymentFailed";

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/courses/:courseId" element={<CourseDetails />} />
            <Route path="/trainers" element={<Trainers />} />
            <Route path="/placements" element={<Placements />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/enroll/:courseId" element={<Enrollment />} />
            <Route path="/profile" element={<Dashboard defaultTab="profile" />} />
            <Route path="/settings" element={<Dashboard defaultTab="settings" />} />
            <Route path="/tickets" element={<Dashboard defaultTab="tickets" />} />
            <Route path="/billing" element={<Dashboard defaultTab="billing" />} />
            <Route path="/admin" element={<CourseAdmin />} />
            <Route path="/dashboard" element={<Dashboard defaultTab="courses" />} />
            <Route path="/checkout/:courseId" element={<Checkout />} />
            <Route path="/payment-success" element={<PaymentSuccess />} />
            <Route path="/payment-failed" element={<PaymentFailed />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

