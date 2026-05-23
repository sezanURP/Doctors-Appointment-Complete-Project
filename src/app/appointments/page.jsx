

import { Suspense } from "react";
import AllAppointment from "@/Components/AllAppointment";
import SearchBar from "@/Components/SearchBar";
import { getAllDoctors } from "@/lib/doctors/db";

export default async function AppointmentsPage({ searchParams }) {
  const resolvedParams = await searchParams;
  const searchKeyword = resolvedParams?.search || "";


  const doctors = await getAllDoctors(searchKeyword);

  return (
    <div className="bg-slate-50 min-h-screen py-10">
      <div className="max-w-6xl mx-auto px-4">
  
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-slate-800 mb-2">All Appointments</h1>
          <p className="text-slate-500">Find the right doctor for you.</p>
        </div>

      
        <Suspense fallback={<div className="h-14 w-full max-w-2xl mx-auto bg-slate-200 animate-pulse rounded-full mb-10"></div>}>
          <SearchBar />
        </Suspense>

        {/* যদি সার্চ করা হয়, তবে একটি ছোট মেসেজ দেখাবে (ঐচ্ছিক) */}
        {searchKeyword && doctors.length > 0 && (
          <h2 className="text-lg font-bold text-teal-600 mb-6 text-center">
            Showing Results for {searchKeyword}
          </h2>
        )}

        {/* Doctor Cards বা Error Message */}
        {doctors.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl shadow-sm border border-slate-100 max-w-2xl mx-auto">
             <h3 className="text-xl font-bold text-slate-600 mb-2">No doctors found</h3>
             <p className="text-slate-500">We couldn't find any doctor matching {searchKeyword}.</p>
          </div>
        ) : (
          <AllAppointment doctors={doctors} />
        )}

      </div>
    </div>
  );
}

