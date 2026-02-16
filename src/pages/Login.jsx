import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Mail, Lock, LogIn, AlertCircle, Shield, Zap, Ticket, ArrowRight, CheckCircle2, Eye, EyeOff } from 'lucide-react';
import useAuth from '../hooks/useAuth';
import toast from 'react-hot-toast';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const { login } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/dashboard';

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email || !password) {
            setError('Please fill in all fields');
            return;
        }

        setLoading(true);
        setError('');

        const result = await login(email, password);

        if (result.success) {
            toast.success('Successfully logged in!');
            navigate(from, { replace: true });
        } else {
            setError(result.message);
            toast.error(result.message);
        }
        setLoading(false);
    };

    return (
        <div className="min-h-screen flex bg-white overflow-hidden">
            {/* Left Side: Interactive Visuals */}
            <div className="hidden lg:flex lg:w-3/5 bg-[#082f49] relative overflow-hidden items-center justify-center p-12">
                {/* Background Patterns */}
                <div className="absolute inset-0 z-0">
                    <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#0ea5e9]/20 rounded-full blur-[120px] animate-pulse"></div>
                    <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#38bdf8]/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }}></div>
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
                </div>

                <div className="relative z-10 w-full max-w-2xl">
                    <div className="mb-12 inline-flex items-center space-x-2 bg-[#0c4a6e]/40 backdrop-blur-md px-4 py-2 rounded-full border border-[#075985]/50 shadow-lg">
                        <span className="flex h-2 w-2 rounded-full bg-[#38bdf8]"></span>
                        <span className="text-[#bae6fd] text-xs font-bold uppercase tracking-widest">v2.0 Performance Suite</span>
                    </div>

                    <h1 className="text-6xl font-black text-white leading-tight mb-6 tracking-tight">
                        Empower <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#38bdf8] to-[#bae6fd]">Your Support</span> <br />
                        Ecosystem.
                    </h1>

                    <p className="text-[#bae6fd]/70 text-lg mb-12 max-w-lg leading-relaxed">
                        The definitive ticketing platform built for elite support teams.
                        Optimize workflows, boost resolution rates, and wow your customers.
                    </p>

                    <div className="grid grid-cols-2 gap-6">
                        {[
                            { icon: Zap, label: 'Instant Triage', desc: 'Auto-categorize in real-time' },
                            { icon: Shield, label: 'Enterprise Security', desc: 'Bank-grade data protection' },
                            { icon: Ticket, label: 'Smart Routing', desc: 'AI-driven agent assignment' },
                            { icon: CheckCircle2, label: 'Elite Efficiency', desc: 'Track every performance metric' }
                        ].map((item, i) => (
                            <div key={i} className="group p-6 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all cursor-default text-white">
                                <div className="w-10 h-10 rounded-xl bg-[#0ea5e9]/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                    <item.icon className="w-5 h-5 text-[#38bdf8]" />
                                </div>
                                <h3 className="text-white font-bold mb-1">{item.label}</h3>
                                <p className="text-[#7dd3fc]/50 text-xs">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Floating Elements Corner */}
                <div className="absolute top-20 right-20 animate-bounce duration-[3000ms]">
                    <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-[#38bdf8] to-[#0284c7] opacity-20 blur-xl"></div>
                </div>
            </div>

            {/* Right Side: Clean Login Form */}
            <div className="w-full lg:w-2/5 flex flex-col justify-center px-8 sm:px-12 lg:px-20 bg-white relative">
                <div className="w-full max-w-md mx-auto">
                    {/* Mobile Logo */}
                    <div className="lg:hidden mb-12 flex flex-col items-center">
                        <div className="w-16 h-16 bg-[#0284c7] rounded-2xl flex items-center justify-center mb-4 shadow-lg shadow-primary-200">
                            <LogIn className="w-8 h-8 text-white" />
                        </div>
                        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">TicketingPortal</h2>
                    </div>

                    <div className="mb-10 text-center lg:text-left">
                        <h2 className="text-3xl font-black text-slate-900 tracking-tight mb-2">Welcome Back</h2>
                        <p className="text-slate-500 font-medium">Enter your credentials to access your terminal.</p>
                    </div>

                    <form className="space-y-6" onSubmit={handleSubmit}>
                        {error && (
                            <div className="bg-red-50 border border-red-100 text-red-600 px-4 py-3 rounded-2xl flex items-center text-sm animate-in fade-in slide-in-from-top-2 duration-300">
                                <AlertCircle className="w-5 h-5 mr-3 flex-shrink-0" />
                                <span className="font-semibold">{error}</span>
                            </div>
                        )}

                        <div className="space-y-4">
                            <div>
                                <label htmlFor="email" className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">
                                    Professional Email
                                </label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors group-focus-within:text-[#0284c7]">
                                        <Mail className="h-5 w-5 text-slate-300" />
                                    </div>
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="block w-full pl-12 pr-4 py-4 border border-slate-100 rounded-2xl leading-5 bg-slate-50/50 placeholder-slate-300 focus:outline-none focus:ring-4 focus:ring-primary-50 focus:border-[#0284c7] focus:bg-white transition-all sm:text-sm font-semibold text-slate-700"
                                        placeholder="admin@ticketing.com"
                                    />
                                </div>
                            </div>

                            <div>
                                <div className="flex justify-between items-center mb-2 ml-1">
                                    <label htmlFor="password" className="block text-xs font-bold text-slate-400 uppercase tracking-widest">
                                        Secure Password
                                    </label>
                                    <a href="#" className="text-[10px] font-bold text-[#0284c7] hover:text-[#0369a1] uppercase tracking-widest transition-colors">
                                        Forgot?
                                    </a>
                                </div>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors group-focus-within:text-[#0284c7]">
                                        <Lock className="h-5 w-5 text-slate-300" />
                                    </div>
                                    <input
                                        id="password"
                                        name="password"
                                        type={showPassword ? 'text' : 'password'}
                                        autoComplete="current-password"
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="block w-full pl-12 pr-12 py-4 border border-slate-100 rounded-2xl leading-5 bg-slate-50/50 placeholder-slate-300 focus:outline-none focus:ring-4 focus:ring-primary-50 focus:border-[#0284c7] focus:bg-white transition-all sm:text-sm font-semibold text-slate-700"
                                        placeholder="••••••••"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-[#0284c7] transition-colors"
                                    >
                                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center">
                            <input
                                id="remember-me"
                                name="remember-me"
                                type="checkbox"
                                className="h-4 w-4 text-[#0284c7] focus:ring-[#0ea5e9] border-slate-200 rounded-lg cursor-pointer"
                            />
                            <label htmlFor="remember-me" className="ml-3 block text-sm font-medium text-slate-500 cursor-pointer select-none">
                                Keep me authenticated
                            </label>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className={`group relative w-full flex justify-center py-4 px-4 border border-transparent rounded-2xl shadow-xl shadow-[#bae6fd] text-sm font-black text-white bg-[#0284c7] hover:bg-[#0369a1] focus:outline-none focus:ring-4 focus:ring-[#bae6fd] transition-all active:scale-[0.98] ${loading ? 'opacity-75 cursor-wait' : ''
                                }`}
                        >
                            {loading ? (
                                <div className="flex items-center space-x-2">
                                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    <span>Syncing Backend...</span>
                                </div>
                            ) : (
                                <div className="flex items-center">
                                    <span>Sign into Support Terminal</span>
                                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                                </div>
                            )}
                        </button>
                    </form>

                    <div className="mt-12 pt-8 border-t border-slate-100 text-center">
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">&copy; 2026 TicketingPortal Enterprise System</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
