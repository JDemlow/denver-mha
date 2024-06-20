import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const BuildingsList = ({ isHome = false }) => {
  const [buildings, setBuildings] = useState([]);
  const [expandedAddresses, setExpandedAddresses] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBuildings = async () => {
      try {
        const response = await axios.get("/api/buildings");
        setBuildings(isHome ? response.data.slice(0, 3) : response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching buildings:", error);
        setLoading(false);
      }
    };

    fetchBuildings();
  }, [isHome]);

  const toggleAddress = (id) => {
    setExpandedAddresses((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h1 className="mb-6 text-3xl font-bold text-center">
        {isHome ? "Recent Buildings" : "Buildings List"}
      </h1>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {buildings.map((building) => (
          <div
            key={building._id}
            className="relative bg-white shadow-md rounded-xl"
          >
            <div className="p-4">
              <div className="mb-6">
                <div className="my-2 text-gray-600">
                  Building ID: {building["Building ID:"]}
                </div>
                <h3
                  className="text-xl font-bold cursor-pointer"
                  onClick={() => toggleAddress(building._id)}
                >
                  Street Address:{" "}
                  <span>
                    {expandedAddresses[building._id]
                      ? building["Street Address:"]
                      : `${building["Street Address:"].slice(0, 12)}`}
                    {!expandedAddresses[building._id] &&
                      building["Street Address:"].length > 12 && (
                        <span className="text-gray-400">...</span>
                      )}
                  </span>
                </h3>
              </div>
              <div className="mb-5">
                Building Size:{" "}
                {building["Building Size:"]
                  ? building["Building Size:"]
                  : "No size information"}
              </div>
              <div className="mb-5">
                Property Use 1st:{" "}
                {building["Property Use 1st:"]
                  ? building["Property Use 1st:"]
                  : "N/A"}
              </div>
              <div className="mb-5">
                Property Use 2nd:{" "}
                {building["Property Use 2nd:"]
                  ? building["Property Use 2nd:"]
                  : "N/A"}
              </div>
              <div className="mb-5">
                Property Use 3rd:{" "}
                {building["Property Use 3rd:"]
                  ? building["Property Use 3rd:"]
                  : "N/A"}
              </div>
              <div className="mb-5">
                Benchmarking Status:{" "}
                {building["Benchmarking Status:"]
                  ? building["Benchmarking Status:"]
                  : "N/A"}
              </div>
              <div className="mb-5">
                Current Site EUI:{" "}
                {building["Current Site EUI:"]
                  ? building["Current Site EUI:"]
                  : "N/A"}
              </div>
              <div className="mb-5">
                Baseline 2019 EUI:{" "}
                {building["Baseline 2019 EUI:"]
                  ? building["Baseline 2019 EUI:"]
                  : "N/A"}
              </div>
              <div className="mb-5">
                1st Target 2025 EUI:{" "}
                {building["1st Target 2025 EUI:"]
                  ? building["1st Target 2025 EUI:"]
                  : "N/A"}
              </div>
              <div className="mb-5">
                2nd Target 2027 EUI:{" "}
                {building["2nd Target 2027 EUI:"]
                  ? building["2nd Target 2027 EUI:"]
                  : "N/A"}
              </div>
              <div className="mb-5">
                Final Target 2030 EUI:{" "}
                {building["Final Target 2030 EUI:"]
                  ? building["Final Target 2030 EUI:"]
                  : "N/A"}
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
    </div>
  );
};

export default BuildingsList;
