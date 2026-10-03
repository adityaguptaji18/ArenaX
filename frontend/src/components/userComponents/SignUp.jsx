import React, { useState } from 'react'
import axios from "axios";

const SignUp = ({onClose,onOwnerSignUp}) => {

    const[formData,setFormData] = useState({
      name:"",
      email:"" ,
      mobile:"",
      password:"" , 
    })
    const [message,setMessage] = useState("") ; 
    const handleChange = (e)=>{
      setFormData({
      ...formData,
      [e.target.name]:e.target.value , 
      });
    };
    const handleSubmit = async(e)=>{
      e.preventDefault() ; 

      try{
        const response = await axios.post("http://localhost:5000/api/auth/register",formData) ; 
         setMessage(response.data.message);

      console.log(response.data);
      onClose() ; 

      }catch(error){
         setMessage(
        error.response?.data?.message || "Something went wrong"
      );

      console.log(error.response?.data);
      }
    }


  return (
    <div className=" fixed inset-0 z-30 flex items-center justify-center bg-black/50">
      <div className="bg-white p-8 rounded-xl w-full max-w-md min-h-125 flex flex-col   ">
        <div className="flex justify-between">
          <p className="text-3xl text-black font-bold ">SignUp</p>

          <button
            className="text-gray-400 cursor-pointer hover:text-black "
            onClick={onClose}
          >
            ✕
          </button>
        </div>
        
        <form
          onSubmit={handleSubmit}
          className="flex flex-col h-full"
        >

          <div className="pt-3">
            <p>Full Name</p>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your Name"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-black focus:ring-1 focus:ring-black transition"
            />
          </div>

          <div className="pt-1.5">
            <p>Email</p>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your Email"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-black focus:ring-1 focus:ring-black transition"
            />
          </div>

          <div className="pt-1.5">
            <p>Mobile No.</p>

            <input
              type="tel"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              placeholder="Enter your Mobile No."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-black focus:ring-1 focus:ring-black transition"
            />
          </div>

          <div className="pt-1.5">
            <p>Password</p>

            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter Password"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-black focus:ring-1 focus:ring-black transition"
            />
          </div>

          {message && (
            <p className="text-sm text-center mt-3">
              {message}
            </p>
          )}

          <div className="gap-3 flex flex-col mt-auto pt-5">

            <button
              type="submit"
              className="w-full px-4 py-3 bg-black text-white rounded-lg cursor-pointer"
            >
              Sign Up
            </button>

            <p
              onClick={onOwnerSignUp}
              className="text-sm text-gray-500 text-center mt-1"
            >
              Sign Up as a Turf Owner?

              <span className="text-blue-600 cursor-pointer hover:underline ml-1">
                Sign Up
              </span>
            </p>

          </div>

        </form>

      </div>
    </div>
  );
}

export default SignUp