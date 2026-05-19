export const getAllDoctors = async () => {
  const res = await fetch("http://localhost:8080/doctors"); 
  const doctors = await res.json();
  return doctors;
console.log(doctors);
}

   // export const getDoctorById = async (id) => {
   //   const res = await fetch(`http://localhost:8080/doctors/${id}`);
   //   const doctor = await res.json();
   //   return doctor;
   // }