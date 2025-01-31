import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  AI_PROMPT,
  SelectBudgetOptions,
  SelectTravelsList,
} from "@/constants/options";
import { AiOutlineLoading } from "react-icons/ai";
import { chatSession } from "@/service/AIModel";
import React, { useEffect, useState } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/service/firebaseConfig";
import { useNavigate } from "react-router-dom";

function CreateTrip() {
  const [place, setPlace] = useState();
  const [formData, setFormData] = useState({});
  const [selectedBudget, setSelectedBudget] = useState(null);
  const [selectedTravelType, setSelectedTravelType] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  const onGenerateTrip = async () => {
    const user = localStorage.getItem("user");
    if (user == null) {
      setOpenDialog(true);
      return;
    }

    if (
      !formData?.destination ||
      !formData?.days ||
      !formData?.budget ||
      !formData?.travelType
    ) {
      toast("Please fill all the fields");
      return;
    } else if (formData?.days <= 0) {
      toast("Please enter a valid number of days");
      return;
    } else if (formData?.days > 5 || formData?.days < 2) {
      toast("Please enter a number of days between 2 and 5");
      return;
    }

    setLoading(true);
    const FINAL_PROMPT = AI_PROMPT.replace(
      "{location}",
      formData?.destination?.label
    )
      .replace("{totalDays}", formData?.days)
      .replace("{traveler}", formData?.travelType)
      .replace("{budget}", formData?.budget)
      .replace("{totalDays}", formData?.days);

    console.log(FINAL_PROMPT);

    const result = await chatSession.sendMessage(FINAL_PROMPT);

    console.log(result?.response?.text());
    setLoading(false);
    saveAiTrip(result?.response?.text());
  };

  const saveAiTrip = async (tripData) => {
    setLoading(true);
    const user = JSON.parse(localStorage.getItem("user"));
    const docId = Date.now().toString();
    await setDoc(doc(db, "AITrips", docId), {
      userChoice: formData,
      tripData: JSON.parse(tripData),
      userEmail: user?.email,
      id: docId,
    });
    setLoading(false);
    navigate(`/view-trip/${docId}`);
  };

  const login = useGoogleLogin({
    onSuccess: (response) => getUserProfile(response),
    onError: (error) => console.log(error),
  });

  const getUserProfile = async (tokenInfo) => {
    axios
      .get(
        `https://www.googleapis.com/oauth2/v1/userinfo?accesstoken=${tokenInfo?.access_token}`,
        {
          headers: {
            Authorization: `Bearer ${tokenInfo?.access_token}`,
            Accept: "Application/json",
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        localStorage.setItem("user", JSON.stringify(res.data));
        setOpenDialog(false);
        onGenerateTrip();
        toast("Login Successful");
      });
  };

  return (
    <div className="px-5 sm:px-10 md:px-20 lg:px-40 xl:px-60 mt-10">
      <h2 className="font-bold text-3xl">
        Tell us your travel preferences 🛩️ 🌍 💶
      </h2>
      <p className="mt-4 text-gray-600 text-xl">
        Just provide some basic information, and our trip planner will generate
        a customized itinerary based on your preferences.
      </p>
      <div className="text-xl mt-10 font-medium space-y-3">
        <div>
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
        <div>
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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-5">
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
        <h2>What's Your Travel Type?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-5">
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
        <Button disabled={loading} onClick={onGenerateTrip}>
          {loading ? (
            <AiOutlineLoading className="w-7 h-7 animate-spin" />
          ) : (
            "Generate Trip"
          )}
        </Button>
      </div>

      <Dialog open={openDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              <img
                className="h-24 mx-auto"
                src="public/TravelMate AI.png"
                alt=""
              />
            </DialogTitle>
            <DialogDescription>
              <h2 className="font-bold text-xl text-gray-800 text-center">
                Sign in with Google
              </h2>
              <p className="mt-5">
                Sign in with Google Authentication securely to continue using
                the App
              </p>
              <Button onClick={login} className="w-full mt-5">
                Sign in
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default CreateTrip;
