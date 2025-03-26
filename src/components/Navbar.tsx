"use client";

import Image from "next/image";
import Link from "next/link";
import { 
  Home,
  Calendar,
  TrendingUp,
  Trophy,
  MessageSquare,
  User,
  Settings,
  LogOut
} from "lucide-react";

const Navbar = () => {
  return (
    <aside className="w-[280px] h-screen bg-[#F7F7FF] text-[#777777] justify-center flex flex-col fixed">
      <div className="flex items-center gap-1 mb-10 mt-14 ">
        <div className="w-8 h-18 bg-primary rounded-lg flex items-center justify-center">
          {/* <span className="text-lg font-bold">O</span> */}
        </div>


        <Image  

            src="/logoot.png"
            alt="Window icon"
            width={32}
            height={32}/>
       
        <h1 className="text-xl text-black font-light">
          
         <span className="text-[#3D53EE] font-light">NE</span>TRACE</h1>
      </div>
      
      <nav className="flex-1 space-y-2 ">
        <Link 
          href="/" 
          className="flex items-center gap-3 px-4 py-3 focus:border-r-5 pl-10 focus:text-[#3D53EE] focus:bg-[#E7E8FF] hover:bg-[#E7E8FF] focus:font-semibold    hover:text-[#3D53EE] transition-colors"
        >
          <Home className="w-5 h-5 " />
          <span>Home</span>
        </Link>
        
        <Link 
          href="/calendar" 
          className="flex items-center gap-3 px-4 py-3 focus:border-r-5 pl-10 focus:text-[#3D53EE] focus:bg-[#E7E8FF] hover:bg-[#E7E8FF] focus:font-semibold    hover:text-[#3D53EE] transition-colors"
        >
          <Calendar className="w-5 h-5" />
          <span>Calendar</span>
        </Link>
        
        <Link 
          href="/performance" 
          className="flex items-center gap-3 px-4 py-3 focus:border-r-5 pl-10 focus:text-[#3D53EE] focus:bg-[#E7E8FF] hover:bg-[#E7E8FF] focus:font-semibold    hover:text-[#3D53EE] transition-colors"
        >
          <TrendingUp className="w-5 h-5" />
          <span>Performance</span>
        </Link>
        

        <Link 
          href="/leaderboard" 
          className="flex items-center gap-3 px-4 py-3 focus:border-r-5 pl-10 focus:text-[#3D53EE] focus:bg-[#E7E8FF] hover:bg-[#E7E8FF] focus:font-semibold    hover:text-[#3D53EE] transition-colors"
        >
          <Trophy className="w-5 h-5" />
          <span>LeaderBoard</span>
        </Link>
        

        <Link 
          href="/DiscussQ" 
          className="flex items-center gap-3 px-4 py-3 focus:border-r-5 pl-10 focus:text-[#3D53EE] focus:bg-[#E7E8FF] hover:bg-[#E7E8FF] focus:font-semibold    hover:text-[#3D53EE] transition-colors"
        >
           <MessageSquare className="w-5 h-5" />
          <span>Discuss your query</span>
        </Link>
        
        
        
     
      </nav>
      


      <div className=" border-white/10 pt-4 flex  mt-4 space-y-2">
        <Link 
          href="/profile" 
          className="flex items-center gap-3 px-4 py-3  hover:[#E7E8FF] transition-colors"
        >
          <User className="w-5 h-5" />
          <span>Profile</span>
        </Link>
        
       
        
        <button 
          className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-[#E7E8FF] transition-colors w-full text-left text-red-400"
        >
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Navbar;