import React from "react";

const Navbar = ({ title }) => {
  return (
    <nav className="h-20 bg-white border-b border-gray-200 flex items-center justify-between px-6">

      {/* Page Title */}
      <h1 className="text-2xl font-bold">
        {title}
      </h1>

      {/* Profile */}
      <div className="flex items-center gap-3">

        <div className="text-right">
          <p className="font-semibold">
            Atishay Jain
          </p>

          <p className="text-sm text-gray-500">
            Turf Owner
          </p>
        </div>

        <button className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center">
          A
        </button>

      </div>

    </nav>
  );
};

export default Navbar;