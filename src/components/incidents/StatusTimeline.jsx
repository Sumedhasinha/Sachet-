import React from 'react';
import { Check, Clock, ChevronRight, Activity } from 'lucide-react';
import { motion } from 'framer-motion';
import { useOperations } from '../../context/OperationsContext';

export const StatusTimeline = ({ currentStatus = 'dispatched', onAdvanceStatus }) => {
  const { t } = useOperations();
  const steps = [
    { key: 'reported', label: t('statusReported'), desc: t('callLoggedControlCentre') },
    { key: 'verified', label: t('statusVerified'), desc: t('locationCctvConfirmed') },
    { key: 'dispatched', label: t('statusDispatched'), desc: t('emergencyUnitsMobilized') },
    { key: 'responding', label: t('statusResponding'), desc: t('vehiclesEnRoute') },
    { key: 'on_scene', label: t('statusOnScene'), desc: t('firstRespondersLocation') },
    { key: 'resolved', label: t('statusResolved'), desc: t('incidentCleared') },
  ];

  const currentIdx = steps.findIndex(s => s.key === currentStatus);
  const activeIndex = currentIdx === -1 ? 2 : currentIdx;

  return (
    <div className="bg-white border border-[#D8E1EA] rounded-lg p-5 shadow-xs relative overflow-hidden">
      {/* Subtle animated flow stream at top of card */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 via-amber-500 to-emerald-500 animate-stream-flow opacity-80" />

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4 pb-3 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-xs font-semibold text-slate-800 uppercase tracking-wider">
              {t('incidentResponseProgression')}
            </h3>
            <span className="flex items-center gap-1 text-[11px] font-medium text-[#174A78] bg-blue-50 border border-blue-200 px-2 py-0.5 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-[#174A78] animate-ping" />
              {t('liveStageFlow')}
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            {t('standardOperatingProcedure')}
          </p>
        </div>

        {onAdvanceStatus && activeIndex < steps.length - 1 && (
          <button
            onClick={() => onAdvanceStatus(steps[activeIndex + 1].key)}
            className="px-3 py-1.5 bg-[#174A78] hover:bg-[#205C91] text-white rounded text-xs font-medium transition-colors flex items-center gap-1.5 shadow-xs self-start sm:self-auto cursor-pointer"
          >
            <span>{t('advanceTo')}: {steps[activeIndex + 1].label}</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Horizontal Stepper with Animated Connecting Flow Lines (Desktop) */}
      <div className="hidden md:grid grid-cols-6 gap-2 relative">
        {steps.map((step, idx) => {
          const isCompleted = idx < activeIndex;
          const isCurrent = idx === activeIndex;
          const isUpcoming = idx > activeIndex;

          return (
            <div key={step.key} className="flex flex-col items-center text-center relative">
              {/* Connector Flow Line */}
              {idx < steps.length - 1 && (
                <div className="absolute top-3.5 left-1/2 w-full h-[3px] -z-0 overflow-hidden">
                  {idx < activeIndex ? (
                    // Completed line: solid green with subtle shimmer
                    <div className="w-full h-full bg-[#218653]" />
                  ) : idx === activeIndex ? (
                    // Active line: animated flowing dashed stream!
                    <div className="w-full h-full relative">
                      <svg className="w-full h-full" preserveAspectRatio="none">
                        <line 
                          x1="0" y1="1.5" x2="100%" y2="1.5" 
                          stroke="#174A78" 
                          strokeWidth="3" 
                          className="animate-flow-dash" 
                        />
                      </svg>
                    </div>
                  ) : (
                    // Upcoming line: solid light gray
                    <div className="w-full h-full bg-slate-200" />
                  )}
                </div>
              )}

              {/* Step Circle with Pulse on Active */}
              <div className="relative">
                {isCurrent && (
                  <div className="absolute -inset-1 rounded-full bg-blue-400/40 animate-ping" />
                )}
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-medium relative z-10 transition-all border-2 ${
                    isCompleted
                      ? 'bg-[#218653] border-[#218653] text-white shadow-xs'
                      : isCurrent
                      ? 'bg-[#174A78] border-[#123B63] text-white shadow-md ring-2 ring-blue-200'
                      : 'bg-white border-slate-300 text-slate-400'
                  }`}
                >
                  {isCompleted ? (
                    <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                  ) : isCurrent ? (
                    <Clock className="w-3.5 h-3.5" />
                  ) : (
                    <span>{idx + 1}</span>
                  )}
                </div>
              </div>

              {/* Step Label */}
              <div className="mt-2">
                <span
                  className={`text-xs block font-medium ${
                    isCurrent
                      ? 'text-[#123B63] font-bold'
                      : isCompleted
                      ? 'text-[#218653]'
                      : 'text-slate-400'
                  }`}
                >
                  {step.label}
                </span>
                <span className="text-[11px] text-slate-500 hidden xl:block mt-0.5 line-clamp-1">
                  {step.desc}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Vertical Stepper with Flow (Mobile) */}
      <div className="md:hidden space-y-3">
        {steps.map((step, idx) => {
          const isCompleted = idx < activeIndex;
          const isCurrent = idx === activeIndex;

          return (
            <div key={step.key} className="flex items-start gap-3 relative">
              {isCurrent && (
                <div className="absolute -left-1 top-1 w-8 h-8 rounded-full bg-blue-200/50 animate-ping -z-0" />
              )}
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium shrink-0 border-2 relative z-10 ${
                  isCompleted
                    ? 'bg-[#218653] border-[#218653] text-white'
                    : isCurrent
                    ? 'bg-[#174A78] border-[#123B63] text-white ring-2 ring-blue-100'
                    : 'bg-white border-slate-300 text-slate-400'
                }`}
              >
                {isCompleted ? <Check className="w-3 h-3" /> : idx + 1}
              </div>
              <div>
                <p className={`text-xs font-semibold ${isCurrent ? 'text-[#123B63]' : isCompleted ? 'text-[#218653]' : 'text-slate-500'}`}>
                  {step.label}
                </p>
                <p className="text-[11px] text-slate-500">{step.desc}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
