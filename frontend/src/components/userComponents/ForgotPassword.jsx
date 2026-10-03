import React, { useState } from 'react'

const ForgotPassword = ({onClose}) => {


  const [resendOtp ,setResendOtp] = useState(false)  ; 

  const sendOtp= ()=>{
    console.log("otp sent") ; 
    setResendOtp(true) ; 
  }

  return (
<div className=" fixed inset-0 z-30 flex items-center justify-center bg-black/50">
      <div className="bg-white p-8 rounded-xl w-full max-w-md min-h-125 flex flex-col   ">
        <div className="flex justify-between">
          <p className="text-3xl text-black font-bold ">Reset Password</p>

          <button
            className="text-gray-400 cursor-pointer hover:text-black "
            onClick={onClose}
          >
            ✕
          </button>
        </div>

        <div className="pt-3 " >
          <p>Email/Mobile No.</p>
          <input
            type="text"
            placeholder="Enter your Email or Mobile No."
            className="w-full px-4 py-3 border border-gray-300  rounded-lg outline-none focus:border-black focus:ring-1 focus:ring-black transition"
          />
          
        </div>
        {!resendOtp &&(
        <button className="text-blue-600 text-sm self-end py-1 cursor-pointer hover:underline" 
        onClick={()=>{sendOtp();
        setResendOtp(true);
        }}>
          Send OTP
        </button>
        )}
        
        <div >
          <p>OTP</p>
          <input
            type="text"
            placeholder="Enter OTP"
            className="w-full px-4 py-3 border border-gray-300  rounded-lg outline-none focus:border-black focus:ring-1 focus:ring-black transition"
          />
        </div>
        {resendOtp &&(
          <button className="text-blue-600 text-sm self-end py-1 cursor-pointer hover:underline" 
        onClick={sendOtp}>
          Resend OTP
        </button>
        )}
        
        <div>
          <p>Set New Password</p>
          <input
            type="password"
            placeholder="Enter Password"
            className="w-full px-4 py-3 border border-gray-300  rounded-lg outline-none focus:border-black focus:ring-1 focus:ring-black transition"
          />
        </div>
        
 
        <div className="gap-3 flex flex-col mt-auto">
          <button className="w-full px-4 py-3 bg-black text-white rounded-lg cursor-pointer">
            Reset Password
          </button>
        </div>

      </div>
    </div>
  )
}

export default ForgotPassword  ; 