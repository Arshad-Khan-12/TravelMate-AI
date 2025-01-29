import { Target } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
import Place from "./Place";

function PlacesToVisit({ trip }) {
  //   const itinerary = trip.itinerary;
  return (
    <div className="my-10 ">
      <h2 className="font-bold text-2xl text-center">Places To Visit</h2>
      <div>
        {Object.entries(trip?.tripData?.itinerary || {}).map(
          ([dayKey, dayData], dayIndex) => (
            <div className="my-4" key={dayKey}>
              {/* Display the Day (e.g., Day 1, Day 2) */}
              <div className="flex flex-col justify-between items-center gap-4 font-semibold">
                <h2 className="font-bold text-xl text-slate-700">
                  {"Day " + (dayIndex + 1)}
                </h2>
                <h2>Best Time To Visit :{dayData.bestTimeToVisit}</h2>
                <h2>Theme : {dayData?.theme}</h2>
              </div>

              {/* Iterate through the places for the specific day */}
              <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4 my-6">
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
