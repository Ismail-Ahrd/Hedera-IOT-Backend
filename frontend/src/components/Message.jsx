import React, { useRef, useState } from "react";
import axios from "axios";

function Message() {
  const [loading, setLoading] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const ref = useRef();

  async function sendMessage(e) {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post("http://localhost:3000/send-messages", {
        message: inputValue,
      });
      setInputValue("");
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex justify-center items-center w-screen h-screen bg-white">
      <form className="flex items-center" onSubmit={sendMessage}>
        <input
          ref={ref}
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="border border-gray-300 rounded px-4 py-2 mr-2 focus:outline-none focus:border-blue-500"
          placeholder="Enter your message..."
        />
        <button
          type="submit"
          className={`px-4 py-2 rounded focus:outline-none ${
            loading ? "bg-green-500" : "bg-blue-500 hover:bg-blue-600"
          } text-white font-semibold`}
          disabled={loading}
        >
          {loading ? "Sending..." : "Send"}
        </button>
      </form>
    </div>
  );
}

export default Message;
