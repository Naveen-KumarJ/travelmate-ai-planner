const HotelSectionSkeleton = () => {
  return (
    <section className="mt-10 px-4 sm:px-2">
      <div className="w-60 h-6 bg-gray-200 animate-pulse rounded-md mb-4" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((_, i) => (
          <div key={i} className="h-64 bg-gray-200 animate-pulse rounded-md" />
        ))}
      </div>
    </section>
  );
};

export default HotelSectionSkeleton;
