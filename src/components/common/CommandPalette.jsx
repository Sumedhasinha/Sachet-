import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useOperations } from '../../context/OperationsContext';
import { 
  Search, 
  MapPin, 
  Radio, 
  Layers, 
  BarChart3, 
  Bell, 
  Settings, 
  Truck, 
  ShieldAlert, 
  CornerDownLeft, 
  Play, 
  Pause,
  X
} from 'lucide-react';

export const CommandPalette = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const { incidents, units, markAllAlertsRead, isSimulating, setIsSimulating, t, translateData } = useOperations();
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      const timer = setTimeout(() => inputRef.current?.focus(), 30);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Robust global keydown listener on window (capture phase)
  useEffect(() => {
    if (!isOpen) return;

    const handleGlobalKeyDown = (e) => {
      // Escape closes
      if (e.key === 'Escape') {
        e.preventDefault();
        e.stopPropagation();
        onClose();
        return;
      }
      
      // Ctrl+K / Cmd+K toggles/closes
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        e.stopPropagation();
        onClose();
        return;
      }
    };

    window.addEventListener('keydown', handleGlobalKeyDown, true);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown, true);
  }, [isOpen, onClose]);

  const defaultItems = [
    { type: 'nav', id: 'nav-dash', title: t('dashboard'), subtitle: t('emergencyOperationsOverview'), path: '/dashboard', icon: Layers },
    { type: 'nav', id: 'nav-inc', title: t('incidents'), subtitle: t('incidentRegistryDispatchLedger'), path: '/incidents', icon: ShieldAlert },
    { type: 'nav', id: 'nav-map', title: t('operationsMap'), subtitle: t('fullScreenMunicipalMap'), path: '/map', icon: MapPin },
    { type: 'nav', id: 'nav-res', title: t('resources'), subtitle: t('ambulancePoliceFireFleet'), path: '/resources', icon: Truck },
    { type: 'nav', id: 'nav-ana', title: t('analytics'), subtitle: t('responseBenchmarks'), path: '/analytics', icon: BarChart3 },
    { type: 'nav', id: 'nav-alt', title: t('alerts'), subtitle: t('civilDefenseWeather'), path: '/alerts', icon: Bell },
    { type: 'nav', id: 'nav-set', title: t('settings'), subtitle: t('workstationPreferences'), path: '/settings', icon: Settings },
    { 
      type: 'action', 
      id: 'act-ack', 
      title: t('acknowledgeAllAlerts'), 
      subtitle: t('markPendingReviewed'), 
      action: () => markAllAlertsRead(), 
      icon: Radio 
    },
    { 
      type: 'action', 
      id: 'act-sim', 
      title: isSimulating ? t('pauseLiveSimulation') : t('resumeLiveSimulation'), 
      subtitle: t('toggleSimulatedMovement'), 
      action: () => setIsSimulating(!isSimulating), 
      icon: isSimulating ? Pause : Play 
    },
  ];

  const incidentItems = incidents.map(inc => ({
    type: 'incident',
    id: inc.id,
    title: `${inc.id} — ${translateData(inc.type)}`,
    subtitle: `${translateData(inc.district)} • ${translateData(inc.severity)} • ${translateData(inc.status)}`,
    path: `/incidents/${inc.id}`,
    icon: ShieldAlert
  }));

  const unitItems = units.map(u => ({
    type: 'unit',
    id: u.id,
    title: `${u.id} — ${translateData(u.name)}`,
    subtitle: `${translateData(u.category)} • ${t('status')}: ${translateData(u.status)} • ${translateData(u.location)}`,
    path: `/resources?unit=${u.id}`,
    icon: Truck
  }));

  const allItems = [...defaultItems, ...incidentItems, ...unitItems];

  const filteredItems = query.trim() === ''
    ? defaultItems
    : allItems.filter(item => 
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.subtitle.toLowerCase().includes(query.toLowerCase()) ||
        item.id.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 10);

  const handleSelect = (item) => {
    if (item.action) {
      item.action();
      onClose();
    } else if (item.path) {
      navigate(item.path);
      onClose();
    }
  };

  const handleInputKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => (prev + 1) % filteredItems.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => (prev - 1 + filteredItems.length) % filteredItems.length);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredItems[selectedIndex]) {
        handleSelect(filteredItems[selectedIndex]);
      }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div 
          className="fixed inset-0 z-[99999] flex items-start justify-center pt-16 sm:pt-20 px-4 bg-slate-900/60 backdrop-blur-xs cursor-pointer"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.98, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: -10 }}
            transition={{ duration: 0.15 }}
            className="w-full max-w-2xl bg-white border border-[#D8E1EA] rounded-xl shadow-2xl overflow-hidden text-slate-800 cursor-default"
            onClick={e => e.stopPropagation()}
          >
            {/* Search Header */}
            <div className="relative flex items-center px-4 border-b border-[#D8E1EA] bg-slate-50">
              <Search className="w-5 h-5 text-slate-400 shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={e => {
                  setQuery(e.target.value);
                  setSelectedIndex(0);
                }}
                onKeyDown={handleInputKeyDown}
                placeholder={t('searchPagesActions')}
                className="w-full bg-transparent border-0 px-3.5 py-3.5 text-sm text-slate-800 placeholder-slate-400 focus:outline-none"
              />
              {query && (
                <button 
                  onClick={() => setQuery('')} 
                  className="p-1 text-slate-400 hover:text-slate-600 rounded transition-colors mr-1 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              )}

            </div>

            {/* Results list */}
            <div className="max-h-[360px] overflow-y-auto p-2 space-y-1">
              {filteredItems.length === 0 ? (
                <div className="py-10 text-center text-slate-500 text-xs">
                  {t('noRecordsMatching')} "{query}"
                </div>
              ) : (
                filteredItems.map((item, idx) => {
                  const ItemIcon = item.icon || Layers;
                  const isSelected = idx === selectedIndex;
                  return (
                    <div
                      key={item.id}
                      onClick={() => handleSelect(item)}
                      onMouseEnter={() => setSelectedIndex(idx)}
                      className={`flex items-center justify-between px-3.5 py-2.5 rounded-lg cursor-pointer transition-colors ${
                        isSelected 
                          ? 'bg-[#F4F7FA] text-[#123B63] border border-[#D8E1EA]' 
                          : 'text-slate-700 hover:bg-slate-50 border border-transparent'
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className={`p-2 rounded-md ${
                          isSelected ? 'bg-blue-100 text-[#174A78]' : 'bg-slate-100 text-slate-500'
                        }`}>
                          <ItemIcon className="w-4 h-4" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs font-semibold truncate">
                            {item.title}
                          </p>
                          <p className="text-[11px] text-slate-500 truncate">
                            {item.subtitle}
                          </p>
                        </div>
                      </div>

                      {isSelected && (
                        <div className="flex items-center gap-1 text-[11px] text-[#174A78] shrink-0 font-medium">
                          <span>{t('selectActionHint')}</span>
                          <CornerDownLeft className="w-3.5 h-3.5" />
                        </div>
                      )}
                    </div>
                  );
                })
              )}
            </div>

            {/* Footer */}
            <div className="px-4 py-2.5 bg-slate-50 border-t border-[#D8E1EA] flex items-center justify-between text-[11px] text-slate-500">
              <div className="flex items-center gap-4">
                <span>↑↓ {t('navigate')}</span>
                <span>↵ {t('enterToSelect')}</span>
              </div>
              <span className="text-[#174A78] font-medium">{t('portalSearch')}</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
