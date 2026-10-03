const User = require("../models/User") ;
const bcrypt = require("bcryptjs") ;
const jwt = require("jsonwebtoken") ; 

const registerOwner = async(req,res)=>{

  try{
    const{name,email,mobile,password} = req.body ; 

    const existingUser = await User.findOne({
      $or:[{email},{mobile}],
    })
    if(existingUser){
      return res.status(400).json({
        message:"User Already Exist"  
      });
    }

    const hashedPassword = await bcrypt.hash(password,10) ; 

    //create User
     await User.create({
      name,
      email,
      mobile,
      password:hashedPassword,
      role:"owner",
    })

    res.status(201).json({
      message:"user Created Succesfully"
    })
  }catch(error){
    res.status(500).json({
      message:"Server Error",
      error: error.message , 
    })
  }
}

const loginOwner = async(req,res)=>{

  try{
    const{email ,password} = req.body ; 

    const existingUser = await User.findOne({
      email,
      role: "owner",
    })
    if(!existingUser){
      return res.status(401).json({
        message:"Invalid Credential"  
      });
    }
    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    )

    if(!isPasswordCorrect){
      return res.status(401).json({
        message:"Invalid Credential"
      })
    }

    const token = jwt.sign({

      id:existingUser._id ,
      role:existingUser.role
    },
    process.env.JWT_SECRET,
    {expiresIn:"1d"},
    );

    res.status(200).json({
      message:"user Login Succesfully",
      token,
      user:{
         id: existingUser._id,
        name: existingUser.name,
        email: existingUser.email,
        role: existingUser.role,
          }
    });
  }catch(error){
    res.status(500).json({
      message:"Server Error",
      error: error.message , 
    })
  }
}
const getOwnerProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.status(200).json({
      message: "Profile fetched successfully",
      user,
    });

  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

module.exports = { registerOwner,loginOwner,getOwnerProfile };