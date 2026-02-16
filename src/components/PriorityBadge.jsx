import React from 'react';

const PriorityBadge = ({ priority }) => {
    const styles = {
        low: 'bg-slate-100 text-slate-700 border-slate-200',
        medium: 'bg-amber-100 text-amber-700 border-amber-200',
        high: 'bg-orange-100 text-orange-700 border-orange-200',
        urgent: 'bg-red-100 text-red-700 border-red-200',
    };

    const currentStyle = styles[priority?.toLowerCase()] || styles.medium;

    return (
        <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border ${currentStyle} capitalize`}>
            {priority || 'Medium'}
        </span>
    );
};

export default PriorityBadge;
