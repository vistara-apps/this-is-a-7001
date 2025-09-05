import React from 'react';
import { useApp } from '../contexts/AppContext';
import { Sparkles, Briefcase, Target, Lightbulb } from 'lucide-react';
import SelectDropdown from './SelectDropdown';

const toneOptions = [
  { value: 'professional', label: 'Professional' },
  { value: 'creative', label: 'Creative' },
  { value: 'enthusiastic', label: 'Enthusiastic' },
  { value: 'authoritative', label: 'Authoritative' },
  { value: 'friendly', label: 'Friendly' },
];

export default function BioInputForm({ onGenerate }) {
  const { state, dispatch } = useApp();
  const { userInput } = state.bioProfile;

  const handleInputChange = (field, value) => {
    dispatch({
      type: 'UPDATE_USER_INPUT',
      payload: { [field]: value },
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!userInput.jobTitle || !userInput.industry || !userInput.experience) {
      dispatch({
        type: 'SET_ERROR',
        payload: 'Please fill in at least job title, industry, and experience.',
      });
      return;
    }
    onGenerate(userInput);
  };

  const isValid = userInput.jobTitle && userInput.industry && userInput.experience;

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold gradient-text mb-4">
          Create Your Perfect LinkedIn Bio
        </h2>
        <p className="text-white/80 text-lg">
          Tell us about your professional background and let AI craft compelling bio options for you.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="card p-6 space-y-6">
          <div className="flex items-center gap-3 mb-4">
            <Briefcase className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-semibold text-white">Professional Details</h3>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">
                Job Title *
              </label>
              <input
                type="text"
                className="input-field"
                placeholder="e.g., Senior Software Engineer"
                value={userInput.jobTitle}
                onChange={(e) => handleInputChange('jobTitle', e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">
                Industry *
              </label>
              <input
                type="text"
                className="input-field"
                placeholder="e.g., Technology, Healthcare"
                value={userInput.industry}
                onChange={(e) => handleInputChange('industry', e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-white/80 mb-2">
              Experience Level *
            </label>
            <input
              type="text"
              className="input-field"
              placeholder="e.g., 5+ years, Entry-level, Senior"
              value={userInput.experience}
              onChange={(e) => handleInputChange('experience', e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white/80 mb-2">
              Key Skills
            </label>
            <textarea
              className="textarea-field"
              placeholder="List your main skills, technologies, or expertise areas..."
              value={userInput.skills}
              onChange={(e) => handleInputChange('skills', e.target.value)}
            />
          </div>
        </div>

        <div className="card p-6 space-y-6">
          <div className="flex items-center gap-3 mb-4">
            <Target className="h-5 w-5 text-accent" />
            <h3 className="text-lg font-semibold text-white">Career Goals & Tone</h3>
          </div>

          <div>
            <label className="block text-sm font-medium text-white/80 mb-2">
              Career Goals
            </label>
            <textarea
              className="textarea-field"
              placeholder="What are you looking to achieve? e.g., seeking new opportunities, building my network..."
              value={userInput.goals}
              onChange={(e) => handleInputChange('goals', e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white/80 mb-2">
              Preferred Tone
            </label>
            <SelectDropdown
              options={toneOptions}
              value={userInput.tone}
              onChange={(value) => handleInputChange('tone', value)}
              placeholder="Select tone"
            />
          </div>
        </div>

        {state.bioProfile.error && (
          <div className="card p-4 border-red-500/50 bg-red-500/10">
            <p className="text-red-400 text-sm">{state.bioProfile.error}</p>
          </div>
        )}

        <button
          type="submit"
          disabled={!isValid || state.bioProfile.isGenerating}
          className="w-full btn-primary flex items-center justify-center gap-3 py-4 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {state.bioProfile.isGenerating ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              Generating Your Bio...
            </>
          ) : (
            <>
              <Sparkles className="h-5 w-5" />
              Generate My LinkedIn Bio
            </>
          )}
        </button>
      </form>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <div className="card p-4 text-center">
          <Sparkles className="h-8 w-8 text-primary mx-auto mb-2" />
          <h4 className="font-medium text-white mb-1">AI-Powered</h4>
          <p className="text-sm text-white/60">Advanced AI creates compelling bios</p>
        </div>
        <div className="card p-4 text-center">
          <Lightbulb className="h-8 w-8 text-accent mx-auto mb-2" />
          <h4 className="font-medium text-white mb-1">Multiple Options</h4>
          <p className="text-sm text-white/60">Get 3 different bio variations</p>
        </div>
        <div className="card p-4 text-center">
          <Target className="h-8 w-8 text-primary mx-auto mb-2" />
          <h4 className="font-medium text-white mb-1">Optimized</h4>
          <p className="text-sm text-white/60">Keyword-rich for better visibility</p>
        </div>
      </div>
    </div>
  );
}