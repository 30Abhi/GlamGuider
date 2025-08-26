'use client';

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import TermsModal from "../components/TermsModal";
import SiteHeader from "../components/SiteHeader";

export default function Home() {
  const [showTermsModal, setShowTermsModal] = useState(false);
  const router = useRouter();

  const handleCaptureSelfie = () => {
    setShowTermsModal(true);
  };

  const handleTermsAccept = () => {
    setShowTermsModal(false);
    router.push('/capture');
  };

  const handleTermsClose = () => {
    setShowTermsModal(false);
  };
  return (
    <div className="min-h-screen bg-white text-[#1a1a1a]">
      <SiteHeader />

      <main className="max-w-[1512px] mx-auto px-4 sm:px-6">
        {/* Hero copy */}
        <section className="w-full flex flex-col items-center text-center py-6 sm:py-10">
          {/* avatars */}
          <div className="flex -space-x-2 sm:-space-x-3 mb-4 sm:mb-6 items-end">
            {/* 1) Teenage girl (small circle, 96x96) */}
            <div className="relative h-16 w-16 sm:h-24 sm:w-24 rounded-full overflow-hidden border border-gray-200 bg-gray-100">
              <Image
                src="https://images.unsplash.com/photo-1580489944761-15a19d654956" // Corrected URL
                
                alt="Teenage girl"
                fill
                className="object-cover"
                sizes="(max-width: 640px) 64px, 96px"
              />
            </div>

            {/* 2) Young lady (bigger: 137x137) */}
            <div className="relative h-20 w-20 sm:h-[137px] sm:w-[137px] rounded-full overflow-hidden border border-gray-200 bg-gray-100">
              <Image
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb" // Corrected URL
                alt="Young woman"
                fill
                className="object-cover"
                sizes="(max-width: 640px) 80px, 137px"
              />
            </div>

            {/* 3) High school boy (small circle, 96x96) */}
            <div className="relative h-16 w-16 sm:h-24 sm:w-24 rounded-full overflow-hidden border border-gray-200 bg-gray-100">
              <Image
                src="https://images.unsplash.com/photo-1564564321837-a57b7070ac4f" // Corrected URL
                alt="High school boy"
                fill
                className="object-cover"
                sizes="(max-width: 640px) 64px, 96px"
              />
            </div>
          </div>


          <h1 className="text-[#1F2937] text-xl sm:text-[28px] font-bold tracking-tight mb-3 px-4">
            Get Your Free, Personalized Skin Analysis
          </h1>
          <p className="text-[#4B5563] max-w-[453px] text-sm sm:text-base px-4">
            Our AI, trained by dermatologists, will analyze your skin across 10 key
            metrics to create a custom routine just for you.
          </p>
        </section>

        {/* Content row: upload card + tips */}
        <section className="w-full grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-10 pb-12 sm:pb-24">
          {/* Upload card */}
          <div className="w-full flex justify-center lg:justify-start">
            <div className="w-full sm:w-[726px] rounded-[12px] border border-gray-200 shadow-sm p-4 sm:p-8 bg-[#FBFBFB]">
              <div className="mx-auto h-24 w-24 sm:h-[139px] sm:w-[149px] grid place-items-center mb-4 sm:mb-6">
                {/* placeholder for scan/face thumbnail */}
                <div className="h-24 w-24 sm:h-[139px] sm:w-[149px] rounded bg-white border border-dashed border-gray-300 grid place-items-center">
                  <img src="https://freesvg.org/img/Low-Poly-Female-Head-Wireframe.png" alt="Female head wireframe" className="h-full w-full text-gray-400" />
                   
                 
                </div>
              </div>

              <h2 className="text-[#1F2937] font-semibold text-base sm:text-[18px] text-center">
                Upload Your Selfie
              </h2>
 
              <div className="mt-4 sm:mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <button 
                  onClick={handleCaptureSelfie}
                  className="inline-flex items-center justify-center gap-2 rounded-[8px] bg-[#007237] text-white h-[44px] sm:h-[50px] px-3 sm:px-4 text-sm hover:brightness-95 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-4 w-4">
                    <path d="M7 7h10l1 2h2a1 1 0 0 1 1 1v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V10a1 1 0 0 1 1-1h2z" />
                    <circle cx="12" cy="14" r="3" />
                  </svg>
                  <span className="hidden sm:inline">Capture a Live Selfie</span>
                  <span className="sm:hidden">Live Selfie</span>
                </button>
                <button className="inline-flex items-center justify-center gap-2 rounded-[8px] bg-white h-[44px] sm:h-[50px] px-3 sm:px-4 text-sm border-2 border-[#007237] text-[#007237] hover:bg-[#F5F9F9] transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-4 w-4">
                    <path d="M12 16V4m0 12-3-3m3 3 3-3" />
                    <rect x="4" y="16" width="16" height="4" rx="1" />
                  </svg>
                  <span className="hidden sm:inline">Upload a Photo</span>
                  <span className="sm:hidden">Upload Photo</span>
                </button>
              </div>

              <p className="mt-4 sm:mt-5 text-xs text-[#6B7280] text-center px-2">
                Don&apos;t want to use a photo? {" "}
                <a href="/questionnaire" className="text-[#007237] underline">Take our questionnaire instead.</a>
              </p>
              
              {/* Test Analytics Link - Remove in production */}
              <div className="mt-4 pt-4 border-t border-gray-200">
                <button 
                  onClick={() => router.push('/analytics')}
                  className="w-full px-4 py-2 text-xs text-gray-500 border border-gray-300 rounded hover:bg-gray-50 transition-colors"
                >
                  🧪 Test Analytics Page (Dev Only)
                </button>
              </div>
            </div>
          </div>

          {/* Tips column */}
          <div className="w-full flex flex-col justify-center px-2 sm:px-4">
            <h3 className="text-[#1F2937] text-base sm:text-[18px] font-semibold mb-4">For an Accurate Analysis</h3>
            <div className="space-y-4 sm:space-y-6">
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="h-10 w-10 sm:h-[47px] sm:w-[47px] rounded-[8px] bg-[#007237]/5 grid place-items-center shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#007237" strokeWidth="1.5" className="h-4 w-4 sm:h-5 sm:w-5">
                    <path d="M12 3v3m0 12v3M3 12h3m12 0h3M5.64 5.64l2.12 2.12m8.48 8.48 2.12 2.12m0-12.72-2.12 2.12M7.76 16.24 5.64 18.36" />
                  </svg>
                </div>
                <div>
                  <p className="text-[#111827] text-sm sm:text-[16px] font-medium leading-6">Find Good Lighting</p>
                  <p className="text-[#4B5563] text-xs sm:text-sm leading-6">Face a window with even, natural light. Avoid shadows.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="h-10 w-10 sm:h-[47px] sm:w-[47px] rounded-[8px] bg-[#007237]/5 grid place-items-center shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#007237" strokeWidth="1.5" className="h-4 w-4 sm:h-5 sm:w-5">
                    <path d="M12 14.25a3 3 0 1 0 0-6 3 3 0 1 0 0 6Z" />
                    <path d="M4.5 8.25a7.5 7.5 0 1 1 15 0c0 4.142-3.358 10.5-7.5 10.5S4.5 12.392 4.5 8.25Z" />
                  </svg>
                </div>
                <div>
                  <p className="text-[#111827] text-sm sm:text-[16px] font-medium leading-6">Clear Face</p>
                  <p className="text-[#4B5563] text-xs sm:text-sm leading-6">Remove glasses and push hair away from your face. A clean, makeup-free face gives the best results.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="h-10 w-10 sm:h-[47px] sm:w-[47px] rounded-[8px] bg-[#007237]/5 grid place-items-center shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#007237" strokeWidth="1.5" className="h-4 w-4 sm:h-5 sm:w-5">
                    <path d="M3 12h18M12 3v18" />
                  </svg>
                </div>
                <div>
                  <p className="text-[#111827] text-sm sm:text-[16px] font-medium leading-6">Keep it Sharp</p>
                  <p className="text-[#4B5563] text-xs sm:text-sm leading-6">Hold your phone steady to avoid a blurry photo.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="h-10 w-10 sm:h-[47px] sm:w-[47px] rounded-[8px] bg-[#007237]/5 grid place-items-center shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#007237" strokeWidth="1.5" className="h-4 w-4 sm:h-5 sm:w-5">
                    <path d="M4 6h5V4H4a2 2 0 0 0-2 2v5h2zM20 6h-5V4h5a2 2 0 0 1 2 2v5h-2zM4 18h5v2H4a2 2 0 0 1-2-2v-5h2zM20 18h-5v2h5a2 2 0 0 0 2-2v-5h-2z" />
                  </svg>
                </div>
                <div>
                  <p className="text-[#111827] text-sm sm:text-[16px] font-medium leading-6">Full Face View</p>
                  <p className="text-[#4B5563] text-xs sm:text-sm leading-6">Ensure your entire face is visible, from your forehead to your chin.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <TermsModal
        isOpen={showTermsModal}
        onClose={handleTermsClose}
        onAccept={handleTermsAccept}
      />
    </div>
  );
}
