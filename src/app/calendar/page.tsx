"use client"

import { useState } from "react";

export default function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState({});
  const [selectedDate, setSelectedDate] = useState(null);
  const [newEvent, setNewEvent] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(null);

  const months = Array.from({ length: 12 }, (_, i) => new Date(0, i).toLocaleString("default", { month: "long" }));
  const years = Array.from({ length: 21 }, (_, i) => currentDate.getFullYear() - 10 + i);

const handlePrevMonth = () => {
  setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
};

const handleNextMonth = () => {
  setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
};

  const handleMonthChange = (month) => {
    setCurrentDate(new Date(currentDate.getFullYear(), months.indexOf(month), 1));
    setDropdownOpen(null);
  };

  const handleYearChange = (year) => {
    setCurrentDate(new Date(parseInt(year), currentDate.getMonth(), 1));
    setDropdownOpen(null);
  };

  const generateCalendar = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const prevMonthDays = new Date(year, month, 0).getDate();
    
    let calendar = [];
    let dayCount = 1;
    let prevMonthStart = prevMonthDays - firstDay + 1;
    let nextMonthStart = 1;
    
    for (let i = 0; i < 5; i++) {
      let week = [];
      for (let j = 0; j < 7; j++) {
        let isWeekend = j === 0 || j === 6;
        if (i === 0 && j < firstDay) {
          week.push({ day: prevMonthStart++, month: month - 1, year, disabled: true, weekend: isWeekend });
        } else if (dayCount > daysInMonth) {
          week.push({ day: nextMonthStart++, month: month + 1, year, disabled: true, weekend: isWeekend });
        } else {
          week.push({ day: dayCount++, month, year, disabled: false, weekend: isWeekend });
        }
      }
      calendar.push(week);
    }
    return calendar;
  };

  const handleDateClick = (date) => {
    if (!date.disabled) {
      const formattedDate = `${date.year}-${date.month}-${date.day}`;
      setSelectedDate(selectedDate === formattedDate ? null : formattedDate);
    }
  };

  const handleAddEvent = () => {
    if (newEvent.trim() && selectedDate) {
      setEvents((prev) => ({
        ...prev,
        [selectedDate]: [...(prev[selectedDate] || []), newEvent],
      }));
      setNewEvent("");
    }
  };

  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const calendar = generateCalendar();

  return (
    <div className="flex h-screen font-sans">
      <div className="w-3/4 p-4 flex flex-col items-center relative">
      <div className="w-[20rem] h-[2rem] absolute top-[5rem] left-[10rem]">
  <h1 className="font-outfit font-semibold text-[2.25rem] leading-[1] tracking-[0.05em] align-middle text-[#737373]">
  Activity Calendar
  </h1>
  </div>
  <div className="mb-4 flex justify-between w-full px-4 items-center">
  <div className="relative flex gap-4 w-48 w-[10.8125rem] h-[1.75rem] absolute top-[8.125rem] left-[8.125rem]">
            <button className="font-outfit font-light text-[1.375rem] leading-[1] tracking-[0.05em] align-middle text-[#737373]" onClick={() => setDropdownOpen(dropdownOpen === "month" ? null : "month")}>{months[currentDate.getMonth()]}</button>
            {dropdownOpen === "month" && (
              <div className="absolute top-full left-0 bg-white border border-gray-300 shadow-md mt-1 w-full z-10">
                {months.map((month) => (
                  <div key={month} className="px-4 py-2 hover:bg-gray-200 cursor-pointer" onClick={() => handleMonthChange(month)}>{month}</div>
                ))}
              </div>
            )}
            <button className="font-outfit font-light text-[1.375rem] leading-[1] tracking-[0.05em] align-middle text-[#737373]" onClick={() => setDropdownOpen(dropdownOpen === "year" ? null : "year")}>{currentDate.getFullYear()}</button>
            {dropdownOpen === "year" && (
              <div className="absolute top-full left-20 bg-white border border-gray-300 shadow-md mt-1 w-50 z-10">
                {years.map((year) => (
                  <div key={year} className="px-4 py-2 hover:bg-gray-200 cursor-pointer" onClick={() => handleYearChange(year)}>{year}</div>
                ))}
              </div>
            )}
          </div>
          <div className="flex gap-[0.375rem] w-[4.75rem] h-[1.9375rem] absolute top-[7.0625rem] left-[45.3125rem]">
  <button className="text-2xl" onClick={handlePrevMonth}>
    <svg width="1.9375rem" height="1.9375rem" viewBox="0 0 31 31" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="0" width="1.9375rem" height="1.9375rem" rx="0.5rem" fill="#F8F8F8"/>
      <path d="M8.29289 16.7071C7.90237 16.3166 7.90237 15.6834 8.29289 15.2929L14.6569 8.92893C15.0474 8.53841 15.6805 8.53841 16.0711 8.92893C16.4616 9.31946 16.4616 9.95262 16.0711 10.3431L10.4142 16L16.0711 21.6569C16.4616 22.0474 16.4616 22.6805 16.0711 23.0711C15.6805 23.4616 15.0474 23.4616 14.6569 23.0711L8.29289 16.7071ZM23 17H9V15H23V17Z" fill="#7D8BF6"/>
    </svg>
  </button>
  
  <button className="text-2xl" onClick={handleNextMonth}>
    <svg width="1.9375rem" height="1.9375rem" viewBox="0 0 31 31" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="0" width="1.9375rem" height="1.9375rem" rx="0.5rem" fill="#F8F8F8"/>
      <path d="M22.7071 16.7071C23.0976 16.3166 23.0976 15.6834 22.7071 15.2929L16.3431 8.92893C15.9526 8.53841 15.3195 8.53841 14.9289 8.92893C14.5384 9.31946 14.5384 9.95262 14.9289 10.3431L20.5858 16L14.9289 21.6569C14.5384 22.0474 14.5384 22.6805 14.9289 23.0711C15.3195 23.4616 15.9526 23.4616 16.3431 23.0711L22.7071 16.7071ZM8 17H22V15H8V17Z" fill="#7D8BF6"/>
    </svg>
  </button>
</div>


        </div>
        <table className="w-[41.1875rem] h-[37.6875rem] absolute top-[15.125rem] left-[8.75rem] table-fixed">
  <thead>
    <tr>
      {weekDays.map((day) => (
        <th
          key={day}
          className="p-[0.9375rem] text-[#7D8BF6] font-bold border-none text-left font-outfit text-[1.125rem] leading-[100%] tracking-[5%] align-middle"
        >
          {day}
        </th>
      ))}
    </tr>
  </thead>
  <tbody>
    {calendar.map((week, i) => (
      <tr key={i}>
        {week.map((date, j) => (
          <td
            key={j}
            className={`font-outfit font-semibold text-[1.5625rem] leading-[100%] tracking-[0] text-center align-middle relative p-[1.25rem] font-sans font-bold border border-gray-200 text-left align-top cursor-pointer hover:bg-sky-100 ${
              date.disabled ? "text-[#00D28457] cursor-not-allowed" : ""
            } ${
              date.weekend && !date.disabled ? "text-[#00D284B2]" : ""
            } ${
              selectedDate === `${date.year}-${date.month}-${date.day}`
                ? "text-[#3D53EE]"
                : ""
            }`}
            onClick={() => handleDateClick(date)}
          >
            <span className="absolute top-[0.0625rem] left-[0.0625rem]">
              {date.day}
            </span>
          </td>
        ))}
      </tr>
    ))}
  </tbody>
</table>

    
      </div>  
      <div className="w-full lg:w-1/4 p-4 border mt-4 lg:mt-0">
        <h2 className="text-xl font-semibold mb-2">Activity List</h2>
        {selectedDate && (
          <div>
            <h3 className="mb-2">{selectedDate}</h3>
            <input
              type="text"
              className="w-full p-2 border rounded mb-2"
              placeholder="Add event"
              value={newEvent}
              onChange={(e) => setNewEvent(e.target.value)}
            />
            <button
              className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
              onClick={handleAddEvent}
            >
              Add Event
            </button>
          </div>
        )}
      </div>

    </div>
  );
}
