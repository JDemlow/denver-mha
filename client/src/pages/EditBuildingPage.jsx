import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Spinner from "../components/Spinner";

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
        setBuilding(response.data);
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
      const response = await axios.patch(`/api/buildings/${id}`, building);
      console.log("Building updated:", response.data);
      navigate(`/buildings/${id}`);
    } catch (error) {
      console.error("Error updating building:", error);
    }
  };

  if (loading) {
    return (
      <div>
        <Spinner loading={loading} />
      </div>
    );
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="edit-building-page">
      <h1>Edit Building</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="buildingId"
          placeholder="Building ID"
          value={building.buildingId}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="streetAddress"
          placeholder="Street Address"
          value={building.streetAddress}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="buildingSize"
          placeholder="Building Size"
          value={building.buildingSize}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="propertyUse1st"
          placeholder="Primary Use"
          value={building.propertyUse1st}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="propertyUse2nd"
          placeholder="Secondary Use"
          value={building.propertyUse2nd}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="propertyUse3rd"
          placeholder="Tertiary Use"
          value={building.propertyUse3rd}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="benchmarkingStatus"
          placeholder="Benchmarking Status"
          value={building.benchmarkingStatus}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="currentSiteEUI"
          placeholder="Current Site EUI"
          value={building.currentSiteEUI}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="baseline2019EUI"
          placeholder="Baseline 2019 EUI"
          value={building.baseline2019EUI}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="firstTarget2025EUI"
          placeholder="First Target 2025 EUI"
          value={building.firstTarget2025EUI}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="secondTarget2027EUI"
          placeholder="Second Target 2027 EUI"
          value={building.secondTarget2027EUI}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="finalTarget2030EUI"
          placeholder="Final Target 2030 EUI"
          value={building.finalTarget2030EUI}
          onChange={handleChange}
          required
        />
        <button type="submit">Update Building</button>
      </form>
    </div>
  );
};

export default EditBuildingPage;
