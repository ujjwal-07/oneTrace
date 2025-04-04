"use client";
import { useState } from "react";
import axios from "axios";
const Messages = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<string[]>([]);   
  const [selectedFile, setSelectedFile] = useState(null);

  // Handle sending a message
  const sendMessage = () => {
    if (message.trim() !== "") {
      setMessages([...messages, message]); // Add new message to the list
      setMessage(""); // Clear input
    }
  };
  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedFile) {
      alert("Please select a file first!");
      return;
    }

    const formData = new FormData();
    formData.append("excelFile", selectedFile);

    try {
      const response = await axios.post("http://localhost:5000/api/store_excel_data", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });

      console.log("Server Response:", response.data);
      alert("File uploaded successfully!");
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Failed to upload the file.");
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
      <form onSubmit={handleSubmit}>
      <input
        type="file"
        accept=".xlsx, .xls"
        onChange={handleFileChange}
      />
      <button type="submit">Upload Excel</button>
    </form>
      </div>
    </div>
  );
};

export default Messages;
