import React, { useState } from "react";
import {
  Phone,
  MessageCircle,
  Instagram,
  Youtube,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { site } from "../data/site";
import "./contact.css";

const PHONE_NUMBER = "918977304704";

const farmPhotos = [
  "/farm_pic-1.png",
  "/farm_pic-2.png",
  "/farm_pic-3.png",
  "/farm_pic-4.png",
  "/farm_pic-5.png",
  "/farm_pic-6.png",
];

export default function Contact() {
  const [activePhoto, setActivePhoto] = useState(0);
  const [touchStart, setTouchStart] = useState(null);

  const phoneLink = `tel:+${PHONE_NUMBER}`;

  const whatsappMessage = encodeURIComponent(
    "Hi AK Aqua! I am interested in your aquarium fish. Please share the details.",
  );

  const whatsappLink = `https://wa.me/${PHONE_NUMBER}?text=${whatsappMessage}`;

  const previousPhoto = () => {
    setActivePhoto((current) =>
      current === 0 ? farmPhotos.length - 1 : current - 1,
    );
  };

  const nextPhoto = () => {
    setActivePhoto((current) =>
      current === farmPhotos.length - 1 ? 0 : current + 1,
    );
  };

  const handleTouchStart = (event) => {
    setTouchStart(event.touches[0].clientX);
  };

  const handleTouchEnd = (event) => {
    if (touchStart === null) return;

    const distance = event.changedTouches[0].clientX - touchStart;

    if (distance > 50) previousPhoto();
    if (distance < -50) nextPhoto();

    setTouchStart(null);
  };

  return (
    <main className="ak-contact-page">
      <div className="ak-contact-layout">
        {/* LEFT: FARM PHOTO SLIDER */}
        <section className="ak-farm-gallery">
          <div
            className="ak-farm-photo-frame"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {farmPhotos.map((photo, index) => (
              <img
                key={photo}
                src={photo}
                alt={`AK Aqua farm ${index + 1}`}
                className={`ak-farm-photo ${
                  activePhoto === index ? "is-active" : ""
                }`}
                draggable="false"
              />
            ))}

            <div className="ak-farm-image-shade" />

            <div className="ak-farm-image-caption">
              <span>BEHIND AK AQUA</span>
              <h2>
                From our farm
                <br />
                to your aquarium.
              </h2>
            </div>

            <div className="ak-farm-slider-controls">
              <button
                type="button"
                onClick={previousPhoto}
                aria-label="Previous farm photo"
              >
                <ChevronLeft size={21} />
              </button>

              <div className="ak-farm-dots">
                {farmPhotos.map((photo, index) => (
                  <button
                    key={photo}
                    type="button"
                    className={activePhoto === index ? "is-active" : ""}
                    onClick={() => setActivePhoto(index)}
                    aria-label={`Show farm photo ${index + 1}`}
                    aria-current={activePhoto === index ? "true" : undefined}
                  />
                ))}
              </div>

              <button
                type="button"
                onClick={nextPhoto}
                aria-label="Next farm photo"
              >
                <ChevronRight size={21} />
              </button>
            </div>

            <span className="ak-farm-photo-count">
              {String(activePhoto + 1).padStart(2, "0")} / 03
            </span>
          </div>

          <p className="ak-farm-gallery-note">
            A little glimpse into our aquatic world.
          </p>
        </section>

        {/* RIGHT: CONTACT DETAILS */}
        <section className="ak-contact-details">
          <span className="ak-contact-eyebrow">
            <span className="ak-contact-eyebrow-line" />
            AK AQUA TELUGU
          </span>

          <h1>
            Let's talk
            <br />
            <em>aquatics.</em>
          </h1>

          <p className="ak-contact-description">
            Have a question about our fish or collection? We'd love to hear from
            you. Get in touch with us.
          </p>

          <div className="ak-contact-divider" />

          <a
            href={phoneLink}
            className="ak-contact-link"
            aria-label="Call AK Aqua"
          >
            <span className="ak-contact-link-icon">
              <Phone size={19} strokeWidth={1.6} />
            </span>

            <span className="ak-contact-link-copy">
              <small>GIVE US A CALL</small>
              <strong>+91 89773 04704</strong>
            </span>

            <ArrowUpRight className="ak-contact-link-arrow" size={19} />
          </a>

          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="ak-contact-link"
            aria-label="Chat with AK Aqua on WhatsApp"
          >
            <span className="ak-contact-link-icon">
              <MessageCircle size={20} strokeWidth={1.6} />
            </span>

            <span className="ak-contact-link-copy">
              <small>QUICK ENQUIRIES</small>
              <strong>Chat on WhatsApp</strong>
            </span>

            <ArrowUpRight className="ak-contact-link-arrow" size={19} />
          </a>

          <p className="ak-contact-availability-note">
            Please message us to confirm fish availability before visiting.
          </p>

          <div className="ak-contact-bottom">
            <span>FOLLOW OUR JOURNEY</span>

            <div className="ak-contact-socials">
              <a
                href={site.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="AK Aqua on Instagram"
              >
                <Instagram size={19} strokeWidth={1.6} />
              </a>

              <a
                href={site.youtube}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="AK Aqua on YouTube"
              >
                <Youtube size={20} strokeWidth={1.6} />
              </a>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
