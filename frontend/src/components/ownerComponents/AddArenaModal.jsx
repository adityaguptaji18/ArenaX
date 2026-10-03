import React, { useState } from "react";
import axios from "axios";

const AddArenaModal = ({ onClose, onArenaCreated }) => {

  const [formData, setFormData] = useState({
    name: "",
    sport: "",
    location: "",
    pricePerHour: "",
    description: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("ownerToken");

      const response = await axios.post(
        "http://localhost:5000/api/arenas",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage(response.data.message);

      onArenaCreated();
      onClose();

    } catch (error) {
      setMessage(
        error.response?.data?.message || "Unable to create arena"
      );
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">

      <div className="bg-white w-full max-w-lg rounded-xl p-6">

        <div className="flex justify-between items-center mb-6">

          <h2 className="text-2xl font-bold">
            Add Arena
          </h2>

          <button
            onClick={onClose}
            className="text-gray-400 hover:text-black text-xl"
          >
            ✕
          </button>

        </div>


        <form onSubmit={handleSubmit}>

          <div className="space-y-4">

            <div>
              <label>Arena Name</label>

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter arena name"
                className="w-full mt-1 px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-black"
                required
              />
            </div>


            <div>
              <label>Sport</label>

              <input
                type="text"
                name="sport"
                value={formData.sport}
                onChange={handleChange}
                placeholder="e.g. Football"
                className="w-full mt-1 px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-black"
                required
              />
            </div>


            <div>
              <label>Location</label>

              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="Enter location"
                className="w-full mt-1 px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-black"
                required
              />
            </div>


            <div>
              <label>Price Per Hour</label>

              <input
                type="number"
                name="pricePerHour"
                value={formData.pricePerHour}
                onChange={handleChange}
                placeholder="Enter price"
                className="w-full mt-1 px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-black"
                required
              />
            </div>


            <div>
              <label>Description</label>

              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe your arena"
                rows="3"
                className="w-full mt-1 px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-black"
              />
            </div>

          </div>


          {message && (
            <p className="text-red-500 text-sm mt-3">
              {message}
            </p>
          )}


          <button
            type="submit"
            className="w-full bg-black text-white py-3 rounded-lg mt-6"
          >
            Create Arena
          </button>

        </form>

      </div>

    </div>
  );
};

export default AddArenaModal;