const express = require("express") ; 
const cors = require("cors") ; 
const dotenv = require("dotenv") ; 
const  connectDB = require("./config/db")  ; 
const authRoute = require("./routes/authRoute") ; 
const ownerRoute = require("./routes/ownerRoute") ;
const arenaRoute = require("./routes/arenaRoutes");
const slotRoute = require("./routes/slotRoute");
const bookingRoute = require("./routes/bookingRoute"); 

dotenv.config() ; 
connectDB() ; 

const app = express() ;

app.use(cors()) ;
app.use(express.json()) ; 
app.use("/api/auth", authRoute);
app.use("/api/owner", ownerRoute);
app.use("/api/arenas", slotRoute);
app.use("/api/arenas", arenaRoute);
app.use("/api/arenas",bookingRoute) ; 
app.use("/api/bookings", bookingRoute);

app.get("/" ,(req,res)=>{
  res.send("ArenaX backend is Running") ; 
})

const PORT  = process.env.PORT|| 5000 ; 

app.listen(PORT,()=>{
  console.log(`server is running on local host  ${PORT}`);
});