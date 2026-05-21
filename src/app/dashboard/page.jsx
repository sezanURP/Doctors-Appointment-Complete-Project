// app/dashboard/page.js
"use client";
import { useSession } from "@/lib/auth-client";
import { Card } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";

export default function Dashboard() {
  const { data: session } = useSession();

  return (
    <div>
      <Card>

      
    <div className="py-16 max-w-5xl mx-auto px-4">
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
      
      {/* Profile Section */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 mb-10 flex items-center gap-6">
         <div className="w-20 h-20 bg-slate-200 rounded-full overflow-hidden flex items-center justify-center text-2xl font-bold text-teal-700">
             {session?.user?.image ? <Image src={session.user.image} alt="profile" width={80} height={80} /> : session?.user?.name?.charAt(0)}
         </div>
         <div>
            <h2 className="text-2xl font-bold text-slate-800">{session?.user?.name}</h2>
            <p className="text-slate-500">{session?.user?.email}</p>
         </div>
      </div>

      {/* Bookings Section (Static placeholder for UI) */}
      <h2 className="text-2xl font-bold mb-6">My Bookings</h2>
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 text-center text-slate-500">
         You have no bookings yet. Go to <Link href="/appointments" className="text-teal-600 font-bold">All Appointments</Link> to book a doctor.
      </div>
    </div>
    </Card>
    </div>

  );
}