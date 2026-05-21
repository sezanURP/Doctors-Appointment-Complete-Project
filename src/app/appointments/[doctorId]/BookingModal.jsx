// src/app/appointments/[id]/BookingModal.jsx
"use client";

import { useState } from "react";
import { useSession } from "@/lib/auth-client";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function BookingModal({ doctor }) {
  const { data: session } = useSession();
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const [bookingData, setBookingData] = useState({
    patientName: "",
    phone: "",
    appointmentDate: "",
    appointmentTime: doctor?.availability?.[0] || ""
  });

  const handleBooking = async (e) => {
    e.preventDefault();
    if (!session) {
      toast.error("Please login to book an appointment");
      router.push("/login");
      return;
    }

    const finalData = {
      userEmail: session.user.email,
      doctorName: doctor.name,
      ...bookingData
    };

    // TODO: Send finalData to your MongoDB via POST request here
    console.log("Booking Data:", finalData);
    
    toast.success("Appointment booked successfully!");
    setIsModalOpen(false);
    router.push("/dashboard");
  };

  return (
    <>
      <button 
        onClick={() => setIsModalOpen(true)} 
        className="w-full sm:w-auto bg-teal-600 hover:bg-teal-700 text-white text-lg font-semibold py-4 px-10 rounded-xl transition-all shadow-md hover:shadow-lg"
      >
        Book Appointment
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl p-6 sm:p-8">
            <h2 className="text-2xl font-bold mb-6 text-slate-800">Book {doctor.name}</h2>
            
            <form onSubmit={handleBooking} className="space-y-4">
              <input type="text" placeholder="Patient Name" required className="w-full px-4 py-3 border rounded-xl" onChange={(e)=>setBookingData({...bookingData, patientName: e.target.value})} />
              <input type="tel" placeholder="Phone Number" required className="w-full px-4 py-3 border rounded-xl" onChange={(e)=>setBookingData({...bookingData, phone: e.target.value})} />
              <input type="date" required className="w-full px-4 py-3 border rounded-xl" onChange={(e)=>setBookingData({...bookingData, appointmentDate: e.target.value})} />
              
              <select className="w-full px-4 py-3 border rounded-xl bg-white" onChange={(e)=>setBookingData({...bookingData, appointmentTime: e.target.value})}>
                {doctor.availability?.map((time, i) => (
                  <option key={i} value={time}>{time}</option>
                ))}
              </select>
              
              <div className="flex gap-4 mt-8">
                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 py-3 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl">Cancel</button>
                <button type="submit" className="flex-1 py-3 px-4 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-xl">Confirm (৳{doctor.fee})</button>
              </div>
            </form>

          </div>
        </div>
      )}
    </>
  );
}