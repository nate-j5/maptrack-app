import React, { useEffect, useState } from "react";
import CITIES from "../../public/data/cities.json";
import { FaCheck } from "react-icons/fa6";
import { BiParty } from "react-icons/bi";
import { trackEvent } from "../lib/mixpanelService"; // Import trackEvent

function ControlPanel({ onSelectCity, selectedCity }) {
  const [currentCityData, setCurrentCityData] = useState(null);
  const [showThankYouMessage, setShowThankYouMessage] = useState(false);

  useEffect(() => {
    if (selectedCity) {
      const foundCity = CITIES.find((city) => city.city === selectedCity.city);
      setCurrentCityData(foundCity);
      setShowThankYouMessage(false);
    }
  }, [selectedCity]);

  const handleCitySelection = (city) => {
    console.log(`Selected city: ${city.city}`);
    trackEvent("City Selected", { city: city.city }); // Track event here
    onSelectCity(city);
  };

  const handleIndustryVote = (voteType) => {
    trackEvent("Industry Vote", {
      voteType,
      city: currentCityData.city,
    });
    console.log(`Voted: ${voteType}`);
    setShowThankYouMessage(true);
  };

  return (
    <div className="bg-gray-900 bg-opacity-90 p-6 rounded-lg shadow-lg absolute top-4 right-4 z-10">
      <h3 className="text-lg font-semibold text-white">Select City</h3>
      <p className="text-md mt-1 font-light text-gray-400">
        To view location data
      </p>
      <hr className="mt-2 mb-4 border-gray-700" />

      <div className="grid grid-cols-3 gap-4">
        {CITIES.map((city, index) => (
          <div key={`btn-${index}`} className="flex items-center mb-4">
            <input
              type="radio"
              name="city"
              id={`city-${index}`}
              onClick={() => handleCitySelection(city)} // Call function here
              className="mr-2 accent-green-500"
            />
            <label htmlFor={`city-${index}`} className="text-sm text-gray-200">
              {city.city}
            </label>
          </div>
        ))}
      </div>

      {currentCityData && (
        <div className="mt-6 p-4 bg-gray-800 rounded-md">
          <h4 className="text-lg font-normal text-white">
            {currentCityData.city}
          </h4>
          <p className="text-gray-400 text-sm font-light mt-2">
            Population:{" "}
            <span className="text-white ml-1 text-base">
              {currentCityData.population}
            </span>
          </p>

          <h5 className="text-sm font-light text-white mt-3 mb-4">
            Largest Industries:
          </h5>
          <ul className="text-gray-200 space-y-2">
            {currentCityData.industries.map((industry, index) => (
              <li
                key={index}
                className="flex justify-between items-center bg-gray-700 p-2 rounded-md"
              >
                <div>
                  <span className="text-sm font-light">{`${index + 1}.`}</span>
                  <span className="text-gray-300 text-sm font-light ml-2">
                    {industry.name}
                  </span>
                </div>
                <span className="text-gray text-sm font-light">
                  {industry.percentage}%
                </span>
              </li>
            ))}
          </ul>

          <div className="mt-4 flex space-x-2">
            <button
              className="flex-1 px-4 py-4 bg-lime-800 text-white rounded hover:bg-lime-700 transition duration-200 flex items-center justify-center"
              onClick={() => handleIndustryVote("Surprising")}
            >
              <BiParty className="mr-2" />
              Surprising
            </button>
            <button
              className="flex-1 px-4 py-4 bg-slate-900 text-white rounded  hover:bg-slate-800 transition duration-200 flex items-center justify-center whitespace-nowrap"
              onClick={() => handleIndustryVote("Not Surprising")}
            >
              <FaCheck className="mr-2" />
              Not Surprising
            </button>
          </div>

          {showThankYouMessage && (
            <div className="mt-2 text-green-400">
              <p className="mt-4 mb-1 text-sm">Vote Received!</p>
              <p className="text-sm text-white font-light">
                View details in the{" "}
                <a
                  href="https://mixpanel.com/public/MJPKgaGaHdP8GKRCikSZwd"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sky-100 underline font-light hover:text-slate-300"
                >
                  analytics dashboard!
                </a>
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default React.memo(ControlPanel);
