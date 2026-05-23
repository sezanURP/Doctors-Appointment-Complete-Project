
"use client";

import { useState } from "react";
import { authClient, useSession } from "@/lib/auth-client";
import { toast } from "react-toastify";


export default function BookingModal({ doctor }) {
  const { data: session } = authClient.useSession();
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    patientName: "",
    gender: "Male",
    phone: "",
    date: "",
    time: "",
    reason: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const appointmentData = {
      userEmail: session?.user?.email,
      doctorId: doctor._id,
      doctorName: doctor.name,
      ...formData,
    };

    try {
      const { data: tokenData } = await authClient.token();
      console.log("JWT Token in BookingModal:", tokenData?.token);

      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/bookings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${tokenData?.token}` 
        },
        body: JSON.stringify(appointmentData),
      });

      const result = await res.json();

   
      if (!res.ok || result.success === false) {
      
        toast.error(result.message || "Failed to book appointment.");
        return; 
      }

      
      if (result.insertedId) {
        toast.success("Appointment Booked Successfully!");
        setIsOpen(false); 
      }

    } catch (error) {
      console.error("Error booking appointment:", error);
      toast.error("Server error. Please try again later.");
    }
  };




  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="w-full md:w-auto bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition-all shadow-md"
      >
        Book Appointment
      </button>


      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm animate-in fade-in duration-1500">
          
          {/* Modal Container: Flex Col + Max Height 90vh */}
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg flex flex-col max-h-[90vh] relative overflow-hidden p-6">
            
            {/* 1. Header (সবার উপরে ফিক্সড থাকবে) */}
            <div className="px-6 py-5 border-b border-slate-100 flex justify-between items-center bg-teal-300 flex-shrink-0 z-10">
              <div>
                <h2 className="text-xl font-bold text-slate-800">Book Appointment</h2>
        
                <p className="text-sm text-slate-500">with {doctor.name}</p>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-red-500 transition-colors p-2 bg-slate-50 rounded-full hover:bg-red-50">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
              </button>
            </div>
            <br />

            {/* Form wrapper */}
            <form onSubmit={handleSubmit} className="flex flex-col flex-1 overflow-hidden">
              
              {/* 2. Scrollable Body (শুধুমাত্র এই অংশটি স্ক্রল হবে) */}
              <div className="px-6 py-6 overflow-y-auto flex-1 space-y-5">
                
                {/* Read Only Fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">User Email</label>
                    <input type="email" value={session?.user?.email || "Not logged in"} disabled className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-500 cursor-not-allowed" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Doctor</label>
                    <input type="text" value={doctor.name} disabled className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-500 cursor-not-allowed truncate" />
                  </div>
                </div>

                {/* Inputs */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Patient Name <span className="text-red-500">*</span></label>
                  <input type="text" name="patientName" required placeholder="Full name" onChange={handleChange} className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none transition-all" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Gender <span className="text-red-500">*</span></label>
                    <select name="gender" required onChange={handleChange} className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none bg-white transition-all">
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Phone <span className="text-red-500">*</span></label>
                    <input type="tel" name="phone" required placeholder="01XXXXXXXXX" onChange={handleChange} className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none transition-all" />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Date <span className="text-red-500">*</span></label>
                    <input type="date" name="date" required onChange={handleChange} className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none transition-all" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Time <span className="text-red-500">*</span></label>
                    <input type="time" name="time" required onChange={handleChange} className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none transition-all" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Reason (optional)</label>
                  <textarea name="reason" rows="2" placeholder="Brief reason for visit" onChange={handleChange} className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none transition-all resize-none"></textarea>
                </div>

              </div>

              {/* 3. Footer / Submit Button (সবার নিচে ফিক্সড থাকবে) */}
              <div className="px-6 py-10 border-t border-slate-100 bg-slate-50 flex-shrink-0 z-10">
                <button type="submit" className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-6 rounded-xl transition-all shadow-md hover:shadow-lg flex justify-center items-center gap-2">
                  <span>Confirm Booking</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                </button>
              </div>

            </form>

          </div>
        </div>
      )}
    </>
  );
}