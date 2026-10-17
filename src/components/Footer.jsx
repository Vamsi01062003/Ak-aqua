import { Instagram, Youtube, ArrowUpRight, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { site } from "../data/site";
import Logo from "./Logo";

export default function Footer() {
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

          <Link to="/">Home</Link>
          <Link to="/collection">Collection</Link>
          <Link to="/plants-accessories">Plants & Accessories</Link>
          <Link to="/about">About Us</Link>
          <Link to="/contact">Contact</Link>
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

          <a
            href={site.instagram}
            target="_blank"
            rel="noopener noreferrer"
          >
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
        <span>
          © {new Date().getFullYear()} AK Aqua. All rights reserved.
        </span>

        <span>Made for aquarium lovers.</span>
      </div>
    </footer>
  );
}