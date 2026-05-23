"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useSession, authClient } from "@/lib/auth-client"; 
import { toast } from "react-toastify";

// export const metadata = {
//   title: "Dashboard",

//   description: "Manage your doctor appointments, view booking history, and update your profile on DocAppoint.",
// };

export default function DashboardPage() {
  const { data: session, isPending } = useSession();
  
  // States
  const [activeTab, setActiveTab] = useState("bookings");
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Modal States
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [profileData, setProfileData] = useState({ name: "", image: "" });

  // 1. Fetch Bookings with JWT
  useEffect(() => {
    const fetchMyBookings = async () => {
      if (!session?.user?.email) return;
      
      try {
        setIsLoading(true);
        const { data: tokenData } = await authClient.token(); 
        
        const res = await fetch(`http://localhost:8080/bookings?email=${session.user.email}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${tokenData?.token}` // JWT পাঠানো হচ্ছে
          }
        });

        if (res.ok) {
          const data = await res.json();
          setBookings(data);
        } else {
          toast.error("Failed to authenticate with server.");
        }
      } catch (error) {
        console.error("Failed to fetch bookings:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (session) fetchMyBookings();
  }, [session]);

  // 2. Handle Update Booking with JWT
  const handleUpdateClick = (booking) => {
    setSelectedBooking(booking);
    setIsUpdateModalOpen(true);
  };

  const handleBookingUpdateSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data: tokenData } = await authClient.token();

      const res = await fetch(`http://localhost:8080/bookings/${selectedBooking._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${tokenData?.token}` // JWT পাঠানো হচ্ছে
        },
        body: JSON.stringify({
          patientName: selectedBooking.patientName,
          gender: selectedBooking.gender,
          phone: selectedBooking.phone,
          date: selectedBooking.date,
          time: selectedBooking.time,
          reason: selectedBooking.reason
        })
      });

      if (res.ok) {
        // UI তাৎক্ষণিক আপডেট (Optimistic Update)
        setBookings((prev) => prev.map((b) => (b._id === selectedBooking._id ? selectedBooking : b)));
        toast.success("Appointment updated successfully!");
        setIsUpdateModalOpen(false);
      } else {
        toast.error("Failed to update appointment.");
      }
    } catch (error) {
      toast.error("Server error updating booking.");
    }
  };

  // 3. Handle Delete Booking with JWT
  const handleDeleteClick = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this appointment?");
    if (!confirmDelete) return;

    try {
      const { data: tokenData } = await authClient.token();

      const res = await fetch(`http://localhost:8080/bookings/${id}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${tokenData?.token}` // JWT পাঠানো হচ্ছে
        }
      });

      if (res.ok) {
        // UI থেকে তাৎক্ষণিক মুছে ফেলা (Optimistic Update)
        setBookings((prev) => prev.filter((b) => b._id !== id));
        toast.success("Appointment deleted successfully!");
      } else {
        toast.error("Failed to delete appointment.");
      }
    } catch (error) {
      toast.error("Server error deleting booking.");
    }
  };

  // 4. Handle Profile Update (Using Better Auth Native Method)
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
      // Better-auth এর নিজস্ব API দিয়ে প্রোফাইল আপডেট (এটির জন্য আলাদা ব্যাকএন্ড রাউট লাগে না)
      await authClient.updateUser({
        name: profileData.name,
        image: profileData.image
      });
      
      toast.success("Profile updated successfully!");
      setIsProfileModalOpen(false);
      window.location.reload(); // পেজ রিলোড করে নতুন ডেটা আনা হচ্ছে
    } catch (error) {
      toast.error("Failed to update profile.");
    }
  };

  // Render UI
  if (isPending) return <div className="min-h-screen flex justify-center items-center">Loading...</div>;
  if (!session) return <div className="min-h-screen flex justify-center items-center font-bold text-slate-800 text-xl">Please login to view dashboard.</div>;

  return (
    <div className="min-h-screen bg-slate-50 py-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        
        <h1 className="text-3xl font-bold text-slate-800 mb-6">Dashboard</h1>

        {/* Tabs */}
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

        {/* Tab Content: Bookings */}
        {activeTab === "bookings" && (
          <div>
            {isLoading ? (
              <p className="text-slate-500 font-semibold">Loading your appointments...</p>
            ) : bookings.length === 0 ? (
              <div className="bg-white p-8 rounded-2xl border border-slate-100 text-center shadow-sm">
                <p className="text-slate-500 font-medium">You have no appointments booked yet.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {bookings.map((booking) => (
                  <div key={booking._id} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-between">
                    <div>
                      <h3 className="text-lg font-bold text-teal-600 mb-4">{booking.doctorName}</h3>
                      <div className="space-y-2 text-sm text-slate-600 mb-6">
                        <p className="flex items-center gap-2"><span className="w-5 text-center">👤</span> Patient: <strong className="text-slate-800">{booking.patientName}</strong></p>
                        <p className="flex items-center gap-2"><span className="w-5 text-center">📅</span> Date: <strong className="text-slate-800">{booking.date}</strong></p>
                        <p className="flex items-center gap-2"><span className="w-5 text-center">🕒</span> Time: <strong className="text-slate-800">{booking.time}</strong></p>
                      </div>
                    </div>
                    <div className="flex gap-3 mt-4">
                      <button onClick={() => handleUpdateClick(booking)} className="flex-1 border border-slate-200 text-slate-700 py-2.5 rounded-xl text-sm font-semibold hover:bg-slate-50 transition">
                        ✏️ Update
                      </button>
                      <button onClick={() => handleDeleteClick(booking._id)} className="flex-1 bg-red-50 text-red-600 py-2.5 rounded-xl text-sm font-semibold hover:bg-red-100 transition">
                        🗑️ Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

     
      {/* Tab Content: Profile */}
        {activeTab === "profile" && (
          <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-slate-100 max-w-lg">
            
            {/* Profile Info: Avatar & Text */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-8 text-center sm:text-left">
              
              {/* Avatar Area (Fixed) */}
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full border-[4px] border-teal-50 bg-slate-50 flex-shrink-0 flex items-center justify-center overflow-hidden shadow-sm">
                {session?.user?.image ? (
                  /* Next.js Image এর বদলে সাধারণ HTML img ট্যাগ ব্যবহার করা হলো যাতে গায়েব না হয়ে যায় */
                  <img 
                    src={session.user.image} 
                    alt="Profile" 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-4xl">🧑‍⚕️</span>
                )}
              </div>
              
              {/* Name and Email */}
              <div className="flex flex-col justify-center h-full sm:mt-4">
                <h2 className="text-2xl font-bold text-slate-800 mb-2">{session?.user?.name}</h2>
                <div className="flex items-center justify-center sm:justify-start text-slate-500 text-sm gap-2">
                  <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                  </svg>
                  <span>{session?.user?.email}</span>
                </div>
              </div>
            </div>

            {/* Full-width Update Button (Fixed Color) */}
            <button 
              onClick={handleProfileUpdateClick} 
              // এখানে bg-teal-600 ব্যবহার করা হয়েছে যাতে কাস্টম কালারের বাগ না হয়
              className="w-full bg-teal-600 hover:bg-teal-700 text-white py-3.5 rounded-xl font-bold transition-all shadow-md flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path>
              </svg>
              Update Profile
            </button>
            
          </div>
        )}

      </div>

    {/* UPDATE BOOKING MODAL */}
      {isUpdateModalOpen && selectedBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden">
            
            {/* Header (No bottom border for a cleaner look) */}
            <div className="px-6 pt-6 pb-2 flex justify-between items-center">
              <h2 className="text-xl font-bold text-slate-800">Update Appointment</h2>
              <button onClick={() => setIsUpdateModalOpen(false)} className="text-slate-400 hover:text-red-500 transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
              </button>
            </div>
            
            <form onSubmit={handleBookingUpdateSubmit} className="p-6 space-y-4">
              
              {/* Doctor Name (Read-only, User Email removed based on design) */}
              <div>
                <label className="block text-sm font-bold text-slate-800 mb-1.5">Doctor</label>
                <input 
                  type="text" 
                  value={selectedBooking.doctorName} 
                  disabled 
                  className="w-full px-4 py-3 bg-teal-50/30 border border-slate-200 rounded-xl text-slate-600 cursor-not-allowed outline-none" 
                />
              </div>

              {/* Patient Name */}
              <div>
                <label className="block text-sm font-bold text-slate-800 mb-1.5">Patient Name</label>
                <input 
                  type="text" 
                  required 
                  value={selectedBooking.patientName} 
                  onChange={(e) => setSelectedBooking({...selectedBooking, patientName: e.target.value})} 
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:border-teal-600 focus:ring-1 focus:ring-teal-600 outline-none transition-all text-slate-700" 
                />
              </div>
              
              {/* Date & Time Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-slate-800 mb-1.5">Date</label>
                  <input 
                    type="date" 
                    required 
                    value={selectedBooking.date} 
                    onChange={(e) => setSelectedBooking({...selectedBooking, date: e.target.value})} 
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:border-teal-600 focus:ring-1 focus:ring-teal-600 outline-none transition-all text-slate-700" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-800 mb-1.5">Time</label>
                  <input 
                    type="time" 
                    required 
                    value={selectedBooking.time} 
                    onChange={(e) => setSelectedBooking({...selectedBooking, time: e.target.value})} 
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:border-teal-600 focus:ring-1 focus:ring-teal-600 outline-none transition-all text-slate-700" 
                  />
                </div>
              </div>

              {/* Reason */}
              <div>
                <label className="block text-sm font-bold text-slate-800 mb-1.5">Reason</label>
                <input 
                  type="text" 
                  value={selectedBooking.reason || ""} 
                  onChange={(e) => setSelectedBooking({...selectedBooking, reason: e.target.value})} 
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:border-teal-600 focus:ring-1 focus:ring-teal-600 outline-none transition-all text-slate-700" 
                />
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button 
                  type="submit" 
                  className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-3.5 rounded-xl transition-all shadow-sm"
                >
                  Save Changes
                </button>
              </div>
              
            </form>
          </div>
        </div>
      )}

    
    {/* UPDATE PROFILE MODAL */}
      {isProfileModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden">
            
            {/* Header (No bottom border to match the design) */}
            <div className="px-6 pt-6 pb-2 flex justify-between items-center">
              <h2 className="text-xl font-bold text-slate-800">Update Profile</h2>
              <button onClick={() => setIsProfileModalOpen(false)} className="text-slate-400 hover:text-red-500 transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
              </button>
            </div>
            
            {/* Form */}
            <form onSubmit={handleProfileSubmit} className="p-6 space-y-5">
              
              <div>
                <label className="block text-sm font-bold text-slate-800 mb-1.5">Name</label>
                <input 
                  type="text" 
                  required 
                  value={profileData.name} 
                  onChange={(e) => setProfileData({...profileData, name: e.target.value})} 
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:border-teal-600 focus:ring-1 focus:ring-teal-600 outline-none transition-all text-slate-700" 
                />
              </div>
              
              <div>
                <label className="block text-sm font-bold text-slate-800 mb-1.5">Photo URL</label>
                <input 
                  type="url" 
                  value={profileData.image} 
                  onChange={(e) => setProfileData({...profileData, image: e.target.value})} 
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:border-teal-600 focus:ring-1 focus:ring-teal-600 outline-none transition-all text-slate-700" 
                  placeholder="https://..." 
                />
              </div>

              <div className="pt-2">
                <button 
                  type="submit" 
                  className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-3.5 rounded-xl transition-all shadow-sm"
                >
                  Save
                </button>
              </div>
              
            </form>
          </div>
        </div>
      )}
    </div>
  );
}