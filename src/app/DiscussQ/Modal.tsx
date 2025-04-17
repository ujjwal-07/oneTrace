// Modal.js
import React from 'react';

const Modal = ({ children, onClose }) => {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-md"
      onClick={onClose}
    >
      <div
        className="bg-white p-6 rounded-lg shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;




// {showModal && (
//     <Modal onClose={handleCloseModal}>
//       <div className="w-[700px] h-[100%] bg-white p-6 rounded-lg shadow-xl">
//         <button
//           type="button"
//           onClick={handleCloseModal}
//           className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 mb-4"
//         >
//           Close
//         </button>
  
//         <h1 className='font-[Outfit] font-semibold text-[25px] leading-[100%] tracking-[5%] align-middle mb-2'>
//           ACTIVITY LIST
//         </h1>
//         <h2 className='text-[#737373] text-[20px] mb-4'>
//           14th Feb 2025 - 14th Apr 2025
//         </h2>
  
//         {/** Activity List Array */}
//         {(() => {
//           const activities = [
//             "Jio TV Sanity",
//             "OTT Regression",
//             "Backend Smoke Test",
//             "Channel Surfing",
//             "Login Test Flow",
//             "UX Review",
//             "Performance Test"
//           ];
  
//           const isTwoColumn = activities.length > 5;
  
//           return (
//             <ul
//               className={`gap-4 ${
//                 isTwoColumn ? "grid grid-cols-2" : "flex flex-col"
//               }`}
//             >
//               {activities.map((activity, index) => (
//                 <li
//                   key={index}
//                   className="flex items-center w-full rounded-[6px] bg-[#F5F7FF] text-gray-800 shadow-sm overflow-hidden"
//                 >
//                   <div className="bg-[#3C4FE0] text-white px-4 py-2 text-sm font-semibold">
//                     {index + 1}
//                   </div>
//                   <div className="pl-4 py-2 font-semibold text-base">
//                     {activity}
//                   </div>
//                 </li>
//               ))}
//             </ul>
//           );
//         })()}
//       </div>
//     </Modal>
//   )}