import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import Map from "./map.jsx";
import Bg from "../images/mall.png";
import Swal from "sweetalert2";

export default function Locations() {
  const { locationId } = useParams();
  const inputValueRef = useRef("");
  const [searchId, setSearchId] = useState("NULL");
  const [shop, setShop] = useState(null);
  const [currentLocation, setCurrentLocation] = useState("G");

  useEffect(() => {
    if (locationId) {
      inputValueRef.current = locationId;
      console.log("Location ID updated to:", locationId);
      console.log("Search ID updated to:", searchId);
    }
  }, [locationId]);

  useEffect(() => {
    window.embeddedChatbotConfig = {
      chatbotId: "ToUj6ghlqYNhwwmuR_ZWG",
      domain: "www.chatbase.co",
    };

    const script = document.createElement("script");
    script.src = "https://www.chatbase.co/embed.min.js";
    script.defer = true;
    script.setAttribute("chatbotId", "ToUj6ghlqYNhwwmuR_ZWG");
    script.setAttribute("domain", "www.chatbase.co");

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script); // Cleanup on unmount
    };
  }, []);

  const handleInputChange = (e) => {
    inputValueRef.current = e.target.value;
    console.log("Input Value changed to:", inputValueRef.current);
  };

  const handleSearch = () => {
    setSearchId(inputValueRef.current || "NULL");
    console.log("Search triggered with ID:", inputValueRef.current);
  };

  const handleCurrentLocationChange = (e) => {
    const userInput = e.target.value;
    console.log("Current Location input changed to:", userInput);

    if (userInput) {
      setCurrentLocation(userInput);
    } else {
      setCurrentLocation("G");
    }
  };

  const handleCurrentLocation = () => {
    if (!currentLocation) {
      setCurrentLocation("G");
    }
    console.log("Current Location set to:", currentLocation);
  };

  useEffect(() => {
    const fetchShops = async (id) => {
      try {
        const response = await fetch(`http://localhost:3050/api/shops/location/${id}`);
        const data = await response.json();
        console.log("Fetched shops:", data);

        if (data.length > 0) {
          setShop(data[0]); // Set the first shop from the response
        } else {
          // Show SweetAlert if no shop is found
          Swal.fire({
            title: "Error!",
            text: "No shop found in this location!",
            icon: "error",
            confirmButtonText: "OK",
          });
        }
      } catch (error) {
        console.error("Error fetching shops:", error);
        // Optionally, you can show an alert in case of error
        Swal.fire({
          title: "Error!",
          text: "Something went wrong while fetching the shop data.",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    };

    // Check if searchId is available (manual search), otherwise use locationId from URL
    if (searchId !== "NULL") {
      fetchShops(searchId);
    } else if (locationId) {
      fetchShops(locationId);
    }
  }, [locationId, searchId]);

  return (
    <div className='relative h-screen'>
      <div
        className='absolute inset-0'
        style={{
          backgroundImage: `url(https://res.cloudinary.com/dquyjccdz/image/upload/v1728159260/mall_x4bgdq.avif)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
          opacity: 0.5,
          zIndex: -1,
        }}></div>
      <section className='relative mb-12'>
        <div className='absolute inset-0'>
          <div className='absolute top-0 left-0 w-full h-full bg-black opacity-50'></div>
        </div>
        <div className='relative z-10 p-4 text-center text-white'>
          <h1 className='mb-4 text-4xl font-bold'>Find Location On The Map</h1>
          <p className='mb-6 text-lg'>Your ultimate shopping destination.</p>
          <div className='relative z-10'>
            <input
              className='p-2 mx-auto border border-gray-400 rounded-md text-stone-600'
              id='searchInput'
              type='text'
              placeholder='Enter Block ID'
              defaultValue={locationId || ""}
              onChange={handleInputChange}
            />
            <button className='px-4 py-2 ml-2 font-semibold text-white bg-orange-500 rounded hover:bg-orange-600' onClick={handleSearch}>
              Search
            </button>
          </div>
        </div>
      </section>

      <div className='mx-20 mt-20'>{searchId && <Map searchId={searchId} />}</div>
      {shop ? (
        <div className='flex items-center justify-between p-4 shadow-md w-[1200px] bg-gray-200 mx-auto'>
          <>
            <div className='flex items-center hover:bg-gray-100' onClick={() => (window.location.href = `/shops/${shop._id}`)}>
              <img src={shop.shopLogo} alt={`${shop.shopName} logo`} className='object-cover w-56 h-56 rounded-full' />
              <div className='ml-4'>
                <h1 className='text-2xl font-bold'>{shop.shopName}</h1>
                <p className='mb-1 text-gray-700'>Category: {shop.shopCategory}</p>
                <p>{shop.followers || 0} Followers</p>
              </div>
            </div>

            <div className='flex items-center'>
              <p className='flex ml-[-500px] text-gray-700 mx-'>Location: {shop.location}</p>
              {/* <p>instructions</p>
              <div className='relative z-10'>
                <input
                  className='p-2 mx-auto border border-gray-400 rounded-md text-stone-600'
                  id='currentLocationInput'
                  type='text'
                  placeholder='Enter Current Location'
                  defaultValue={currentLocation} // Use state for default value
                  onChange={handleCurrentLocationChange}
                />
                <button className='px-4 py-2 ml-2 font-semibold text-white bg-orange-500 rounded hover:bg-orange-600' onClick={handleCurrentLocation}>
                  Set Current Location
                </button>
              </div> */}
            </div>
          </>
        </div>
      ) : null}
      {/* <div className="chatbot-container">
        <iframe
          title="Chatbot"
          src="https://www.chatbase.co/chatbot-iframe/ToUj6ghlqYNhwwmuR_ZWG"
          width="100%"
          style={{ height: "100%", minHeight: "700px" }}
          frameBorder="0"
        ></iframe>
      </div> */}
    </div>
  );
}
