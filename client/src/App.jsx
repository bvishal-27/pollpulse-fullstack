import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
} from "react-router-dom";
import {
  BarChart3,
  Globe2,
  ShieldCheck,
  ArrowRight,
  LogOut,
  Zap,
} from "lucide-react";

// Page Imports
import Dashboard from "./pages/Dashboard";
import CreatePoll from "./pages/CreatePoll";
import Auth from "./pages/Auth";
import VoteView from "./pages/VoteView";
import ResultsView from "./pages/ResultsView";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" />;
};

const Feature = ({ icon, title, desc }) => (
  <div className="dark-card p-12 text-center flex flex-col items-center group">
    <div className="mb-8 p-5 bg-white/5 rounded-3xl text-[#0A84FF] transition-transform group-hover:scale-110">
      {icon}
    </div>
    <h3 className="text-3xl font-black mb-4 tracking-tight text-white">
      {title}
    </h3>
    <p className="text-[#86868B] font-bold leading-relaxed">{desc}</p>
  </div>
);

const Home = ({ isAuth }) => (
  <div
    className="min-h-screen"
    style={{ background: "var(--bg-color)", color: "var(--text-color)" }}
  >
    {/* Deep Background Glows */}
    <div className="absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-900/20 blur-[120px] rounded-full" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-900/20 blur-[100px] rounded-full" />
    </div>

    <section className="pt-52 pb-24 px-6 max-w-6xl mx-auto text-center">
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-[#0A84FF] text-[10px] font-black mb-10 uppercase tracking-[0.2em]">
        <Zap size={12} fill="currentColor" /> Pro Edition 2026
      </div>

      <h1 className="text-7xl md:text-[100px] font-black tracking-tighter mb-10 leading-[0.9] text-white">
        The art of <br />
        <span className="text-[#0A84FF]">deciding together.</span>
      </h1>

      <p className="text-[#86868B] text-2xl md:text-3xl max-w-2xl mb-16 mx-auto font-black leading-tight">
        PollPulse reimagines feedback. <br /> Minimalist, fast, and secure.
      </p>

      <Link
        to={isAuth ? "/dashboard" : "/register"}
        className="bg-white text-black px-16 py-7 rounded-full font-black text-2xl shadow-2xl hover:scale-105 active:scale-95 transition-all flex items-center gap-4 mx-auto w-fit"
      >
        {isAuth ? "Enter Dashboard" : "Get Started Free"}
        <ArrowRight size={28} />
      </Link>
    </section>

    <section className="max-w-7xl mx-auto px-6 py-20 grid lg:grid-cols-3 gap-12">
      <Feature
        icon={<BarChart3 size={40} />}
        title="Live Insights"
        desc="Visual data that updates the millisecond a vote is cast."
      />
      <Feature
        icon={<Globe2 size={40} />}
        title="Global Sync"
        desc="Share polls instantly with links optimized for any platform."
      />
      <Feature
        icon={<ShieldCheck size={40} />}
        title="Privacy First"
        desc="Encrypted anonymous voting that keeps your data yours."
      />
    </section>
  </div>
);

export default function App() {
  const isAuth = !!localStorage.getItem("token");
  const [theme, setTheme] = useState(() => {
    if (typeof window !== "undefined") {
      return document.documentElement.classList.contains("dark")
        ? "dark"
        : "light";
    }
    return "light";
  });

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <Router>
      <div className="min-h-screen bg-black">
        <nav className="glass-nav py-5 px-6 md:px-16 flex justify-between items-center">
          <Link to="/" className="flex items-center gap-4 group">
            <div className="w-12 h-12 bg-[#0A84FF] rounded-2xl flex items-center justify-center font-bold text-white shadow-lg transition-transform group-hover:scale-110">
              P
            </div>
            <h1 className="text-3xl font-black tracking-tighter text-white">
              PollPulse
            </h1>
          </Link>

          <div className="flex items-center gap-8">
            <button
              className="theme-toggle-btn mr-4"
              aria-label="Toggle dark/light mode"
              onClick={toggleTheme}
            >
              {theme === "dark" ? (
                <svg
                  width="22"
                  height="22"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z"
                  />
                </svg>
              ) : (
                <svg
                  width="22"
                  height="22"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <circle cx="12" cy="12" r="5" strokeWidth="2" />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 1v2m0 18v2m11-11h-2M3 12H1m16.95 6.95l-1.41-1.41M6.46 6.46L5.05 5.05m12.02 0l-1.41 1.41M6.46 17.54l-1.41 1.41"
                  />
                </svg>
              )}
            </button>
            {isAuth ? (
              <div className="flex items-center gap-8">
                <Link
                  to="/dashboard"
                  className="text-xs font-black text-white/50 hover:text-white uppercase tracking-widest"
                >
                  Dashboard
                </Link>
                <button
                  onClick={() => {
                    localStorage.clear();
                    window.location.href = "/";
                  }}
                  className="text-red-500 bg-red-500/10 p-3 rounded-xl transition-all"
                >
                  <LogOut size={24} />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-8">
                <Link
                  to="/login"
                  className="text-xs font-black text-white/50 hover:text-white uppercase tracking-widest"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-white text-black px-8 py-3 rounded-full text-xs font-black hover:opacity-80 transition-all shadow-xl"
                >
                  Join Now
                </Link>
              </div>
            )}
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<Home isAuth={isAuth} />} />
          <Route path="/login" element={<Auth type="login" />} />
          <Route path="/register" element={<Auth type="register" />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/create-poll"
            element={
              <ProtectedRoute>
                <CreatePoll />
              </ProtectedRoute>
            }
          />
          <Route path="/vote/:id" element={<VoteView />} />
          <Route path="/results/:id" element={<ResultsView />} />
        </Routes>
      </div>
    </Router>
  );
}
