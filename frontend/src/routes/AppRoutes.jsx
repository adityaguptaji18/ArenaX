import { Route,Routes } from "react-router-dom";
import LandingPage from "../pages/LandingPage";
import Profile from "../components/userComponents/Profile";
import OwnerDashboard from "../pages/owners/OwnerDashboard";
import UserDashboard from "../pages/users/UserDashboard";


function AppRoutes(){
  return(
    <>
    <Routes>
      <Route path="/" element={<LandingPage/>}/>
      <Route path="/profile" element={<Profile/>}/>
      <Route path = "/owner/dashboard" element={<OwnerDashboard/>}/>
      <Route path = "/user/dashboard" element={<UserDashboard/>}/>
    </Routes>
    </>
  );
}

export default AppRoutes ; 