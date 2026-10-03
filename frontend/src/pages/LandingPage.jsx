import { useState } from "react";
import PickleBall from "../assets/PickleBall.jpg";
import arenaX from"../assets/arenaX.png" ; 
import Login from "../components/userComponents/Login";
import ForgotPassword from "../components/userComponents/ForgotPassword";
import SignUp from "../components/userComponents/SignUp";
import OwnerLogin from "../components/ownerComponents/ownerLogin";
import OwnerForgotPassword from "../components/ownerComponents/ownerForgot";
import OwnerSignUp from "../components/ownerComponents/ownerSignUp";

function LandingPage() {

  const [authMode,setAuthMode ]   = useState(null) ; 


  return (
    <>
      <div
        className="relative  h-screen bg-cover bg-center "
        style={{ backgroundImage: `url(${PickleBall})` }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="absolute z-20 inset-x-0 top-0  flex justify-between items-center px-10 py-6">
        <div className=" flex items-center gap-2" >
          <img src={arenaX} alt="logo" className="h-8 w-8" />
          <h1 className=" text-gray-200 text-xl  ">
            Arena'X
          </h1>
          </div>
          <div className=" flex items-center gap-4 ">
            <button onClick={()=>setAuthMode("login")} className=" text-gray-200 text-xl cursor-pointer ">Login</button>
          

          <span className="text-gray-400">|</span>
          <button onClick={()=>setAuthMode("signUp")} className=" text-gray-200 text-xl cursor-pointer ">
            SignUp
          </button>
          </div>

          </div>

        <div className="relative z-10  flex flex-col h-full items-center justify-center gap-8">
          <h1 onClick={()=> setAuthMode("login")} className="text-5xl font-bold text-white hover:text-[60px] duration-500 cursor-pointer">
            Find Your Next Arena →
          </h1>

          <p className="text-xl text-gray-200">Book • Play • Compete</p>

       
        </div>

        {authMode=="login" && (
          <Login onClose={()=>setAuthMode(null)}
           onForgotPassword={() => setAuthMode("forgot")}
           onSignUp={()=>setAuthMode("signUp")}
           onOwnerLogin={()=>setAuthMode("ownerLogin")}
            />
           )}

        

        {authMode=="forgot" && (
          <ForgotPassword onClose={()=>setAuthMode(null)}/>)}

        {authMode=="signUp" && (
          <SignUp onClose={()=>setAuthMode(null)}
          onOwnerSignUp={()=>setAuthMode("ownerSignUp")}/>)}
        
        {authMode=="ownerLogin" &&(
          <OwnerLogin onClose={()=> setAuthMode(null)}
          onForgotPassword={() => setAuthMode("ownerForgot")}
           onOwnerSignUp={()=>setAuthMode("ownerSignUp")}

          />
        )}
         {authMode=="ownerForgot" && (
          <OwnerForgotPassword onClose={()=>setAuthMode(null)}/>)}
         {authMode=="ownerSignUp" && (
          <OwnerSignUp onClose={()=>setAuthMode(null)}
          onOwnerLogin={()=>setAuthMode("ownerLogin")}/>)}
         


      </div>
    </>
  );
}

export default LandingPage;
