const InfoSectionSkeleton = () => {
  return (
    <div className="w-full">
      <div className="w-full h-[240px] sm:h-[340px] bg-gray-200 animate-pulse rounded-xl" />
      <div className="mt-4 px-2 flex justify-between items-center">
        <div className="space-y-2">
          <div className="w-40 h-6 bg-gray-200 animate-pulse rounded-md" />
          <div className="flex gap-2">
            <div className="w-20 h-6 bg-gray-200 animate-pulse rounded-md" />
            <div className="w-24 h-6 bg-gray-200 animate-pulse rounded-md" />
            <div className="w-28 h-6 bg-gray-200 animate-pulse rounded-md" />
          </div>
        </div>
        <div className="w-8 h-8 bg-gray-200 animate-pulse rounded-full" />
      </div>
    </div>
  );
};

export default InfoSectionSkeleton;
