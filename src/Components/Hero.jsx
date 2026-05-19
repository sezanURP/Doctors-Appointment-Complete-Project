import React from 'react';
import Link from 'next/link';

const HeroSection = () => {
  return (
    <section className="relative w-full h-[600px] flex items-center justify-center">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('https://images.pexels.com/photos/5327656/pexels-photo-5327656.jpeg?auto=compress&cs=tinysrgb&w=1920')" }}
      >
        <div className="absolute inset-0 bg-slate-900/70"></div> {/* Dark Overlay */}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-2xl text-left">
          <div className="inline-block px-4 py-1.5 mb-6 rounded-full bg-slate-800/50 border border-slate-600 text-slate-200 text-sm font-medium backdrop-blur-sm">
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              VERIFIED HEALTHCARE
            </span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight mb-6">
            Your Health, <br className="hidden md:block"/> Our Priority
          </h1>
          
          <p className="text-lg md:text-xl text-slate-200 mb-8 max-w-xl">
            Trusted clinics, real reviews, and seamless management of every appointment.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <Link href="/doctors" className="bg-teal-500 hover:bg-teal-600 text-white px-8 py-3 rounded-lg font-medium transition-all text-center flex items-center justify-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
              Browse Doctors
            </Link>
            <Link href="/dashboard" className="bg-transparent border border-slate-400 hover:bg-slate-800 text-white px-8 py-3 rounded-lg font-medium transition-all text-center flex items-center justify-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
              My Bookings
            </Link>
          </div>

          {/* Stats Floating Bar */}
          <div className="flex items-center gap-8 text-white">
            <div>
              <div className="text-3xl font-bold text-teal-400 flex items-center gap-2">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
                500+
              </div>
              <p className="text-slate-300 text-sm mt-1">Verified Doctors</p>
            </div>
            <div className="w-px h-12 bg-slate-600"></div>
            <div>
              <div className="text-3xl font-bold text-yellow-400 flex items-center gap-2">
                <svg className="w-6 h-6 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                4.9
              </div>
              <p className="text-slate-300 text-sm mt-1">Avg. Rating</p>
            </div>
            <div className="w-px h-12 bg-slate-600 hidden sm:block"></div>
            <div className="hidden sm:block">
              <div className="text-3xl font-bold text-teal-400 flex items-center gap-2">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                50k+
              </div>
              <p className="text-slate-300 text-sm mt-1">Appointments</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;