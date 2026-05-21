// src/app/appointments/[doctorId]/page.jsx
import Image from "next/image";
import Link from "next/link";
import { getDoctorById } from "@/lib/doctors/db";
import BookingModal from "./BookingModal"; // Client Component ইমপোর্ট করা হলো

// এটি একটি Server Component
export default async function DoctorDetailsPage({ params }) {
  const { doctorId } = params;
  
  // সার্ভার থেকে সরাসরি ডেটা ফেচ করা হচ্ছে
  const doctor = await getDoctorById(doctorId);
  console.log("Fetched Doctor Details:", doctor);

  if (!doctor) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50">
        <h2 className="text-2xl font-bold text-slate-800 mb-4">Doctor Not Found</h2>
        <Link href="/appointments" className="text-teal-600 hover:underline">
          Go back to all appointments
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <Link href="/appointments" className="inline-flex items-center gap-2 text-slate-500 hover:text-teal-600 mb-8 transition-colors">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
          Back to Doctors
        </Link>

        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-8">
            
            {/* Left Side: Image */}
            <div className="col-span-1 space-y-6">
              <div className="relative h-80 w-full rounded-2xl overflow-hidden shadow-sm bg-slate-100">
                {doctor.image && (
                  <Image 
                    src={doctor.image} 
                    alt={doctor.name} 
                    fill 
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                )}
              </div>
            </div>

            {/* Right Side: Information */}
            <div className="col-span-1 md:col-span-2 flex flex-col">
              <div className="mb-6">
                <span className="inline-block px-4 py-1.5 bg-teal-50 text-teal-700 text-sm font-bold rounded-full mb-3">
                  {doctor.specialty}
                </span>
                <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-2">{doctor.name}</h1>
                <p className="text-lg text-slate-600">{doctor.degree}</p>
              </div>

              <div className="space-y-6 flex-1">
                <div>
                  <h3 className="text-lg font-bold text-slate-800 mb-2">About Doctor</h3>
                  <p className="text-slate-600 leading-relaxed">{doctor.description}</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-100">
                    <p className="text-sm text-blue-600 font-semibold mb-1">Hospital/Clinic</p>
                    <p className="text-slate-800 font-medium">{doctor.hospital}</p>
                    <p className="text-slate-500 text-sm mt-1">{doctor.location}</p>
                  </div>
                  <div className="bg-teal-50/50 p-4 rounded-xl border border-teal-100">
                    <p className="text-sm text-teal-600 font-semibold mb-1">Consultation Fee</p>
                    <p className="text-2xl font-bold text-slate-800">৳{doctor.fee}</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-8 border-t border-slate-100">
                {/* ক্লায়েন্ট কম্পোনেন্ট (Booking Modal) এখানে ব্যবহার করা হলো এবং props হিসেবে ডাটা পাঠানো হলো */}
                <BookingModal doctor={doctor} />
              </div>

            </div>
          </div>
        </div>

      </div>
    </div>
  );
}