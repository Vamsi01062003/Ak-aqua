import { useRef } from "react";
import { useNavigate } from "react-router-dom";

import Collection from "./Collection";
import PlantsAccessories from "./Plants&Accessories";
import About from "./About";
import Contact from "./Contact";

import "./home.css";

export default function Home() {
  const collectionRef = useRef(null);
  const plantsRef = useRef(null);
  const aboutRef = useRef(null);
  const contactRef = useRef(null);

  const navigate = useNavigate();

  const scrollToCollection = () => {
    collectionRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const goToContact = () => {
    contactRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const goToCollection = () => navigate("/collection");
  const goToAbout = () => navigate("/about");
  const goToCart = () => navigate("/cart");
  const goToPlants = () => navigate("/plants-accessories");

  return (
    <main className="home-page">
      {/* HERO */}
      <section
        id="home"
        className="hero-exact"
        aria-label="AK Aqua Telugu"
      >
        <img
          src="/home_background.png"
          alt="AK Aqua Telugu aquarium hero"
          className="hero-background"
        />

        <button
          type="button"
          className="hero-nav-overlay hero-nav-home"
          onClick={() => navigate("/")}
          aria-label="Home"
          title="Home"
        />

        <button
          type="button"
          className="hero-nav-overlay hero-nav-collection"
          onClick={goToCollection}
          aria-label="Collection"
          title="Collection"
        />

        <button
          type="button"
          className="hero-nav-overlay hero-nav-plants"
          onClick={goToPlants}
          aria-label="Plants and Accessories"
          title="Plants & Accessories"
        />

        <button
          type="button"
          className="hero-nav-overlay hero-nav-about"
          onClick={goToAbout}
          aria-label="About"
          title="About"
        />

        <button
          type="button"
          className="hero-nav-overlay hero-nav-contact"
          onClick={goToContact}
          aria-label="Contact"
          title="Contact"
        />

        <button
          type="button"
          className="hero-nav-overlay hero-nav-cart"
          onClick={goToCart}
          aria-label="Shopping cart"
          title="Cart"
        />

        <button
          type="button"
          className="hero-explore-button"
          onClick={scrollToCollection}
          aria-label="Explore Collection"
        >
          <span>Explore Collection</span>
          <span className="hero-explore-arrow">→</span>
        </button>

        <button
          type="button"
          className="hero-scroll-down-button"
          onClick={scrollToCollection}
          aria-label="Scroll to Collection"
          title="Scroll Down"
        />
      </section>

      {/* COLLECTION */}
      <section
        ref={collectionRef}
        id="fish-collection"
        className="home-collection-section"
      >
        <Collection />
      </section>

      {/* PLANTS & ACCESSORIES */}
      <section
        ref={plantsRef}
        id="plants-accessories-section"
        className="home-plants-section"
      >
        <PlantsAccessories />
      </section>

      {/* ABOUT */}
      <section
        ref={aboutRef}
        id="about-section"
        className="home-visit-section"
      >
        <About />
      </section>

      {/* CONTACT */}
      <section
        ref={contactRef}
        id="contact-section"
        className="home-contact-section"
      >
        <Contact />
      </section>
    </main>
  );
}