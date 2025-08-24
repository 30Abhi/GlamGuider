'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface LoadingScreenProps {
  capturedImage: string;
}

export default function LoadingScreen({ capturedImage }: LoadingScreenProps) {
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
            {/* Main circle with person icon */}
            <div className="w-32 h-32 mx-auto rounded-full border-2 border-[#4CAF50] bg-[#E8F5E8] flex items-center justify-center relative">
              {/* Scanning line that moves up and down over the person icon */}
              <div 
                className="absolute w-full h-1 bg-[#4CAF50] opacity-80 transition-all duration-75 ease-linear"
                style={{ 
                  top: `${scanPosition}%`,
                  transform: 'translateY(-50%)'
                }}
              ></div>
              
              <div className="w-20 h-20 bg-[#4CAF50] rounded-full flex items-center justify-center relative z-10">
                <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
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
