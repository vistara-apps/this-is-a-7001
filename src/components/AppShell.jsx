import React from 'react';
import { Sparkles, Crown, ArrowLeft } from 'lucide-react';
import { useApp } from '../contexts/AppContext';

export default function AppShell({ children }) {
  const { state, dispatch } = useApp();

  const handleBack = () => {
    dispatch({ type: 'SET_STEP', payload: 'input' });
  };

  const handleUpgrade = () => {
    dispatch({ type: 'TOGGLE_UPGRADE_MODAL' });
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b border-white/10 backdrop-blur-lg bg-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              {state.ui.currentStep === 'results' && (
                <button
                  onClick={handleBack}
                  className="flex items-center gap-2 text-white/80 hover:text-white transition-colors"
                >
                  <ArrowLeft className="h-4 w-4" />
                  <span className="hidden sm:inline">Back to Form</span>
                </button>
              )}
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gradient-to-r from-primary to-accent rounded-lg">
                  <Sparkles className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-white">BioCraft AI</h1>
                  <p className="text-sm text-white/60 hidden sm:block">Craft Your Perfect LinkedIn Bio</p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              {state.user.subscriptionStatus === 'premium' ? (
                <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-accent to-primary rounded-full text-white text-sm font-medium">
                  <Crown className="h-4 w-4" />
                  <span className="hidden sm:inline">Premium</span>
                </div>
              ) : (
                <button
                  onClick={handleUpgrade}
                  className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-accent to-primary hover:shadow-lg text-white text-sm font-medium rounded-full transition-all duration-250 hover:scale-105"
                >
                  <Crown className="h-4 w-4" />
                  <span className="hidden sm:inline">Upgrade to Premium</span>
                  <span className="sm:hidden">Premium</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-white/60 text-sm">
            <p>&copy; 2024 BioCraft AI. Powered by advanced AI technology.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}