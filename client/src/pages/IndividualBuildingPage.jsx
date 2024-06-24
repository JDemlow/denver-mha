import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "axios";
import Spinner from "../components/Spinner";

const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || "/.netlify/functions";

const IndividualBuildingPage = () => {
  const { id } = useParams();
  const [building, setBuilding] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBuilding = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/getBuildingById?id=${id}`
        );
        setBuilding(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching building:", error);
        setLoading(false);
      }
    };

    fetchBuilding();
  }, [id]);

  if (loading) {
    return <Spinner loading={loading} />;
  }

  if (!building) {
    return <div>No building found</div>;
  }

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h1 className="mb-6 text-3xl font-bold text-center">
        {building.streetAddress}
      </h1>
      <div className="p-4 bg-white shadow-md rounded-xl">
        <div className="mb-4">
          <strong>Building ID:</strong> {building.buildingId}
        </div>
        <div className="mb-4">
          <strong>Street Address:</strong> {building.streetAddress}
        </div>
        <div className="mb-4">
          <strong>Building Size:</strong> {building.buildingSize}
        </div>
        <div className="mb-4">
          <strong>Property Use 1st:</strong> {building.propertyUse1st}
        </div>
        <div className="mb-4">
          <strong>Property Use 2nd:</strong> {building.propertyUse2nd}
        </div>
        <div className="mb-4">
          <strong>Property Use 3rd:</strong> {building.propertyUse3rd}
        </div>
        <div className="mb-4">
          <strong>Benchmarking Status:</strong> {building.benchmarkingStatus}
        </div>
        <div className="mb-4">
          <strong>Current Site EUI:</strong> {building.currentSiteEUI}
        </div>
        <div className="mb-4">
          <strong>Baseline 2019 EUI:</strong> {building.baseline2019EUI}
        </div>
        <div className="mb-4">
          <strong>1st Target 2025 EUI:</strong> {building.firstTarget2025EUI}
        </div>
        <div className="mb-4">
          <strong>2nd Target 2027 EUI:</strong> {building.secondTarget2027EUI}
        </div>
        <div className="mb-4">
          <strong>Final Target 2030 EUI:</strong> {building.finalTarget2030EUI}
        </div>
      </div>
      <div className="flex justify-center pt-10 align-center">
        <Link to={`/edit-building/${building._id}`}>
          <button className="px-6 py-3 mt-4 text-lg text-white rounded-lg sm:px-40 bg-emerald-500 hover:bg-emerald-600">
            Edit This Building
          </button>
        </Link>
      </div>
    </div>
  );
};

export default IndividualBuildingPage;
