import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaMapMarker } from "react-icons/fa";
import axios from "axios";
import Spinner from "./Spinner";

const BuildingsList = ({ isHome }) => {
  const [buildings, setBuildings] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBuildings = async () => {
      try {
        const response = await axios.get("/api/buildings");
        let buildingsData = response.data;
        if (isHome) {
          buildingsData = buildingsData.slice(0, 3); // Only take the first 3 buildings
        }
        // Initialize each building with expanded: false
        buildingsData = buildingsData.map((building) => ({
          ...building,
          expanded: false,
        }));
        setBuildings(buildingsData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false); // Set loading to false after data is fetched
      }
    };

    fetchBuildings();
  }, [isHome]);

  const toggleDescription = (index) => {
    setBuildings((prevBuildings) =>
      prevBuildings.map((building, i) =>
        i === index ? { ...building, expanded: !building.expanded } : building
      )
    );
  };

  if (loading) {
    return <Spinner loading={loading} />; // Display spinner while loading
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

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
                  : `${building.description.substring(0, 80)}...`}
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
              <div className="flex justify-left">
                <Link to={`/buildings/${building._id}`}>
                  <button className="px-6 py-3 mt-4 text-lg text-white rounded-lg bg-emerald-500 hover:bg-emerald-600">
                    Show Building
                  </button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center pt-10 align-center">
        <Link to="/">
          <button className="px-6 py-3 mt-4 text-lg text-white rounded-lg sm:px-40 bg-emerald-500 hover:bg-emerald-600">
            Add A New Building
          </button>
        </Link>
      </div>
    </div>
  );
};

export default BuildingsList;
