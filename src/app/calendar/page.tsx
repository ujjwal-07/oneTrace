"use client"
import React from 'react'
import { useState, useEffect } from "react";
import api from "axios";
import axios from 'axios';
import * as XLSX from "xlsx";
import Image from "next/image";
import ActivityListPage from "../Activity_List/page";
import Link from 'next/link';
const page = () => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [events, setEvents] = useState({});
    const [selectedDate, setSelectedDate] = useState(`${currentDate.getFullYear()}-${currentDate.getMonth()+1}-${currentDate.getDate()}`);
    const [eventSelectedDate, setEventSelectedDate] = useState(selectedDate);
    const [newEvent, setNewEvent] = useState("");
    const [selectedFile, setSelectedFile] = useState(null);
    const [parsedDates, setParsedDates] = useState<string[]>([]);
    const [loading, setLoading] = useState(false); 
    const [dropdownOpen, setDropdownOpen] = useState(null);
    const [eventsData, setEventsData] = useState([0])
    const [openlist, setOpenlist] = useState(false)
    const [eventsDatList, setEventsDataList] = useState([])
    const [eventDatastored, setEventDataStored] = useState([])
    const [initialDate,setInitialDate] = useState("")
    const [rjson, setJson] = useState("")
    const [showSecond, setShowSecond] = useState(false);

    let date = ''
    const lightColors = [
      "bg-[#FFF7F7] border-l-8 border-[#FF847E]  text-[#353434]",
      "bg-[#F2FAFF] border-l-8 border-[#7EC1FF]  text-[#353434]",
      "bg-[#FFF7E2] border-l-8 border-[#FFD35D]  text-[#353434]",
      "bg-[#F6FFED] border-l-8 border-[#87C95F] text-[#353434]"]
    
    const months = Array.from({ length: 12 }, (_, i) => new Date(0, i).toLocaleString("default", { month: "long" }));
    const years = Array.from({ length: 21 }, (_, i) => currentDate.getFullYear() - 10 + i);



    const handleClickForActivities = () => {
      setShowSecond(true);
    };

// code for Excel upload


const handleFileChange = async(e) => {
  const file = await e.target.files[0];
  setSelectedFile(file);
  console.log("Inside file")
  const reader = new FileReader();
  reader.onload = (evt) => {
    const data = new Uint8Array(evt.target.result);
    const workbook = XLSX.read(data, { type: "array" });
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

    const currentYear = new Date().getFullYear();
    const formattedDates = jsonData
      .slice(1)
      .map((row) => {
        const rawDate = row[0];
        if (typeof rawDate !== "string") return null;

        try {
          const dateObj = new Date(`${rawDate}-${currentYear}`);
          if (isNaN(dateObj.getTime())) return null;

          const yyyy = dateObj.getFullYear();
          const mm = String(dateObj.getMonth() + 1).padStart(2, "0");
          const dd = String(dateObj.getDate()).padStart(2, "0");

          return `${yyyy}-${dd}-${mm}`;
        } catch (error) {
          return null;
        }
      })
      .filter(Boolean);

    setParsedDates(formattedDates);
    console.log("Parsed Dates:", formattedDates);
    handleSubmitForExcel(file)
    e.target.value = null;


  };

  reader.readAsArrayBuffer(file);
  setSelectedFile(file)
};

const handleSubmitForExcel = async (file) => {

  if(!file){
    alert("Please select a file")
  }

console.log("Inside here")
  const formData = new FormData();
  formData.append("excelFile", file);  
  console.log(file)
  try {
    setLoading(true); // start loading

    const response = await axios.post("http://localhost:5000/api/store_excel_data", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    if (response.data) {
      setLoading(false); // start loading
      alert("File uploaded successfully!");
      setSelectedFile(null)
      getEventsData()
    }
  } catch (error) {
    alert(`Upload failed: ${error.response?.data?.message || "Unknown error"}`);
  
    setSelectedFile(null)
  } finally {
    setLoading(false); // stop loading in all cases
  }
};


// const handleOpenModal = (ques) => {
//   setShowModal(true);
//   setSelectedQues(ques)
// };

// const handleCloseModal = () => {
//   setShowModal(false);
// };




// code end for excel upload





    const getEventsData = async () => {
        try {
          const response = await axios.get("http://localhost:5000/api/getEvents");
          const data = response.data;
          console.log(currentDate.getDate())
          console.log(currentDate.getMonth())
          console.log(currentDate.getFullYear())

          
          // Extract dates and event counts
          const extractedData = data.map((d) => d.date);
          const extractlen = data.map((d) => d.events.length);
      
          // Update states together
          setEventsData(extractedData);
          setEventsDataList(extractlen);
          try {
            await axios.get(`http://localhost:5000/api/event/${selectedDate}`).then((data)=>{
               setEventDataStored(data.data.events)
           })
         } catch (error) {
           console.error("Error fetching event:", error.response ? error.response.data : error.message);
         }

          //   if(openlist){
          //       setOpenlist(false)
          // const response = await axios.get("http://localhost:5000/api/getEvents");
          // const data = response.data;
      
          // // Extract dates and event counts
          // const extractedData = data.map((d) => d.date);
          // const extractlen = data.map((d) => d.events.length);
      
          // // Update states together
          // setEventsData(extractedData);
          // setEventsDataList(extractlen);
          // console.log(eventsDatList)
          //   }
            // else{
            //     setOpenlist(true)
            //     setEventsData(extractedData);
            //     setEventsDataList([]);
            // }
          // Debugging: Log state inside a useEffect
        } catch (error) {
          console.error("Error fetching events:", error);
        }
      };
  console.log(eventsData, "this is the events data")
  console.log(eventsDatList, "this is the events list data")

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
      const firstDay = new Date(year, month, 1).getDay(); // First day of the month (0 = Sunday, 6 = Saturday)
      const daysInMonth = new Date(year, month + 1, 0).getDate(); // Total days in current month
      const prevMonthDays = new Date(year, month, 0).getDate(); // Days in previous month
    
      let calendar = [];
      let dayCount = 1;
      let prevMonthStart = prevMonthDays - firstDay + 1;
      let nextMonthStart = 1;
    
      // Determine the number of weeks needed (5 for Feb in most cases)
      let totalCells = firstDay + daysInMonth; // Total number of cells occupied by the month
      let totalWeeks = Math.ceil(totalCells / 7); // Number of weeks required (usually 4 or 5)
    
      for (let i = 0; i < totalWeeks; i++) {
        let week = [];
        for (let j = 0; j < 7; j++) {
          let isWeekend = j === 0 || j === 6;
    
          if (i === 0 && j < firstDay) {
            // Days from previous month
            week.push({ day: prevMonthStart++, month: month - 1, year, disabled: true, weekend: isWeekend });
          } else if (dayCount > daysInMonth) {
            // Days from next month
            week.push({ day: nextMonthStart++, month: month + 1, year, disabled: true, weekend: isWeekend });
          } else {
            // Current month's days
            week.push({ day: dayCount++, month, year, disabled: false, weekend: isWeekend });
          }
        }
        calendar.push(week);
      }
      
      return calendar;
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        if(newEvent.trim() !== ""){

          
        try {
          if(newEvent.length < 200){
          const response = await fetch("http://localhost:5000/api/events", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ date: selectedDate, event: newEvent }),
          });
          
          if (response.status == 400) {
            console.log(response.data)
            alert(`${newEvent} already present in the Activity List for date ${selectedDate}`);
          }
      
          const data = await response.json();
          console.log("Event added:", data);
          
          if(response.ok){
          // Update event list locally
          setEventDataStored((prevEvents) => [...prevEvents, newEvent]);
      
          setNewEvent(""); // Clear input field
          getEventsData()
          }
        }
        else{
          alert("Activity cant be more than 200 charachters long");

        }
        } catch (error) {
          console.error("Error adding event:", error);
          alert("Failed to add event");
        }
      }
      else{
        alert("Activity cant be empty")
      }
      };


  
    const handleDateClick = async (date) => {
      if (!date.disabled) {
        const formattedDate = `${date.year}-${date.month+1}-${date.day}`;
        setSelectedDate(selectedDate === formattedDate ? null : formattedDate);
        console.log(selectedDate, "it is ",formattedDate)
        
        try {
             await axios.get(`http://localhost:5000/api/event/${formattedDate}`).then((data)=>{
                setEventDataStored(data.data.events)
            })
          } catch (error) {
            console.error("Error fetching event:", error.response ? error.response.data : error.message);
          }
      }
      console.log(setEventDataStored, "Stored one")

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
    const handleDeleteEvent = async (date, index) => {
      const descision = confirm("Do you want to delete this Activity ?")
      if(descision){
        try {
          const response = await axios.post("http://localhost:5000/api/deleteEvents", { date, index });
      
          if (response.status === 200) {
            alert("Event deleted successfully!");
            
            // Update event list without reloading the whole page
            setEventDataStored((prevEvents) => prevEvents.filter((_, i) => i !== index));
            getEventsData()
          } else {
            alert("Failed to delete event.");
          }
        } catch (error) {
          console.error("Error deleting event:", error);
          alert("Failed to delete event.");
        }
      }
      else{
        
      }
      };
    const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const calendar = generateCalendar();

    useEffect(()=>{
      
        getEventsData()
        
    },[selectedFile])
  return (
<>
{showSecond ? ( <ActivityListPage />):(

    <div className= "grid sm:grid-cols-12 gap-4">

        <div className="min-h-[800px] rounded-lg  col-span-8 flex justify-start">   
          <div className="w-3/4 p-4 flex flex-col items-center relative">
      <div className="w-full max-w-80 h-8 absolute top-8 -translate-x-1/2 left-14 md:left-[8.75rem] md:translate-x-0">
      <h1 className="font-outfit font-semibold text-[2.25rem] leading-[1] tracking-[0.05em] align-middle text-[#737373]">
            Activity Calendar
          </h1>
        </div>
        <div className="mb-4 flex justify-between w-full px-4 items-center">
        <div className="relative flex gap-4 w-[9.8125rem] h-[1.75rem] absolute top-16 left-14 md:left-[6.75rem]">
  {/* Month Button */}
  <button
    className="font-outfit font-light text-[1.375rem] leading-[1] tracking-[0.05em] align-middle text-[#737373]"
    onClick={() => setDropdownOpen(dropdownOpen === "month" ? null : "month")}
  >
    {months[currentDate.getMonth()]}
  </button>

  {/* Scrollable Month Dropdown */}
  {dropdownOpen === "month" && (
    <div className="absolute top-full left-0 bg-white border border-gray-300 shadow-md mt-1 w-full z-10 max-h-48 overflow-y-auto rounded-md">
      {months.map((month) => (
        <div
          key={month}
          className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
          onClick={() => handleMonthChange(month)}
        >
          {month}
        </div>
      ))}
    </div>
  )}

  {/* Year Button */}
  <button
    className="font-outfit font-light text-[1.375rem] leading-[1] tracking-[0.05em] align-middle text-[#737373]"
    onClick={() => setDropdownOpen(dropdownOpen === "year" ? null : "year")}
  >
    {currentDate.getFullYear()}
  </button>

  {/* Scrollable Year Dropdown */}
  {dropdownOpen === "year" && (
    <div className="absolute top-full left-20 bg-white border border-gray-300 shadow-md mt-1 w-24 z-10 max-h-48 overflow-y-auto rounded-md">
      {years.map((year) => (
        <div
          key={year}
          className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
          onClick={() => handleYearChange(year)}
        >
          {year}
        </div>
      ))}
    </div>
  )}
</div>

<div className="flex gap-1.5 absolute top-16 left-[20rem] md:left-[38.3125rem] w-max">
  <button className="text-2xl" onClick={handlePrevMonth}>
    <svg 
      width="1.9375rem" 
      height="1.9375rem" 
      viewBox="0 0 31 31" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className="transition-all duration-200 hover:scale-110 hover:shadow-md"
    >
      <rect width="1.9375rem" height="1.9375rem" rx="0.5rem" fill="#F8F8F8" className="hover:fill-[#e0e0e0]"/>
      <path d="M8.29289 16.7071C7.90237 16.3166 7.90237 15.6834 8.29289 15.2929L14.6569 8.92893C15.0474 8.53841 15.6805 8.53841 16.0711 8.92893C16.4616 9.31946 16.4616 9.95262 16.0711 10.3431L10.4142 16L16.0711 21.6569C16.4616 22.0474 16.4616 22.6805 16.0711 23.0711C15.6805 23.4616 15.0474 23.4616 14.6569 23.0711L8.29289 16.7071ZM23 17H9V15H23V17Z" 
        fill="#7D8BF6"
        className="hover:fill-[#5a6cf0]"
      />
    </svg>
  </button>

  <button className="text-2xl" onClick={handleNextMonth}>
    <svg 
      width="1.9375rem" 
      height="1.9375rem" 
      viewBox="0 0 31 31" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className="transition-all duration-200 hover:scale-110 hover:shadow-md"
    >
      <rect width="1.9375rem" height="1.9375rem" rx="0.5rem" fill="#F8F8F8" className="hover:fill-[#e0e0e0]"/>
      <path d="M22.7071 16.7071C23.0976 16.3166 23.0976 15.6834 22.7071 15.2929L16.3431 8.92893C15.9526 8.53841 15.3195 8.53841 14.9289 8.92893C14.5384 9.31946 14.5384 9.95262 14.9289 10.3431L20.5858 16L14.9289 21.6569C14.5384 22.0474 14.5384 22.6805 14.9289 23.0711C15.3195 23.4616 15.9526 23.4616 16.3431 23.0711L22.7071 16.7071ZM8 17H22V15H8V17Z" 
        fill="#7D8BF6"
        className="hover:fill-[#5a6cf0]"
      />
    </svg>
  </button>
</div>


        </div>
        <table className="w-full max-w-[38.1875rem] max-h-[38rem] md:h-[37.6875rem] absolute top-35 left-14 md:left-[8.75rem] table-fixed">
          <thead>
            <tr>
              {weekDays.map((day) => (
                <th
                  key={day}
                  className="p-2 text-[#7D8BF6] text-[1.2625rem]  font-bold border-none font-outfit leading-none mt-1 tracking-wide text-left"
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
                    className={`font-outfit font-semibold text-[1.5625rem] leading-none tracking-normal text-center md:text-left align-top relative p-5 md:p-6 border border-gray-200 cursor-pointer hover:bg-sky-100 ${
                      date.disabled ? "text-[#00D28457] cursor-not-allowed" : ""
                    } ${
                      date.weekend && !date.disabled ? "text-[#00D284B2]" : ""
                    } ${
                      selectedDate === `${date.year}-${date.month+1}-${date.day}`
                        ? "text-[#3D53EE] bg-blue-100"
                        : ""
                    }`}
                    onClick={() => handleDateClick(date)}
                  >
                    <span className="absolute top-[0.5925rem] left-[0.5925rem]">
                      {date.day}
                      
                      
                    </span>
                    {(eventsData.includes(`${date.year}-${date.month+1}-${date.day}`) && eventsDatList[eventsData.indexOf(`${date.year}-${date.month+1}-${date.day}`)] > 0 )&&  
  <div className="rounded-[5px] h-[21px] w-[35px] bg-[#FF625B] absolute top-[3.5625rem] left-[0.1625rem] grid place-items-center text-white text-sm">
    {  eventsDatList[eventsData.indexOf(`${date.year}-${date.month+1}-${date.day}`)]}
  </div>
}                  </td>
                ))}
              </tr>
            ))}
          </tbody>
            <td>
              <Link href={{pathname:"Activity_List"}}>
            <div className='mt-4'>
          <button className='rounded-[5px] bg-[#3D53EE] text-white w-40 h-10' >List of Activities</button>
          </div>
          </Link>
          </td>
        </table>
      </div>
      
      </div>
      <div className="max-h-[673px] relative top-[70px] border border-gray-200 bg-white rounded-lg col-span-3 flex flex-col ">
  <div>
  <div className="flex justify-between items-center mb-4 mt-4">

<h2 className="text-md font-bold text-xl text-gray-700 mb-2 mt-2 ml-4 flex items-center justify-center">
   Activities List
</h2>

<label className="relative group text-md text-2xl font-bold text-gray-700 px-3 py-1 rounded hover:bg-gray-200 cursor-pointer">
  +
  {/* Wider Tooltip */}
  <span className="absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-2 text-xs text-white bg-black rounded opacity-0 group-hover:opacity-100 transition duration-200 pointer-events-none z-10 min-w-[120px] text-center whitespace-nowrap">
    Select a file to upload
  </span>

  <input
    type="file"
    name="myFile"
    accept=".xlsx, .xls"
    className="absolute opacity-0 w-0 h-0"
    onChange={handleFileChange}
  />
</label>
</div>
      {loading && (
        <div className="backdrop-blur bg-white/30 fixed inset-0 bg-opacity-60 z-50  flex justify-center items-center">
          <div className="animate-pulse flex justify-center items-center">
            <Image  
            className="animate-bounce"
            src="/logoot.png"
            alt="Window icon"
            width={50}
            height={50}/>

<h1 className="text-[45px] text-black font-light">

<span className="text-[#3D53EE] font-light">NE</span>TRACE</h1>      </div>  </div>
      )}

    
    <hr></hr>
    
   { selectedDate ? (<h3 className="text-lg font-semibold text-blue-700 px-3 py-1 text-center mb-3">
      📅 {selectedDate}
    </h3>):( <></>)}
        <div className="max-h-[490px]  overflow-y-auto flex flex-col w-full p-4 bg-white  rounded-lg">

  {/* Activity List Title */}

  {selectedDate && eventDatastored.length > 0 ? (
    
<ul className="w-full space-y-3">
  {eventDatastored.map((event, index) => {
    const randomColor = lightColors[index % lightColors.length];

    return (
      <li
        key={index}
        className={`flex justify-between items-center ${randomColor} border-l-4 shadow-sm px-4 py-2 rounded-lg hover:opacity-70 transition-all`}
      >
        {/* Ensure text stays within a controlled width */}
        <div className="flex-1 min-w-0">
          <span className="break-words whitespace-normal block font-medium">
            {index + 1}. {event}
          </span>
        </div>

        {/* Fixed width for the delete button */}
        <button
          className="text-gray-600 hover:text-gray-800 p-2 text-lg shrink-0 cursor-pointer"
          onClick={() => handleDeleteEvent(selectedDate, index)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-gray-500 hover:text-red-600 transition-all"
          >
            <path d="M4 6h16" />
            <path d="M6 6v14a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V6" />
            <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
            <line x1="10" y1="11" x2="10" y2="17" />
            <line x1="14" y1="11" x2="14" y2="17" />
          </svg>
        </button>
      </li>
    );
  })}
</ul>

  ) : (
    <div className="flex flex-col items-center justify-center text-gray-500 mt-10">
    {/* Animated No Events SVG */}
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-24 h-24 opacity-80 animate-bounce"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Clipboard */}
      <rect x="3" y="5" width="18" height="16" rx="2" ry="2" />
      <path d="M16 2v4M8 2v4M3 8h18" />
  
      {/* Animated Checkmark */}
      <path
        d="M8 15l2 2 4-4"
        stroke="green"
        strokeWidth="2"
        className="animate-draw-check"
      />
    </svg>
  
    <p className="mt-3 text-lg font-medium text-gray-600">
      No Activities Added Yet!
    </p>
  </div>
  )}
</div>


  </div>

  {/* Input field and button stick to the bottom */}
  {selectedDate && (
    <div className="mt-auto p-2 w-full flex items-center  bg-white shadow-md rounded-lg">
  <form onSubmit={handleSubmit} className="flex items-center w-full">
    <input
      type="text"
      className="w-full p-4 outline-none focus:border-none peer"
      placeholder="Add Activities"
      value={newEvent}
      name="event"
      onChange={(e) => setNewEvent(e.target.value)}
    />
      <div className="absolute left-4 bottom-3 w-45 border-b-2 border-gray-300 transition-colors duration-200 peer-focus:border-blue-500"></div>

    <button
      type="submit"
      className=" p-4 ml-6 bg-blue-500 text-white hover:bg-blue-600 flex items-center justify-center w-12 h-[2rem] rounded-lg"
    >
      Add
    </button>
  </form>
</div>
  )}
</div>



    </div>
    )}
    </>
  )
}

export default page