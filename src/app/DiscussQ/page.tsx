"use client";
import { useState } from "react";

const Messages = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<string[]>([]);

  // Handle sending a message
  const sendMessage = () => {
    if (message.trim() !== "") {
      setMessages([...messages, message]); // Add new message to the list
      setMessage(""); // Clear input
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 p-6">
      {/* Heading */}
      <h1 className="text-2xl font-bold mb-4">Discuss Your Query</h1>

      {/* Message List */}
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-4 mb-4 h-80 overflow-y-auto">
        {messages.length === 0 ? (
          <p className="text-gray-500 text-center">No messages yet...</p>
        ) : (
          messages.map((msg, index) => (
            <div
              key={index}
              className="p-2 my-2 bg-blue-100 rounded-md text-gray-700"
            >
              {msg}
            </div>
          ))
        )}
      </div>

      {/* Message Input & Button */}
      <div className="w-full max-w-md flex items-center gap-2">
        <input
          type="text"
          placeholder="Type your message..."
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          onClick={sendMessage}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Messages;
