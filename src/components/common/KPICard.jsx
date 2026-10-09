import React from 'react';

export const KPICard = ({
  title,
  value,
  subtext,
  icon: Icon,
  variant = 'default', // 'critical', 'high', 'operational', 'info', 'default'
  trend
}) => {
  const variantStyles = {
    critical: {
      accentBorder: 'border-l-4 border-l-[#C62828]',
      iconColor: 'text-[#C62828] bg-red-50',
      valueColor: 'text-[#C62828]',
    },
    high: {
      accentBorder: 'border-l-4 border-l-[#E58A16]',
      iconColor: 'text-[#E58A16] bg-amber-50',
      valueColor: 'text-[#B45309]',
    },
    operational: {
      accentBorder: 'border-l-4 border-l-[#218653]',
      iconColor: 'text-[#218653] bg-emerald-50',
      valueColor: 'text-[#218653]',
    },
    info: {
      accentBorder: 'border-l-4 border-l-[#174A78]',
      iconColor: 'text-[#174A78] bg-blue-50',
      valueColor: 'text-[#123B63]',
    },
    default: {
      accentBorder: 'border-l-4 border-l-slate-400',
      iconColor: 'text-slate-600 bg-slate-100',
      valueColor: 'text-slate-800',
    },
  }[variant] || {
    accentBorder: 'border-l-4 border-l-slate-400',
    iconColor: 'text-slate-600 bg-slate-100',
    valueColor: 'text-slate-800',
  };

  return (
    <div
      className={`bg-white rounded-lg border border-[#D8E1EA] p-4 shadow-sm hover:shadow transition-shadow ${variantStyles.accentBorder}`}
    >
      <div className="flex items-start justify-between">
        <div>
          <span className="text-xs font-medium text-slate-600 block">
            {title}
          </span>
          <div className="mt-1 flex items-baseline gap-2">
            <span className={`text-2xl font-bold tracking-tight font-sans ${variantStyles.valueColor}`}>
              {value}
            </span>
            {trend && (
              <span className="text-[11px] text-slate-500 font-normal">
                {trend}
              </span>
            )}
          </div>
        </div>

        {Icon && (
          <div className={`p-2 rounded-md ${variantStyles.iconColor}`}>
            <Icon className="w-5 h-5" />
          </div>
        )}
      </div>

      {subtext && (
        <div className="mt-2.5 pt-2 border-t border-slate-100 text-[11px] text-slate-500 flex items-center justify-between">
          <span>{subtext}</span>
        </div>
      )}
    </div>
  );
};
