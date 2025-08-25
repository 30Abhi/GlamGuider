'use client';

import { useState } from 'react';

interface TermsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAccept: () => void;
}

export default function TermsModal({ isOpen, onClose, onAccept }: TermsModalProps) {
  const [isChecked, setIsChecked] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = () => {
    if (isChecked) {
      onAccept();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/10 backdrop-blur-sm flex items-center justify-center z-50 p-3 sm:p-4">
      <div className="bg-white rounded-lg max-w-md w-full p-4 sm:p-6 mx-4">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-3 sm:mb-4 text-center">
          Terms & Conditions
        </h2>
        
        <p className="text-gray-700 text-xs sm:text-sm leading-relaxed mb-4 sm:mb-6">
          By using our skin analysis service, we will temporarily process an image of your face ("Biometric Data") to analyze your skin type and conditions. Your image is processed in real-time and deleted immediately after analysis, ensuring no storage of your data. We never use your data to train AI models, and all transfers are encrypted for security. Your information is never shared with third parties. This processing is necessary to provide you with accurate results.
        </p>

        <div className="mb-4 sm:mb-6">
          <label className="flex items-start gap-2 sm:gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={isChecked}
              onChange={(e) => setIsChecked(e.target.checked)}
              className="mt-1 h-4 w-4 text-[#007237] border-gray-300 rounded focus:ring-[#007237]"
            />
            <span className="text-xs sm:text-sm text-gray-700">
              I agree to the processing of my image and biometric data in accordance with the{' '}
              <a href="#" className="text-[#007237] underline hover:no-underline">Privacy Policy</a>
              {' '}and{' '}
              <a href="#" className="text-[#007237] underline hover:no-underline">Terms of Service</a>.
            </span>
          </label>
        </div>

        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 border border-[#007237] text-[#007237] bg-white rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={!isChecked}
            className={`flex-1 px-4 py-2 rounded-lg transition-colors ${
              isChecked
                ? 'bg-[#007237] text-white hover:bg-[#00662f]'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
