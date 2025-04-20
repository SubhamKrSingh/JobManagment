import { useState } from "react";
import { Link } from "react-router-dom";
import Logo from '../assets/cmwlogo (1) 1.png'; 

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-white rounded-2xl shadow-md px-6 py-4 mx-auto max-w-7xl w-3/4 mt-2">
      <div className="flex items-center justify-between">
       
        <div className="flex items-center space-x-3">
          <img src={Logo} alt="Logo" className="h-8 w-8" />
        </div>

      
        <ul className="hidden md:flex items-center space-x-8">
          <Link to="/">Home</Link>
          <button>Find Jobs</button>
          <button>Find Talents</button>
          <button>About us</button>
          <button>Testimonials</button>
        </ul>

       
        <Link
          to="/create-job"
          className="hidden md:block px-6 py-2 bg-gradient-to-r from-[#a12aff] to-[#6100ad] text-white font-semibold rounded-full hover:opacity-90 transition-opacity"
        >
          Create Jobs
        </Link>

   
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden p-2 text-gray-700 hover:text-gray-900"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

    
      {menuOpen && (
        <div className="md:hidden mt-4 space-y-3 text-sm">
          <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
          <button>Find Jobs</button>
          <button>Find Talents</button>
          <button>About us</button>
          <button>Testimonials</button>
          <Link
            to="/create-job"
            onClick={() => setMenuOpen(false)}
            className="block w-full text-center px-6 py-2 bg-gradient-to-r from-[#a12aff] to-[#6100ad] text-white font-semibold rounded-full hover:opacity-90 transition-opacity"
          >
            Create Jobs
          </Link>
        </div>
      )}
    </nav>
  );
}
