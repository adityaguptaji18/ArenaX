import React, { useState } from "react";
import Navbar from "../../components/common/NavBar";
import UserArenas from "../../components/userComponents/UserArenas";
import MyBookings from "../../components/userComponents/MyBookings";
import SideBar from "../../components/common/SideBar";

const UserDashboard = () => {

  const [collapsed, setCollapsed] = useState(false);

  const [activeSection, setActiveSection] = useState("Dashboard");

  const menuItems = [
    "Dashboard",
    "My Bookings",
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* Sidebar */}
      <div
        className={`
          ${collapsed ? "w-16" : "w-64"}
          shrink-0
        `}
      >
        <SideBar
          collapsed={collapsed}
          setCollapsed={setCollapsed}
          menuItems={menuItems}
          activeSection={activeSection}
          setActiveSection={setActiveSection}
        />
      </div>


      {/* Main */}
      <main className="flex-1">

        <Navbar
          title={
            activeSection === "Dashboard"
              ? "Find Your Arena"
              : "My Bookings"
          }
        />

        <div className="p-6">

          {activeSection === "Dashboard" && (
            <UserArenas />
          )}

          {activeSection === "My Bookings" && (
            <MyBookings />
          )}

        </div>

      </main>

    </div>
  );
};

export default UserDashboard;