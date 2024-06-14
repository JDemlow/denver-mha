import React, { useState, useEffect } from "react";
import axios from "axios";

const BuildingsList = () => {
  const [buildings, setBuildings] = useState([]);

  useEffect(() => {
    const fetchBuildings = async () => {
      try {
        const response = await axios.get("/api/buildings");
        console.log("API response:", response.data);
        if (Array.isArray(response.data)) {
          setBuildings(response.data);
        } else {
          console.error("Unexpected response data:", response.data);
        }
      } catch (error) {
        console.error("Error fetching buildings:", error);
      }
    };

    fetchBuildings();
  }, []);

  return (
    <div>
      <h1>Buildings List</h1>
      <ul>
        {buildings.map((building) => (
          <li key={building._id}>
            <h2>{building.buildingName}</h2>
            <p>Type: {building.type}</p>
            <p>Description: {building.description}</p>
            <p>Location: {building.location}</p>
            <p>Rent: {building.rent}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BuildingsList;
