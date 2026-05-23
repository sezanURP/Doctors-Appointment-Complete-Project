// src/Components/TopRate.jsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client"; 

const TopRate = ({ doctors }) => {
  const { data: session } = useSession();
  const router = useRouter();

  const handleViewDetails = (doctorId) => {
    if (session) {
      // লগইন থাকলে ডিটেইলস পেজে যাবে
      router.push(`/doctors/${doctorId}`);
    } else {
      // লগইন না থাকলে রিডাইরেক্ট লিংকসহ লগইন পেজে যাবে
      router.push(`/login?redirect=/doctors/${doctorId}`);
    }
  };
console.log("Top Rated Doctors:", doctors); // ডেটা চেক করার জন্য লগ
  if (!doctors || doctors.length === 0) return null;

  return (
    <div className="py-16 bg-slate-50">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-slate-800 mb-10">
          Top Rated Doctors
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {doctors.map((doctor) => (
            <div key={doctor._id} className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-md transition">
              <div className="relative h-60 w-full bg-slate-100">
                {doctor.image && (
                  <Image className="object-cover" src={doctor.image} alt={doctor.name} height={200} width={200} />
                )}
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold text-slate-800">{doctor.name}</h3>
                  <span className="flex items-center text-sm font-bold text-slate-700 bg-yellow-100 px-2 py-1 rounded-md">
                    ⭐ {doctor.rating}
                  </span>
                </div>
                
                <p className="text-teal-600 font-medium text-sm mb-4">{doctor.specialty}</p>
                <p className="text-slate-500 text-sm mb-6 line-clamp-2">{doctor.description}</p>
                
                <button 
                  onClick={() => handleViewDetails(doctor._id)}
                  className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 rounded-xl transition"
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopRate;