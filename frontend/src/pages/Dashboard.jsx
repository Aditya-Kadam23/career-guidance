import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import API from "../api/axios";

export default function Dashboard() {
  const [response, setResponse] = useState(null);

  useEffect(() => {
    const fetchResponse = async () => {
      try {
        const res = await API.get("/recommendations");
        setResponse(res.data.response); // latest response
      } catch (error) {
        console.error("Error fetching response:", error);
      }
    };

    fetchResponse();
  }, []);

  if (!response) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center text-sm text-slate-400">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <Navbar />

      <div className="max-w-5xl mx-auto px-6 py-12">

        {/* Header */}
        <div className="mb-10">
          <h1 className="text-2xl font-bold text-slate-900">Your Dashboard</h1>
          <p className="text-slate-500 mt-1.5 text-sm">
            Track your career insights and progress
          </p>
        </div>

        {/* Top Section */}
        <div className="grid md:grid-cols-3 gap-5 mb-10">

          {/* Top Career */}
          <div className="bg-indigo-600 p-6 rounded-xl shadow-sm">
            <h2 className="text-xs font-medium uppercase tracking-widest text-indigo-200 mb-3">Top Career Match</h2>
            <p className="text-xl font-bold text-white">
              {response?.recommendations?.[0]?.career || "N/A"}
            </p>
            <p className="text-sm mt-2 text-indigo-100">
              Match Score: <span className="font-semibold text-white">{response?.recommendations?.[0]?.score || 0}%</span>
            </p>
          </div>

          {/* Total Attempts (for now 1) */}
          <div className="bg-white border border-slate-200 p-6 rounded-xl shadow-sm">
            <h2 className="text-xs font-medium uppercase tracking-widest text-slate-400 mb-3">
              Assessments Taken
            </h2>
            <p className="text-3xl font-bold text-slate-900">
              1
            </p>
          </div>

          {/* Last Updated */}
          <div className="bg-white border border-slate-200 p-6 rounded-xl shadow-sm">
            <h2 className="text-xs font-medium uppercase tracking-widest text-slate-400 mb-3">
              Last Assessment
            </h2>
            <p className="text-sm text-slate-700">
              {response?.createdAt
                ? new Date(response.createdAt).toLocaleString()
                : "N/A"}
            </p>
          </div>

        </div>

        {/* Recommendations Section */}
        <div className="mb-10">
          <h2 className="text-lg font-semibold mb-5 text-slate-900">
            Your Top Career Paths
          </h2>

          <div className="grid md:grid-cols-3 gap-5">
            {response?.recommendations?.slice(0, 3).map((rec, index) => (
              <div
                key={index}
                className="bg-white border border-slate-200 p-5 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200"
              >
                <h3 className="text-base font-semibold mb-1.5 text-slate-900">
                  {rec.career}
                </h3>

                <p className="text-slate-400 text-xs mb-2">
                  Category: {rec.category || "General"}
                </p>

                <p className="text-xs text-slate-500">
                  Match: <span className="text-slate-800 font-semibold">{rec.score}%</span>
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Scores Section */}
        <div className="mb-10">
          <h2 className="text-lg font-semibold mb-5 text-slate-900">
            Your Strength Areas
          </h2>

          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-5">
            {response?.scores &&
              Object.entries(response.scores).map(([key, value]) => (
                <div key={key}>
                  <div className="flex justify-between text-sm mb-1.5">
                    <span className="capitalize text-slate-700">{key}</span>
                    <span className="text-slate-400 text-xs">{value}%</span>
                  </div>

                  <div className="w-full bg-slate-100 h-1.5 rounded-full">
                    <div
                      className="bg-indigo-500 h-1.5 rounded-full transition-all duration-500"
                      style={{ width: `${value}%` }}
                    ></div>
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-12 border-t border-slate-200 pt-12">
          <h2 className="text-lg font-semibold mb-2 text-slate-900">
            Want expert guidance?
          </h2>
          <p className="text-slate-500 text-sm mb-5">Connect with a mentor for personalized advice.</p>
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-lg text-sm font-medium transition-colors duration-200 shadow-sm">
            Talk to a Mentor
          </button>
        </div>

      </div>
    </div>
  );
}