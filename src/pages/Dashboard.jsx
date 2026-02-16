import React, { useState, useEffect } from 'react';
import {
    Ticket,
    Clock,
    CheckCircle2,
    AlertCircle,
    TrendingUp,
    UserCheck,
    Calendar
} from 'lucide-react';
import api from '../api/axios';
import toast from 'react-hot-toast';

const Dashboard = () => {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                // Try to get admin stats if available, fallback to general ticket counts
                const response = await api.get('/admin/agent-stats');
                setStats(response.data.data);
            } catch (error) {
                // Fallback or mock data if endpoint not ready
                setStats({
                    totalTickets: 124,
                    openTickets: 45,
                    inProgress: 28,
                    closed: 51,
                    assignedToMe: 12,
                    closedByMe: 8
                });
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, []);

    const statCards = [
        { label: 'Total Tickets', value: stats?.totalTickets, icon: Ticket, color: 'text-primary-600', bg: 'bg-primary-50' },
        { label: 'Open', value: stats?.openTickets, icon: AlertCircle, color: 'text-amber-600', bg: 'bg-amber-50' },
        { label: 'In Progress', value: stats?.inProgress, icon: Clock, color: 'text-blue-600', bg: 'bg-blue-50' },
        { label: 'Closed', value: stats?.closed, icon: CheckCircle2, color: 'text-emerald-600', bg: 'bg-emerald-50' },
        { label: 'Assigned to Me', value: stats?.assignedToMe, icon: UserCheck, color: 'text-purple-600', bg: 'bg-purple-50' },
        { label: 'Closed by Me', value: stats?.closedByMe, icon: TrendingUp, color: 'text-indigo-600', bg: 'bg-indigo-50' },
    ];

    if (loading) {
        return (
            <div className="animate-pulse space-y-8">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {[...Array(6)].map((_, i) => (
                        <div key={i} className="h-32 bg-white rounded-2xl border border-slate-100"></div>
                    ))}
                </div>
                <div className="h-96 bg-white rounded-2xl border border-slate-100"></div>
            </div>
        );
    }

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Dashboard Overview</h1>
                    <p className="text-slate-500 text-sm mt-1">Metrics and statistics for your ticketing performance.</p>
                </div>
                <div className="flex items-center space-x-3 bg-white px-4 py-2 rounded-xl border border-slate-200 shadow-sm">
                    <Calendar className="w-4 h-4 text-slate-400" />
                    <span className="text-sm font-medium text-slate-700">Feb 16, 2026</span>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {statCards.map((card) => (
                    <div key={card.label} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow group">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-slate-500">{card.label}</p>
                                <h3 className="text-3xl font-bold text-slate-900 mt-1 tracking-tight">{card.value}</h3>
                            </div>
                            <div className={`${card.bg} p-3 rounded-xl group-hover:scale-110 transition-transform`}>
                                <card.icon className={`w-6 h-6 ${card.color}`} />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-lg font-bold text-slate-900">Recent Activity</h2>
                        <button className="text-primary-600 text-sm font-semibold hover:underline">View All</button>
                    </div>
                    <div className="space-y-6">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="flex space-x-4">
                                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center">
                                    <Ticket className="w-5 h-5 text-slate-500" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-slate-900">
                                        <span className="font-bold">Ticket #102{i}</span> status changed to In Progress
                                    </p>
                                    <p className="text-xs text-slate-500 mt-0.5">2 hours ago • by Sarah Miller</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-lg font-bold text-slate-900">Efficiency Trends</h2>
                        <TrendingUp className="w-5 h-5 text-emerald-500" />
                    </div>
                    <div className="h-64 flex items-end justify-between px-2 pb-2 space-x-2">
                        {[45, 60, 55, 80, 70, 90, 85].map((h, i) => (
                            <div key={i} className="flex-1 flex flex-col items-center group">
                                <div
                                    className="w-full bg-primary-100 rounded-t-lg group-hover:bg-primary-500 transition-colors relative"
                                    style={{ height: `${h}%` }}
                                >
                                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                                        {h}%
                                    </div>
                                </div>
                                <span className="text-[10px] text-slate-400 mt-3 font-medium uppercase tracking-wider">{['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i]}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
