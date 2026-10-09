import React, { useState } from 'react';
import { useOperations } from '../context/OperationsContext';
import { StatusBadge } from '../components/common/StatusBadge';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Legend 
} from 'recharts';
import { 
  Truck, 
  ShieldCheck, 
  Wrench, 
  MapPin, 
  Search, 
  CheckCircle2 
} from 'lucide-react';

export const Resources = () => {
  const { units, resourceStats, t, translateData } = useOperations();
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [search, setSearch] = useState('');

  const fleetData = [
    {
      name: t('ambulance108'),
      available: resourceStats.ambulances.available,
      deployed: resourceStats.ambulances.deployed,
      maintenance: resourceStats.ambulances.maintenance,
    },
    {
      name: t('policePcr'),
      available: resourceStats.police.available,
      deployed: resourceStats.police.deployed,
      maintenance: resourceStats.police.maintenance,
    },
    {
      name: t('fireTenders'),
      available: resourceStats.fire.available,
      deployed: resourceStats.fire.deployed,
      maintenance: resourceStats.fire.maintenance,
    },
  ];

  const filteredUnits = units.filter(unit => {
    const matchesSearch = 
      unit.id.toLowerCase().includes(search.toLowerCase()) ||
      unit.name.toLowerCase().includes(search.toLowerCase()) ||
      unit.location.toLowerCase().includes(search.toLowerCase());
    if (!matchesSearch) return false;

    if (selectedCategory !== 'ALL' && unit.type.toLowerCase() !== selectedCategory.toLowerCase()) {
      return false;
    }

    if (statusFilter !== 'ALL' && unit.status.toLowerCase() !== statusFilter.toLowerCase()) {
      return false;
    }

    return true;
  });

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="border-b border-[#D8E1EA] pb-4">
        <h1 className="text-xl sm:text-2xl font-bold text-[#123B63] tracking-tight">
          {t('emergencyResponseResources')}
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">
          {t('unitReadinessSubtitle')}
        </p>
      </div>

      {/* Fleet Summaries (3 White Cards) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* AMBULANCES */}
        <div className="bg-white border border-[#D8E1EA] rounded-lg p-4 shadow-xs">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded bg-emerald-50 text-[#218653] border border-emerald-200">
                <Truck className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-xs font-semibold text-slate-900 uppercase">
                  {t('ambulance108')}
                </h3>
                <span className="text-[11px] text-slate-500">{t('fleetTotal42')}</span>
              </div>
            </div>
            <span className="text-sm font-bold text-[#218653]">
              {Math.round((resourceStats.ambulances.available / resourceStats.ambulances.total) * 100)}% {t('availablePercent')}
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2 text-xs">
            <div className="bg-slate-50 p-2 rounded border border-slate-200 text-center">
              <span className="text-[10px] text-slate-500 block">{t('availableUnits')}</span>
              <span className="text-[#218653] font-bold text-sm">{resourceStats.ambulances.available}</span>
            </div>
            <div className="bg-slate-50 p-2 rounded border border-slate-200 text-center">
              <span className="text-[10px] text-slate-500 block">{t('deployed')}</span>
              <span className="text-[#174A78] font-bold text-sm">{resourceStats.ambulances.deployed}</span>
            </div>
            <div className="bg-slate-50 p-2 rounded border border-slate-200 text-center">
              <span className="text-[10px] text-slate-500 block">{t('service')}</span>
              <span className="text-amber-800 font-bold text-sm">{resourceStats.ambulances.maintenance}</span>
            </div>
          </div>
        </div>

        {/* POLICE UNITS */}
        <div className="bg-white border border-[#D8E1EA] rounded-lg p-4 shadow-xs">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded bg-blue-50 text-[#123B63] border border-blue-200">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-xs font-semibold text-slate-900 uppercase">
                  {t('policeUnits')}
                </h3>
                <span className="text-[11px] text-slate-500">{t('fleetTotal87')}</span>
              </div>
            </div>
            <span className="text-sm font-bold text-[#123B63]">
              {Math.round((resourceStats.police.available / resourceStats.police.total) * 100)}% {t('availablePercent')}
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2 text-xs">
            <div className="bg-slate-50 p-2 rounded border border-slate-200 text-center">
              <span className="text-[10px] text-slate-500 block">{t('availableUnits')}</span>
              <span className="text-[#218653] font-bold text-sm">{resourceStats.police.available}</span>
            </div>
            <div className="bg-slate-50 p-2 rounded border border-slate-200 text-center">
              <span className="text-[10px] text-slate-500 block">{t('deployed')}</span>
              <span className="text-[#174A78] font-bold text-sm">{resourceStats.police.deployed}</span>
            </div>
            <div className="bg-slate-50 p-2 rounded border border-slate-200 text-center">
              <span className="text-[10px] text-slate-500 block">{t('unavailable')}</span>
              <span className="text-slate-600 font-bold text-sm">{resourceStats.police.maintenance}</span>
            </div>
          </div>
        </div>

        {/* FIRE UNITS */}
        <div className="bg-white border border-[#D8E1EA] rounded-lg p-4 shadow-xs">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded bg-amber-50 text-[#E58A16] border border-amber-200">
                <Wrench className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-xs font-semibold text-slate-900 uppercase">
                  {t('fireRescueTenders')}
                </h3>
                <span className="text-[11px] text-slate-500">{t('fleetTotal34')}</span>
              </div>
            </div>
            <span className="text-sm font-bold text-amber-800">
              {Math.round((resourceStats.fire.available / resourceStats.fire.total) * 100)}% {t('availablePercent')}
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2 text-xs">
            <div className="bg-slate-50 p-2 rounded border border-slate-200 text-center">
              <span className="text-[10px] text-slate-500 block">{t('availableUnits')}</span>
              <span className="text-[#218653] font-bold text-sm">{resourceStats.fire.available}</span>
            </div>
            <div className="bg-slate-50 p-2 rounded border border-slate-200 text-center">
              <span className="text-[10px] text-slate-500 block">{t('deployed')}</span>
              <span className="text-[#E58A16] font-bold text-sm">{resourceStats.fire.deployed}</span>
            </div>
            <div className="bg-slate-50 p-2 rounded border border-slate-200 text-center">
              <span className="text-[10px] text-slate-500 block">{t('service')}</span>
              <span className="text-amber-800 font-bold text-sm">{resourceStats.fire.maintenance}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Utilization Recharts Bar Chart */}
      <div className="bg-white border border-[#D8E1EA] rounded-lg p-5 shadow-xs">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
          <div>
            <h3 className="text-xs font-semibold text-slate-800 uppercase tracking-wider">
              {t('fleetUtilizationTitle')}
            </h3>
            <p className="text-xs text-slate-500">
              {t('fleetCapacitySubtitle')}
            </p>
          </div>
        </div>

        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={fleetData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
              <XAxis dataKey="name" stroke="#64748B" tick={{ fill: '#64748B', fontSize: 11 }} />
              <YAxis stroke="#64748B" tick={{ fill: '#64748B', fontSize: 11 }} />
              <Tooltip
                contentStyle={{ backgroundColor: '#FFFFFF', borderColor: '#D8E1EA', borderRadius: '6px', color: '#1E293B', fontSize: '12px' }}
              />
              <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
              <Bar dataKey="available" name={t('availableUnits')} fill="#218653" radius={[4, 4, 0, 0]} />
              <Bar dataKey="deployed" name={t('deployedResponding')} fill="#174A78" radius={[4, 4, 0, 0]} />
              <Bar dataKey="maintenance" name={t('maintenanceOffline')} fill="#E58A16" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Filterable Resource Unit Grid */}
      <div className="bg-white border border-[#D8E1EA] rounded-lg overflow-hidden shadow-xs">
        <div className="p-4 border-b border-[#D8E1EA] bg-slate-50 flex flex-wrap items-center justify-between gap-3">
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5">
            {[
              { id: 'ALL', label: t('allUnits') },
              { id: 'POLICE', label: t('policePcr') },
              { id: 'AMBULANCE', label: t('ambulance108') },
              { id: 'FIRE', label: t('fireTenders') }
            ].map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 rounded text-xs font-medium transition-colors ${
                  selectedCategory === cat.id
                    ? 'bg-[#123B63] text-white'
                    : 'bg-white border border-[#D8E1EA] text-slate-700 hover:bg-slate-100'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search & Status filter */}
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder={t('searchUnitOrLocation')}
                className="bg-white border border-[#D8E1EA] rounded pl-9 pr-3 py-1.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#174A78]"
              />
            </div>

            <select
              value={statusFilter}
              onChange={e => setStatusFilter(e.target.value)}
              className="bg-white border border-[#D8E1EA] rounded px-3 py-1.5 text-xs text-slate-700 focus:outline-none"
            >
              <option value="ALL">{t('allStatuses')}</option>
              <option value="available">{t('statusAvailable')}</option>
              <option value="en_route">{t('statusEnRoute')}</option>
              <option value="on_scene">{t('statusOnScene')}</option>
              <option value="maintenance">{t('statusMaintenance')}</option>
            </select>
          </div>
        </div>

        {/* Unit Cards Grid */}
        <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {filteredUnits.length === 0 ? (
            <div className="col-span-full py-12 text-center text-xs text-slate-500">
              {t('noUnitsFound')}
            </div>
          ) : (
            filteredUnits.map(unit => (
              <div
                key={unit.id}
                className="p-3.5 rounded-lg bg-slate-50 border border-slate-200 hover:border-slate-300 transition-colors"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-[#123B63]">
                      {unit.id}
                    </span>
                    <span className="text-xs text-slate-800 font-semibold truncate">
                      {translateData(unit.name)}
                    </span>
                  </div>
                  <StatusBadge status={unit.status} size="sm" />
                </div>

                <div className="text-xs text-slate-600 space-y-1">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3 h-3 text-slate-400" />
                    <span className="truncate">{translateData(unit.location)}</span>
                  </div>
                  <div className="flex justify-between pt-1 border-t border-slate-200 text-[11px]">
                    <span>{t('crew')}: {translateData(unit.crew)}</span>
                    <span className="text-[#174A78] font-semibold">{t('battery')}: {unit.battery}%</span>
                  </div>
                  {unit.assignedTo && (
                    <div className="text-amber-800 pt-0.5 text-[11px] font-medium">
                      {t('assignedTo')}: {unit.assignedTo} ({t('eta')} {unit.eta})
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
