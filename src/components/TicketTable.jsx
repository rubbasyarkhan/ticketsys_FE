import React from 'react';
import { useNavigate } from 'react-router-dom';
import { User, ChevronRight } from 'lucide-react';
import StatusBadge from './StatusBadge';
import PriorityBadge from './PriorityBadge';
import { formatDate } from '../utils/formatDate';

const TicketTable = ({ tickets, loading }) => {
    const navigate = useNavigate();

    if (loading) {
        return (
            <div className="w-full space-y-4">
                {[...Array(5)].map((_, i) => (
                    <div key={i} className="h-16 bg-slate-50 animate-pulse rounded-xl"></div>
                ))}
            </div>
        );
    }

    if (!tickets?.length) {
        return (
            <div className="text-center py-12 bg-slate-50 rounded-2xl border border-dashed border-slate-300">
                <p className="text-slate-500 font-medium">No tickets found matches your criteria.</p>
            </div>
        );
    }

    return (
        <div className="overflow-x-auto">
            <table className="w-full text-left border-separate border-spacing-y-3">
                <thead>
                    <tr className="text-slate-400 text-xs font-bold uppercase tracking-wider">
                        <th className="px-6 py-3">Ticket ID / Subject</th>
                        <th className="px-6 py-3">Status</th>
                        <th className="px-6 py-3">Priority</th>
                        <th className="px-6 py-3">Assigned To</th>
                        <th className="px-6 py-3 text-right">Created</th>
                        <th className="px-6 py-3 w-10"></th>
                    </tr>
                </thead>
                <tbody>
                    {tickets.map((ticket) => (
                        <tr
                            key={ticket._id}
                            className="bg-white group hover:shadow-md hover:ring-1 hover:ring-primary-100 transition-all cursor-pointer rounded-2xl"
                            onClick={() => navigate(`/tickets/${ticket._id}`)}
                        >
                            <td className="px-6 py-4 first:rounded-l-2xl">
                                <div className="flex flex-col">
                                    <span className="text-slate-900 font-bold text-sm">#{ticket.ticketId || ticket._id.slice(-6).toUpperCase()}</span>
                                    <span className="text-slate-500 text-sm truncate max-w-[200px]">{ticket.subject}</span>
                                </div>
                            </td>
                            <td className="px-6 py-4">
                                <StatusBadge status={ticket.status} />
                            </td>
                            <td className="px-6 py-4">
                                <PriorityBadge priority={ticket.priority} />
                            </td>
                            <td className="px-6 py-4">
                                <div className="flex items-center space-x-2">
                                    <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-600 border border-slate-200">
                                        {ticket.assignedTo?.name ? (
                                            ticket.assignedTo.name.charAt(0)
                                        ) : (
                                            <User className="w-4 h-4" />
                                        )}
                                    </div>
                                    <span className="text-sm font-medium text-slate-700">
                                        {ticket.assignedTo?.name || 'Unassigned'}
                                    </span>
                                </div>
                            </td>
                            <td className="px-6 py-4 text-right">
                                <span className="text-sm text-slate-500">{formatDate(ticket.createdAt)}</span>
                            </td>
                            <td className="px-6 py-4 last:rounded-r-2xl text-right">
                                <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-primary-500 transition-colors" />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TicketTable;
