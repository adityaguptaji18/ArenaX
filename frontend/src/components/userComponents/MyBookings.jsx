import React, { useEffect, useState } from "react";
import axios from "axios";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchBookings = async () => {
    try {
      setLoading(true);
      setError("");

      const token = localStorage.getItem("token");

      if (!token) {
        setError("Please login to continue");
        return;
      }

      const response = await axios.get(
        "http://localhost:5000/api/bookings/my-bookings",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setBookings(response.data.bookings);
    } catch (error) {
      console.log(error.response?.data);

      setError(
        error.response?.data?.message ||
          "Unable to fetch bookings"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <section className="p-6">

      <h2 className="text-2xl font-bold">
        My Bookings
      </h2>

      {/* Loading */}
      {loading && (
        <p className="mt-6 text-gray-500">
          Loading bookings...
        </p>
      )}

      {/* Error */}
      {!loading && error && (
        <p className="mt-6 text-red-500">
          {error}
        </p>
      )}

      {/* No bookings */}
      {!loading && !error && bookings.length === 0 && (
        <div className="mt-6 bg-white border border-gray-200 rounded-xl p-8 text-center">
          <h3 className="text-lg font-semibold">
            No bookings yet
          </h3>

          <p className="text-gray-500 mt-2">
            Your booked arenas will appear here.
          </p>
        </div>
      )}

      {/* Bookings */}
      {!loading && !error && bookings.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 mt-6">

          {bookings.map((booking) => (
            <div
              key={booking._id}
              className="bg-white border border-gray-200 rounded-xl p-5"
            >

              {/* Arena */}
              <div className="flex items-start justify-between">

                <div>
                  <h3 className="text-lg font-bold">
                    {booking.arena?.name || "Arena"}
                  </h3>

                  {booking.arena?.sport && (
                    <p className="text-sm text-gray-500 mt-1">
                      {booking.arena.sport}
                    </p>
                  )}
                </div>

                {/* Status */}
                <span
                  className={`text-xs px-3 py-1 rounded-full ${
                    booking.status === "confirmed"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {booking.status}
                </span>

              </div>

              {/* Booking details */}
              <div className="mt-5 space-y-3">

                <div>
                  <p className="text-xs text-gray-400">
                    DATE
                  </p>

                  <p className="font-medium">
                    {formatDate(booking.date)}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-gray-400">
                    TIME
                  </p>

                  <p className="font-medium">
                    {booking.startTime} — {booking.endTime}
                  </p>
                </div>

              </div>

            </div>
          ))}

        </div>
      )}

    </section>
  );
};

export default MyBookings;