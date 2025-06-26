import { FaShareFromSquare } from "react-icons/fa6";
import fetchUnsplashPhoto from "../../services/fetchUnsplashPhoto";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const InfoSection = ({ tripData }) => {
  const [imageUrl, setImageUrl] = useState("/placeholder.png");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!tripData?.generatedTripDetails?.correctedLocation) return;

    setLoading(true);
    fetchUnsplashPhoto(`${tripData.generatedTripDetails.correctedLocation} place`).then((url) => {
      if (url) setImageUrl(url);
      const timer = setTimeout(() => setLoading(false), 3000);
      return () => clearTimeout(timer);
    });
  }, [tripData?.generatedTripDetails?.correctedLocation]);

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: `${tripData?.generatedTripDetails?.correctedLocation}`,
          text: `${tripData?.generatedTripDetails?.correctedLocation} - ${tripData?.userInput?.noOfDays} Days - ${tripData?.userInput?.budget} Budget - ${tripData?.userInput?.traveller}`,
          url: window.location.href,
        })
        .then(() => console.log("Shared Successfully!"))
        .catch((error) => console.error(error.message));
    } else {
      toast.error("Sharing not supported in this browser.");
    }
  };

  return (
    <section className="w-full">
      {loading ? (
        <div className="w-full h-[240px] sm:h-[340px] bg-gray-200 animate-pulse rounded-xl" />
      ) : (
        <img
          src={imageUrl}
          alt="Trip Visual"
          className="w-full h-[240px] sm:h-[340px] object-cover rounded-xl"
        />
      )}

      <div className="mt-4 px-2 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0">
        <div>
          <h2 className="font-bold text-2xl sm:text-3xl">
            {tripData?.generatedTripDetails?.correctedLocation}
          </h2>
          <div className="mt-2 flex flex-wrap gap-2">
            <span className="bg-slate-200 px-4 py-1 rounded-md text-neutral-700 text-sm sm:text-base">
              📅 {tripData?.userInput?.noOfDays} Days
            </span>
            <span className="bg-slate-200 px-4 py-1 rounded-md text-neutral-700 text-sm sm:text-base">
              💸 {tripData?.userInput?.budget} Budget
            </span>
            <span className="bg-slate-200 px-4 py-1 rounded-md text-neutral-700 text-sm sm:text-base">
              🧑‍🤝‍🧑 Travellers: {tripData?.userInput?.traveller}
            </span>
          </div>
        </div>

        <FaShareFromSquare
          onClick={handleShare}
          className="text-xl sm:text-2xl cursor-pointer hover:text-green-700 self-end sm:self-center"
        />
      </div>
    </section>
  );
};

export default InfoSection;
