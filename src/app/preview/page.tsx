'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import SiteHeader from "../../components/SiteHeader";

export default function PreviewPage() {
  const [imageData, setImageData] = useState<string | null>(null);
  const [status, setStatus] = useState<'success' | 'error' | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const image = searchParams.get('image');
    const analysisStatus = searchParams.get('status');
    
    if (image) {
      setImageData(decodeURIComponent(image));
    }
    
    if (analysisStatus) {
      setStatus(analysisStatus as 'success' | 'error');
    }
  }, [searchParams]);

  const handleRetake = () => {
    router.push('/capture');
  };

  const handleSubmit = () => {
    // Redirect to analytics page for skin analysis
    router.push(`/analytics?image=${encodeURIComponent(imageData!)}`);
  };

  if (!imageData || !status) {
    return (
      <div className="min-h-screen bg-white">
        <SiteHeader />
        <div className="flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-10 w-10 sm:h-12 sm:w-12 border-b-2 border-[#007237] mx-auto mb-4"></div>
          <p className="text-gray-600 text-sm sm:text-base">Loading...</p>
        </div>
        </div>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="min-h-screen bg-white">
        <SiteHeader />
        <div className="flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-4 sm:p-6">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-800 text-center mb-4 sm:mb-6">
            Image Preview
          </h1>
          
          <div className="mb-4 sm:mb-6">
            <div className="w-full h-48 sm:h-64 bg-gray-100 rounded-lg border border-gray-200 flex items-center justify-center">
              <div className="text-center">
                <div className="text-gray-600 mb-3">
                  <svg className="w-12 h-12 sm:w-16 sm:h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                </div>
                <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-2">Analysis Failed</h3>
                <p className="text-gray-600 text-xs sm:text-sm">
                  The photo quality doesn't meet our requirements for accurate skin analysis.
                </p>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleRetake}
              className="flex-1 px-4 py-2 border border-[#007237] text-[#007237] bg-white rounded-lg hover:bg-gray-50 transition-colors"
            >
              Re-upload
            </button>
            <button
              disabled
              className="flex-1 px-4 py-2 bg-gray-300 text-gray-500 rounded-lg cursor-not-allowed"
            >
              Submit
            </button>
          </div>
        </div>
        </div>
      </div>
    );
  }

  // Success state - show image preview
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
                src={imageData}
                alt="Captured selfie"
                className="w-full h-full object-cover"
              />
            </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={handleRetake}
            className="flex-1 px-4 py-2 border border-[#007237] text-[#007237] bg-white rounded-lg hover:bg-gray-50 transition-colors"
          >
            Re-upload
          </button>
          <button
            onClick={handleSubmit}
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
