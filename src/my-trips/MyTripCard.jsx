import { GetPlaceDetails, PHOTO_URL } from "@/service/GlobalApi";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function MyTripCard({ trip, index }) {
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
    <Link to={`/view-trip/${trip.id}`}>
      <div className="hover:scale-105 transition-all duration-150 ease-in-out border border-gray-200 rounded-lg shadow-lg flex flex-col h-full min-h-[320px]">
        <img
          src={photoUrl ? photoUrl : "/placeholder.jpg"}
          className="h-[200px] w-full object-cover rounded-t-lg"
          alt="Image"
        />
        <div className="flex flex-col flex-grow justify-between p-4">
          {/* This wrapper ensures consistent spacing */}
          <div className="flex-grow">
            <h1 className="font-bold text-base text-gray-800">
              {trip?.userChoice?.destination?.label}
            </h1>
            <div className="flex flex-col gap-3">
              <h2 className="font-medium text-gray-500">
                {trip?.userChoice?.days} Days Trip With{" "}
                {trip?.userChoice?.budget} Budget{" "}
              </h2>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default MyTripCard;
