import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import ConfirmDeletion from "../Recommendations/Components/ConfirmDeletion"; // Import the modal component // Import the modal component

const ListMeasurements = () => {
  const [measurements, setMeasurements] = useState([]);
  const [selectedMeasurementsId, setSelectedMeasurementsId] = useState(null);
  const userId = localStorage.getItem("userId"); // Retrieve the current user's ID from localStorage

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [popupType, setPopupType] = useState("info"); // 'info' or 'error'

  useEffect(() => {
    const fetchMeasurements = async () => {
      try {
        const response = await fetch("http://localhost:3050/api/measurements");
        const data = await response.json();
        setMeasurements(data);
      } catch (error) {
        console.error("Error fetching Measurements list:", error);
      }
    };

    fetchMeasurements();
  }, []);

  const handleDeleteClick = (measurementsId) => {
    setSelectedMeasurementsId(measurementsId); // Set the option ID to state
    setIsModalOpen(true); // Show the modal
  };

  const confirmDelete = async () => {
    if (selectedMeasurementsId) {
      try {
        await axios.delete(
          `http://localhost:3050/api/measurements/deleteMyMeasurements/${selectedMeasurementsId}`
        );
        setIsModalOpen(false); // Close the modal
        // Custom success notification
        setPopupMessage("Measurements Deleted Successfully!");
        setPopupType("info");
        setIsPopupOpen(true);
        setMeasurements(
          measurements.filter(
            (measurement) => measurement._id !== selectedMeasurementsId
          )
        ); // Update state to remove the item
      } catch (error) {
        console.error("Error deleting Measurements:", error.message);
        // Custom error notification
        setPopupMessage("Error deleting Measurements. Please try again.");
        setPopupType("error");
        setIsPopupOpen(true);
      }
    }
  };

  const userMeasurements = measurements.filter(
    (measurement) => measurement.userId === userId
  );

  return (
    <div className="relative min-h-screen">
      {/* Content Wrapper */}
      <div className="relative z-10 flex flex-col items-center  min-h-screen">
        <Link
          to="/addMeasurements"
          className="flex items-center ml-5 mb-4 mt-5 text-white text-xl font-mclaren px-2 py-1 bg-blue-500 hover:bg-blue-800 rounded-3xl"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 mr-1"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
          Add Measurements
        </Link>

        {/* Your scrolling content */}
        {/* {allEvents && allEvents.map((event) => ( */}
        <h2 className="text-2xl font-bold text-blue-800 mt-0 mb-4">
          Measurements Profile
        </h2>
        <div className="shadow-2xl shadow-theme-blue rounded-3xl overflow-hidden">
          <table className="min-w-full leading-normal opacity-80 bg-white">
            <thead className="font-bold text-left text-blue-800 bg-blue-100 rounded-t-3xl">
              <tr>
                <th className="px-5 py-3 border-b-2 border-gray-200">Name</th>
                <th className="px-5 py-3 border-b-2 border-gray-200">Bust</th>
                <th className="px-5 py-3 border-b-2 border-gray-200">Waist</th>
                <th className="px-5 py-3 border-b-2 border-gray-200">Hip</th>
                {/* <th className="px-5 py-3 border-b-2 border-gray-200">Shoulders</th> */}
                <th className="px-5 py-3 border-b-2 border-gray-200">
                  Body Type
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200">
                  Undertone
                </th>
              </tr>
            </thead>
            <tbody>
              {userMeasurements.map((measurement) => (
                <tr
                  key={measurement._id}
                  className="border-b border-gray-200 hover:bg-blue-50 hover:opacity-50 "
                >
                  <td className="px-5 py-2">{measurement.saveName}</td>
                  <td className="px-5 py-2">{measurement.bust}</td>
                  <td className="px-5 py-2">{measurement.waist}</td>
                  <td className="px-5 py-2">{measurement.hip}</td>
                  {/* <td className="px-5 py-2">{measurement.shoulders}</td> */}
                  <td className="px-5 py-2">{measurement.bodyType}</td>
                  <td className="px-5 py-2">{measurement.undertone}</td>
                  <td>
                    <Link
                      to={`/updateMyMeasurements/${measurement._id}`}
                      className="flex items-center text-white text-xl font-mclaren px-3 py-1  bg-blue-500 hover:bg-blue-800   rounded-3xl"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6 mr-1"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
                        />
                      </svg>{" "}
                    </Link>
                  </td>

                  <td>
                    <button
                      className="ml-5 flex items-center text-white text-xl font-mclaren px-3 py-1  bg-red-500 hover:bg-red-800 rounded-3xl"
                      onClick={() => {
                        setSelectedMeasurementsId(measurement._id);
                        setIsModalOpen(true);
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6 mr-1"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                        />
                      </svg>{" "}
                    </button>
                  </td>

                  <td>
                    <Link
                      to={`/myRecommendations/${measurement._id}`}
                      className="ml-5 mr-4 flex items-center text-white text-xl font-mclaren px-3 py-1  bg-green-500 hover:bg-green-800   rounded-3xl"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="size-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                        />
                      </svg>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Use the Confirm Deletion Modal here */}
        <ConfirmDeletion
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onConfirm={confirmDelete}
        />

        {/* Scrolling content End*/}
      </div>
      {/* Content Wrapper Ends Here*/}
    </div>
  );
};

export default ListMeasurements;
