import React, { useEffect, useState } from "react";
import axios from "axios";

import SideBar from "../../components/common/SideBar";
import Navbar from "../../components/common/NavBar";

import MyArenas from "../../components/ownerComponents/MyArenas";
import AddArenaModal from "../../components/ownerComponents/AddArenaModal";
import ManageArenaModal from "../../components/ownerComponents/ManageArenaModal";

const OwnerDashboard = () => {

  const [showAddArena, setShowAddArena] = useState(false);
  const [selectedArena, setSelectedArena] = useState(null);

  const [collapsed, setCollapsed] = useState(false);
  const [activeSection, setActiveSection] = useState("Dashboard");

  const menuItems = [
    "Dashboard",
    "Bookings",
    "Profile",
  ];

  const [arenas, setArenas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");


  // Fetch owner's arenas
  const fetchArenas = async () => {

    try {

      setLoading(true);

      const token = localStorage.getItem("ownerToken");

      const response = await axios.get(
        "http://localhost:5000/api/arenas/owner",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setArenas(response.data.arenas);

    } catch (error) {

      console.log(error.response?.data);

      setError(
        error.response?.data?.message ||
        "Unable to fetch arenas"
      );

    } finally {

      setLoading(false);

    }
  };


  useEffect(() => {
    fetchArenas();
  }, []);


  return (
    <div className="flex min-h-screen">

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
      <main className="flex-1 bg-gray-100">

        <Navbar
          title={
            activeSection === "Dashboard"
              ? "Owner Dashboard"
              : activeSection
          }
        />


        {/* Dashboard */}
        {activeSection === "Dashboard" && (

          <div className="p-6">

            {loading ? (

              <p>
                Loading arenas...
              </p>

            ) : error ? (

              <p className="text-red-500">
                {error}
              </p>

            ) : (

              <MyArenas
                arenas={arenas}
                onAddArena={() => setShowAddArena(true)}
                onManage={(arena) => setSelectedArena(arena)}
              />

            )}

          </div>

        )}


        {/* Bookings */}
        {activeSection === "Bookings" && (

          <div className="p-6">

            <h2 className="text-2xl font-bold">
              Bookings
            </h2>

            <p className="text-gray-500 mt-2">
              Owner bookings will appear here.
            </p>

          </div>

        )}


        {/* Profile */}
        {activeSection === "Profile" && (

          <div className="p-6">

            <h2 className="text-2xl font-bold">
              Profile
            </h2>

            <p className="text-gray-500 mt-2">
              Owner profile will appear here.
            </p>

          </div>

        )}

      </main>


      {/* Add Arena Modal */}
      {showAddArena && (

        <AddArenaModal
          onClose={() => setShowAddArena(false)}
          onArenaCreated={fetchArenas}
        />

      )}


      {/* Manage Arena Modal */}
      {selectedArena && (

        <ManageArenaModal
          arena={selectedArena}
          onClose={() => setSelectedArena(null)}
        />

      )}

    </div>
  );
};

export default OwnerDashboard;