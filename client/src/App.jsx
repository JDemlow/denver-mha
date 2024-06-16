import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import BuildingsList from "./components/BuildingsList";
import IndividualBuildingPage from "./pages/IndividualBuildingPage";
import About from "./pages/AboutPage";
import Contact from "./pages/ContactPage";

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<BuildingsList />} />
        <Route path="/buildings/:id" element={<IndividualBuildingPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </>
  );
};

export default App;
