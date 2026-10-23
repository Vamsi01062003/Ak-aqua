import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import { CartProvider } from "./context/CartContext";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import FloatingCart from "./components/FloatingCart";
import Home from "./pages/Home";
import Collection from "./pages/Collection";
import PlantsAccessories from "./pages/Plants&Accessories";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Cart from "./pages/Cart";
import Admin from "./pages/admin/Admin";

function ScrollToTop() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [location.pathname]);

  return null;
}

export default function App() {
  return (
    <CartProvider>
      <ScrollToTop />
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/collection" element={<Collection />} />
        <Route path="/plants-accessories" element={<PlantsAccessories />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="*" element={<Home />} />
      </Routes>

      {/* Floating cart: activates from Collection section onwards */}
      <FloatingCart />

      <Footer />
    </CartProvider>
  );
}
