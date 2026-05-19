"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

// আপনার আগের জেনারেট করা JSON থেকে টপ ৩ জন ডাক্তারের ডেটা
const topDoctorsData = [
  {
    id: "doc_002",
    name: "Dr. Sarah Johnson",
    specialty: "Dermatologist",
    degree: "MBBS, DDVL",
    consultationFee: 1000,
    rating: 4.9,
    totalReviews: 320,
    image: "https://images.pexels.com/photos/4173251/pexels-photo-4173251.jpeg?auto=compress&cs=tinysrgb&w=600"
  },
  {
    id: "doc_008",
    name: "Dr. Olivia Anderson",
    specialty: "Gynecologist",
    degree: "MBBS, DGO, MD",
    consultationFee: 1000,
    rating: 4.9,
    totalReviews: 412,
    image: "https://images.pexels.com/photos/5452293/pexels-photo-5452293.jpeg?auto=compress&cs=tinysrgb&w=600"
  },
  {
    id: "doc_013",
    name: "Dr. Richard Martin",
    specialty: "Gastroenterologist",
    degree: "MBBS, DM",
    consultationFee: 1400,
    rating: 4.9,
    totalReviews: 340,
    image: "https://images.pexels.com/photos/4225880/pexels-photo-4225880.jpeg?auto=compress&cs=tinysrgb&w=600"
  }
];

const TopDoctors = () => {
  const router = useRouter();
  // Simulated Auth State (আপনার প্রজেক্টের রিয়েল auth context দিয়ে রিপ্লেস করবেন)
  const [isLoggedIn, setIsLoggedIn] = useState(false); 

  const handleViewDetails = (doctorId) => {
    if (isLoggedIn) {
      router.push(`/doctors/${doctorId}`);
    } else {
      // ইউজার লগইন না থাকলে লগইন পেজে পাঠাবে এবং সাথে রিটার্ন URL দিয়ে দিতে পারেন
      router.push('/login'); 
    }
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">Top Rated Doctors</h2>
          <p className="text-slate-500 max-w-2xl mx-auto">
            Book appointments with our most trusted and highly reviewed medical professionals.
          </p>
          
          {/* টেস্টিংয়ের জন্য Auth টগল বাটন (প্রোডাকশনে ডিলিট করে দেবেন) */}
          <button 
            onClick={() => setIsLoggedIn(!isLoggedIn)}
            className="mt-4 text-xs bg-slate-100 px-3 py-1 rounded text-slate-600 hover:bg-slate-200"
          >
            Test Mode: Currently {isLoggedIn ? 'Logged IN' : 'Logged OUT'} (Click to toggle)
          </button>
        </div>

        {/* Doctors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {topDoctorsData.map((doctor) => (
            <div key={doctor.id} className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-4 mb-6">
                <div className="relative w-20 h-20 rounded-xl overflow-hidden shadow-sm">
                  <Image src={doctor.image} alt={doctor.name} fill className="object-cover" sizes="80px" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-800">{doctor.name}</h3>
                  <p className="text-teal-600 font-medium text-sm">{doctor.specialty}</p>
                  <p className="text-slate-500 text-xs mt-1">{doctor.degree}</p>
                </div>
              </div>
              
              <div className="flex justify-between items-center py-4 border-t border-b border-slate-50 mb-6">
                <div className="flex items-center gap-1">
                  <svg className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                  <span className="font-bold text-slate-700">{doctor.rating}</span>
                  <span className="text-slate-400 text-sm">({doctor.totalReviews})</span>
                </div>
                <div className="text-right">
                  <span className="text-slate-400 text-sm block">Consultation</span>
                  <span className="font-bold text-slate-800">৳{doctor.consultationFee}</span>
                </div>
              </div>

              <button 
                onClick={() => handleViewDetails(doctor.id)}
                className="w-full bg-slate-50 hover:bg-teal-50 text-teal-600 border border-teal-100 font-semibold py-3 rounded-xl transition-colors"
              >
                View Details
              </button>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-10">
          <Link href="/appointments" className="inline-block bg-teal-500 hover:bg-teal-600 text-white px-8 py-3 rounded-lg font-medium transition-colors shadow-sm">
            See All Doctors
          </Link>
        </div>

      </div>
    </section>
  );
};

export default TopDoctors;