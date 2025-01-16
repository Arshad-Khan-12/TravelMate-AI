import React from "react";
import { Link } from "react-router-dom";
import HotelCard from "./HotelCard";

function Hotels({ trip }) {
  return (
    <div>
      <h2>Hotel Recommondations</h2>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4 ">
        {trip?.tripData?.hotelOptions?.map((item, index) => (
          <HotelCard key={index} item={item} index={index} />
          //   <Link
          //     key={index}
          //     to={
          //       "https://www.google.com/maps/search/?api=1&query=" +
          //       item.hotelName +
          //       "+" +
          //       item.hotelAddress
          //     }
          //     target="_blank"
          //   >
          //     <div key={index}>
          //       {/* <img src={photoUrl} alt="" /> */}
          //       <img src="/TravelMate AI.png" alt="" />
          //       <h2>{item.hotelName}</h2>
          //       <h2>{item.hotelAddress}</h2>
          //       <h2>{item.rating}</h2>
          //       <h2>{item.price}</h2>
          //     </div>
          //   </Link>
        ))}
      </div>
    </div>
  );
}

export default Hotels;
