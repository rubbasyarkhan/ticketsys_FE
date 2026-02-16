import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    ArrowLeft,
    User,
    Mail,
    Phone,
    Lock,
    Shield,
    Camera,
    Save,
    X
} from 'lucide-react';
import api from '../api/axios';
import toast from 'react-hot-toast';

const CreateAgent = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        phoneNumber: '',
        avatar: '',
        role: 'agent'
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await api.post('/admin/agents', formData);
            toast.success('Agent created successfully');
            navigate('/admin/agents');
        } catch (error) {
            console.error('Error creating agent:', error);
            toast.error(error.response?.data?.message || 'Failed to create agent');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Header */}
            <div className="flex items-center justify-between">
                <button
                    onClick={() => navigate('/admin/agents')}
                    className="flex items-center space-x-2 text-slate-500 hover:text-slate-900 transition-colors font-semibold group"
                >
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    <span>Back to Agents</span>
                </button>
                <h1 className="text-2xl font-black text-slate-900 tracking-tight">Onboard New Agent</h1>
            </div>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Profile Preview Section */}
                <div className="lg:col-span-1">
                    <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm text-center space-y-6">
                        <div className="relative inline-block">
                            <div className="w-32 h-32 rounded-3xl bg-slate-100 border-2 border-dashed border-slate-200 flex items-center justify-center overflow-hidden">
                                {formData.avatar ? (
                                    <img src={formData.avatar} alt="Preview" className="w-full h-full object-cover" />
                                ) : (
                                    <User className="w-12 h-12 text-slate-300" />
                                )}
                            </div>
                            <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-primary-600 text-white rounded-xl flex items-center justify-center shadow-lg border-4 border-white">
                                <Camera className="w-4 h-4" />
                            </div>
                        </div>

                        <div>
                            <p className="text-sm font-bold text-slate-900">{formData.name || 'New Agent Name'}</p>
                            <p className="text-xs text-slate-500">{formData.email || 'agent@example.com'}</p>
                        </div>

                        <div className="pt-4 space-y-3">
                            <label className="block text-left text-xs font-bold text-slate-400 uppercase tracking-widest">Profile Picture URL</label>
                            <input
                                type="text"
                                name="avatar"
                                value={formData.avatar}
                                onChange={handleChange}
                                placeholder="Paste image URL here..."
                                className="w-full px-4 py-2 bg-slate-50 border border-slate-100 rounded-xl text-xs focus:ring-2 focus:ring-primary-500 outline-none transition-all"
                            />
                        </div>
                    </div>
                </div>

                {/* Form Fields Section */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Name */}
                            <div className="space-y-2">
                                <label className="flex items-center space-x-2 text-xs font-bold text-slate-400 uppercase tracking-widest">
                                    <User className="w-3 h-3" />
                                    <span>Full Name</span>
                                </label>
                                <input
                                    required
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="e.g. John Doe"
                                    className="w-full px-5 py-3 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-medium focus:bg-white focus:ring-4 focus:ring-primary-50 focus:border-primary-500 outline-none transition-all"
                                />
                            </div>

                            {/* Email */}
                            <div className="space-y-2">
                                <label className="flex items-center space-x-2 text-xs font-bold text-slate-400 uppercase tracking-widest">
                                    <Mail className="w-3 h-3" />
                                    <span>Email Address</span>
                                </label>
                                <input
                                    required
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="johndoe@company.com"
                                    className="w-full px-5 py-3 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-medium focus:bg-white focus:ring-4 focus:ring-primary-50 focus:border-primary-500 outline-none transition-all"
                                />
                            </div>

                            {/* Password */}
                            <div className="space-y-2">
                                <label className="flex items-center space-x-2 text-xs font-bold text-slate-400 uppercase tracking-widest">
                                    <Lock className="w-3 h-3" />
                                    <span>Temporary Password</span>
                                </label>
                                <input
                                    required
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="••••••••"
                                    className="w-full px-5 py-3 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-medium focus:bg-white focus:ring-4 focus:ring-primary-50 focus:border-primary-500 outline-none transition-all"
                                />
                            </div>

                            {/* Phone */}
                            <div className="space-y-2">
                                <label className="flex items-center space-x-2 text-xs font-bold text-slate-400 uppercase tracking-widest">
                                    <Phone className="w-3 h-3" />
                                    <span>Phone Number</span>
                                </label>
                                <input
                                    type="text"
                                    name="phoneNumber"
                                    value={formData.phoneNumber}
                                    onChange={handleChange}
                                    placeholder="+1 (555) 000-0000"
                                    className="w-full px-5 py-3 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-medium focus:bg-white focus:ring-4 focus:ring-primary-50 focus:border-primary-500 outline-none transition-all"
                                />
                            </div>

                            {/* Role */}
                            <div className="space-y-2 md:col-span-2">
                                <label className="flex items-center space-x-2 text-xs font-bold text-slate-400 uppercase tracking-widest">
                                    <Shield className="w-3 h-3" />
                                    <span>System Role</span>
                                </label>
                                <div className="grid grid-cols-2 gap-4">
                                    <button
                                        type="button"
                                        onClick={() => setFormData(p => ({ ...p, role: 'agent' }))}
                                        className={`px-6 py-4 rounded-2xl text-sm font-bold border-2 transition-all ${formData.role === 'agent' ? 'border-primary-600 bg-primary-50 text-primary-700 shadow-md ring-4 ring-primary-100' : 'border-slate-100 bg-slate-50 text-slate-400 hover:border-slate-200'}`}
                                    >
                                        Standard Agent
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setFormData(p => ({ ...p, role: 'admin' }))}
                                        className={`px-6 py-4 rounded-2xl text-sm font-bold border-2 transition-all ${formData.role === 'admin' ? 'border-amber-600 bg-amber-50 text-amber-700 shadow-md ring-4 ring-amber-100' : 'border-slate-100 bg-slate-50 text-slate-400 hover:border-slate-200'}`}
                                    >
                                        System Admin
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="pt-6 border-t border-slate-50 flex items-center justify-end space-x-4">
                            <button
                                type="button"
                                onClick={() => navigate('/admin/agents')}
                                className="px-8 py-3 rounded-2xl text-sm font-bold text-slate-400 hover:text-slate-600 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={loading}
                                className="flex items-center space-x-2 px-10 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-2xl text-sm font-bold transition-all shadow-xl shadow-primary-200 disabled:opacity-50"
                            >
                                {loading ? 'Creating...' : (
                                    <>
                                        <Save className="w-4 h-4" />
                                        <span>Create Agent</span>
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default CreateAgent;
