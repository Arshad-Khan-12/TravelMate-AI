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
      <img
        src={photoUrl ? photoUrl : "/placeholder.png"}
        className="h-[340px] w-full object-cover rounded-xl "
        alt=""
      />
      <div>
        <h1 className="text-center text-2xl font-bold p-4">
          {trip?.userChoice?.destination?.label}
        </h1>
        <div className="text-slate-700 text-base flex gap-4 py-5 ">
          <p className="bg-orange-100 px-2 py-1 border rounded-xl border-orange-800 cursor-pointer hover:scale-105">
            Days: {trip.userChoice?.days}
          </p>
          <p className="bg-orange-100 px-2 py-1 border rounded-xl border-orange-800 cursor-pointer hover:scale-105">
            Budget: {trip.userChoice?.budget}
          </p>
          <p className="bg-orange-100 px-2 py-1 border rounded-xl cursor-pointer border-orange-800 hover:scale-105">
            Category: {trip.userChoice?.travelType}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Information;
