"use client";
import { useState } from "react";

export default function ActivityListPage() {
  const [showList, setShowList] = useState(false);

  const activities = [
    "Jio TV Sanity",
    "OTT Regression",
    "Backend Smoke Test",
    "Channel Surfing",
    "Login Test Flow",
    "UX Review",
    "Performance Test",
    "Security Audit",
  ];

  const handleShowList = () => setShowList(true);

  return (
    <div className="w-full h-screen bg-white p-8 overflow-auto">
    {/* Header Section */}
    <div className="mb-6">
      <h1 className="font-[Outfit] font-semibold text-[36px] leading-[100%] tracking-[0.05em] text-left">
        ACTIVITY LIST
      </h1>
      <h2 className="text-[#737373] text-[20px] mt-2 text-left">
        16th Oct 2024 - 14th Feb 2025
      </h2>
    </div>

    {/* Activity List */}
    <ul
      className={`w-full gap-4 ${
        activities.length > 5 ? "grid grid-cols-2" : "flex flex-col"
      }`}
    >
      {activities.map((activity, index) => (
        <li
          key={index}
          className="flex items-center w-full rounded-[5px] bg-[#F5F7FF] text-gray-800 shadow-sm overflow-hidden mb-3"
        >
          <div className="bg-[#3C4FE0] text-white px-4 py-2 text-sm font-semibold w-12 text-center">
            {index + 1}
          </div>
          <div className="pl-4 py-2 font-semibold text-base">
            {activity}
          </div>
        </li>
      ))}
    </ul>
  </div>
  );
}
