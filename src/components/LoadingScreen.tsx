'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import SiteHeader from "./SiteHeader";

interface LoadingScreenProps {
  capturedImage: string;
}

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [currentStatus, setCurrentStatus] = useState(0);
  const [scanPosition, setScanPosition] = useState(0);
  const router = useRouter();
  
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
          // Redirect directly to analytics page
          router.push(`/analytics`);
        }, 500); // Small delay before redirecting
      }
    }, interval);

    return () => clearInterval(timer);
  }, []);

  // Scanning animation effect
  useEffect(() => {
    const scanTimer = setInterval(() => {
      setScanPosition(prev => {
        if (prev >= 100) return 0;
        return prev + 1;
      });
    }, 30);

    return () => clearInterval(scanTimer);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <SiteHeader />
      <div className="flex flex-col lg:flex-row gap-8 sm:gap-16">
      {/* Left Section - Content */}
      <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-4 sm:p-8">
        <div className="text-center max-w-md">
          {/* Title */}
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-3 sm:mb-4">
            Analyzing Your Skin
          </h2>

          {/* Description */}
          <p className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-8">
            Our AI is evaluating your skin's unique needs.
            <br className="hidden sm:block" />
            This will only take a moment.
          </p>

          {/* Icon/Animation */}
          <div className="relative mb-6 sm:mb-8">
            {/* Main circle with person icon */}
            <div className="w-24 h-24 sm:w-32 sm:h-32 mx-auto rounded-full border-2 border-[#4CAF50] bg-[#E8F5E8] flex items-center justify-center relative">
              {/* Scanning line that moves up and down over the person icon */}
              <div 
                className="absolute w-full h-1 bg-[#4CAF50] opacity-80 transition-all duration-75 ease-linear"
                style={{ 
                  top: `${scanPosition}%`,
                  transform: 'translateY(-50%)'
                }}
              ></div>
              
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[#4CAF50] rounded-full flex items-center justify-center relative z-10">
                <svg className="w-10 h-10 sm:w-12 sm:h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                </svg>
              </div>
            </div>
            
            {/* Glow effect */}
            <div className="absolute inset-0 w-24 h-24 sm:w-32 sm:h-32 mx-auto rounded-full bg-[#4CAF50] opacity-20 blur-xl"></div>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-2 sm:h-3 mb-3 sm:mb-4">
            <div 
              className="bg-[#4CAF50] h-2 sm:h-3 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>

          {/* Status Text */}
          <p className="text-gray-600 text-xs sm:text-sm">
            {statusMessages[currentStatus]}
          </p>
        </div>
      </div>

      {/* Right Section - Image Placeholder */}
      <div className="w-full lg:w-1/2 bg-white flex items-center justify-center p-4 sm:p-8">
        <div className="w-full max-w-[540px] h-48 sm:h-64 lg:h-[360px] border-2 border-dashed border-gray-300 rounded-lg grid place-items-center text-gray-400">
          <div className="text-center">
            <svg className="w-8 h-8 sm:w-10 sm:h-10 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7l9-4 9 4-9 4-9-4zm0 0v10l9 4 9-4V7" />
            </svg>
            <p className="text-xs sm:text-sm">Right-side image placeholder</p>
          </div>
        </div>
      </div>
      </div>

      {/* Bottom Banner Placeholder */}
      <div className="px-4 sm:px-8 pb-4 sm:pb-8 mt-8 sm:mt-12">
        <div className="w-full h-32 sm:h-[180px] border-2 border-dashed border-gray-300 rounded-lg grid place-items-center text-gray-400">
          <div className="text-center">
            <svg className="w-8 h-8 sm:w-10 sm:h-10 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16v12H4z" />
            </svg>
            <p className="text-xs sm:text-sm">Bottom banner placeholder</p>
          </div>
        </div>
      </div>
    </div>
  );
}
