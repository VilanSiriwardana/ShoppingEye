import React, { useEffect, useState } from "react";
import "../components/FeedbackPage.css";
import SidebarIcon from "../components/sidebar/SidebarIcon"; // Sidebar component
import Header from "./Header";

const FeedbackPage = () => {
  const [feedbacks, setFeedbacks] = useState([]);

  // Fetch all feedbacks when the component loads
  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const response = await fetch("http://localhost:3050/api/feedback");
        if (!response.ok) {
          throw new Error("Feedback not found");
        }
        const data = await response.json();
        setFeedbacks(data); // Set all feedbacks
      } catch (error) {
        console.error("Error fetching feedbacks:", error);
      }
    };

    fetchFeedbacks();
  }, []);

  return (
    <div className="feedback">
      <div className="flex">
        {/* Sidebar Component */}
        <SidebarIcon />

        {/* Main Content */}
        <div className="containers mx-auto p-6 flex-1">
          <div className="mt-6">
          <div className="main-titlee">
              <h3>User Feedback:</h3>
          </div>

            <ul>
              {feedbacks.length > 0 ? (
                feedbacks.map((fb, index) => (
                  <li key={index}>
                    <p className="text-gray-700">{fb.comment}</p>
                    <p className="rating">Rating: {fb.rating}/5</p>
                    <p className="text-sm text-gray-500">
                      - {fb.user || "Anonymous"}
                    </p>
                  </li>
                ))
              ) : (
                <p className="no-feedback">No feedback yet</p>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedbackPage;
