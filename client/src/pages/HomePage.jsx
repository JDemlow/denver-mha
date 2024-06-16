import React from "react";
import Hero from "../components/Hero";
import HomeCards from "../components/HomeCards";
import BuildingsList from "../components/BuildingsList";

const HomePage = () => {
  return (
    <>
      <Hero />
      <HomeCards />
      <BuildingsList isHome={true} />
    </>
  );
};

export default HomePage;
