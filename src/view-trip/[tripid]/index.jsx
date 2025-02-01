// import React from "react";

import { db } from "@/service/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import Information from "../components/Information";
import Hotels from "../components/Hotels";
import PlacesToVisit from "../components/PlacesToVisit";
import Footer from "../components/Footer";
// import { Hotel } from "lucide-react";

function ViewTrip() {
  const { tripId } = useParams();
  const [trip, setTrip] = useState([]);
  useEffect(() => {
    tripId && GetTripData();
  }, [tripId]);
  const GetTripData = async () => {
    const docRef = doc(db, "AITrips", tripId);

    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      // console.log("Document data:", docSnap.data());
      setTrip(docSnap.data());
    } else {
      // doc.data() will be undefined in this case
      // console.log("No such document!");
      toast("No Trips Found");
    }
  };
  return (
    <div className="p-10 md:px-20 lg:px-44 xl:px-56  ">
      <Information trip={trip} />
      <Hotels trip={trip} />
      <PlacesToVisit trip={trip} />
      <Footer />
    </div>
  );
}

export default ViewTrip;
