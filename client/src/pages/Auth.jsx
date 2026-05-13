import React, { useState, useEffect } from 'react'; // Added useEffect
import API from '../api';
import { useNavigate } from 'react-router-dom';
import { Lock, Mail, User, ArrowRight } from 'lucide-react';

const Auth = ({ type }) => {
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // CLEANUP: Reset form data whenever the 'type' (login/register) changes
  useEffect(() => {
    setFormData({ username: '', email: '', password: '' });
  }, [type]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const endpoint = type === 'login' ? '/auth/login' : '/auth/register';
      const { data } = await API.post(endpoint, formData);
      
      if (data.token) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.username));
        navigate('/dashboard');
      } else {
        // Success for registration
        alert("Success! Account created. Please login.");
        
        // Explicitly clear local state before navigating
        setFormData({ username: '', email: '', password: '' });
        navigate('/login');
      }
    } catch (err) {
      alert(err.response?.data?.msg || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="glass w-full max-w-md p-10 rounded-[32px] animate-fade-in">
        <h2 className="text-3xl font-black tracking-tighter mb-2">
          {type === 'login' ? 'Welcome Back' : 'Create Account'}
        </h2>
        <p className="text-slate-500 dark:text-slate-400 mb-8 font-medium">
          {type === 'login' ? 'Enter your details to access your polls.' : 'Join PollPulse and start deciding.'}
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {type === 'register' && (
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="text" 
                placeholder="Username" 
                required
                value={formData.username}
                autoComplete="off"
                className="w-full bg-slate-100 dark:bg-white/5 border border-transparent focus:border-blue-500 rounded-2xl py-4 pl-12 pr-4 outline-none transition-all"
                onChange={(e) => setFormData({...formData, username: e.target.value})}
              />
            </div>
          )}
          
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="email" 
              placeholder="Email Address" 
              required
              value={formData.email}
              autoComplete="new-email" // Custom name to confuse browser autofill logic
              className="w-full bg-slate-100 dark:bg-white/5 border border-transparent focus:border-blue-500 rounded-2xl py-4 pl-12 pr-4 outline-none transition-all"
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="password" 
              placeholder="Password" 
              required
              value={formData.password}
              autoComplete="new-password" // Prevents using the registration password here
              className="w-full bg-slate-100 dark:bg-white/5 border border-transparent focus:border-blue-500 rounded-2xl py-4 pl-12 pr-4 outline-none transition-all"
              onChange={(e) => setFormData({...formData, password: e.target.value})}
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold mt-4 hover:bg-blue-700 transition-all flex items-center justify-center gap-2 group"
          >
            {loading ? 'Processing...' : (type === 'login' ? 'Sign In' : 'Register')}
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </form>

        <div className="mt-8 text-center text-sm font-medium text-slate-500">
          {type === 'login' ? "Don't have an account? " : "Already have an account? "}
          <button 
            type="button" // Set type to button to prevent form submission
            onClick={() => navigate(type === 'login' ? '/register' : '/login')}
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            {type === 'login' ? 'Sign Up' : 'Log In'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Auth;