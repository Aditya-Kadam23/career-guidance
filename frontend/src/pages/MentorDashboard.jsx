
import React, { useEffect, useState } from "react";
import API from "../api/axios";
import Chat from "./Chat";
import VideoCall from "../components/VideoCall";
import { useNavigate } from "react-router-dom";

const MentorDashboard = () => {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [loading, setLoading] = useState(true);
  const [roomId, setRoomId] = useState("");
  const [showCall, setShowCall] = useState(false);
  const navigate = useNavigate();

  
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if(user.role !== "mentor"){
      console.log("user not authenticated");
      navigate("/");
    }
  }, [])
  
  

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await API.get("/mentor/users");
        setStudents(res.data.users || []);
      } catch (err) {
        console.error(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);



  return (
   <>
   {showCall ? (
      <VideoCall roomId={roomId} isCaller={true} />
    ):(
      <div className="flex h-screen bg-slate-50 text-slate-800">

      {/* Sidebar */}
      <div className="w-56 bg-white border-r border-slate-200 flex flex-col p-5 flex-shrink-0 shadow-sm">
        <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-5">Mentor Panel</h2>

        <button
          onClick={() => setActiveTab("dashboard")}
          className={`px-3 py-2.5 rounded-lg mb-1 text-left text-sm font-medium transition-colors duration-200 ${
            activeTab === "dashboard"
              ? "bg-indigo-50 text-indigo-700 border border-indigo-100"
              : "text-slate-600 hover:bg-slate-50 hover:text-slate-800"
          }`}
        >
          Dashboard
        </button>

        <button
          onClick={() => setActiveTab("students")}
          className={`px-3 py-2.5 rounded-lg mb-1 text-left text-sm font-medium transition-colors duration-200 ${
            activeTab === "students"
              ? "bg-indigo-50 text-indigo-700 border border-indigo-100"
              : "text-slate-600 hover:bg-slate-50 hover:text-slate-800"
          }`}
        >
          Students
        </button>

        <button
          onClick={() => setActiveTab("sessions")}
          className={`px-3 py-2.5 rounded-lg text-left text-sm font-medium transition-colors duration-200 ${
            activeTab === "sessions"
              ? "bg-indigo-50 text-indigo-700 border border-indigo-100"
              : "text-slate-600 hover:bg-slate-50 hover:text-slate-800"
          }`}
        >
          Live Sessions
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden bg-slate-50">

        {/* Dashboard */}
        {activeTab === "dashboard" && (
          <div className="p-8">
            <h1 className="text-xl font-semibold mb-1.5 text-slate-900">Welcome, Mentor 👋</h1>
            <p className="text-slate-500 text-sm">
              Manage your students and conduct live sessions.
            </p>
          </div>
        )}

        {/* Students Section */}
        {activeTab === "students" && (
          <div className="flex h-full">

            {/* Student List */}
            <div className="w-72 border-r border-slate-200 bg-white p-4 overflow-y-auto flex-shrink-0">
              <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-4">Students</h2>

              {loading ? (
                <p className="text-slate-400 text-sm">Loading...</p>
              ) : (
                students.map((student) => (
                  <div
                    key={student._id}
                    className={`p-3 rounded-lg mb-2 border transition-colors duration-200 ${
                      selectedStudent?._id === student._id
                        ? "bg-indigo-50 border-indigo-200"
                        : "border-slate-200 hover:bg-slate-50 hover:border-slate-300 bg-white"
                    }`}
                  >
                    <span className="font-medium text-sm text-slate-800 block mb-2">{student.name}</span>

                    <div className="flex gap-2">
                      <button
                        onClick={() => setSelectedStudent(student)}
                        className="text-xs bg-indigo-600 text-white px-2.5 py-1 rounded hover:bg-indigo-700 transition-colors duration-200"
                      >
                        Chat
                      </button>

                      <button
                        onClick={() => {
                          if (!roomId) {
                            alert("Please select a student first");
                            return;
                          }
                          setShowCall(true);
                        }}
                        disabled={!selectedStudent}
                        className={`text-xs px-2.5 py-1 rounded text-white transition-colors duration-200 ${
                          selectedStudent?._id === student._id
                            ? "bg-emerald-600 hover:bg-emerald-700"
                            : "bg-slate-300 cursor-not-allowed"
                        }`}
                      >
                        Video Call
                      </button>
                    </div>
                    
                  </div>
                ))
              )}
            </div>

            {/* Chat Section */}
            <div className="flex-1 overflow-hidden">
              {selectedStudent ? (
                <Chat selectedStudent={selectedStudent} setRoomId={setRoomId} />
              ) : (
                <div className="flex items-center justify-center h-full text-slate-400 text-sm">
                  Select a student to start chatting
                </div>
              )}
            </div>

          </div>
        )}

        {/* Live Sessions */}
        {activeTab === "sessions" && (
          <div className="p-8">
            <h2 className="text-lg font-semibold mb-5 text-slate-900">Live Sessions</h2>

            <button className="bg-emerald-600 text-white px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-emerald-700 transition-colors duration-200 shadow-sm">
              + Start Live Session
            </button>

            <p className="mt-4 text-slate-400 text-sm">
              (Upcoming feature: video lectures, scheduling, etc.)
            </p>
          </div>
        )}

      </div>
    </div>

    )}
    
   </>
    
  );
};

export default MentorDashboard;
