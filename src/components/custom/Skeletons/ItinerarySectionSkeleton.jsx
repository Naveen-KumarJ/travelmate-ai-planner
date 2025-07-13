const ItinerarySectionSkeleton = () => {
  return (
    <section className="mt-8 px-4">
      <div className="w-72 h-6 bg-gray-200 animate-pulse rounded-md mb-6" />
      {[1, 2].map((day) => (
        <div key={day} className="mb-10 pt-4 border-t-2 border-gray-300">
          <div className="w-32 h-5 bg-gray-200 animate-pulse mb-4 rounded" />
          <div className="flex flex-wrap gap-6">
            {[1, 2, 3].map((_, i) => (
              <div
                key={i}
                className="w-60 h-40 bg-gray-200 animate-pulse rounded-md"
              />
            ))}
          </div>
        </div>
      ))}
    </section>
  );
};

export default ItinerarySectionSkeleton;
