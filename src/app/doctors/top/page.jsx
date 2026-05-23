// src/app/page.jsx
import Hero from "@/Components/Hero";
import TopRate from "@/Components/TopRate";
import { getTopDoctors } from "@/lib/doctors/db"; // আপনার db.js থেকে ইমপোর্ট করুন

export default async function Home() {
  // সার্ভার সাইড থেকে টপ ৩ ডক্টরের ডেটা আনা হচ্ছে
  const topDoctors = await getTopDoctors();
  console.log("Top Doctors Data:", topDoctors); // ডেটা কনসোলে দেখুন

  return (
    <main>
      <Hero />
      {/* ডেটাগুলো প্রপস হিসেবে TopRate কম্পোনেন্টে পাঠানো হচ্ছে */}
      <TopRate doctors={topDoctors} />
    </main>
  );
}