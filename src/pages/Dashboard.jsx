import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useOperations } from '../context/OperationsContext';
import { KPICard } from '../components/common/KPICard';
import { IncidentMap } from '../components/map/IncidentMap';
import { IncidentCard } from '../components/incidents/IncidentCard';
import { 
  AreaChart, 
  Area, 
  PieChart, 
  Pie, 
  Cell, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { 
  ShieldAlert, 
  AlertTriangle, 
  Truck, 
  Clock, 
  CheckCircle2, 
  ArrowRight, 
  Maximize2,
} from 'lucide-react';
import { motion } from 'framer-motion';

export const Dashboard = () => {
  const navigate = useNavigate();
  const { incidents, metrics, analytics, t, translateData } = useOperations();
  const [activeSeverityFilter, setActiveSeverityFilter] = useState('ALL');

  const activeIncidents = incidents.filter(i => {
    if (i.status === 'resolved') return false;
    if (activeSeverityFilter === 'ALL') return true;
    return i.severity.toLowerCase() === activeSeverityFilter.toLowerCase();
  });

  return (
    <div className="space-y-6">
      <div className="border-b border-[#D8E1EA] pb-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-[#123B63] tracking-tight">
            {t('emergencyOperationsDashboard')}
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            {t('dashboardSubtitle')}
          </p>
        </div>
      </div>

      {/* 3. Summary Statistics (5 Compact Panels) */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-3.5">
        <KPICard
          title={t('activeIncidents')}
          value={metrics.activeIncidents}
          subtext={t('totalUnresolvedEvents')}
          icon={ShieldAlert}
          variant="critical"
        />
        <KPICard
          title={t('criticalIncidents')}
          value={metrics.critical}
          subtext={t('immediateActionRequired')}
          icon={AlertTriangle}
          variant="critical"
        />
        <KPICard
          title={t('unitsDeployed')}
          value={metrics.unitsDeployed}
          icon={Truck}
          variant="high"
        />
        <KPICard
          title={t('avgResponseTime')}
          value={metrics.avgResponseTime}
          subtext={t('targetSla')}
          icon={Clock}
          variant="info"
        />
        <KPICard
          title={t('availableUnits')}
          value={metrics.availableUnits}
          subtext={t('readyForDispatch')}
          icon={CheckCircle2}
          variant="operational"
        />
      </div>

      {/* 4. Main Operations Section (60% Map / 40% Incidents) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT: Operations Map (~60% / 8 cols) */}
        <div className="lg:col-span-7 xl:col-span-8 space-y-2.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-semibold text-[#123B63]">
                {t('operationsMapBhopal')}
              </h2>
              <span className="text-[11px] text-slate-500 font-medium">
                ({t('animatedRoutes')})
              </span>
            </div>

            <button
              onClick={() => navigate('/map')}
              className="text-xs text-[#174A78] hover:text-[#123B63] hover:underline flex items-center gap-1 font-medium cursor-pointer"
            >
              <Maximize2 className="w-3.5 h-3.5" />
              <span>{t('fullScreenView')}</span>
            </button>
          </div>

          <div className="h-[480px] w-full">
            <IncidentMap height="100%" fullscreenLink="/map" />
          </div>
        </div>

        {/* RIGHT: Active Incidents (~40% / 4 cols) */}
        <div className="lg:col-span-5 xl:col-span-4 space-y-2.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-semibold text-[#123B63]">
                {t('activeIncidentsHeader')}
              </h2>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-red-100 text-red-800">
                {activeIncidents.length}
              </span>
            </div>

            <button
              onClick={() => navigate('/incidents')}
              className="text-xs text-[#174A78] hover:text-[#123B63] hover:underline flex items-center gap-1 font-medium cursor-pointer"
            >
              <span>{t('viewAll')}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Quick Filter tabs */}
          <div className="flex items-center gap-1 bg-white p-1 rounded border border-[#D8E1EA]">
            {['ALL', 'CRITICAL', 'HIGH', 'MEDIUM'].map(tab => {
              const label = tab === 'ALL' ? t('all') : tab.toLowerCase() === 'critical' ? t('critical') : tab.toLowerCase() === 'high' ? t('high') : t('medium');
              return (
                <button
                  key={tab}
                  onClick={() => setActiveSeverityFilter(tab)}
                  className={`flex-1 py-1 rounded text-xs font-medium transition-colors cursor-pointer ${
                    activeSeverityFilter === tab
                      ? 'bg-[#123B63] text-white shadow-xs'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>

          {/* Incident Cards Scrollable Container */}
          <div className="space-y-2.5 max-h-[480px] overflow-y-auto pr-1">
            {activeIncidents.length === 0 ? (
              <div className="py-16 text-center text-slate-500 text-xs bg-white border border-[#D8E1EA] rounded-lg">
                {t('noActiveIncidents')}
              </div>
            ) : (
              activeIncidents.map(inc => (
                <IncidentCard key={inc.id} incident={inc} />
              ))
            )}
          </div>
        </div>
      </div>

      {/* 6. Incident Trends & Categories Analytics (Clean White Cards) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Incident Volume Last 24 Hours */}
        <div className="lg:col-span-8 bg-white border border-[#D8E1EA] rounded-lg p-5 shadow-xs">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
            <div>
              <h3 className="text-xs font-semibold text-slate-800 uppercase tracking-wider">
                {t('emergencyCallVolume')}
              </h3>
              <p className="text-xs text-slate-500">
                {t('hourlyIntakeDescription')}
              </p>
            </div>
            <span className="text-xs text-[#174A78] font-medium font-mono">
              {t('peakIncidents')}
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={analytics.last24Hours} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="govIncoming" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#E58A16" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#E58A16" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="govResolved" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#218653" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#218653" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                <XAxis dataKey="hour" stroke="#64748B" tick={{ fill: '#64748B', fontSize: 11 }} />
                <YAxis stroke="#64748B" tick={{ fill: '#64748B', fontSize: 11 }} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#FFFFFF', borderColor: '#D8E1EA', borderRadius: '6px', color: '#1E293B', fontSize: '12px' }}
                />
                <Area type="monotone" dataKey="incidents" name={t('incomingCallsChart')} stroke="#E58A16" strokeWidth={2} fill="url(#govIncoming)" />
                <Area type="monotone" dataKey="resolved" name={t('resolvedTickets')} stroke="#218653" strokeWidth={2} fill="url(#govResolved)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Incidents by Type Donut */}
        <div className="lg:col-span-4 bg-white border border-[#D8E1EA] rounded-lg p-5 shadow-xs flex flex-col justify-between">
          <div className="pb-3 border-b border-slate-100">
            <h3 className="text-xs font-semibold text-slate-800 uppercase tracking-wider">
              {t('incidentCategoryDistribution')}
            </h3>
            <p className="text-xs text-slate-500">
              {t('callCategoryProportion')}
            </p>
          </div>

          <div className="h-52 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={analytics.incidentsByType.map(entry => ({ ...entry, name: translateData(entry.name) }))}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={75}
                  paddingAngle={2}
                  dataKey="count"
                >
                  {analytics.incidentsByType.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: '#FFFFFF', borderColor: '#D8E1EA', borderRadius: '6px', color: '#1E293B', fontSize: '12px' }}
                  formatter={(val, name) => [`${val} ${t('caseUnit')}`, name]}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs pt-2 border-t border-slate-100">
            {analytics.incidentsByType.map(cat => (
              <div key={cat.name} className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-xs shrink-0" style={{ backgroundColor: cat.fill }} />
                <span className="text-slate-600 truncate">{translateData(cat.name)}:</span>
                <span className="font-semibold text-slate-800 ml-auto">{cat.percentage}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
