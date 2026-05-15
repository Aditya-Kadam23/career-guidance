
// import React, { useEffect, useRef, useState } from "react";
// import socket from "../socket";
// import VideoCall from "../components/VideoCall";

// const Chat = ({ selectedStudent, setRoomId = () => {} }) => {
//   const selectedStudentId = selectedStudent?._id || "";

//   const currentUser = JSON.parse(localStorage.getItem("user"));
//   let receiverId;
//   if (currentUser.role === "mentor") {
//     receiverId = selectedStudentId;
//   } else {
//     receiverId = "69f4f19ca621d7dd7c859518";
//   }

//   const senderName = currentUser.name;
//   const [messages, setMessages] = useState([]);
//   const [message, setMessage] = useState("");

//   const [incomingCall, setIncomingCall] = useState(false);
//   const [incomingOffer, setIncomingOffer] = useState(null); //  NEW: Save the offer
//   const earlyIceCandidates = useRef([]); // NEW: Catch early ICE candidates

//   const roomId = [currentUser.id, receiverId].sort().join("_");
//   const messagesEndRef = useRef(null);

//   useEffect(() => {
//     if (!receiverId) return;
//     if (typeof setRoomId !== "function") {
//       console.log("setRoomId still not ready");
//       return;
//     }

//     setRoomId(roomId);

//     socket.emit("join_room", roomId);
//     const handleLoadMessages = (data) => {
//       setMessages(data);
//     };

//     socket.on("load_messages", handleLoadMessages);
//     return () => {
//       socket.off("load_messages", handleLoadMessages);
//     };
//   }, [receiverId]);

//   useEffect(() => {
//     socket.on("receive_message", (data) => {
//       setMessages((prev) => [...prev, data]);
//     });

//     return () => socket.off("receive_message");
//   }, []);

//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);

//   const sendMessage = (e) => {
//     e.preventDefault();
//     if (!message.trim()) return;

//     socket.emit("send_message", {
//       roomId,
//       message,
//       time: new Date().toLocaleTimeString()
//     });

//     setMessage("");
//   };

//   useEffect(() => {
//     const handleOffer = (offer) => {
//       console.log("Incoming call received");
//       setIncomingOffer(offer); // Save the offer
//       setIncomingCall(true);  
//     };

//     const handleEarlyIce = (candidate) => {
//       //  Catch ICE candidates that arrive before the Video component mounts
//       earlyIceCandidates.current.push(candidate);
//     };

//     socket.on("offer", handleOffer);
//     socket.on("ice-candidate", handleEarlyIce); // Listen for early ICE

//     return () => {
//       socket.off("offer", handleOffer);
//       socket.off("ice-candidate", handleEarlyIce);
//     };
//   }, []);

//   if (incomingCall) {
//     return (
//       <VideoCall 
//         roomId={roomId} 
//         isCaller={false} 
//         incomingOffer={incomingOffer}  // Pass it down
//         earlyIceCandidates={earlyIceCandidates.current} // Pass them down
//       />
//     );
//   }

//   return (
//     <div className="flex flex-col h-full bg-white">
//       {/* Header */}
//       <div className="px-5 py-3.5 border-b border-slate-200 bg-white flex-shrink-0">
//         <h2 className="text-sm font-semibold text-slate-800">
//           Chat with {selectedStudent ? selectedStudent.name : "Mentor"}
//         </h2>
//       </div>

//       {/* Messages */}
//       <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-2.5 bg-slate-50">
//         {messages.map((msg, index) => {
//           const isMe = msg.senderName === senderName;

//           return (
//             <div
//               key={index}
//               className={`flex ${isMe ? "justify-end" : "justify-start"}`}
//             >
//               <div
//                 className={`max-w-xs px-3.5 py-2.5 rounded-2xl text-sm shadow-sm ${
//                   isMe
//                     ? "bg-indigo-600 text-white rounded-br-sm"
//                     : "bg-white text-slate-700 border border-slate-200 rounded-bl-sm"
//                 }`}
//               >
//                 {!isMe && (
//                   <div className="text-xs font-semibold text-slate-400 mb-1">{msg.senderName}</div>
//                 )}
//                 <div>{msg.message}</div>
//                 <div className={`text-xs text-right mt-1 ${isMe ? "text-indigo-200" : "text-slate-400"}`}>
//                   {msg.time}
//                 </div>
//               </div>
//             </div>
//           );
//         })}

//         {/* scroll anchor */}
//         <div ref={messagesEndRef}></div>
//       </div>

//       {/* Input */}
//       <form onSubmit={sendMessage} className="flex border-t border-slate-200 bg-white flex-shrink-0">
//         <input
//           className="flex-1 px-4 py-3 bg-white text-slate-800 placeholder-slate-400 focus:outline-none text-sm"
//           value={message}
//           onChange={(e) => setMessage(e.target.value)}
//           placeholder="Type a message..."
//         />
//         <button className="px-5 py-3 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium transition-colors duration-200">
//           Send
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Chat;



import React, { useEffect, useRef, useState } from "react";
import socket from "../socket";
import VideoCall from "../components/VideoCall";

const Chat = ({ selectedStudent, setRoomId = () => { } }) => {
  const selectedStudentId = selectedStudent?._id || "";

  const currentUser = JSON.parse(localStorage.getItem("user"));
  let receiverId;
  if (currentUser.role === "mentor") {
    receiverId = selectedStudentId;
  } else {
    receiverId = "69f4f19ca621d7dd7c859518";
  }

  const senderName = currentUser.name;
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

  const [incomingCall, setIncomingCall] = useState(false);
  const [incomingOffer, setIncomingOffer] = useState(null); //  NEW: Save the offer
  const earlyIceCandidates = useRef([]); // NEW: Catch early ICE candidates

  const roomId = [currentUser.id, receiverId].sort().join("_");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (!receiverId) return;
    if (typeof setRoomId !== "function") {
      console.log("setRoomId still not ready");
      return;
    }

    setRoomId(roomId);

    socket.emit("join_room", roomId);
    const handleLoadMessages = (data) => {
      setMessages(data);
    };

    socket.on("load_messages", handleLoadMessages);
    return () => {
      socket.off("load_messages", handleLoadMessages);
    };
  }, [receiverId]);

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessages((prev) => [...prev, data]);
    });

    return () => socket.off("receive_message");
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    socket.emit("send_message", {
      roomId,
      message,
      time: new Date().toLocaleTimeString()
    });

    setMessage("");
  };

  useEffect(() => {
    const handleOffer = (offer) => {
      console.log("Incoming call received");
      setIncomingOffer(offer); // Save the offer
      setIncomingCall(true);
    };

    const handleEarlyIce = (candidate) => {
      //  Catch ICE candidates that arrive before the Video component mounts
      earlyIceCandidates.current.push(candidate);
    };

    socket.on("offer", handleOffer);
    socket.on("ice-candidate", handleEarlyIce); // Listen for early ICE

    return () => {
      socket.off("offer", handleOffer);
      socket.off("ice-candidate", handleEarlyIce);
    };
  }, []);

  if (incomingCall) {
    return (
      <VideoCall
        roomId={roomId}
        isCaller={false}
        incomingOffer={incomingOffer}  // Pass it down
        earlyIceCandidates={earlyIceCandidates.current} // Pass them down
      />
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.chatBox}>
        <h2 style={styles.header}>Chat with {selectedStudent ? selectedStudent.name : "Mentor"} </h2>

        {/* Messages */}
        <div style={styles.messagesContainer}>
          {messages.map((msg, index) => {
            const isMe = msg.senderName === senderName;

            return (
              <div
                key={index}
                style={{
                  display: "flex",
                  justifyContent: isMe ? "flex-end" : "flex-start"
                }}
              >
                <div
                  style={{
                    ...styles.messageBubble,
                    backgroundColor: isMe ? "#4f46e5" : "#e5e7eb",
                    color: isMe ? "white" : "black",
                    borderBottomRightRadius: isMe ? "0px" : "12px",
                    borderBottomLeftRadius: isMe ? "12px" : "0px"
                  }}
                >
                  {!isMe && (
                    <div style={styles.author}>{msg.senderName}</div>
                  )}
                  <div>{msg.message}</div>
                  <div style={styles.time}>{msg.time}</div>
                </div>
              </div>
            );
          })}

          {/* scroll anchor */}
          <div ref={messagesEndRef}></div>
        </div>

        {/* Input */}
        <form onSubmit={sendMessage} style={styles.inputContainer}>
          <input
            style={styles.input}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message..."
          />
          <button style={styles.button}>Send</button>
        </form>
      </div>
    </div>
  );
};

export default Chat;

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f3f4f6"
  },
  chatBox: {
    width: "400px",
    height: "600px",
    display: "flex",
    flexDirection: "column",
    backgroundColor: "white",
    borderRadius: "12px",
    boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
    overflow: "hidden"
  },
  header: {
    padding: "15px",
    borderBottom: "1px solid #ddd",
    textAlign: "center"
  },
  messagesContainer: {
    flex: 1,
    padding: "15px",
    overflowY: "auto",
    display: "flex",
    flexDirection: "column",
    gap: "10px"
  },
  messageBubble: {
    maxWidth: "70%",
    padding: "10px 12px",
    borderRadius: "12px",
    fontSize: "14px"
  },
  author: {
    fontSize: "11px",
    fontWeight: "bold",
    marginBottom: "4px"
  },
  time: {
    fontSize: "10px",
    textAlign: "right",
    marginTop: "4px",
    opacity: 0.7
  },
  inputContainer: {
    display: "flex",
    borderTop: "1px solid #ddd"
  },
  input: {
    flex: 1,
    padding: "12px",
    border: "none",
    outline: "none"
  },
  button: {
    padding: "12px 16px",
    backgroundColor: "#4f46e5",
    color: "white",
    border: "none",
    cursor: "pointer"
  }
};
