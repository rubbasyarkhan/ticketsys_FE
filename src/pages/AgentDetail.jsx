import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    ArrowLeft,
    Mail,
    Shield,
    Ticket,
    CheckCircle2,
    Clock,
    TrendingUp,
    Calendar,
    ChevronRight,
    User,
    Phone
} from 'lucide-react';
import api from '../api/axios';
import StatusBadge from '../components/StatusBadge';
import PriorityBadge from '../components/PriorityBadge';
import { formatDate, formatTimeAgo } from '../utils/formatDate';
import toast from 'react-hot-toast';

const AgentDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAgentDetail = async () => {
            try {
                const response = await api.get(`/admin/agents/${id}`);
                setData(response.data.data);
            } catch (error) {
                console.error('Error fetching agent details:', error);
                toast.error('Failed to load agent details');
                // Mock data if API fails
                setData({
                    agent: {
                        name: 'Support Professional',
                        email: 'agent@example.com',
                        role: 'agent',
                        assignedTicketsCount: 45,
                        ticketsClosedCount: 38,
                        openTicketsCount: 7,
                        averageResolutionTime: 7200000 // 2 hours
                    },
                    recentTickets: [
                        { _id: '1', ticketId: 'TIC-1021', subject: 'Login issue', status: 'In Progress', priority: 'high', createdAt: new Date() },
                        { _id: '2', ticketId: 'TIC-1022', subject: 'Refund request', status: 'Open', priority: 'medium', createdAt: new Date() }
                    ]
                });
            } finally {
                setLoading(false);
            }
        };
        fetchAgentDetail();
    }, [id]);

    if (loading) {
        return (
            <div className="animate-pulse space-y-8">
                <div className="h-10 w-48 bg-slate-200 rounded-xl"></div>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="h-80 bg-white rounded-2xl border border-slate-100 lg:col-span-1"></div>
                    <div className="h-80 bg-white rounded-2xl border border-slate-100 lg:col-span-2"></div>
                </div>
            </div>
        );
    }

    if (!data) return <div className="text-center py-20">Agent not found</div>;

    const { agent, recentTickets } = data;
    const efficiency = Math.round((agent.ticketsClosedCount / agent.assignedTicketsCount) * 100) || 0;

    return (
        <div className="space-y-8 animate-in fade-in duration-500 pb-12">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <button
                    onClick={() => navigate('/admin/agents')}
                    className="flex items-center space-x-2 text-slate-500 hover:text-slate-900 transition-colors font-semibold group"
                >
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    <span>Back to Agents</span>
                </button>
                <div className="flex items-center space-x-2 text-xs font-bold text-slate-400 uppercase tracking-widest bg-slate-100 px-3 py-1 rounded-full">
                    <Shield className="w-3 h-3" />
                    <span>{agent.role} Account</span>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Profile Card */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm text-center relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-2 bg-primary-600"></div>
                        <div className="w-24 h-24 rounded-3xl bg-primary-50 text-primary-600 flex items-center justify-center text-3xl font-black mx-auto mb-6 border border-primary-100 overflow-hidden">
                            {agent.avatar ? (
                                <img src={agent.avatar} alt={agent.name} className="w-full h-full object-cover" />
                            ) : (
                                agent.name.charAt(0)
                            )}
                        </div>
                        <h2 className="text-2xl font-black text-slate-900 tracking-tight">{agent.name}</h2>
                        <div className="flex items-center justify-center space-x-2 text-slate-500 mt-2 mb-8">
                            <Mail className="w-4 h-4" />
                            <span className="text-sm font-medium">{agent.email}</span>
                        </div>

                        <div className="grid grid-cols-2 gap-4 border-t border-slate-50 pt-8">
                            <div className="text-left">
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Efficiency</p>
                                <p className="text-xl font-black text-slate-900">{efficiency}%</p>
                            </div>
                            <div className="text-left">
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Resolved</p>
                                <p className="text-xl font-black text-emerald-600">{agent.ticketsClosedCount}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">Performance Details</h3>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50/50">
                                <div className="flex items-center space-x-3">
                                    <div className="w-8 h-8 rounded-lg bg-white shadow-sm flex items-center justify-center">
                                        <Ticket className="w-4 h-4 text-primary-600" />
                                    </div>
                                    <span className="text-sm font-bold text-slate-600">Total Assigned</span>
                                </div>
                                <span className="text-sm font-black text-slate-900">{agent.assignedTicketsCount}</span>
                            </div>

                            <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50/50">
                                <div className="flex items-center space-x-3">
                                    <div className="w-8 h-8 rounded-lg bg-white shadow-sm flex items-center justify-center">
                                        <Clock className="w-4 h-4 text-amber-500" />
                                    </div>
                                    <span className="text-sm font-bold text-slate-600">Avg. Resolution</span>
                                </div>
                                <span className="text-sm font-black text-slate-900">
                                    {agent.averageResolutionTime ? `${Math.round(agent.averageResolutionTime / 3600000)}h` : 'N/A'}
                                </span>
                            </div>

                            <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50/50">
                                <div className="flex items-center space-x-3">
                                    <div className="w-8 h-8 rounded-lg bg-white shadow-sm flex items-center justify-center">
                                        <TrendingUp className="w-4 h-4 text-emerald-500" />
                                    </div>
                                    <span className="text-sm font-bold text-slate-600">Success Rate</span>
                                </div>
                                <span className="text-sm font-black text-emerald-600">{efficiency}%</span>
                            </div>

                            {agent.phoneNumber && (
                                <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50/50">
                                    <div className="flex items-center space-x-3">
                                        <div className="w-8 h-8 rounded-lg bg-white shadow-sm flex items-center justify-center">
                                            <Phone className="w-4 h-4 text-primary-600" />
                                        </div>
                                        <span className="text-sm font-bold text-slate-600">Phone</span>
                                    </div>
                                    <span className="text-sm font-black text-slate-900">{agent.phoneNumber}</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Main Content - Recent Work */}
                <div className="lg:col-span-2 space-y-8">
                    <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden min-h-[500px] flex flex-col">
                        <div className="p-6 border-b border-slate-50 flex items-center justify-between bg-white">
                            <h3 className="text-lg font-black text-slate-900 tracking-tight">Recent Activity Log</h3>
                            <div className="flex items-center space-x-2 text-xs font-bold text-slate-400">
                                <Calendar className="w-4 h-4" />
                                <span>Last 30 Days</span>
                            </div>
                        </div>

                        <div className="flex-1 overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-slate-50/50">
                                    <tr className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">
                                        <th className="px-6 py-4">Ticket</th>
                                        <th className="px-6 py-4">Subject</th>
                                        <th className="px-6 py-4">Status</th>
                                        <th className="px-6 py-4">Priority</th>
                                        <th className="px-6 py-4 text-right">Date</th>
                                        <th className="px-6 py-4 w-10"></th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-50">
                                    {recentTickets.length > 0 ? (
                                        recentTickets.map((ticket) => (
                                            <tr
                                                key={ticket._id}
                                                className="hover:bg-slate-50 transition-colors cursor-pointer group"
                                                onClick={() => navigate(`/tickets/${ticket._id}`)}
                                            >
                                                <td className="px-6 py-5">
                                                    <span className="text-sm font-black text-slate-900">#{ticket.ticketId}</span>
                                                </td>
                                                <td className="px-6 py-5">
                                                    <p className="text-sm font-bold text-slate-600 truncate max-w-[200px]">{ticket.subject}</p>
                                                </td>
                                                <td className="px-6 py-5">
                                                    <StatusBadge status={ticket.status} />
                                                </td>
                                                <td className="px-6 py-5">
                                                    <PriorityBadge priority={ticket.priority} />
                                                </td>
                                                <td className="px-6 py-5 text-right">
                                                    <span className="text-xs font-bold text-slate-400">{formatDate(ticket.createdAt)}</span>
                                                </td>
                                                <td className="px-6 py-5 text-right">
                                                    <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-primary-600 transition-colors" />
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="6" className="px-6 py-20 text-center">
                                                <div className="flex flex-col items-center">
                                                    <Ticket className="w-12 h-12 text-slate-200 mb-4" />
                                                    <p className="text-slate-400 font-bold">No recent tickets found</p>
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>

                        <div className="p-6 border-t border-slate-50 text-center">
                            <button
                                onClick={() => navigate('/tickets')}
                                className="text-sm font-black text-primary-600 hover:text-primary-700 transition-colors uppercase tracking-widest"
                            >
                                View All Tickets System-wide
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AgentDetail;
