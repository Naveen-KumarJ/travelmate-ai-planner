import React from "react";
import HotelInfoCard from "./HotelInfoCard";

const HotelSection = ({ tripData }) => {
  return (
    <section className="mt-10 px-4 sm:px-2">
      <h2 className="font-bold text-2xl mb-4">Hotel Recommendations 🏨</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {!tripData ? (
          <div className="col-span-full text-gray-500">Loading hotels...</div>
        ) : tripData?.generatedTripDetails?.hotels?.length > 0 ? (
          tripData.generatedTripDetails.hotels.map((hotel, idx) => (
            <HotelInfoCard key={idx} hotel={hotel} />
          ))
        ) : (
          <div className="col-span-full text-gray-500">
            No hotel data available.
          </div>
        )}
      </div>
    </section>
  );
};

export default HotelSection;
