import React from "react";

const AddArenaCard = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="
        w-full
        min-h-64
        border-2
        border-dashed
        border-gray-300
        rounded-xl
        flex
        flex-col
        items-center
        justify-center
        hover:border-black
      "
    >
      <span className="text-4xl font-light">
        +
      </span>

      <p className="text-lg font-semibold mt-3">
        Add Arena
      </p>

      <p className="text-sm text-gray-500 mt-1">
        List your sports arena
      </p>
    </button>
  );
};

export default AddArenaCard;