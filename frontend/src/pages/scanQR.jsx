import React, { useEffect, useRef, useState } from "react";
import QrScanner from "qr-scanner";
import "../styles/scanQR.css";

const QRScan = "https://res.cloudinary.com/dquyjccdz/image/upload/v1728159280/qrScan_uqjfci.png";

const ScanQR = () => {
  const [shop, setShop] = useState(null);
  const [feedbacks, setFeedbacks] = useState([]);
  const [rating, setRating] = useState(0);
  const [shopId, setShopId] = useState(""); // New state to store shopId
  const videoRef = useRef(null);
  const [result, setResult] = useState("");

  const handleRatingChange = (newRating) => setRating(newRating);

  useEffect(() => {
    // Initialize the QR scanner
    const qrScanner = new QrScanner(videoRef.current, (decodedText) => {
      setResult(decodedText);

      // Extract the shopId from the decoded URL
      const extractedShopId = decodedText.split("/shops/")[1]; // Extracts the shopId from the URL
      setShopId(extractedShopId); // Set the extracted shopId

      console.log("Shop ID:", extractedShopId); // Debugging
      qrScanner.stop();
    });

    // Start the QR scanner
    qrScanner.start();

    // Clean up the scanner on unmount
    return () => {
      qrScanner.stop();
    };
  }, []);

  // Fetch shop data only when shopId is updated
  useEffect(() => {
    if (!shopId) return; // Prevent fetching if shopId is empty or null

    const fetchShop = async () => {
      try {
        const response = await fetch(`http://localhost:3050/api/shops/${shopId}`);
        if (!response.ok) {
          throw new Error("Shop not found");
        }
        const data = await response.json();
        setShop(data);
      } catch (error) {
        console.error("Error fetching shop:", error);
      }
    };

    fetchShop(); // Fetch the shop data when shopId is available
  }, [shopId]); // This useEffect runs whenever shopId is updated

  const renderStars = (ratingValue, isOverall = false) => {
    const stars = [];
    const maxRating = 5;
    const starColor = isOverall ? "text-orange-500" : "text-yellow-500";
    const emptyStarColor = "text-gray-300";
    for (let i = 1; i <= maxRating; i++) {
      stars.push(
        <span
          key={i}
          className={`cursor-pointer text-4xl ${i <= Math.floor(ratingValue) ? starColor : emptyStarColor} ${isOverall ? "cursor-default" : ""}`}
          onClick={() => !isOverall && handleRatingChange(i)}
          style={{ fontSize: "2rem" }}>
          ★
        </span>
      );
    }
    return stars;
  };

  const averageRating = feedbacks.length > 0 ? feedbacks.reduce((sum, fb) => sum + (fb.rating || 0), 0) / feedbacks.length : 0;

  return (
    <div className='flex flex-col items-center h-[500px]'>
      <div
        className='absolute inset-0'
        style={{
          backgroundImage: `url(https://res.cloudinary.com/dquyjccdz/image/upload/v1728159258/scanBg_hkeh5x.jpg)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
          opacity: 0.5,
          zIndex: -1,
        }}></div>
      <div className='absolute bottom-0 left-0 right-0'>
        <img
          src={QRScan}
          alt=''
          className='w-[300px]' // Ensure it takes the full width
          style={{
            opacity: 0.8,
          }}
        />
      </div>

      {!shop ? (
        <>
          <div
            className='absolute inset-0'
            style={{
              backgroundImage: `url(https://res.cloudinary.com/dquyjccdz/image/upload/v1728159258/file_yhs0bv.png)`,
              backgroundSize: "55%", // Set the size to 50% to scale down
              backgroundPosition: "center -20px", // Move the image 50 pixels down
              backgroundRepeat: "no-repeat",
              backgroundAttachment: "fixed",
              zIndex: -1,
            }}></div>
          <div className='relative w-[350px] h-[350px] mt-12'>
            <video ref={videoRef} className='object-cover w-full h-full border-4 border-gray-400 rounded-md' />

            <div className='absolute inset-0 flex items-center justify-center'>
              <div className='w-[320px] h-[320px] border-4 border-white rounded-lg bg-transparent' />
            </div>
            <div className='absolute left-6 top-0 h-1 bg-white animate-scanning w-[300px] mt-[25px]' />
          </div>
        </>
      ) : (
        // Show shop details if shop data is available
        <div className='flex items-center justify-between p-4 mb-6 bg-white shadow-md w-[1200px] mt-10'>
          <div className='flex items-center hover:bg-gray-100' onClick={() => (window.location.href = `/shops/${shopId}`)}>
          <img src={shop.shopLogo} alt={`${shop.shopName} logo`} className='object-cover w-56 h-56 rounded-full' />
            
          <div className='ml-4'>
              <h1 className='text-2xl font-bold'>{shop.shopName}</h1>
              <p className='mb-1 text-gray-700'>Location: {shop.location}</p>
              <p className='mb-1 text-gray-700'>Category: {shop.shopCategory}</p>
              {/* <p>{shop.followers || 0} Followers</p> */}
              <h3 className='text-xl font-semibold'>Overall Ratings:</h3>
              <div className='flex items-center'>
                {feedbacks.length > 0 ? (
                  <>
                    {renderStars(averageRating, true)}
                    <p className='ml-2 text-lg'>{averageRating.toFixed(1)}</p>
                  </>
                ) : (
                  <p>No ratings yet</p>
                )}
              </div>
            </div>
          </div>
          <div className=''>
            <button
              className=' ml-[-300px] px-4 py-2 font-semibold text-white bg-green-500 rounded hover:bg-green-600'
              onClick={() => {
                window.location.href = `/locations/${shop.location}`;
              }}>
              Find Location
            </button>
          </div>
          {/* <div className='flex space-x-4'>
            <button className='px-4 py-2 mr-12 font-semibold text-white bg-orange-500 rounded hover:bg-orange-600'>FOLLOW</button>
          </div> */}
        </div>
      )}
    </div>
  );
};

export default ScanQR;
