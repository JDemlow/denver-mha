import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const IndividualBuildingPage = () => {
  const { id } = useParams();
  const [building, setBuilding] = useState(null);

  useEffect(() => {
    const fetchBuilding = async () => {
      try {
        const response = await axios.get(`/api/buildings/${id}`);
        setBuilding(response.data);
      } catch (error) {
        console.error("Error fetching building:", error);
      }
    };

    fetchBuilding();
  }, [id]);

  if (!building) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h1 className="mb-6 text-3xl font-bold text-center">
        {building.buildingName}
      </h1>
      <div className="p-4 bg-white shadow-md rounded-xl">
        <h3 className="mb-2 text-xl font-bold">Type: {building.type}</h3>
        <p className="mb-4">{building.description}</p>
        <p className="mb-4">
          <strong>Location:</strong> {building.location}
        </p>
        <p className="mb-4">
          <strong>Rent:</strong> {building.rent}
        </p>
      </div>
    </div>
  );
};

export default IndividualBuildingPage;
