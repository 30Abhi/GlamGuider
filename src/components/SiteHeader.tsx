'use client';

export default function SiteHeader() {
  return (
    <header className="bg-white">
      <div className="mx-auto max-w-[1512px] w-full px-4 sm:px-6">
        <div className="h-16 sm:h-[88px] w-full flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src="/glamguider.png" alt="GlamGuider" className="h-6 sm:h-8 w-auto" />
          </div>
        </div>
        <div className="w-full h-0 border-b-2 border-[#F8F8F8]" />
      </div>
    </header>
  );
}


