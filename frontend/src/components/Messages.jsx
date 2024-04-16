import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";

function Messages() {
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    const newSocket = io(`http://localhost:3000`);
    console.log(newSocket);

    newSocket.on("connect", () => {
      setSocket(newSocket);
    });
    // Listen for the "new-message" event
    newSocket?.on("new-message", (time, message) => {
      // Handle the new message received
      setMessages((prev) => [...prev, { time, message }]);
      console.log("New message received:", message);
    });
    // Clean up function to close socket connection when component unmounts
    return () => {
      socket?.disconnect();
    };
  }, []);
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Messages</h1>
      <div className="bg-white rounded-lg shadow-md p-6">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left py-2">Time</th>
              <th className="text-left py-2">Message</th>
            </tr>
          </thead>
          <tbody>
            {messages.map((msg, index) => (
              <tr key={index} className={index % 2 === 0 ? "bg-gray-50" : ""}>
                <td className="py-2">{msg.time}</td>
                <td className="py-2">{msg.message}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Messages;
