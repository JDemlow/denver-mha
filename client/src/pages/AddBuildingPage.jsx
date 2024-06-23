import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddBuildingPage = () => {
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
  const navigate = useNavigate();

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
      const response = await axios.post("/api/buildings", building);
      console.log("Building added:", response.data);
      toast.success("Building Added Successfully!");
      navigate("/all-buildings");
    } catch (error) {
      console.error("Error adding building:", error);
      toast.error("Failed to add building. Please try again.");
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h1 className="mb-6 text-3xl font-bold text-center">Add Building</h1>
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
          Add Building
        </button>
      </form>
    </div>
  );
};

export default AddBuildingPage;
