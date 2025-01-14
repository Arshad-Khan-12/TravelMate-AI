import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SelectBudgetOptions, SelectTravelsList } from "@/constants/options";
import React, { useEffect, useState } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";

function CreateTrip() {
  const [place, setPlace] = useState();
  const [formData, setFormData] = useState({});
  const [selectedBudget, setSelectedBudget] = useState(null);
  const [selectedTravelType, setSelectedTravelType] = useState(null);

  const handleInputChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  const onGenerateTrip = () => {
    if (Object.keys(formData).length === 0) {
      alert("Please fill all the fields");
      return;
    } else {
      if (
        !formData.destination ||
        !formData.days ||
        !formData.budget ||
        !formData.travelType
      ) {
        alert("Please fill all the fields");
        return;
      } else if (formData.days <= 0) {
        alert("Please enter a valid number of days");
        return;
      } else if (formData.days > 5 || formData.days < 2) {
        alert("Please enter a number of days between 2 and 5");
        return;
      } else {
        console.log("Generating Trip", formData);
        // Call API to generate
      }
    }
  };

  return (
    <div className="sm:px-10 md:px-20 lg:px-40 xl:px-60 px-5 mt-10">
      <h2 className="font-bold text-3xl ">
        Tell us your travel preferences 🛩️ 🌍 💶
      </h2>
      <p className="mt-4 text-gray-600 text-xl ">
        Just provide some basic information, and our trip planner will generate
        a customized itinerary based on your preferences.
      </p>
      <div className="text-xl mt-10 font-medium space-y-3">
        <div className="">
          <h2>What is destination of choice?</h2>
          <GooglePlacesAutocomplete
            apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
            selectProps={{
              place,
              onChange: (v) => {
                setPlace(v), handleInputChange("destination", v);
              },
            }}
          />
        </div>
        <div className="">
          <h2>How many days are you planning your trip?</h2>
          <Input
            type="number"
            placeholder={"E.g - 2"}
            onChange={(e) => handleInputChange("days", e.target.value)}
          />
        </div>
      </div>
      <div className="text-xl mt-10 font-medium">
        <h2>What's Your Budget?</h2>
        <div className="grid grid-cols-3 md:grid-cols-2 gap-4 mt-5">
          {SelectBudgetOptions.map((item, index) => (
            <div
              key={index}
              className={`p-5 border border-2 rounded-lg hover:shadow-lg cursor-pointer ${
                selectedBudget === item.title ? "border-black" : ""
              }`}
              onClick={() => {
                handleInputChange("budget", item.title);
                setSelectedBudget(item.title);
              }}
            >
              <h2>{item.icon}</h2>
              <h2>{item.title}</h2>
              <h2>{item.desc}</h2>
            </div>
          ))}
        </div>
      </div>

      <div className="text-xl mt-10 font-medium">
        <h2>What's Your Budget?</h2>
        <div className="grid grid-cols-3 md:grid-cols-2 gap-4 mt-5">
          {SelectTravelsList.map((item, index) => (
            <div
              key={index}
              className={`p-5 border border-2 rounded-lg hover:shadow-lg cursor-pointer ${
                selectedTravelType === item.title ? "border-black" : ""
              }`}
              onClick={() => {
                handleInputChange("travelType", item.title);
                setSelectedTravelType(item.title);
              }}
            >
              <h2>{item.icon}</h2>
              <h2>{item.title}</h2>
              <h2>{item.desc}</h2>
            </div>
          ))}
        </div>
      </div>
      <div className="flex items-end justify-end m-10">
        <Button onClick={onGenerateTrip}>Generate Trip</Button>
      </div>
    </div>
  );
}

export default CreateTrip;
