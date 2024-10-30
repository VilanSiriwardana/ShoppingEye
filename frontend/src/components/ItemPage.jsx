import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ItemPage = () => {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await fetch(`http://localhost:3050/api/items/${id}`);
        if (!response.ok) throw new Error("Failed to fetch item");
        const data = await response.json();
        setItem(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchItem();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="flex flex-col lg:flex-row p-6 bg-white">
      {item ? (
        <>
          <div className="flex flex-col items-center lg:items-start lg:w-1/2 p-4">
            {item.imageUrl && (
              <img
                src={item.imageUrl}
                alt={item.productName}
                className="w-90 h-90 object-cover mb-4 ml-20"
              />
            )}
            <div className="flex justify-center lg:justify-start space-x-2 mb-4">
              {/* Add thumbnail images if available */}
              {item.thumbnailUrls &&
                item.thumbnailUrls.map((url, index) => (
                  <img
                    key={index}
                    src={url}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-16 h-16 object-cover border"
                  />
                ))}
            </div>
          </div>

          <div className="flex flex-col lg:w-1/2 p-4">
            <h1 className="text-4xl font-bold mb-4">{item.productName}</h1>
            <p className="text-2xl font-semibold text-orange-600 mb-2">
              Rs. {item.price}
            </p>
            <p className="text-xl mb-2">
              <span className="font-bold">Category:</span> {item.category}
            </p>
            <p className="text-xl mb-2">
              <span className="font-bold">Size:</span> {item.size}
            </p>
            <p className="text-xl mb-2">
              <span className="font-bold">Shop Location:</span>{" "}
              {item.shopLocation}
            </p>
            <p className="text-lg mt-4">{item.description}</p>
            <div className="mt-4">
              {/* Delivery Options */}
              <div className="border-t pt-4 mt-4">
                <h2 className="text-xl font-bold">Delivery Options</h2>
                <p className="text-lg">Standard Delivery: Rs. 250</p>
              </div>
              {/* Return & Warranty */}
              <div className="border-t pt-4 mt-4">
                <h2 className="text-xl font-bold">Return & Warranty</h2>
                <p className="text-lg">14 days easy return</p>
                <p className="text-lg">6 Months Seller Warranty</p>
              </div>
            </div>
          </div>
        </>
      ) : (
        <p>No item found</p>
      )}
    </div>
  );
};

export default ItemPage;
