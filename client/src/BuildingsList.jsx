import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaMapMarker } from "react-icons/fa";

const BuildingsList = () => {
  const [buildings, setBuildings] = useState([]);

  useEffect(() => {
    const fetchBuildings = async () => {
      try {
        const response = await axios.get("/api/buildings");
        if (Array.isArray(response.data)) {
          setBuildings(
            response.data.map((building) => ({ ...building, expanded: false }))
          );
        } else {
          console.error("Unexpected response data:", response.data);
        }
      } catch (error) {
        console.error("Error fetching buildings:", error);
      }
    };

    fetchBuildings();
  }, []);

  const toggleDescription = (index) => {
    setBuildings(
      buildings.map((building, i) =>
        i === index ? { ...building, expanded: !building.expanded } : building
      )
    );
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h1 className="mb-6 text-3xl font-bold text-center">Buildings List</h1>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {buildings.map((building, index) => (
          <div
            key={building._id}
            className="relative bg-white shadow-md rounded-xl"
          >
            <div className="p-4">
              <div className="mb-6">
                <div className="my-2 text-gray-600">{building.type}</div>
                <h3 className="text-xl font-bold">{building.buildingName}</h3>
              </div>
              <div className="mb-5">
                {building.expanded
                  ? building.description
                  : `${building.description.substring(0, 90)}...`}
              </div>
              <button
                onClick={() => toggleDescription(index)}
                className="mb-5 text-emerald-500 hover:text-emerald-600"
              >
                {building.expanded ? "Show less" : "Show more"}
              </button>
              <h3 className="mb-2 text-emerald-500">{building.rent}</h3>
              <div className="mb-5 border border-gray-100"></div>
              <div className="flex flex-col justify-between mb-4 lg:flex-row">
                <div className="mb-3 text-orange-700">
                  <FaMapMarker className="inline mb-1 mr-2 text-lg" />
                  {building.location}
                </div>
              </div>
              <div className="flex justify-center">
                <button className="px-6 py-3 mt-4 text-lg text-white rounded-lg bg-emerald-500 hover:bg-emerald-600">
                  Show Building
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BuildingsList;
