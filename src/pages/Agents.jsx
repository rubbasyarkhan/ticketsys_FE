import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, User, CheckCircle2, Clock, TrendingUp, Search } from 'lucide-react';
import api from '../api/axios';

const Agents = () => {
    const [agents, setAgents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAgents = async () => {
            try {
                const response = await api.get('/admin/agent-stats');
                setAgents(response.data.data || []);
            } catch (error) {
                console.error('Error fetching agents:', error);
                // Mock data
                setAgents([
                    { _id: '1', name: 'John Doe', email: 'john@example.com', role: 'agent', ticketsAssigned: 24, ticketsClosed: 18, avgResolution: '2.5h' },
                    { _id: '2', name: 'Alice Smith', email: 'alice@example.com', role: 'agent', ticketsAssigned: 15, ticketsClosed: 12, avgResolution: '1.2h' },
                    { _id: '3', name: 'Bob Wilson', email: 'bob@example.com', role: 'admin', ticketsAssigned: 8, ticketsClosed: 8, avgResolution: '0.8h' },
                    { _id: '4', name: 'James Brown', email: 'james@example.com', role: 'agent', ticketsAssigned: 32, ticketsClosed: 25, avgResolution: '4.1h' },
                ]);
            } finally {
                setLoading(false);
            }
        };
        fetchAgents();
    }, []);

    const filteredAgents = agents.filter(agent =>
        agent.name.toLowerCase().includes(search.toLowerCase()) ||
        agent.email.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Agent Performance</h1>
                    <p className="text-slate-500 text-sm mt-1">Monitor and manage your support team efficiency.</p>
                </div>
                <div className="flex items-center space-x-4">
                    <button
                        onClick={() => navigate('/admin/agents/new')}
                        className="flex items-center space-x-2 px-6 py-2.5 bg-primary-600 hover:bg-primary-700 text-white rounded-xl text-sm font-bold transition-all shadow-lg shadow-primary-100"
                    >
                        <Users className="w-4 h-4" />
                        <span>Add New Agent</span>
                    </button>
                    <div className="relative w-64">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                        <input
                            type="text"
                            placeholder="Search agents..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 focus:outline-none transition-all shadow-sm"
                        />
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
                    <p className="text-sm font-medium text-slate-500">Active Agents</p>
                    <div className="flex items-center mt-2 space-x-3">
                        <h3 className="text-2xl font-bold text-slate-900">{agents.length}</h3>
                        <span className="text-xs font-bold text-emerald-500 bg-emerald-50 px-2 py-0.5 rounded-full">+2 today</span>
                    </div>
                </div>
                <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
                    <p className="text-sm font-medium text-slate-500">Avg. Resolution</p>
                    <h3 className="text-2xl font-bold text-slate-900 mt-2">1.8h</h3>
                </div>
                <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
                    <p className="text-sm font-medium text-slate-500">Total Solved</p>
                    <h3 className="text-2xl font-bold text-slate-900 mt-2">1,204</h3>
                </div>
                <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
                    <p className="text-sm font-medium text-slate-500">Customer Satisfaction</p>
                    <h3 className="text-2xl font-bold text-slate-900 mt-2">94%</h3>
                </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-slate-50 border-b border-slate-100">
                            <tr className="text-slate-500 text-xs font-bold uppercase tracking-wider">
                                <th className="px-6 py-4">Agent Name</th>
                                <th className="px-6 py-4 text-center">Assigned</th>
                                <th className="px-6 py-4 text-center">Closed</th>
                                <th className="px-6 py-4 text-center">Avg. Time</th>
                                <th className="px-6 py-4">Efficiency</th>
                                <th className="px-6 py-4">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {loading ? (
                                [...Array(4)].map((_, i) => (
                                    <tr key={i} className="animate-pulse">
                                        <td className="px-6 py-4"><div className="h-10 w-40 bg-slate-100 rounded"></div></td>
                                        <td className="px-6 py-4"><div className="h-6 w-10 bg-slate-100 rounded mx-auto"></div></td>
                                        <td className="px-6 py-4"><div className="h-6 w-10 bg-slate-100 rounded mx-auto"></div></td>
                                        <td className="px-6 py-4"><div className="h-6 w-16 bg-slate-100 rounded mx-auto"></div></td>
                                        <td className="px-6 py-4"><div className="h-2 w-full bg-slate-100 rounded mt-2"></div></td>
                                        <td className="px-6 py-4"><div className="h-6 w-20 bg-slate-100 rounded"></div></td>
                                    </tr>
                                ))
                            ) : (
                                filteredAgents.map((agent) => {
                                    const efficiency = Math.round((agent.ticketsClosedCount / agent.assignedTicketsCount) * 100) || 0;
                                    return (
                                        <tr
                                            key={agent._id}
                                            className="hover:bg-slate-50 transition-colors cursor-pointer group"
                                            onClick={() => navigate(`/admin/agents/${agent._id}`)}
                                        >
                                            <td className="px-6 py-4">
                                                <div className="flex items-center space-x-3">
                                                    <div className="w-10 h-10 rounded-full bg-primary-50 text-primary-600 flex items-center justify-center font-bold border border-primary-100 overflow-hidden">
                                                        {agent.avatar ? (
                                                            <img src={agent.avatar} alt={agent.name} className="w-full h-full object-cover" />
                                                        ) : (
                                                            agent.name.charAt(0)
                                                        )}
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-bold text-slate-900">{agent.name}</p>
                                                        <p className="text-xs text-slate-500">{agent.email}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                <span className="text-sm font-semibold text-slate-700">{agent.assignedTicketsCount}</span>
                                            </td>
                                            <td className="px-6 py-4 text-center text-emerald-600 font-bold">
                                                {agent.ticketsClosedCount}
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                <div className="flex items-center justify-center space-x-1 text-slate-600">
                                                    <Clock className="w-3 h-3" />
                                                    <span className="text-xs font-medium">{agent.avgResolution}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 min-w-[150px]">
                                                <div className="w-full bg-slate-100 rounded-full h-1.5 mt-2">
                                                    <div
                                                        className={`h-1.5 rounded-full transition-all duration-1000 ${efficiency > 80 ? 'bg-emerald-500' : efficiency > 50 ? 'bg-amber-500' : 'bg-red-500'
                                                            }`}
                                                        style={{ width: `${efficiency}%` }}
                                                    ></div>
                                                </div>
                                                <span className="text-[10px] font-bold text-slate-400 mt-1 block uppercase tracking-wider">{efficiency}% Efficiency</span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-700 border border-emerald-200">
                                                    Online
                                                </span>
                                            </td>
                                        </tr>
                                    );
                                })
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Agents;
