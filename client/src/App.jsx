import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import { BarChart3, Globe2, ShieldCheck, ArrowRight, LogOut, Sun, Moon } from 'lucide-react';

// Page Imports
import Dashboard from './pages/Dashboard';
import CreatePoll from './pages/CreatePoll';
import Auth from './pages/Auth';
import VoteView from './pages/VoteView';
import ResultsView from './pages/ResultsView';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" />;
};

const Feature = ({ icon, title, desc }) => (
  <div className="p-10 rounded-[32px] transition-all border duration-300
    bg-white border-slate-200 shadow-sm 
    dark:bg-[#1C1C1E] dark:border-white/5 dark:shadow-none
    hover:shadow-xl hover:-translate-y-1">
    <div className="mb-6 p-4 bg-blue-600/10 rounded-2xl w-fit text-blue-600">
      {icon}
    </div>
    <h3 className="text-2xl font-bold mb-3 text-slate-900 dark:text-white tracking-tight">{title}</h3>
    <p className="text-slate-500 dark:text-slate-400 font-medium leading-relaxed">{desc}</p>
  </div>
);

const Home = ({ isAuth }) => (
  <>
    <section className="relative pt-40 pb-20 px-6 overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-blue-500/5 dark:bg-blue-500/10 blur-[120px] rounded-full -z-10" />
      
      <div className="max-w-5xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-blue-500/10 bg-blue-500/5 text-blue-600 text-xs font-bold mb-8 uppercase tracking-widest">
          Live Deployment
        </div>
        
        <h1 className="text-5xl md:text-8xl font-black tracking-tighter mb-8 leading-[1.1] text-slate-900 dark:text-white">
          Next-gen polls <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500">for modern teams.</span>
        </h1>

        <p className="text-slate-500 dark:text-slate-400 text-xl max-w-2xl mb-12 mx-auto font-medium">
          Beautiful, lightning-fast feedback loops. <br className="hidden md:block"/> Built for the speed of light.
        </p>
        
        <div className="flex justify-center">
          <Link to={isAuth ? "/dashboard" : "/register"} className="bg-blue-600 text-white px-10 py-5 rounded-full font-bold text-lg shadow-xl shadow-blue-500/20 hover:scale-105 active:scale-95 transition-all flex items-center gap-2 group">
            {isAuth ? 'Go to Dashboard' : 'Get Started Now'} 
            <ArrowRight size={22} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>

    <section className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-3 gap-8">
      <Feature icon={<BarChart3 />} title="Instant Analytics" desc="Watch votes populate with zero-latency charts and data." />
      <Feature icon={<Globe2 />} title="Global Reach" desc="Distributed infrastructure ensures speed from any continent." />
      <Feature icon={<ShieldCheck />} title="Bank-grade Security" desc="JWT sessions and encrypted payload delivery come standard." />
    </section>
  </>
);

function App() {
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem('theme') === 'dark');

  useEffect(() => {
    const html = window.document.documentElement;
    if (darkMode) {
      html.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      html.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  const isAuth = !!localStorage.getItem('token');

  return (
    <Router>
      <div className="min-h-screen transition-colors duration-500 bg-[#F5F5F7] dark:bg-black text-[#1D1D1F] dark:text-[#F5F5F7] antialiased">
        
        <nav className="fixed top-0 w-full z-50 backdrop-blur-xl bg-white/70 dark:bg-black/70 border-b border-slate-200 dark:border-white/10 py-4 px-6 md:px-12 flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center font-bold text-white shadow-lg group-hover:rotate-6 transition-transform">P</div>
            <h1 className="text-xl font-black tracking-tighter">PollPulse</h1>
          </Link>
          
          <div className="flex items-center gap-4 md:gap-6">
            {/* ENABLED TOGGLE BUTTON */}
            <button 
              onClick={() => setDarkMode(!darkMode)}
              className="p-2.5 rounded-2xl bg-slate-200/50 dark:bg-white/10 text-slate-900 dark:text-white transition-all hover:scale-110 active:scale-95"
              aria-label="Toggle Theme"
            >
              {darkMode ? <Sun size={20} className="text-yellow-400" /> : <Moon size={20} className="text-slate-600" />}
            </button>
            
            {isAuth ? (
              <div className="flex items-center gap-4 md:gap-6">
                <Link to="/dashboard" className="text-sm font-bold opacity-60 hover:opacity-100 transition-opacity uppercase tracking-widest hidden sm:block">Dashboard</Link>
                <button onClick={() => { localStorage.clear(); window.location.href = '/'; }} className="text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 p-2 rounded-xl transition-all">
                  <LogOut size={20} />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-4 md:gap-8">
                <Link to="/login" className="text-sm font-bold opacity-60 hover:opacity-100 transition-opacity uppercase tracking-widest hidden sm:block">Login</Link>
                <Link to="/register" className="bg-slate-900 dark:bg-blue-600 text-white px-6 md:px-8 py-2.5 rounded-2xl text-sm font-black shadow-lg hover:opacity-90 transition-all">
                  Get Started
                </Link>
              </div>
            )}
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<Home isAuth={isAuth} />} />
          <Route path="/login" element={<Auth type="login" />} />
          <Route path="/register" element={<Auth type="register" />} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/create-poll" element={<ProtectedRoute><CreatePoll /></ProtectedRoute>} />
          <Route path="/vote/:id" element={<VoteView />} />
          <Route path="/results/:id" element={<ResultsView />} />
        </Routes>

        <footer className="py-20 text-center opacity-30 text-[10px] font-black tracking-[0.3em] uppercase">
          &copy; 2026 PollPulse Technologies.
        </footer>
      </div>
    </Router>
  );
}

export default App;