import React, { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";

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
  const location = useLocation();

  // Scroll to requested section from Navbar or external links
  useEffect(() => {
    const sectionId = location.state?.scrollToSection;
    if (!sectionId) return;

    const sectionRefs = {
      collection: collectionRef,
      "fish-collection": collectionRef,
      "plants-accessories": plantsRef,
      "plants-accessories-section": plantsRef,
      about: aboutRef,
      "about-section": aboutRef,
      contact: contactRef,
      "contact-section": contactRef,
    };

    const targetRef = sectionRefs[sectionId];
    if (!targetRef) return;

    const timer = window.setTimeout(() => {
      targetRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });

      navigate(location.pathname, {
        replace: true,
        state: null,
      });
    }, 150);

    return () => window.clearTimeout(timer);
  }, [location, navigate]);

  const scrollToCollection = () => {
    collectionRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const scrollToContact = () => {
    contactRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <main className="home-page">
      {/* Hero section with clean background and fully styled visible buttons */}
      <section
        id="home"
        className="hero-exact"
        aria-label="AK Aqua Telugu homepage"
      >
        <img
          src="/home_background.png"
          alt="AK Aqua Telugu aquarium"
          className="hero-background"
          draggable="false"
        />

        {/* Fully Styled Explore Collection Button */}
        <button
          type="button"
          className="hero-explore-btn"
          onClick={scrollToCollection}
          aria-label="Explore Collection"
        >
          <span>Explore Collection</span>
          <span className="hero-explore-arrow" aria-hidden="true">
            →
          </span>
        </button>

        {/* Fully Styled Scroll Down Button (matches background circle arrow) */}
        <button
          type="button"
          className="hero-scroll-btn"
          onClick={scrollToContact}
          aria-label="Scroll down to contact"
          title="Scroll to Contact"
        >
          <span className="hero-scroll-icon">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 5v14M19 12l-7 7-7-7" />
            </svg>
          </span>
        </button>
      </section>

      {/* Fish collection */}
      <section
        ref={collectionRef}
        id="fish-collection"
        className="home-collection-section"
      >
        <Collection />
      </section>

      {/* Plants and accessories */}
      <section
        ref={plantsRef}
        id="plants-accessories-section"
        className="home-plants-section"
      >
        <PlantsAccessories />
      </section>

      {/* About */}
      <section ref={aboutRef} id="about-section" className="home-visit-section">
        <About />
      </section>

      {/* Contact */}
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
