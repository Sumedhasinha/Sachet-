import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import L from 'leaflet';
import { useOperations } from '../../context/OperationsContext';
import { SeverityBadge } from '../common/SeverityBadge';
import { StatusBadge } from '../common/StatusBadge';
import { SACHET_CITY_CENTER } from '../../data/mockData';
import { 
  Building2, 
  Home, 
  ExternalLink, 
  Crosshair, 
  Maximize2 
} from 'lucide-react';

// Controller to handle center reset
const MapController = ({ center, zoom }) => {
  const map = useMap();
  React.useEffect(() => {
    map.setView(center, zoom);
  }, [center, zoom, map]);
  return null;
};

export const IncidentMap = ({
  height = '500px',
  selectedIncidentId = null,
  showControls = true,
  fullscreenLink = null
}) => {
  const navigate = useNavigate();
  const { incidents, units, hospitals, shelters, t, translateData } = useOperations();

  // Layer toggles
  const [layers, setLayers] = useState({
    incidents: true,
    police: true,
    ambulance: true,
    fire: true,
    hospitals: true,
    shelters: true,
    flowRoutes: true,
  });

  const [mapCenter, setMapCenter] = useState(SACHET_CITY_CENTER);
  const [mapZoom, setMapZoom] = useState(13);

  // SVG Marker Generator with animated pulse rings
  const createIncidentIcon = (severity) => {
    const isCrit = severity === 'critical';
    const isHigh = severity === 'high';
    const color = isCrit ? '#C62828' : isHigh ? '#E58A16' : '#2867A5';
    const pulseClass = isCrit ? 'pulse-beacon-critical' : '';

    return L.divIcon({
      className: 'custom-leaflet-marker',
      html: `
        <div class="relative flex items-center justify-center">
          ${isCrit ? '<div class="absolute w-10 h-10 rounded-full border-2 border-red-500 animate-radio-wave pointer-events-none"></div>' : ''}
          <div class="w-7 h-7 rounded-full ${pulseClass} flex items-center justify-center shadow-md relative z-10"
               style="background-color: ${color}; border: 2px solid #FFFFFF;">
            <div class="w-2.5 h-2.5 rounded-full bg-white"></div>
          </div>
        </div>
      `,
      iconSize: [28, 28],
      iconAnchor: [14, 14],
      popupAnchor: [0, -16],
    });
  };

  const createUnitIcon = (type) => {
    let color = '#123B63';
    let label = 'P';
    if (type === 'ambulance') {
      color = '#218653';
      label = '+';
    } else if (type === 'fire') {
      color = '#C62828';
      label = 'F';
    }

    return L.divIcon({
      className: 'custom-leaflet-marker',
      html: `
        <div class="w-6 h-6 rounded flex items-center justify-center font-sans font-bold text-[11px] shadow-md transition-transform hover:scale-110"
             style="background-color: ${color}; color: #FFFFFF; border: 1.5px solid #FFFFFF;">
          ${label}
        </div>
      `,
      iconSize: [24, 24],
      iconAnchor: [12, 12],
      popupAnchor: [0, -14],
    });
  };

  const createFacilityIcon = (type) => {
    const isHospital = type === 'hospital';
    const color = isHospital ? '#218653' : '#6B21A8';
    const label = isHospital ? 'H' : 'S';

    return L.divIcon({
      className: 'custom-leaflet-marker',
      html: `
        <div class="w-5 h-5 rounded-full flex items-center justify-center font-sans font-bold text-[10px] shadow"
             style="background-color: ${color}; color: #FFFFFF; border: 1.5px solid #FFFFFF;">
          ${label}
        </div>
      `,
      iconSize: [20, 20],
      iconAnchor: [10, 10],
      popupAnchor: [0, -12],
    });
  };

  const toggleLayer = (layerKey) => {
    setLayers(prev => ({ ...prev, [layerKey]: !prev[layerKey] }));
  };

  const resetView = () => {
    setMapCenter(SACHET_CITY_CENTER);
    setMapZoom(13);
  };

  // Find responding dispatch flow routes
  const respondingRoutes = layers.flowRoutes ? units
    .filter(u => u.assignedTo && (u.status === 'en_route' || u.status === 'responding'))
    .map(u => {
      const targetInc = incidents.find(i => i.id === u.assignedTo);
      if (!targetInc) return null;
      return {
        unitId: u.id,
        unitType: u.type,
        incidentId: targetInc.id,
        positions: [u.coordinates, targetInc.coordinates]
      };
    })
    .filter(Boolean) : [];

  return (
    <div className="relative w-full rounded-lg overflow-hidden border border-[#D8E1EA] bg-slate-100 shadow-sm" style={{ height }}>
      {/* Top Floating Controls Overlay */}
      {showControls && (
        <div className="absolute top-3 left-3 z-[1000] flex flex-wrap items-center gap-1.5 bg-white/95 backdrop-blur-xs border border-[#D8E1EA] p-1.5 rounded-lg shadow-md">
          <button
            onClick={() => toggleLayer('incidents')}
            className={`px-2 py-1 rounded text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer ${
              layers.incidents ? 'bg-red-50 text-red-800 border border-red-300' : 'bg-slate-50 text-slate-500'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-[#C62828]" />
            {t('incidentsLabel')}
          </button>
          <button
            onClick={() => toggleLayer('police')}
            className={`px-2 py-1 rounded text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer ${
              layers.police ? 'bg-blue-50 text-[#123B63] border border-blue-200' : 'bg-slate-50 text-slate-500'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-[#123B63]" />
            {t('mapPolice')}
          </button>
          <button
            onClick={() => toggleLayer('ambulance')}
            className={`px-2 py-1 rounded text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer ${
              layers.ambulance ? 'bg-emerald-50 text-[#218653] border border-emerald-300' : 'bg-slate-50 text-slate-500'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-[#218653]" />
            {t('mapEms')}
          </button>
          <button
            onClick={() => toggleLayer('fire')}
            className={`px-2 py-1 rounded text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer ${
              layers.fire ? 'bg-amber-50 text-amber-800 border border-amber-300' : 'bg-slate-50 text-slate-500'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-[#E58A16]" />
            {t('mapFireRescue')}
          </button>
          <button
            onClick={() => toggleLayer('flowRoutes')}
            className={`px-2 py-1 rounded text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer ${
              layers.flowRoutes ? 'bg-indigo-50 text-indigo-800 border border-indigo-200' : 'bg-slate-50 text-slate-500'
            }`}
            title={t('toggleFlowRoutes')}
          >
            <span className="w-2 h-2 rounded-full bg-indigo-600 animate-pulse" />
            {t('flowRoutes')}
          </button>
          <button
            onClick={() => toggleLayer('hospitals')}
            className={`px-2 py-1 rounded text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer ${
              layers.hospitals ? 'bg-emerald-50 text-[#218653] border border-emerald-300' : 'bg-slate-50 text-slate-500'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-[#218653]" />
            {t('mapHospitals')}
          </button>
          <button
            onClick={() => toggleLayer('shelters')}
            className={`px-2 py-1 rounded text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer ${
              layers.shelters ? 'bg-purple-50 text-purple-800 border border-purple-200' : 'bg-slate-50 text-slate-500'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-[#6B21A8]" />
            {t('mapShelters')}
          </button>
        </div>
      )}

      {/* Map Action Buttons (Center, Fullscreen) */}
      <div className="absolute top-3 right-3 z-[1000] flex items-center gap-2">
        <button
          onClick={resetView}
          title={t('recenterCityMap')}
          className="p-2 rounded-lg bg-white/95 border border-[#D8E1EA] text-slate-700 hover:text-[#123B63] hover:bg-slate-50 transition-colors shadow-md cursor-pointer"
        >
          <Crosshair className="w-4 h-4" />
        </button>
        {fullscreenLink && (
          <button
            onClick={() => navigate(fullscreenLink)}
            title={t('openFullMap')}
            className="p-2 rounded-lg bg-white/95 border border-[#D8E1EA] text-slate-700 hover:text-[#123B63] hover:bg-slate-50 transition-colors shadow-md cursor-pointer"
          >
            <Maximize2 className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Standard OpenStreetMap Container */}
      <MapContainer
        center={mapCenter}
        zoom={mapZoom}
        scrollWheelZoom={true}
        className="w-full h-full"
      >
        <MapController center={mapCenter} zoom={mapZoom} />

        {/* Reliable Standard OpenStreetMap Tiles */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          maxZoom={19}
        />

        {/* Animated Flow Lines Connecting Responding Units to Incidents */}
        {respondingRoutes.map(route => {
          const lineColor = route.unitType === 'ambulance' ? '#218653' : route.unitType === 'fire' ? '#C62828' : '#123B63';
          return (
            <Polyline
              key={`route-${route.unitId}-${route.incidentId}`}
              positions={route.positions}
              pathOptions={{
                color: lineColor,
                weight: 3.5,
                opacity: 0.85,
                dashArray: '6, 8',
                className: 'animate-flow-dash'
              }}
            />
          );
        })}

        {/* 1. Incident Markers */}
        {layers.incidents && incidents.map(inc => (
          <Marker
            key={inc.id}
            position={inc.coordinates}
            icon={createIncidentIcon(inc.severity)}
          >
            <Popup>
              <div className="p-3 w-64 bg-white text-slate-800 font-sans">
                <div className="flex items-center justify-between border-b border-slate-200 pb-2 mb-2">
                  <span className="font-mono font-bold text-xs text-[#123B63]">
                    {inc.id}
                  </span>
                  <SeverityBadge severity={inc.severity} size="sm" />
                </div>

                <h4 className="text-sm font-semibold text-slate-900 mb-1">
                  {translateData(inc.type)}
                </h4>
                <p className="text-xs text-slate-500 mb-2">
                  📍 {translateData(inc.address || inc.district)}
                </p>

                <div className="space-y-1 text-xs text-slate-600 mb-3 bg-slate-50 p-2 rounded border border-slate-200">
                  <div className="flex justify-between">
                    <span className="text-slate-500">{t('reportedLabel')}:</span>
                    <span className="font-mono">{inc.reportedTime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">{t('assignedUnits')}:</span>
                    <span>{inc.assignedUnits.length} {t('units')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">{t('eta')}:</span>
                    <span className="text-[#174A78] font-bold font-mono">{inc.eta || '04:15'}</span>
                  </div>
                </div>

                <button
                  onClick={() => navigate(`/incidents/${inc.id}`)}
                  className="w-full py-1.5 px-3 bg-[#174A78] hover:bg-[#205C91] text-white rounded text-xs font-medium transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>{t('viewDetails')}</span>
                  <ExternalLink className="w-3 h-3" />
                </button>
              </div>
            </Popup>
          </Marker>
        ))}

        {/* 2. Emergency Unit Markers */}
        {units.map(unit => {
          if (unit.type === 'police' && !layers.police) return null;
          if (unit.type === 'ambulance' && !layers.ambulance) return null;
          if (unit.type === 'fire' && !layers.fire) return null;

          return (
            <Marker
              key={unit.id}
              position={unit.coordinates}
              icon={createUnitIcon(unit.type)}
            >
              <Popup>
                <div className="p-3 w-56 bg-white text-slate-800 font-sans">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-2 mb-2">
                    <span className="font-mono font-bold text-xs text-[#123B63]">
                      {unit.id}
                    </span>
                    <StatusBadge status={unit.status} size="sm" />
                  </div>
                  <p className="text-xs font-semibold text-slate-900">{translateData(unit.name)}</p>
                  <p className="text-xs text-slate-500 mt-0.5">{translateData(unit.location)}</p>
                  
                  {unit.assignedTo && (
                    <div className="mt-2 text-xs p-1.5 bg-amber-50 rounded border border-amber-200 text-amber-800">
                      {t('assignedToLabel')} {unit.assignedTo}
                    </div>
                  )}
                  
                  <div className="mt-2 text-[11px] text-slate-500 flex justify-between">
                    <span>{t('battery')}: {unit.battery}%</span>
                    <span>{translateData(unit.crew)}</span>
                  </div>
                </div>
              </Popup>
            </Marker>
          );
        })}

        {/* 3. Hospital Markers */}
        {layers.hospitals && hospitals.map(hosp => (
          <Marker
            key={hosp.id}
            position={hosp.coordinates}
            icon={createFacilityIcon('hospital')}
          >
            <Popup>
              <div className="p-3 w-60 bg-white text-slate-800 font-sans">
                <div className="flex items-center gap-1.5 text-[#218653] font-semibold text-xs mb-1">
                  <Building2 className="w-3.5 h-3.5" />
                  <span>{t('hospitalFacility')}</span>
                </div>
                <h5 className="text-xs font-semibold text-slate-900">{translateData(hosp.name)}</h5>
                <p className="text-xs text-slate-500">{translateData(hosp.address)}</p>
                <div className="mt-2 p-1.5 bg-slate-50 rounded text-xs border border-slate-200 space-y-1">
                  <div className="flex justify-between">
                    <span className="text-slate-500">{t('availableBeds')}:</span>
                    <span className="text-[#218653] font-bold">{hosp.bedsAvailable} / {hosp.totalBeds}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">{t('icuStatus')}:</span>
                    <span className="text-slate-700">{translateData(hosp.icuStatus)}</span>
                  </div>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}

        {/* 4. Shelter Markers */}
        {layers.shelters && shelters.map(shelter => (
          <Marker
            key={shelter.id}
            position={shelter.coordinates}
            icon={createFacilityIcon('shelter')}
          >
            <Popup>
              <div className="p-3 w-56 bg-white text-slate-800 font-sans">
                <div className="flex items-center gap-1.5 text-purple-700 font-semibold text-xs mb-1">
                  <Home className="w-3.5 h-3.5" />
                  <span>{t('reliefShelter')}</span>
                </div>
                <h5 className="text-xs font-semibold text-slate-900">{translateData(shelter.name)}</h5>
                <div className="mt-2 p-1.5 bg-slate-50 rounded text-xs border border-slate-200 space-y-1">
                  <div className="flex justify-between">
                    <span className="text-slate-500">{t('occupancy')}:</span>
                    <span className="font-semibold">{shelter.occupied} / {shelter.capacity}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">{t('status')}:</span>
                    <span className="text-[#218653] font-medium">{translateData(shelter.status)}</span>
                  </div>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};
