import React from "react";

const ArenaCard = ({ arena,onManage }) => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">

      {/* Image */}
      <div className="h-48 bg-gray-200 flex items-center justify-center">
        {arena.image ? (
          <img
            src={arena.image}
            alt={arena.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <p className="text-gray-400">
            No Image
          </p>
        )}
      </div>


      {/* Details */}
      <div className="p-5">

        <h3 className="text-xl font-bold">
          {arena.name}
        </h3>

        <p className="text-gray-500 mt-1">
          {arena.sport}
        </p>

        <p className="text-gray-500 mt-3">
          {arena.location}
        </p>

        <p className="font-semibold mt-2">
          ₹{arena.pricePerHour} / hour
        </p>


        {/* Actions */}
        <div className="flex gap-3 mt-5">

          <button
            className="
              flex-1
              border
              border-gray-300
              py-2
              rounded-lg
              hover:bg-gray-100
            "
          >
            Edit
          </button>

          <button
           onClick={() => onManage(arena)}
            className="
              flex-1
              bg-black
              text-white
              py-2
              rounded-lg
              hover:bg-gray-800
            "
          >
            Manage
          </button>

        </div>

      </div>

    </div>
  );
};

export default ArenaCard;