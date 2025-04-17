"use client";
import { useState , useEffect} from "react";
import { ThumbsUp, ThumbsDown } from "lucide-react";
import axios from 'axios';
import Modal from "./Modal"

const Messages = () => {
  const [message, setMessage] = useState("");
  const [like, setlike] = useState(21)
  const [dislike,setDislike] = useState(like)
  const [messages, setMessages] = useState<string[]>([]);
  const [vote, setVote] = useState(null);
  const [questions, setQuestions] = useState<string[]>([]);
  const [questionsDownVote, setQuestionsDownVote] = useState<string[]>([]);
  const [questionStored,setQuestionsStored] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedQues, setSelectedQues] = useState("")
console.log(message)
  const array_Questions = ["will modi win next election","can i change my preference","is tiger stronger than a lion ?","can i change my preference","is tiger stronger than a lion ?"]

  // Handle sending a message
  const sendMessage = () => {
    if (message.trim() !== "") {
      setMessages([...messages, message]); // Add new message to the list
      setMessage(""); // Clear input
    }
  };


  // const handleThumbsdown = (ques) =>{
  //   try {
  //     await axios.get("http://localhost:5000/api/updatelike").then((data)=>{
  //       console.log(data.data,"from databse")
  //       const extractedData = data.data.map((d) => d.question);

  //        setQuestionsStored(extractedData)

  //    })
  //  } catch (error) {
  //    console.error("Error fetching event:", error.response ? error.response.data : error.message);
  //  }
  // }


  const handleUpVote = async(type) => {

   

    console.log(questions.includes(type))
    if(questions.includes(type) == true){
     
      setlike(like-1)
      console.log(questions.slice((questions.indexOf(type)),(questions.indexOf(type))),questions,"After removing")
      setQuestions(questions.slice((questions.indexOf(type)),(questions.indexOf(type))))
    }
    else if(questionsDownVote.includes(type)){
      
      
       setQuestions([...questions,type])
       setlike(like-1)

       setQuestionsDownVote(questionsDownVote.slice((questionsDownVote.indexOf(type)),(questionsDownVote.indexOf(type))))
     
    }else{
      setlike(like+1)
      try {
        console.log("Inside the handledoenvote")
        const response = await fetch("http://localhost:5000/api/updatelike", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ques: type}),
        });
        console.log(response)
     
     } catch (error) {
       console.error("Error fetching event:", error.response ? error.response.data : error.message);
     }
      setQuestions([...questions,type])
      console.log(questions)
    }
  };

  const getQuestion = async ()=>{
    try {
      await axios.get("http://localhost:5000/api/getQuestion").then((data)=>{
        console.log(data.data,"from databse")
        const extractedData = data.data.map((d) => d.question);

         setQuestionsStored(extractedData)

     })
   } catch (error) {
     console.error("Error fetching event:", error.response ? error.response.data : error.message);
   }
  }

  const handleOpenModal = (ques) => {
    setShowModal(true);
    setSelectedQues(ques)
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleDownVote = (type) => {
    console.log(questionsDownVote.includes(type))
    if(questionsDownVote.includes(type) == true){
      setDislike(dislike-1)
      console.log(questions.slice((questionsDownVote.indexOf(type)),(questionsDownVote.indexOf(type))),questionsDownVote,"After removing")
      setQuestionsDownVote(questionsDownVote.slice((questionsDownVote.indexOf(type)),(questionsDownVote.indexOf(type))))
    }else if(questions.includes(type)){
      setlike(like-1)
      setDislike(dislike-1)


        setQuestions(questions.slice((questions.indexOf(type)),(questions.indexOf(type))))
        setQuestionsDownVote([...questionsDownVote ,type])     
    }
    else{
      setDislike(dislike+1)
      setQuestionsDownVote([...questionsDownVote ,type])
      console.log(questionsDownVote)
    }
      
  };

  const updateLikeCount = ()=>{
    
  }

  const handleFormSubmit = async (e)=>{
    const response = await fetch("http://localhost:5000/api/question", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question: message}),
    });


  }
  useEffect(()=>{
    getQuestion()
    updateLikeCount()
  },[questions,questionsDownVote])


  return (
    <div className="grid grid-cols-2 overscroll-x-none max-h-[80%] w-full">
    <div className="min-h-screen flex flex-col items-center font-black bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-4">Discuss Your Query</h1>

      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-4 mb-4 h-80 overflow-y-auto">
        {messages.length === 0 ? (
          <p className="text-gray-500 text-center">{message}</p>
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

      <div className="w-full max-w-md flex items-center gap-2">
        <form onSubmit={handleFormSubmit}>
        <input
          type="text"
          placeholder="Type your message..."
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={message}
          name="question"
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
        >
          Send
        </button>
        </form>
      </div>
    </div>
    <div className="max-h-[80%] grid gap-4 overflow-y-auto w-full ml-[23px]">
          <h3 className="text-2xl font-semibold text-black-200  text-center   flex animate-pulse">Queries</h3>
      {questionStored.map((ques) =>(
       <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-white-800 dark:border-gray-700 " key={ques} >
       <a href="#">
           <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-black" onClick={()=>{handleOpenModal(ques)}}>{ques}</h5>
       </a>
       <p className="mb-3 font-normal text-gray-700 dark:text-black-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
       <div className="flex gap-2 font-white gap-3">
      <button
        onClick={() => handleUpVote(ques)}
        className={`p-2 rounded-full transition-colors ${
          questions.includes(ques) ? "bg-blue-500 text-white" : "bg-gray-200"
         }`}
      >
        <ThumbsUp size={15} />
        
      </button>
      <span className="text-black text-m">{like}</span>

      <button
        onClick={() => handleDownVote(ques)}
        className={`p-2 rounded-full transition-colors ${
          questionsDownVote.includes(ques) ? "bg-red-500 text-white" : "bg-gray-200"
        }`}
      >
        <ThumbsDown size={15} />
      </button>
      <span className="text-black text-m">{dislike}</span>

    </div>
   </div>
   

      ))}
    </div>
    {showModal && (
        <Modal onClose={handleCloseModal}>
          <form className="w-2xl h-2xl">
            <div>
              <label className="block text-gray-700">Query:</label>
              <input
                type="text"
                name="name"
                value={selectedQues}
                disabled
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div>
              <label className="block text-gray-700">Response</label>
              <input
                type="email"
                name="email"
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="flex justify-center space-x-2 p-1.5">
              <button
                type="button"
                onClick={handleCloseModal}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 flex items-center"
              >
                Submit
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};

export default Messages;
