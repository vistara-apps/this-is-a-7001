import React from 'react';
import { useApp } from './contexts/AppContext';
import AppShell from './components/AppShell';
import BioInputForm from './components/BioInputForm';
import BioResults from './components/BioResults';
import UpgradeModal from './components/UpgradeModal';
import { generateBioDrafts } from './services/openai';

const FREE_TIER_LIMIT = 3; // Free users can generate 3 bios per day

export default function App() {
  const { state, dispatch } = useApp();

  const handleGenerateBio = async (userInput) => {
    // Check usage limits for free users
    if (state.user.subscriptionStatus === 'free' && state.user.usageCount >= FREE_TIER_LIMIT) {
      dispatch({ 
        type: 'SET_ERROR', 
        payload: `Free tier limit reached (${FREE_TIER_LIMIT} bio generations per day). Upgrade to Premium for unlimited access.` 
      });
      dispatch({ type: 'TOGGLE_UPGRADE_MODAL' });
      return;
    }

    dispatch({ type: 'SET_GENERATING', payload: true });
    dispatch({ type: 'SET_ERROR', payload: null });

    try {
      const bioDrafts = await generateBioDrafts(userInput);
      dispatch({ type: 'SET_BIO_DRAFTS', payload: bioDrafts });
      
      // Increment usage count for free users
      if (state.user.subscriptionStatus === 'free') {
        dispatch({ type: 'INCREMENT_USAGE' });
      }
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
    }
  };

  return (
    <AppShell>
      {state.ui.currentStep === 'input' ? (
        <BioInputForm onGenerate={handleGenerateBio} />
      ) : (
        <BioResults />
      )}
      <UpgradeModal />
    </AppShell>
  );
}
