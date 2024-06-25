import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Spinner from "./Spinner";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "/.netlify/functions";

const BuildingsList = ({ isHome = false }) => {
  const [buildings, setBuildings] = useState([]);
  const [expandedAddresses, setExpandedAddresses] = useState({});
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(isHome ? 3 : 12);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    const fetchBuildings = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/buildings?limit=${visibleCount}&skip=${
            page * visibleCount
          }`
        );
        console.log("API response:", response.data);
        if (response.data && Array.isArray(response.data.buildings)) {
          setBuildings((prevBuildings) => [
            ...prevBuildings,
            ...response.data.buildings,
          ]);
          setTotalCount(response.data.total);
          setHasMore(response.data.buildings.length > 0);
        } else {
          console.error("Expected an array but got:", response.data);
          setBuildings([]);
          setHasMore(false);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching buildings:", error);
        setLoading(false);
      }
    };

    fetchBuildings();
  }, [page, visibleCount, isHome]);

  const loadMoreBuildings = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const toggleAddress = (id) => {
    setExpandedAddresses((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  if (loading) {
    return (
      <div>
        <Spinner loading={loading} />
      </div>
    );
  }

  if (!Array.isArray(buildings)) {
    return <div>Error: Expected buildings to be an array</div>;
  }

  console.log("isHome:", isHome);
  console.log("visibleCount:", visibleCount);
  console.log("buildings.length:", buildings.length);
  console.log("totalCount:", totalCount);

  const buildingsToShow = buildings.slice(0, visibleCount * (page + 1));

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h1 className="mb-6 text-3xl font-bold text-center">
        {isHome ? "Recent Buildings" : "Buildings List"}
      </h1>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {buildingsToShow.map((building) => (
          <div
            key={building._id}
            className="relative bg-white shadow-md rounded-xl"
          >
            <div className="p-4">
              <div className="mb-6">
                <div className="my-2 text-gray-600">
                  Building ID: {building.buildingId}
                </div>
                <h3
                  className="text-xl font-bold cursor-pointer"
                  onClick={() => toggleAddress(building._id)}
                >
                  Street Address:{" "}
                  <span>
                    {expandedAddresses[building._id]
                      ? building.streetAddress
                      : `${building.streetAddress.slice(0, 12)}`}
                    {!expandedAddresses[building._id] &&
                      building.streetAddress.length > 12 && (
                        <span className="text-gray-400">...</span>
                      )}
                  </span>
                </h3>
              </div>
              <div className="mb-5">
                Building Size:{" "}
                {building.buildingSize
                  ? building.buildingSize
                  : "No size information"}
              </div>
              <div className="mb-5">
                Property Use 1st:{" "}
                {building.propertyUse1st ? building.propertyUse1st : "N/A"}
              </div>
              <div className="mb-5">
                Property Use 2nd:{" "}
                {building.propertyUse2nd ? building.propertyUse2nd : "N/A"}
              </div>
              <div className="mb-5">
                Property Use 3rd:{" "}
                {building.propertyUse3rd ? building.propertyUse3rd : "N/A"}
              </div>
              <div className="mb-5">
                Benchmarking Status:{" "}
                {building.benchmarkingStatus
                  ? building.benchmarkingStatus
                  : "N/A"}
              </div>
              <div className="mb-5">
                Current Site EUI:{" "}
                {building.currentSiteEUI ? building.currentSiteEUI : "N/A"}
              </div>
              <div className="mb-5">
                Baseline 2019 EUI:{" "}
                {building.baseline2019EUI ? building.baseline2019EUI : "N/A"}
              </div>
              <div className="mb-5">
                1st Target 2025 EUI:{" "}
                {building.firstTarget2025EUI
                  ? building.firstTarget2025EUI
                  : "N/A"}
              </div>
              <div className="mb-5">
                2nd Target 2027 EUI:{" "}
                {building.secondTarget2027EUI
                  ? building.secondTarget2027EUI
                  : "N/A"}
              </div>
              <div className="mb-5">
                Final Target 2030 EUI:{" "}
                {building.finalTarget2030EUI
                  ? building.finalTarget2030EUI
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
      <div className="flex flex-col items-center justify-center pt-2">
        <div className="flex flex-col items-center justify-center space-y-2 place-items-center">
          {!isHome && buildings.length < totalCount && (
            <div>
              <button
                onClick={loadMoreBuildings}
                className="px-6 py-3 mt-4 text-lg text-white rounded-lg bg-emerald-500 hover:bg-emerald-600"
              >
                Show More Buildings
              </button>
            </div>
          )}
          <div>
            <Link>
              <button
                onClick={scrollToTop}
                className="p-3 mt-4 text-lg text-white rounded-lg md:px-6 md:py-3 md:mt-4 bg-emerald-500 hover:bg-emerald-600"
              >
                Back to Top
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuildingsList;
