import { GetPlaceDetails, PHOTO_URL } from "@/service/GlobalApi";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Place({ place, placeIndex }) {
  const [photoUrl, setPhotoUrl] = useState();
  useEffect(() => {
    place && GetPlacePhoto();
  }, [place]);
  const GetPlacePhoto = async () => {
    const data = {
      textQuery: place?.placeName,
    };
    const result = await GetPlaceDetails(data).then((res) => {
      // console.log(res.data.places[0].photos[0].name);

      const photoUrl = PHOTO_URL.replace(
        "{NAME}",
        res.data.places[0].photos[0].name
      );
      setPhotoUrl(photoUrl);
    });
  };
  return (
    <div>
      <Link
        to={
          "https://www.google.com/maps/search/?api=1&query=" + place?.placeName
        }
        target="_blank"
      >
        <div key={placeIndex}>
          <img
            src={photoUrl ? photoUrl : "/placeholder.png"}
            className="h-[180px] w-full object-cover"
            alt=""
          />
          <h3>{place?.placeName}</h3>
          <p>{place?.placeDetails}</p>
          <p>{place?.travelTime}</p>
          <p>{place?.ticketPricing}</p>
        </div>
      </Link>
    </div>
  );
}

export default Place;
