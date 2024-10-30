import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import ItemView from '../../components/ProductCardView/ItemView'; // Adjust the path as necessary
import ProfileSideBar from "../../components/ProfileSideBar"; // Adjust the path as necessary
import bust1 from '../../../src/assets/recommendations/bust1.jpg'; // Image for Bust measurement guide
import waist3 from '../../../src/assets/recommendations/waist3.jpg'; // Image for Hip measurement guide
import hip1 from '../../../src/assets/recommendations/hip1.webp'; // Image for Hip measurement guide
import tone5 from '../../../src/assets/recommendations/tone4.jpeg'; // Image for Skin Tone guide
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';


import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import bgblue from '../../../src/assets/recommendations/bgblue1.jpg'; // Background image
import hourglass1 from '../../../src/assets/recommendations/hourglass1.jpeg'; 

import ConfirmDeletion from '../Recommendations/Components/ConfirmDeletion'; // Import the modal component
import CustomPopup from '../Recommendations/Components/CustomPopup'; // Import the modal component


const MyRecommendations = () => {
    const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:3050/api/items');
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const handleEdit = (product) => {
    console.log('Edit product:', product);
    // Handle product editing logic here
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:3050/api/items/${id}`, {
        method: 'DELETE',
      });
      const data = await response.json();
      if (response.ok) {
        setProducts(products.filter((product) => product._id !== id));
        alert(data.message);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  const handleWishlist = (product) => {
    console.log('Wishlist product:', product);
    // Handle wishlist logic here
  };


    const pdfRef = useRef();

    const [selectedMeasurements, setSelectedMeasurements] = useState(null);
    const [selectedBodyType, setSelectedBodyType] = useState(null);
    const [outfitData, setOutfitData] = useState(null);
    const [selectedMeasurementsId, setSelectedMeasurementsId] = useState(null);
    const [filteredProducts, setFilteredProducts] = useState(null);
    const { measurementsId } = useParams(); // Get the measurementsId from URL params
    const userId = localStorage.getItem("userId"); // Retrieve the current user's ID from localStorage
    const [showFinalProducts, setShowFinalProducts] = useState(true); // State to control which grid is visible

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [popupMessage, setPopupMessage] = useState('');
    const [popupType, setPopupType] = useState('info'); // 'info' or 'error'

    const navigate = useNavigate();

    const downloadPDF = () => {
      const input = pdfRef.current;
      html2canvas(input, {
          scale: 2, // Increasing the scale factor to enhance quality
          useCORS: true, // Ensures that images hosted on different origins can be loaded correctly
      }).then((canvas) => {
          const imgData = canvas.toDataURL('image/png');      
          const pdf = new jsPDF('p', 'mm', 'a4');        
          const pdfWidth = pdf.internal.pageSize.getWidth();       
          const pdfHeight = pdf.internal.pageSize.getHeight();        
          const imgWidth = canvas.width / 2; // Adjust the width to account for the scale
          const imgHeight = canvas.height / 2; // Adjust the height to account for the scale
          const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
          const imgX = (pdfWidth - imgWidth * ratio) / 2; // Center the image
          const imgY = 10;
          pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);
          pdf.save('recommendations.pdf');
      });
  };
  

  const undertoneColorMap = {
    Cool: ['Blue', 'Purple', 'Green'],
    Warm: ['Red', 'Yellow', 'Orange', 'Brown'],
    Neutral: ['Beige', 'Pink', 'Gray'],
  };
  
    

    useEffect(() => {
      // Fetch measurements data based on measurementsId or userId when the component mounts
      async function getMyMeasurements() {
          try {
              let response;
              
              // Check if measurementsId is provided
              if (measurementsId) {
                  // Fetch measurements using measurementsId
                  response = await axios.get(`http://localhost:3050/api/measurements/getUserMeasurements/${measurementsId}`);
              } else {
                  // Fetch measurements using userId
                  response = await axios.get(`http://localhost:3050/api/measurements/getUserMeasurementsByUserId/${userId}`);
              }
              
              setSelectedMeasurements(response.data.userMeasurements);
              console.log("Fetched Measurements Details Successfully");
  
              // Retrieve the body type from the measurements data
              const bodyTypeName = response.data.userMeasurements.bodyType;  // Adjust this based on your actual data structure
              
              // If bodyTypeName is available, fetch the body type details
              if (bodyTypeName) {
                  const bodyTypeResponse = await axios.get(`http://localhost:3050/api/bodyTypes/getBodyTypeByName/${bodyTypeName}`);
                  setSelectedBodyType(bodyTypeResponse.data);
                  setOutfitData(bodyTypeResponse.data.outfits);
                  console.log("Fetched Body Type Details Successfully", bodyTypeResponse.data); 
                  console.log("Outfit Data:", bodyTypeResponse.data.outfits);
              }  
          } catch (error) {
              console.error("Error fetching Measurements data:", error.message);
              alert("Error fetching Measurements data. Please try again.");
          }
      }
      
      getMyMeasurements();
  }, [measurementsId, userId]); // Ensure userId is included in the dependencies if needed
  


 // Safely get the recommended colors based on the selected undertone
 const recommendedColors = 
 selectedMeasurements && selectedMeasurements.undertone
   ? undertoneColorMap[selectedMeasurements.undertone] || []
   : []; // Provide an empty array if selectedMeasurements is null


    const confirmDelete = async () => {
        if (selectedMeasurements && selectedMeasurements._id) {
            try {
                await axios.delete(`http://localhost:3050/api/measurements/deleteMyMeasurements/${selectedMeasurements._id}`);
                setIsModalOpen(false); // Close the modal
                setPopupMessage("Measurements Deleted Successfully!");
                setPopupType('info');
                setIsPopupOpen(true);
            } catch (error) {
                console.error("Error deleting measurements:", error.message);
                setPopupMessage("Error deleting measurements. Please try again!");
                setPopupType('error');
                setIsPopupOpen(true);
            }
        }
    };

    



    // Slider settings for each outfit's images
    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
    };


    const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = (e) => {
    e.preventDefault();  // Prevent form submission
    setCurrentIndex((prevIndex) => (prevIndex + 1) % outfitData.length);
  };

  const prevSlide = (e) => {
    e.preventDefault();  // Prevent form submission
    setCurrentIndex((prevIndex) =>
      (prevIndex - 1 + outfitData.length) % outfitData.length
    );
  };


  useEffect(() => {
    // Check if selectedMeasurements and undertone are available
    if (!selectedMeasurements || !selectedMeasurements.undertone) {
      return; // If not, exit the function early to avoid errors
    }
  
    // Function to get suitable colors and filter products
    const getSuitableColorsAndFilterProducts = () => {
      // Define your filtering logic based on undertone and product tags
      const undertoneColors = {
        Cool: ['Blue', 'Purple', 'Green'],
        Warm: ['Red', 'Yellow', 'Orange', 'Brown'],
        Neutral: ['Beige', 'Pink', 'Gray']
      };
  
      const suitableColors = undertoneColors[selectedMeasurements.undertone] || [];
      
      // Filter products based on color tags
      const filteredProducts = products.filter(product => {
        return product.tags.split(',').some(tag => suitableColors.includes(tag.trim()));
      });
  
      // Update state with the filtered products
      setFilteredProducts(filteredProducts);
    };
  
    // Call the function after the check
    getSuitableColorsAndFilterProducts();
  
  }, [selectedMeasurements, products]); // Re-run when selectedMeasurements or products change
  
   
    
  if (!selectedBodyType) {
    return <div>Loading...</div>;
  }
  if (!selectedMeasurements) {
    return <div>Loading Measurements...</div>;
  }

   // Check if outfitData exists and has length
   if (!outfitData || outfitData.length === 0) {
    return <p className="text-white text-center">No outfits available to display</p>;
  }


  

  // Map through outfits and filter products based on fitName matching with product tags
const filteredOutfitsProducts = outfitData.map(outfit => {
  const fitNameLower = outfit.fitName.toLowerCase(); // Convert fitName to lowercase for comparison
  
  return products.filter(product =>
    product.tags.toLowerCase().includes(fitNameLower) ||
    product.description.toLowerCase().includes(fitNameLower) ||
    product.category.toLowerCase().includes(fitNameLower) 
  );
});

// Flatten the array if needed (since map will return an array of arrays)
const finalFilteredProducts = filteredOutfitsProducts.flat();

console.log(finalFilteredProducts);








  


    return (
      <div className="flex">
      <ProfileSideBar />
        <div className="relative min-h-screen">
            {/* Background Image */}
            {/* <div
                className="absolute inset-0 z-0 bg-fixed"
                style={{
                    backgroundImage: `url(${bgblue})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            >
            </div> */}

<div className="mb-2">
                        <div className="flex items-center justify-between mx-48 mt-8 mb-8">
                            {selectedMeasurements && (
                                <Link
                                    to={`/updateMyMeasurements/${selectedMeasurements._id}`}
                                    className="flex items-center text-white text-xl px-3 py-1  bg-blue-500 hover:bg-blue-800   rounded-3xl"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-1">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
                                    </svg>
                                    Edit
                                </Link>
                            )}

                            <button
                                className="ml-5 flex items-center text-white text-xl font-mclaren px-3 py-1 bg-red-500 hover:bg-red-800 rounded-3xl"
                                onClick={() => {
                                    if (selectedMeasurements) {
                                        setSelectedMeasurementsId(selectedMeasurements._id);
                                        setIsModalOpen(true);
                                    }
                                }}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-1">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                </svg>
                                Reset
                            </button>


                            <button className="flex items-center px-4 py-2 text-lg font-semibold text-white bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-lg shadow-lg hover:scale-105 hover:shadow-2xl transition-transform duration-300 ease-in-out"
                              onClick={downloadPDF}>
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                              </svg>
                              <span className="font-mono">Download Report</span>
                            </button>

                        </div>
                    </div>

                    
                    <div ref={pdfRef}>

            {/* Content Wrapper */}
            <div className="relative z-10 flex flex-col items-center justify-center min-h-screen">
                <div className="container max-w-5xl p-5 mx-auto my-10 overflow-auto bg-fixed bg-opacity-50 border-8 border-double shadow-2xl rounded-3xl bg-gray-50 shadow-theme-green border-theme-green">

                  
 {/* Measurements and Skin Undertone Section */}
<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
  {/* Left: Measurements Section */}
  <div className="relative p-8 bg-gradient-to-br from-green-100 to-green-400 shadow-2xl rounded-3xl transition-transform duration-300 hover:scale-105 overflow-hidden">
    <h2 className="text-3xl font-extrabold text-center text-green-900 font-inika mb-6">Body Measurements</h2>

    <div className="flex justify-around items-center">
      {/* Bust */}
      <div className="flex flex-col items-center p-4 rounded-lg bg-white shadow-md transition-transform duration-300 hover:scale-110">
        <img src={bust1} alt="Bust Icon" className="w-20 h-20 mb-2 rounded-full shadow-lg" />
        <h3 className="text-xl font-semibold text-center">Bust</h3>
        <p className="text-lg text-center font-mclaren">{selectedMeasurements.bust} inches</p>
      </div>

      {/* Waist */}
      <div className="flex flex-col items-center p-4 rounded-lg bg-white shadow-md transition-transform duration-300 hover:scale-110">
        <img src={waist3} alt="Waist Icon" className="w-20 h-20 mb-2 rounded-full shadow-lg" />
        <h3 className="text-xl font-semibold text-center">Waist</h3>
        <p className="text-lg text-center font-mclaren">{selectedMeasurements.waist} inches</p>
      </div>

      {/* Hips */}
      <div className="flex flex-col items-center p-4 rounded-lg bg-white shadow-md transition-transform duration-300 hover:scale-110">
        <img src={hip1} alt="Hips Icon" className="w-20 h-20 mb-2 rounded-full shadow-lg" />
        <h3 className="text-xl font-semibold text-center">Hips</h3>
        <p className="text-lg text-center font-mclaren">{selectedMeasurements.hip} inches</p>
      </div>
    </div>
  </div>

  {/* Right: Skin Undertone Section */}
  <div className="relative p-8 bg-gradient-to-br from-yellow-100 to-yellow-400 shadow-2xl rounded-3xl transition-transform duration-300 hover:scale-105 overflow-hidden">
    <h2 className="text-3xl font-extrabold text-center text-yellow-900 font-inika mb-6">Skin Undertone</h2>
    <div className="flex flex-col items-center mt-4">
      {/* Undertone Image */}
      <img
        src={tone5}
        alt="Undertone Icon"
        className="w-40 h-40 object-cover rounded-full shadow-lg transition-transform duration-300 hover:scale-110"
      />
      {/* Undertone Description */}
      <h3 className="text-xl font-semibold text-center mt-4">{selectedMeasurements.undertone}</h3>
      <p className="text-base text-center font-mclaren mb-4">
        Based on your undertone, these are the best colors that suit you:
      </p>
      {/* Display Recommended Colors */}
      <div className="mt-4 grid grid-cols-4 gap-2">
        {recommendedColors.map((color, index) => (
          <div
            key={index}
            className="w-12 h-12 rounded-full shadow-lg transition-all duration-300 hover:scale-125"
            style={{ backgroundColor: color }}
            title={color}
          ></div>
        ))}
      </div>
    </div>
  </div>
</div>

{/* Body Type Details Section */}
<div className="relative p-8 bg-gradient-to-br from-blue-300 to-blue-600 shadow-2xl rounded-3xl mt-10 transition-transform duration-300 hover:scale-105 overflow-hidden">
  <h2 className="text-3xl font-extrabold text-center text-blue-900 font-inika mb-6">Body Type Details</h2>

  <div className="relative flex justify-center mt-4">
    {/* Body Type Image (large, faded) */}
    <img
      src={selectedBodyType.imageUrl} // Replace with the actual image path
      alt="Body Type"
      className="w-full h-96 object-cover rounded-lg opacity-70" // Make image bigger and faded
    />

    {/* Body Type Description (blended inside image) */}
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-40 text-white px-8 py-4 rounded-lg">
      <h3 className="text-4xl font-semibold text-center mt-2">{selectedMeasurements.bodyType}</h3>
      <p className="text-lg text-center font-mclaren mt-2">
        {selectedBodyType.description}
      </p>
      <p className="text-lg text-center font-mclaren mt-2">
        {selectedBodyType.des}
      </p>
    </div>
  </div>
</div>


                   
</div>






                        {/* Carousel Section 2 for Outfits */}
<div className="my-7 py-4 w-full max-w-full mx-auto mb-5 bg-black">
  <h2 className="text-2xl font-bold text-center text-white mb-6 bg-black py-2">Recommended Outfits</h2>
  <div className="relative overflow-hidden w-full max-w-3xl mx-auto mb-5 bg-black">
    {/* Slide container */}
    <div className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
      {outfitData.map((outfit, outfitIndex) => (
        <div className="flex-shrink-0 w-full" key={outfitIndex}>
          {/* Outfit Name */}
          <h3 className="text-xl font-semibold text-center mb-4 text-white">{outfit.fitName}</h3>
          
          {/* Horizontal Image Collage */}
          <div className="flex justify-center space-x-4 mb-4">
            {outfit.images.map((image, imgIndex) => (
              <div className="shadow-lg rounded-md overflow-hidden w-1/3 max-h-60" key={imgIndex}>
                <img className="w-full h-full object-cover transition-transform duration-300 hover:scale-105" src={image} alt={`Outfit ${outfitIndex} Image ${imgIndex}`} />
              </div>
            ))}
          </div>
          
          {/* Description Overlay */}
          <div className="mt-4 text-center">
            <p className="text-md text-white italic">{outfit.fitDescription}</p>
          </div>
          
          
        </div>
      ))}
    </div>

    {/* Left Arrow */}
    <button
      className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full transition-all duration-300 hover:bg-gray-700"
      onClick={prevSlide}
    >
      &#10094;
    </button>

    {/* Right Arrow */}
    <button
      className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full transition-all duration-300 hover:bg-gray-700"
      onClick={nextSlide}
    >
      &#10095;
    </button>
  </div>
</div>


                    <div className="flex justify-center mb-4">
                <button
                    className={`px-4 py-2 text-white rounded hover:bg-blue-900 ${
                        showFinalProducts ? 'bg-blue-900' : 'bg-blue-400'
                    }`}
                    onClick={() => setShowFinalProducts(true)} // Show final filtered products
                >
                    Outfits Based on Body Type
                </button>
                <button
                    className={`ml-4 px-4 py-2 text-white rounded hover:bg-green-900 ${
                        !showFinalProducts ? 'bg-green-900' : 'bg-green-400'
                    }`}
                    onClick={() => setShowFinalProducts(false)} // Show regular filtered products
                >
                    Outfits Based on Undertone
                </button>
            </div>

            <div className="mx-16">
    {showFinalProducts ? (
        <div>
            <h2 className="text-xl font-bold mb-4">Outfits Based on Body Type</h2>
            <div className="product-grid">
                {finalFilteredProducts.length > 0 ? (
                    finalFilteredProducts.map((product) => (
                        <ItemView
                            key={product._id}
                            product={product}
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                            onWishlist={handleWishlist}
                        />
                    ))
                ) : (
                    <p>No products available.</p>
                )}
            </div>
        </div>
    ) : (
        <div>
            <h2 className="text-xl font-bold mb-4">Outfits Based on Undertone</h2>
            <div className="product-grid">
                {filteredProducts.length > 0 ? (
                    filteredProducts.map((product) => (
                        <ItemView
                            key={product._id}
                            product={product}
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                            onWishlist={handleWishlist}
                        />
                    ))
                ) : (
                    <p>No products available.</p>
                )}
            </div>
        </div>
    )}
</div>




                    
                </div>

                                    {/* Pdf Div DEnd */}

               

                    


                


                {/* Use the Confirm Deletion Modal here */}
                <ConfirmDeletion
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onConfirm={confirmDelete}
                />

                {/* Custom Popup */}
                <CustomPopup
                    isOpen={isPopupOpen}
                    message={popupMessage}
                    onClose={() => {
                        setIsPopupOpen(false);
                        setIsModalOpen(false);
                        navigate("/");
                    }}
                    type={popupType}
                />
            </div>


        </div>
        </div>
    );
};

export default MyRecommendations;


