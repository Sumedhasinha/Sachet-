import React from 'react';
import { useOperations } from '../context/OperationsContext';
import { 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  Cell, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Legend 
} from 'recharts';
import { 
  Clock, 
  Zap, 
  Activity, 
  CheckCircle2 
} from 'lucide-react';

export const Analytics = () => {
  const { analytics, t, translateData } = useOperations();

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="border-b border-[#D8E1EA] pb-4">
        <h1 className="text-xl sm:text-2xl font-bold text-[#123B63] tracking-tight">
          {t('operationalAnalytics')}
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">
          {t('analyticsSubtitle')}
        </p>
      </div>

      {/* Response Performance Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
        <div className="bg-white border border-[#D8E1EA] border-l-4 border-l-[#174A78] rounded-lg p-4 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-600 uppercase">{t('avgResponseTime')}</span>
            <Clock className="w-4 h-4 text-[#174A78]" />
          </div>
          <p className="text-2xl font-bold text-[#123B63] mt-2 font-mono">
            {analytics.kpis.avgResponseTime}
          </p>
          <span className="text-[11px] text-[#218653] font-medium mt-1 block">
            ↓ 18s {t('withinTargetSlaDescriptor')}
          </span>
        </div>

        <div className="bg-white border border-[#D8E1EA] border-l-4 border-l-[#218653] rounded-lg p-4 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-600 uppercase">{t('fastestResponse')}</span>
            <Zap className="w-4 h-4 text-[#218653]" />
          </div>
          <p className="text-2xl font-bold text-[#218653] mt-2 font-mono">
            {analytics.kpis.fastestResponse}
          </p>
          <span className="text-[11px] text-slate-500 mt-1 block">
            {t('fastestSectorDescriptor')}
          </span>
        </div>

        <div className="bg-white border border-[#D8E1EA] border-l-4 border-l-[#E58A16] rounded-lg p-4 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-600 uppercase">{t('slowestResponse')}</span>
            <Activity className="w-4 h-4 text-[#E58A16]" />
          </div>
          <p className="text-2xl font-bold text-amber-800 mt-2 font-mono">
            {analytics.kpis.slowestResponse}
          </p>
          <span className="text-[11px] text-slate-500 mt-1 block">
            {t('slowestSectorDescriptor')}
          </span>
        </div>

        <div className="bg-white border border-[#D8E1EA] border-l-4 border-l-[#2867A5] rounded-lg p-4 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-600 uppercase">{t('resolutionRate')}</span>
            <CheckCircle2 className="w-4 h-4 text-[#2867A5]" />
          </div>
          <p className="text-2xl font-bold text-[#123B63] mt-2 font-mono">
            {analytics.kpis.resolutionRate}
          </p>
          <span className="text-[11px] text-slate-500 mt-1 block">
            182 {t('casesResolvedOutOf')} 193 {t('casesTotal')}
          </span>
        </div>
      </div>

      {/* Row 1 Charts: Volume Last 24 Hours & Incidents by Category */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Call Volume (Area Chart) */}
        <div className="lg:col-span-8 bg-white border border-[#D8E1EA] rounded-lg p-5 shadow-xs">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
            <div>
              <h3 className="text-xs font-semibold text-slate-800 uppercase tracking-wider">
                {t('emergencyCallVolume')}
              </h3>
              <p className="text-xs text-slate-500">
                {t('temporalDistribution')}
              </p>
            </div>
            <span className="text-xs text-[#174A78] font-medium font-mono">
              {t('peakCases')}
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={analytics.last24Hours} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="anaIncident" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#E58A16" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#E58A16" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="anaResolved" x1="0" y1="0" x2="0" y2="1">
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
                <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
                <Area type="monotone" dataKey="incidents" name={t('incomingCallsChart')} stroke="#E58A16" strokeWidth={2} fill="url(#anaIncident)" />
                <Area type="monotone" dataKey="resolved" name={t('resolvedCasesChart')} stroke="#218653" strokeWidth={2} fill="url(#anaResolved)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Incidents by Type (Donut) */}
        <div className="lg:col-span-4 bg-white border border-[#D8E1EA] rounded-lg p-5 shadow-xs flex flex-col justify-between">
          <div className="pb-3 border-b border-slate-100">
            <h3 className="text-xs font-semibold text-slate-800 uppercase tracking-wider">
              {t('incidentsByCategory')}
            </h3>
            <p className="text-xs text-slate-500">
              {t('distributionAcrossResponse')}
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

      {/* Row 2 Charts: Response Time by Agency & Severity Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Response Time by Agency (Bar Chart) */}
        <div className="lg:col-span-6 bg-white border border-[#D8E1EA] rounded-lg p-5 shadow-xs">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
            <div>
              <h3 className="text-xs font-semibold text-slate-800 uppercase tracking-wider">
                {t('averageResponseTimeByAgency')}
              </h3>
              <p className="text-xs text-slate-500">
                {t('arrivalTimeComparison')}
              </p>
            </div>
            <span className="text-xs text-[#218653] font-medium">{t('withinTargetSla')}</span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={analytics.responseTimeByAgency.map(entry => ({ ...entry, agency: translateData(entry.agency) }))} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                <XAxis dataKey="agency" stroke="#64748B" tick={{ fill: '#64748B', fontSize: 11 }} />
                <YAxis stroke="#64748B" tick={{ fill: '#64748B', fontSize: 11 }} unit="m" />
                <Tooltip
                  contentStyle={{ backgroundColor: '#FFFFFF', borderColor: '#D8E1EA', borderRadius: '6px', color: '#1E293B', fontSize: '12px' }}
                  formatter={(val) => [`${val.toFixed(2)} min`]}
                />
                <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
                <Bar dataKey="avgMinutes" name={t('actualArrivalChart')} fill="#174A78" radius={[4, 4, 0, 0]} />
                <Bar dataKey="targetMinutes" name={t('targetBenchmarkChart')} fill="#CBD5E1" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Severity Stratification */}
        <div className="lg:col-span-6 bg-white border border-[#D8E1EA] rounded-lg p-5 shadow-xs">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
            <div>
              <h3 className="text-xs font-semibold text-slate-800 uppercase tracking-wider">
                {t('incidentSeverityDistribution')}
              </h3>
              <p className="text-xs text-slate-500">
                {t('breakdownPriorityTier')}
              </p>
            </div>
            <span className="text-xs text-[#C62828] font-semibold">5 {t('critical')} {t('activeCases')}</span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={analytics.severityBreakdown.map(entry => ({ ...entry, severity: translateData(entry.severity) }))} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                <XAxis dataKey="severity" stroke="#64748B" tick={{ fill: '#64748B', fontSize: 11 }} />
                <YAxis stroke="#64748B" tick={{ fill: '#64748B', fontSize: 11 }} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#FFFFFF', borderColor: '#D8E1EA', borderRadius: '6px', color: '#1E293B', fontSize: '12px' }}
                />
                <Bar dataKey="count" name={t('caseCountChart')} radius={[4, 4, 0, 0]}>
                  {analytics.severityBreakdown.map((entry, index) => (
                    <Cell key={`sev-cell-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};
