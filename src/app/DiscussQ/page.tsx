// "use client";
// import { useState , useEffect} from "react";
// import { ThumbsUp, ThumbsDown } from "lucide-react";
// import axios from 'axios';


// const Messages = () => {
//   const [message, setMessage] = useState("");
//   const [messages, setMessages] = useState<string[]>([]);
//   const [vote, setVote] = useState(null);
//   const [questions, setQuestions] = useState<string[]>([]);
//   const [questionsDownVote, setQuestionsDownVote] = useState<string[]>([]);
//   const [questionStored,setQuestionsStored] = useState([]);
// console.log(message)
//   const array_Questions = ["will modi win next election","can i change my preference","is tiger stronger than a lion ?","can i change my preference","is tiger stronger than a lion ?"]

//   // Handle sending a message
//   const sendMessage = () => {
//     if (message.trim() !== "") {
//       setMessages([...messages, message]); // Add new message to the list
//       setMessage(""); // Clear input
//     }
//   };


//   // const handleThumbsdown = (ques) =>{
//   //   try {
//   //     await axios.get("http://localhost:5000/api/updatelike").then((data)=>{
//   //       console.log(data.data,"from databse")
//   //       const extractedData = data.data.map((d) => d.question);

//   //        setQuestionsStored(extractedData)

//   //    })
//   //  } catch (error) {
//   //    console.error("Error fetching event:", error.response ? error.response.data : error.message);
//   //  }
//   // }


//   const handleUpVote = async(type) => {

   

//     console.log(questions.includes(type))
//     if(questions.includes(type) == true){
//       console.log(questions.slice((questions.indexOf(type)),(questions.indexOf(type))),questions,"After removing")
//       setQuestions(questions.slice((questions.indexOf(type)),(questions.indexOf(type))))
//     }
//     else if(questionsDownVote.includes(type)){
      
      

//        setQuestions([...questions,type])
//        setQuestionsDownVote(questionsDownVote.slice((questionsDownVote.indexOf(type)),(questionsDownVote.indexOf(type))))
     
//     }else{
//       try {
//         console.log("Inside the handledoenvote")
//         const response = await fetch("http://localhost:5000/api/updatelike", {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ ques: type}),
//         });
//         console.log(response)
     
//      } catch (error) {
//        console.error("Error fetching event:", error.response ? error.response.data : error.message);
//      }
//       setQuestions([...questions,type])
//       console.log(questions)
//     }
      
//   };

//   const getQuestion = async ()=>{
//     try {
//       await axios.get("http://localhost:5000/api/getQuestion").then((data)=>{
//         console.log(data.data,"from databse")
//         const extractedData = data.data.map((d) => d.question);

//          setQuestionsStored(extractedData)

//      })
//    } catch (error) {
//      console.error("Error fetching event:", error.response ? error.response.data : error.message);
//    }
//   }

//   const handleDownVote = (type) => {
//     console.log(questionsDownVote.includes(type))
//     if(questionsDownVote.includes(type) == true){
//       console.log(questions.slice((questionsDownVote.indexOf(type)),(questionsDownVote.indexOf(type))),questionsDownVote,"After removing")
//       setQuestionsDownVote(questionsDownVote.slice((questionsDownVote.indexOf(type)),(questionsDownVote.indexOf(type))))
//     }else if(questions.includes(type)){
   
//         setQuestions(questions.slice((questions.indexOf(type)),(questions.indexOf(type))))
//         setQuestionsDownVote([...questionsDownVote ,type])     
//     }
//     else{
//       setQuestionsDownVote([...questionsDownVote ,type])
//       console.log(questionsDownVote)
//     }
      
//   };

//   const updateLikeCount = ()=>{
    
//   }

//   const handleFormSubmit = async (e)=>{
//     const response = await fetch("http://localhost:5000/api/question", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ question: message}),
//     });


//   }
//   useEffect(()=>{
//     getQuestion()
//     updateLikeCount()
//   },[])


//   return (
//     <div className="grid grid-cols-2 overscroll-none max-h-full w-full">
//     <div className="min-h-screen flex flex-col items-center font-black bg-gray-100 p-6">
//       {/* Heading */}
//       <h1 className="text-2xl font-bold mb-4">Discuss Your Query</h1>

//       {/* Message List */}
//       <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-4 mb-4 h-80 overflow-y-auto">
//         {messages.length === 0 ? (
//           <p className="text-gray-500 text-center">{message}</p>
//         ) : (
//           messages.map((msg, index) => (
//             <div
//               key={index}
//               className="p-2 my-2 bg-blue-100 rounded-md text-gray-700"
//             >
//               {msg}
//             </div>
//           ))
//         )}
//       </div>

//       {/* Message Input & Button */}
//       <div className="w-full max-w-md flex items-center gap-2">
//         <form onSubmit={handleFormSubmit}>
//         <input
//           type="text"
//           placeholder="Type your message..."
//           className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
//           value={message}
//           name="question"
//           onChange={(e) => setMessage(e.target.value)}
//         />
//         <button
//           type="submit"
//           className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
//         >
//           Send
//         </button>
//         </form>
//       </div>
//     </div>
//     <div className="max-h-[90%] grid gap-4 overflow-y-auto w-full ml-[23px]">
//           <h3 className="text-2xl font-semibold text-black-200  text-center  flex animate-pulse">Queries</h3>
//       {questionStored.map((ques) =>(
//        <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-white-800 dark:border-gray-700">
//        <a href="#">
//            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-black">{ques}</h5>
//        </a>
//        <p className="mb-3 font-normal text-gray-700 dark:text-black-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
//        <div className="flex gap-2 font-white gap-3">
//       <button
//         onClick={() => handleUpVote(ques)}
//         className={`p-2 rounded-full transition-colors ${
//           questions.includes(ques) ? "bg-blue-500 text-white" : "bg-gray-200"
//          }`}
//       >
//         <ThumbsUp size={15} />
        
//       </button>
//       <span className="text-black text-m">21</span>

//       <button
//         onClick={() => handleDownVote(ques)}
//         className={`p-2 rounded-full transition-colors ${
//           questionsDownVote.includes(ques) ? "bg-red-500 text-white" : "bg-gray-200"
//         }`}
//       >
//         <ThumbsDown size={15} />
//       </button>
//       <span className="text-black text-m">21</span>

//     </div>
//    </div>
   

//       ))}
//     </div>
//     </div>
//   );
// };

// export default Messages;


"use client";
import { useState } from "react";
import axios from "axios";
import * as XLSX from "xlsx";

const Messages = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<string[]>([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [parsedDates, setParsedDates] = useState<string[]>([]);

  const sendMessage = () => {
    if (message.trim() !== "") {
      setMessages([...messages, message]);
      setMessage("");
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);

    const reader = new FileReader();
    reader.onload = (evt) => {
      const data = new Uint8Array(evt.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

      const currentYear = new Date().getFullYear();
      const formattedDates = jsonData
        .slice(1) // skip header row
        .map((row) => {
          const rawDate = row[0]; // assuming date is in first column (e.g., "1-Jan")

          if (typeof rawDate !== "string") return null;

          try {
            const dateObj = new Date(`${rawDate}-${currentYear}`);
            if (isNaN(dateObj.getTime())) return null;

            const yyyy = dateObj.getFullYear();
            const mm = dateObj.getMonth() + 1;
            const dd = dateObj.getDate();

            return `${yyyy}-${dd}-${mm}`;
          } catch (error) {
            return null;
          }
        })
        .filter(Boolean);

      setParsedDates(formattedDates);
      console.log("Parsed Dates:", formattedDates);
    };

    reader.readAsArrayBuffer(file);
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
          "Content-Type": "multipart/form-data",
        },
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
      <h1 className="text-2xl font-bold mb-4">Discuss Your Query</h1>

      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-4 mb-4 h-80 overflow-y-auto">
        {parsedDates.length > 0 ? (
          parsedDates.map((date, idx) => (
            <div key={idx} className="p-2 my-2 bg-green-100 rounded-md text-gray-700">
              {date}
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center">No dates parsed yet...</p>
        )}
      </div>

      <div className="w-full max-w-md flex flex-col gap-2">
        <form onSubmit={handleSubmit}>
          <input type="file" accept=".xlsx, .xls" onChange={handleFileChange} />
          <button
            type="submit"
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Upload Excel
          </button>
        </form>
      </div>
    </div>
  );
};

export default Messages;

