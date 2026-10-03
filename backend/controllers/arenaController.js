const Arena =require("../models/Arena") ; 

const createArena = async(req,res)=>{

  try{
    const {name,sport,location,pricePerHour,description,images,amenities,} = req.body;

    const arena  = await Arena.create({
       owner: req.user.id,
      name,
      sport,
      location,
      pricePerHour,
      description,
      images,
      amenities,
    })

    res.status(201).json({
      message:"Arena Created Successfully",arena
    })

  }catch(error){

    res.status(500).json({
      message:"Server Error" , 
      error:error.message
    })

  }
}
const getOwnerArenas = async (req, res) => {
  try {
    const arenas = await Arena.find({
      owner: req.user.id,
    });

    res.status(200).json({
      message: "Owner arenas fetched successfully",
      arenas,
    });

  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};
const updateArena  = async(req,res)=>{
  try{
    const {id} =req.params ; 
    const arena = await Arena.findOne({
      _id:id ,
      owner:req.user.id , 
    })
    if(!arena){
      return res.status(404).json({
        message:"Arena not Found or you are not the owner"
      }) ; 
    }
        const {
      name,
      sport,
      location,
      pricePerHour,
      description,
      images,
      amenities,
    } = req.body;

    arena.name = name ?? arena.name;
    arena.sport = sport ?? arena.sport;
    arena.location = location ?? arena.location;
    arena.pricePerHour = pricePerHour ?? arena.pricePerHour;
    arena.description = description ?? arena.description;
    arena.images = images ?? arena.images;
    arena.amenities = amenities ?? arena.amenities;

    await arena.save() ; 

    return res.status(200).json({
      message:"Arena Updated Successfully",
      arena
    })
  }catch(error){
    return res.status(500).json({
      message:"Server Error " ,
      error:error.message
    })
  }
}
const deleteArena = async (req, res) => {
  try {
    const { id } = req.params;

    const arena = await Arena.findOne({
      _id: id,
      owner: req.user.id,
    });

    if (!arena) {
      return res.status(404).json({
        message: "Arena not found or you are not the owner",
      });
    }

    await Arena.deleteOne({
      _id: id,
    });

    res.status(200).json({
      message: "Arena deleted successfully",
    });

  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};

const getAllArenas = async (req, res) => {
  try {

    const arenas = await Arena.find()
      .populate("owner", "name email");

    res.status(200).json({
      message: "Arenas fetched successfully",
      arenas,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error",
      error: error.message,
    });

  }
};


module.exports = {
  createArena , 
  getOwnerArenas,
  updateArena,
  deleteArena,
  getAllArenas
}