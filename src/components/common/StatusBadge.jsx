import React from 'react';
import { useOperations } from '../../context/OperationsContext';

export const StatusBadge = ({ status = 'reported', size = 'md' }) => {
  const { t } = useOperations();
  const normStatus = (status || '').toLowerCase().replace(/[\s-]/g, '_');

  const configs = {
    // Incident statuses
    reported: {
      bg: 'bg-slate-100 border-slate-300 text-slate-700',
      dot: 'bg-slate-500',
      label: t('statusReported'),
    },
    verified: {
      bg: 'bg-blue-50 border-blue-200 text-[#174A78]',
      dot: 'bg-[#2867A5]',
      label: t('statusVerified'),
    },
    dispatched: {
      bg: 'bg-amber-50 border-amber-300 text-amber-800',
      dot: 'bg-[#E58A16]',
      label: t('statusDispatched'),
    },
    responding: {
      bg: 'bg-sky-50 border-sky-300 text-sky-800',
      dot: 'bg-sky-600',
      label: t('statusResponding'),
    },
    on_scene: {
      bg: 'bg-indigo-50 border-indigo-200 text-indigo-800',
      dot: 'bg-indigo-600',
      label: t('statusOnScene'),
    },
    resolved: {
      bg: 'bg-emerald-50 border-emerald-300 text-[#218653]',
      dot: 'bg-[#218653]',
      label: t('statusResolved'),
    },
    // Unit statuses
    available: {
      bg: 'bg-emerald-50 border-emerald-300 text-[#218653]',
      dot: 'bg-[#218653]',
      label: t('statusAvailable'),
    },
    en_route: {
      bg: 'bg-sky-50 border-sky-300 text-sky-800',
      dot: 'bg-sky-600',
      label: t('statusEnRoute'),
    },
    maintenance: {
      bg: 'bg-slate-100 border-slate-300 text-slate-600',
      dot: 'bg-slate-400',
      label: t('statusMaintenance'),
    },
    unavailable: {
      bg: 'bg-slate-100 border-slate-300 text-slate-600',
      dot: 'bg-slate-400',
      label: t('statusUnavailable'),
    },
  };

  const current = configs[normStatus] || {
    bg: 'bg-slate-100 border-slate-300 text-slate-700',
    dot: 'bg-slate-400',
    label: normStatus,
  };

  const sizeClasses = {
    sm: 'text-[11px] px-2 py-0.5 gap-1.5 font-medium',
    md: 'text-xs px-2.5 py-1 gap-1.5 font-medium',
  }[size] || 'text-xs px-2.5 py-1 gap-1.5 font-medium';

  return (
    <span
      className={`inline-flex items-center rounded border ${current.bg} ${sizeClasses}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${current.dot}`} />
      <span>{current.label}</span>
    </span>
  );
};
