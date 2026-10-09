import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useOperations } from '../../context/OperationsContext';
import { 
  Search, 
  Bell, 
  Menu, 
  ShieldAlert, 
  HelpCircle, 
  User, 
  Globe 
} from 'lucide-react';

export const Topbar = ({ onOpenCommandPalette, onToggleCommandPalette, onToggleMobileSidebar }) => {
  const navigate = useNavigate();
  const { 
    currentUser, 
    alerts, 
    language, 
    toggleLanguage, 
    fontSize, 
    setFontSize, 
    t,
    translateData
  } = useOperations();
  const [showAlertsDropdown, setShowAlertsDropdown] = useState(false);

  const unreadAlerts = alerts.filter(a => !a.read);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (onToggleCommandPalette) {
          onToggleCommandPalette();
        } else if (onOpenCommandPalette) {
          onOpenCommandPalette();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onToggleCommandPalette, onOpenCommandPalette]);

  return (
    <div className="flex flex-col sticky top-0 z-30 shadow-xs">
      {/* 1. Official Utility Strip across the top (Government Navy Blue) */}
      <div className="bg-[#123B63] text-white px-4 lg:px-6 py-1.5 text-xs flex items-center justify-between border-b border-[#0E2E4E]">
        <div className="flex items-center gap-2 sm:gap-3">
          <img src="/sachet-logo.svg" alt="" className="w-5 h-5 rounded-sm object-cover" />
          <span className="font-bold tracking-wide">
            SACHET | सचेत
          </span>
          <span className="hidden md:inline text-blue-200">|</span>
          <span className="hidden md:inline text-blue-100 text-[11px]">
            {t('appSubtitle')}
          </span>
          <span className="hidden lg:inline text-amber-300 text-[11px] font-medium ml-2">
            • {t('tagline')}
          </span>
        </div>

        <div className="flex items-center gap-3 sm:gap-4 text-[11px]">
          {/* Accessibility Font Size Option */}
          <div className="hidden sm:flex items-center gap-1 border-r border-blue-400/40 pr-3">
            <span className="text-blue-200 mr-1">{t('accessibility')}:</span>
            <button
              onClick={() => setFontSize('normal')}
              className={`px-1 rounded ${fontSize === 'normal' ? 'bg-white/20 font-bold' : 'hover:bg-white/10'}`}
              title={t('fontStandard')}
            >
              A
            </button>
            <button
              onClick={() => setFontSize('large')}
              className={`px-1 rounded ${fontSize === 'large' ? 'bg-white/20 font-bold' : 'hover:bg-white/10'}`}
              title={t('fontLarger')}
            >
              A+
            </button>
          </div>

          {/* Language Selector: English / हिन्दी */}
          <div className="flex items-center gap-1.5 border-r border-blue-400/40 pr-3">
            <Globe className="w-3.5 h-3.5 text-blue-200" />
            <button
              onClick={() => toggleLanguage('en')}
              className={`px-1.5 py-0.5 rounded transition-colors ${
                language === 'en' ? 'bg-white text-[#123B63] font-bold' : 'text-blue-100 hover:text-white'
              }`}
            >
              English
            </button>
            <span className="text-blue-300">/</span>
            <button
              onClick={() => toggleLanguage('hi')}
              className={`px-1.5 py-0.5 rounded transition-colors ${
                language === 'hi' ? 'bg-white text-[#123B63] font-bold' : 'text-blue-100 hover:text-white'
              }`}
            >
              हिन्दी
            </button>
          </div>

          {/* Help link */}
          <button
            onClick={() => navigate('/settings')}
            className="flex items-center gap-1 text-blue-100 hover:text-white transition-colors"
          >
            <HelpCircle className="w-3 h-3" />
            <span className="hidden sm:inline">{t('help')}</span>
          </button>
        </div>
      </div>

      {/* 2. Main Header (Clean White) */}
      <header className="h-16 bg-white border-b border-[#D8E1EA] px-4 lg:px-6 flex items-center justify-between">
        {/* LEFT: Logo & Mobile Hamburger */}
        <div className="flex items-center gap-3 lg:gap-4 shrink-0">
          <button
            onClick={onToggleMobileSidebar}
            className="lg:hidden p-2 rounded bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-300"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* SACHET Wordmark in Header (Mobile/Compact) */}
          <div className="flex items-center gap-2.5">
            <img src="/sachet-logo.svg" alt="SACHET logo" className="w-9 h-9 rounded-md object-cover shadow-xs" />
            <div>
              <div className="flex items-baseline gap-1.5">
                <span className="font-bold text-base text-[#123B63] tracking-tight">
                  SACHET
                </span>
                <span className="text-xs text-[#E58A16] font-semibold">
                  सचेत
                </span>
              </div>
              <p className="text-[10px] text-slate-500 hidden sm:block">
                {t('appSubtitle')}
              </p>
            </div>
          </div>
        </div>

        {/* CENTER: Search Bar / Command Palette Trigger (Clean, single-line) */}
        <div className="flex-1 max-w-md mx-4 hidden md:block">
          <button
            type="button"
            onClick={onToggleCommandPalette || onOpenCommandPalette}
            className="w-full flex items-center justify-between px-3.5 py-1.5 h-9 rounded bg-slate-50 border border-[#D8E1EA] hover:border-slate-400 text-slate-500 hover:text-slate-700 text-xs transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-2 min-w-0 overflow-hidden">
              <Search className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span className="truncate text-slate-500">{t('searchPlaceholder')}</span>
            </div>
          </button>
        </div>

        {/* RIGHT: Alerts Bell, Operator Profile */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Notifications / Alerts Bell */}
          <div className="relative">
            <button
              onClick={() => setShowAlertsDropdown(!showAlertsDropdown)}
              className="relative p-2 rounded border border-[#D8E1EA] bg-white text-slate-600 hover:text-[#123B63] hover:bg-slate-50 transition-colors"
            >
              <Bell className="w-4 h-4" />
              {unreadAlerts.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#C62828] text-white text-[10px] font-bold flex items-center justify-center">
                  {unreadAlerts.length}
                </span>
              )}
            </button>

            {/* Dropdown */}
            {showAlertsDropdown && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white border border-[#D8E1EA] rounded-lg shadow-xl p-3 z-50">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <ShieldAlert className="w-4 h-4 text-[#C62828]" />
                    <span className="text-xs font-semibold text-slate-800">
                      {t('emergencyBroadcasts')} ({alerts.length})
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      setShowAlertsDropdown(false);
                      navigate('/alerts');
                    }}
                    className="text-xs text-[#174A78] hover:underline font-medium"
                  >
                    {t('viewAll')}
                  </button>
                </div>

                <div className="py-2 space-y-2 max-h-72 overflow-y-auto">
                  {alerts.slice(0, 4).map(alert => (
                    <div 
                      key={alert.id}
                      onClick={() => {
                        setShowAlertsDropdown(false);
                        navigate('/alerts');
                      }}
                      className="p-2.5 rounded bg-slate-50 hover:bg-slate-100 border border-slate-200 cursor-pointer transition-colors"
                    >
                      <div className="flex items-center justify-between text-[11px]">
                        <span className={alert.priority === 'critical' ? 'text-[#C62828] font-bold' : 'text-[#E58A16] font-bold'}>
                          {translateData(alert.priority === 'info' ? 'Information' : alert.priority)}
                        </span>
                        <span className="text-slate-500">{alert.timestamp}</span>
                      </div>
                      <p className="text-xs font-medium text-slate-800 mt-1 line-clamp-1">
                        {translateData(alert.title)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Operator Profile Badge */}
          <div className="flex items-center gap-2 pl-2 border-l border-[#D8E1EA]">
            <div className="w-7 h-7 rounded bg-[#123B63] text-white flex items-center justify-center text-xs font-semibold shrink-0">
              <User className="w-4 h-4" />
            </div>
            <div className="hidden lg:block text-left">
              <p className="text-xs font-semibold text-slate-800 leading-tight">
                {currentUser.name}
              </p>
              <p className="text-[10px] text-slate-500">
                {translateData(currentUser.role)}
              </p>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};
