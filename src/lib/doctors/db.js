// src/lib/doctors/db.js

export const getAllDoctors = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/doctors`);
    if (!res.ok) throw new Error("Failed to fetch doctors");
    const doctors = await res.json();
    return doctors;
  } catch (error) {
    console.error("Error fetching all doctors:", error);
    return [];
  }
};

export const getDoctorById = async (id ) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/doctors/${id}`, {
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
        
        // "Authorization": `Bearer ${token}` 
      }

    }); 
    
    // if (!res.ok) throw new Error(`Failed to fetch doctor with id ${id}`);
    const doctor = await res.json();
    // console.log(`Fetched Doctor Data for ID ${id}:`, doctor);
    return doctor;
  } catch (error) {
    console.error(`Error fetching doctor ${id}:`, error);
    return null;
  }
};


// src/lib/doctors/db.js

export const getTopDoctors = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/doctors/top`, {
      next: { revalidate: 3600 }, 
    });
    
    if (!res.ok) {
      return []; 
    }
    
    const doctors = await res.json();
    return doctors;
  } catch (error) {
    console.error("Fetch Error for top doctors:", error);
    return []; 
  }
};

