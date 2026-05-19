"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Navbar = () => {
  const [user, setUser] = useState(null); 
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Helper function to test the UI (Remove in production)
  const toggleLogin = () => {
    setUser(user ? null : { 
      name: 'User', 
      photo: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150' 
    });
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'All Appointment', path: '/appointments' },
    { name: 'Dashboard', path: '/dashboard' },
  ];

  return (
    <nav className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo & Name */}
          <Link href="/" className="flex items-center gap-2 cursor-pointer">
            <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">+</span>
            </div>
            <span className="font-bold text-xl text-gray-800 tracking-tight">ParkView Medical Centre</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8 items-center">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                href={link.path} 
                className="text-gray-600 hover:text-blue-600 font-medium transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Authentication Section (Desktop) */}
          <div className="hidden md:flex items-center bg-gray-200 rounded-full gap-4">
            {!user ? (
              <>
                <button onClick={toggleLogin} className="text-gray-600 hover:text-blue-600  font-medium px-4 py-2 transition">
                  Login
                </button>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-full font-medium transition shadow-sm hover:shadow-md">
                  Register
                </button>
              </>
            ) : (
              <div className="flex items-center gap-4">
                <div className="relative w-10 h-10">
                  <Image 
                    src={user.photo} 
                    alt="User Profile" 
                    fill
                    className="rounded-full object-cover border-2 border-blue-100"
                    sizes="40px"
                  />
                </div>
                <button onClick={toggleLogin} className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-5 py-2 rounded-full font-medium transition">
                  Logout
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-600 hover:text-gray-900 focus:outline-none"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-50 px-4 pt-2 pb-4 space-y-1 shadow-lg">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.path} 
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-md"
            >
              {link.name}
            </Link>
          ))}
          
          <div className="border-t border-gray-100 mt-4 pt-4">
            {!user ? (
              <div className="flex flex-col gap-2">
                <button onClick={toggleLogin} className="w-full text-center text-gray-600 border border-gray-300 hover:bg-gray-50 px-4 py-2 rounded-md font-medium transition">
                  Login
                </button>
                <button className="w-full text-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium transition">
                  Register
                </button>
              </div>
            ) : (
              <div className="flex items-center justify-between px-3">
                <div className="flex items-center gap-3">
                  <div className="relative w-10 h-10">
                    <Image 
                      src={user.photo} 
                      alt="Profile" 
                      fill
                      className="rounded-full object-cover" 
                      sizes="40px"
                    />
                  </div>
                  <span className="font-medium text-gray-800">My Profile</span>
                </div>
                <button onClick={toggleLogin} className="text-red-600 hover:text-red-700 font-medium bg-red-50 px-4 py-2 rounded-md">
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;