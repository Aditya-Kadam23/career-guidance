import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const isLoggedIn = !!token;

  const handleLogOut = async () =>{
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  }
  return (
    <nav className="flex justify-between items-center px-8 py-3.5 border-b border-slate-200 bg-white sticky top-0 z-50 shadow-sm">
      
      {/* Logo */}
      <h1 className="text-base font-semibold tracking-tight text-slate-900">
        CareerGuide
      </h1>

      {/* Right Side */}
      {isLoggedIn ? (
        <div className="flex items-center gap-4">
          <button onClick={handleLogOut} className="text-sm text-slate-500 cursor-pointer hover:text-slate-800 transition-colors duration-200">
            Logout
          </button>
        </div>
      ) : (
        <div className="flex items-center gap-4">
          <button className="text-sm text-slate-500 hover:text-slate-800 transition-colors duration-200">
            Sign In
          </button>
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200">
            Sign Up
          </button>
        </div>
      )}
      
    </nav>
  );
}