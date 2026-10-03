const mongoose = require("mongoose") ; 

const bookingSchema = new mongoose.Schema({

  arena:{
    type:mongoose.Schema.Types.ObjectId , 
    ref:"Arena",
    required:true
  },
  user:{
    type:mongoose.Schema.Types.ObjectId , 
    ref:"User" , 
    required:true
  },
  date:{
    type:Date ,
    required:true
  },
  startTime:{
    type:String ,
    required:true
  },
  endTime:{
    type:String,
    required:true
  },
  status:{
    type:String ,
    enum:["confirmed","cancelled"] , 
    default:"confirmed"
  }



},{
  timestamps:true
}) ; 

bookingSchema.index({
  arena:1 ,
  startTime:1,
  date:1
},
{
  unique:true
})

const Booking = mongoose.model("Booking",bookingSchema) ; 

module.exports = Booking