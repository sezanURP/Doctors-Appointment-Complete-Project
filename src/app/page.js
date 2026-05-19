import WhyChooseUs from "@/Components/ChoosePark";
import Footer from "@/Components/Footer";
import HeroSection from "@/Components/Hero";
import Navbar from "@/Components/NavBar";
import TopDoctors from "@/Components/TopRate";
import Image from "next/image";

export default function Home() {
  return (
  <div>
    <Navbar/>
    <HeroSection/>
    <TopDoctors/>
    <WhyChooseUs/>

    <Footer/>
  </div>
  );
}
