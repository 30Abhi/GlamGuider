'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import SiteHeader from "../../components/SiteHeader";

type Step1 = {
  ageGroup: string;
  gender: string;
  tone: string;
  skinType: string;
};

type Step2 = {
  primaryConcern: string;
  breakoutFrequency: string;
  breakoutAreas: string;
  hotWeatherReaction: string;
  coldWeatherReaction: string;
  productSensitivity: string;
};

type Step3 = {
  sunExposure: string;
  sunscreenConsistency: string;
  waterIntake: string;
  routineType: string;
  exfoliation: string;
};

type Answers = {
  step: number;
  step1: Step1;
  step2: Step2;
  step3: Step3;
};

const initialAnswers: Answers = {
  step: 1,
  step1: { ageGroup: '', gender: '', tone: '', skinType: '' },
  step2: { primaryConcern: '', breakoutFrequency: '', breakoutAreas: '', hotWeatherReaction: '', coldWeatherReaction: '', productSensitivity: '' },
  step3: { sunExposure: '', sunscreenConsistency: '', waterIntake: '', routineType: '', exfoliation: '' }
};

const QuestionButton = ({ label, selected, onClick }: { label: string; selected: boolean; onClick: () => void; }) => (
  <button type="button" onClick={onClick} className={`w-full text-left px-3 py-2 rounded border transition-colors ${selected ? 'bg-green-50 border-green-600 text-green-800' : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'}`}>{label}</button>
);

export default function QuestionnairePage() {
  const router = useRouter();
  const [answers, setAnswers] = useState<Answers>(initialAnswers);

  // Hydrate from localStorage if exists
  useEffect(() => {
    try {
      const raw = localStorage.getItem('glam_questionnaire');
      if (raw) {
        const parsed = JSON.parse(raw);
        setAnswers({ ...initialAnswers, ...parsed });
      }
    } catch {}
  }, []);

  const setField = (stepKey: 'step1' | 'step2' | 'step3', field: string, value: string) => {
    setAnswers(prev => ({ ...prev, [stepKey]: { ...prev[stepKey], [field]: value } }));
  };

  const isStepValid = useMemo(() => {
    if (answers.step === 1) {
      const s = answers.step1; return !!(s.ageGroup && s.gender && s.tone && s.skinType);
    }
    if (answers.step === 2) {
      const s = answers.step2; return !!(s.primaryConcern && s.breakoutFrequency && s.breakoutAreas && s.hotWeatherReaction && s.coldWeatherReaction && s.productSensitivity);
    }
    const s = answers.step3; return !!(s.sunExposure && s.sunscreenConsistency && s.waterIntake && s.routineType && s.exfoliation);
  }, [answers]);

  const handleContinue = () => {
    if (!isStepValid) return;
    if (answers.step < 3) {
      setAnswers(prev => ({ ...prev, step: prev.step + 1 }));
      return;
    }
    // submit
    try {
      localStorage.setItem('user_questionnaire', JSON.stringify(answers));
    } catch {}
    router.push('/loading');
  };

  const handleBack = () => {
    if (answers.step > 1) setAnswers(prev => ({ ...prev, step: prev.step - 1 }));
  };

  return (
    <div className="min-h-screen bg-white">
      <SiteHeader />
      <main className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="bg-white border border-gray-200 rounded-lg p-4 sm:p-6">
          {/* Header */}
          <div className="text-center mb-6">
            <div className="w-10 h-10 rounded-full bg-gray-100 mx-auto mb-2 flex items-center justify-center">
              <svg className="w-5 h-5 text-gray-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="7" r="4"></circle><path d="M5.5 21a6.5 6.5 0 0 1 13 0"></path></svg>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">{answers.step === 1 ? 'Your Basic Profile' : answers.step === 2 ? 'Tell Us About Your Skin' : 'Your Lifestyle & Routine'}</h1>
            <p className="text-gray-600 text-sm mt-1">Step {answers.step} of 3</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Questions */}
            <div className="lg:col-span-2">
              {answers.step === 1 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">What is your age group?</h3>
                    {['Under 18', '18–25', '26–40', '40+'].map(opt => (
                      <div key={opt} className="mb-2">
                        <QuestionButton label={opt} selected={answers.step1.ageGroup === opt} onClick={() => setField('step1', 'ageGroup', opt)} />
                      </div>
                    ))}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">What is your gender?</h3>
                    {['Female', 'Male', 'Non-binary / Other', 'Prefer not to say'].map(opt => (
                      <div key={opt} className="mb-2">
                        <QuestionButton label={opt} selected={answers.step1.gender === opt} onClick={() => setField('step1', 'gender', opt)} />
                      </div>
                    ))}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">Which tone best describes your skin?</h3>
                    {['Very Fair (Type I–II)', 'Wheatish / Light Brown (Type III–IV)', 'Medium Brown (Type V)', 'Deep Brown (Type VI)'].map(opt => (
                      <div key={opt} className="mb-2">
                        <QuestionButton label={opt} selected={answers.step1.tone === opt} onClick={() => setField('step1', 'tone', opt)} />
                      </div>
                    ))}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">What is your natural skin type?</h3>
                    {['Dry', 'Oily', 'Combination', 'Normal / Balanced'].map(opt => (
                      <div key={opt} className="mb-2">
                        <QuestionButton label={opt} selected={answers.step1.skinType === opt} onClick={() => setField('step1', 'skinType', opt)} />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {answers.step === 2 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">What is your primary skin concern?</h3>
                    {['Pigmentation & Uneven Tone', 'Fine Lines & Wrinkles', 'Texture & Radiance (e.g., pores, dullness)', 'Breakouts & Sensitivity'].map(opt => (
                      <div key={opt} className="mb-2">
                        <QuestionButton label={opt} selected={answers.step2.primaryConcern === opt} onClick={() => setField('step2', 'primaryConcern', opt)} />
                      </div>
                    ))}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">How often do you experience breakouts?</h3>
                    {['Rarely / Never', 'Occasionally', 'Frequently', 'Persistently'].map(opt => (
                      <div key={opt} className="mb-2">
                        <QuestionButton label={opt} selected={answers.step2.breakoutFrequency === opt} onClick={() => setField('step2', 'breakoutFrequency', opt)} />
                      </div>
                    ))}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">Where are your breakouts most common?</h3>
                    {['T-Zone', 'Cheeks & Jawline', 'All Over Face', 'Face & Body'].map(opt => (
                      <div key={opt} className="mb-2">
                        <QuestionButton label={opt} selected={answers.step2.breakoutAreas === opt} onClick={() => setField('step2', 'breakoutAreas', opt)} />
                      </div>
                    ))}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">How does your skin react in hot, humid weather?</h3>
                    {['Becomes Oily / Greasy', 'More Prone to Breakouts', 'Feels Dry or Irritated', 'No Major Change'].map(opt => (
                      <div key={opt} className="mb-2">
                        <QuestionButton label={opt} selected={answers.step2.hotWeatherReaction === opt} onClick={() => setField('step2', 'hotWeatherReaction', opt)} />
                      </div>
                    ))}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">How does your skin react in cold, dry weather?</h3>
                    {['Becomes Very Dry & Flaky', 'Looks Dull or Uneven', 'More Prone to Breakouts', 'No Major Change'].map(opt => (
                      <div key={opt} className="mb-2">
                        <QuestionButton label={opt} selected={answers.step2.coldWeatherReaction === opt} onClick={() => setField('step2', 'coldWeatherReaction', opt)} />
                      </div>
                    ))}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">How sensitive is your skin to new products?</h3>
                    {['Resilient (Not sensitive)', 'Slightly Reactive', 'Sensitive', 'Very Sensitive'].map(opt => (
                      <div key={opt} className="mb-2">
                        <QuestionButton label={opt} selected={answers.step2.productSensitivity === opt} onClick={() => setField('step2', 'productSensitivity', opt)} />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {answers.step === 3 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">On average, how much direct sun exposure do you get per day?</h3>
                    {['Less than 1 Hour', '1 to 3 Hours', '3 to 5 Hours', 'More than 5 Hours'].map(opt => (
                      <div key={opt} className="mb-2">
                        <QuestionButton label={opt} selected={answers.step3.sunExposure === opt} onClick={() => setField('step3', 'sunExposure', opt)} />
                      </div>
                    ))}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">How consistently do you wear sunscreen?</h3>
                    {['Every Day', 'Most Days', 'Occasionally', 'Rarely / Never'].map(opt => (
                      <div key={opt} className="mb-2">
                        <QuestionButton label={opt} selected={answers.step3.sunscreenConsistency === opt} onClick={() => setField('step3', 'sunscreenConsistency', opt)} />
                      </div>
                    ))}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">How much water do you typically drink per day?</h3>
                    {['Less than 1 Liter', '1 to 2 Liters', '2 to 3 Liters', 'More than 3 Liters'].map(opt => (
                      <div key={opt} className="mb-2">
                        <QuestionButton label={opt} selected={answers.step3.waterIntake === opt} onClick={() => setField('step3', 'waterIntake', opt)} />
                      </div>
                    ))}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">How would you describe your current skincare routine?</h3>
                    {['Minimalist', 'Basic', 'Multi-Step', 'Advanced'].map(opt => (
                      <div key={opt} className="mb-2">
                        <QuestionButton label={opt} selected={answers.step3.routineType === opt} onClick={() => setField('step3', 'routineType', opt)} />
                      </div>
                    ))}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">How often do you exfoliate your skin?</h3>
                    {['Never', 'Once a Week', 'Twice a Week', 'More than Twice a Week'].map(opt => (
                      <div key={opt} className="mb-2">
                        <QuestionButton label={opt} selected={answers.step3.exfoliation === opt} onClick={() => setField('step3', 'exfoliation', opt)} />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-3">Overall Progress</h4>
                <ul className="space-y-2 text-sm">
                  <li className={`flex items-center gap-2 ${answers.step > 1 ? 'text-green-700' : 'text-gray-700'}`}>
                    <span className={`w-5 h-5 rounded-full border flex items-center justify-center ${answers.step > 1 ? 'bg-green-600 border-green-700 text-white' : 'bg-white border-gray-300'}`}>{answers.step > 1 ? '✓' : '1'}</span>
                    Basic Profile
                  </li>
                  <li className={`flex items-center gap-2 ${answers.step > 2 ? 'text-green-700' : 'text-gray-700'}`}>
                    <span className={`w-5 h-5 rounded-full border flex items-center justify-center ${answers.step > 2 ? 'bg-green-600 border-green-700 text-white' : 'bg-white border-gray-300'}`}>{answers.step > 2 ? '✓' : '2'}</span>
                    Tell Us About Your Skin
                  </li>
                  <li className={`flex items-center gap-2 text-gray-700`}>
                    <span className={`w-5 h-5 rounded-full border flex items-center justify-center ${answers.step === 3 ? 'bg-green-100 border-green-300' : 'bg-white border-gray-300'}`}>3</span>
                    Your Lifestyle & Routine
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between mt-6">
            <button type="button" onClick={handleBack} className="px-4 py-2 rounded border border-gray-300 text-gray-700 bg-white hover:bg-gray-50" disabled={answers.step === 1}>Back</button>
            <button type="button" onClick={handleContinue} disabled={!isStepValid} className={`px-5 py-2 rounded text-white ${isStepValid ? 'bg-[#007237] hover:bg-[#00662f]' : 'bg-gray-300 cursor-not-allowed'}`}>{answers.step === 3 ? 'Submit' : 'Continue'}</button>
          </div>
        </div>
      </main>
    </div>
  );
}


