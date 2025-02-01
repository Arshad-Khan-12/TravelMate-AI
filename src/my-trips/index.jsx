import { db } from "@/service/firebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
// import { use } from "react";
import { useNavigate } from "react-router-dom";
import MyTripCard from "./MyTripCard";

function MyTrips() {
  const [trips, setTrips] = useState([]);
  useEffect(() => {
    GetUserTrips();
  }, []);

  const navigation = useNavigate();
  const GetUserTrips = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      navigation("/");
      return;
    }

    const q = query(
      collection(db, "AITrips"),
      where("userEmail", "==", user?.email)
    );
    const querySnapshot = await getDocs(q);
    setTrips([]);
    querySnapshot.forEach((doc) => {
      //   console.log(doc.id, " => ", doc.data());
      setTrips((prev) => [...prev, doc.data()]);
      // console.log(trips);
    });
  };
  return (
    <div className="sm:px-10 md:px-32 lg:px-64 xl:px-80 2xl:px-96 px-5 py-6">
      <h2 className="font-bold text-2xl text-gray-800">My Trips</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
        {trips.map((trip, index) => (
          <MyTripCard key={index} trip={trip} index={index} />
        ))}
      </div>
    </div>
  );
}

export default MyTrips;
