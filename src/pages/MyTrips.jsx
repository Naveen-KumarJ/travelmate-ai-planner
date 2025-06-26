import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { db } from "../services/firebase";
import { useAuth } from "../context/AuthContext";
import TripHistoryCard from "../components/custom/TripHistoryCard";

const MyTrips = () => {
  const { user } = useAuth();
  const [userTrips, setUserTrips] = useState([]);

  useEffect(() => {
    const fetchCurrentUserTrips = async () => {
      if (!user?.email) return;

      try {
        const q = query(
          collection(db, "TravelMate Trips"),
          where("userEmail", "==", user.email)
        );
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const trips = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setUserTrips(trips);
        } else {
          toast.message("No trips found for user.");
        }
      } catch (error) {
        toast.error("Error fetching trip data - " + error.message);
      }
    };

    fetchCurrentUserTrips();
  }, [user]);

  return (
    <section className="max-w-6xl mx-auto px-4 py-6">
      <h2 className="font-bold text-3xl mb-6">My Trips</h2>
      {userTrips.length === 0 ? (
        <p className="text-gray-500">No trips found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {userTrips.map((trip, idx) => (
            <TripHistoryCard key={idx} trip={trip} />
          ))}
        </div>
      )}
    </section>
  );
};

export default MyTrips;
