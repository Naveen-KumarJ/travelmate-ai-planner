import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import fetchUnsplashPhoto from "../../services/fetchUnsplashPhoto";

const TripHistoryCard = ({ trip }) => {
  const [imageUrl, setImageUrl] = useState("/placeholder.png");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    let didCancel = false;

    const fetchImage = async () => {
      const timer = setTimeout(() => {
        if (!didCancel) {
          setLoading(false);
          setImageUrl("/placeholder.png");
        }
      }, 5000);

      try {
        const url = await fetchUnsplashPhoto(
          `${trip.generatedTripDetails.correctedLocation} place`
        );
        if (!didCancel) {
          clearTimeout(timer);
          if (url) {
            setImageUrl(url);
          } else {
            setImageUrl("/placeholder.png");
          }
          setLoading(false);
        }
      } catch {
        if (!didCancel) {
          clearTimeout(timer);
          setImageUrl("/placeholder.png");
          setLoading(false);
        }
      }
    };

    fetchImage();
    return () => {
      didCancel = true;
    };
  }, [trip?.generatedTripDetails?.correctedLocation]);

  return (
    <Link to={`/view-trip/${trip.tripId}`}>
      <div className="bg-white shadow-lg rounded-xl overflow-hidden hover:scale-[1.03] transition-transform duration-300 cursor-pointer">
        <div className="w-full h-40">
          {loading ? (
            <div className="w-full h-full bg-gray-200 animate-pulse" />
          ) : (
            <img
              src={imageUrl}
              alt={
                trip?.generatedTripDetails?.correctedLocation || "Trip Image"
              }
              className="w-full h-full object-cover"
            />
          )}
        </div>
        <div className="p-4">
          <h3 className="text-lg font-bold text-gray-800">
            {trip?.userInput?.location || "Unknown Location"}
          </h3>
          <p className="text-sm text-gray-600 mt-1">
            {trip?.userInput?.noOfDays} Days trip with{" "}
            <span className="capitalize">{trip?.userInput?.budget}</span> Budget
          </p>
        </div>
      </div>
    </Link>
  );
};

export default TripHistoryCard;
