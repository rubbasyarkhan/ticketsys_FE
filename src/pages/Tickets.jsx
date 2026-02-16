import React, { useState, useEffect } from 'react';
import { Search, Filter, Plus, X } from 'lucide-react';
import TicketTable from '../components/TicketTable';
import Pagination from '../components/Pagination';
import api from '../api/axios';

const Tickets = () => {
    const [tickets, setTickets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [search, setSearch] = useState('');
    const [filters, setFilters] = useState({
        status: '',
        priority: '',
        assignedAgent: ''
    });
    const [showFilters, setShowFilters] = useState(false);

    useEffect(() => {
        const fetchTickets = async () => {
            setLoading(true);
            try {
                const queryParams = new URLSearchParams({
                    page,
                    limit: 10,
                    search,
                    ...filters
                });
                const response = await api.get(`/tickets?${queryParams.toString()}`);
                setTickets(response.data.tickets || response.data);
                setTotalPages(response.data.totalPages || 1);
            } catch (error) {
                console.error('Error fetching tickets:', error);
                // Mock data for demo if API fails
                setTickets([
                    { _id: '1', ticketId: 'TIC-1021', subject: 'Server Connection Error', email: 'user@example.com', priority: 'high', status: 'open', assignedTo: { name: 'John Doe' }, createdAt: new Date() },
                    { _id: '2', ticketId: 'TIC-1022', subject: 'Password Reset Request', email: 'jane@test.com', priority: 'medium', status: 'in-progress', assignedTo: { name: 'Alice Smith' }, createdAt: new Date() },
                    { _id: '3', ticketId: 'TIC-1023', subject: 'New Feature Suggestion', email: 'bob@corp.com', priority: 'low', status: 'closed', assignedTo: { name: 'John Doe' }, createdAt: new Date() },
                ]);
            } finally {
                setLoading(false);
            }
        };
        fetchTickets();
    }, [page, search, filters]);

    const handleFilterChange = (e) => {
        setFilters({ ...filters, [e.target.name]: e.target.value });
        setPage(1);
    };

    const clearFilters = () => {
        setFilters({ status: '', priority: '', assignedAgent: '' });
        setSearch('');
        setPage(1);
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">All Tickets</h1>
                    <p className="text-slate-500 text-sm mt-1">Manage and respond to customer inquiries.</p>
                </div>
                <button className="flex items-center justify-center space-x-2 bg-primary-600 hover:bg-primary-700 text-white px-4 py-2.5 rounded-xl font-bold transition-all shadow-lg shadow-primary-200">
                    <Plus className="w-5 h-5" />
                    <span>New Ticket</span>
                </button>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm space-y-4">
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Search by ID or email..."
                            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:outline-none transition-all"
                            value={search}
                            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                        />
                    </div>
                    <button
                        onClick={() => setShowFilters(!showFilters)}
                        className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl border border-slate-200 transition-all ${showFilters ? 'bg-primary-50 text-primary-600 border-primary-200' : 'bg-white text-slate-600 hover:bg-slate-50'}`}
                    >
                        <Filter className="w-5 h-5" />
                        <span className="font-semibold">Filters</span>
                    </button>
                </div>

                {showFilters && (
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 bg-slate-50 rounded-xl border border-slate-100 animate-in slide-in-from-top duration-300">
                        <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Status</label>
                            <select
                                name="status"
                                value={filters.status}
                                onChange={handleFilterChange}
                                className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary-500 focus:outline-none"
                            >
                                <option value="">All Statuses</option>
                                <option value="open">Open</option>
                                <option value="in-progress">In Progress</option>
                                <option value="closed">Closed</option>
                                <option value="pending">Pending</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Priority</label>
                            <select
                                name="priority"
                                value={filters.priority}
                                onChange={handleFilterChange}
                                className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary-500 focus:outline-none"
                            >
                                <option value="">All Priorities</option>
                                <option value="low">Low</option>
                                <option value="medium">Medium</option>
                                <option value="high">High</option>
                                <option value="urgent">Urgent</option>
                            </select>
                        </div>
                        <div className="flex items-end space-x-2">
                            <div className="flex-1">
                                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Agent</label>
                                <select
                                    name="assignedAgent"
                                    value={filters.assignedAgent}
                                    onChange={handleFilterChange}
                                    className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary-500 focus:outline-none"
                                >
                                    <option value="">All Agents</option>
                                    <option value="me">Assigned to Me</option>
                                    <option value="unassigned">Unassigned</option>
                                </select>
                            </div>
                            <button
                                onClick={clearFilters}
                                className="p-2 text-slate-400 hover:text-red-500 transition-colors"
                                title="Clear Filters"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                )}
            </div>

            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                <TicketTable tickets={tickets} loading={loading} />
                <Pagination
                    currentPage={page}
                    totalPages={totalPages}
                    onPageChange={setPage}
                />
            </div>
        </div>
    );
};

export default Tickets;
