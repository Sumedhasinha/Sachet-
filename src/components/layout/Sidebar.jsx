import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useOperations } from '../../context/OperationsContext';
import { 
  LayoutDashboard, 
  ShieldAlert, 
  Map, 
  Truck, 
  BarChart3, 
  Bell, 
  Settings, 
  LogOut, 
} from 'lucide-react';

export const Sidebar = ({ isMobileOpen, setIsMobileOpen }) => {
  const { currentUser, logout, metrics, t } = useOperations();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = [
    { key: 'dashboard', label: t('dashboard'), path: '/dashboard', icon: LayoutDashboard },
    { key: 'incidents', label: t('incidents'), path: '/incidents', icon: ShieldAlert, badge: metrics.activeIncidents, badgeColor: 'bg-red-50 text-red-700 border-red-200' },
    { key: 'operationsMap', label: t('operationsMap'), path: '/map', icon: Map },
    { key: 'resources', label: t('resources'), path: '/resources', icon: Truck },
    { key: 'analytics', label: t('analytics'), path: '/analytics', icon: BarChart3 },
    { key: 'alerts', label: t('alerts'), path: '/alerts', icon: Bell, badge: metrics.unreadAlerts, badgeColor: 'bg-amber-50 text-amber-800 border-amber-200' },
    { key: 'settings', label: t('settings'), path: '/settings', icon: Settings },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div 
          onClick={() => setIsMobileOpen(false)} 
          className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-xs lg:hidden"
        />
      )}

      <aside className={`
        fixed top-0 bottom-0 left-0 z-50 w-64 bg-white border-r border-[#D8E1EA] flex flex-col justify-between
        transition-transform duration-200 ease-in-out
        ${isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div>
          {/* Sidebar Top Branding */}
          <div className="h-16 px-5 border-b border-[#D8E1EA] flex items-center justify-between bg-slate-50">
            <div className="flex items-center gap-3">
              <img src="/sachet-logo.svg" alt="SACHET logo" className="w-10 h-10 rounded-md object-cover shadow-xs" />
              <div>
                <div className="flex items-baseline gap-1.5">
                  <span className="font-bold text-base text-[#123B63] tracking-tight">
                    SACHET
                  </span>
                  <span className="text-xs text-[#E58A16] font-semibold">
                    सचेत
                  </span>
                </div>
                <p className="text-[10px] text-slate-500 font-medium">
                  सतर्कता • सुरक्षा • सेवा
                </p>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="p-3 space-y-1 mt-2">
            <div className="px-3 py-1.5 text-[11px] font-semibold tracking-wider uppercase text-slate-400">
              {t('operationsNavigation')}
            </div>
            {navItems.map(item => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMobileOpen?.(false)}
                  className={({ isActive }) => `
                    flex items-center justify-between px-3 py-2.5 rounded text-xs transition-colors font-medium
                    ${isActive 
                      ? 'bg-[#123B63] text-white shadow-xs font-semibold' 
                      : 'text-slate-700 hover:text-[#123B63] hover:bg-slate-100'}
                  `}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4 shrink-0" />
                    <span>{item.label}</span>
                  </div>

                  {item.badge !== undefined && item.badge > 0 && (
                    <span className={`text-[11px] font-semibold px-2 py-0.5 rounded border ${
                      item.badgeColor
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Bottom Operator & System Status Section */}
        <div className="p-3 border-t border-[#D8E1EA] bg-slate-50 space-y-3">
          {/* Operator Profile */}
          <div className="p-2.5 rounded bg-white border border-[#D8E1EA] flex items-center justify-between">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-7 h-7 rounded bg-slate-100 border border-slate-300 flex items-center justify-center text-[#123B63] font-bold text-xs shrink-0">
                RS
              </div>
              <div className="min-w-0">
                <p className="text-xs font-semibold text-slate-800 truncate">
                  {currentUser.name}
                </p>
                <p className="text-[10px] text-slate-500 truncate">
                  {currentUser.badge}
                </p>
              </div>
            </div>

            <button
              onClick={handleLogout}
              title={t('signOut')}
              className="p-1.5 rounded text-slate-400 hover:text-red-700 hover:bg-red-50 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};
