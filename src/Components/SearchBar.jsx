// src/Components/SearchBar.jsx
"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useState } from "react";

export default function SearchBar() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  // URL-এ আগে থেকে কোনো সার্চ কিওয়ার্ড থাকলে সেটি ইনপুটে দেখাবে
  const [searchTerm, setSearchTerm] = useState(searchParams.get("search") || "");

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    // URL-এর প্যারামিটার আপডেট করা হচ্ছে
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set("search", value);
    } else {
      params.delete("search");
    }
    
    // পেজ রিলোড ছাড়াই URL আপডেট করবে এবং সাথে সাথে ডেটা ফেচ হবে
    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="max-w-2xl mx-auto mb-10">
      <div className="relative flex items-center w-full h-14 rounded-full bg-white border border-slate-200 overflow-hidden shadow-sm hover:shadow-md focus-within:shadow-md focus-within:border-teal-500 transition-all">
        
        {/* Search Icon */}
        <div className="grid place-items-center h-full w-14 text-slate-400">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>

        {/* Input Field */}
        <input
          className="peer h-full w-full outline-none text-slate-700 pr-4 bg-transparent"
          type="text"
          placeholder="Search by doctor name or specialty..."
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
    </div>
  );
}