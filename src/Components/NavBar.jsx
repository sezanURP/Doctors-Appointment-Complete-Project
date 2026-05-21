
"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useSession, signOut, authClient } from '@/lib/auth-client';
import toast from 'react-hot-toast';
import Image from 'next/image';

export default function Navbar() {
  const { data: session } = authClient.useSession();
  

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
  await authClient.signOut();
    toast.success("Logged out successfully!");
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-teal-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">+</div>
            <span className="font-bold text-xl text-slate-800">DocAppoint</span>
          </Link>

          {/* 💻 Desktop Navigation Links */}
          <div className="hidden md:flex space-x-8 items-center">
            <Link href="/" className="text-slate-600 hover:text-teal-600 font-medium transition-colors">Home</Link>
            <Link href="/appointments" className="text-slate-600 hover:text-teal-600 font-medium transition-colors">All Appointments</Link>
            {session && <Link href="/dashboard" className="text-slate-600 hover:text-teal-600 font-medium transition-colors">Dashboard</Link>}
          </div>

          {/* 💻 Desktop Auth Section */}
          <div className="hidden md:flex items-center gap-4">
            {!session ? (
              <>
                <Link href="/login" className="text-slate-600 hover:text-teal-600 font-medium transition-colors">Login</Link>
                <Link href="/register" className="bg-teal-600 hover:bg-teal-700 text-white px-5 py-2 rounded-lg font-medium transition-colors shadow-sm hover:shadow-md">Register</Link>
              </>
            ) : (
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-slate-200 rounded-full flex items-center justify-center overflow-hidden border-2 border-teal-100">
                  {session.user?.image ? (
                     <Image src={session.user.image} alt="User" className="w-full h-full object-cover" width={40} height={40} />
                  ) : (
                     <span className="text-teal-700 font-bold">{session.user?.name?.charAt(0) || 'U'}</span>
                  )}
                </div>
                <button onClick={handleLogout} className="bg-slate-100 hover:bg-red-50 hover:text-red-600 text-slate-700 px-4 py-2 rounded-lg font-medium transition-colors">
                  Logout
                </button>
              </div>
            )}
          </div>

       
          <div className="flex md:hidden items-center">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-slate-600 hover:text-teal-600 focus:outline-none p-2"
              aria-label="Toggle mobile menu"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMobileMenuOpen ? (
                  // Close Icon (X)
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  // Hamburger Icon
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

        </div>
      </div>

      {/* 📱 Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-slate-100 absolute w-full shadow-lg animate-in slide-in-from-top-2 duration-200">
          <div className="px-4 pt-2 pb-6 space-y-1">
            
            {/* Mobile Links */}
            <Link 
              href="/" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-3 py-3 text-base font-medium text-slate-700 hover:text-teal-600 hover:bg-teal-50 rounded-lg transition-colors"
            >
              Home
            </Link>
            
            <Link 
              href="/appointments" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-3 py-3 text-base font-medium text-slate-700 hover:text-teal-600 hover:bg-teal-50 rounded-lg transition-colors"
            >
              All Appointments
            </Link>
            
            {session && (
              <Link 
                href="/dashboard" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-3 py-3 text-base font-medium text-slate-700 hover:text-teal-600 hover:bg-teal-50 rounded-lg transition-colors"
              >
                Dashboard
              </Link>
            )}

            {/* Mobile Auth Section */}
            <div className="border-t border-slate-100 mt-4 pt-4">
              {!session ? (
                <div className="flex flex-col gap-3 px-3">
                  <Link 
                    href="/login" 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="w-full text-center text-slate-700 border border-slate-200 hover:bg-slate-50 px-4 py-2.5 rounded-lg font-medium transition-colors"
                  >
                    Login
                  </Link>
                  <Link 
                    href="/register" 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="w-full text-center bg-teal-600 hover:bg-teal-700 text-white px-4 py-2.5 rounded-lg font-medium transition-colors"
                  >
                    Register
                  </Link>
                </div>
              ) : (
                <div className="flex items-center justify-between px-3 py-2 bg-slate-50 rounded-xl mt-2">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center overflow-hidden border border-teal-100">
                      {session.user?.image ? (
                        <Image src={session.user.image} alt="User" className="w-full h-full object-cover" width={40} height={40} />
                      ) : (
                        <span className="text-teal-700 font-bold">{session.user?.name?.charAt(0) || 'U'}</span>
                      )}
                    </div>
                    <div className="flex flex-col">
                      <span className="font-semibold text-slate-800 text-sm">{session.user?.name || 'User'}</span>
                      <span className="text-xs text-slate-500">Logged in</span>
                    </div>
                  </div>
                  
                  <button 
                    onClick={handleLogout} 
                    className="text-red-600 hover:bg-red-100 font-medium bg-red-50 px-4 py-2 rounded-lg text-sm transition-colors"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>

          </div>
        </div>
      )}
    </nav>
  );
}