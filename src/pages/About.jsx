
import React from "react";
import "./about.css";

const VIDEO_URL = "https://www.youtube.com/embed/89WGzKzsY84";
const VIDEO_LINK = "https://youtu.be/89WGzKzsY84";

// Replace with Arjun's actual profile URLs.
const YOUTUBE_CHANNEL = "https://youtube.com/@akaquatelugu?si=SdX-hrpLQGcF8z8T";
const INSTAGRAM_PROFILE = "https://www.instagram.com/ak_aqua_telugu?utm_source=ig_web_button_share_sheet&rpxt=ZDNlZDc0MzIxNw==";

export default function About() {
  return (
    <main className="ak-about-page">
      <section className="ak-about-layout">

        {/* LEFT: Cinematic video */}
        <div className="ak-about-left">
          <div className="ak-cinema-card">
            <div className="ak-cinema-topline">
              <span>AK AQUA TELUGU</span>
              <span className="ak-cinema-dot">
                <span /> OUR AQUATIC WORLD
              </span>
            </div>

            <div className="ak-cinema-frame">
              <iframe
                src={VIDEO_URL}
                title="AK Aqua Telugu — Aquarium Fish and Breeding"
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>

            <div className="ak-cinema-caption">
              <div>
                <span className="ak-cinema-small-label">
                  A WORLD OF AQUATIC BEAUTY
                </span>
                <h2>Passion beneath the surface.</h2>
              </div>

              <a
                href={VIDEO_LINK}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Watch the video on YouTube"
                className="ak-cinema-open"
              >
                ↗
              </a>
            </div>

            <div className="ak-cinema-bottomline">
              <span>FISH KEEPING</span>
              <span>BREEDING</span>
              <span>AQUATIC LIFE</span>
            </div>
          </div>

          <p className="ak-cinema-note">
            <span className="ak-cinema-note-line" />
            Every aquarium has a story to tell.
          </p>
        </div>

        {/* RIGHT: Arjun's introduction and journey */}
        <div className="ak-about-right">
          <div className="ak-about-overline">
            <span className="ak-about-overline-line" />
            ABOUT US
          </div>

          <h1 className="ak-about-title">
            Meet <em>Arjun.</em>
          </h1>

          <p className="ak-about-subtitle">
            The passion behind AK Aqua Telugu
          </p>

          <div className="ak-about-story">
            <p className="ak-about-greeting">
              Hey guys, this is Arjun.
            </p>

            <p>
              I'm an aquarium fish seller cum breeder, and I'm passionate
              about the beautiful world of aquarium fish. What started
              with a love for aquatic life has grown into a journey of
              exploring different fish, breeding, and sharing this hobby
              with fellow aquarium lovers.
            </p>

            <p>
              Through AK Aqua Telugu, I share my experiences, fish
              varieties, and breeding journey with our community. My aim
              is to bring aquarium lovers closer to the fascinating world
              beneath the water.
            </p>
          </div>

          <div className="ak-about-signature">
            <span className="ak-signature-line" />
            <span>Arjun</span>
            <small>FOUNDER · AK AQUA TELUGU</small>
          </div>

          <div className="ak-about-social-section">
            <span className="ak-about-social-heading">
              FOLLOW THE JOURNEY
            </span>

            <div className="ak-about-social-links">
              <a
                href={YOUTUBE_CHANNEL}
                target="_blank"
                rel="noopener noreferrer"
                className="ak-about-social-link"
              >
                <span className="ak-social-symbol">▶</span>
                <span className="ak-social-copy">
                  <strong>YouTube</strong>
                  <small>56.7K subscribers</small>
                </span>
                <span className="ak-social-arrow">↗</span>
              </a>

              <a
                href={INSTAGRAM_PROFILE}
                target="_blank"
                rel="noopener noreferrer"
                className="ak-about-social-link"
              >
                <span className="ak-social-symbol ak-instagram-symbol">
                  ◎
                </span>
                <span className="ak-social-copy">
                  <strong>Instagram</strong>
                  <small>45K followers</small>
                </span>
                <span className="ak-social-arrow">↗</span>
              </a>
            </div>
          </div>

          <div className="ak-about-hours">
            <span className="ak-hours-indicator" />
            <span>BUSINESS HOURS</span>
            <strong>9:00 AM – 9:00 PM</strong>
          </div>
        </div>

      </section>
    </main>
  );
}
