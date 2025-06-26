import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import fetchUnsplashPhoto from "../../services/fetchUnsplashPhoto";

const HotelInfoCard = ({ hotel }) => {
  const [imageUrl, setImageUrl] = useState("/placeholder.png");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetchUnsplashPhoto(`${hotel.hotelName} hotel`).then((url) => {
      if (url) setImageUrl(url);
      const timer = setTimeout(() => setLoading(false), 5000);
      return () => clearTimeout(timer);
    });
  }, [hotel.hotelName]);

  return (
    <Link
      to={`https://www.google.com/maps/search/?api=1&query=${hotel.hotelName},${hotel.hotelAddress}`}
      target="_blank"
      rel="noopener noreferrer"
    >
      <div className="w-full bg-white shadow-md rounded-2xl overflow-hidden hover:shadow-xl hover:scale-[1.02] transition-all duration-300 ease-in-out cursor-pointer">
  
        {loading ? (
          <div className="w-full h-40 bg-gray-200 animate-pulse" />
        ) : (
          <img
            src={imageUrl}
            alt={hotel?.hotelName}
            className="w-full h-40 object-cover"
          />
        )}

        <div className="p-3 space-y-1">
          <h4 className="text-lg font-bold text-gray-800">{hotel?.hotelName}</h4>
          <p className="text-sm text-gray-600">
            📍 <span className="text-gray-700">{hotel?.hotelAddress}</span>
          </p>
          <p className="text-sm text-gray-600">
            💰 <span className="text-gray-700">{hotel?.price}</span>
          </p>
          <p className="text-sm text-gray-600">
            ⭐{" "}
            <span className="text-red-500 font-semibold">
              {hotel?.rating} stars
            </span>
          </p>
        </div>
      </div>
    </Link>
  );
};

export default HotelInfoCard;
