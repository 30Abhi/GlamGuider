'use client';

import SiteHeader from "../../components/SiteHeader";

export default function ConsultationsPage() {
  return (
    <div className="min-h-screen bg-white">
      <SiteHeader />

      <main className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="bg-white border border-gray-200 rounded-lg p-4 sm:p-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
            Expert Dermatologist Consultations
          </h1>
          <p className="text-gray-600 mb-6 sm:mb-8 text-sm sm:text-base">
            Find and book appointments with our network of board-certified skin specialists.
          </p>

          {/* Table header */}
          <div className="hidden md:grid grid-cols-12 px-4 py-3 text-xs font-semibold text-gray-600 uppercase tracking-wide">
            <div className="col-span-3">Name</div>
            <div className="col-span-3">Clinic</div>
            <div className="col-span-2">Experience</div>
            <div className="col-span-3">Contact</div>
            <div className="col-span-1 text-right">Coupon code</div>
          </div>
          <div className="hidden md:block h-px bg-gray-200" />

          {/* Rows - static placeholders for now */}
          {Array.from({ length: 3 }).map((_, idx) => (
            <div key={idx} className="px-4">
              <div className="grid grid-cols-1 md:grid-cols-12 items-center gap-4 py-4">
                {/* Name */}
                <div className="col-span-3 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-200" />
                  <div>
                    <div className="font-semibold text-gray-900 text-sm">Dr. Priya Sharma</div>
                    <div className="text-xs text-gray-500">MD</div>
                  </div>
                </div>

                {/* Clinic */}
                <div className="col-span-3 text-sm text-gray-700">
                  <div className="font-medium">The Skin Clinic</div>
                  <div className="text-xs text-gray-500">Indiranagar</div>
                </div>

                {/* Experience */}
                <div className="col-span-2">
                  <span className="inline-flex items-center px-2 py-1 rounded-full bg-gray-100 text-gray-700 text-xs font-medium">
                    8+ years
                  </span>
                </div>

                {/* Contact */}
                <div className="col-span-3 text-sm text-gray-700">
                  <div>Practo</div>
                  <div className="text-xs text-gray-500">+91 999999 9999</div>
                </div>

                {/* Coupon */}
                <div className="col-span-1 flex md:justify-end">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center px-2 py-1 rounded bg-gray-100 text-gray-700 text-xs border border-gray-200">GLAMGUIDER20</span>
                    <button aria-label="Copy code" className="p-1 rounded hover:bg-gray-50 border border-gray-200">
                      <svg className="w-4 h-4 text-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>

              <div className="h-px bg-gray-200" />
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}


