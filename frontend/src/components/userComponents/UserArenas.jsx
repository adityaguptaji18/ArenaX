import React, { useEffect, useState } from "react";
import axios from "axios";
import BookArenaModal from "./BookArenaModal";

const UserArenas = () => {
  const [arenas, setArenas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [selectedArena, setSelectedArena] = useState(null);

  const fetchArenas = async () => {
    try {
      setLoading(true);
      setError("");

      const token = localStorage.getItem("token");

      const response = await axios.get("http://localhost:5000/api/arenas", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setArenas(response.data.arenas);
    } catch (error) {
      console.log(error.response?.data);

      setError(error.response?.data?.message || "Unable to fetch arenas");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArenas();
  }, []);

  if (loading) {
    return <p className="text-gray-500">Loading arenas...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  if (arenas.length === 0) {
    return (
      <div className="bg-white rounded-xl p-8 text-center">
        <h2 className="text-xl font-semibold">No arenas available</h2>

        <p className="text-gray-500 mt-2">
          No arenas are currently available for booking.
        </p>
      </div>
    );
  }

  return (
    <>
      <section>
        <h2 className="text-2xl font-bold">Available Arenas</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mt-6">
          {arenas.map((arena) => (
            <div
              key={arena._id}
              className="bg-white rounded-xl border border-gray-200 overflow-hidden"
            >
              {/* Image */}

              {arena.image?.[0] ? (
                <img
                  src={arena.image[0]}
                  alt={arena.name}
                  className="w-full h-48 object-cover"
                />
              ) : (
                <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                  No Image
                </div>
              )}

              {/* Content */}

              <div className="p-5">
                <h3 className="text-xl font-semibold">{arena.name}</h3>

                <p className="text-gray-500 mt-1">{arena.sport}</p>

                <p className="text-gray-500 mt-1">{arena.location}</p>

                <p className="font-semibold mt-3">₹{arena.pricePerHour}/hour</p>

                <button
                  type="button"
                  onClick={() => setSelectedArena(arena)}
                  className="w-full mt-4 px-4 py-2.5 bg-black text-white rounded-lg hover:bg-gray-800"
                >
                  Book Arena
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Booking Modal */}

      {selectedArena && (
        <BookArenaModal
          arena={selectedArena}
          onClose={() => setSelectedArena(null)}
        />
      )}
    </>
  );
};

export default UserArenas;
