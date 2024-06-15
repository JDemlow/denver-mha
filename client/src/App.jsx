import React from "react";
import BuildingsList from "./BuildingsList";
import { Routes, Route } from "react-router-dom";
import IndividualBuildingPage from "./pages/IndividualBuildingPage";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<BuildingsList />} />
      <Route path="/buildings/:id" element={<IndividualBuildingPage />} />
    </Routes>
  );
};

export default App;
