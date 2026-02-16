import React from 'react';

const StatusBadge = ({ status }) => {
    const styles = {
        'open': 'bg-emerald-100 text-emerald-700 border-emerald-200',
        'in progress': 'bg-blue-100 text-blue-700 border-blue-200',
        'closed': 'bg-slate-100 text-slate-700 border-slate-200',
        'resolved': 'bg-slate-100 text-slate-700 border-slate-200',
        'waiting for user': 'bg-amber-100 text-amber-700 border-amber-200',
        'pending': 'bg-amber-100 text-amber-700 border-amber-200',
    };

    const currentStyle = styles[status?.toLowerCase()] || styles.open;

    return (
        <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border ${currentStyle} capitalize`}>
            {status || 'Open'}
        </span>
    );
};

export default StatusBadge;
