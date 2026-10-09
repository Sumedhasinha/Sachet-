import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useOperations } from '../../context/OperationsContext';
import { AlertTriangle, CheckCircle, Info, X } from 'lucide-react';

export const ToastContainer = () => {
  const { toasts, removeToast } = useOperations();

  const getIcon = (type) => {
    switch (type) {
      case 'warning':
      case 'critical':
        return <AlertTriangle className="w-4 h-4 text-[#C62828] shrink-0" />;
      case 'success':
        return <CheckCircle className="w-4 h-4 text-[#218653] shrink-0" />;
      default:
        return <Info className="w-4 h-4 text-[#174A78] shrink-0" />;
    }
  };

  const getBorderColor = (type) => {
    switch (type) {
      case 'warning':
      case 'critical':
        return 'border-l-4 border-l-[#C62828] bg-white border border-[#D8E1EA]';
      case 'success':
        return 'border-l-4 border-l-[#218653] bg-white border border-[#D8E1EA]';
      default:
        return 'border-l-4 border-l-[#174A78] bg-white border border-[#D8E1EA]';
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-[9999] flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      <AnimatePresence>
        {toasts.map(toast => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.15 }}
            className={`pointer-events-auto rounded-lg p-3.5 shadow-lg flex items-start justify-between gap-3 ${getBorderColor(toast.type)}`}
          >
            <div className="flex items-start gap-2.5">
              <div className="mt-0.5">{getIcon(toast.type)}</div>
              <div>
                <h4 className="text-xs font-semibold text-slate-800 tracking-tight">
                  {toast.title}
                </h4>
                <p className="text-xs text-slate-600 mt-0.5 leading-snug">
                  {toast.message}
                </p>
              </div>
            </div>

            <button
              onClick={() => removeToast(toast.id)}
              className="text-slate-400 hover:text-slate-700 p-0.5 rounded transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
