import React from "react";
import { cropTips } from "./CropTipsData";

const CropTips = ({ crop }) => {
  console.log("Crop received in CropDetails:", crop);

  if (!crop || typeof crop !== "string") {
    return (
      <div className="mt-6 p-5 bg-yellow-50 border-l-4 border-yellow-400 text-yellow-700 rounded-lg shadow-sm">
        🚫 No details available – invalid crop name.
      </div>
    );
  }

  const normalizedCrop = crop.split("(")[0].trim().toLowerCase();
  const tips = cropTips[normalizedCrop];

  if (!tips) {
    return (
      <div className="mt-6 p-5 bg-yellow-50 border-l-4 border-yellow-400 text-yellow-700 rounded-lg shadow-sm">
        📋 No tips available for this crop.
      </div>
    );
  }

  return (
    <div className="mt-10 bg-green-50 rounded-2xl shadow-lg p-8 border border-green-200">
      <h2 className="text-3xl font-extrabold text-green-800 mb-8 text-center tracking-wide">
        🌿 Tips & Best Practices
      </h2>

      <div className="space-y-6">
        {/* Farming Tips */}
        <div className="bg-white p-6 rounded-xl shadow-md border border-green-100">
          
          <ul className="list-disc pl-6 space-y-3 text-gray-700 text-lg leading-relaxed">
            <li>
              <span className="font-semibold">Weather Handling:</span>{" "}
              {tips.weather}
            </li>
            <li>
              <span className="font-semibold">Irrigation:</span>{" "}
              {tips.irrigation}
            </li>
            <li>
              <span className="font-semibold">Fertilizer Management:</span>{" "}
              {tips.fertilizer}
            </li>
            <li>
              <span className="font-semibold">Pest & Disease Management:</span>{" "}
              {tips.pest}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CropTips;
