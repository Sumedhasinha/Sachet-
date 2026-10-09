import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useOperations } from '../../context/OperationsContext';
import { StatusBadge } from '../common/StatusBadge';
import { 
  X, 
  Truck, 
  MapPin, 
  Check, 
  Send 
} from 'lucide-react';

export const DispatchModal = ({ incident, isOpen, onClose }) => {
  const { units, dispatchUnit, t, translateData } = useOperations();
  const [filterType, setFilterType] = useState('ALL');
  const [selectedUnitId, setSelectedUnitId] = useState(null);

  if (!isOpen || !incident) return null;

  const filteredUnits = units.filter(u => {
    if (filterType === 'ALL') return true;
    return u.type.toLowerCase() === filterType.toLowerCase();
  });

  const handleDispatch = () => {
    if (!selectedUnitId) return;
    dispatchUnit(incident.id, selectedUnitId);
    setSelectedUnitId(null);
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          className="w-full max-w-2xl bg-white border border-[#D8E1EA] rounded-xl shadow-2xl overflow-hidden text-slate-800"
          onClick={e => e.stopPropagation()}
        >
          {/* Header */}
          <div className="p-4 border-b border-[#D8E1EA] bg-[#123B63] text-white flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded bg-white/10 text-white">
                <Send className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-semibold tracking-wide uppercase">
                  {t('dispatchEmergencyUnit')}
                </h3>
                <p className="text-xs text-blue-100">
                  {t('target')}: <span className="font-mono font-bold text-white">{incident.id}</span> ({translateData(incident.type)} — {translateData(incident.district)})
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-1 rounded text-white/80 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Type filters */}
          <div className="px-4 py-2.5 bg-slate-50 border-b border-[#D8E1EA] flex items-center gap-2">
            {[
              { id: 'ALL', label: t('allUnits') },
              { id: 'POLICE', label: t('policePcr') },
              { id: 'AMBULANCE', label: t('ambulance108') },
              { id: 'FIRE', label: t('fireRescue') }
            ].map(type => (
              <button
                key={type.id}
                onClick={() => setFilterType(type.id)}
                className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
                  filterType === type.id 
                    ? 'bg-[#174A78] text-white' 
                    : 'bg-white border border-[#D8E1EA] text-slate-700 hover:bg-slate-100'
                }`}
              >
                {type.label}
              </button>
            ))}
          </div>

          {/* Unit list */}
          <div className="max-h-80 overflow-y-auto p-3 space-y-2">
            {filteredUnits.length === 0 ? (
              <p className="text-center py-8 text-xs text-slate-500">
                {t('noUnitsInCategory')}
              </p>
            ) : (
              filteredUnits.map(unit => {
                const isAssignedToThis = incident.assignedUnits.includes(unit.id);
                const isSelected = selectedUnitId === unit.id;

                return (
                  <div
                    key={unit.id}
                    onClick={() => {
                      if (!isAssignedToThis && unit.status !== 'maintenance') {
                        setSelectedUnitId(unit.id);
                      }
                    }}
                    className={`p-3 rounded-lg border transition-all cursor-pointer flex items-center justify-between ${
                      isSelected
                        ? 'bg-blue-50 border-[#174A78] ring-1 ring-[#174A78]'
                        : isAssignedToThis
                        ? 'bg-slate-50 border-slate-200 opacity-60 cursor-not-allowed'
                        : unit.status === 'maintenance'
                        ? 'bg-slate-50 border-slate-200 opacity-40 cursor-not-allowed'
                        : 'bg-white border-[#D8E1EA] hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded bg-slate-100 text-[#174A78] border border-slate-200">
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
                          <StatusBadge status={unit.status} size="sm" />
                        </div>
                        <div className="flex items-center gap-3 text-xs text-slate-500 mt-1">
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3 h-3 text-slate-400" />
                            {translateData(unit.location)}
                          </span>
                          <span>{t('crew')}: {translateData(unit.crew)}</span>
                          <span>{t('battery')}: {unit.battery}%</span>
                        </div>
                      </div>
                    </div>

                    <div className="text-right">
                      {isAssignedToThis ? (
                        <span className="text-xs text-[#218653] font-medium">
                          {t('alreadyAssigned')}
                        </span>
                      ) : (
                        <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                          isSelected ? 'bg-[#174A78] border-[#174A78] text-white' : 'border-slate-300 bg-white'
                        }`}>
                          {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer Actions */}
          <div className="p-4 bg-slate-50 border-t border-[#D8E1EA] flex items-center justify-between">
            <span className="text-xs text-slate-600">
              {selectedUnitId ? `${t('selectedUnit')}: ${selectedUnitId}` : t('selectAvailableUnit')}
            </span>

            <div className="flex items-center gap-2">
              <button
                onClick={onClose}
                className="px-3.5 py-1.5 rounded text-xs font-medium text-slate-600 hover:bg-slate-200 transition-colors"
              >
                {t('cancel')}
              </button>
              <button
                disabled={!selectedUnitId}
                onClick={handleDispatch}
                className="px-4 py-1.5 rounded bg-[#174A78] hover:bg-[#205C91] disabled:opacity-50 text-white text-xs font-medium transition-colors"
              >
                {t('confirmDispatch')}
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
