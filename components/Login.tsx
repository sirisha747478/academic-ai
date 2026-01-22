
import React, { useState } from 'react';
import { BrainCircuit, Lock, Mail, ChevronRight } from 'lucide-react';
import { MOCK_USERS } from '../constants';
import { User } from '../types';

interface Props {
  onLogin: (user: User) => void;
}

const Login: React.FC<Props> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const user = MOCK_USERS.find(u => u.email === email && u.password === password);
    if (user) {
      onLogin(user);
    } else {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center p-4 bg-indigo-600 rounded-3xl mb-6 shadow-xl shadow-indigo-500/20">
            <BrainCircuit className="text-white w-10 h-10" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-2 tracking-tight">AcademiaAI</h1>
          <p className="text-slate-400">Smart Academic Management System</p>
        </div>

        <div className="bg-white rounded-[2.5rem] p-8 shadow-2xl">
          <h2 className="text-2xl font-bold text-slate-800 mb-6">Welcome Back</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                  placeholder="name@edu.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            {error && (
              <div className="p-3 bg-rose-50 text-rose-600 text-sm rounded-xl font-medium animate-pulse">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200 flex items-center justify-center gap-2 group"
            >
              Log In
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          <div className="mt-8 pt-8 border-t border-slate-100 grid grid-cols-1 gap-2 text-center text-xs text-slate-500">
             <p>Demo accounts (password: password):</p>
             <p>Admin: admin@edu.com</p>
             <p>Faculty: jane@faculty.com</p>
             <p>Student: alex@edu.com</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
