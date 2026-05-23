
import Link from 'next/link';

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 overflow-hidden relative">
     
      
      <div className="text-center z-10">
        <h1 className="text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-purple-400 to-pink-400">
          404
        </h1>
        <h2 className="mt-4 text-3xl font-bold text-white">Page Not Found</h2>
        <p className="mt-4 text-slate-300 leading-relaxed mb-8">
          The doctor or page you are looking for doesn't exist.
        </p>
        
        <Link 
          href="/" 
          className="bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 px-8 rounded-full transition-all"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
}