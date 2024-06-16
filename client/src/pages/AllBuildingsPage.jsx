import React from "react";
import BuildingsList from "../components/BuildingsList";

const AllBuildingsPage = () => {
  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <BuildingsList isHome={false} />
    </div>
  );
};

export default AllBuildingsPage;
