import React, { useEffect, useState } from "react";
import axios from "axios";
import SlotGrid from "../common/SlotGrid";

const ManageArenaModal = ({ arena, onClose }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const [slots, setSlots] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  // Convert date to YYYY-MM-DD
  const getApiDate = (date) => {
    return date.toISOString().split("T")[0];
  };

  const formatDate = (date) => {
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  // Fetch slots from backend
  const fetchSlots = async () => {
    try {
      setLoading(true);
      setError("");

      const token = localStorage.getItem("ownerToken");

      const response = await axios.get(
        `http://localhost:5000/api/arenas/${arena._id}/slots`,
        {
          params: {
            date: getApiDate(selectedDate),
          },

          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setSlots(response.data.slots);
    } catch (error) {
      console.log(error.response?.data);

      setError(error.response?.data?.message || "Unable to fetch slots");
    } finally {
      setLoading(false);
    }
  };

  // Fetch slots when modal opens
  // and whenever selected date changes
  useEffect(() => {
    fetchSlots();
  }, [selectedDate]);

  const changeDate = (days) => {
    const newDate = new Date(selectedDate);

    newDate.setDate(newDate.getDate() + days);

    setSelectedDate(newDate);
  };

  // Handle slot click
  const handleSlotClick = async (slot) => {
    // Don't allow clicking booked slots
    if (slot.status === "booked") {
      return;
    }

    const token = localStorage.getItem("ownerToken");

    try {
      // Available → Block
      if (slot.status === "available") {
        await axios.post(
          `http://localhost:5000/api/arenas/${arena._id}/slots/block`,
          {
            date: getApiDate(selectedDate),
            startTime: slot.startTime,
            endTime: slot.endTime,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
      }

      // Not Available → Unblock
      else if (slot.status === "notAvailable") {
        await axios.delete(
          `http://localhost:5000/api/arenas/${arena._id}/slots/${slot.slotId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
      }

      // Fetch updated slots
      await fetchSlots();
    } catch (error) {
      console.log(error.response?.data);

      alert(error.response?.data?.message || "Unable to update slot");
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-5xl max-h-[90vh] rounded-xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b">
          <div>
            <h2 className="text-2xl font-bold">Manage Slots</h2>

            <p className="text-gray-500 mt-1">{arena?.name}</p>
          </div>

          <button
          type="button"
            onClick={onClose}
            className="text-gray-400 hover:text-black text-xl"
          >
            ✕
          </button>
        </div>

        {/* Date + Legend */}
        <div className="px-6 py-5 border-b">
          <div className="flex flex-wrap items-center justify-between gap-4">
            {/* Date */}
            <div className="flex items-center gap-2">
              <button
              type="button"
                onClick={() => changeDate(-1)}
                className="w-10 h-10 border border-gray-300 rounded-lg hover:bg-gray-100"
              >
                ←
              </button>

              <div className="border border-gray-300 rounded-lg px-5 py-2.5 min-w-40 text-center">
                {formatDate(selectedDate)}
              </div>

              <button
              type="button"
                onClick={() => changeDate(1)}
                className="w-10 h-10 border border-gray-300 rounded-lg hover:bg-gray-100"
              >
                →
              </button>
            </div>

            {/* Legend */}
            <div className="flex flex-wrap items-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-green-500"></span>
                Available
              </div>

              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-500"></span>
                Booked
              </div>

              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-gray-400"></span>
                Not Available
              </div>
            </div>
          </div>
        </div>

        {/* Slots */}
        <div className="p-6 overflow-y-auto flex-1 min-h-0">
          <h3 className="text-lg font-semibold mb-5">
            {formatDate(selectedDate)} — Slots
          </h3>

          {/* Loading */}
          {loading && <p className="text-gray-500">Loading slots...</p>}

          {/* Error */}
          {!loading && error && <p className="text-red-500">{error}</p>}

          {/* Slots */}
         {!loading && !error && (
          <SlotGrid
            slots={slots}
            mode="owner"
            onSlotClick={handleSlotClick}
          />
        )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t flex justify-end shrink-0">
          <button
          type="button"
            onClick={onClose}
            className="px-5 py-2.5 bg-black text-white rounded-lg hover:bg-gray-800"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};

export default ManageArenaModal;
