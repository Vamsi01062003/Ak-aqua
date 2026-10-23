import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Logo from "./Logo";
import "./navbar.css";

const CART_STORAGE_KEY = "ak-aqua-cart";

const getSavedCartCount = () => {
  try {
    const saved = localStorage.getItem(CART_STORAGE_KEY);
    const parsed = saved ? JSON.parse(saved) : [];
    if (Array.isArray(parsed)) {
      return parsed.reduce(
        (sum, item) => sum + (Number(item.quantity) || 1),
        0,
      );
    }
    return 0;
  } catch {
    return 0;
  }
};

export default function Navbar() {
  const [cartCount, setCartCount] = useState(getSavedCartCount);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const isHomePage = location.pathname === "/" || location.pathname === "/home";

  // Realtime cart badge synchronization
  useEffect(() => {
    const handleCartUpdated = (event) => {
      if (event.detail && Array.isArray(event.detail)) {
        const total = event.detail.reduce(
          (sum, item) => sum + (Number(item.quantity) || 1),
          0,
        );
        setCartCount(total);
      } else {
        setCartCount(getSavedCartCount());
      }
    };

    const handleStorageChange = (event) => {
      if (event.key === CART_STORAGE_KEY) {
        setCartCount(getSavedCartCount());
      }
    };

    window.addEventListener("cartUpdated", handleCartUpdated);
    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("cartUpdated", handleCartUpdated);
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  // Glassmorphism effect on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle navigation: smooth scroll if on homepage, route transition if on other pages
  const handleNavClick = (sectionId, route) => {
    setMobileMenuOpen(false);

    if (isHomePage) {
      if (sectionId === "home") {
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }
    }
    navigate(route, { state: { scrollToSection: sectionId } });
  };

  return (
    <header className={`ak-navbar ${isScrolled ? "scrolled" : "at-top"}`}>
      <div className="ak-navbar-container">
        {/* Brand / Logo */}
        <Link
          to="/"
          onClick={() => {
            if (isHomePage) window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          aria-label="AK Aqua Telugu Home"
        >
          <Logo />
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="ak-nav-links" aria-label="Main Navigation">
          <button
            type="button"
            className={`ak-nav-item ${isHomePage && !location.hash ? "active" : ""}`}
            onClick={() => handleNavClick("home", "/")}
          >
            Home
          </button>

          <button
            type="button"
            className={`ak-nav-item ${location.pathname === "/collection" ? "active" : ""}`}
            onClick={() => handleNavClick("fish-collection", "/collection")}
          >
            Collection
          </button>

          <button
            type="button"
            className={`ak-nav-item ${location.pathname === "/plants-accessories" ? "active" : ""}`}
            onClick={() =>
              handleNavClick(
                "plants-accessories-section",
                "/plants-accessories",
              )
            }
          >
            Plants &amp; Accessories
          </button>

          <button
            type="button"
            className={`ak-nav-item ${location.pathname === "/about" ? "active" : ""}`}
            onClick={() => handleNavClick("about-section", "/about")}
          >
            About
          </button>

          <button
            type="button"
            className={`ak-nav-item ${location.pathname === "/contact" ? "active" : ""}`}
            onClick={() => handleNavClick("contact-section", "/contact")}
          >
            Contact
          </button>
        </nav>

        {/* Right Action Icons (Admin symbol & Real-time Cart symbol) */}
        <div className="ak-nav-actions">
          {/* Admin Symbol Button */}
          <button
            type="button"
            className="ak-nav-icon-btn"
            onClick={() => navigate("/admin")}
            aria-label="Admin and User Account"
            title="Admin Login"
          >
            <svg
              className="ak-icon-svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </button>

          {/* Cart Symbol Button with Real-time Count */}
          <button
            type="button"
            className="ak-nav-icon-btn ak-cart-nav-btn"
            onClick={() => navigate("/cart")}
            aria-label={`Shopping Cart (${cartCount} items)`}
            title="View Cart"
          >
            <svg
              className="ak-icon-svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
            <span
              className={`ak-cart-badge ${cartCount > 0 ? "has-items" : ""}`}
            >
              {cartCount}
            </span>
          </button>

          {/* Mobile Menu Hamburger Toggle */}
          <button
            type="button"
            className="ak-mobile-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            <span
              className={`ak-hamburger-bar ${mobileMenuOpen ? "open" : ""}`}
            />
            <span
              className={`ak-hamburger-bar ${mobileMenuOpen ? "open" : ""}`}
            />
            <span
              className={`ak-hamburger-bar ${mobileMenuOpen ? "open" : ""}`}
            />
          </button>
        </div>
      </div>

      {/* Mobile Drawer Dropdown */}
      {mobileMenuOpen && (
        <div className="ak-mobile-menu">
          <button
            type="button"
            className="ak-mobile-nav-item"
            onClick={() => handleNavClick("home", "/")}
          >
            Home
          </button>
          <button
            type="button"
            className="ak-mobile-nav-item"
            onClick={() => handleNavClick("fish-collection", "/collection")}
          >
            Collection
          </button>
          <button
            type="button"
            className="ak-mobile-nav-item"
            onClick={() =>
              handleNavClick(
                "plants-accessories-section",
                "/plants-accessories",
              )
            }
          >
            Plants &amp; Accessories
          </button>
          <button
            type="button"
            className="ak-mobile-nav-item"
            onClick={() => handleNavClick("about-section", "/about")}
          >
            About
          </button>
          <button
            type="button"
            className="ak-mobile-nav-item"
            onClick={() => handleNavClick("contact-section", "/contact")}
          >
            Contact
          </button>
          <div className="ak-mobile-divider" />
          <button
            type="button"
            className="ak-mobile-nav-item"
            onClick={() => {
              setMobileMenuOpen(false);
              navigate("/cart");
            }}
          >
            🛒 Cart ({cartCount})
          </button>
          <button
            type="button"
            className="ak-mobile-nav-item"
            onClick={() => {
              setMobileMenuOpen(false);
              navigate("/admin");
            }}
          >
            👤 Admin Account
          </button>
        </div>
      )}
    </header>
  );
}
