import React, { useState } from 'react';
import { Brush, Lock, Mail, ArrowRight, Eye, EyeOff } from 'lucide-react';

interface LoginProps {
  onLogin: () => void;
}

export function Login({ onLogin }: LoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Mock authentication delay
    setTimeout(() => {
      setIsLoading(false);
      onLogin();
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col justify-center items-center p-6 selection:bg-primary-container/20 selection:text-primary relative overflow-hidden">
      
      {/* Decorative background elements */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-primary/10 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-secondary/10 rounded-full blur-[100px] pointer-events-none"></div>
      
      <div className="w-full max-w-[420px] relative z-10">
        {/* Brand Header */}
        <div className="flex flex-col items-center text-center mb-10">
          <div className="w-16 h-16 rounded-full bg-surface border border-outline-variant flex items-center justify-center mb-6 shadow-md shadow-primary/5">
            <Brush className="w-8 h-8 text-primary" strokeWidth={1.5} />
          </div>
          <h1 className="text-3xl font-display font-bold text-on-background tracking-tight mb-2">Shirley Makeup</h1>
          <p className="text-sm font-medium text-on-surface-variant uppercase tracking-widest">Admin Portal</p>
        </div>

        {/* Login Card */}
        <div className="glass-card p-8 sm:p-10 shadow-xl shadow-black/5 border border-outline-variant/50">
          <div className="mb-8">
            <h2 className="text-xl font-bold text-on-surface mb-2">Welcome back</h2>
            <p className="text-sm text-on-surface-variant">Sign in to manage your bookings, clients, and studio analytics.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold uppercase tracking-wider text-on-surface-variant">Email Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <Mail className="w-4 h-4 text-on-surface-variant/50" />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input-glow w-full pl-10 py-2.5 bg-surface text-sm placeholder:text-on-surface-variant/40"
                  placeholder="admin@luxestudio.com"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <label className="block text-xs font-semibold uppercase tracking-wider text-on-surface-variant">Password</label>
                <button type="button" className="text-xs font-medium text-primary hover:text-primary/80 transition-colors">Forgot?</button>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <Lock className="w-4 h-4 text-on-surface-variant/50" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-glow w-full pl-10 pr-10 py-2.5 bg-surface text-sm placeholder:text-on-surface-variant/40"
                  placeholder="••••••••"
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-on-surface-variant/50 hover:text-on-surface transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={isLoading}
                className="btn-primary w-full py-3 flex items-center justify-center gap-2 group relative overflow-hidden"
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                    Authenticating...
                  </span>
                ) : (
                  <>
                    Sign In
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
        
        <div className="mt-8 text-center">
          <p className="text-xs text-on-surface-variant/60">
            Protected by enterprise-grade security. <br className="sm:hidden" />
            &copy; {new Date().getFullYear()} Shirley Makeup.
          </p>
        </div>
      </div>
    </div>
  );
}
