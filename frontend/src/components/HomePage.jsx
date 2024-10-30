import React from "react";
import heropic2 from "../images/heroPic2.png";
import { Link } from "react-router-dom";
import Footer from "./Footer";
import mall from "../images/mall.png";
import Header from "../components/Header";

const HomePage = () => {
  return (
    <>
    <Header />
    <div className="min-h-screen bg-gray-100">
      <main className="p-8">
        {/* Hero Section */}
        <section className="relative mb-16">
          <div className="relative w-full h-[80vh]">
            <img
              src={heropic2} // Replace with the desired hero image
              alt="Shopping Mall"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="bg-black opacity-60 absolute inset-0"></div>
            <div className="relative z-10 flex flex-col justify-center items-center h-full text-white text-center">
              <h1 className="text-4xl font-bold mb-4">
                Welcome to Shopping EYE
              </h1>
              <p className="text-lg mb-6">
                Your ultimate shopping destination.
              </p>
              <button className="bg-orange-500 px-6 py-3 rounded-lg">
                Start Shopping
              </button>
            </div>
          </div>
        </section>

        {/* Body Type Recommendations Section */}
        <section className="relative mb-16">
          <div className="relative w-full h-96">
            <img
              src="https://capsuleclosetstylist.com/wp-content/uploads/2022/05/smallerrdrhr.jpg" // Replace with body type image
              alt="Body Type Recommendations"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="bg-black opacity-60 absolute inset-0"></div>
            <div className="relative z-10 text-center p-8">
              <h2 className="text-3xl font-semibold text-white mb-4">
                Body Type and Colour Recommendations
              </h2>
              <p className="text-white mb-4">
                Find outfits tailored to your body type!
              </p>
              <button className="bg-orange-500 text-white px-6 py-3 rounded-lg">
                Discover Your Body Type and Colours
              </button>
            </div>
          </div>
        </section>

        {/* Clothing Color Recommendations Section */}
        <section className="relative mb-16">
          <div className="relative w-full h-96">
            <img
              src="https://images.squarespace-cdn.com/content/v1/511585b3e4b0b8b2ffe19dc6/1548543590961-GANHSZCYTQRQBQBBJMRG/color+combos+cover.png?format=1500w" // Replace with color recommendations image
              alt="Clothing Color Recommendations"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="bg-black opacity-60 absolute inset-0"></div>
            <div className="relative z-10 text-center p-8">
              <h2 className="text-3xl font-semibold text-white mb-4">
                Clothing Color Recommendations
              </h2>
              <p className="text-white mb-4">
                Find colors that suit your skin undertone!
              </p>
              <button className="bg-orange-500 text-white px-6 py-3 rounded-lg">
                Discover Your Colors
              </button>
            </div>
          </div>
        </section>

        {/* Store Directory Section */}
        <section className="relative mb-16">
          <div className="relative w-full h-96">
            <img
              src={mall} // Replace with store directory image
              alt="Explore Our Stores"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="bg-black opacity-60 absolute inset-0"></div>
            <div className="relative z-10 text-center p-8">
              <h2 className="text-3xl font-semibold text-white mb-4">
                Explore Our Stores
              </h2>
              <p className="text-white mb-4">
                Check out all the stores in the mall!
              </p>
              <Link to="/shops">
                <button className="bg-orange-500 text-white px-6 py-3 rounded-lg">
                  View Stores
                </button>
              </Link>
            </div>
          </div>
        </section>

        {/* Wishlist Feature Section */}
        <section className="relative mb-16">
          <div className="relative w-full h-96">
            <img
              src="https://images.unsplash.com/photo-1500336624523-d727130c3328" // Replace with wishlist image
              alt="Your Wishlist"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="bg-black opacity-50 absolute inset-0"></div>
            <div className="relative z-10 text-center p-8">
              <h2 className="text-3xl font-semibold text-white mb-4">
                Your Wishlist
              </h2>
              <p className="text-white mb-4">
                Keep track of your favorite items!
              </p>
              <Link to="/wishlist">
                <button className="bg-yellow-500 text-white px-6 py-3 rounded-lg">
                  View Wishlist
                </button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>

    </>
    // <div className="min-h-screen bg-gray-100">
    //   <main className="p-8">
    //     {/* Hero Section */}
    //     <section className="relative mb-16">
    //       <div className="relative w-full h-[80vh]">
    //         <img
    //           src={heropic2} // Your hero image
    //           alt="Shopping Mall"
    //           className="absolute inset-0 w-full h-full object-cover" // Cover entire section
    //         />
    //         <div className="bg-black opacity-60 absolute inset-0"></div>
    //         <div className="relative z-10 flex flex-col justify-center items-center h-full text-white text-center">
    //           <h1 className="text-4xl font-bold mb-4">
    //             Welcome to Shopping EYE
    //           </h1>
    //           <p className="text-lg mb-6">
    //             Your ultimate shopping destination.
    //           </p>
    //           <button className="bg-orange-500 px-6 py-3 rounded-lg">
    //             Start Shopping
    //           </button>
    //         </div>
    //       </div>
    //     </section>

    //     {/* Body Type Recommendations */}
    //     <section className="mb-16 text-center">
    //       <h2 className="text-3xl font-semibold mb-4">
    //         Body Type and Colour Recommendations
    //       </h2>
    //       <p className="text-gray-600 mb-4">
    //         Find outfits tailored to your body type!
    //       </p>
    //       <button className="bg-green-500 text-white px-4 py-2 rounded-lg">
    //         Discover Your Body Type
    //       </button>
    //     </section>

    //     {/* Clothing Color Recommendations */}
    //     <section className="mb-16 text-center">
    //       <h2 className="text-3xl font-semibold mb-4">
    //         Clothing Color Recommendations
    //       </h2>
    //       <p className="text-gray-600 mb-4">
    //         Find colors that suit your skin undertone!
    //       </p>
    //       <button className="bg-purple-500 text-white px-4 py-2 rounded-lg">
    //         Discover Your Colors
    //       </button>
    //     </section>

    //     {/* Store Directory */}
    //     <section className="mb-16 text-center">
    //       <h2 className="text-3xl font-semibold mb-4">Explore Our Stores</h2>
    //       <p className="text-gray-600 mb-4">
    //         Check out all the stores in the mall!
    //       </p>
    //       <Link to="/shops">
    //         <button className="bg-blue-500 text-white px-4 py-2 rounded-lg">
    //           View Stores
    //         </button>
    //       </Link>
    //     </section>

    //     {/* Wishlist Feature */}
    //     <section className="text-center mb-16">
    //       <h2 className="text-3xl font-semibold mb-4">Your Wishlist</h2>
    //       <p className="text-gray-600 mb-4">
    //         Keep track of your favorite items!
    //       </p>
    //       <Link to="/wishlist">
    //         <button className="bg-yellow-500 text-white px-4 py-2 rounded-lg">
    //           View Wishlist
    //         </button>
    //       </Link>
    //     </section>
    //   </main>
    //   <Footer />
    // </div>
    
  );
};

export default HomePage;
