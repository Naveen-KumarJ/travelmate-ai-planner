import PlaceInfoCard from "./PlaceInfoCard";

const ItinerarySection = ({ tripData }) => {
  const itinerary = tripData?.generatedTripDetails?.itinerary || {};

  return (
    <section className="mt-8 px-4">
      <h2 className="text-xl font-bold text-gray-800 mb-6">
        Itinerary - Places to Visit
      </h2>

      {Object.keys(itinerary).length > 0 ? (
        Object.entries(itinerary).map(([dayKey, plan], idx) => (
          <div
            key={dayKey}
            className={`mb-10 ${
              idx > 0 ? "border-t-2 border-gray-500 " : ""
            }pt-4 `}
          >
            <h3 className="font-bold  text-indigo-700 mb-4 text-lg">
              📅 Day {idx + 1}
            </h3>
            <div className="flex flex-wrap gap-6 md:gap-6">
              {plan?.morning && (
                <PlaceInfoCard title="Morning" data={plan.morning} />
              )}
              {plan?.afternoon && (
                <PlaceInfoCard title="Afternoon" data={plan.afternoon} />
              )}
              {plan?.evening && (
                <PlaceInfoCard title="Evening" data={plan.evening} />
              )}
            </div>
          </div>
        ))
      ) : (
        <p className="text-gray-500">No itinerary data available.</p>
      )}
    </section>
  );
};

export default ItinerarySection;
