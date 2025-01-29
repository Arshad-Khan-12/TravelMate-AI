import React from "react";
import { Link } from "react-router-dom";
import HotelCard from "./HotelCard";

function Hotels({ trip }) {
  return (
    <div>
      <h2 className="text-center text-2xl text-gray-800 font-bold py-4 my-4 ">
        Hotel Recommendations
      </h2>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4 ">
        {trip?.tripData?.hotelOptions?.map((item, index) => (
          <HotelCard key={index} item={item} index={index} />
        ))}
      </div>
    </div>
  );
}

export default Hotels;
