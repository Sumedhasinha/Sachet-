import React from 'react';
import { useOperations } from '../../context/OperationsContext';
import { AlertTriangle, AlertCircle, Info, ShieldAlert } from 'lucide-react';

export const SeverityBadge = ({ severity = 'medium', size = 'md', showIcon = true }) => {
  const { t } = useOperations();
  const normSeverity = (severity || '').toLowerCase();

  const configs = {
    critical: {
      bg: 'bg-red-50 border-red-300 text-red-700',
      dot: 'bg-red-600',
      icon: ShieldAlert,
      label: t('severityCritical'),
    },
    high: {
      bg: 'bg-amber-50 border-amber-300 text-amber-800',
      dot: 'bg-[#E58A16]',
      icon: AlertTriangle,
      label: t('severityHigh'),
    },
    medium: {
      bg: 'bg-blue-50 border-blue-200 text-[#174A78]',
      dot: 'bg-[#2867A5]',
      icon: AlertCircle,
      label: t('severityMedium'),
    },
    low: {
      bg: 'bg-slate-50 border-slate-200 text-slate-700',
      dot: 'bg-slate-500',
      icon: Info,
      label: t('severityLow'),
    },
  };

  const current = configs[normSeverity] || configs.medium;
  const IconComponent = current.icon;

  const sizeClasses = {
    sm: 'text-[11px] px-2 py-0.5 gap-1 font-medium',
    md: 'text-xs px-2.5 py-1 gap-1.5 font-medium',
    lg: 'text-sm px-3.5 py-1.5 gap-2 font-semibold',
  }[size] || 'text-xs px-2.5 py-1 gap-1.5 font-medium';

  return (
    <span
      className={`inline-flex items-center rounded border transition-colors ${current.bg} ${sizeClasses}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${current.dot}`} />
      {showIcon && <IconComponent className={size === 'sm' ? 'w-3 h-3' : 'w-3.5 h-3.5'} />}
      <span>{current.label}</span>
    </span>
  );
};
