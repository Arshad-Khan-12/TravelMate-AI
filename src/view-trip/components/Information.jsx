import { GetPlaceDetails, PHOTO_URL } from "@/service/GlobalApi";
import React, { useEffect, useState } from "react";
import { use } from "react";

// const PHOTO_URL =
//   "https://places.googleapis.com/v1/{NAME}/media?maxHeightPx=600&maxWidthPx=600&key=" +
//   import.meta.env.VITE_GOOGLE_PLACE_API_KEY;

function Information({ trip }) {
  const [photoUrl, setPhotoUrl] = useState();
  useEffect(() => {
    trip && GetPlacePhoto();
  }, [trip]);
  const GetPlacePhoto = async () => {
    const data = {
      textQuery: trip?.userChoice?.destination?.label,
    };
    const result = await GetPlaceDetails(data).then((res) => {
      console.log(res.data.places[0].photos[0].name);

      const photoUrl = PHOTO_URL.replace(
        "{NAME}",
        res.data.places[0].photos[0].name
      );
      setPhotoUrl(photoUrl);
    });
  };
  return (
    <div>
      <img
        src={photoUrl ? photoUrl : "/placeholder.png"}
        className="h-[340px] w-full object-cover rounded-xl "
        alt=""
      />
      <div>
        <h2>{trip?.userChoice?.destination?.label}</h2>
        <div>
          <p>{trip.userChoice?.days}</p>
          <p>{trip.userChoice?.budget}</p>
          <p>{trip.userChoice?.travelType}</p>
        </div>
      </div>
    </div>
  );
}

export default Information;
