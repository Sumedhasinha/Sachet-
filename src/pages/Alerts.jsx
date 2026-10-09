import React, { useState } from 'react';
import { useOperations } from '../context/OperationsContext';
import { 
  Bell, 
  ShieldAlert, 
  AlertTriangle, 
  Info, 
  CheckCheck, 
  Trash2, 
  Volume2, 
  MapPin, 
  Clock 
} from 'lucide-react';

export const Alerts = () => {
  const { alerts, markAlertRead, markAllAlertsRead, dismissAlert, addToast, t, translateData } = useOperations();
  const [activeTab, setActiveTab] = useState('ALL');

  const filteredAlerts = alerts.filter(a => {
    if (activeTab === 'ALL') return true;
    return a.priority.toLowerCase() === activeTab.toLowerCase();
  });

  const criticalCount = alerts.filter(a => a.priority === 'critical').length;
  const highCount = alerts.filter(a => a.priority === 'high').length;
  const infoCount = alerts.filter(a => a.priority === 'info').length;

  const testAudioBeacon = () => {
    addToast({
      type: 'warning',
      title: t('audioWarningTest'),
      message: t('audioWarningMessage')
    });
  };

  const getPriorityTheme = (priority) => {
    switch (priority) {
      case 'critical':
        return {
          border: 'border-l-4 border-l-[#C62828] border-slate-200',
          badge: 'bg-red-50 text-[#C62828] border-red-200',
          icon: ShieldAlert,
          iconColor: 'text-[#C62828]',
        };
      case 'high':
        return {
          border: 'border-l-4 border-l-[#E58A16] border-slate-200',
          badge: 'bg-amber-50 text-amber-800 border-amber-200',
          icon: AlertTriangle,
          iconColor: 'text-[#E58A16]',
        };
      default:
        return {
          border: 'border-l-4 border-l-[#2867A5] border-slate-200',
          badge: 'bg-blue-50 text-[#174A78] border-blue-200',
          icon: Info,
          iconColor: 'text-[#2867A5]',
        };
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-[#D8E1EA] pb-4">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-xl sm:text-2xl font-bold text-[#123B63] tracking-tight">
              {t('emergencyAlertsBroadcasts')}
            </h1>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-red-100 text-[#C62828]">
              {alerts.filter(a => !a.read).length} {t('unread')}
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            {t('urgentWarnings')}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={testAudioBeacon}
            className="px-3 py-1.5 rounded bg-white hover:bg-slate-50 border border-[#D8E1EA] text-slate-700 text-xs font-medium flex items-center gap-1.5 transition-colors shadow-xs"
          >
            <Volume2 className="w-3.5 h-3.5 text-[#174A78]" />
            <span>{t('testAudioChime')}</span>
          </button>
          <button
            onClick={markAllAlertsRead}
            className="px-3 py-1.5 rounded bg-[#174A78] hover:bg-[#205C91] text-white text-xs font-medium transition-colors flex items-center gap-1.5 shadow-xs"
          >
            <CheckCheck className="w-3.5 h-3.5" />
            <span>{t('markAllRead')}</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-[#D8E1EA] pb-2">
        <button
          onClick={() => setActiveTab('ALL')}
          className={`px-3 py-1.5 rounded text-xs font-medium transition-colors ${
            activeTab === 'ALL'
              ? 'bg-[#123B63] text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          {t('allAlerts')} ({alerts.length})
        </button>
        <button
          onClick={() => setActiveTab('CRITICAL')}
          className={`px-3 py-1.5 rounded text-xs font-medium transition-colors flex items-center gap-1.5 ${
            activeTab === 'CRITICAL'
              ? 'bg-red-50 text-[#C62828] border border-red-300 font-semibold'
              : 'text-slate-600 hover:text-red-700'
          }`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#C62828]" />
          <span>{t('critical')} ({criticalCount})</span>
        </button>
        <button
          onClick={() => setActiveTab('HIGH')}
          className={`px-3 py-1.5 rounded text-xs font-medium transition-colors flex items-center gap-1.5 ${
            activeTab === 'HIGH'
              ? 'bg-amber-50 text-amber-800 border border-amber-300 font-semibold'
              : 'text-slate-600 hover:text-amber-800'
          }`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#E58A16]" />
          <span>{t('high')} ({highCount})</span>
        </button>
        <button
          onClick={() => setActiveTab('INFO')}
          className={`px-3 py-1.5 rounded text-xs font-medium transition-colors flex items-center gap-1.5 ${
            activeTab === 'INFO'
              ? 'bg-blue-50 text-[#174A78] border border-blue-300 font-semibold'
              : 'text-slate-600 hover:text-blue-800'
          }`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#2867A5]" />
          <span>{t('information')} ({infoCount})</span>
        </button>
      </div>

      {/* Alerts List */}
      <div className="space-y-3">
        {filteredAlerts.length === 0 ? (
          <div className="py-16 text-center text-xs text-slate-500 bg-white border border-[#D8E1EA] rounded-lg">
            {t('noAlertsCategory')}
          </div>
        ) : (
          filteredAlerts.map(alert => {
            const theme = getPriorityTheme(alert.priority);
            const Icon = theme.icon;

            return (
              <div
                key={alert.id}
                className={`bg-white rounded-lg border p-4 transition-all shadow-xs ${theme.border} ${
                  alert.read ? 'opacity-75' : ''
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded bg-slate-50 border border-slate-200 shrink-0 mt-0.5">
                      <Icon className={`w-5 h-5 ${theme.iconColor}`} />
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-0.5 rounded border text-[11px] font-semibold uppercase ${theme.badge}`}>
                          {translateData(alert.priority === 'info' ? 'Information' : alert.priority)}
                        </span>
                        {!alert.read && (
                          <span className="text-[10px] font-medium text-[#174A78] bg-blue-50 border border-blue-200 px-1.5 py-0.5 rounded">
                            {t('unread')}
                          </span>
                        )}
                        <span className="text-xs font-mono text-slate-400">
                          {alert.id}
                        </span>
                      </div>

                      <h3 className="text-sm font-semibold text-slate-900">
                        {translateData(alert.title)}
                      </h3>

                      <p className="text-xs text-slate-600 leading-relaxed max-w-3xl">
                        {translateData(alert.description)}
                      </p>

                      <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 pt-1">
                        <div className="flex items-center gap-1 text-slate-700">
                          <MapPin className="w-3.5 h-3.5 text-slate-400" />
                          <span>{translateData(alert.location)}</span>
                        </div>
                        <div className="flex items-center gap-1 font-mono">
                          <Clock className="w-3 h-3 text-slate-400" />
                          <span>{translateData(alert.timestamp)}</span>
                        </div>
                        <div className="text-slate-500">
                          {t('authority')}: {translateData(alert.issuer)}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-1.5 shrink-0 self-end sm:self-start">
                    {!alert.read && (
                      <button
                        onClick={() => markAlertRead(alert.id)}
                        className="px-2.5 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs transition-colors font-medium"
                      >
                        {t('acknowledge')}
                      </button>
                    )}
                    <button
                      onClick={() => dismissAlert(alert.id)}
                      title={t('dismissAlert')}
                      className="p-1.5 rounded text-slate-400 hover:text-red-700 hover:bg-red-50 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
