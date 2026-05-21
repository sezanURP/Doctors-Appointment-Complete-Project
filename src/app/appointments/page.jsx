import AllAppointmentsPage from "@/Components/AllAppointment";
import { getAllDoctors } from "@/lib/doctors/db";
// import { useRouter } from "next/navigation";


export default async function  AppointmentsPage() {
  const doctors = await getAllDoctors();


  return (
    <div>
      <AllAppointmentsPage doctors={doctors} />
    </div>
  );
}