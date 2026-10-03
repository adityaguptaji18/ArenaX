const mongoose = require("mongoose") ; 

const arenaSchema = new mongoose.Schema({

  owner:{
    type:mongoose.Schema.Types.ObjectId ,
    ref:"User" , 
    required:true,
  },
  name:{
    type:String , 
    required:true , 
    trim:true,
  },
  sport:{
    type:String , 
    required:true ,
    trim:true ,
  },
  location:{
    type:String ,
    required:true , 
    trim :true
  },
  pricePerHour:{
    type:Number ,
    required: true
  },
  description:{
    type:String , 
    trim:true
  },
  images:[{
    type:String , 
  },
],
  amenities:[{
    type:String , 
  },
]
},
{timestamp:true}
)

const Arena = mongoose.model("Arena",arenaSchema) ; 
module.exports = Arena ; 