import React, { useState } from 'react';
import { useOperations } from '../context/OperationsContext';
import { IncidentTable } from '../components/incidents/IncidentTable';
import { DispatchModal } from '../components/incidents/DispatchModal';
import { ShieldAlert, AlertTriangle, CheckCircle, Plus } from 'lucide-react';

export const Incidents = () => {
  const { incidents, t } = useOperations();
  const [selectedIncidentForDispatch, setSelectedIncidentForDispatch] = useState(null);

  const activeCount = incidents.filter(i => i.status !== 'resolved').length;
  const criticalCount = incidents.filter(i => i.severity === 'critical' && i.status !== 'resolved').length;
  const highCount = incidents.filter(i => i.severity === 'high' && i.status !== 'resolved').length;
  const resolvedCount = incidents.filter(i => i.status === 'resolved').length;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-[#D8E1EA] pb-4">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-xl sm:text-2xl font-bold text-[#123B63] tracking-tight">
              {t('incidentRegistry')}
            </h1>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-blue-100 text-[#123B63]">
              {activeCount} {t('activeCases')}
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            {t('incidentPageSubtitle')}
          </p>
        </div>

        {/* Quick Tally Badges */}
        <div className="flex items-center gap-2 text-xs">
          <div className="px-3 py-1.5 rounded bg-white border border-[#D8E1EA] flex items-center gap-2 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-[#C62828]" />
            <span className="text-[#C62828] font-bold">{criticalCount} {t('critical')}</span>
          </div>
          <div className="px-3 py-1.5 rounded bg-white border border-[#D8E1EA] flex items-center gap-2 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-[#E58A16]" />
            <span className="text-amber-800 font-bold">{highCount} {t('high')}</span>
          </div>
          <div className="px-3 py-1.5 rounded bg-white border border-[#D8E1EA] flex items-center gap-2 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-[#218653]" />
            <span className="text-[#218653] font-bold">{resolvedCount} {t('resolved')}</span>
          </div>
        </div>
      </div>

      {/* Main Incident Data Table */}
      <IncidentTable
        incidents={incidents}
        onOpenDispatch={inc => setSelectedIncidentForDispatch(inc)}
      />

      {/* Unit Dispatch Modal */}
      <DispatchModal
        incident={selectedIncidentForDispatch}
        isOpen={Boolean(selectedIncidentForDispatch)}
        onClose={() => setSelectedIncidentForDispatch(null)}
      />
    </div>
  );
};
