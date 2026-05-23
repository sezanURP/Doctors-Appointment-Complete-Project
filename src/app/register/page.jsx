
"use client";
import { useState } from "react";
import Link from "next/link";
import { signUp } from "@/lib/auth-client";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

// export const metadata = {
//   title: "Create an Account | DocAppoint",
//   description: "Sign up for DocAppoint today. Create your account to start finding and booking appointments with top medical specialists.",
// };

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState("");
  const router = useRouter();

  const handleRegister = async (e) => {
    e.preventDefault();
    
    // Assignment Validations
    if (password.length < 6 || !/[A-Z]/.test(password) || !/[a-z]/.test(password)) {
      toast.error("Password must be 6+ chars with uppercase & lowercase.");
      return;
    }

    const { data, error } = await signUp.email({ email, password, name, image });
    if (error) toast.error(error.message);
    else {
      toast.success("Registered successfully! Please login.");
      router.push("/login");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-3xl shadow-xl w-full max-w-md border border-slate-100">
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
        <form onSubmit={handleRegister} className="space-y-4">
          <label htmlFor="name">Name</label>
          <input type="text" id="name" placeholder="Name" required className="w-full p-3 border rounded-xl" onChange={e=>setName(e.target.value)} />
          <label htmlFor="email">Email</label>
          <input type="email" id="email" placeholder="Email" required className="w-full p-3 border rounded-xl" onChange={e=>setEmail(e.target.value)} />
          <label htmlFor="password">Password</label>
          <input type="password" id="password" placeholder="Password" required className="w-full p-3 border rounded-xl" onChange={e=>setPassword(e.target.value)} />
          <label htmlFor="image">Image URL</label>
          <input type="url" id="image" placeholder="Input your image URL" required className="w-full p-3 border rounded-xl" onChange={e=>setImage(e.target.value)} />
          <button type="submit" className="w-full bg-teal-600 text-white p-4 rounded-xl font-bold hover:bg-teal-700 transition">Register</button>
        </form>
        <p className="text-center mt-6 text-slate-600">Already have an account? <Link href="/login" className="text-teal-600 font-bold">Login</Link></p>
      </div>
    </div>
  );
}