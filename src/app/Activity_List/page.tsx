"use client";
import { useState } from "react";
import Link from "next/link";
export default function ActivityListPage() {
  const [showList, setShowList] = useState(false);

  const activities = [
    "Dam Sanity",
    "Dam CheckList",
    "Dam RFU",
    "App Revamp Sanity",
    "App Revamp User Engagements",
     "Namo AI Sanity",
    "Namo AI US Review",
    "Namo AI RFU",
    "Namo Transcript",
    
  ];

  const handleShowList = () => setShowList(true);

  return (
    <div className="w-full h-screen bg-white p-8 overflow-auto">
      <Link href={"calendar"}>
      <svg xmlns="http://www.w3.org/2000/svg" width="50" height="35" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
  <path stroke-linecap="round" stroke-linejoin="round" d="M19 12H5m0 0l7-7m-7 7l7 7"/>
</svg>
</Link>
    {/* Header Section */}
    <div className="mb-6 p-6">
      <h1 className="font-[Outfit] font-semibold text-[36px] leading-[100%] tracking-[0.05em] text-left">
        ACTIVITY LIST
      </h1>
      <h2 className="text-[#737373] text-[20px] mt-2 text-left">
        14th Feb 2024 - 14th Apr 2025
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