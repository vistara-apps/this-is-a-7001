import React, { createContext, useContext, useReducer, useEffect } from 'react';

const AppContext = createContext();

const initialState = {
  user: {
    email: '',
    subscriptionStatus: 'free', // 'free' | 'premium'
    createdAt: null,
    usageCount: 0, // Track bio generations for free users
    lastResetDate: new Date().toDateString(), // Reset usage daily
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
    case 'INCREMENT_USAGE':
      return {
        ...state,
        user: {
          ...state.user,
          usageCount: state.user.usageCount + 1,
        },
      };
    case 'RESET_USAGE':
      return {
        ...state,
        user: {
          ...state.user,
          usageCount: 0,
          lastResetDate: new Date().toDateString(),
        },
      };
    case 'SET_USER_EMAIL':
      return {
        ...state,
        user: { ...state.user, email: action.payload },
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
        if (parsed.subscriptionStatus === 'premium') {
          dispatch({ type: 'UPGRADE_USER' });
        }
        if (parsed.email) {
          dispatch({ type: 'SET_USER_EMAIL', payload: parsed.email });
        }
        
        // Check if usage should be reset (daily reset)
        const today = new Date().toDateString();
        if (parsed.lastResetDate !== today) {
          dispatch({ type: 'RESET_USAGE' });
        } else if (parsed.usageCount) {
          dispatch({ type: 'INCREMENT_USAGE' });
          // Decrement by 1 since we just incremented
          dispatch({ type: 'INCREMENT_USAGE' });
          for (let i = 1; i < parsed.usageCount; i++) {
            dispatch({ type: 'INCREMENT_USAGE' });
          }
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
      email: state.user.email,
      usageCount: state.user.usageCount,
      lastResetDate: state.user.lastResetDate,
    };
    localStorage.setItem('biocraftAI', JSON.stringify(dataToSave));
  }, [
    state.bioProfile.userInput, 
    state.user.subscriptionStatus, 
    state.user.email, 
    state.user.usageCount, 
    state.user.lastResetDate
  ]);

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
