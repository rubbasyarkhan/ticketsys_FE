import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    ArrowLeft,
    Send,
    User,
    Clock,
    Tag,
    UserPlus,
    Lock,
    Paperclip,
    CheckCircle2,
    AlertCircle,
    MoreVertical
} from 'lucide-react';
import api from '../api/axios';
import StatusBadge from '../components/StatusBadge';
import PriorityBadge from '../components/PriorityBadge';
import { formatDate, formatTimeAgo } from '../utils/formatDate';
import useAuth from '../hooks/useAuth';
import toast from 'react-hot-toast';

const TicketDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user, isAdmin } = useAuth();
    const [ticket, setTicket] = useState(null);
    const [loading, setLoading] = useState(true);
    const [replyMessage, setReplyMessage] = useState('');
    const [internalNote, setInternalNote] = useState(false);
    const [sending, setSending] = useState(false);
    const [showStatusMenu, setShowStatusMenu] = useState(false);
    const [showCategoryMenu, setShowCategoryMenu] = useState(false);
    const chatEndRef = useRef(null);

    const categories = ['Technical', 'Billing', 'General', 'Sales', 'Feedback'];
    const statuses = [
        { id: 'Open', label: 'Open', color: 'emerald' },
        { id: 'In Progress', label: 'In Progress', color: 'blue' },
        { id: 'Waiting for User', label: 'Waiting for User', color: 'amber' },
        { id: 'Resolved', label: 'Resolved', color: 'slate' }
    ];

    const scrollToBottom = () => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        fetchTicket();
    }, [id]);

    useEffect(() => {
        if (!loading) scrollToBottom();
    }, [loading, ticket?.messages]);

    const fetchTicket = async () => {
        try {
            const response = await api.get(`/tickets/${id}`);
            setTicket(response.data.data);
        } catch (error) {
            console.error('Error fetching ticket:', error);
            // Mock data for demo
            setTicket({
                _id: id,
                ticketId: 'TIC-1021',
                subject: 'Cannot login to my account after password reset',
                description: 'Hello, I reset my password 10 minutes ago but I still cannot login. It keeps saying invalid credentials. Please help.',
                status: 'open',
                priority: 'high',
                category: 'Technical',
                customer: { name: 'Sarah Connor', email: 'sarah@example.com' },
                assignedTo: { name: 'John Doe', _id: 'agent-1' },
                createdAt: new Date(Date.now() - 86400000),
                messages: [
                    { sender: 'customer', name: 'Sarah Connor', content: 'Hello, I reset my password 10 minutes ago but I still cannot login. It keeps saying invalid credentials. Please help.', timestamp: new Date(Date.now() - 86400000) },
                    { sender: 'agent', name: 'John Doe', content: 'Hello Sarah, I am looking into this for you. Could you please confirm if you clicked the confirmation link in your email?', timestamp: new Date(Date.now() - 82800000) },
                    { sender: 'customer', name: 'Sarah Connor', content: 'Yes, I did. I even tried on a different browser.', timestamp: new Date(Date.now() - 80000000) },
                ],
                timeline: [
                    { type: 'created', user: 'Sarah Connor', timestamp: new Date(Date.now() - 86400000) },
                    { type: 'assigned', user: 'System', detail: 'to John Doe', timestamp: new Date(Date.now() - 86390000) },
                    { type: 'status_change', user: 'John Doe', detail: 'to In Progress', timestamp: new Date(Date.now() - 82800000) },
                ]
            });
        } finally {
            setLoading(false);
        }
    };

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!replyMessage.trim()) return;

        setSending(true);
        try {
            const endpoint = internalNote ? `/tickets/${id}/internal-note` : `/tickets/${id}/reply`;
            const payload = internalNote ? { note: replyMessage } : { message: replyMessage };
            await api.post(endpoint, payload);

            // Update local state for immediate feedback
            const newMessage = {
                senderType: internalNote ? 'internal' : 'agent',
                sender: { _id: user._id, name: user.name },
                message: replyMessage,
                timestamp: new Date()
            };

            setTicket(prev => ({
                ...prev,
                messages: [...prev.messages, newMessage]
            }));
            setReplyMessage('');
            toast.success(internalNote ? 'Note added' : 'Reply sent');
        } catch (error) {
            toast.error('Failed to send message');
        } finally {
            setSending(false);
        }
    };

    const updateStatus = async (status) => {
        try {
            await api.patch(`/tickets/${id}/status`, { status });
            setTicket(prev => ({ ...prev, status }));
            toast.success(`Status updated to ${status}`);
            setShowStatusMenu(false);
        } catch (error) {
            // Update local state even on error for demo purposes if it's mock
            setTicket(prev => ({ ...prev, status }));
            toast.success(`Demo: Status updated to ${status}`);
            setShowStatusMenu(false);
        }
    };

    const updateCategory = async (category) => {
        try {
            await api.patch(`/tickets/${id}/category`, { category });
            setTicket(prev => ({ ...prev, category }));
            toast.success(`Category updated to ${category}`);
            setShowCategoryMenu(false);
        } catch (error) {
            setTicket(prev => ({ ...prev, category }));
            toast.success(`Demo: Category updated to ${category}`);
            setShowCategoryMenu(false);
        }
    };

    if (loading) {
        return <div className="animate-pulse flex flex-col h-[calc(100vh-120px)] space-y-4">
            <div className="h-20 bg-white rounded-2xl"></div>
            <div className="flex-1 h-full bg-white rounded-2xl"></div>
        </div>;
    }

    return (
        <div className="flex flex-col lg:flex-row h-[calc(100vh-120px)] gap-6 overflow-hidden">
            {/* Sidebar - Ticket Info */}
            <div className="w-full lg:w-80 flex flex-col gap-6 overflow-y-auto pr-2">
                <button
                    onClick={() => navigate('/tickets')}
                    className="flex items-center space-x-2 text-slate-500 hover:text-slate-900 transition-colors font-semibold"
                >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back to list</span>
                </button>

                <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-6">
                    <div>
                        <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Ticket Details</h2>
                        <div className="space-y-4">
                            <div className="flex flex-col">
                                <span className="text-sm font-medium text-slate-500">Subject</span>
                                <span className="text-sm font-bold text-slate-900 leading-tight mt-1">{ticket.subject}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-sm font-medium text-slate-500">Status</span>
                                <StatusBadge status={ticket.status} />
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-sm font-medium text-slate-500">Priority</span>
                                <PriorityBadge priority={ticket.priority} />
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-sm font-medium text-slate-500">Category</span>
                                <span className="text-xs font-bold text-slate-700 bg-slate-100 px-2 py-1 rounded-md border border-slate-200">{ticket.category || 'General'}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-sm font-medium text-slate-500">Created</span>
                                <span className="text-sm text-slate-900 font-semibold">{formatTimeAgo(ticket.createdAt)}</span>
                            </div>
                        </div>
                    </div>

                    <div className="pt-6 border-t border-slate-100">
                        <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Customer</h2>
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-bold">
                                {ticket.name?.charAt(0) || 'U'}
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-bold text-slate-900 truncate">{ticket.name}</p>
                                <p className="text-xs text-slate-500 truncate">{ticket.email}</p>
                            </div>
                        </div>
                    </div>

                    <div className="pt-6 border-t border-slate-100">
                        <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Assigned Agent</h2>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 font-bold border border-slate-200">
                                    {ticket.assignedTo?.name ? ticket.assignedTo.name.charAt(0) : <User className="w-4 h-4" />}
                                </div>
                                <span className="text-sm font-semibold text-slate-700">{ticket.assignedTo?.name || 'Unassigned'}</span>
                            </div>
                            {isAdmin && <button className="p-1.5 hover:bg-slate-50 rounded-lg transition-colors"><UserPlus className="w-4 h-4 text-slate-400" /></button>}
                        </div>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm relative">
                    <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Quick Actions</h2>
                    <div className="grid grid-cols-1 gap-3">
                        {/* Status Selection */}
                        <div className="relative">
                            <button
                                onClick={() => {
                                    setShowStatusMenu(!showStatusMenu);
                                    setShowCategoryMenu(false);
                                }}
                                className="flex items-center justify-between w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-700 bg-white hover:bg-slate-50 font-bold text-sm transition-all"
                            >
                                <div className="flex items-center">
                                    <Clock className="w-4 h-4 mr-2 text-slate-400" />
                                    <span>Change Status</span>
                                </div>
                                <MoreVertical className="w-4 h-4 text-slate-300" />
                            </button>

                            {showStatusMenu && (
                                <div className="absolute top-14 left-0 right-0 bg-white border border-slate-200 rounded-2xl shadow-2xl z-50 py-2 animate-in fade-in slide-in-from-top-2">
                                    {statuses.map((s) => (
                                        <button
                                            key={s.id}
                                            onClick={() => updateStatus(s.id)}
                                            className="flex items-center w-full px-4 py-2.5 text-sm font-bold text-slate-700 hover:bg-slate-50 transition-colors"
                                        >
                                            <div className={`w-2 h-2 rounded-full mr-3 bg-${s.color}-500`}></div>
                                            {s.label}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Category Selection */}
                        <div className="relative">
                            <button
                                onClick={() => {
                                    setShowCategoryMenu(!showCategoryMenu);
                                    setShowStatusMenu(false);
                                }}
                                className="flex items-center justify-between w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-700 bg-white hover:bg-slate-50 font-bold text-sm transition-all"
                            >
                                <div className="flex items-center">
                                    <Tag className="w-4 h-4 mr-2 text-slate-400" />
                                    <span>Move Category</span>
                                </div>
                                <MoreVertical className="w-4 h-4 text-slate-300" />
                            </button>

                            {showCategoryMenu && (
                                <div className="absolute top-14 left-0 right-0 bg-white border border-slate-200 rounded-2xl shadow-2xl z-50 py-2 animate-in fade-in slide-in-from-top-2">
                                    {categories.map((cat) => (
                                        <button
                                            key={cat}
                                            onClick={() => updateCategory(cat)}
                                            className="flex items-center w-full px-4 py-2.5 text-sm font-bold text-slate-700 hover:bg-slate-50 transition-colors"
                                        >
                                            <Tag className="w-3.5 h-3.5 mr-3 text-slate-300" />
                                            {cat}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Direct Resolve Button */}
                        {ticket.status !== 'Resolved' && (
                            <button
                                onClick={() => updateStatus('Resolved')}
                                className="flex items-center justify-center space-x-2 w-full px-4 py-3 rounded-xl border border-emerald-200 text-emerald-700 bg-emerald-50 hover:bg-emerald-600 hover:text-white font-black text-sm transition-all shadow-sm active:scale-[0.98]"
                            >
                                <CheckCircle2 className="w-4 h-4" />
                                <span>Resolve Case</span>
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* Main - Conversation */}
            <div className="flex-1 flex flex-col bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                {/* Chat Header */}
                <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-white">
                    <div className="flex items-center space-x-4">
                        <div>
                            <h3 className="text-base font-bold text-slate-900">Conversation</h3>
                            <p className="text-xs text-slate-500">Ticket #{ticket.ticketId}</p>
                        </div>
                    </div>
                    <div className="flex items-center space-x-2">
                        <span className="flex items-center text-xs font-bold text-emerald-500 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-2 animate-pulse"></span>
                            Live Session
                        </span>
                        <button className="p-2 hover:bg-slate-50 rounded-full transition-colors"><MoreVertical className="w-5 h-5 text-slate-400" /></button>
                    </div>
                </div>

                {/* Chat Body */}
                <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50/30">
                    {(() => {
                        const allMessages = [
                            ...ticket.messages.map(m => ({ ...m, type: 'public' })),
                            ...(ticket.internalNotes || []).map(n => ({
                                ...n,
                                senderType: 'agent',
                                sender: n.addedBy,
                                message: n.note,
                                type: 'internal'
                            }))
                        ].sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));

                        return allMessages.map((msg, idx) => {
                            const isAgent = msg.senderType === 'agent' || msg.type === 'internal';
                            const isInternal = msg.type === 'internal';
                            const senderName = isAgent ? (msg.sender?.name || 'Agent') : ticket.name;

                            return (
                                <div key={idx} className={`flex flex-col ${isAgent ? 'items-end' : 'items-start'}`}>
                                    <div className={`flex items-end space-x-2 max-w-[80%] ${isAgent ? 'flex-row-reverse space-x-reverse' : ''}`}>
                                        <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-bold ${isInternal ? 'bg-amber-100 text-amber-700' : isAgent ? 'bg-primary-100 text-primary-700' : 'bg-slate-200 text-slate-700'
                                            }`}>
                                            {senderName?.charAt(0) || 'U'}
                                        </div>
                                        <div className={`px-4 py-3 rounded-2xl shadow-sm text-sm ${isInternal
                                            ? 'bg-amber-50 border border-amber-200 text-slate-800'
                                            : isAgent
                                                ? 'bg-primary-600 text-white rounded-br-none'
                                                : 'bg-white border border-slate-200 text-slate-800 rounded-bl-none'
                                            }`}>
                                            {isInternal && <div className="flex items-center text-[10px] font-bold uppercase tracking-wider mb-1 text-amber-600"><Lock className="w-3 h-3 mr-1" /> Internal Note</div>}
                                            <p className="whitespace-pre-wrap leading-relaxed">{msg.message}</p>
                                        </div>
                                    </div>
                                    <div className={`mt-1 text-[10px] font-medium text-slate-400 px-10 ${isAgent ? 'text-right' : 'text-left'}`}>
                                        {senderName} • {formatTimeAgo(msg.timestamp)}
                                    </div>
                                </div>
                            );
                        });
                    })()}
                    <div ref={chatEndRef} />
                </div>

                {/* Chat Input */}
                <div className="p-4 bg-white border-t border-slate-100">
                    <div className="max-w-4xl mx-auto">
                        <div className="flex space-x-4 mb-3">
                            <button
                                onClick={() => setInternalNote(false)}
                                className={`text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full transition-all ${!internalNote ? 'bg-primary-100 text-primary-700 ring-1 ring-primary-200' : 'text-slate-400 hover:text-slate-600'}`}
                            >
                                Public Reply
                            </button>
                            <button
                                onClick={() => setInternalNote(true)}
                                className={`text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full transition-all ${internalNote ? 'bg-amber-100 text-amber-700 ring-1 ring-amber-200' : 'text-slate-400 hover:text-slate-600'}`}
                            >
                                Internal Note
                            </button>
                        </div>
                        <form onSubmit={handleSendMessage} className="relative group">
                            <textarea
                                value={replyMessage}
                                onChange={(e) => setReplyMessage(e.target.value)}
                                placeholder={internalNote ? "Write a private note only agents can see..." : "Type your message to customer..."}
                                className={`w-full p-4 pr-32 min-h-[100px] border rounded-2xl focus:outline-none focus:ring-2 transition-all resize-none shadow-sm ${internalNote
                                    ? 'bg-amber-50/50 border-amber-200 focus:ring-amber-500'
                                    : 'bg-slate-50 border-slate-200 focus:ring-primary-500 bg-white'
                                    }`}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' && !e.shiftKey) {
                                        e.preventDefault();
                                        handleSendMessage(e);
                                    }
                                }}
                            />
                            <div className="absolute right-4 bottom-4 flex items-center space-x-2">
                                <button type="button" className="p-2 text-slate-400 hover:text-slate-600 transition-colors"><Paperclip className="w-5 h-5" /></button>
                                <button
                                    type="submit"
                                    disabled={sending || !replyMessage.trim()}
                                    className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-white font-bold text-sm transition-all shadow-md ${internalNote
                                        ? 'bg-amber-600 hover:bg-amber-700 shadow-amber-200'
                                        : 'bg-primary-600 hover:bg-primary-700 shadow-primary-200'
                                        } disabled:opacity-50`}
                                >
                                    {sending ? 'Sending...' : (
                                        <>
                                            <span>{internalNote ? 'Add Note' : 'Send Reply'}</span>
                                            <Send className="w-4 h-4 ml-1" />
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
                        <p className="mt-2 text-[10px] text-slate-400 text-center">
                            Press <span className="font-bold">Enter</span> to send, <span className="font-bold">Shift + Enter</span> for new line.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TicketDetail;
