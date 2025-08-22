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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
          Terms & Conditions
        </h2>
        
        <p className="text-gray-700 text-sm leading-relaxed mb-6">
          By using our skin analysis service, we will temporarily process an image of your face ("Biometric Data") to analyze your skin type and conditions. Your image is processed in real-time and deleted immediately after analysis, ensuring no storage of your data. We never use your data to train AI models, and all transfers are encrypted for security. Your information is never shared with third parties. This processing is necessary to provide you with accurate results.
        </p>

        <div className="mb-6">
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={isChecked}
              onChange={(e) => setIsChecked(e.target.checked)}
              className="mt-1 h-4 w-4 text-[#22747D] border-gray-300 rounded focus:ring-[#22747D]"
            />
            <span className="text-sm text-gray-700">
              I agree to the processing of my image and biometric data in accordance with the{' '}
              <a href="#" className="text-[#22747D] underline hover:no-underline">Privacy Policy</a>
              {' '}and{' '}
              <a href="#" className="text-[#22747D] underline hover:no-underline">Terms of Service</a>.
            </span>
          </label>
        </div>

        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 border border-[#22747D] text-[#22747D] bg-white rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={!isChecked}
            className={`flex-1 px-4 py-2 rounded-lg transition-colors ${
              isChecked
                ? 'bg-[#22747D] text-white hover:bg-[#1a5a61]'
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
