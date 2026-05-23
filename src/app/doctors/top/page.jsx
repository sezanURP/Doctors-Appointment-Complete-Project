
import Hero from "@/Components/Hero";
import TopRate from "@/Components/TopRate";

import { getTopDoctors } from "@/lib/doctors/db"; 


export const metadata = {
  title: "Top Rated Doctors | DocAppoint",
  description: "Browse and book appointments with our highest-rated specialist doctors, trusted by patients for their exceptional care.",
};

export default async function Home() {
 
  const topDoctors = await getTopDoctors();
  console.log("Top Doctors Data:", topDoctors); // ডেটা কনসোলে দেখুন

  return (
    <main>
      <Hero />
     
      <TopRate doctors={topDoctors} />
    </main>
  );
}