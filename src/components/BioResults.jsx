import React, { useEffect } from 'react';
import { useApp } from '../contexts/AppContext';
import { Copy, Check, Sparkles, Key, Crown, RefreshCw } from 'lucide-react';
import { generateKeywords } from '../services/openai';

export default function BioResults() {
  const { state, dispatch } = useApp();
  const { generatedBioDrafts, selectedBio, keywords } = state.bioProfile;
  const { subscriptionStatus } = state.user;
  const [copiedIndex, setCopiedIndex] = React.useState(null);
  const [isGeneratingKeywords, setIsGeneratingKeywords] = React.useState(false);

  const handleCopy = async (bio, index) => {
    try {
      await navigator.clipboard.writeText(bio);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  const handleSelect = (bio) => {
    dispatch({ type: 'SELECT_BIO', payload: bio });
  };

  const handleGenerateKeywords = async () => {
    if (subscriptionStatus === 'free') {
      dispatch({ type: 'TOGGLE_UPGRADE_MODAL' });
      return;
    }

    if (!selectedBio) return;

    setIsGeneratingKeywords(true);
    try {
      const newKeywords = await generateKeywords(selectedBio, state.bioProfile.userInput.industry);
      dispatch({ type: 'SET_KEYWORDS', payload: newKeywords });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
    } finally {
      setIsGeneratingKeywords(false);
    }
  };

  const handleNewBio = () => {
    dispatch({ type: 'RESET_BIO_PROFILE' });
  };

  // Auto-generate keywords for premium users when bio is selected
  useEffect(() => {
    if (selectedBio && subscriptionStatus === 'premium' && keywords.length === 0 && !isGeneratingKeywords) {
      handleGenerateKeywords();
    }
  }, [selectedBio, subscriptionStatus]);

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold gradient-text mb-4">
          Your AI-Generated LinkedIn Bios
        </h2>
        <p className="text-white/80">
          Choose your favorite bio and copy it to your LinkedIn profile.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-1">
        {generatedBioDrafts.map((bio, index) => (
          <div
            key={index}
            className={`card p-6 transition-all duration-250 hover:scale-[1.02] cursor-pointer ${
              selectedBio === bio ? 'ring-2 ring-primary/50 bg-white/15' : ''
            }`}
            onClick={() => handleSelect(bio)}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-3">
                  <h3 className="text-lg font-semibold text-white">Bio Option {index + 1}</h3>
                  {selectedBio === bio && (
                    <div className="px-2 py-1 bg-primary/20 text-primary text-xs rounded-full">
                      Selected
                    </div>
                  )}
                </div>
                <p className="text-white/90 leading-relaxed text-base">{bio}</p>
                <div className="mt-4 text-sm text-white/60">
                  Character count: {bio.length}
                </div>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleCopy(bio, index);
                }}
                className="btn-secondary p-3 shrink-0"
                title="Copy bio"
              >
                {copiedIndex === index ? (
                  <Check className="h-4 w-4 text-accent" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Keyword Optimization Section */}
      <div className="card p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Key className="h-5 w-5 text-accent" />
            <h3 className="text-lg font-semibold text-white">Keyword Optimization</h3>
            {subscriptionStatus === 'free' && (
              <div className="flex items-center gap-1 px-2 py-1 bg-gradient-to-r from-accent to-primary text-white text-xs rounded-full">
                <Crown className="h-3 w-3" />
                Premium
              </div>
            )}
          </div>
          
          {subscriptionStatus === 'premium' && selectedBio && (
            <button
              onClick={handleGenerateKeywords}
              disabled={isGeneratingKeywords}
              className="btn-secondary flex items-center gap-2 text-sm"
            >
              {isGeneratingKeywords ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Analyzing...
                </>
              ) : (
                <>
                  <RefreshCw className="h-4 w-4" />
                  Regenerate
                </>
              )}
            </button>
          )}
        </div>

        {!selectedBio ? (
          <p className="text-white/60">Select a bio above to see keyword suggestions.</p>
        ) : subscriptionStatus === 'free' ? (
          <div className="text-center py-8">
            <Crown className="h-12 w-12 text-accent mx-auto mb-4" />
            <h4 className="text-xl font-semibold text-white mb-2">Unlock Keyword Optimization</h4>
            <p className="text-white/80 mb-4">
              Get AI-powered keyword suggestions to improve your LinkedIn discoverability.
            </p>
            <button
              onClick={() => dispatch({ type: 'TOGGLE_UPGRADE_MODAL' })}
              className="btn-primary"
            >
              Upgrade to Premium
            </button>
          </div>
        ) : keywords.length > 0 ? (
          <div>
            <p className="text-white/80 mb-4">
              These keywords can help improve your profile's discoverability:
            </p>
            <div className="flex flex-wrap gap-2">
              {keywords.map((keyword, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-primary/20 text-primary rounded-full text-sm"
                >
                  {keyword}
                </span>
              ))}
            </div>
          </div>
        ) : (
          <p className="text-white/60">Keyword analysis will appear here...</p>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button
          onClick={handleNewBio}
          className="btn-secondary flex items-center gap-2 justify-center"
        >
          <Sparkles className="h-4 w-4" />
          Create New Bio
        </button>
        {subscriptionStatus === 'free' && (
          <button
            onClick={() => dispatch({ type: 'TOGGLE_UPGRADE_MODAL' })}
            className="btn-primary flex items-center gap-2 justify-center"
          >
            <Crown className="h-4 w-4" />
            Unlock Premium Features
          </button>
        )}
      </div>
    </div>
  );
}