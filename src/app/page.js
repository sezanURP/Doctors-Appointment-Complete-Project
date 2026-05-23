import WhyChooseUs from "@/Components/ChoosePark";

import HeroSection from "@/Components/Hero";

import TopDoctors from "@/Components/TopRate";
import { getTopDoctors } from "@/lib/doctors/db";

export const metadata = {
  title: "DocAppoint | Your Health, Our Priority",
  description: "DocAppoint is your trusted platform for finding the right doctors and booking medical appointments seamlessly and securely.",
};

export default async function Home() {
  const topDoctors = await getTopDoctors();

  return (
  <div>
    
    <HeroSection/>
    <TopDoctors doctors={topDoctors} />
    <WhyChooseUs/>

    
  </div>
  );
}
