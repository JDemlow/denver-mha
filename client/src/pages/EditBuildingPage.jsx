import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EditBuildingPage = () => {
  const { id } = useParams();
  const [building, setBuilding] = useState({
    buildingId: "",
    streetAddress: "",
    buildingSize: "",
    propertyUse1st: "",
    propertyUse2nd: "",
    propertyUse3rd: "",
    benchmarkingStatus: "",
    currentSiteEUI: "",
    baseline2019EUI: "",
    firstTarget2025EUI: "",
    secondTarget2027EUI: "",
    finalTarget2030EUI: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBuilding = async () => {
      try {
        const response = await axios.get(`/api/buildings/${id}`);
        const fetchedBuilding = response.data;
        setBuilding({
          buildingId: fetchedBuilding["Building ID:"],
          streetAddress: fetchedBuilding["Street Address:"],
          buildingSize: fetchedBuilding["Building Size:"],
          propertyUse1st: fetchedBuilding["Property Use 1st:"],
          propertyUse2nd: fetchedBuilding["Property Use 2nd:"],
          propertyUse3rd: fetchedBuilding["Property Use 3rd:"],
          benchmarkingStatus: fetchedBuilding["Benchmarking Status:"],
          currentSiteEUI: fetchedBuilding["Current Site EUI:"],
          baseline2019EUI: fetchedBuilding["Baseline 2019 EUI:"],
          firstTarget2025EUI: fetchedBuilding["1st Target 2025 EUI:"],
          secondTarget2027EUI: fetchedBuilding["2nd Target 2027 EUI:"],
          finalTarget2030EUI: fetchedBuilding["Final Target 2030 EUI:"],
        });
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchBuilding();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBuilding({
      ...building,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedBuilding = {
        "Building ID:": building.buildingId,
        "Street Address:": building.streetAddress,
        "Building Size:": building.buildingSize,
        "Property Use 1st:": building.propertyUse1st,
        "Property Use 2nd:": building.propertyUse2nd,
        "Property Use 3rd:": building.propertyUse3rd,
        "Benchmarking Status:": building.benchmarkingStatus,
        "Current Site EUI:": building.currentSiteEUI,
        "Baseline 2019 EUI:": building.baseline2019EUI,
        "1st Target 2025 EUI:": building.firstTarget2025EUI,
        "2nd Target 2027 EUI:": building.secondTarget2027EUI,
        "Final Target 2030 EUI:": building.finalTarget2030EUI,
      };

      const response = await axios.patch(
        `/api/buildings/${id}`,
        updatedBuilding
      );
      console.log("Building updated:", response.data);
      navigate(`/buildings/${id}`);
    } catch (error) {
      console.error("Error updating building:", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h1 className="mb-6 text-3xl font-bold text-center">Edit Building</h1>
      <form
        onSubmit={handleSubmit}
        className="p-4 bg-white shadow-md rounded-xl"
      >
        <input
          type="text"
          name="buildingId"
          placeholder="Building ID"
          value={building.buildingId}
          onChange={handleChange}
          required
          className="block w-full p-2 mb-4 border rounded"
        />
        <input
          type="text"
          name="streetAddress"
          placeholder="Street Address"
          value={building.streetAddress}
          onChange={handleChange}
          required
          className="block w-full p-2 mb-4 border rounded"
        />
        <input
          type="text"
          name="buildingSize"
          placeholder="Building Size"
          value={building.buildingSize}
          onChange={handleChange}
          required
          className="block w-full p-2 mb-4 border rounded"
        />
        <input
          type="text"
          name="propertyUse1st"
          placeholder="Primary Use"
          value={building.propertyUse1st}
          onChange={handleChange}
          required
          className="block w-full p-2 mb-4 border rounded"
        />
        <input
          type="text"
          name="propertyUse2nd"
          placeholder="Secondary Use"
          value={building.propertyUse2nd}
          onChange={handleChange}
          required
          className="block w-full p-2 mb-4 border rounded"
        />
        <input
          type="text"
          name="propertyUse3rd"
          placeholder="Tertiary Use"
          value={building.propertyUse3rd}
          onChange={handleChange}
          required
          className="block w-full p-2 mb-4 border rounded"
        />
        <input
          type="text"
          name="benchmarkingStatus"
          placeholder="Benchmarking Status"
          value={building.benchmarkingStatus}
          onChange={handleChange}
          required
          className="block w-full p-2 mb-4 border rounded"
        />
        <input
          type="text"
          name="currentSiteEUI"
          placeholder="Current Site EUI"
          value={building.currentSiteEUI}
          onChange={handleChange}
          required
          className="block w-full p-2 mb-4 border rounded"
        />
        <input
          type="text"
          name="baseline2019EUI"
          placeholder="Baseline 2019 EUI"
          value={building.baseline2019EUI}
          onChange={handleChange}
          required
          className="block w-full p-2 mb-4 border rounded"
        />
        <input
          type="text"
          name="firstTarget2025EUI"
          placeholder="First Target 2025 EUI"
          value={building.firstTarget2025EUI}
          onChange={handleChange}
          required
          className="block w-full p-2 mb-4 border rounded"
        />
        <input
          type="text"
          name="secondTarget2027EUI"
          placeholder="Second Target 2027 EUI"
          value={building.secondTarget2027EUI}
          onChange={handleChange}
          required
          className="block w-full p-2 mb-4 border rounded"
        />
        <input
          type="text"
          name="finalTarget2030EUI"
          placeholder="Final Target 2030 EUI"
          value={building.finalTarget2030EUI}
          onChange={handleChange}
          required
          className="block w-full p-2 mb-4 border rounded"
        />
        <button
          type="submit"
          className="px-6 py-3 mt-4 text-lg text-white rounded-lg bg-emerald-500 hover:bg-emerald-600"
        >
          Update Building
        </button>
      </form>
    </div>
  );
};

export default EditBuildingPage;
