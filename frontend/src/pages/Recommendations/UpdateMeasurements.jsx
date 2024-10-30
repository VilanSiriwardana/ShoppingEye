import React, {useState, useEffect} from 'react'
import axios from "axios"
import {useNavigate} from "react-router-dom"
import {useParams} from "react-router-dom"
import {Link} from "react-router-dom"
import bgblue from '../../../src/assets/recommendations/bgblue1.jpg'; // Import the image
import CustomPopup from '../Recommendations/Components/CustomPopup'; // Import the modal component



const UpdateMesurements = () => {
  const [updatedBust, setUpdatedBust] = useState("");
  const [updatedWaist, setUpdatedWaist] = useState("");
  const [updatedHip, setUpdatedHip] = useState("");

  const [selectedMeasurements, setSelectedMeasurements] = useState(null);
  
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const [popupType, setPopupType] = useState('info'); // 'info' or 'error'

  const { measurementsId } = useParams(); // Get the eventId from URL params
 


  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  // useEffect(() => {
  //   // Fetch measurements data based on measurementsId when the component mounts
  //   async function getMyMeasurements() {
  //     try {
  //       const response = axios.get(`http://localhost:3050/api/measurement/getUserMeasurements/${measurementsId}`);
  //       setSelectedMeasurements(response.data);
  //       console.log("Fetched Measurements Details Successfully");
       
  //     } catch (error) {
  //       console.error("Error fetching Measurements data:", error.message);
  //       alert("Error fetching Measurements data. Please try again.");
  //     }
  //   }

  //   getMyMeasurements();
  // }, [measurementsId]);


  useEffect(() => {
    // Fetch product details from the server
    axios.get(`http://localhost:3050/api/measurements/getUserMeasurements/${measurementsId}`)
      .then(response => {
        console.log(response.data); // Check the data structure here
        setSelectedMeasurements(response.data.userMeasurements); // Set the product data retrieved from the server


      })
      .catch(error => {
        console.error("There was an error fetching the product!", error);
      });
  }, [measurementsId]);




  useEffect(() => {
    console.log("Measurements ID:", measurementsId);
  }, [measurementsId]);
  

  useEffect(() => {
    if (selectedMeasurements) {
      setUpdatedBust(selectedMeasurements.bust || "");
      setUpdatedWaist(selectedMeasurements.waist || null);
      setUpdatedHip(selectedMeasurements.hip || null);
    }
  }, [selectedMeasurements]);



  function validateInput(name, value) {
    switch (name) {
        case 'updatedBust':
            if (value < 1) return "Enter Bust";
            return "";
        case 'updatedWaist':
            if (value < 1) return "Enter Waist";
            return "";
        case 'updatedHip':
            if (value < 1) return "Enter Hip";
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
      case 'updatedBust':
          setUpdatedBust(value);
          break;
      case 'updatedWaist':
          setUpdatedWaist(value);
          break;
      case 'updatedHip':
          setUpdatedHip(value);
          break;
      default:
          break;
  }
}



function sendData(e) {
  e.preventDefault();

  // const validationErrors = Object.keys(errors).reduce((acc, key) => {
  //     const error = validateInput(key, eval(key));
  //     if (error) acc[key] = error;
  //     return acc;
  // }, {});

  // if (Object.keys(validationErrors).length > 0) {
  //     setErrors(validationErrors);
  //     return;
  // }

   // Validate input before sending data
   const validationErrors = {
    updatedBust: validateInput('updatedBust', updatedBust),
    updatedWaist: validateInput('updatedWaist', updatedWaist),
    updatedHip: validateInput('updatedHip', updatedHip)
};

if (Object.values(validationErrors).some((error) => error !== "")) {
    setErrors(validationErrors);
    return;
}


  const updateMyMeasurements = {
    bust: updatedBust,
    waist: updatedWaist,
    hip: updatedHip
  }

  console.log("Sending Data:", updateMyMeasurements); // Log data to be sent


    axios.put(`http://localhost:3050/api/measurements/updateMyMeasurements/${measurementsId}`, updateMyMeasurements)
    .then(() => {
        // Custom success notification
       setPopupMessage("Measurements Updated successfully!");
       setPopupType('info');
       setIsPopupOpen(true);

      //Resetting inout fields
        setUpdatedBust("");
        setUpdatedWaist("");
        setUpdatedHip("");

        
    }).catch((err) => {
        alert(err);
        // Custom success notification
        setPopupMessage("Error Updating Measurements. Please try again.");
        setPopupType('error');
        setIsPopupOpen(true);
    })
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

  <div className="container my-10 max-w-3xl mx-auto p-10 bg-secondary-blue opacity-90 shadow-2xl shadow-blue-400 rounded-[50px] overflow-auto font-lexend">
    <div className="text-5xl font-extrabold ...">
      <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-800 to-black justify-center">
        Enter Measurements
      </span>
    </div>



    <form className="mt-3" onSubmit={sendData}>


      {/* User bust */}
      <div className="ml-30 text-base font-semibold mt-5">
        <label className="block font-bold text-xl text-blue-800" htmlFor="updatedBust">Bust</label>
        <input className="w-full p-1 border border-gray-200 rounded text-lg font-lexend form-check"
          type="number" placeholder="Update Bust" name="updatedBust" value={updatedBust}
          onChange={handleInputChange}
        />
        {errors.updatedBust && <div className="text-red-600">{errors.updatedBust}</div>}
      </div>

      {/* User Waist */}
      <div className="ml-30 text-base font-semibold mt-5">
        <label className="block font-bold text-xl text-blue-800" htmlFor="updatedWaist">Waist</label>
        <input className="w-full p-1 border border-gray-200 rounded text-lg font-lexend form-check"
          type="number" placeholder="Update Waist" name="updatedWaist" value={updatedWaist}
          onChange={handleInputChange}
        />
        {errors.updatedWaist && <div className="text-red-600">{errors.updatedWaist}</div>}
      </div>


      {/* User Hip */}
      <div className="ml-30 text-base font-semibold mt-5">
        <label className="block font-bold text-xl text-blue-800" htmlFor="updatedHip">Hip</label>
        <input className="w-full p-1 border border-gray-200 rounded text-lg font-lexend form-check"
          type="number" placeholder="Update Hip" name="updatedHip" value={updatedHip}
          onChange={handleInputChange}
        />
        {errors.updatedHip && <div className="text-red-600">{errors.updatedHip}</div>}
      </div>


      


      <center>
        <br />
        <div className="flex justify-center mt-5 ">
        <button className="flex items-center bg-blue-700 text-white text-lg px-6 py-2 border border-blue-800 rounded-full cursor-pointer font-bold hover:bg-blue-400 hover:border-blue-950 " type="submit" name="submit" id="submit"> 
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-1">
         <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg> Proceed </button>

        <Link to={`/listMeasurements`} className="flex items-center ml-24 bg-red-700 text-white text-lg px-3 py-2 border border-red-800 rounded-full cursor-pointer font-bold hover:bg-red-400 hover:border-red-950" type="button">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 mr-1">
  <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
</svg>
 Cancel </Link>
 </div>
      </center>
    </form>
  </div>

{/* Your component structure */}
<CustomPopup
          isOpen={isPopupOpen}
          message={popupMessage}
          onClose={() => {
            setIsPopupOpen(false);
            navigate("/listMeasurements");
          }}
          type={popupType}
        />


</div>
</div>
  )
}

export default UpdateMesurements;
