import React from "react";

const SlotGrid = ({
  slots = [],
  mode = "owner",
  selectedSlot = null,
  onSlotClick,
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
      {slots.map((slot) => {
        const isSelected =
        selectedSlot?.startTime === slot.startTime &&
        selectedSlot?.endTime === slot.endTime;
        const isBooked = slot.status === "booked";
        const isNotAvailable = slot.status === "notAvailable";
        const isAvailable = slot.status === "available";

        return (
          <button
            type="button"
            key={slot.startTime}
            onClick={() => onSlotClick?.(slot)}
            disabled={isBooked || (mode === "user" && isNotAvailable)}
            className={`
              min-h-20
              rounded-lg
              border
              p-4
              flex
              items-center
              justify-between
              text-left
              transition

              ${
                isAvailable && !isSelected
                  ? "bg-white border-gray-200 hover:border-black"
                  : ""
              }

              ${
                isSelected
                  ? "bg-blue-50 border-blue-500 ring-1 ring-blue-500"
                  : ""
              }

              ${isBooked ? "bg-red-50 border-red-200 cursor-default" : ""}

              ${
                isNotAvailable && !isSelected
                  ? "bg-gray-100 border-gray-300"
                  : ""
              }

              ${mode === "owner" && isNotAvailable ? "hover:border-black" : ""}
            `}
          >
            <div>
              <p className="font-semibold">{slot.startTime}</p>

              <p
                className={`
                  text-sm mt-1

                  ${isSelected ? "text-blue-600" : ""}

                  ${isAvailable && !isSelected ? "text-green-600" : ""}

                  ${isBooked ? "text-red-600" : ""}

                  ${isNotAvailable && !isSelected ? "text-gray-500" : ""}
                `}
              >
                {isSelected && "Selected"}

                {!isSelected && isAvailable && "Available"}

                {!isSelected && isBooked && "Booked"}

                {!isSelected && isNotAvailable && "Not Available"}
              </p>
            </div>

            {/* Status indicator */}

            <span
              className={`
                w-3
                h-3
                rounded-full

                ${isSelected ? "bg-blue-500" : ""}

                ${isAvailable && !isSelected ? "bg-green-500" : ""}

                ${isBooked ? "bg-red-500" : ""}

                ${isNotAvailable && !isSelected ? "bg-gray-400" : ""}
              `}
            />
          </button>
        );
      })}
    </div>
  );
};

export default SlotGrid;
