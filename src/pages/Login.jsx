import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useOperations } from '../context/OperationsContext';
import { Lock, User, AlertCircle, ArrowRight, CheckCircle2, HelpCircle } from 'lucide-react';

export const Login = () => {
  const navigate = useNavigate();
  const { login, isAuthenticated, t } = useOperations();
  const [operatorId, setOperatorId] = useState('operator01');
  const [password, setPassword] = useState('demo123');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  React.useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    setTimeout(() => {
      const res = login(operatorId, password);
      if (res.success) {
        navigate('/dashboard');
      } else {
        setError(res.error || t('invalidCredentials'));
        setIsLoading(false);
      }
    }, 300);
  };

  const handleFillDemo = () => {
    setOperatorId('operator01');
    setPassword('demo123');
    setError('');
  };

  return (
    <div className="min-h-screen bg-[#F4F7FA] flex flex-col justify-between font-sans">
      {/* Top Government Portal Utility Bar */}
      <div className="bg-[#123B63] text-white px-6 py-2 text-xs flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img src="/sachet-logo.svg" alt="" className="w-5 h-5 rounded-sm object-cover" />
          <span className="font-bold tracking-wide">SACHET | सचेत</span>
          <span className="hidden sm:inline text-blue-200">|</span>
          <span className="hidden sm:inline text-blue-100">{t('appSubtitle')}</span>
        </div>
      </div>

      {/* Center Login Panel */}
      <div className="max-w-md w-full mx-auto my-auto p-4 sm:p-6">
        <div className="bg-white border border-[#D8E1EA] rounded-xl p-8 shadow-sm">
          {/* Header & Emblem */}
          <div className="text-center mb-6">
            <img src="/sachet-logo.svg" alt="SACHET logo" className="w-28 h-28 rounded-2xl object-cover mx-auto mb-3 shadow-xs" />
            
            <h1 className="text-xl font-bold text-[#123B63] tracking-tight">
              SACHET | सचेत
            </h1>
            
            <p className="text-xs text-slate-600 font-medium mt-1">
              {t('appSubtitle')}
            </p>
            
            <p className="text-xs text-[#E58A16] font-semibold mt-1">
              {t('tagline')}
            </p>
          </div>

          {error && (
            <div className="mb-4 p-3 rounded bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                {t('operatorId')}
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  required
                  value={operatorId}
                  onChange={e => setOperatorId(e.target.value)}
                  placeholder={t('enterOperatorId')}
                  className="w-full bg-white border border-[#D8E1EA] rounded pl-9 pr-3 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#174A78] focus:ring-1 focus:ring-[#174A78]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                {t('password')}
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder={t('enterPassword')}
                  className="w-full bg-white border border-[#D8E1EA] rounded pl-9 pr-3 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#174A78] focus:ring-1 focus:ring-[#174A78]"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2.5 px-4 rounded bg-[#174A78] hover:bg-[#205C91] text-white font-medium text-xs tracking-wide transition-colors flex items-center justify-center gap-2 shadow-xs disabled:opacity-50 mt-2"
            >
              <span>{isLoading ? t('authenticating') : t('signIn')}</span>
              {!isLoading && <ArrowRight className="w-4 h-4" />}
            </button>
          </form>

          {/* Demo Login Quick Option */}
          <div className="mt-5 pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={handleFillDemo}
              className="w-full py-2 px-3 rounded bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs border border-[#D8E1EA] flex items-center justify-between transition-colors"
            >
              <span>{t('demoLogin')}: <strong className="text-[#174A78]">operator01</strong> / <strong className="text-[#174A78]">demo123</strong></span>
              <span className="text-[10px] text-slate-500 font-medium">{t('useCredentials')}</span>
            </button>
          </div>

          <div className="mt-4 text-center">
            <a 
              href="#help" 
              onClick={(e) => { e.preventDefault(); handleFillDemo(); }} 
              className="text-xs text-[#174A78] hover:underline flex items-center justify-center gap-1"
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>{t('helpSigningIn')}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Portal Bottom Footer */}
      <div className="py-4 text-center text-xs text-slate-500 bg-white border-t border-[#D8E1EA]">
        <p>{t('pronunciation')}</p>
      </div>
    </div>
  );
};
