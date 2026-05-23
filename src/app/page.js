import WhyChooseUs from "@/Components/ChoosePark";

import HeroSection from "@/Components/Hero";

import TopDoctors from "@/Components/TopRate";
import { getTopDoctors } from "@/lib/doctors/db";

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
