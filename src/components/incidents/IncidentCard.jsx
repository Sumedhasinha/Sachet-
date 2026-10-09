import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useOperations } from '../../context/OperationsContext';
import { SeverityBadge } from '../common/SeverityBadge';
import { StatusBadge } from '../common/StatusBadge';
import { Clock, MapPin, Truck, ChevronRight } from 'lucide-react';

export const IncidentCard = ({ incident }) => {
  const navigate = useNavigate();
  const { t, translateData } = useOperations();

  const getBorderColor = (severity) => {
    switch (severity) {
      case 'critical':
        return 'border-l-4 border-l-[#C62828] border-slate-200';
      case 'high':
        return 'border-l-4 border-l-[#E58A16] border-slate-200';
      case 'medium':
        return 'border-l-4 border-l-[#2867A5] border-slate-200';
      default:
        return 'border-l-4 border-l-slate-300 border-slate-200';
    }
  };

  return (
    <div
      onClick={() => navigate(`/incidents/${incident.id}`)}
      className={`bg-white rounded-lg border p-3.5 cursor-pointer hover:shadow-md transition-all group ${getBorderColor(incident.severity)}`}
    >
      {/* Top Header */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono font-bold text-[#123B63] group-hover:text-[#205C91]">
            {incident.id}
          </span>
          <SeverityBadge severity={incident.severity} size="sm" />
        </div>
        <StatusBadge status={incident.status} size="sm" />
      </div>

      {/* Main Title & District */}
      <div className="mt-2">
        <h4 className="text-sm font-semibold text-slate-900 group-hover:text-[#123B63] transition-colors">
          {translateData(incident.type)}
        </h4>
        <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-1">
          <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <span className="truncate">{translateData(incident.district)}</span>
        </div>
      </div>

      {/* Units & Telemetry */}
      <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
        <div className="flex items-center gap-1.5">
          <Truck className="w-3.5 h-3.5 text-[#174A78]" />
          <span>{incident.assignedUnits.length} {t('unitsAssigned')}</span>
        </div>

        <div className="flex items-center gap-1 font-mono text-[11px] text-slate-500">
          <Clock className="w-3 h-3 text-slate-400" />
          <span>{incident.reportedTime}</span>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-0.5 group-hover:text-[#123B63] transition-transform ml-1" />
        </div>
      </div>
    </div>
  );
};
