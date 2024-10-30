import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "./Header";

const ShopProfilePage = () => {
  const { id } = useParams();
  const [shop, setShop] = useState(null);
  const [feedbacks, setFeedbacks] = useState([]);
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isAnonymous, setIsAnonymous] = useState(true);
  const [userName, setUserName] = useState("");
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [showProducts, setShowProducts] = useState(false);

  useEffect(() => {
    const fetchShop = async () => {
      try {
        const response = await fetch(`http://localhost:3050/api/shops/${id}`);
        if (!response.ok) {
          throw new Error("Shop not found");
        }
        const data = await response.json();
        setShop(data);
        // Fetch all products after shop details are fetched
        fetchAllProducts();
      } catch (error) {
        console.error("Error fetching shop:", error);
      }
    };

    const fetchAllProducts = async () => {
      try {
        const response = await fetch(`http://localhost:3050/api/items`);
        if (!response.ok) {
          throw new Error("Products not found");
        }
        const data = await response.json();
        setAllProducts(data);
        // Filter products based on the shop name
        filterProductsByShop(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    const fetchFeedbacks = async () => {
      try {
        const response = await fetch(
          `http://localhost:3050/api/feedbacks/${id}`
        );
        if (!response.ok) {
          throw new Error("Feedback not found");
        }
        const data = await response.json();
        setFeedbacks(data);
      } catch (error) {
        console.error("Error fetching feedbacks:", error);
      }
    };

    const filterProductsByShop = (products) => {
      if (shop) {
        const filtered = products.filter(
          (product) => product.shopName === shop.shopName
        );
        setFilteredProducts(filtered);
      }
    };

    fetchShop();
    fetchFeedbacks();
  }, [id, shop]);

  const handleRatingChange = (newRating) => setRating(newRating);
  const handleFeedbackChange = (e) => setFeedback(e.target.value);
  const handleAnonymousChange = (e) => {
    setIsAnonymous(e.target.checked);
    if (e.target.checked) {
      setUserName("");
    }
  };
  const handleUserNameChange = (e) => setUserName(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:3050/api/feedbacks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          shopId: id,
          user: isAnonymous ? "Anonymous" : userName,
          comment: feedback,
          rating: parseFloat(rating)
        })
      });
      if (response.ok) {
        setSubmitted(true);
        const newFeedback = await response.json();
        setFeedbacks((prevFeedbacks) => [...prevFeedbacks, newFeedback]);
      } else {
        console.error("Error submitting feedback");
      }
    } catch (error) {
      console.error("Error submitting feedback:", error);
    }
  };

  const handleShowStore = () => setShowProducts(false);
  const handleShowProducts = () => setShowProducts(true);

  const renderStars = (ratingValue, isOverall = false) => {
    const stars = [];
    const maxRating = 5;
    const starColor = isOverall ? "text-orange-500" : "text-yellow-500";
    const emptyStarColor = "text-gray-300";
    for (let i = 1; i <= maxRating; i++) {
      stars.push(
        <span
          key={i}
          className={`cursor-pointer text-4xl ${
            i <= Math.floor(ratingValue) ? starColor : emptyStarColor
          } ${isOverall ? "cursor-default" : ""}`}
          onClick={() => !isOverall && handleRatingChange(i)}
          style={{ fontSize: "2rem" }}
        >
          ★
        </span>
      );
    }
    return stars;
  };

  const averageRating =
    feedbacks.length > 0
      ? feedbacks.reduce((sum, fb) => sum + (fb.rating || 0), 0) /
        feedbacks.length
      : 0;

  if (!shop) return <div>Loading...</div>;

  return (
    <div className="flex flex-col">
      {/* Header Component */}
      <Header />
      <div className="min-h-screen bg-gray-100">
        <div className="container mx-auto p-6">
          {/* Header Section */}
          <div className="flex items-center justify-between bg-white p-4 shadow-md mb-6">
            <div className="flex items-center">
              <img
                src={shop.shopLogo}
                alt={`${shop.shopName} logo`}
                className="w-56 h-56 object-cover rounded-full"
              />
              <div className="ml-4">
                <h1 className="text-2xl font-bold">{shop.shopName}</h1>
                <p className="text-gray-700 mb-1">Location: {shop.location}</p>
                <p className="text-gray-700 mb-1">
                  Category: {shop.shopCategory}
                </p>
                {/* <p>{shop.followers || 0} Followers</p> */}
                <h3 className="text-xl font-semibold">Overall Ratings:</h3>
                <div className="flex items-center">
                  {feedbacks.length > 0 ? (
                    <>
                      {renderStars(averageRating, true)}
                      <p className="ml-2 text-lg">{averageRating.toFixed(1)}</p>
                    </>
                  ) : (
                    <p>No ratings yet</p>
                  )}
                </div>
              </div>
            </div>
            <div className="flex space-x-4">
              {/* <button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded mr-12">
                FOLLOW
              </button> */}
            </div>
          </div>

          {/* Store Navigation */}
          <div className="flex justify-around bg-gray-100 p-2 mb-4">
            <button
              onClick={handleShowStore}
              className={`font-semibold ${
                !showProducts ? "text-orange-500" : "text-gray-500"
              }`}
            >
              Store
            </button>
            <button
              onClick={handleShowProducts}
              className={`font-semibold ${
                showProducts ? "text-orange-500" : "text-gray-500"
              }`}
            >
              Products
            </button>
          </div>

          {/* Conditional Rendering for Store and Products */}
          {!showProducts ? (
            <div className="bg-white p-6 rounded shadow-sm mb-6">
              {/* Shop Details Section */}
              <p className="text-gray-700 mb-1">Location: {shop.location}</p>
              <p className="text-gray-700 mb-1">
                Category: {shop.shopCategory}
              </p>
              <p className="text-gray-700 mb-1">Phone: {shop.phone}</p>
              <p className="text-gray-700 mb-1">Email: {shop.email}</p>

              {/* Ratings and Feedback Section */}
              <div className="mt-10">
                <h2 className="text-2xl font-semibold mb-4">
                  Ratings & Feedback
                </h2>
                <div>
                  {/* <h3 className="text-xl font-semibold">Overall Ratings:</h3>
                <div className="flex items-center">
                  {feedbacks.length > 0 ? (
                    <>
                      {renderStars(averageRating, true)}
                      <p className="ml-2 text-lg">{averageRating.toFixed(1)}</p>
                    </>
                  ) : (
                    <p>No ratings yet</p>
                  )}
                </div> */}
                </div>
                <div className="mt-4">
                  <h3 className="text-xl font-semibold mb-4">Feedback:</h3>
                  <ul>
                    {feedbacks.length > 0
                      ? feedbacks.map((fb) => (
                          <li
                            key={fb._id}
                            className="mb-6 p-4 border border-gray-300 rounded-lg bg-white shadow-sm"
                          >
                            <div className="items-start">
                              <p className="mr-2 font-medium">{fb.user}</p>
                              <div
                                className="flex"
                                style={{ fontSize: "0.5rem" }}
                              >
                                {renderStars(fb.rating)}
                              </div>
                            </div>
                            <p className="mt-2 text-gray-700">{fb.comment}</p>
                          </li>
                        ))
                      : "No feedback yet"}
                  </ul>
                </div>

                {/* Feedback Form */}
                <div className="mt-10">
                  <h2 className="text-2xl font-semibold mb-4">
                    Submit Feedback
                  </h2>
                  <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                      <label className="block text-gray-700 mb-2">
                        Rating:
                      </label>
                      <div className="flex">{renderStars(rating)}</div>
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-700 mb-2">
                        Feedback:
                      </label>
                      <textarea
                        value={feedback}
                        onChange={handleFeedbackChange}
                        className="w-full p-2 border border-gray-300 rounded"
                        rows="4"
                      />
                    </div>
                    <div className="mb-4">
                      <label className="inline-flex items-center">
                        <input
                          type="checkbox"
                          checked={isAnonymous}
                          onChange={handleAnonymousChange}
                          className="form-checkbox"
                        />
                        <span className="ml-2">Submit Anonymously</span>
                      </label>
                    </div>
                    {!isAnonymous && (
                      <div className="mb-4">
                        <label className="block text-gray-700 mb-2">
                          Your Name:
                        </label>
                        <input
                          type="text"
                          value={userName}
                          onChange={handleUserNameChange}
                          className="w-full p-2 border border-gray-300 rounded"
                        />
                      </div>
                    )}
                    <button
                      type="submit"
                      className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded"
                    >
                      Submit
                    </button>
                  </form>
                  {submitted && (
                    <div className="mt-4 text-green-500">
                      Feedback submitted successfully!
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white p-6 rounded shadow-sm mb-6">
              <h2 className="text-2xl font-semibold mb-4">Products</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {filteredProducts.length > 0 ? (
                  filteredProducts.map((product) => (
                    <div
                      key={product._id}
                      className="bg-gray-100 p-4 rounded shadow-sm"
                    >
                      <img
                        src={product.imageUrl}
                        alt={product.productName}
                        className="w-50 h-50 object-cover rounded"
                      />
                      <h3 className="text-lg font-semibold mt-2">
                        {product.productName}
                      </h3>
                      <p className="text-gray-700">
                        Category: {product.category}
                      </p>
                      <p className="text-gray-700">Price: ${product.price}</p>
                      <p className="text-gray-700">Size: {product.size}</p>
                      <p className="text-gray-700">
                        Location: {product.itemLocation}
                      </p>
                      {/* <p className="mt-2">{product.description}</p> */}
                    </div>
                  ))
                ) : (
                  <p>No products available for this shop.</p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShopProfilePage;
