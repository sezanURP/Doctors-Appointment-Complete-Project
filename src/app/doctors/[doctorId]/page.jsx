
import Image from "next/image";
import Link from "next/link";
import { getDoctorById } from "@/lib/doctors/db";
import BookingModal from "./BookingModal";

export default async function DoctorDetailsPage({ params }) {
  const resolvedParams = await params;
  const targetId = resolvedParams.id || resolvedParams.doctorId;
  
  const doctor = await getDoctorById(targetId);

  if (!doctor) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50">
        <h2 className="text-2xl font-bold text-slate-800 mb-4">Doctor Not Found</h2>
        <Link href="/appointments" className="text-teal-600 hover:underline">Go back to all appointments</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden p-6 md:p-10">
          <div className="flex flex-col md:flex-row gap-10">
            
            {/* Left Side: Image */}
            <div className="w-full md:w-1/3 flex-shrink-0">
              <div className="relative  rounded-2xl overflow-hidden shadow-md">
                {doctor.image && (
                  <Image 
                    src={doctor.image} 
                    alt={doctor.name} 
               
                    priority 
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                    width={500} height={500}
                  />
                )}
              </div>
            </div>

            {/* Right Side: Information */}
            <div className="w-full md:w-2/3 flex flex-col justify-center">
              
              <div className="mb-4">
                <span className="inline-block px-3 py-1 bg-teal-50 text-teal-600 text-xs font-semibold rounded-full mb-3 border border-teal-100">
                  {doctor.specialty}
                </span>
                <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-2">{doctor.name}</h1>
                
                <div className="flex items-center gap-1 text-sm font-medium text-slate-600">
                  <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                  {doctor.rating || "4.9"} / 5.0
                </div>
              </div>

              <p className="text-slate-600 leading-relaxed mb-8 max-w-2xl">
                {doctor.description || `Highly experienced ${doctor.specialty?.toLowerCase()} specializing in preventive care and patient-centered treatment.`}
              </p>

              {/* 4 Info Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                <div className="flex items-center gap-4 p-4 rounded-xl border border-slate-100 bg-white shadow-sm">
                   <div className="bg-teal-50 p-2.5 rounded-lg text-teal-600">
                     <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                   </div>
                   <div>
                     <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">Experience</p>
                     <p className="font-semibold text-slate-800">{doctor.experience}</p>
                   </div>
                </div>

                <div className="flex items-center gap-4 p-4 rounded-xl border border-slate-100 bg-white shadow-sm">
                   <div className="bg-teal-50 p-2.5 rounded-lg text-teal-600">
                     <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>
                   </div>
                   <div>
                     <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">Hospital</p>
                     <p className="font-semibold text-slate-800 truncate max-w-[150px]">{doctor.hospital}</p>
                   </div>
                </div>

                <div className="flex items-center gap-4 p-4 rounded-xl border border-slate-100 bg-white shadow-sm">
                   <div className="bg-teal-50 p-2.5 rounded-lg text-teal-600">
                     <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                   </div>
                   <div>
                     <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">Location</p>
                     <p className="font-semibold text-slate-800">{doctor.location}</p>
                   </div>
                </div>

                <div className="flex items-center gap-4 p-4 rounded-xl border border-slate-100 bg-white shadow-sm">
                   <div className="bg-teal-50 p-2.5 rounded-lg text-teal-600">
                     <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path></svg>
                   </div>
                   <div>
                     <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">Consultation Fee</p>
                     <p className="font-semibold text-slate-800">৳{doctor.fee}</p>
                   </div>
                </div>
              </div>

              {/* Availability Badges (যদি ডাটাবেজে থাকে) */}
              {doctor.availability && (
                <div className="mb-8">
                  <p className="text-sm font-semibold text-slate-800 mb-3">Availability</p>
                  <div className="flex flex-wrap gap-2">
                    {doctor.availability.map((time, idx) => (
                      <span key={idx} className="px-4 py-1.5 text-xs font-medium text-teal-700 bg-teal-50 border border-teal-200 rounded-full">
                        {time}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* এখানে আপনার নতুন বানানো Client Modal Component-টি রেন্ডার করা হলো */}
              <div>
                <BookingModal doctor={doctor} />
              </div>

            </div>
          </div>
        </div>

      </div>
    </div>
  );
}