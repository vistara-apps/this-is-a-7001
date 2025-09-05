import React from 'react';
import { useApp } from './contexts/AppContext';
import AppShell from './components/AppShell';
import BioInputForm from './components/BioInputForm';
import BioResults from './components/BioResults';
import UpgradeModal from './components/UpgradeModal';
import { generateBioDrafts } from './services/openai';

export default function App() {
  const { state, dispatch } = useApp();

  const handleGenerateBio = async (userInput) => {
    dispatch({ type: 'SET_GENERATING', payload: true });
    dispatch({ type: 'SET_ERROR', payload: null });

    try {
      const bioDrafts = await generateBioDrafts(userInput);
      dispatch({ type: 'SET_BIO_DRAFTS', payload: bioDrafts });
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