import React, { useState, useEffect  } from 'react'
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { useParams, Link } from "react-router-dom"
import bgblue from '../../../src/assets/recommendations/bgblue1.jpg'; // Background image
import CustomPopup from '../Recommendations/Components/CustomPopup'; // Modal component
import Carousel from '../Recommendations/Components/Carousel'; // Modal component
import ListMeasurements from '../Recommendations/ListMeasurements'
import bust1 from '../../../src/assets/recommendations/bust1.jpg'; // Image for Bust measurement guide
import bust2 from '../../../src/assets/recommendations/bust2.jpg'; // Image for Waist measurement guide
import bust3 from '../../../src/assets/recommendations/bust3.jpg'; // Image for Hip measurement guide
import bust4 from '../../../src/assets/recommendations/bust4.jpg'; // Image for Hip measurement guide
import waist1 from '../../../src/assets/recommendations/waist1.jpg'; // Image for Hip measurement guide
import waist2 from '../../../src/assets/recommendations/waist2.jpg'; // Image for Hip measurement guide
import waist3 from '../../../src/assets/recommendations/waist3.jpg'; // Image for Hip measurement guide
import waist4 from '../../../src/assets/recommendations/waist4.jpg'; // Image for Hip measurement guide
import waist5 from '../../../src/assets/recommendations/waist5.jpg'; // Image for Hip measurement guide
import hip1 from '../../../src/assets/recommendations/hip1.webp'; // Image for Hip measurement guide
import hip2 from '../../../src/assets/recommendations/hip2.jpg'; // Image for Hip measurement guide
import hip3 from '../../../src/assets/recommendations/hip3.jpg'; // Image for Hip measurement guide
import tone1 from '../../../src/assets/recommendations/tone1.jpeg'; // Image for Skin Tone guide
import tone2 from '../../../src/assets/recommendations/tone2.jpeg'; // Image for Skin Tone guide
import tone3 from '../../../src/assets/recommendations/tone3.jpeg'; // Image for Skin Tone guide
import tone4 from '../../../src/assets/recommendations/tone4.jpeg'; // Image for Skin Tone guide
import tone5 from '../../../src/assets/recommendations/tone5.jpeg'; // Image for Skin Tone guide



const AddMeasurements = () => {
  const [bust, setBust] = useState("");
  const [waist, setWaist] = useState("");
  const [hip, setHip] = useState("");
  const [undertone, setUndertone] = useState("");
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const [popupType, setPopupType] = useState('info'); // 'info' or 'error'
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const { measurementsId } = useParams(); // Get the eventId from URL params
  const [selectedMeasurements, setSelectedMeasurements] = useState(null);
  const userId = localStorage.getItem("userId"); // Retrieve the current user's ID from localStorage
  const [isPersonal, setIsPersonal] = useState(true);
  const [saveName, setSaveName] = useState("");


  const imagesBust = [bust1, bust2, bust3, bust4];
  const imagesWaist = [waist1, waist2, waist3, waist4, waist5];
  const imagesHip = [hip1, hip2, hip3];
  const imagesTone = [tone1, tone2, tone3, tone4, tone5];


  useEffect(() => {
    if (measurementsId) {
      // Only trigger this effect if measurementsId exists
      axios
        .get(`http://localhost:3050/api/measurements/getUserMeasurements/${measurementsId}`)
        .then(response => {
          console.log(response.data); // Check the data structure here
          setSelectedMeasurements(response.data.userMeasurements); // Set the measurements data
        })
        .catch(error => {
          console.error('There was an error fetching the measurements!', error);
        });
    }
  }, [measurementsId]);


  useEffect(() => {
    if (selectedMeasurements) {
      setBust(selectedMeasurements.bust || '');
      setWaist(selectedMeasurements.waist || '');
      setHip(selectedMeasurements.hip || '');
      setUndertone(selectedMeasurements.undertone || '');
      setIsPersonal(selectedMeasurements.isPersonal);
      console.log('isPersonal:', selectedMeasurements.isPersonal);
      setSaveName(selectedMeasurements.saveName || "");
    }
  }, [selectedMeasurements]);



  function validateInput(name, value) {
    switch (name) {
      case 'bust':
        if (value < 1) return "Enter Bust";
        return "";
      case 'waist':
        if (value < 1) return "Enter Waist";
        return "";
      case 'hip':
        if (value < 1) return "Enter Hip";
        return "";
      case 'saveName':
        if (!value) return "Enter Name";
        return "";
      default:
        return "";
    }
  }

  function handleInputChange(e) {
    const { name, value } = e.target;
    setErrors({
      ...errors,
      [name]: validateInput(name, value)
    });
    switch (name) {
      case 'bust':
        setBust(value);
        break;
      case 'waist':
        setWaist(value);
        break;
      case 'hip':
        setHip(value);
        break;
      case 'undertone':
        setUndertone(value);
        break;
      case 'saveName':
        setSaveName(value);
        break;
      default:
        break;
    }
  }

  function sendData(e) {
    e.preventDefault();
  
    // Validate input before sending data
    const validationErrors = {
      bust: validateInput('bust', bust),
      waist: validateInput('waist', waist),
      hip: validateInput('hip', hip),
      undertone: validateInput('undertone', undertone)
    };
  
    if (Object.values(validationErrors).some((error) => error !== "")) {
      setErrors(validationErrors);
      return;
    }
  
    const measurementsData = {
      userId,
      bust,
      waist,
      hip,
      undertone,
      isPersonal,
      saveName
    };
  
    // Handle success and error responses
    const handleResponse = (message, type) => {
      setPopupMessage(message);
      setPopupType(type);
      setIsPopupOpen(true);
  
      // Reset input fields
      setBust("");
      setWaist("");
      setHip("");
      setUndertone("");
      setIsPersonal("");
      setSaveName("");
    };
  
    const handleError = (message) => {
      setPopupMessage(message);
      setPopupType('error');
      setIsPopupOpen(true);
    };
  
    // Make the appropriate API request
    const request = measurementsId
      ? axios.put(`http://localhost:3050/api/measurements/updateMyMeasurements/${measurementsId}`, measurementsData)
      : axios.post("http://localhost:3050/api/measurements/saveMeasurements", measurementsData);
  
    // Handle the response for both PUT and POST
    request
      .then(() => handleResponse("Measurements saved/updated successfully!", 'info'))
      .catch(() => handleError("Error saving/updating measurements. Please try again."));
  }
  

  return (
    <div className="relative min-h-screen">
      {/* Background Image */}
      <div
        className="absolute inset-0 z-0 bg-fixed"
        style={{
          backgroundImage: `url(${bgblue})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      ></div>

      {/* Content Wrapper */}
      
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen">
        <div className="container my-10 px-8 py-10 max-w-5xl mx-auto  bg-white opacity-90 shadow-2xl shadow-blue-400 rounded-[5px] overflow-auto font-lexend">
            
        <div className="text-5xl font-extrabold ...">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-800 to-black justify-center">
              Enter Measurements
            </span>
          </div>

        <form className="mt-3" onSubmit={sendData}>

                      {/* Invisible input field */}
              {/* <input
                type="text"
                id="currentUserId"
                name="currentUserId"
                value={currentUserId}
                style={{ display: 'none' }} // This makes the input invisible
                readOnly
            /> */}

{/* Measurement Box 1*/}
        <div className="grid grid-cols-2 gap-16 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 mt-4 mb-4">
    <div className="container ml-10 shadow-md rounded-md overflow-hidden w-full max-h-80 mt-7 mx-8">
      

      <Carousel images={imagesBust} />

    </div>
        <div className="px-6 py-2">

            {/* with Lexend font */}
            <h1 className="text-xl font-bold text-green-800 font-inika">Bust Measurement</h1>
            <h6 className="flex items-center text-sm text-gray-600 font-lexend">
            Step 1: Stand up straight with your feet together and keep your arms relaxed at your sides. Ensure your posture is natural but upright.<br /><br />

Step 2: Place a measuring tape around the fullest part of your bust. This is usually across the nipples and around your back. Keep the tape parallel to the floor for an accurate measurement.<br /><br />

Step 3: Ensure the tape lies flat against your skin and is snug but not too tight. It should fit comfortably without squeezing or compressing your chest.<br /><br />

Step 4: Take a deep breath in and out to ensure the tape is positioned correctly, then note the measurement where the end of the tape meets the rest. This number is your bust measurement.<br /><br />
</h6>
            <div className="flex  mt-2">
            <label className="block font-bold text-lg text-blue-800 mr-3" htmlFor="bust">Bust</label>
              <input className="w-28 p-1 border border-gray-200 rounded text-base font-lexend form-check"
                type="number" placeholder="Enter Bust" name="bust" value={bust}
                onChange={handleInputChange}
              />
              <p className="flex items-center text-base font-bold text-green-600 pr-12 ml-3">inches</p>
            </div>
            {errors.bust && <div className="text-red-600">{errors.bust}</div>}

                   
        </div>  
  
      </div>
      {/* Measurement Box 1 Ends*/}

<hr></hr>

      {/* Measurement Box 2 */}
      <div className="grid grid-cols-2 gap-16 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 mt-4 mb-4" >
    <div className="container shadow-md rounded-md overflow-hidden w-full max-h-80 mt-7 mx-8">
    <Carousel images={imagesWaist} />
    </div>
        <div className="px-0 py-4">


            
            {/* Event Date with Lexend font */}
            <h1 className="text-xl font-bold text-green-800 font-inika">Waist Measurement</h1>
            <h6 className="flex items-center text-sm text-gray-600 font-lexend">
           Step 1: Using your fingers, locate your waist by placing your thumbs at the base of your rib cage and your index fingers at the top of your hips. Your waist will be the narrowest part of your torso.<br /><br />
Step 2: Stand up straight, exhale slowly, and wrap the measuring tape around your body from your navel to your back. Ensure that the tape connects at the front.<br /><br />

Step 3: The tape should be parallel to the floor and snug around your torso without digging in.<br /><br />

Step 4: Write down the number where the ends of the tape meet. This is your waist measurement.<br /><br /></h6>
            

            <div className="flex  mt-2">
            <label className="block font-bold text-lg text-blue-800 mr-3" htmlFor="waist">Waist</label>
              <input className="w-28 p-1 border border-gray-200 rounded text-base font-lexend form-check"
                type="number" placeholder="Enter Waist" name="waist" value={waist}
                onChange={handleInputChange}
              />
             

              <p className="flex items-center text-base font-bold text-green-600 pr-12 ml-3">inches</p>
              
            </div>
            {errors.waist && <div className="text-red-600">{errors.waist}</div>}
  
           
  
            
                      
        </div>  
        
  
      </div>
      {/* Measurement Box 2 Ends*/}

<hr></hr>
      {/* Measurement Box 3*/}
      <div className="grid grid-cols-2 gap-16 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 mt-4 mb-4">
    <div className="container shadow-md rounded-md overflow-hidden w-full max-h-80 mt-7 mx-8">
    <Carousel images={imagesHip} />
    </div>
        <div className="px-0 py-4">

            
            
            {/* with Lexend font */}
            <h1 className="text-xl font-bold text-green-800 font-inika">Hip Measurement</h1>
            <h6 className="flex items-center text-sm text-gray-600 font-lexend">
            Step 1: Stand up straight with your feet together. Ensure your weight is evenly distributed on both legs for an accurate measurement.<br /><br />

Step 2: Wrap the measuring tape around the fullest part of your hips and buttocks. This is usually the widest area below your waist, around your hips.<br /><br />

Step 3: Keep the tape snug but not tight, ensuring it's flat and parallel to the floor. Make sure the tape is not twisted or digging into your skin.<br /><br />

Step 4: Check that the tape remains level around your hips, then note the measurement where the tape ends meet. This is your hip measurement.<br /><br /></h6>

            <div className="flex  mt-2">
            <label className="block font-bold text-lg text-blue-800 mr-3" htmlFor="hip">Hip</label>
              <input className="w-28 p-1 border border-gray-200 rounded text-base font-lexend form-check"
                type="number" placeholder="Enter Hip" name="hip" value={hip}
                onChange={handleInputChange}
              />
              

              <p className="flex items-center text-base font-bold text-green-600 pr-12 ml-3">inches</p>
            </div>
            {errors.hip && <div className="text-red-600">{errors.hip}</div>}
  
  
            
            
                      
        </div>  
        
  
      </div>
      {/* Measurement Box 3 Ends*/}

      <hr></hr>

      <div className="mt-8 text-5xl font-extrabold ...">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-800 to-black justify-center">
              Skin Undertone
            </span>
          </div>

          
      {/* Tone Box*/}
      <div className="grid grid-cols-2 gap-16 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 mt-4 mb-4">
    <div className="container shadow-md rounded-md overflow-hidden w-full max-h-80 mt-7 mx-8">
    
    <Carousel images={imagesTone} />
    </div>
        <div className="px-0 py-4">

            
            
            {/* with Lexend font */}
            <h6 className="flex items-center text-sm text-gray-600 font-lexend">
            Step 1: Start by washing your hands and face to remove any makeup or dirt that might affect your skin's natural color. Dry your skin thoroughly. <br/><br/>

Step 2: Find a spot with natural light, preferably by a window. Artificial lighting can distort your skin tone, so natural sunlight works best.<br/><br/>

Step 3: Look at the veins on the underside of your wrist. If they appear blue or purple, you likely have cool undertones. If they look green, you may have warm undertones. If you can't tell or see both, you might have neutral undertones.<br/><br/>

Step 4: Hold a piece of white paper next to your face in natural light. If your skin looks more yellow or golden against the white, you have warm undertones. If it looks pink, rosy, or bluish, you have cool undertones.<br/><br/>
</h6>

<div className="flex mt-4">
  <label className="block font-bold text-lg text-blue-800 mr-3">Undertone</label>

  {/* Cool */}
  <div className="flex items-center mr-4">
    <input
      type="radio"
      id="cool"
      name="undertone"
      value="Cool"
      className="w-4 h-4 text-blue-600"
      onChange={handleInputChange}
      checked={undertone === 'Cool'}
    />
    <label htmlFor="cool" className="ml-0 text-base font-medium text-gray-900">
      Cool
    </label>
  </div>

  {/* Neutral */}
  <div className="flex items-center mr-4">
    <input
      type="radio"
      id="neutral"
      name="undertone"
      value="Neutral"
      className="w-4 h-4 text-blue-600"
      onChange={handleInputChange}
      checked={undertone === 'Neutral'}
    />
    <label htmlFor="neutral" className="ml-2 text-base font-medium text-gray-900">
      Neutral
    </label>
  </div>

  {/* Warm */}
  <div className="flex items-center">
    <input
      type="radio"
      id="warm"
      name="undertone"
      value="Warm"
      className="w-4 h-4 text-blue-600"
      onChange={handleInputChange}
      checked={undertone === 'Warm'}
    />
    <label htmlFor="warm" className="ml-2 text-base font-medium text-gray-900">
      Warm
    </label>
  </div>
</div>
            {errors.hip && <div className="text-red-600">{errors.undertone}</div>}
  
  
            
            
                      
        </div>  
        
  
      </div>
      {/* Tone Box  Ends*/}



      <hr></hr>
      {/* saveName?*/}
      <div className=" mt-4 mb-4">


                  <div className="  text-base font-semibold mt-4 flex justify">
                      <label className="flex items-center font-bold text-xl text-green-800 " htmlFor="ticketPrice">Save Name
                      </label>
                      <input required className=" p-0 ml-4 border border-gray-200 rounded text-lg font-lexend form-check"
                          type="text" placeholder="Enter Name" name="saveName" value={saveName} min="0"
                          onChange={handleInputChange}
                          
                      />
                                        {errors.saveName && <div className="text-red-600">{errors.saveName}</div>}
                  </div>

            
 
      </div>
      {/* saveName? 3 Ends*/}
      
      <center>
              <br />
              <div className="flex justify-center mt-5">
                <button className="flex items-center bg-blue-700 text-white text-lg px-6 py-2 border border-blue-800 rounded-full cursor-pointer font-bold hover:bg-blue-400 hover:border-blue-950" type="submit" name="submit" id="submit">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-1">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                  </svg> Proceed
                </button>

                <Link to={`/profile`} className="flex items-center ml-24 bg-red-700 text-white text-lg px-3 py-2 border border-red-800 rounded-full cursor-pointer font-bold hover:bg-red-400 hover:border-red-950" type="button" name="cancel" id="cancel">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-1">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12h-9m9 0l-4.5 4.5m4.5-4.5L12 7.5" />
                  </svg> Cancel
                </Link>
              </div>
            </center>
      </form>
      <CustomPopup
          isOpen={isPopupOpen}
          message={popupMessage}
          onClose={() => {
            setIsPopupOpen(false);
            navigate("/profile");
          }}
          type={popupType}
        />

         
        </div>
      </div>

    </div>
  );
}

export default AddMeasurements;
