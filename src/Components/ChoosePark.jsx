import React from 'react';

const features = [
  {
    id: 1,
    title: "Verified Doctors",
    description: "Every specialist on DocAppoint is vetted, licensed, and reviewed by real patients.",
    icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  },
  {
    id: 2,
    title: "Instant Booking",
    description: "Skip the calls. Reserve a slot in seconds and get instant confirmation.",
    icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  },
  {
    id: 3,
    title: "Patient-First Care",
    description: "Transparent fees, clear availability, and a smooth experience from start to finish.",
    icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
  },
  {
    id: 4,
    title: "Trusted by Thousands",
    description: "Join a growing community managing their health smartly with DocAppoint.",
    icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
  }
];

const WhyChooseUs = () => {
  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        <div className="mb-16">
          <h2 className="inline-block text-3xl md:text-4xl font-bold text-white bg-blue-600 px-4 py-1 mb-3">
            Why Choose DocAppoint?
          </h2>
          <p className="text-slate-500 text-lg">Built around your health and your time.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature) => (
            <div key={feature.id} className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-all border border-slate-100 flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-teal-600 rounded-2xl flex items-center justify-center text-white mb-6 transform rotate-3 hover:rotate-0 transition-transform">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {feature.icon}
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-3">{feature.title}</h3>
              <p className="text-slate-500 leading-relaxed text-sm">{feature.description}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default WhyChooseUs;