'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import SiteHeader from "../../components/SiteHeader";

// Data interfaces for API integration
interface SkinAnalysis {
  user: {
    name: string;
    overallScore: number;
    skinType: string;
    primaryConcern: string;
    secondaryConcerns: string[];
  };
  metrics: {
    skinClarity: {
      pores: number;
      acne: number;
      pigmentation: number;
    };
    aging: {
      wrinkles: number;
      sagging: number;
      eyeArea: number;
    };
    health: {
      redness: number;
      hydration: number;
      uniformity: number;
    };
  };
  recommendations: {
    dailyRoutine: string[];
    weeklyActions: string[];
    lifestyleTips: string[];
  };
  products: {
    category: string;
    name: string;
    volume: string;
    targetConcern: string;
    image: string;
  }[];
}

// Mock data - replace with API calls later
// Default overall score is set to 90 - can be easily modified here
const mockData: SkinAnalysis = {
  user: {
    name: "Sarah",
    overallScore: 90, // Default score - change this value to test different scores
    skinType: "Combination",
    primaryConcern: "Pigmentation & Uneven Skin Tone",
    secondaryConcerns: ["Slightly enlarged pores", "mild dehydration"]
  },
  metrics: {
    skinClarity: {
      pores: 50,
      acne: 60,
      pigmentation: 30
    },
    aging: {
      wrinkles: 72,
      sagging: 11,
      eyeArea: 94
    },
    health: {
      redness: 43,
      hydration: 47,
      uniformity: 85
    }
  },
  recommendations: {
    dailyRoutine: [
      "Use a Gentle, Hydrating Cleanser",
      "Apply Niacinamide + Vitamin C Serum",
      "Apply Broad-Spectrum Sunscreen",
      "Moisturize with a Ceramide Cream"
    ],
    weeklyActions: [
      "Gentle Exfoliation with AHA/BHA",
      "Apply Clay Mask to T-Zone"
    ],
    lifestyleTips: [
      "Increase Water Intake",
      "Limit Direct Sun Exposure",
      "Prioritize Sleep",
      "Maintain a Balanced Diet"
    ]
  },
  products: [
    {
      category: "Cleansers",
      name: "Minimalist Salicylic Acid + LHA 2% Cleanser",
      volume: "100 ml",
      targetConcern: "For Dark Circles & Fine Lines",
      image: "/placeholder-product.png"
    },
    {
      category: "Cleansers",
      name: "CeraVe SA Smoothing Cleanser",
      volume: "236 ml",
      targetConcern: "For Pigmentation",
      image: "/placeholder-product.png"
    },
    {
      category: "Cleansers",
      name: "Moisturizing Cetaphil Gentle Cleanser",
      volume: "236 ml",
      targetConcern: "For Uneven Skin Tone",
      image: "/placeholder-product.png"
    },
    {
      category: "Moisturiser",
      name: "CeraVe Daily Moisturizing Lotion",
      volume: "236 ml",
      targetConcern: "For Hydration",
      image: "/placeholder-product.png"
    },
    {
      category: "Serum",
      name: "The Ordinary Niacinamide 10% + Zinc 1%",
      volume: "30 ml",
      targetConcern: "For Oil Control",
      image: "/placeholder-product.png"
    },
    {
      category: "Targeted products",
      name: "La Roche-Posay Effaclar Duo",
      volume: "40 ml",
      targetConcern: "For Acne Treatment",
      image: "/placeholder-product.png"
    }
  ]
};

// Circular Progress Component
const CircularProgress = ({ score, size = 60, strokeWidth = 6, color = "#007237" }: { 
  score: number; 
  size?: number; 
  strokeWidth?: number; 
  color?: string; 
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const progress = (score / 100) * circumference;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - progress;

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg className="w-full h-full transform -rotate-90" viewBox={`0 0 ${size} ${size}`}>
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#e5e7eb"
          strokeWidth={strokeWidth}
        />
        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
        />
      </svg>
      {/* Score text */}
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-sm font-bold text-gray-900">{score}</span>
      </div>
    </div>
  );
};

export default function AnalyticsPage() {
  const router = useRouter();
  const [data, setData] = useState<SkinAnalysis>(mockData);

  // Function to get color based on score
  const getScoreColor = (score: number) => {
    if (score >= 80) return "#10b981"; // Green
    if (score >= 60) return "#f59e0b"; // Yellow
    if (score >= 40) return "#f97316"; // Orange
    return "#ef4444"; // Red
  };

  // Function to get score description
  const getScoreDescription = (score: number) => {
    if (score >= 80) return "Excellent";
    if (score >= 60) return "Good";
    if (score >= 40) return "Fair";
    return "Poor";
  };

  return (
    <div className="min-h-screen bg-white">
      <SiteHeader />

      <main className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* First Part: Buttons and Skin at Glance */}
        <div className="mb-8 sm:mb-12">
          {/* Main Title and Action Buttons */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 lg:mb-0">
              Hi {data.user.name}, Here's Your <span className="underline decoration-blue-500 decoration-2">Skin Report</span>
            </h1>
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex flex-row gap-3">
                <button className="flex items-center gap-2 px-3 sm:px-4 py-2 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-colors text-sm">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  <span className="hidden sm:inline">Retake Analysis</span>
                  <span className="sm:hidden">Retake</span>
                </button>
                <button className="flex items-center gap-2 px-3 sm:px-4 py-2 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-colors text-sm">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span className="hidden sm:inline">Download Report</span>
                  <span className="sm:hidden">Download</span>
                </button>
              </div>
              <button onClick={() => router.push('/consultations')} className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-[#007237] text-white rounded-lg hover:bg-[#00662f] transition-colors text-sm">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                <span className="hidden sm:inline">Talk to Dermatologist</span>
                <span className="sm:hidden">Talk to Dermatologist</span>
              </button>
            </div>
          </div>

          {/* Your Skin at a Glance */}
          <div className="mb-6 sm:mb-8">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-6 sm:mb-8">Your Skin at a Glance</h2>
                         <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 sm:gap-6">
               {/* Overall Skin Health Score */}
                               <div className="lg:col-span-2 bg-white border border-gray-200 rounded-lg p-3 sm:p-4">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <div className="relative w-28 h-16 sm:w-32 sm:h-20 mx-auto sm:mx-0 mb-3 sm:mb-0"> {/* increased size */}
                      <svg className="w-28 h-16 sm:w-32 sm:h-20" viewBox="0 0 120 60">
                        {/* Background arc */}
                        <path
                          d="M10,60 A50,50 0 0,1 110,60"
                          fill="none"
                          stroke="#e5e7eb"
                          strokeWidth="12"
                        />
                        {/* Progress arc */}
                        <path
                          d="M10,60 A50,50 0 0,1 110,60"
                          fill="none"
                          stroke="url(#gradient)"
                          strokeWidth="12"
                          strokeDasharray="157"
                          strokeDashoffset={157 - (data.user.overallScore / 100) * 157}
                          strokeLinecap="round"
                        />
                        <defs>
                          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#007237" />
                            <stop offset="100%" stopColor="#4CAF50" />
                          </linearGradient>
                        </defs>
                      </svg>
                      {/* Move score downward */}
                      <div className="absolute inset-0 flex items-end justify-center pb-1">
                        <span className="text-xl sm:text-2xl font-bold text-gray-900">
                          {data.user.overallScore}
                        </span>
                      </div>
                    </div>

                   <div className="flex-1 sm:ml-3 text-center sm:text-left">
                     <h3 className="font-bold text-gray-900 mb-1 text-sm">
                       Overall Skin Health Score
                     </h3>
                     <p className="text-xs text-gray-600">
                       Your skin health is above average. We've identified some minor concerns
                       that can be addressed with the right products.
                     </p>
                   </div>
                 </div>
               </div>

               {/* Combined Information Panel */}
               <div className="lg:col-span-3 bg-gray-50 border border-gray-200 rounded-lg p-3 sm:p-4">
                 <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                   {/* Your Detected Skin Type */}
                   <div className="relative">
                     <div className="flex items-center gap-2 sm:gap-3 mb-2">
                       <div className="w-5 h-5 sm:w-6 sm:h-6 bg-blue-100 rounded-full flex items-center justify-center">
                       <img src="/detectyourskintype.png" alt="Detect your skin type" className="w-3 h-3" />

                       </div>
                       <h3 className="font-bold text-gray-900 text-xs sm:text-sm">Your Detected Skin Type</h3>
                     </div>
                     <div className="inline-block px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">{data.user.skinType}</div>
                     {/* Vertical separator */}
                     <div className="absolute right-0 top-0 bottom-0 w-px bg-gray-300 hidden sm:block"></div>
                   </div>

                   {/* Primary Concern */}
                   <div className="relative">
                     <div className="flex items-center gap-2 sm:gap-3 mb-2">
                       <div className="w-5 h-5 sm:w-6 sm:h-6 bg-red-100 rounded-full flex items-center justify-center">
                       <img src="/primaryconcern.png" alt="Detect your skin type" className="w-3 h-3" />

                       </div>
                       <h3 className="font-bold text-gray-900 text-xs sm:text-sm">Primary Concern</h3>
                     </div>
                     <p className="text-xs text-gray-700">{data.user.primaryConcern}</p>
                     {/* Vertical separator */}
                     <div className="absolute right-0 top-0 bottom-0 w-px bg-gray-300 hidden sm:block"></div>
                   </div>

                   {/* Secondary Concerns */}
                   <div>
                     <div className="flex items-center gap-2 sm:gap-3 mb-2">
                       <div className="w-5 h-5 sm:w-6 sm:h-6 bg-yellow-100 rounded-full flex items-center justify-center">
                       <img src="/secondaryconcerns.png" alt="Detect your skin type" className="w-3 h-3" />

                       </div>
                       <h3 className="font-bold text-gray-900 text-xs sm:text-sm">Secondary Concerns</h3>
                     </div>
                     <p className="text-xs text-gray-700">{data.user.secondaryConcerns.join(", ")}</p>
                   </div>
                 </div>
               </div>
             </div>
          </div>
        </div>

        {/* Second Part: Overall Skin Health */}
        <div className="mb-6 sm:mb-8">
          <div className="bg-white border border-gray-200 rounded-lg p-4 sm:p-6">
            <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-green-100 rounded-lg flex items-center justify-center">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Overall Skin Health</h2>
            </div>
            
            <div className="flex flex-col lg:flex-row items-start gap-4 sm:gap-6">
              {/* Visual Representation */}
              <div className="relative">
                <div className="w-40 sm:w-48 h-40 sm:h-48 bg-gray-100 rounded-lg border border-gray-200 flex items-center justify-center">
                  <div className="text-center text-gray-500">
                    <svg className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <p className="text-sm sm:text-base">Skin Analysis Visualization</p>
                    <p className="text-xs sm:text-sm">(Will be integrated with AI analysis)</p>
                  </div>
                </div>
              </div>

              {/* Skin Health Metrics */}
              <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                {/* Column 1: Skin Clarity & Texture */}
                <div className="relative">
                  <h3 className="font-bold text-gray-900 mb-3 sm:mb-4 text-sm sm:text-base">Skin Clarity & Texture</h3>
                  <div className="space-y-3 md:space-y-4">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <CircularProgress 
                        score={data.metrics.skinClarity.pores} 
                        size={40} 
                        strokeWidth={3} 
                        color={getScoreColor(data.metrics.skinClarity.pores)} 
                      />
                      <span className="text-xs sm:text-sm text-gray-700">Pores</span>
                    </div>
                    <div className="flex items-center gap-2 sm:gap-3">
                      <CircularProgress 
                        score={data.metrics.skinClarity.acne} 
                        size={40} 
                        strokeWidth={3} 
                        color={getScoreColor(data.metrics.skinClarity.acne)} 
                      />
                      <span className="text-xs sm:text-sm text-gray-700">Acne</span>
                    </div>
                    <div className="flex items-center gap-2 sm:gap-3">
                      <CircularProgress 
                        score={data.metrics.skinClarity.pigmentation} 
                        size={40} 
                        strokeWidth={3} 
                        color={getScoreColor(data.metrics.skinClarity.pigmentation)} 
                      />
                      <span className="text-xs sm:text-sm text-gray-700 underline cursor-pointer">Pigmentation</span>
                    </div>
                  </div>
                  {/* Vertical separator */}
                  <div className="absolute right-0 top-0 bottom-0 w-px bg-gray-200 hidden sm:block"></div>
                </div>

                {/* Column 2: Signs of Aging */}
                <div className="relative">
                  <h3 className="font-bold text-gray-900 mb-3 sm:mb-4 text-sm sm:text-base">Signs of Aging</h3>
                  <div className="space-y-3 md:space-y-4">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <CircularProgress 
                        score={data.metrics.aging.wrinkles} 
                        size={40} 
                        strokeWidth={3} 
                        color={getScoreColor(data.metrics.aging.wrinkles)} 
                      />
                      <span className="text-xs sm:text-sm text-gray-700">Wrinkles & Fine Lines</span>
                    </div>
                    <div className="flex items-center gap-2 sm:gap-3">
                      <CircularProgress 
                        score={data.metrics.aging.sagging} 
                        size={40} 
                        strokeWidth={3} 
                        color={getScoreColor(data.metrics.aging.sagging)} 
                      />
                      <span className="text-xs sm:text-sm text-gray-700">Sagging</span>
                    </div>
                    <div className="flex items-center gap-2 sm:gap-3">
                      <CircularProgress 
                        score={data.metrics.aging.eyeArea} 
                        size={40} 
                        strokeWidth={3} 
                        color={getScoreColor(data.metrics.aging.eyeArea)} 
                      />
                      <span className="text-xs sm:text-sm text-gray-700">Eye Area Condition</span>
                    </div>
                  </div>
                  {/* Vertical separator */}
                  <div className="absolute right-0 top-0 bottom-0 w-px bg-gray-200 hidden sm:block"></div>
                </div>

                {/* Column 3: Skin Health & Radiance */}
                <div>
                  <h3 className="font-bold text-gray-900 mb-3 sm:mb-4 text-sm sm:text-base">Skin Health & Radiance</h3>
                  <div className="space-y-3 md:space-y-4">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <CircularProgress 
                        score={data.metrics.health.redness} 
                        size={40} 
                        strokeWidth={3} 
                        color={getScoreColor(data.metrics.health.redness)} 
                      />
                      <span className="text-xs sm:text-sm text-gray-700">Redness</span>
                    </div>
                    <div className="flex items-center gap-2 sm:gap-3">
                      <CircularProgress 
                        score={data.metrics.health.hydration} 
                        size={40} 
                        strokeWidth={3} 
                        color={getScoreColor(data.metrics.health.hydration)} 
                      />
                      <span className="text-xs sm:text-sm text-gray-700">Hydration</span>
                    </div>
                    <div className="flex items-center gap-2 sm:gap-3">
                      <CircularProgress 
                        score={data.metrics.health.uniformity} 
                        size={40} 
                        strokeWidth={3} 
                        color={getScoreColor(data.metrics.health.uniformity)} 
                      />
                      <span className="text-xs sm:text-sm text-gray-700">Uniformity</span>
                    </div>
                  </div>
                </div>

                
              </div>
            </div>
          </div>
        </div>

        {/* Third Part: Personalized Action Plan */}
        <div className="mb-8 sm:mb-12">
          <div className="bg-white border border-gray-200 rounded-lg p-4 sm:p-6">
            <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gray-100 rounded-lg flex items-center justify-center">
              <img src="/personalizedactionplan.png" alt="Personalized action plan" className="w-4 h-4 sm:w-5 sm:h-5" />

              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Personalized Action Plan</h2>
            </div>
            <p className="text-gray-600 mb-4 sm:mb-6 text-sm sm:text-base">Your daily steps to achieving your skin goals</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              {/* Daily Routine */}
              <div>
                <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <img src="/dailyroutine.png" alt="Daily routine" className="w-4 h-4 sm:w-5 sm:h-5" />

                  </div>
                  <h3 className="font-bold text-gray-900 text-sm sm:text-base">Daily Routine</h3>
                </div>
                <div className="space-y-2 sm:space-y-3">
                  {data.recommendations.dailyRoutine.map((item, index) => (
                    <div key={index} className="flex items-center gap-2 sm:gap-3">
                      <div className="w-3 h-3 sm:w-4 sm:h-4 bg-gray-200 rounded-full"></div>
                      <span className="text-xs sm:text-sm text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Weekly Actions */}
              <div>
                <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                  <img src="/weeklyaction.png" alt="Detect your skin type" className="w-3 h-3" />

                  </div>
                  <h3 className="font-bold text-gray-900 text-sm sm:text-base">Weekly Actions</h3>
                </div>
                <div className="space-y-2 sm:space-y-3">
                  {data.recommendations.weeklyActions.map((item, index) => (
                    <div key={index} className="flex items-center gap-2 sm:gap-3">
                      <div className="w-3 h-3 sm:w-4 sm:h-4 bg-gray-200 rounded-full"></div>
                      <span className="text-xs sm:text-sm text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Lifestyle Tips */}
              <div>
                <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-red-100 rounded-lg flex items-center justify-center">
                  <img src="/lifestyletipes.png" alt="Detect your skin type" className="w-3 h-3" />

                  </div>
                  <h3 className="font-bold text-gray-900 text-sm sm:text-base">Lifestyle Tips</h3>
                </div>
                <div className="space-y-2 sm:space-y-3">
                  {data.recommendations.lifestyleTips.map((item, index) => (
                    <span key={index} className="block text-xs sm:text-sm text-gray-700">{item}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

                 {/* Fourth Part: Recommended Products */}
         <div className="mb-8 sm:mb-12">
           <div className="bg-white border border-gray-200 rounded-lg p-4 sm:p-6">
             <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
               <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gray-100 rounded-lg flex items-center justify-center">
               <img src="/recommendedproducts.png" alt="Recommended products" className="w-4 h-4 sm:w-5 sm:h-5" />

               </div>
               <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Recommended Products</h2>
             </div>
             <p className="text-gray-600 mb-4 sm:mb-6 text-sm sm:text-base">Products selected by our AI to address your specific skin needs.</p>
             
             {/* Products Display - Horizontal Row */}
             <div className="flex gap-3 sm:gap-4 overflow-x-auto pb-2">
               {data.products.slice(0, 4).map((product, index) => (
                 <div key={index} className="flex-shrink-0 w-56 sm:w-64 bg-gray-50 rounded-lg border border-gray-200 p-3 sm:p-4">
                   {/* Product Image */}
                   <div className="w-full h-24 sm:h-32 bg-gray-200 rounded-lg mb-2 sm:mb-3 flex items-center justify-center relative">
                     <span className="text-gray-500 text-xs sm:text-sm">Product Image</span>
                     {/* Rating Badge */}
                     <div className="absolute top-1 sm:top-2 right-1 sm:right-2 bg-green-500 text-white text-xs px-1 sm:px-2 py-1 rounded border border-green-600">
                       4.5★
                     </div>
                   </div>
                   
                   {/* Product Details */}
                   <div className="space-y-1 sm:space-y-2">
                     <h4 className="font-bold text-gray-900 text-xs sm:text-sm">Dermafique</h4>
                     <p className="text-gray-700 text-xs sm:text-sm">Dermafique Body Lotion</p>
                     <div className="text-green-600 font-bold text-xs sm:text-sm">54% OFF</div>
                     <div className="flex items-center gap-1 sm:gap-2">
                       <span className="text-gray-400 text-xs sm:text-sm line-through">₹506</span>
                       <span className="text-gray-900 font-bold text-base sm:text-lg">₹450</span>
                     </div>
                     <button className="w-full bg-green-700 text-white font-bold py-1.5 sm:py-2 rounded-lg hover:bg-green-800 transition-colors text-xs sm:text-sm">
                       Buy Now
                     </button>
                   </div>
                 </div>
               ))}
             </div>
           </div>
         </div>

        {/* Fifth Part: Persuasion to Talk to Dermatologist */}
        <div className="mb-8 sm:mb-12">
          <div className="bg-gradient-to-r from-green-50 to-green-50 border border-green-200 rounded-lg p-6 sm:p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 items-center">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">Your Journey to Glowing Skin Continues</h2>
                <p className="text-gray-700 mb-4 sm:mb-6 text-sm sm:text-base">Come back for a new analysis in 8-10 weeks to track your beautiful progress with pigmentation and hydration.</p>
                      <button onClick={() => router.push('/consultations')} className="flex items-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 bg-[#007237] text-white rounded-lg hover:bg-[#00662f] transition-colors font-medium text-sm sm:text-base">
                   <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                   </svg>
                   <span className="hidden sm:inline">Talk to Dermatologist</span>
                   <span className="sm:hidden">Talk to Dermatologist</span>
                 
                 </button>
              </div>
              <div className="hidden lg:block">
                <div className="w-full h-48 sm:h-64 bg-gray-200 rounded-lg flex items-center justify-center">
                  <span className="text-gray-500">Professional Consultation Image</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}