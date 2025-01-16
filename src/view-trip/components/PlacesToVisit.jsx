import { Target } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
import Place from "./Place";

function PlacesToVisit({ trip }) {
  //   const itinerary = trip.itinerary;
  return (
    <div className="mt-10 ">
      <h2 className="font-medium text-lg">Places To Visit</h2>
      <div>
        {Object.entries(trip?.tripData?.itinerary || {}).map(
          ([dayKey, dayData], dayIndex) => (
            <div className="space-y-10" key={dayKey}>
              {/* Display the Day (e.g., Day 1, Day 2) */}
              <h2>{"Day " + (dayIndex + 1)}</h2>

              {/* Iterate through the places for the specific day */}
              <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4 ">
                {dayData?.places?.map((place, placeIndex) => (
                  <Place
                    key={placeIndex}
                    place={place}
                    placeIndex={placeIndex}
                  />
                ))}
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
}

export default PlacesToVisit;
