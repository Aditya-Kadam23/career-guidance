import React from "react";
import Navbar from "../components/Navbar";
import { useState } from "react";
import LevelSelection from "./LevelSelection";
import { useNavigate } from 'react-router-dom'
export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const handleGetStarted = () => {
      
    const token = localStorage.getItem('token');

    if (token) {
      navigate('/level-selection');
     
    }
    else {
      navigate('/login');
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">

      <Navbar/>

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center px-6 py-28">
        <span className="text-xs font-medium text-indigo-600 tracking-widest uppercase mb-4 bg-indigo-50 border border-indigo-100 px-3 py-1 rounded-full">
          Career Guidance Platform
        </span>
        <h1 className="text-4xl md:text-5xl font-bold leading-tight max-w-2xl text-slate-900 mt-2">
          Discover the Right Career Path for You
        </h1>

        <p className="mt-5 text-slate-500 max-w-lg text-base leading-relaxed">
          Personalized guidance based on your interests, skills, and goals.
        </p>

        <button onClick={handleGetStarted} className="mt-8 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg text-sm font-medium transition-colors duration-200 shadow-sm">
          Get Started
        </button>
      </section>

      {/* Features */}
      <section className="px-6 pb-20 grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">

        <div className="bg-white border border-slate-200 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200">
          <div className="w-9 h-9 bg-indigo-50 border border-indigo-100 rounded-lg flex items-center justify-center mb-4">
            <span className="text-indigo-600 text-sm font-bold">01</span>
          </div>
          <h3 className="text-base font-semibold mb-2 text-slate-800">Smart Assessment</h3>
          <p className="text-slate-500 text-sm leading-relaxed">
            Answer a few questions and discover your strengths.
          </p>
        </div>

        <div className="bg-white border border-slate-200 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200">
          <div className="w-9 h-9 bg-indigo-50 border border-indigo-100 rounded-lg flex items-center justify-center mb-4">
            <span className="text-indigo-600 text-sm font-bold">02</span>
          </div>
          <h3 className="text-base font-semibold mb-2 text-slate-800">Career Roadmaps</h3>
          <p className="text-slate-500 text-sm leading-relaxed">
            Get step-by-step guidance tailored to your goals.
          </p>
        </div>

        <div className="bg-white border border-slate-200 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200">
          <div className="w-9 h-9 bg-indigo-50 border border-indigo-100 rounded-lg flex items-center justify-center mb-4">
            <span className="text-indigo-600 text-sm font-bold">03</span>
          </div>
          <h3 className="text-base font-semibold mb-2 text-slate-800">Expert Mentorship</h3>
          <p className="text-slate-500 text-sm leading-relaxed">
            Connect with mentors and attend live sessions.
          </p>
        </div>

      </section>

      {/* CTA */}
      <section className="px-6 py-16 text-center border-t border-slate-200 bg-white">
        <h2 className="text-2xl font-semibold text-slate-900">
          Start your journey today
        </h2>

        <p className="text-slate-500 mt-3 text-sm">
          Take the first step towards a better future.
        </p>

        <button onClick={handleGetStarted} className="mt-6 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg text-sm font-medium transition-colors duration-200 shadow-sm">
          Get Started
        </button>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 py-6 text-center text-slate-400 text-xs bg-white">
        © 2026 CareerGuide. All rights reserved.
      </footer>

    </div>
  );
}