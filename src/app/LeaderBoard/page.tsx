"use client";

const users = [
  { name: "Alice", score: 250 },
  { name: "Bob", score: 230 },
  { name: "Charlie", score: 210 },
  { name: "David", score: 190 },
  { name: "Eve", score: 180 },
  { name: "Frank", score: 170 },
  { name: "Grace", score: 160 },
  { name: "David", score: 190 },
  { name: "Eve", score: 180 },
  { name: "Frank", score: 170 },
  { name: "Grace", score: 160 },
];

export default function Leaderboard() {
  const topThree = users.slice(0, 3);
  const others = users.slice(3);

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">🏆 Leaderboard</h1>

      {/* Podium */}
      <div className="flex items-end space-x-4 mb-8">
        {/* 2nd Place */}
        <div className="flex flex-col items-center">
          <div className="bg-gray-400 w-24 h-32 flex items-center justify-center rounded-lg shadow-md">
            <span className="text-white text-xl font-bold">{topThree[1].name}</span>
          </div>
          <span className="mt-2 text-lg font-semibold text-gray-700">🥈 {topThree[1].score}</span>
        </div>

        {/* 1st Place (Tallest) */}
        <div className="flex flex-col items-center">
          <div className="bg-yellow-400 w-28 h-40 flex items-center justify-center rounded-lg shadow-lg">
            <span className="text-white text-2xl font-bold">{topThree[0].name}</span>
          </div>
          <span className="mt-2 text-xl font-semibold text-gray-900">🥇 {topThree[0].score}</span>
        </div>

        {/* 3rd Place */}
        <div className="flex flex-col items-center">
          <div className="bg-orange-400 w-20 h-28 flex items-center justify-center rounded-lg shadow-md">
            <span className="text-white text-lg font-bold">{topThree[2].name}</span>
          </div>
          <span className="mt-2 text-lg font-semibold text-gray-700">🥉 {topThree[2].score}</span>
        </div>
      </div>

      {/* Other Users Table */}
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
        <h2 className="text-lg font-semibold text-gray-800 mb-3">Other Participants</h2>
        <ul className="divide-y divide-gray-200">
          {others.map((user, index) => (
            <li key={index} className="py-2 flex justify-between text-gray-700">
              <span>{index + 4}. {user.name}</span>
              <span className="font-bold">{user.score}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
