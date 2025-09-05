import React, { createContext, useContext, useReducer, useEffect } from 'react';

const AppContext = createContext();

const initialState = {
  user: {
    email: '',
    subscriptionStatus: 'free', // 'free' | 'premium'
    createdAt: null,
  },
  bioProfile: {
    userInput: {
      jobTitle: '',
      industry: '',
      experience: '',
      skills: '',
      goals: '',
      tone: 'professional',
    },
    generatedBioDrafts: [],
    selectedBio: '',
    keywords: [],
    isGenerating: false,
    error: null,
  },
  ui: {
    showUpgradeModal: false,
    currentStep: 'input', // 'input' | 'results'
  },
};

function appReducer(state, action) {
  switch (action.type) {
    case 'UPDATE_USER_INPUT':
      return {
        ...state,
        bioProfile: {
          ...state.bioProfile,
          userInput: { ...state.bioProfile.userInput, ...action.payload },
        },
      };
    case 'SET_GENERATING':
      return {
        ...state,
        bioProfile: { ...state.bioProfile, isGenerating: action.payload },
      };
    case 'SET_BIO_DRAFTS':
      return {
        ...state,
        bioProfile: {
          ...state.bioProfile,
          generatedBioDrafts: action.payload,
          isGenerating: false,
          error: null,
        },
        ui: { ...state.ui, currentStep: 'results' },
      };
    case 'SET_ERROR':
      return {
        ...state,
        bioProfile: {
          ...state.bioProfile,
          error: action.payload,
          isGenerating: false,
        },
      };
    case 'SELECT_BIO':
      return {
        ...state,
        bioProfile: { ...state.bioProfile, selectedBio: action.payload },
      };
    case 'SET_KEYWORDS':
      return {
        ...state,
        bioProfile: { ...state.bioProfile, keywords: action.payload },
      };
    case 'SET_STEP':
      return {
        ...state,
        ui: { ...state.ui, currentStep: action.payload },
      };
    case 'TOGGLE_UPGRADE_MODAL':
      return {
        ...state,
        ui: { ...state.ui, showUpgradeModal: !state.ui.showUpgradeModal },
      };
    case 'UPGRADE_USER':
      return {
        ...state,
        user: { ...state.user, subscriptionStatus: 'premium' },
        ui: { ...state.ui, showUpgradeModal: false },
      };
    case 'RESET_BIO_PROFILE':
      return {
        ...state,
        bioProfile: {
          ...initialState.bioProfile,
          userInput: { ...initialState.bioProfile.userInput },
        },
        ui: { ...state.ui, currentStep: 'input' },
      };
    default:
      return state;
  }
}

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Load saved data from localStorage
  useEffect(() => {
    const savedData = localStorage.getItem('biocraftAI');
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        dispatch({ type: 'UPDATE_USER_INPUT', payload: parsed.userInput || {} });
        if (parsed.subscriptionStatus) {
          dispatch({ type: 'UPGRADE_USER' });
        }
      } catch (error) {
        console.error('Error loading saved data:', error);
      }
    }
  }, []);

  // Save to localStorage when state changes
  useEffect(() => {
    const dataToSave = {
      userInput: state.bioProfile.userInput,
      subscriptionStatus: state.user.subscriptionStatus,
    };
    localStorage.setItem('biocraftAI', JSON.stringify(dataToSave));
  }, [state.bioProfile.userInput, state.user.subscriptionStatus]);

  const value = {
    state,
    dispatch,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}