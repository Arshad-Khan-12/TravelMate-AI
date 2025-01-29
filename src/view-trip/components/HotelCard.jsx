import { GetPlaceDetails, PHOTO_URL } from "@/service/GlobalApi";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BsFillStarFill } from "react-icons/bs";
import { Button } from "@/components/ui/button";

function HotelCard({ item, index }) {
  const price = item.price || ""; // Ensure the price is always defined

  // Debugging: Log the raw price
  console.log("Raw Price:", price);

  // Extract the portion of the string before "per night"
  const extractedPrice = price.includes("per night")
    ? price.split("per night")[0].trim() // Split by "per night" and take the first part
    : price.trim(); // If "per night" is missing, use the entire string

  // Debugging: Log the extracted price
  console.log("Extracted Price:", extractedPrice);

  const [photoUrl, setPhotoUrl] = useState();
  useEffect(() => {
    item && GetPlacePhoto();
  }, [item]);
  const GetPlacePhoto = async () => {
    const data = {
      textQuery: item?.hotelName,
    };
    const result = await GetPlaceDetails(data).then((res) => {
      // console.log(res.data.places[0].photos[0].name);

      const photoUrl = PHOTO_URL.replace(
        "{NAME}",
        res.data.places[0].photos[0].name
      );
      setPhotoUrl(photoUrl);
      // console.log(photoUrl);
    });
  };

  return (
    <div
      key={index}
      className="border border-gray-200 rounded-lg shadow-lg flex flex-col"
    >
      {/* Image Section */}
      <img
        src={photoUrl ? photoUrl : "/placeholder.jpg"}
        className="h-[200px] w-full object-cover rounded-t-lg"
        alt="Hotel"
      />

      {/* Content Section */}
      <div className="flex flex-col flex-grow justify-between p-4">
        {/* Rating and Price */}
        <div className="flex justify-between items-center mb-3 font-bold text-sm">
          <div className="flex items-center gap-1">
            <BsFillStarFill className="text-yellow-500" />
            <span>{item.rating}</span>
          </div>
          <span className="text-gray-700">{extractedPrice}</span>
        </div>

        {/* Hotel Name and Address */}
        <div className="mb-4">
          <h1 className="font-bold text-base text-gray-800">
            {item.hotelName}
          </h1>
          <p className="text-sm text-gray-600">{item.hotelAddress}</p>
        </div>

        {/* Button */}
        <Link
          to={
            "https://www.google.com/maps/search/?api=1&query=" +
            item.hotelName +
            "+" +
            item.hotelAddress
          }
          target="_blank"
        >
          <Button
            variant="outline"
            className="w-full mt-2 border-2 font-bold hover:bg-black hover:text-white border-black transition-transform hover:scale-105 transition-all duration-100 hover:text-lg"
          >
            <span className="transition-all duration-200 hover:text-lg">
              Book Now
            </span>
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default HotelCard;
