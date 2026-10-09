import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useOperations } from '../../context/OperationsContext';
import { SeverityBadge } from '../common/SeverityBadge';
import { StatusBadge } from '../common/StatusBadge';
import { 
  Search, 
  ArrowUpDown, 
  Eye, 
  Truck, 
  MapPin, 
  Clock, 
  RotateCcw 
} from 'lucide-react';

export const IncidentTable = ({ incidents, onOpenDispatch }) => {
  const navigate = useNavigate();
  const { t, translateData } = useOperations();

  // Filters
  const [search, setSearch] = useState('');
  const [severityFilter, setSeverityFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [typeFilter, setTypeFilter] = useState('ALL');
  const [districtFilter, setDistrictFilter] = useState('ALL');

  // Sorting
  const [sortField, setSortField] = useState('reportedTime');
  const [sortOrder, setSortOrder] = useState('desc');

  // Reset Filters
  const handleResetFilters = () => {
    setSearch('');
    setSeverityFilter('ALL');
    setStatusFilter('ALL');
    setTypeFilter('ALL');
    setDistrictFilter('ALL');
    setSortField('reportedTime');
    setSortOrder('desc');
  };

  const uniqueDistricts = useMemo(() => {
    return Array.from(new Set(incidents.map(i => i.district)));
  }, [incidents]);

  const uniqueTypes = useMemo(() => {
    return Array.from(new Set(incidents.map(i => i.type)));
  }, [incidents]);

  const handleSort = (field) => {
    if (sortField === field) {
      setSortOrder(prev => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  const severityRank = {
    critical: 4,
    high: 3,
    medium: 2,
    low: 1
  };

  const filteredIncidents = useMemo(() => {
    return incidents.filter(inc => {
      const matchesSearch = 
        inc.id.toLowerCase().includes(search.toLowerCase()) ||
        inc.type.toLowerCase().includes(search.toLowerCase()) ||
        inc.district.toLowerCase().includes(search.toLowerCase()) ||
        (inc.address && inc.address.toLowerCase().includes(search.toLowerCase()));

      if (!matchesSearch) return false;

      if (severityFilter !== 'ALL' && inc.severity.toLowerCase() !== severityFilter.toLowerCase()) {
        return false;
      }

      if (statusFilter !== 'ALL') {
        if (statusFilter === 'ACTIVE' && inc.status === 'resolved') return false;
        if (statusFilter !== 'ACTIVE' && inc.status.toLowerCase() !== statusFilter.toLowerCase()) return false;
      }

      if (typeFilter !== 'ALL' && inc.type !== typeFilter) {
        return false;
      }

      if (districtFilter !== 'ALL' && inc.district !== districtFilter) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      let comparison = 0;
      if (sortField === 'severity') {
        comparison = (severityRank[b.severity] || 0) - (severityRank[a.severity] || 0);
      } else if (sortField === 'reportedTime') {
        comparison = a.reportedTime.localeCompare(b.reportedTime);
      } else if (sortField === 'id') {
        comparison = a.id.localeCompare(b.id);
      } else if (sortField === 'status') {
        comparison = a.status.localeCompare(b.status);
      }
      return sortOrder === 'asc' ? comparison : -comparison;
    });
  }, [incidents, search, severityFilter, statusFilter, typeFilter, districtFilter, sortField, sortOrder]);

  const severityTabs = ['ALL', 'CRITICAL', 'HIGH', 'MEDIUM', 'LOW'];

  return (
    <div className="bg-white border border-[#D8E1EA] rounded-lg overflow-hidden shadow-sm">
      {/* Top Controls & Severity Tabs */}
      <div className="p-4 border-b border-[#D8E1EA] bg-slate-50 space-y-3">
        {/* Severity Tabs */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-1.5">
            {severityTabs.map(tab => (
              <button
                key={tab}
                onClick={() => setSeverityFilter(tab)}
                className={`px-3 py-1.5 rounded text-xs font-medium transition-colors ${
                  severityFilter === tab
                    ? 'bg-[#123B63] text-white shadow-xs'
                    : 'bg-white border border-[#D8E1EA] text-slate-700 hover:bg-slate-100'
                }`}
              >
                {tab === 'ALL' ? t('allIncidents') : t(`severity${tab.charAt(0)}${tab.slice(1).toLowerCase()}`)}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-500">
              {t('showing')} <strong className="text-slate-800">{filteredIncidents.length}</strong> {t('of')} {incidents.length} {t('records')}
            </span>
            <button
              onClick={handleResetFilters}
              className="text-xs text-[#174A78] hover:text-[#123B63] flex items-center gap-1 font-medium hover:underline"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{t('resetFilters')}</span>
            </button>
          </div>
        </div>

        {/* Filters Row: Search, Location, Type, Status */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 pt-1">
          {/* Search */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder={t('searchByIdOrLocation')}
              className="w-full bg-white border border-[#D8E1EA] rounded pl-9 pr-3 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#174A78]"
            />
          </div>

          {/* District Dropdown */}
          <select
            value={districtFilter}
            onChange={e => setDistrictFilter(e.target.value)}
            className="bg-white border border-[#D8E1EA] rounded px-3 py-2 text-xs text-slate-700 focus:outline-none focus:border-[#174A78]"
          >
            <option value="ALL">{t('allSectorsDistricts')}</option>
            {uniqueDistricts.map(d => (
              <option key={d} value={d}>{translateData(d)}</option>
            ))}
          </select>

          {/* Type Dropdown */}
          <select
            value={typeFilter}
            onChange={e => setTypeFilter(e.target.value)}
            className="bg-white border border-[#D8E1EA] rounded px-3 py-2 text-xs text-slate-700 focus:outline-none focus:border-[#174A78]"
          >
            <option value="ALL">{t('allIncidentCategories')}</option>
            {uniqueTypes.map(type => (
              <option key={type} value={type}>{translateData(type)}</option>
            ))}
          </select>

          {/* Status Dropdown */}
          <select
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
            className="bg-white border border-[#D8E1EA] rounded px-3 py-2 text-xs text-slate-700 focus:outline-none focus:border-[#174A78]"
          >
            <option value="ALL">{t('allResponseStatuses')}</option>
            <option value="ACTIVE">{t('activeUnresolved')}</option>
            <option value="reported">{t('statusReported')}</option>
            <option value="verified">{t('statusVerified')}</option>
            <option value="dispatched">{t('statusDispatched')}</option>
            <option value="responding">{t('statusResponding')}</option>
            <option value="on_scene">{t('statusOnScene')}</option>
            <option value="resolved">{t('statusResolved')}</option>
          </select>
        </div>
      </div>

      {/* Table Data */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs font-sans">
          <thead className="bg-[#F8FAFC] border-b border-[#D8E1EA] text-[11px] font-semibold text-slate-600 uppercase tracking-wider">
            <tr>
              <th 
                className="py-3 px-4 cursor-pointer hover:text-[#123B63]"
                onClick={() => handleSort('id')}
              >
                <div className="flex items-center gap-1.5">
                  <span>{t('incidentId')}</span>
                  <ArrowUpDown className="w-3 h-3 text-slate-400" />
                </div>
              </th>
              <th className="py-3 px-4">{t('typeLabel')}</th>
              <th className="py-3 px-4">{t('location')}</th>
              <th 
                className="py-3 px-4 cursor-pointer hover:text-[#123B63]"
                onClick={() => handleSort('severity')}
              >
                <div className="flex items-center gap-1.5">
                  <span>{t('severity')}</span>
                  <ArrowUpDown className="w-3 h-3 text-slate-400" />
                </div>
              </th>
              <th 
                className="py-3 px-4 cursor-pointer hover:text-[#123B63]"
                onClick={() => handleSort('status')}
              >
                <div className="flex items-center gap-1.5">
                  <span>{t('status')}</span>
                  <ArrowUpDown className="w-3 h-3 text-slate-400" />
                </div>
              </th>
              <th className="py-3 px-4">{t('units')}</th>
              <th 
                className="py-3 px-4 cursor-pointer hover:text-[#123B63]"
                onClick={() => handleSort('reportedTime')}
              >
                <div className="flex items-center gap-1.5">
                  <span>{t('reportedTime')}</span>
                  <ArrowUpDown className="w-3 h-3 text-slate-400" />
                </div>
              </th>
              <th className="py-3 px-4 text-right">{t('action')}</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {filteredIncidents.length === 0 ? (
              <tr>
                <td colSpan={8} className="py-12 text-center text-slate-500 text-xs">
                  {t('noMatchingIncidentRecords')}
                </td>
              </tr>
            ) : (
              filteredIncidents.map((inc, index) => (
                <tr
                  key={inc.id}
                  onClick={() => navigate(`/incidents/${inc.id}`)}
                  className={`hover:bg-slate-50 transition-colors cursor-pointer ${
                    index % 2 === 1 ? 'bg-[#FAFBFD]' : 'bg-white'
                  }`}
                >
                  {/* ID */}
                  <td className="py-3 px-4 font-mono font-bold text-[#123B63]">
                    {inc.id}
                  </td>

                  {/* Type */}
                  <td className="py-3 px-4 font-medium text-slate-900">
                    {translateData(inc.type)}
                  </td>

                  {/* Location */}
                  <td className="py-3 px-4 text-slate-600">
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span className="truncate max-w-[180px]">{translateData(inc.district)}</span>
                    </div>
                  </td>

                  {/* Severity */}
                  <td className="py-3 px-4">
                    <SeverityBadge severity={inc.severity} size="sm" />
                  </td>

                  {/* Status */}
                  <td className="py-3 px-4">
                    <StatusBadge status={inc.status} size="sm" />
                  </td>

                  {/* Units */}
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-1.5 text-slate-600">
                      <Truck className="w-3.5 h-3.5 text-[#174A78] shrink-0" />
                      <span>{inc.assignedUnits.length} {t('units')}</span>
                    </div>
                  </td>

                  {/* Reported Time */}
                  <td className="py-3 px-4 text-slate-500 font-mono">
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-slate-400" />
                      <span>{inc.reportedTime}</span>
                    </div>
                  </td>

                  {/* Action */}
                  <td className="py-3 px-4 text-right" onClick={e => e.stopPropagation()}>
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => navigate(`/incidents/${inc.id}`)}
                        className="px-2.5 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs transition-colors flex items-center gap-1 font-medium"
                      >
                        <Eye className="w-3 h-3" />
                        <span>{t('details')}</span>
                      </button>
                      {onOpenDispatch && (
                        <button
                          onClick={() => onOpenDispatch(inc)}
                          className="px-2.5 py-1 rounded bg-[#174A78] hover:bg-[#205C91] text-white text-xs transition-colors font-medium"
                        >
                          {t('dispatchUnit')}
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
