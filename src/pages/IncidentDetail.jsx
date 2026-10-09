import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useOperations } from '../context/OperationsContext';
import { SeverityBadge } from '../components/common/SeverityBadge';
import { StatusBadge } from '../components/common/StatusBadge';
import { StatusTimeline } from '../components/incidents/StatusTimeline';
import { OperationalSummary } from '../components/incidents/OperationalSummary';
import { DispatchModal } from '../components/incidents/DispatchModal';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { 
  ArrowLeft, 
  MapPin, 
  Clock, 
  Truck, 
  Send, 
  ChevronRight, 
  Activity, 
  FileText 
} from 'lucide-react';

export const IncidentDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { incidents, units, updateIncidentStatus, t, translateData } = useOperations();
  const [isDispatchModalOpen, setIsDispatchModalOpen] = useState(false);

  const incident = incidents.find(i => i.id === id) || incidents[0];

  if (!incident) {
    return (
      <div className="py-20 text-center">
        <p className="text-sm text-slate-500">{t('incidentRecordNotFound')}</p>
        <button
          onClick={() => navigate('/incidents')}
          className="mt-4 px-4 py-2 bg-[#174A78] text-white rounded text-xs font-medium"
        >
          {t('returnToRegistry')}
        </button>
      </div>
    );
  }

  const assignedUnitsList = incident.assignedUnits.map(unitId => {
    const found = units.find(u => u.id === unitId);
    return found || {
      id: unitId,
      name: `Unit ${unitId}`,
      type: unitId.startsWith('PCR') ? 'police' : unitId.startsWith('AMB') ? 'ambulance' : 'fire',
      category: 'Emergency Fleet',
      status: 'en_route',
      eta: '04:12'
    };
  });

  // Incident map marker icon
  const incidentMarkerIcon = L.divIcon({
    className: 'custom-leaflet-marker',
    html: `
      <div class="relative flex items-center justify-center">
        <div class="w-8 h-8 rounded-full pulse-beacon-critical flex items-center justify-center bg-[#C62828] border-2 border-white shadow-md">
          <div class="w-2.5 h-2.5 rounded-full bg-white"></div>
        </div>
      </div>
    `,
    iconSize: [32, 32],
    iconAnchor: [16, 16],
  });

  return (
    <div className="space-y-6">
      {/* 1. Government Portal Breadcrumbs */}
      <nav className="flex items-center gap-1.5 text-xs text-slate-500">
        <Link to="/dashboard" className="hover:text-[#123B63] hover:underline">
          {t('dashboard')}
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <Link to="/incidents" className="hover:text-[#123B63] hover:underline">
          {t('incidents')}
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <span className="font-semibold text-slate-800">
          {t('incident')} {incident.id} {t('incidentDetails')}
        </span>
      </nav>

      {/* 2. Top Header & Dispatch Action */}
      <div className="bg-white border border-[#D8E1EA] rounded-lg p-5 shadow-xs flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-xl sm:text-2xl font-bold text-[#123B63]">
              {incident.id}
            </h1>
            <span className="text-lg font-semibold text-slate-800">
              — {translateData(incident.type)}
            </span>
            <SeverityBadge severity={incident.severity} size="md" />
            <StatusBadge status={incident.status} size="md" />
          </div>

          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600 mt-2">
            <div className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-slate-500" />
              <span className="font-medium text-slate-800">{translateData(incident.district)}</span>
              <span className="text-slate-500">({translateData(incident.address)})</span>
            </div>
            <div className="flex items-center gap-1 font-mono">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
                <span>{t('reportedLabel')}: {incident.reportedTime}</span>
            </div>
            <div className="flex items-center gap-1 font-mono">
              <Activity className="w-3.5 h-3.5 text-slate-400" />
                <span>{t('eta')}: {incident.eta || '04:32'}</span>
            </div>
          </div>
        </div>

        {/* Dispatch Action Button */}
        <div>
          <button
            onClick={() => setIsDispatchModalOpen(true)}
            className="px-4 py-2 rounded bg-[#174A78] hover:bg-[#205C91] text-white font-medium text-xs tracking-wide transition-colors flex items-center gap-2 shadow-xs"
          >
            <Send className="w-3.5 h-3.5" />
            <span>{t('dispatchMoreUnits')}</span>
          </button>
        </div>
      </div>

      {/* 3. Response Workflow Stepper */}
      <StatusTimeline
        currentStatus={incident.status}
        onAdvanceStatus={nextStatus => updateIncidentStatus(incident.id, nextStatus)}
      />

      {/* 4. Main Two-Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* LEFT COLUMN: Incident Information, Mini-Map, Timeline */}
        <div className="lg:col-span-7 space-y-6">
          {/* Incident Information Panel */}
          <div className="bg-white border border-[#D8E1EA] rounded-lg p-5 shadow-xs">
            <h3 className="text-xs font-semibold text-slate-800 uppercase tracking-wider mb-3 pb-2 border-b border-slate-100 flex items-center gap-2">
              <FileText className="w-4 h-4 text-[#174A78]" />
              <span>{t('incidentInformation')}</span>
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
              <div className="bg-slate-50 p-2.5 rounded border border-slate-200">
                <span className="text-[11px] text-slate-500 block">{t('incidentTypeLabel')}</span>
                <span className="font-semibold text-slate-800">{translateData(incident.type)}</span>
              </div>
              <div className="bg-slate-50 p-2.5 rounded border border-slate-200">
                <span className="text-[11px] text-slate-500 block">{t('severityLevel')}</span>
                <span className="font-semibold text-slate-800">{t(`severity${incident.severity.charAt(0).toUpperCase()}${incident.severity.slice(1)}`)}</span>
              </div>
              <div className="bg-slate-50 p-2.5 rounded border border-slate-200">
                <span className="text-[11px] text-slate-500 block">{t('district')}</span>
                <span className="font-semibold text-slate-800">{translateData(incident.district)}</span>
              </div>
              <div className="bg-slate-50 p-2.5 rounded border border-slate-200">
                <span className="text-[11px] text-slate-500 block">{t('reportedTime')}</span>
                <span className="font-mono text-slate-800">{incident.reportedTime}</span>
              </div>
              <div className="bg-slate-50 p-2.5 rounded border border-slate-200">
                <span className="text-[11px] text-slate-500 block">{t('lastStatusUpdate')}</span>
                <span className="font-mono text-slate-800">{incident.lastUpdated || '21:47'}</span>
              </div>
              <div className="bg-slate-50 p-2.5 rounded border border-slate-200">
                <span className="text-[11px] text-slate-500 block">{t('estimatedResolution')}</span>
                <span className="font-mono text-slate-800">{incident.estimatedResolution || '22:15'}</span>
              </div>
            </div>

            <div className="mt-3 space-y-2 text-xs">
              <div className="bg-slate-50 p-3 rounded border border-slate-200">
                <span className="text-[11px] text-slate-500 block mb-0.5">{t('casualtiesAndTriage')}</span>
                <span className="font-medium text-slate-800">{translateData(incident.casualties) || t('noReportedCasualties')}</span>
              </div>
              <div className="bg-slate-50 p-3 rounded border border-slate-200">
                <span className="text-[11px] text-slate-500 block mb-0.5">{t('controlRoomSituationDescription')}</span>
                <p className="text-slate-700 leading-relaxed">{translateData(incident.description)}</p>
              </div>
            </div>
          </div>

          {/* Incident Geospatial Mini-Map (Clean OpenStreetMap) */}
          <div className="bg-white border border-[#D8E1EA] rounded-lg p-5 shadow-xs space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#C62828]" />
                <h3 className="text-xs font-semibold text-slate-800 uppercase tracking-wider">
                  {t('locationCoordinates')}: [{incident.coordinates.join(', ')}]
                </h3>
              </div>
              <span className="text-xs text-slate-500">{t('securityCordon')}: 300m</span>
            </div>

            <div className="h-60 rounded overflow-hidden border border-slate-200">
              <MapContainer
                center={incident.coordinates}
                zoom={14}
                scrollWheelZoom={false}
                className="w-full h-full"
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={incident.coordinates} icon={incidentMarkerIcon}>
                  <Popup>
                    <div className="p-2 text-xs text-slate-800">
                      <strong>{incident.id}</strong>
                      <p>{translateData(incident.type)}</p>
                    </div>
                  </Popup>
                </Marker>
              </MapContainer>
            </div>
          </div>

          {/* Incident Timeline Audit Log */}
          <div className="bg-white border border-[#D8E1EA] rounded-lg p-5 shadow-xs">
            <h3 className="text-xs font-semibold text-slate-800 uppercase tracking-wider mb-4 pb-2 border-b border-slate-100 flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#174A78]" />
              <span>{t('incidentAuditLog')}</span>
            </h3>

            <div className="space-y-3 relative pl-6 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-[2px] before:bg-slate-200">
              {incident.timeline.map((item, idx) => (
                <div key={idx} className="relative flex items-start gap-3">
                  <div className="absolute -left-6 top-1 w-2.5 h-2.5 rounded-full bg-[#174A78] border-2 border-white shadow-xs" />
                  <div>
                    <div className="flex items-center gap-2 text-xs">
                      <span className="font-mono font-bold text-[#123B63]">{item.time}</span>
                      <span className="text-slate-400">—</span>
                      <span className="text-slate-700">{translateData(item.message)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Operational Summary & Assigned Resources */}
        <div className="lg:col-span-5 space-y-6">
          {/* Operational Summary (formerly AI Summary) */}
          <OperationalSummary summary={incident.operationalSummary} />

          {/* Assigned Resources Panel */}
          <div className="bg-white border border-[#D8E1EA] rounded-lg p-5 shadow-xs space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-[#174A78]" />
                <h3 className="text-xs font-semibold text-slate-800 uppercase tracking-wider">
                  {t('assignedResources')} ({assignedUnitsList.length})
                </h3>
              </div>

              <button
                onClick={() => setIsDispatchModalOpen(true)}
                className="text-xs text-[#174A78] hover:underline font-medium flex items-center gap-1"
              >
                <span>+ {t('assignUnit')}</span>
              </button>
            </div>

            <div className="space-y-2.5">
              {assignedUnitsList.length === 0 ? (
                <p className="py-6 text-center text-xs text-slate-500">
                  {t('noResourcesAssigned')}
                </p>
              ) : (
                assignedUnitsList.map(unit => {
                  let badgeBg = 'bg-blue-50 text-[#174A78] border-blue-200';
                  if (unit.type === 'ambulance') {
                    badgeBg = 'bg-emerald-50 text-[#218653] border-emerald-200';
                  } else if (unit.type === 'fire') {
                    badgeBg = 'bg-amber-50 text-amber-800 border-amber-200';
                  }

                  return (
                    <div
                      key={unit.id}
                      className="p-3.5 rounded-lg bg-slate-50 border border-slate-200 hover:border-slate-300 transition-colors flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded border ${badgeBg}`}>
                          <Truck className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-mono font-bold text-xs text-[#123B63]">
                              {unit.id}
                            </span>
                            <span className="text-xs text-slate-800 font-semibold">
                              {translateData(unit.name)}
                            </span>
                          </div>
                          <p className="text-xs text-slate-500 mt-0.5">
                            {translateData(unit.crew) || t('dutyCrew')} • {t('sector')}: {translateData(unit.location || incident.district)}
                          </p>
                        </div>
                      </div>

                      <div className="text-right">
                        <StatusBadge status={unit.status} size="sm" />
                        <div className="text-xs font-mono text-[#174A78] font-bold mt-1">
                          {unit.status === 'on_scene' ? t('statusOnScene') : `${t('eta')} ${unit.eta || '03:45'}`}
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Dispatch Modal */}
      <DispatchModal
        incident={incident}
        isOpen={isDispatchModalOpen}
        onClose={() => setIsDispatchModalOpen(false)}
      />
    </div>
  );
};
