import React, { useState } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useOperations } from '../../context/OperationsContext';
import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';
import { CommandPalette } from '../common/CommandPalette';
import { ToastContainer } from '../common/ToastContainer';

export const DashboardLayout = () => {
  const { isAuthenticated, fontSize, t } = useOperations();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const toggleCommandPalette = () => {
    setIsCommandPaletteOpen(prev => !prev);
  };

  const fontScaleClass = fontSize === 'large' ? 'text-[15px]' : fontSize === 'xlarge' ? 'text-[16px]' : 'text-sm';

  return (
    <div className={`min-h-screen bg-[#F4F7FA] text-[#1E293B] flex flex-col font-sans ${fontScaleClass}`}>
      {/* Sidebar Navigation */}
      <Sidebar isMobileOpen={isMobileOpen} setIsMobileOpen={setIsMobileOpen} />

      {/* Main Content Area */}
      <div className="lg:pl-64 flex flex-col flex-1 min-h-screen">
        <Topbar 
          onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
          onToggleCommandPalette={toggleCommandPalette}
          isCommandPaletteOpen={isCommandPaletteOpen}
          onToggleMobileSidebar={() => setIsMobileOpen(!isMobileOpen)}
        />

        <main className="flex-1 p-4 lg:p-6 overflow-x-hidden">
          <Outlet />
        </main>

        {/* Official-Style Government Portal Footer */}
        <footer className="bg-white border-t border-[#D8E1EA] px-6 py-4 text-xs text-slate-500 mt-auto">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex flex-col sm:flex-row items-center gap-2 text-center sm:text-left">
              <span className="font-semibold text-slate-800">
                {t('appSubtitle')}
              </span>
              <span className="hidden sm:inline text-slate-300">•</span>
              <span className="text-[#E58A16] font-medium">
                सतर्कता • सुरक्षा • सेवा
              </span>
            </div>

          </div>
        </footer>
      </div>

      {/* Command Palette Modal */}
      <CommandPalette 
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
      />

      {/* Live Tactical Toast Notifications */}
      <ToastContainer />
    </div>
  );
};
