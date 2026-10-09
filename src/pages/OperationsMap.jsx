import React, { useState } from 'react';
import { useOperations } from '../context/OperationsContext';
import { IncidentMap } from '../components/map/IncidentMap';
import { 
  ShieldAlert, 
  Truck, 
  Building2, 
  Home, 
  Layers, 
  Info 
} from 'lucide-react';

export const OperationsMap = () => {
  const { incidents, units, hospitals, shelters, t } = useOperations();
  const [isPanelCollapsed, setIsPanelCollapsed] = useState(false);

  const activeIncidents = incidents.filter(i => i.status !== 'resolved');
  const criticalCount = activeIncidents.filter(i => i.severity === 'critical').length;
  const deployedUnits = units.filter(u => u.status === 'en_route' || u.status === 'responding' || u.status === 'on_scene');

  return (
    <div className="relative h-[calc(100vh-9.5rem)] rounded-lg overflow-hidden border border-[#D8E1EA] bg-white shadow-xs">
      {/* Full-Screen OpenStreetMap */}
      <div className="w-full h-full">
        <IncidentMap height="100%" showControls={true} />
      </div>

      {/* Floating Operational HUD Panel (Left side) */}
      <div className="absolute top-4 left-4 z-[1000] w-72 sm:w-80">
        <div className="bg-white/95 border border-[#D8E1EA] rounded-lg shadow-lg p-4 backdrop-blur-xs text-slate-800">
          {/* Header */}
          <div className="flex items-center justify-between pb-2.5 border-b border-slate-100 mb-3">
            <div className="flex items-center gap-2">
              <h2 className="text-xs font-bold text-[#123B63] uppercase tracking-wide">
                {t('operationsMap')}
              </h2>
            </div>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 font-medium">
              Bhopal Metro
            </span>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 gap-2 text-xs mb-3">
            <div className="bg-slate-50 p-2.5 rounded border border-slate-200">
              <div className="flex items-center gap-1.5 text-[#C62828] mb-1">
                <ShieldAlert className="w-3.5 h-3.5" />
                <span className="text-[11px] font-semibold">{t('incidentsLabel')}</span>
              </div>
              <div className="flex items-baseline justify-between">
                <span className="text-lg font-bold text-slate-900">{activeIncidents.length}</span>
                <span className="text-[11px] text-[#C62828] font-bold">{criticalCount} {t('critical')}</span>
              </div>
            </div>

            <div className="bg-slate-50 p-2.5 rounded border border-slate-200">
              <div className="flex items-center gap-1.5 text-[#174A78] mb-1">
                <Truck className="w-3.5 h-3.5" />
                <span className="text-[11px] font-semibold">{t('fleetUnits')}</span>
              </div>
              <div className="flex items-baseline justify-between">
                <span className="text-lg font-bold text-slate-900">{units.length}</span>
                <span className="text-[11px] text-[#174A78] font-semibold">{deployedUnits.length} {t('active')}</span>
              </div>
            </div>

            <div className="bg-slate-50 p-2.5 rounded border border-slate-200">
              <div className="flex items-center gap-1.5 text-[#218653] mb-1">
                <Building2 className="w-3.5 h-3.5" />
                <span className="text-[11px] font-semibold">{t('hospitals')}</span>
              </div>
              <div className="flex items-baseline justify-between">
                <span className="text-lg font-bold text-slate-900">{hospitals.length}</span>
              </div>
            </div>

            <div className="bg-slate-50 p-2.5 rounded border border-slate-200">
              <div className="flex items-center gap-1.5 text-purple-700 mb-1">
                <Home className="w-3.5 h-3.5" />
                <span className="text-[11px] font-semibold">{t('shelters')}</span>
              </div>
              <div className="flex items-baseline justify-between">
                <span className="text-lg font-bold text-slate-900">{shelters.length}</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Symbology Legend (Bottom Right) */}
      <div className="absolute bottom-4 right-4 z-[1000] hidden md:block">
        <div className="bg-white/95 border border-[#D8E1EA] rounded-lg p-3 shadow-lg backdrop-blur-xs text-xs text-slate-700 space-y-1.5">
          <div className="text-[11px] text-slate-500 font-semibold uppercase tracking-wider pb-1 border-b border-slate-100">
            {t('mapLegend')}
          </div>
          <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-[11px]">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#C62828]" />
              <span>{t('criticalIncident')}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded bg-[#123B63] text-white text-[9px] flex items-center justify-center font-bold">P</span>
              <span>{t('policePcr')}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#E58A16]" />
              <span>{t('highSeverity')}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded bg-[#218653] text-white text-[9px] flex items-center justify-center font-bold">+</span>
              <span>{t('ambulance108')}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#2867A5]" />
              <span>{t('mediumLow')}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded bg-[#C62828] text-white text-[9px] flex items-center justify-center font-bold">F</span>
              <span>{t('fireRescue')}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
