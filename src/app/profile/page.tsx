"use client";

import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, Cell } from "recharts";

const data = [
  { name: "Blockers", value: 3 },
  { name: "Critical", value: 5 },
  { name: "Major", value: 8 },
  { name: "Normal", value: 12 },
  { name: "Minor", value: 15 },
];

const COLORS = ["#FF0000", "#FF8C00", "#FFD700", "#3CB371", "#1E90FF"];

const ProfilePage = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
      {/* Profile Card */}
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-3xl">
        <div className="flex items-center space-x-6">
          <img
            src="https://via.placeholder.com/100"
            alt="Profile"
            className="w-24 h-24 rounded-full shadow-md"
          />
          <div>
            <h2 className="text-2xl font-bold text-gray-900">John Doe</h2>
            <p className="text-gray-600">Software Engineer</p>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 w-full max-w-3xl">
        {/* Bar Chart */}
        <div className="bg-white shadow-md rounded-lg p-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Issue Summary</h3>
          <BarChart width={300} height={200} data={data}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#4F46E5" />
          </BarChart>
        </div>

        {/* Pie Chart */}
        <div className="bg-white shadow-md rounded-lg p-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Distribution</h3>
          <PieChart width={300} height={200}>
            <Pie data={data} cx="50%" cy="50%" outerRadius={80} dataKey="value">
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </div>
      </div>

      {/* List Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 w-full max-w-3xl">
        {/* Courses List */}
        <div className="bg-white shadow-md rounded-lg p-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Courses</h3>
          <ul className="list-disc list-inside text-gray-700">
            <li>React for Beginners</li>
            <li>Advanced JavaScript</li>
            <li>Next.js Masterclass</li>
          </ul>
        </div>

        {/* Activities List */}
        <div className="bg-white shadow-md rounded-lg p-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Recent Activities</h3>
          <ul className="list-disc list-inside text-gray-700">
            <li>Fixed a critical bug</li>
            <li>Attended a DevOps workshop</li>
            <li>Completed a Next.js course</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
