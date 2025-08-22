'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [currentStatus, setCurrentStatus] = useState(0);
  
  const statusMessages = [
    "Detecting signs of pigmentation and uneven tone...",
    "Analyzing skin texture and hydration levels...",
    "Identifying specific skin concerns and conditions...",
    "Generating personalized recommendations...",
    "Preparing your custom skin analysis..."
  ];

  useEffect(() => {
    const duration = 12000; // 12 seconds
    const interval = 100; // Update every 100ms
    const steps = duration / interval;
    const increment = 100 / steps;
    
    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      const newProgress = Math.min(currentStep * increment, 100);
      setProgress(newProgress);
      
      // Update status message based on progress
      const statusIndex = Math.floor((newProgress / 100) * statusMessages.length);
      setCurrentStatus(Math.min(statusIndex, statusMessages.length - 1));
      
      if (newProgress >= 100) {
        clearInterval(timer);
        setTimeout(() => {
          onComplete();
        }, 500); // Small delay before redirecting
      }
    }, interval);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div className="min-h-screen bg-white flex">
      {/* Left Section - Content */}
      <div className="w-1/2 flex flex-col items-center justify-center p-8">
        <div className="text-center max-w-md">
          {/* Logo */}
          <div className="mb-12">
            <h1 className="text-3xl font-bold">
              <span className="text-[#22747D]">Glam</span>
              <span className="text-[#4CAF50]">Guider</span>
              <span className="text-xs align-top">™</span>
            </h1>
          </div>

          {/* Title */}
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Analyzing Your Skin
          </h2>

          {/* Description */}
          <p className="text-gray-600 text-lg mb-8">
            Our AI is evaluating your skin's unique needs.
            <br />
            This will only take a moment.
          </p>

          {/* Icon/Animation */}
          <div className="relative mb-8">
            {/* Horizontal line above */}
            <div className="w-32 h-1 bg-[#4CAF50] mx-auto mb-4"></div>
            
            {/* Main circle with icon */}
            <div className="w-32 h-32 mx-auto rounded-full border-2 border-[#4CAF50] bg-[#E8F5E8] flex items-center justify-center relative">
              <div className="w-20 h-20 bg-[#4CAF50] rounded-lg flex items-center justify-center">
                <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 1H5C3.89 1 3 1.89 3 3V21C3 22.11 3.89 23 5 23H19C20.11 23 21 22.11 21 21V9M19 9H14V4H5V21H19V9Z"/>
                </svg>
              </div>
            </div>
            
            {/* Glow effect */}
            <div className="absolute inset-0 w-32 h-32 mx-auto rounded-full bg-[#4CAF50] opacity-20 blur-xl"></div>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
            <div 
              className="bg-[#4CAF50] h-3 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>

          {/* Status Text */}
          <p className="text-gray-600 text-sm">
            {statusMessages[currentStatus]}
          </p>
        </div>
      </div>

      {/* Right Section - Empty */}
      <div className="w-1/2 bg-white"></div>
    </div>
  );
}
