import React from "react";
import Footer from "./Footer";

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-orange-600">
            About Shopping EYE
          </h1>
          <p className="text-lg text-gray-700 mt-4">
            Discover the Future of Shopping, Where Convenience Meets
            Personalization
          </p>
        </div>

        {/* Image and Intro Section */}
        <div className="flex flex-wrap justify-center items-center mb-16">
          <div className="w-full md:w-1/2 px-4 mb-8 md:mb-0">
            <img
              src="https://5.imimg.com/data5/SELLER/Default/2023/4/301974425/CQ/LZ/HB/62560927/architectural-bungalow-rendering-service-1000x1000.jpg"
              alt="Shopping Experience"
              className="rounded-lg shadow-lg w-full"
            />
          </div>
          <div className="w-full md:w-1/2 px-4">
            <h2 className="text-3xl font-semibold text-gray-800 mb-4">
              Who We Are
            </h2>
            <p className="text-lg text-gray-600 mb-4">
              Shopping EYE is your ultimate shopping assistant, designed to
              streamline and enhance your shopping experience. Our platform
              connects you with a diverse range of stores and helps you find
              exactly what you’re looking for—whether it’s the latest fashion,
              daily essentials, or exclusive deals.
            </p>
            <p className="text-lg text-gray-600">
              From personalized recommendations to easy store navigation, we aim
              to provide an enjoyable, efficient, and satisfying shopping
              experience for all our users.
            </p>
          </div>
        </div>

        {/* Features Section */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-8">
            What We Offer
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <img
                src="https://media.istockphoto.com/id/1209041666/photo/happy-stylish-female-and-wallet-near-shopping-bags.jpg?s=2048x2048&w=is&k=20&c=HPfBb36sEAQFkuRQxw3HsEvC60qQLio5awu8QSoodnQ="
                alt="Personalized Shopping"
                className="mx-auto mb-4 h-100"
              />
              <h3 className="text-2xl font-semibold text-gray-700">
                Personalized Shopping
              </h3>
              <p className="text-gray-600 mt-2">
                Get recommendations based on your preferences and past
                purchases.
              </p>
            </div>

            <div className="text-center">
              <img
                src="https://media.licdn.com/dms/image/v2/C4D12AQE8J4xSoOmDjw/article-cover_image-shrink_600_2000/article-cover_image-shrink_600_2000/0/1520180111673?e=2147483647&v=beta&t=UXn-tBkqr0mp1Yub-Av6jVIzTK4c7l5m8NTxCUANEqY"
                alt="Exclusive Deals"
                className="mx-auto mb-4 h-100"
              />
              <h3 className="text-2xl font-semibold text-gray-700">
                Shop for you Body-Type
              </h3>
              <p className="text-gray-600 mt-2">
                Discover great deals from your favorite stores, all in one
                place.
              </p>
            </div>

            <div className="text-center">
              <img
                src="https://www.interact-lighting.com/content/dam/b2b-li/en_AA/interact/capabilities/indoor-navigation/retail/image3.jpg"
                alt="Seamless Store Navigation"
                className="mx-auto mb-4 h-100"
              />
              <h3 className="text-2xl font-semibold text-gray-700">
                Seamless Store Navigation
              </h3>
              <p className="text-gray-600 mt-2">
                Effortlessly browse and find items from any store with our
                easy-to-use interface.
              </p>
            </div>
          </div>
        </div>

        {/* Mission Section */}
        <div className="bg-white shadow-md rounded-lg p-8 mb-16">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-6">
            Our Mission
          </h2>
          <p className="text-lg text-gray-700 text-center mb-6">
            At Shopping EYE, our mission is to make shopping convenient,
            personalized, and enjoyable for everyone. We bring together
            technology and customer-centric design to create a platform that
            adapts to your needs, so you can spend more time enjoying your
            purchases and less time searching for them.
          </p>
          <div className="text-center">
            <img
              src="https://bynder.southbankcentre.co.uk/transform/1a0c7599-812d-4f01-95d6-5e52f54b074c/Royal-Festival-Hall-Shop-01?io=transform%3Afill%2Cwidth%3A1950%2Cheight%3A650"
              alt="Our Mission"
              className="rounded-lg shadow-lg w-full"
            />
          </div>
        </div>

        {/* Team Section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-8">
            Meet the Team
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <img
                src="https://avatars.githubusercontent.com/u/152960674?v=4"
                alt="Team Member"
                className="rounded-full mx-auto mb-4 h-56 w-56 object-cover"
              />
              <h3 className="text-2xl font-semibold text-gray-700">
                Yasiru Kaveeshwara
              </h3>
              {/* <p className="text-gray-600">CEO & Founder</p> */}
            </div>

            <div>
              <img
                src="https://avatars.githubusercontent.com/u/165528306?v=4"
                alt="Team Member"
                className="rounded-full mx-auto mb-4 h-56 w-56 object-cover"
              />
              <h3 className="text-2xl font-semibold text-gray-700">
                Vilan Siriwardana
              </h3>
              {/* <p className="text-gray-600">Head of Marketing</p> */}
            </div>

            <div>
              <img
                src="https://media.licdn.com/dms/image/v2/D5603AQGFtdwHBC7jbQ/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1719485979912?e=1733356800&v=beta&t=cJkVnHKRCxHNvPXDVU7eEqJX-oyQUuswrJXTvTWn9T0"
                alt="Team Member"
                className="rounded-full mx-auto mb-4 h-56 w-56 object-cover"
              />
              <h3 className="text-2xl font-semibold text-gray-700">
                Nuwani Fonseka
              </h3>
              {/* <p className="text-gray-600">Lead Developer</p> */}
            </div>
            <div>
              <img
                src="https://avatars.githubusercontent.com/u/72993280?s=400&u=bceb1c518642feccc36f8b1b594e09ff9b3d1dfe&v=4"
                alt="Team Member"
                className="rounded-full mx-auto mb-4 h-56 w-56 object-cover"
              />
              <h3 className="text-2xl font-semibold text-gray-700">
                Tiny Handalage
              </h3>
              {/* <p className="text-gray-600">Lead Developer</p> */}
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className="text-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-8">
            Get In Touch
          </h2>
          <p className="text-lg text-gray-700 mb-4">
            Have any questions or feedback? Feel free to reach out to us at
            <a
              href="mailto:contact@shoppingeye.com"
              className="text-orange-600 ml-2"
            >
              contact@shoppingeye.com
            </a>
          </p>
          <p className="text-lg text-gray-700">
            We’d love to hear from you and make your shopping experience even
            better!
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AboutPage;
