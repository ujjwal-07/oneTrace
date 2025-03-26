"use client";
import { useState } from "react";

const Performance = () => {
  const [search, setSearch] = useState("");

  // Dummy placeholders (replace with actual data)
  const placeholders = [
    "Performance 1",
    "Performance 2",
    "Performance 3",
    "Performance 4",
    "Performance 5",
    "Performance 6",
  ];

  // Filter results based on search input
  const filteredResults = placeholders.filter((item) =>
    item.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Search Bar */}
      <div className="mb-6 flex justify-center">
        <input
          type="text"
          placeholder="Search performance..."
          className="w-full max-w-md p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Performance Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredResults.map((item, index) => (
          <div
            key={index}
            className="bg-white shadow-lg rounded-lg p-6 flex items-center justify-center text-gray-700 font-semibold text-lg"
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Performance;
