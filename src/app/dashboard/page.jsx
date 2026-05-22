// src/app/dashboard/page.jsx
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useSession } from "@/lib/auth-client"; // আপনার auth-client
import { authClient } from "@/lib/auth-client"; 
import toast from "react-hot-toast";

export default function DashboardPage() {
  const { data: session, isPending } = useSession();
  
  // States
  const [activeTab, setActiveTab] = useState("bookings"); // "bookings" or "profile"
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Modal States
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [profileData, setProfileData] = useState({ name: "", image: "" });

  // 1. Fetch Bookings (Logged-in user only)
  useEffect(() => {
    const fetchMyBookings = async () => {
      if (!session?.user?.email) return;
      
      try {
        setIsLoading(true);
        const { data: tokenData } = await authClient.token(); // JWT টোকেন নেওয়া
        
        // ব্যাকএন্ড থেকে শুধু এই ইউজারের বুকিং আনা হচ্ছে (email দিয়ে কুয়েরি করে)
        const res = await fetch(`http://localhost:8080/bookings?email=${session.user.email}`, {
          headers: {
            "Authorization": `Bearer ${tokenData?.token}`
          }
        });

        if (res.ok) {
          const data = await res.json();
          setBookings(data);
        }
      } catch (error) {
        console.error("Failed to fetch bookings:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (session) fetchMyBookings();
  }, [session]);

  // --------------------------------------------------------
  // Booking Handlers
  // --------------------------------------------------------

  const handleUpdateClick = (booking) => {
    setSelectedBooking(booking);
    setIsUpdateModalOpen(true);
  };

  const handleBookingUpdateSubmit = async (e) => {
    e.preventDefault();
    const { data: tokenData } = await authClient.token();

    try {
      // ব্যাকএন্ডে আপডেট রিকোয়েস্ট (PATCH বা PUT)
      const res = await fetch(`http://localhost:8080/bookings/${selectedBooking._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${tokenData?.token}`
        },
        body: JSON.stringify({
          patientName: selectedBooking.patientName,
          date: selectedBooking.date,
          time: selectedBooking.time,
          reason: selectedBooking.reason,
          gender: selectedBooking.gender,
          phone: selectedBooking.phone
        })
      });

      if (res.ok) {
        // Optimistic UI Update (নো রিলোড)
        setBookings((prev) => prev.map((b) => (b._id === selectedBooking._id ? selectedBooking : b)));
        toast.success("Appointment updated successfully!");
        setIsUpdateModalOpen(false);
      } else {
        toast.error("Failed to update appointment.");
      }
    } catch (error) {
      toast.error("Server error.");
    }
  };

  const handleDeleteClick = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this appointment?");
    if (!confirmDelete) return;

    const { data: tokenData } = await authClient.token();

    try {
      const res = await fetch(`http://localhost:8080/bookings/${id}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${tokenData?.token}`
        }
      });

      if (res.ok) {
        // Optimistic UI Update: UI থেকে তাৎক্ষণিক মুছে ফেলা
        setBookings((prev) => prev.filter((b) => b._id !== id));
        toast.success("Appointment deleted successfully!");
      } else {
        toast.error("Failed to delete appointment.");
      }
    } catch (error) {
      toast.error("Server error.");
    }
  };

  // --------------------------------------------------------
  // Profile Handlers
  // --------------------------------------------------------

  const handleProfileUpdateClick = () => {
    setProfileData({
      name: session?.user?.name || "",
      image: session?.user?.image || ""
    });
    setIsProfileModalOpen(true);
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    try {
      // Better-auth এর updateUser ফাংশন ব্যবহার করে প্রোফাইল আপডেট
      await authClient.updateUser({
        name: profileData.name,
        image: profileData.image
      });
      
      toast.success("Profile updated successfully!");
      setIsProfileModalOpen(false);
      // সেশন রিলোড করার জন্য পেজ রিফ্রেশ বা সেশন আপডেট লজিক
      window.location.reload(); 
    } catch (error) {
      toast.error("Failed to update profile.");
    }
  };

  // --------------------------------------------------------
  // Render
  // --------------------------------------------------------

  if (isPending) return <div className="min-h-screen flex justify-center items-center">Loading...</div>;
  if (!session) return <div className="min-h-screen flex justify-center items-center text-red-500">Please login to view dashboard.</div>;

  return (
    <div className="min-h-screen bg-slate-50 py-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        
        <h1 className="text-3xl font-bold text-slate-800 mb-6">Dashboard</h1>

        {/* Custom Tabs */}
        <div className="flex gap-2 mb-8">
          <button
            onClick={() => setActiveTab("bookings")}
            className={`px-5 py-2 rounded-full text-sm font-semibold transition-colors ${
              activeTab === "bookings" ? "bg-teal-50 text-teal-700" : "bg-slate-200/50 text-slate-600 hover:bg-slate-200"
            }`}
          >
            My Bookings
          </button>
          <button
            onClick={() => setActiveTab("profile")}
            className={`px-5 py-2 rounded-full text-sm font-semibold transition-colors ${
              activeTab === "profile" ? "bg-teal-50 text-teal-700" : "bg-slate-200/50 text-slate-600 hover:bg-slate-200"
            }`}
          >
            My Profile
          </button>
        </div>

        {/* ----------------- TAB 1: MY BOOKINGS ----------------- */}
        {activeTab === "bookings" && (
          <div>
            {isLoading ? (
              <p className="text-slate-500">Loading your appointments...</p>
            ) : bookings.length === 0 ? (
              <div className="bg-white p-8 rounded-2xl border border-slate-100 text-center">
                <p className="text-slate-500">You have no appointments booked yet.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {bookings.map((booking) => (
                  <div key={booking._id} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-between">
                    <div>
                      <h3 className="text-lg font-bold text-teal-600 mb-3">{booking.doctorName}</h3>
                      
                      <div className="space-y-2 text-sm text-slate-600 mb-6">
                        <p className="flex items-center gap-2">
                          <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                          Patient: <span className="font-medium text-slate-800">{booking.patientName}</span>
                        </p>
                        <p className="flex items-center gap-2">
                          <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                          Date: <span className="font-medium text-slate-800">{booking.date}</span>
                        </p>
                        <p className="flex items-center gap-2">
                          <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                          Time: <span className="font-medium text-slate-800">{booking.time}</span>
                        </p>
                        {booking.reason && (
                          <p className="flex items-start gap-2">
                            <span className="text-slate-400 mt-0.5">ℹ️</span>
                            Reason: <span className="text-slate-800 line-clamp-1">{booking.reason}</span>
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3 mt-4">
                      <button 
                        onClick={() => handleUpdateClick(booking)}
                        className="flex-1 flex justify-center items-center gap-1 bg-white border border-slate-200 hover:border-slate-300 text-slate-700 py-2 rounded-xl text-sm font-semibold transition"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
                        Update
                      </button>
                      <button 
                        onClick={() => handleDeleteClick(booking._id)}
                        className="flex-1 flex justify-center items-center gap-1 bg-red-500 hover:bg-red-700  py-2 rounded-xl text-sm font-semibold transition shadow-sm"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ----------------- TAB 2: MY PROFILE ----------------- */}
        {activeTab === "profile" && (
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 max-w-2xl">
            <div className="flex flex-col sm:flex-row items-center gap-8">
              {/* Avatar */}
              <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-teal-50 bg-slate-100 flex-shrink-0">
                {session?.user?.image ? (
                  <Image src={session.user.image} alt="Profile" fill className="object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-400 text-4xl">🧑‍⚕️</div>
                )}
              </div>
              
              {/* Info */}
              <div className="flex-1 text-center sm:text-left">
                <h2 className="text-2xl font-bold text-slate-800 mb-1">{session?.user?.name}</h2>
                <p className="text-slate-500 mb-6">{session?.user?.email}</p>
                
                <button 
                  onClick={handleProfileUpdateClick}
                  className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-2.5 rounded-xl font-semibold transition shadow-sm"
                >
                  Update Profile
                </button>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* ======================================================== */}
      {/* MODAL: UPDATE BOOKING */}
      {/* ======================================================== */}
      {isUpdateModalOpen && selectedBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh]">
            <div className="px-6 py-4 border-b flex justify-between items-center">
              <h2 className="text-xl font-bold text-slate-800">Update Appointment</h2>
              <button onClick={() => setIsUpdateModalOpen(false)} className="text-slate-400 hover:text-red-500">✖</button>
            </div>
            
            <form onSubmit={handleBookingUpdateSubmit} className="p-6 overflow-y-auto space-y-4">
              {/* Read Only */}
              <div>
                <label className="block text-sm font-medium text-slate-500 mb-1">User Email</label>
                <input type="text" value={session?.user?.email} disabled className="w-full px-4 py-2 bg-slate-100 border border-slate-200 rounded-lg text-slate-500 cursor-not-allowed" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-500 mb-1">Doctor Name</label>
                <input type="text" value={selectedBooking.doctorName} disabled className="w-full px-4 py-2 bg-slate-100 border border-slate-200 rounded-lg text-slate-500 cursor-not-allowed" />
              </div>

              {/* Editable */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Patient Name</label>
                <input type="text" required value={selectedBooking.patientName} onChange={(e) => setSelectedBooking({...selectedBooking, patientName: e.target.value})} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 outline-none" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Date</label>
                  <input type="date" required value={selectedBooking.date} onChange={(e) => setSelectedBooking({...selectedBooking, date: e.target.value})} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Time</label>
                  <input type="time" required value={selectedBooking.time} onChange={(e) => setSelectedBooking({...selectedBooking, time: e.target.value})} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 outline-none" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Reason</label>
                <input type="text" value={selectedBooking.reason} onChange={(e) => setSelectedBooking({...selectedBooking, reason: e.target.value})} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 outline-none" />
              </div>

              <div className="pt-4 mt-4 border-t">
                <button type="submit" className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 rounded-xl transition">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODAL: UPDATE PROFILE */}
      {/* ======================================================== */}
      {isProfileModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm overflow-hidden">
            <div className="px-6 py-4 border-b flex justify-between items-center">
              <h2 className="text-xl font-bold text-slate-800">Edit Profile</h2>
              <button onClick={() => setIsProfileModalOpen(false)} className="text-slate-400 hover:text-red-500">✖</button>
            </div>
            
            <form onSubmit={handleProfileSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Name</label>
                <input type="text" required value={profileData.name} onChange={(e) => setProfileData({...profileData, name: e.target.value})} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Photo URL</label>
                <input type="url" value={profileData.image} onChange={(e) => setProfileData({...profileData, image: e.target.value})} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 outline-none" placeholder="https://..." />
              </div>

              <div className="pt-4 mt-4 border-t">
                <button type="submit" className="w-full bg-slate-800 hover:bg-slate-900 text-white font-bold py-3 rounded-xl transition">
                  Update User
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}