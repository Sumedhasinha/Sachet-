import React from 'react';
import { useOperations } from '../../context/OperationsContext';
import { FileText, AlertTriangle, ShieldCheck, CheckCircle2 } from 'lucide-react';

export const OperationalSummary = ({ summary }) => {
  const { t, translateData } = useOperations();
  if (!summary) return null;

  const getRiskBadge = (riskLevel) => {
    switch (riskLevel) {
      case 'CRITICAL':
        return 'bg-red-50 border-red-300 text-[#C62828]';
      case 'HIGH':
        return 'bg-amber-50 border-amber-300 text-amber-800';
      case 'MEDIUM':
        return 'bg-blue-50 border-blue-300 text-[#174A78]';
      default:
        return 'bg-slate-50 border-slate-300 text-slate-700';
    }
  };

  return (
    <div className="bg-white border border-[#D8E1EA] rounded-lg p-5 shadow-xs">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded bg-blue-50 border border-blue-200 text-[#174A78]">
            <FileText className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs font-semibold text-slate-900 uppercase tracking-wider">
              {t('operationalSummaryTitle')}
            </h4>
            <span className="text-[11px] text-slate-500">
              {t('controlRoomBriefing')}
            </span>
          </div>
        </div>

        <div className={`px-2.5 py-1 rounded border text-xs font-semibold flex items-center gap-1.5 ${getRiskBadge(summary.riskLevel)}`}>
          <AlertTriangle className="w-3.5 h-3.5" />
          <span>{t('priorityRisk')}: {translateData(summary.riskLevel)}</span>
        </div>
      </div>

      {/* Body text */}
      <div className="bg-slate-50 p-3.5 rounded border border-slate-200 text-xs text-slate-700 space-y-1.5 leading-relaxed">
        <p className="font-semibold text-slate-900">
          {translateData(summary.headline)}
        </p>
        <p className="text-slate-600">
          {translateData(summary.body)}
        </p>
      </div>

      {/* Recommended Directives */}
      {summary.recommendedActions && summary.recommendedActions.length > 0 && (
        <div className="mt-4">
          <h5 className="text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-[#174A78]" />
            <span>{t('recommendedActions')}</span>
          </h5>

          <ul className="space-y-1.5">
            {summary.recommendedActions.map((action, idx) => (
              <li
                key={idx}
                className="flex items-start gap-2.5 p-2 rounded bg-slate-50 border border-slate-200 text-xs text-slate-700"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-[#218653] mt-0.5 shrink-0" />
                <span>{translateData(action)}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

// Backwards compatibility export
export const AIIncidentSummary = ({ aiSummary, summary }) => {
  return <OperationalSummary summary={summary || aiSummary} />;
};
