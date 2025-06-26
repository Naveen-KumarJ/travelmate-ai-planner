import React from "react";

const CardOption = ({ option, selected, onClick }) => {
  return (
    <div
      className={`p-4 border rounded-lg cursor-pointer hover:shadow-lg ${
        selected ? "shadow:lg border-2 border-black" : ""
      }`}
      onClick={onClick}
    >
      <h2 className="text-4xl">{option.icon}</h2>
      <h2 className="font-bold text-lg">{option.title}</h2>
      <h2 className="text-sm text-gray-500">{option.desc}</h2>
    </div>
  );
};

export default CardOption;
