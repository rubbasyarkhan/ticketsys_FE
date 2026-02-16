import React from 'react';
import { Search, Bell, Menu, User } from 'lucide-react';
import useAuth from '../hooks/useAuth';

const Header = ({ onMenuClick }) => {
    const { user } = useAuth();

    return (
        <header className="sticky top-0 z-30 flex h-16 w-full items-center bg-white/80 backdrop-blur-md border-b border-slate-200 px-4 transition-all">
            <button
                type="button"
                className="mr-4 text-slate-500 lg:hidden focus:outline-none"
                onClick={onMenuClick}
            >
                <Menu className="h-6 w-6" />
            </button>

            <div className="hidden lg:flex flex-1 items-center space-x-4">
                <div className="relative w-96 max-w-lg">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <Search className="h-4 w-4 text-slate-400" />
                    </div>
                    <input
                        type="text"
                        className="block w-full rounded-full border border-slate-200 bg-slate-50 py-2 pl-10 pr-3 text-sm placeholder-slate-400 focus:border-primary-500 focus:bg-white focus:ring-1 focus:ring-primary-500 focus:outline-none transition-all"
                        placeholder="Search tickets, customers, or messages..."
                    />
                </div>
            </div>

            <div className="flex flex-1 items-center justify-end space-x-4 lg:flex-none">
                <button className="relative rounded-full p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-700 transition-colors">
                    <Bell className="h-5 w-5" />
                    <span className="absolute top-2 right-2 flex h-2 w-2 rounded-full bg-red-500 border border-white"></span>
                </button>

                <div className="h-8 w-px bg-slate-200"></div>

                <div className="flex items-center space-x-3 pl-2">
                    <div className="hidden text-right lg:block">
                        <p className="text-sm font-semibold text-slate-900 leading-none">{user?.name}</p>
                        <p className="mt-1 text-xs font-medium text-slate-500 leading-none capitalize">{user?.role}</p>
                    </div>
                    <div className="h-10 w-10 overflow-hidden rounded-full border border-slate-200 bg-slate-100 flex items-center justify-center">
                        {user?.avatar ? (
                            <img src={user.avatar} alt={user.name} className="h-full w-full object-cover" />
                        ) : (
                            <User className="h-6 w-6 text-slate-400" />
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
