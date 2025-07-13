import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { db } from "../services/firebase";
import InfoSection from "../components/custom/InfoSection";
import HotelSection from "../components/custom/HotelSection";
import ItinerarySection from "../components/custom/ItinerarySection";
import InfoSectionSkeleton from "../components/custom/Skeletons/InfoSectionSkeleton";
import HotelSectionSkeleton from "../components/custom/Skeletons/HotelSectionSkeleton";
import ItinerarySectionSkeleton from "../components/custom/Skeletons/ItinerarySectionSkeleton";

const ViewTrip = () => {
  const { tripId } = useParams();
  const [tripData, setTripData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTripDetails = async () => {
      try {
        const q = query(
          collection(db, "TravelMate Trips"),
          where("tripId", "==", tripId)
        );
        const querySnapshot = await getDocs(q);
        console.log(querySnapshot);
        if (!querySnapshot.empty) {
          const doc = querySnapshot.docs[0];
          const data = doc.data();
          console.log(data);
          setTripData(data);
        } else {
          toast.error("No trip found with ID: " + tripId);
          navigate("/tripId-not-found");
        }
      } catch (error) {
        toast.error("Error fetching trip data - " + error.message);
      }
    };
    fetchTripDetails();
  }, [tripId]);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
      {!tripData ? (
        <>
          <InfoSectionSkeleton />
          <HotelSectionSkeleton />
          <ItinerarySectionSkeleton />
        </>
      ) : (
        <>
          <InfoSection tripData={tripData} />
          <HotelSection tripData={tripData} />
          <ItinerarySection tripData={tripData} />
        </>
      )}
    </div>
  );
};

export default ViewTrip;
