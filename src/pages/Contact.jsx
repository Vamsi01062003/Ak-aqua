import React from "react";
import { Phone, MessageCircle, Instagram, Youtube, ArrowUpRight } from "lucide-react";
import { site } from "../data/site";
import "./contact.css";

const PHONE_NUMBER = "918977304704";

export default function Contact() {
  const phoneLink = `tel:+${PHONE_NUMBER}`;

  const whatsappMessage = encodeURIComponent(
    "Hi AK Aqua! I am interested in your aquarium fish. Please share the details."
  );

  const whatsappLink = `https://wa.me/${PHONE_NUMBER}?text=${whatsappMessage}`;

  return (
    <main className="ak-contact-page">
      <div className="ak-contact-container">
        <header className="ak-contact-header">
          <span className="ak-contact-eyebrow">AK AQUA</span>

          <h1>Contact Us</h1>

          <p>
            Have questions about our aquarium fish, plants, or accessories?
            We’re happy to help.
          </p>
        </header>

        <section className="ak-contact-content">
          <div className="ak-contact-intro">
            <span className="ak-contact-label">GET IN TOUCH</span>

            <h2>Let’s talk aquatics.</h2>

            <p>
              Contact us for product enquiries, fish availability, and
              details about our collection.
            </p>
          </div>

          <div className="ak-contact-options">
            <a
              href={phoneLink}
              className="ak-contact-item"
              aria-label="Call AK Aqua at 8977304704"
            >
              <span className="ak-contact-icon">
                <Phone size={21} />
              </span>

              <span className="ak-contact-item-text">
                <small>CALL US</small>
                <strong>+91 89773 04704</strong>
                <span>Call for enquiries</span>
              </span>

              <ArrowUpRight className="ak-contact-arrow" size={19} />
            </a>

            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="ak-contact-item"
              aria-label="Chat with AK Aqua on WhatsApp"
            >
              <span className="ak-contact-icon">
                <MessageCircle size={21} />
              </span>

              <span className="ak-contact-item-text">
                <small>WHATSAPP</small>
                <strong>Chat with us</strong>
                <span>Quick questions and enquiries</span>
              </span>

              <ArrowUpRight className="ak-contact-arrow" size={19} />
            </a>
          </div>

          <p className="ak-contact-note">
            Please contact us to confirm fish availability before visiting.
          </p>
        </section>

        <footer className="ak-contact-footer">
          <div>
            <strong>AK AQUA</strong>
            <p>Bringing the beauty of aquatic life closer to you.</p>
          </div>

          <div className="ak-contact-socials">
            <a
              href={site.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="AK Aqua on Instagram"
            >
              <Instagram size={19} />
            </a>

            <a
              href={site.youtube}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="AK Aqua on YouTube"
            >
              <Youtube size={19} />
            </a>
          </div>
        </footer>
      </div>
    </main>
  );
}