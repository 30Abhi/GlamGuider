'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import LoadingScreen from '../../components/LoadingScreen';
import SiteHeader from "../../components/SiteHeader";

export default function CapturePage() {
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    startCamera();
    return () => {
      stopCamera();
    };
  }, []);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user' }
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
        setIsCameraActive(true);
        setError(null);
      }
    } catch (err) {
      setError('Unable to access camera. Please check permissions and try again.');
      console.error('Camera access error:', err);
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    setIsCameraActive(false);
  };

  const captureSelfie = () => {
    if (!videoRef.current) return;

    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    
    if (context) {
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      
      // Draw the video frame to canvas
      context.drawImage(videoRef.current, 0, 0);
      
      // Convert to data URL
      const imageDataUrl = canvas.toDataURL('image/jpeg');
      setCapturedImage(imageDataUrl);
      
      // Stop camera after capture
      stopCamera();
    }
  };

  const retakePhoto = () => {
    setCapturedImage(null);
    setError(null);
    startCamera();
  };

  const submitPhoto = () => {
    if (capturedImage) {
      setIsLoading(true);
    }
  };



  if (isLoading) {
    return <LoadingScreen  />;
  }

  if (capturedImage) {
    return (
      <div className="min-h-screen bg-white">
        <SiteHeader />
        <div className="flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-4 sm:p-6">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-800 text-center mb-4 sm:mb-6">
            Image Preview
          </h1>
          
          <div className="mb-4 sm:mb-6">
            <div className="w-full h-48 sm:h-64 bg-gray-100 rounded-lg overflow-hidden border border-gray-200">
              <img
                src={capturedImage}
                alt="Captured selfie"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={retakePhoto}
              className="flex-1 px-4 py-2 border border-[#007237] text-[#007237] bg-white rounded-lg hover:bg-gray-50 transition-colors"
            >
              Re-upload
            </button>
            <button
              onClick={submitPhoto}
              className="flex-1 px-4 py-2 bg-[#007237] text-white rounded-lg hover:bg-[#00662f] transition-colors"
            >
              Submit
            </button>
          </div>
        </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <SiteHeader />
      <div className="flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-4 sm:p-6">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-800 text-center mb-4 sm:mb-6">
          Take Your Selfie
        </h1>
        
        {error ? (
          <div className="text-center mb-4 sm:mb-6">
            <div className="text-red-500 mb-2">
              <svg className="w-10 h-10 sm:w-12 sm:h-12 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <p className="text-red-600 text-sm">{error}</p>
            <button
              onClick={startCamera}
              className="mt-3 px-4 py-2 bg-[#007237] text-white rounded-lg hover:bg-[#00662f] transition-colors"
            >
              Try Again
            </button>
          </div>
        ) : (
          <>
            <div className="mb-4 sm:mb-6">
                <div className="w-full h-48 sm:h-64 bg-gray-100 rounded-lg overflow-hidden border border-gray-200 relative">
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                    className={`w-full h-full object-cover ${isCameraActive ? '' : 'hidden'}`}
                  />
                  {!isCameraActive && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-gray-400 text-center">
                        <svg className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <p className="text-sm sm:text-base">Starting camera...</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            
            <div className="text-center mb-4 sm:mb-6">
              <p className="text-gray-600 text-xs sm:text-sm mb-3 sm:mb-4">
                Position your face in the center and ensure good lighting
              </p>
              <button
                onClick={captureSelfie}
                disabled={!isCameraActive}
                className={`px-6 sm:px-8 py-2 sm:py-3 rounded-full text-base sm:text-lg font-medium transition-colors ${
                  isCameraActive
                    ? 'bg-[#007237] text-white hover:bg-[#00662f]'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                {isCameraActive ? '📸 Take Photo' : 'Starting Camera...'}
              </button>
            </div>
          </>
        )}
        
        <button
          onClick={() => window.history.back()}
          className="w-full px-4 py-2 border border-gray-300 text-gray-600 bg-white rounded-lg hover:bg-gray-50 transition-colors"
        >
          Back
        </button>
      </div>
      </div>
    </div>
  );
}
