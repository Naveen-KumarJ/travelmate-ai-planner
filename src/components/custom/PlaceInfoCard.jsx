import { useEffect, useState } from "react";
import fetchUnsplashPhoto from "../../services/fetchUnsplashPhoto";

const PlaceInfoCard = ({ title, data }) => {
  const [imageUrl, setImageUrl] = useState("/placeholder.png");
  const [loading, setLoading] = useState(true);

  if (!data) return null;

  useEffect(() => {
    setLoading(true);
    fetchUnsplashPhoto(`${data.placeName} tourist spot`).then((url) => {
      if (url) setImageUrl(url);
      const timer = setTimeout(() => setLoading(false), 5000);
      return () => clearTimeout(timer);
    });
  }, [data.placeName]);

  const mapLink = `https://www.google.com/maps/search/?api=1&query=${data.placeName}, ${data.address}`;

  return (
    <div className="w-full sm:w-[48%] lg:w-[32%]">
      {loading ? (
        <div className="w-full bg-gray-200 animate-pulse h-[260px] rounded-2xl"></div>
      ) : (
        <>
          <p className="mb-2 text-orange-500 font-semibold text-sm underline">
            {title}
          </p>
          <a
            href={mapLink}
            target="_blank"
            rel="noopener noreferrer"
            className="block"
          >
            <div className="bg-white shadow-lg rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300 cursor-pointer">
              <img
                src={imageUrl}
                alt={data.placeName}
                className="w-full h-[180px] sm:h-[160px] object-cover"
              />
              <div className="p-4 space-y-2">
                <h4 className="text-lg font-bold text-indigo-800">
                  {data.placeName}
                </h4>
                <p className="text-sm text-gray-600">{data.placeDetails}</p>

                <div className="text-sm text-gray-700 space-y-1 pt-2">
                  <p>🕒 {data.startTime} - {data.endTime || "N/A"}</p>
                  {data.ticketPricing && <p>🎟️ {data.ticketPricing}</p>}
                  {data.nextSuggestedAction && (
                    <p className="italic text-gray-500">
                      👉 {data.nextSuggestedAction}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </a>
        </>
      )}
    </div>
  );
};

export default PlaceInfoCard;
