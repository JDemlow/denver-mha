import React from "react";
import { Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import IndividualBuildingPage from "./pages/IndividualBuildingPage";
import NotFoundPage from "./pages/NotFoundPage";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="buildings/:id" element={<IndividualBuildingPage />} />
        <Route path="*" element={<NotFoundPage />} />{" "}
        {/* Catch-all route for 404 */}
      </Route>
    </Routes>
  );
};

export default App;
