import { Input } from "@/components/ui/input";
import { Button } from "../components/ui/button";
import { toast } from "sonner";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { BudgetOptions, SelectTravelsList } from "../travelOptions";
import CardOption from "../components/custom/CardOption";
import { useState } from "react";
import { getTripPlan } from "../services/gemini";
import { v4 as uuidv4 } from "uuid";
import { useAuth } from "../context/AuthContext";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import { db } from "../services/firebase";
import { useNavigate } from "react-router-dom";

const CreateTrip = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState({});
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleInputChange = (name, value) => {
    setData({ ...data, [name]: value });
  };

  const generateTrip = async () => {
    setIsLoading(true);

    if (data?.noOfDays > 14 || data?.noOfDays < 1) {
      toast.error("Please enter number of days between 1 and 14.");
      setIsLoading(false);
      return;
    }

    if (
      !data?.location ||
      !data?.noOfDays ||
      !data?.budget ||
      !data?.traveller
    ) {
      toast.error("Please fill all the fields before generating the trip.");
      setIsLoading(false);
      return;
    }

    const toastId = toast.loading("Generating trip, please wait...");
    try {
      const trip = await getTripPlan(data);
      const tripId = uuidv4().slice(12);

      const tripDataToSave = {
        userEmail: user.email,
        tripId,
        userInput: data,
        generatedTripDetails: trip,
        createdAt: Timestamp.now(),
      };

      await addDoc(collection(db, "TravelMate Trips"), tripDataToSave);
      toast.success("Trip generated successfully!", { id: toastId });
      navigate(`/view-trip/${tripId}`);
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Failed to generate trip. Try again.", {
        id: toastId,
      });
    }

    setIsLoading(false);
    setData({});
  };

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 mt-10">
      <h2 className="font-bold text-2xl sm:text-3xl text-center sm:text-left">
        Tell us your travel preferences 🏕️🍹
      </h2>
      <p className="mt-3 text-gray-500 text-base sm:text-lg text-center sm:text-left">
        Just provide some basic information, and our trip planner will generate
        a customized itinerary based on your preferences.
      </p>

      <div className="mt-12 flex flex-col gap-8">
        <div>
          <h3 className="text-lg sm:text-xl my-3 font-medium">
            What is your destination of choice?
          </h3>
          <Input
            type="text"
            placeholder="Enter a location - Thanjavur, Tamil Nadu, India"
            value={data.location || ""}
            onChange={(e) => handleInputChange("location", e.target.value)}
          />
        </div>

        <div>
          <h3 className="text-lg sm:text-xl my-3 font-medium">
            How many days are you planning your trip?
          </h3>
          <Input
            type="number"
            placeholder="Ex: 3"
            value={data.noOfDays || ""}
            onChange={(e) => handleInputChange("noOfDays", e.target.value)}
            onWheel={(e) => e.target.blur()}
            min={1}
            max={14}
          />
        </div>

        <div>
          <h3 className="text-lg sm:text-xl my-3 font-medium">
            What is your budget?
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {BudgetOptions.map((option, idx) => (
              <CardOption
                key={idx}
                option={option}
                selected={data.budget === option.budgetLevel}
                onClick={() => handleInputChange("budget", option.budgetLevel)}
              />
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg sm:text-xl my-3 font-medium">
            Who do you plan on traveling with?
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {SelectTravelsList.map((option, idx) => (
              <CardOption
                key={idx}
                option={option}
                selected={data.traveller === option.people}
                onClick={() => handleInputChange("traveller", option.people)}
              />
            ))}
          </div>
        </div>

        <div className="flex justify-center sm:justify-end mt-6">
          <Button
            disabled={isLoading}
            onClick={generateTrip}
            className="cursor-pointer w-full sm:w-auto px-6 py-2 flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white  rounded-md"
          >
            {isLoading ? (
              <>
                <AiOutlineLoading3Quarters className="animate-spin" />
                Generating...
              </>
            ) : (
              "Generate Trip"
            )}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CreateTrip;
