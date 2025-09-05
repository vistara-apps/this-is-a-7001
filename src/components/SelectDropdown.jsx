import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export default function SelectDropdown({ options, value, onChange, placeholder }) {
  const [isOpen, setIsOpen] = useState(false);

  const selectedOption = options.find(option => option.value === value);

  const handleSelect = (optionValue) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        type="button"
        className="input-field flex items-center justify-between w-full"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className={selectedOption ? 'text-white' : 'text-white/60'}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white/10 backdrop-blur-lg border border-white/20 rounded-md shadow-lg z-10">
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              className="w-full px-4 py-3 text-left text-white hover:bg-white/10 transition-colors first:rounded-t-md last:rounded-b-md"
              onClick={() => handleSelect(option.value)}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}