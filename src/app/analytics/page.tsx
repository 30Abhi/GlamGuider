'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

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
const CircularProgress = ({ score, size = 60, strokeWidth = 6, color = "#22747D" }: { 
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
  const [activeProductCategory, setActiveProductCategory] = useState("Cleansers");

  // Get unique product categories
  const productCategories = Array.from(new Set(data.products.map(p => p.category)));

  // Filter products by active category
  const filteredProducts = data.products.filter(p => p.category === activeProductCategory);

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
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-gradient-to-r from-[#22747D] to-[#4CAF50]" />
              <span className="text-xl font-semibold tracking-tight">
                Glam<span className="text-[#4CAF50]">Guider</span>™
              </span>
            </div>
            <button
              onClick={() => router.push('/')}
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* First Part: Buttons and Skin at Glance */}
        <div className="mb-12">
          {/* Main Title and Action Buttons */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4 lg:mb-0">
              Hi {data.user.name}, Here's Your <span className="underline decoration-blue-500 decoration-2">Skin Report</span>
            </h1>
            <div className="flex flex-col sm:flex-row gap-3">
              <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Retake Analysis
              </button>
              <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Download Report
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-[#22747D] text-white rounded-lg hover:bg-[#1a5a61] transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                Talk to Dermatologist
              </button>
            </div>
          </div>

          {/* Your Skin at a Glance */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Your Skin at a Glance</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Overall Skin Health Score */}
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                                    <div className="relative w-24 h-24">
                    <svg className="w-24 h-24 " viewBox="0 0 100 50">
                      {/* Background arc */}
                      <path
                        d="M10,50 A40,40 0 0,1 90,50"
                        fill="none"
                        stroke="#e5e7eb"
                        strokeWidth="8"
                      />
                      {/* Progress arc */}
                      <path
                        d="M10,50 A40,40 0 0,1 90,50"
                        fill="none"
                        stroke="url(#gradient)"
                        strokeWidth="8"
                        strokeDasharray="125.6"
                        strokeDashoffset={125.6 - (data.user.overallScore / 100) * 125.6}
                        strokeLinecap="round"
                      />
                      <defs>
                        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#22747D" />
                          <stop offset="100%" stopColor="#4CAF50" />
                        </linearGradient>
                      </defs>
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-2xl font-bold text-gray-900">{data.user.overallScore}</span>
                    </div>
                  </div>
                  <div className="flex-1 ml-4">
                    <h3 className="font-bold text-gray-900 mb-2">Overall Skin Health Score</h3>
                    <p className="text-sm text-gray-600">Your skin health is above average. We've identified some minor concerns that can be addressed with the right products.</p>
                  </div>
                </div>
              </div>

              {/* Your Detected Skin Type */}
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                    </svg>
                  </div>
                  <h3 className="font-bold text-gray-900">Your Detected Skin Type</h3>
                </div>
                <div className="inline-block px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">{data.user.skinType}</div>
              </div>

              {/* Primary Concern */}
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                    </svg>
                  </div>
                  <h3 className="font-bold text-gray-900">Primary Concern</h3>
                </div>
                <p className="text-sm text-gray-700">{data.user.primaryConcern}</p>
              </div>

              {/* Secondary Concerns */}
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                    </svg>
                  </div>
                  <h3 className="font-bold text-gray-900">Secondary Concerns</h3>
                </div>
                <p className="text-sm text-gray-700">{data.user.secondaryConcerns.join(", ")}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Second Part: Overall Skin Health */}
        <div className="mb-12">
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Overall Skin Health</h2>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Visual Representation */}
              <div className="relative">
                <div className="w-full h-80 bg-gray-100 rounded-lg border border-gray-200 flex items-center justify-center">
                  <div className="text-center text-gray-500">
                    <svg className="w-16 h-16 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <p>Skin Analysis Visualization</p>
                    <p className="text-sm">(Will be integrated with AI analysis)</p>
                  </div>
                </div>
              </div>

              {/* Skin Health Metrics */}
              <div className="grid grid-cols-1 gap-6">
                {/* Column 1: Skin Clarity & Texture */}
                <div>
                  <h3 className="font-bold text-gray-900 mb-4">Skin Clarity & Texture</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-700">Pores</span>
                      <div className="flex items-center gap-3">
                        <CircularProgress 
                          score={data.metrics.skinClarity.pores} 
                          size={50} 
                          strokeWidth={4} 
                          color={getScoreColor(data.metrics.skinClarity.pores)} 
                        />
                        <span className="text-sm font-medium">{data.metrics.skinClarity.pores}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-700">Acne</span>
                      <div className="flex items-center gap-3">
                        <CircularProgress 
                          score={data.metrics.skinClarity.acne} 
                          size={50} 
                          strokeWidth={4} 
                          color={getScoreColor(data.metrics.skinClarity.acne)} 
                        />
                        <span className="text-sm font-medium">{data.metrics.skinClarity.acne}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-700 underline cursor-pointer">Pigmentation</span>
                      <div className="flex items-center gap-3">
                        <CircularProgress 
                          score={data.metrics.skinClarity.pigmentation} 
                          size={50} 
                          strokeWidth={4} 
                          color={getScoreColor(data.metrics.skinClarity.pigmentation)} 
                        />
                        <span className="text-sm font-medium">{data.metrics.skinClarity.pigmentation}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Column 2: Signs of Aging */}
                <div>
                  <h3 className="font-bold text-gray-900 mb-4">Signs of Aging</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-700">Wrinkles & Fine Lines</span>
                      <div className="flex items-center gap-3">
                        <CircularProgress 
                          score={data.metrics.aging.wrinkles} 
                          size={50} 
                          strokeWidth={4} 
                          color={getScoreColor(data.metrics.aging.wrinkles)} 
                        />
                        <span className="text-sm font-medium">{data.metrics.aging.wrinkles}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-700">Sagging</span>
                      <div className="flex items-center gap-3">
                        <CircularProgress 
                          score={data.metrics.aging.sagging} 
                          size={50} 
                          strokeWidth={4} 
                          color={getScoreColor(data.metrics.aging.sagging)} 
                        />
                        <span className="text-sm font-medium">{data.metrics.aging.sagging}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-700">Eye Area Condition</span>
                      <div className="flex items-center gap-3">
                        <CircularProgress 
                          score={data.metrics.aging.eyeArea} 
                          size={50} 
                          strokeWidth={4} 
                          color={getScoreColor(data.metrics.aging.eyeArea)} 
                        />
                        <span className="text-sm font-medium">{data.metrics.aging.eyeArea}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Column 3: Skin Health & Radiance */}
                <div>
                  <h3 className="font-bold text-gray-900 mb-4">Skin Health & Radiance</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-700">Redness</span>
                      <div className="flex items-center gap-3">
                        <CircularProgress 
                          score={data.metrics.health.redness} 
                          size={50} 
                          strokeWidth={4} 
                          color={getScoreColor(data.metrics.health.redness)} 
                        />
                        <span className="text-sm font-medium">{data.metrics.health.redness}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-700">Hydration</span>
                      <div className="flex items-center gap-3">
                        <CircularProgress 
                          score={data.metrics.health.hydration} 
                          size={50} 
                          strokeWidth={4} 
                          color={getScoreColor(data.metrics.health.hydration)} 
                        />
                        <span className="text-sm font-medium">{data.metrics.health.hydration}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-700">Uniformity</span>
                      <div className="flex items-center gap-3">
                        <CircularProgress 
                          score={data.metrics.health.uniformity} 
                          size={50} 
                          strokeWidth={4} 
                          color={getScoreColor(data.metrics.health.uniformity)} 
                        />
                        <span className="text-sm font-medium">{data.metrics.health.uniformity}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Third Part: Personalized Action Plan */}
        <div className="mb-12">
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Personalized Action Plan</h2>
            </div>
            <p className="text-gray-600 mb-6">Your daily steps to achieving your skin goals</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Daily Routine */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  </div>
                  <h3 className="font-bold text-gray-900">Daily Routine</h3>
                </div>
                <div className="space-y-3">
                  {data.recommendations.dailyRoutine.map((item, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="w-4 h-4 bg-gray-200 rounded-full"></div>
                      <span className="text-sm text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Weekly Actions */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h3 className="font-bold text-gray-900">Weekly Actions</h3>
                </div>
                <div className="space-y-3">
                  {data.recommendations.weeklyActions.map((item, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="w-4 h-4 bg-gray-200 rounded-full"></div>
                      <span className="text-sm text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Lifestyle Tips */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </div>
                  <h3 className="font-bold text-gray-900">Lifestyle Tips</h3>
                </div>
                <div className="space-y-3">
                  {data.recommendations.lifestyleTips.map((item, index) => (
                    <span key={index} className="block text-sm text-gray-700">{item}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Fourth Part: Recommended Products */}
        <div className="mb-12">
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Recommended Products</h2>
            </div>
            <p className="text-gray-600 mb-6">Products selected by our AI to address your specific skin needs.</p>
            
            {/* Product Categories */}
            <div className="flex items-center gap-8 mb-6">
              {productCategories.map((category, index) => (
                <div key={category} className="flex items-center gap-2">
                  {index > 0 && <div className="w-px h-8 bg-gray-300"></div>}
                  <button
                    onClick={() => setActiveProductCategory(category)}
                    className={`flex items-center gap-2 transition-all duration-200 ${
                      activeProductCategory === category 
                        ? 'opacity-100' 
                        : 'opacity-50 hover:opacity-75'
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 ${
                      activeProductCategory === category 
                        ? 'bg-[#22747D]' 
                        : 'border-2 border-gray-300'
                    }`}>
                      <svg className={`w-5 h-5 ${
                        activeProductCategory === category 
                          ? 'text-white' 
                          : 'text-gray-400'
                      }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                    </div>
                    <span className={`font-medium transition-colors duration-200 ${
                      activeProductCategory === category 
                        ? 'text-gray-900' 
                        : 'text-gray-500'
                    }`}>{category}</span>
                  </button>
                </div>
              ))}
            </div>

            {/* Products Display */}
            <div className="border-2 border-blue-500 rounded-lg p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product, index) => (
                  <div key={index} className="bg-white border border-gray-200 rounded-lg p-4">
                    <div className="w-full h-32 bg-gray-100 rounded-lg mb-3 flex items-center justify-center">
                      <span className="text-gray-500 text-sm">Product Image</span>
                    </div>
                    <h4 className="font-semibold text-gray-900 text-sm mb-1">{product.name}</h4>
                    <p className="text-gray-500 text-xs mb-2">{product.volume}</p>
                    <p className="text-[#22747D] text-xs mb-3">{product.targetConcern}</p>
                    <button className="w-full bg-[#22747D] text-white text-sm py-2 rounded-lg hover:bg-[#1a5a61] transition-colors">
                      Learn more
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Fifth Part: Persuasion to Talk to Dermatologist */}
        <div className="mb-12">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Journey to Glowing Skin Continues</h2>
                <p className="text-gray-700 mb-6">Come back for a new analysis in 8-10 weeks to track your beautiful progress with pigmentation and hydration.</p>
                <button className="flex items-center gap-2 px-6 py-3 bg-[#22747D] text-white rounded-lg hover:bg-[#1a5a61] transition-colors font-medium">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  Talk to Dermatologist
                </button>
              </div>
              <div className="hidden lg:block">
                <div className="w-full h-64 bg-gray-200 rounded-lg flex items-center justify-center">
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