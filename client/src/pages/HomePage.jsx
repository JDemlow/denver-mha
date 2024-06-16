import React from "react";
import Hero from "../components/Hero";
import BuildingsList from "../components/BuildingsList";

const HomePage = () => {
  return (
    <>
      <Hero />
      <BuildingsList isHome={true} />
    </>
  );
};

export default HomePage;
