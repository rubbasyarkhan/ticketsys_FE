import React from 'react';
import { NavLink } from 'react-router-dom';
import {
    LayoutDashboard,
    Ticket,
    Users,
    LogOut,
    HelpCircle
} from 'lucide-react';
import useAuth from '../hooks/useAuth';

const Sidebar = () => {
    const { logout, isAdmin } = useAuth();

    const navItems = [
        { name: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
        { name: 'Tickets', icon: Ticket, path: '/tickets' },
    ];

    if (isAdmin) {
        navItems.push({ name: 'Agents', icon: Users, path: '/admin/agents' });
    }

    return (
        <div className="flex flex-col h-full bg-white border-r border-slate-200">
            <div className="flex items-center justify-center h-16 border-b border-slate-200">
                <span className="text-xl font-bold text-[#0284c7]">TicketingPortal</span>
            </div>

            <div className="flex-1 overflow-y-auto py-4 px-3">
                <div className="space-y-1">
                    {navItems.map((item) => (
                        <NavLink
                            key={item.name}
                            to={item.path}
                            className={({ isActive }) =>
                                `flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${isActive
                                    ? 'bg-[#f0f9ff] text-[#0369a1]'
                                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                                }`
                            }
                        >
                            <item.icon className="w-5 h-5 mr-3" />
                            {item.name}
                        </NavLink>
                    ))}
                </div>

                <div className="mt-8 pt-8 border-t border-slate-200">
                    <p className="px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                        System
                    </p>
                    <div className="mt-4 space-y-1">

                        <button
                            onClick={logout}
                            className="w-full flex items-center px-4 py-3 text-sm font-medium text-red-600 rounded-lg transition-colors hover:bg-red-50"
                        >
                            <LogOut className="w-5 h-5 mr-3" />
                            Logout
                        </button>
                    </div>
                </div>
            </div>

            <div className="p-4 border-t border-slate-200">
                <div className="flex items-center space-x-3 bg-slate-50 p-3 rounded-xl border border-slate-100">
                    <div className="flex-shrink-0">
                        <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-bold">
                            ?
                        </div>
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-slate-900 truncate">Help Center</p>
                        <p className="text-xs text-slate-500 truncate">Need assistance?</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
