const mongoose = require("mongoose") ; 

const arenaSlotSchema = new mongoose.Schema({

    arena:{
      type:mongoose.Schema.Types.ObjectId , 
      ref:"Arena",
      required:true,
    },
    date:{
      type:Date,
      required:true,
    },
    startTime:{
      type:String,
      required:true
    },
    endTime:{
      type:String,
      required:true
    },
   
},
{
  timestamps:true , 
},
) ;



arenaSlotSchema.index({
  arena:1  ,
  date:1,
  startTime:1 ,
  
},
{
  unique:true
})



const ArenaSlot = mongoose.model("ArenaSlot",arenaSlotSchema) ; 

module.exports=ArenaSlot ; 




