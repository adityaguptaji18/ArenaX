import React, { useEffect, useState } from "react";
import axios from "axios";
import SlotGrid from "../common/SlotGrid";

const BookArenaModal = ({ arena, onClose }) => {

  const [selectedDate, setSelectedDate] = useState(new Date());

  const [slots, setSlots] = useState([]);

  const [selectedSlot, setSelectedSlot] = useState(null);

  const [loading, setLoading] = useState(true);

  const [booking, setBooking] = useState(false);

  const [error, setError] = useState("");


  // Convert date to YYYY-MM-DD
  const getApiDate = (date) => {
    return date.toISOString().split("T")[0];
  };


  // Format date for UI
  const formatDate = (date) => {
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };


  // Fetch slots
  const fetchSlots = async () => {

    try {

      setLoading(true);
      setError("");

      const token = localStorage.getItem("token");

      const response = await axios.get(
        `http://localhost:5000/api/arenas/${arena._id}/slots`,
        {
          params: {
            date: getApiDate(selectedDate),
          },

          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSlots(response.data.slots);

    } catch (error) {

      console.log(error.response?.data);

      setError(
        error.response?.data?.message ||
        "Unable to fetch slots"
      );

    } finally {

      setLoading(false);

    }
  };


  // Fetch whenever date changes
  useEffect(() => {

    setSelectedSlot(null);

    fetchSlots();

  }, [selectedDate]);


  // Change date
  const changeDate = (days) => {

    const newDate = new Date(selectedDate);

    newDate.setDate(
      newDate.getDate() + days
    );

    setSelectedDate(newDate);

  };


  // Select slot
  const handleSlotClick = (slot) => {

    if (
      slot.status === "booked" ||
      slot.status === "notAvailable"
    ) {
      return;
    }

    setSelectedSlot(slot);

  };


  // Book selected slot
  const handleBooking = async () => {

    if (!selectedSlot) {
      return;
    }

    try {

      setBooking(true);
      setError("");

      const token = localStorage.getItem("token");

      await axios.post(
        `http://localhost:5000/api/arenas/${arena._id}/book`,
        {
          date: getApiDate(selectedDate),
          startTime: selectedSlot.startTime,
          endTime: selectedSlot.endTime,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );


      // Refresh slots after booking
      await fetchSlots();

      // Clear selection
      setSelectedSlot(null);

      alert("Arena booked successfully");

    } catch (error) {

      console.log(error.response?.data);

      setError(
        error.response?.data?.message ||
        "Unable to book slot"
      );

    } finally {

      setBooking(false);

    }
  };


  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">

      <div className="bg-white w-full max-w-5xl max-h-[90vh] rounded-xl overflow-hidden flex flex-col">


        {/* Header */}

        <div className="flex items-center justify-between px-6 py-5 border-b">

          <div>

            <h2 className="text-2xl font-bold">
              Book Arena
            </h2>

            <p className="text-gray-500 mt-1">
              {arena?.name}
            </p>

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
                <span className="w-3 h-3 rounded-full bg-blue-500"></span>
                Selected
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


          {loading && (
            <p className="text-gray-500">
              Loading slots...
            </p>
          )}


          {!loading && error && (
            <p className="text-red-500 mb-4">
              {error}
            </p>
          )}


          {!loading && !error && (
            <SlotGrid
              slots={slots}
              mode="user"
              selectedSlot={selectedSlot}
              onSlotClick={handleSlotClick}
            />
          )}

        </div>


        {/* Footer */}

        <div className="px-6 py-4 border-t flex items-center justify-between shrink-0">

          <div>

            {selectedSlot ? (
              <p className="text-sm text-gray-600">

                Selected:
                <span className="font-semibold text-black ml-1">
                  {selectedSlot.startTime} - {selectedSlot.endTime}
                </span>

              </p>
            ) : (
              <p className="text-sm text-gray-500">
                Select an available slot
              </p>
            )}

          </div>


          <div className="flex gap-3">

            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-100"
            >
              Cancel
            </button>


            <button
              type="button"
              disabled={!selectedSlot || booking}
              onClick={handleBooking}
              className={`
                px-5
                py-2.5
                rounded-lg
                text-white
                ${
                  selectedSlot && !booking
                    ? "bg-black hover:bg-gray-800"
                    : "bg-gray-400 cursor-not-allowed"
                }
              `}
            >

              {booking
                ? "Booking..."
                : selectedSlot
                  ? `Book ${selectedSlot.startTime}`
                  : "Book Slot"}

            </button>

          </div>

        </div>

      </div>

    </div>
  );
};

export default BookArenaModal;