"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { getDoctorById } from '@/lib/doctors/db';


export default function AllAppointmentsPage({ doctors }) {
  // const d = getDoctorById (id); // ডেটা ফেচ করার জন্য আপনার API কল বা ডেটাবেস কোয়েরি এখানে করবেন
  const router = useRouter();
  
  // 🔐 Simulated Auth State (আপনার আসল Auth Context/Redux দিয়ে এটি পরিবর্তন করবেন)
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // View Details বাটনে ক্লিক করলে এই ফাংশনটি কাজ করবে
  const handleViewDetails = (doctorId) => {
    if (isLoggedIn) {
      // ইউজার লগইন করা থাকলে ডক্টর ডিটেইলস পেজে যাবে
      router.push(`/doctors/${doctorId}`);
    } else {
      // ইউজার লগইন করা না থাকলে লগইন পেজে পাঠাবে
      // ?redirect যুক্ত করার সুবিধা হলো, লগইন করার পর ইউজারকে আবার আগের জায়গায় ফিরিয়ে আনা যায়
      router.push(`/login?redirect=/doctors/${doctorId}`);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header & Auth Toggle (For Testing) */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-10 border-b border-slate-200 pb-6">
          <div>
            <h1 className="text-3xl font-bold text-slate-800 mb-2">Available Appointments</h1>
            <p className="text-slate-500">Find and book appointments with our expert specialists.</p>
          </div>
          
          {/* ডেভেলপার টেস্টিংয়ের জন্য বাটন (প্রোডাকশনে মুছে ফেলবেন) */}
          <div className="mt-4 md:mt-0 p-3 bg-white border border-blue-100 rounded-lg shadow-sm">
            <span className="text-sm font-medium text-slate-600 mr-3">System Test:</span>
            <button 
              onClick={() => setIsLoggedIn(!isLoggedIn)}
              className={`px-4 py-1.5 rounded-md text-sm font-bold transition-colors ${
                isLoggedIn ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
              }`}
            >
              User is {isLoggedIn ? 'Logged In' : 'Logged Out'} (Click to Switch)
            </button>
          </div>
        </div>

        {/* 🏥 Responsive Grid Layout for Doctor Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {doctors.map((doctor) => (
            <div 
              key={doctor.id} 
              className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden flex flex-col hover:shadow-xl transition-all duration-300"
            >
              {/* Image Container */}
              <div className="relative h-56 w-full bg-slate-100">
                <Image 
                  src={doctor.image} 
                  alt={doctor.name} 
                  fill 
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                />
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-md text-xs font-bold text-slate-700 flex items-center gap-1 shadow-sm">
                  ⭐ {doctor.rating}
                </div>
              </div>

              {/* Card Content */}
              <div className="p-5 flex-1 flex flex-col">
                <div className="mb-3">
                  <span className="inline-block px-3 py-1 bg-teal-50 text-teal-600 text-xs font-bold rounded-full mb-2">
                    {doctor.specialty}
                  </span>
                  <h2 className="text-lg font-bold text-slate-800 line-clamp-1">{doctor.name}</h2>
                  <p className="text-sm text-slate-500 mt-1 line-clamp-1">{doctor.degree}</p>
                </div>

                {/* Additional Info */}
                <div className="space-y-2 mt-auto mb-5 text-sm text-slate-600">
                  <div className="flex items-start gap-2">
                    <svg className="w-4 h-4 mt-0.5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>
                    <span className="line-clamp-1">{doctor.hospital}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <svg className="w-4 h-4 mt-0.5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                    <span>Exp: {doctor.experience}</span>
                  </div>
                </div>

                {/* Footer / Action Section */}
                <div className="pt-4 border-t border-slate-50 flex items-center justify-between">
                  <div>
                    <p className="text-xs text-slate-400">Consultation Fee</p>
                    <p className="text-lg font-bold text-teal-600">৳{doctor.fee}</p>
                  </div>
                  
                  {/* The View Details Button */}
                  <button 
                    onClick={() => handleViewDetails(doctor._id)}
                    className="bg-slate-900 hover:bg-teal-600 text-white px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 shadow-sm hover:shadow-md"
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}