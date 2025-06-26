import React from "react";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-100 to-gray-300 flex flex-col justify-center items-center p-4">
      <Link to={"/"}>
        <img
          src="/logo.svg"
          alt="logo - TravelMate AI"
          className="h-[40px] aspect-auto cursor-pointer mb-10"
        />
      </Link>

      <div className="flex flex-col justify-center items-center text-center">
        <div className="relative">
          <h1 className="text-[120px] font-extrabold text-gray-800 leading-none drop-shadow-lg">
            404
          </h1>
          <img
            src="/binocular.svg"
            alt="Binoculars"
            className="w-28 absolute -right-16 top-1/2 -translate-y-1/2 animate-bounce"
          />
        </div>
        <p className="text-xl mt-4 text-gray-700 font-medium">
          Oops! The page you’re looking for doesn’t exist.
        </p>
        <p className="text-gray-500 mt-1">It might have been removed or renamed.</p>

        <Link
          to="/"
          className="mt-8 px-6 py-3 bg-[#6366f1] text-white rounded-xl shadow-md hover:bg-[#4f46e5]transition duration-300 ease-in-out"
        >
          Go back to Home
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
