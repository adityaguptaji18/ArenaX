import React from "react";

const SideBar = ({
  collapsed,
  setCollapsed,
  menuItems,
  activeSection,
  setActiveSection,
}) => {

  return (
    <aside className="h-full min-h-screen w-full bg-black text-white flex flex-col">

      {/* Header */}
      <div className="h-20 flex items-center justify-between px-5">

        {!collapsed && (
          <h1 className="text-2xl font-bold">
            ARENAX
          </h1>
        )}

        <button
          type="button"
          onClick={() => setCollapsed(!collapsed)}
          className="text-white text-xl px-2 py-1"
        >
          {collapsed ? "☰" : "←"}
        </button>

      </div>


      {/* Navigation */}
      {!collapsed && (
        <nav className="flex-1 px-4 py-6">

          <div className="flex flex-col gap-2">

            {menuItems.map((item) => (

              <button
                type="button"
                key={item}
                onClick={() => setActiveSection?.(item)}
                className={`
                  w-full
                  text-left
                  px-4
                  py-3
                  rounded-lg

                  ${
                    activeSection === item
                      ? "bg-white text-black"
                      : "text-gray-300 hover:bg-gray-800 hover:text-white"
                  }
                `}
              >
                {item}
              </button>

            ))}

          </div>

        </nav>
      )}


      {/* Logout */}
      {!collapsed && (
        <div className="p-4 border-t border-gray-800">

          <button
            type="button"
            className="
              w-full
              text-left
              px-4
              py-3
              rounded-lg
              text-gray-300
              hover:bg-gray-800
              hover:text-white
            "
          >
            Logout
          </button>

        </div>
      )}

    </aside>
  );
};

export default SideBar;