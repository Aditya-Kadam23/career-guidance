import React from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

export default function Recommendations() {
    const navigate = useNavigate();
    const location = useLocation();
    const recommendations = location.state?.recommendations || [];

    return (
        <div className="min-h-screen bg-slate-50 text-slate-800">

            <Navbar />

            {recommendations.length > 0 ? (
                <>
                    <div className="max-w-4xl mx-auto px-6 py-12">

                        {/* Heading */}
                        <div className="text-center mb-10">
                            <h1 className="text-3xl font-bold text-slate-900">
                                Your Career Recommendations
                            </h1>
                            <p className="text-slate-500 mt-3 text-sm">
                                Based on your answers, here are the best paths for you.
                            </p>
                        </div>

                        {/* Top Recommendation */}
                        <div className="bg-indigo-600 p-7 rounded-xl mb-8 shadow-sm">
                            <span className="text-xs font-medium uppercase tracking-widest text-indigo-200 mb-3 block">Top Match</span>
                            <h2 className="text-2xl font-bold mb-1 text-white">
                                {recommendations[0]?.career}
                            </h2>
                            <p className="text-sm text-indigo-100 mb-4">
                                Strong match based on your {recommendations[0]?.category} skills and interests.
                            </p>
                            <div className="inline-flex items-center gap-2 bg-white/20 px-3 py-1.5 rounded-md">
                                <span className="text-xs font-medium text-indigo-100">Match Score:</span>
                                <span className="text-sm font-bold text-white">{recommendations[0]?.score}%</span>
                            </div>
                        </div>

                        {/* Other Options */}
                        <div className="grid md:grid-cols-2 gap-5 mb-10">
                            <div className="bg-white border border-slate-200 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200">
                                <span className="text-xs text-slate-400 mb-2 block font-medium">2nd Match</span>
                                <h3 className="text-base font-semibold mb-1.5 text-slate-900">
                                    {recommendations[1]?.career}
                                </h3>
                                <p className="text-slate-500 text-sm mb-3">
                                    Good fit if you have some interest in {recommendations[1]?.category}.
                                </p>
                                <span className="text-xs text-slate-500">Match: <span className="text-slate-800 font-semibold">{recommendations[1]?.score}%</span></span>
                            </div>

                            <div className="bg-white border border-slate-200 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200">
                                <span className="text-xs text-slate-400 mb-2 block font-medium">3rd Match</span>
                                <h3 className="text-base font-semibold mb-1.5 text-slate-900">
                                    {recommendations[2]?.career}
                                </h3>
                                <p className="text-slate-500 text-sm mb-3">
                                    Decent option if you want to explore {recommendations[2]?.category}.
                                </p>
                                <span className="text-xs text-slate-500">Match: <span className="text-slate-800 font-semibold">{recommendations[2]?.score}%</span></span>
                            </div>
                        </div>

                        {/* Roadmap Section */}
                        <div className="bg-white border border-slate-200 p-7 rounded-xl shadow-sm mb-10">
                            <h2 className="text-lg font-semibold mb-5 text-slate-900">
                                Suggested Roadmap
                            </h2>

                            <ul className="space-y-3">
                                <li className="flex items-start gap-3 text-slate-600 text-sm">
                                    <span className="w-5 h-5 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-600 flex items-center justify-center text-xs flex-shrink-0 mt-0.5 font-semibold">1</span>
                                    Learn programming fundamentals (C++ / JavaScript)
                                </li>
                                <li className="flex items-start gap-3 text-slate-600 text-sm">
                                    <span className="w-5 h-5 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-600 flex items-center justify-center text-xs flex-shrink-0 mt-0.5 font-semibold">2</span>
                                    Practice Data Structures & Algorithms
                                </li>
                                <li className="flex items-start gap-3 text-slate-600 text-sm">
                                    <span className="w-5 h-5 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-600 flex items-center justify-center text-xs flex-shrink-0 mt-0.5 font-semibold">3</span>
                                    Build real-world projects
                                </li>
                                <li className="flex items-start gap-3 text-slate-600 text-sm">
                                    <span className="w-5 h-5 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-600 flex items-center justify-center text-xs flex-shrink-0 mt-0.5 font-semibold">4</span>
                                    Explore internships / open source
                                </li>
                            </ul>
                        </div>
                    </div>
                </>
            ) : (
                <p className="text-center text-slate-500 py-12 text-sm">
                    No recommendations available. Please complete the questionnaire.
                </p>
            )}

            {/* CTA Section */}
            <div className="text-center pb-16">
                <h2 className="text-xl font-semibold mb-2 text-slate-900">
                    Want Personalized Guidance?
                </h2>
                <p className="text-slate-500 mb-6 text-sm">
                    Connect with mentors and attend live sessions.
                </p>

                <button onClick={()=> navigate("/chat")} className="bg-indigo-600 hover:bg-indigo-700 text-white px-7 py-3 rounded-lg text-sm font-medium transition-colors duration-200 shadow-sm">
                    Chat with Mentor
                </button>
            </div>

        </div>
    );
}