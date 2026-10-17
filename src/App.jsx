import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import Footer from "./components/Footer";

import Home from "./pages/Home";
import Collection from "./pages/Collection";
import PlantsAccessories from "./pages/Plants&Accessories";
import About from "./pages/About";
import Contact from "./pages/Contact";

import Admin from "./pages/admin/Admin";

function Top() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return null;
}

export default function App() {
  return (
    <>
      <Top />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/collection" element={<Collection />} />

        <Route
          path="/plants-accessories"
          element={<PlantsAccessories />}
        />

        <Route path="/about" element={<About />} />

        <Route path="/contact" element={<Contact />} />

        {/* Temporary cart placeholder */}
        <Route path="/cart" element={<Home />} />

        <Route path="/admin" element={<Admin />} />

        {/* Redirect unknown routes to Home */}
        <Route path="*" element={<Home />} />
      </Routes>

      <Footer />
    </>
  );
}