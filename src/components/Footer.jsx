import { Instagram, Youtube, ArrowUpRight, MessageCircle } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { site } from "../data/site";
import Logo from "./Logo";

export default function Footer() {
  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = location.pathname === "/" || location.pathname === "/home";

  const handleFooterNav = (e, sectionId, route) => {
    e.preventDefault();
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
    <footer className="site-footer">
      <div className="container footer-main">
        <div className="footer-brand">
          <Logo />

          <p>
            Bringing beautiful aquatic life
            <br />
            to your home.
          </p>

          <div className="social">
            <a
              href={site.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <Instagram size={18} />
              <span>Instagram</span>
            </a>

            <a
              href={site.youtube}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
            >
              <Youtube size={18} />
              <span>YouTube</span>
            </a>
          </div>
        </div>

        <div className="footer-links">
          <label>QUICK LINKS</label>

          <a href="/" onClick={(e) => handleFooterNav(e, "home", "/")}>Home</a>
          <a href="/collection" onClick={(e) => handleFooterNav(e, "fish-collection", "/")}>Collection</a>
          <a href="/plants-accessories" onClick={(e) => handleFooterNav(e, "plants-accessories-section", "/")}>Plants & Accessories</a>
          <a href="/about" onClick={(e) => handleFooterNav(e, "about-section", "/")}>About Us</a>
          <a href="/contact" onClick={(e) => handleFooterNav(e, "contact-section", "/")}>Contact</a>
        </div>

        <div className="footer-contact">
          <label>GET IN TOUCH</label>

          <a
            href={`https://wa.me/${site.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <MessageCircle size={19} />
            <span>
              <small>WHATSAPP</small>
              <strong>8977304704</strong>
            </span>
            <ArrowUpRight size={16} />
          </a>

          <a href={site.instagram} target="_blank" rel="noopener noreferrer">
            <Instagram size={19} />
            <span>
              <small>INSTAGRAM</small>
              <strong>Follow AK Aqua</strong>
            </span>
            <ArrowUpRight size={16} />
          </a>
        </div>
      </div>

      <div className="container foot-bottom">
        <span>© {new Date().getFullYear()} AK Aqua. All rights reserved.</span>

        <span>Made for aquarium lovers.</span>
      </div>
    </footer>
  );
}
