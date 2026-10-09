import React, { useState } from 'react';
import { useOperations } from '../context/OperationsContext';
import { 
  User, 
  Bell, 
  Map, 
  Monitor, 
  ShieldCheck, 
  Sliders, 
  Save, 
  Globe 
} from 'lucide-react';

export const Settings = () => {
  const { currentUser, isSimulating, setIsSimulating, language, toggleLanguage, addToast, t, translateData } = useOperations();

  const [profile, setProfile] = useState({
    name: currentUser.name,
    badge: currentUser.badge,
    clearance: currentUser.clearance,
    callsign: currentUser.callsign,
    station: 'State Emergency Operations Center (SEOC), Bhopal'
  });

  const [notifications, setNotifications] = useState({
    audioSirens: true,
    flashBeacons: true,
    cadAutoPopups: true,
    smsEscalation: true
  });

  const [mapPrefs, setMapPrefs] = useState({
    tileStyle: 'osm-standard',
    showTrafficZones: true,
    autoCenterIncidents: true,
    clusterMarkers: false
  });

  const [displayPrefs, setDisplayPrefs] = useState({
    uiDensity: 'comfortable',
    highContrastMode: false,
    showIstClock: true
  });

  const [securityPrefs, setSecurityPrefs] = useState({
    autoLockTimeout: '30m',
    twoFactorEnforced: true,
    cadLogAuditing: true
  });

  const handleSave = () => {
    addToast({
      type: 'success',
      title: t('preferencesSaved'),
      message: t('preferencesSavedMessage')
    });
  };

  return (
    <div className="space-y-6 max-w-5xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-[#D8E1EA] pb-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-[#123B63] tracking-tight">
            {t('workstationSettings')}
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            {t('settingsSubtitle')}
          </p>
        </div>

        <button
          onClick={handleSave}
          className="px-4 py-2 rounded bg-[#174A78] hover:bg-[#205C91] text-white text-xs font-medium transition-colors flex items-center gap-2 shadow-xs"
        >
          <Save className="w-4 h-4" />
          <span>{t('saveChanges')}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 1. Profile Section */}
        <div className="bg-white border border-[#D8E1EA] rounded-lg p-5 shadow-xs space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
            <User className="w-4 h-4 text-[#174A78]" />
            <h3 className="text-xs font-semibold text-slate-900 uppercase tracking-wider">
              {t('operatorProfileHeader')}
            </h3>
          </div>

          <div className="space-y-3 text-xs">
            <div>
              <label className="text-xs font-medium text-slate-700 block mb-1">{t('operatorFullName')}</label>
              <input
                type="text"
                value={profile.name}
                onChange={e => setProfile({ ...profile, name: e.target.value })}
                className="w-full bg-white border border-[#D8E1EA] rounded px-3 py-2 text-slate-800 focus:outline-none focus:border-[#174A78]"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-xs font-medium text-slate-700 block mb-1">{t('badgeId')}</label>
                <input
                  type="text"
                  value={profile.badge}
                  disabled
                  className="w-full bg-slate-50 border border-[#D8E1EA] rounded px-3 py-2 text-slate-500 font-mono cursor-not-allowed"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-slate-700 block mb-1">{t('clearanceLevel')}</label>
                <input
                  type="text"
                  value={translateData(profile.clearance)}
                  disabled
                  className="w-full bg-slate-50 border border-[#D8E1EA] rounded px-3 py-2 text-[#218653] font-semibold cursor-not-allowed"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-medium text-slate-700 block mb-1">{t('assignedOperationsPost')}</label>
              <input
                type="text"
                value={translateData(profile.station)}
                onChange={e => setProfile({ ...profile, station: e.target.value })}
                className="w-full bg-white border border-[#D8E1EA] rounded px-3 py-2 text-slate-800 focus:outline-none focus:border-[#174A78]"
              />
            </div>
          </div>
        </div>

        {/* 2. Notifications Section */}
        <div className="bg-white border border-[#D8E1EA] rounded-lg p-5 shadow-xs space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
            <Bell className="w-4 h-4 text-[#E58A16]" />
            <h3 className="text-xs font-semibold text-slate-900 uppercase tracking-wider">
              {t('emergencyNotificationAlerts')}
            </h3>
          </div>

          <div className="space-y-3 text-xs">
            <label className="flex items-center justify-between p-2.5 rounded bg-slate-50 border border-slate-200 cursor-pointer">
              <div>
                <span className="font-semibold text-slate-800 block">{t('audibleAlertChimes')}</span>
                <span className="text-[11px] text-slate-500">{t('alertToneDescription')}</span>
              </div>
              <input
                type="checkbox"
                checked={notifications.audioSirens}
                onChange={e => setNotifications({ ...notifications, audioSirens: e.target.checked })}
                className="w-4 h-4 accent-[#174A78] rounded cursor-pointer"
              />
            </label>

            <label className="flex items-center justify-between p-2.5 rounded bg-slate-50 border border-slate-200 cursor-pointer">
              <div>
                <span className="font-semibold text-slate-800 block">{t('criticalBeaconIndicator')}</span>
                <span className="text-[11px] text-slate-500">{t('beaconIndicatorDescription')}</span>
              </div>
              <input
                type="checkbox"
                checked={notifications.flashBeacons}
                onChange={e => setNotifications({ ...notifications, flashBeacons: e.target.checked })}
                className="w-4 h-4 accent-[#174A78] rounded cursor-pointer"
              />
            </label>

            <label className="flex items-center justify-between p-2.5 rounded bg-slate-50 border border-slate-200 cursor-pointer">
              <div>
                <span className="font-semibold text-slate-800 block">{t('smsFieldOfficerEscalation')}</span>
                <span className="text-[11px] text-slate-500">{t('escalationDescription')}</span>
              </div>
              <input
                type="checkbox"
                checked={notifications.smsEscalation}
                onChange={e => setNotifications({ ...notifications, smsEscalation: e.target.checked })}
                className="w-4 h-4 accent-[#174A78] rounded cursor-pointer"
              />
            </label>
          </div>
        </div>

        {/* 3. Map Preferences */}
        <div className="bg-white border border-[#D8E1EA] rounded-lg p-5 shadow-xs space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
            <Map className="w-4 h-4 text-[#218653]" />
            <h3 className="text-xs font-semibold text-slate-900 uppercase tracking-wider">
              {t('gisMapPreferences')}
            </h3>
          </div>

          <div className="space-y-3 text-xs">
            <div>
              <label className="text-xs font-medium text-slate-700 block mb-1">{t('mapTileProvider')}</label>
              <select
                value={mapPrefs.tileStyle}
                onChange={e => setMapPrefs({ ...mapPrefs, tileStyle: e.target.value })}
                className="w-full bg-white border border-[#D8E1EA] rounded px-3 py-2 text-slate-800 focus:outline-none focus:border-[#174A78]"
              >
                <option value="osm-standard">{t('mapProviderOpenStreetMap')}</option>
              </select>
            </div>

            <label className="flex items-center justify-between p-2.5 rounded bg-slate-50 border border-slate-200 cursor-pointer">
              <div>
                <span className="font-semibold text-slate-800 block">{t('incidentAutoFocusTracking')}</span>
                <span className="text-[11px] text-slate-500">{t('panCameraDescription')}</span>
              </div>
              <input
                type="checkbox"
                checked={mapPrefs.autoCenterIncidents}
                onChange={e => setMapPrefs({ ...mapPrefs, autoCenterIncidents: e.target.checked })}
                className="w-4 h-4 accent-[#174A78] rounded cursor-pointer"
              />
            </label>

            <label className="flex items-center justify-between p-2.5 rounded bg-slate-50 border border-slate-200 cursor-pointer">
              <div>
                <span className="font-semibold text-slate-800 block">{t('civicFacilityLayers')}</span>
                <span className="text-[11px] text-slate-500">{t('facilityLayersDescription')}</span>
              </div>
              <input
                type="checkbox"
                checked={mapPrefs.showTrafficZones}
                onChange={e => setMapPrefs({ ...mapPrefs, showTrafficZones: e.target.checked })}
                className="w-4 h-4 accent-[#174A78] rounded cursor-pointer"
              />
            </label>
          </div>
        </div>

        {/* 4. Language & System Simulation */}
        <div className="bg-white border border-[#D8E1EA] rounded-lg p-5 shadow-xs space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
            <Sliders className="w-4 h-4 text-[#123B63]" />
            <h3 className="text-xs font-semibold text-slate-900 uppercase tracking-wider">
              {t('systemSimulationLanguage')}
            </h3>
          </div>

          <div className="space-y-3 text-xs">
            <div className="p-2.5 rounded bg-slate-50 border border-slate-200 flex items-center justify-between">
              <div>
                <span className="font-semibold text-slate-800 block">{t('telemetrySimulation')}</span>
                <span className="text-[11px] text-slate-500">{t('telemetryDescription')}</span>
              </div>
              <button
                onClick={() => setIsSimulating(!isSimulating)}
                className={`px-3 py-1 rounded text-xs font-semibold transition-colors ${
                  isSimulating ? 'bg-[#218653] text-white' : 'bg-slate-200 text-slate-700'
                }`}
              >
                {isSimulating ? t('active') : t('paused')}
              </button>
            </div>

            <div className="p-2.5 rounded bg-slate-50 border border-slate-200 flex items-center justify-between">
              <div>
                <span className="font-semibold text-slate-800 block">{t('portalLanguageLabel')}</span>
                <span className="text-[11px] text-slate-500">{t('currently')}: {language === 'en' ? t('english') : t('hindi')}</span>
              </div>
              <button
                onClick={() => toggleLanguage()}
                className="px-3 py-1 rounded bg-[#174A78] hover:bg-[#205C91] text-white text-xs font-medium transition-colors"
              >
                {t('switchTo')} {language === 'en' ? t('hindi') : t('english')}
              </button>
            </div>

            <div className="p-2.5 rounded bg-emerald-50 border border-emerald-200 text-xs text-[#218653] flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 shrink-0" />
              <span>{t('tlsEncryption')}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
