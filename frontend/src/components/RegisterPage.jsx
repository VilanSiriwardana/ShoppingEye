import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "./Header";

const RegisterPage = () => {
  // const [phone, setPhone] = useState("");
  const [email, setEmail] = useState(""); // Added email state
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthday, setBirthday] = useState({ day: "", month: "", year: "" });
  const [gender, setGender] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!lastName || !email || !firstName || !password || !confirmPassword) {
      setError("All required fields must be filled out.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    const birthdayDate = new Date(
      `${birthday.year}-${birthday.month}-${birthday.day}`
    );

    try {
      const response = await axios.post(
        "http://localhost:3050/api/auth/register",
        {
          // phone,
          email,
          password,
          firstName,
          lastName,
          birthday: birthdayDate,
          gender
        }
      );
      console.log(response.data.token);
      navigate("/login");
    } catch (error) {
      if (error.response) {
        console.error("Error registering:", error.response.data);
        setError("Registration failed. Please try again.");
      } else if (error.request) {
        console.error("No response received:", error.request);
        setError("No response from server. Please try again.");
      } else {
        console.error("Error setting up request:", error.message);
        setError("An error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="flex flex-col">
      {/* Header Component */}
      <Header />
      <div className="min-h-screen bg-gray-100 flex justify-center items-center">
        <div className="w-full max-w-lg p-8 space-y-6 bg-white rounded-lg shadow-md mt-10 mb-10">
          <h2 className="text-2xl font-bold text-center">
            Create your Account
          </h2>
          {error && <p className="text-red-500 text-center">{error}</p>}
          <form onSubmit={handleRegister} className="space-y-4">
            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Full Name *
              </label>
              <input
                type="text"
                value={`${firstName} ${lastName}`}
                onChange={(e) => {
                  const [firstName, lastName] = e.target.value.split(" ");
                  setFirstName(firstName || "");
                  setLastName(lastName || "");
                }}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                placeholder="First Last"
              />
            </div>
            {/* Email input */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email Address *
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                placeholder="Enter your email address"
              />
            </div>
            {/* Phone number input */}
            {/* <div>
            <label className="block text-sm font-medium text-gray-700">
              Phone Number
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              placeholder="Enter your phone number"
            />
          </div> */}

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Password *
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                placeholder="Minimum 6 characters with a number and a letter"
              />
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Confirm Password *
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              />
            </div>

            {/* Birthday */}
            <div className="flex space-x-2">
              <div className="w-1/3">
                <label className="block text-sm font-medium text-gray-700">
                  Month
                </label>
                <input
                  type="number"
                  value={birthday.month}
                  onChange={(e) =>
                    setBirthday({ ...birthday, month: e.target.value })
                  }
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                  placeholder="MM"
                />
              </div>
              <div className="w-1/3">
                <label className="block text-sm font-medium text-gray-700">
                  Day
                </label>
                <input
                  type="number"
                  value={birthday.day}
                  onChange={(e) =>
                    setBirthday({ ...birthday, day: e.target.value })
                  }
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                  placeholder="DD"
                />
              </div>
              <div className="w-1/3">
                <label className="block text-sm font-medium text-gray-700">
                  Year
                </label>
                <input
                  type="number"
                  value={birthday.year}
                  onChange={(e) =>
                    setBirthday({ ...birthday, year: e.target.value })
                  }
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                  placeholder="YYYY"
                />
              </div>
            </div>

            {/* Gender */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Gender
              </label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              >
                <option value="">Select</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Sign up button */}
            <div>
              <button
                type="submit"
                className="w-full bg-orange-500 text-white font-semibold py-2 px-4 rounded hover:bg-orange-600"
              >
                SIGN UP
              </button>
            </div>
          </form>
          <div className="text-center">
            <p>
              Already a member?{" "}
              <a href="/login" className="text-blue-500 hover:underline">
                Login here
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
