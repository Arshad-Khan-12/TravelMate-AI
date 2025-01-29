import { Button } from "@/components/ui/button";
import { GetPlaceDetails, PHOTO_URL } from "@/service/GlobalApi";
import { formatPrice } from "@/service/utils";
import React, { useEffect, useState } from "react";
import { BsFillStarFill } from "react-icons/bs";
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
    // <div>
    //   <Link
    //     to={
    //       "https://www.google.com/maps/search/?api=1&query=" + place?.placeName
    //     }
    //     target="_blank"
    //   >
    //     <div key={placeIndex}>
    //       <img
    //         src={photoUrl ? photoUrl : "/placeholder.png"}
    //         className="h-[180px] w-full object-cover"
    //         alt=""
    //       />
    //       <h3>{place?.placeName}</h3>
    //       <p>{place?.placeDetails}</p>
    //       <p>{place?.travelTime}</p>
    //       <p>{place?.ticketPricing}</p>
    //     </div>
    //   </Link>
    // </div>

    <div
      key={placeIndex}
      className="border border-gray-200 rounded-lg shadow-lg flex flex-col"
    >
      {/* Image Section */}
      <img
        src={photoUrl ? photoUrl : "/placeholder.png"}
        className="h-[200px] w-full object-cover rounded-t-lg"
        alt="Places"
      />

      {/* Content Section */}
      <div className="flex flex-col flex-grow justify-between p-4">
        {/* Rating and Price */}
        <div className="flex justify-between items-center mb-3 font-bold text-sm">
          <div className="flex items-center gap-1">
            <BsFillStarFill className="text-yellow-500" />
            <span>{place.rating}</span>
          </div>
          <span className="text-gray-700">
            {formatPrice(place.ticketPricing)}
          </span>
        </div>

        {/* Hotel Name and Address */}
        <div className="mb-4">
          <h1 className="font-bold text-base text-gray-800">
            {place.placeName}
          </h1>
          <div className="flex flex-col gap-3">
            <p className="text-sm text-gray-600">{place.placeDetails}</p>
            <p className="text-sm text-gray-600">
              <span className="font-bold text-gray-800">Travel Time: </span>
              {place.travelTime}
            </p>
          </div>
        </div>

        {/* Button */}
        <Link
          to={
            "https://www.google.com/maps/search/?api=1&query=" + place.placeName
          }
          target="_blank"
        >
          <Button
            variant="outline"
            className="w-full mt-2 border-2 font-bold hover:bg-black hover:text-white border-black "
          >
            <span className="">View On Map</span>
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default Place;
