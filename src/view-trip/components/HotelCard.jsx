import { GetPlaceDetails, PHOTO_URL } from "@/service/GlobalApi";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function HotelCard({ item, index }) {
  const [photoUrl, setPhotoUrl] = useState();
  useEffect(() => {
    item && GetPlacePhoto();
  }, [item]);
  const GetPlacePhoto = async () => {
    const data = {
      textQuery: item?.hotelName,
    };
    const result = await GetPlaceDetails(data).then((res) => {
      console.log(res.data.places[0].photos[0].name);

      const photoUrl = PHOTO_URL.replace(
        "{NAME}",
        res.data.places[0].photos[0].name
      );
      setPhotoUrl(photoUrl);
      console.log(photoUrl);
    });
  };

  return (
    <div>
      <Link
        to={
          "https://www.google.com/maps/search/?api=1&query=" +
          item.hotelName +
          "+" +
          item.hotelAddress
        }
        target="_blank"
      >
        <div key={index}>
          <img
            src={photoUrl ? photoUrl : "/placeholder.png"}
            className="h-[180px] w-full object-cover"
            alt=""
          />
          <h2>{item.hotelName}</h2>
          <h2>{item.hotelAddress}</h2>
          <h2>{item.rating}</h2>
          <h2>{item.price}</h2>
        </div>
      </Link>
    </div>
  );
}

export default HotelCard;
