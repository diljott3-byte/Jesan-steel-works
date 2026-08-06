"use client";

import { FormEvent, useState, type CSSProperties } from "react";
import Link from "next/link";
import { assetPath, createWhatsAppLink, siteConfig } from "./site-config";

const collections = [
  {
    name: "Designer Almirahs",
    category: "Home storage",
    description: "Mirror-front wardrobes with purposeful compartments and a refined two-tone finish.",
    image: assetPath("/assets/images/product-cutout-locker.webp"),
    className: "collection-card collection-featured",
  },
  {
    name: "Multi-use Cabinets",
    category: "Organised storage",
    description: "Flexible shelves and secure sections for homes, offices and institutions.",
    image: assetPath("/assets/images/product-cutout-cabinet.webp"),
    className: "collection-card",
  },
  {
    name: "Secure Lockers",
    category: "Shared spaces",
    description: "Individual lockable compartments built for frequent, dependable use.",
    image: assetPath("/assets/images/product-cutout-almirah.webp"),
    className: "collection-card collection-dark",
  },
];

const ArrowIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [interest, setInterest] = useState("Designer Almirahs");
  const [formStatus, setFormStatus] = useState("");

  const closeMenu = () => setMenuOpen(false);

  const chooseCollection = (name: string) => {
    setInterest(name);
    document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
  };

  const submitEnquiry = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") || "").trim();
    const phone = String(form.get("phone") || "").trim();
    const note = String(form.get("message") || "").trim();
    const message = [
      `Hello SANKALP, I am interested in ${interest}.`,
      name && `Name: ${name}`,
      phone && `Phone: ${phone}`,
      note && `Requirement: ${note}`,
    ].filter(Boolean).join("\n");
    const link = createWhatsAppLink(message);

    if (link) {
      window.open(link, "_blank", "noopener,noreferrer");
      setFormStatus("Opening WhatsApp with your enquiry…");
    } else {
      setFormStatus("The enquiry flow is ready. It will activate when the owner confirms the WhatsApp number.");
    }
  };

  return (
    <>
      <div className="topbar">
        <div className="container topbar-inner">
          <span>Made in Hoshiarpur</span>
          <span className="topbar-message">Modern steel furniture for considered spaces</span>
          <span>Since {siteConfig.establishedYear}</span>
        </div>
      </div>

      <header className="site-header">
        <div className="container header-inner">
          <a className="wordmark" href="#home" onClick={closeMenu} aria-label="SANKALP home">
            <strong>{siteConfig.brandName}</strong>
            <span>A product of {siteConfig.parentBrand}</span>
          </a>

          <button
            type="button"
            className={`menu-toggle${menuOpen ? " is-open" : ""}`}
            aria-label="Toggle navigation"
            aria-controls="main-navigation"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span /><span /><span />
          </button>

          <nav id="main-navigation" className={`main-nav${menuOpen ? " is-open" : ""}`} aria-label="Main navigation">
            <a className="active" href="#home" onClick={closeMenu}>Home</a>
            <a href="#collections" onClick={closeMenu}>Products</a>
            <Link href="/infrastructure" onClick={closeMenu}>Infrastructure</Link>
            <a href="#story" onClick={closeMenu}>About</a>
            <a href="#contact" onClick={closeMenu}>Contact</a>
          </nav>

          <a className="header-enquiry" href="#contact">
            Start an enquiry <ArrowIcon />
          </a>
        </div>
      </header>

      <main id="home">
        <section
          className="hero"
          aria-labelledby="hero-title"
          style={{ "--hero-image": `url(${assetPath("/assets/images/hero-full-background.webp")})` } as CSSProperties}
        >
          <div className="container hero-inner">
            <div className="hero-copy">
              <div className="eyebrow"><i /> Furniture with intent</div>
              <h1 id="hero-title">Style meets strength.<br /><em>Crafted for everyday living.</em></h1>
              <p>
                Dependable furniture shaped around modern homes, workspaces and institutions—where thoughtful storage meets a clean, lasting finish.
              </p>

              <div className="hero-actions">
                <a className="button button-primary" href="#collections">Explore collections <ArrowIcon /></a>
                <a className="button button-secondary" href="#story">Our approach</a>
              </div>

              <div className="hero-proof" aria-label="Product qualities">
                <div><strong>01</strong><span>Purposeful<br />storage</span></div>
                <div><strong>02</strong><span>Dependable<br />construction</span></div>
                <div><strong>03</strong><span>Modern<br />finishes</span></div>
              </div>
            </div>

            <div
              className="hero-mobile-visual"
              role="img"
              aria-label="SANKALP owner with the steel furniture collection"
            />

            <div className="hero-stamp">
              <span>JESAN</span>
              <strong>Steel Works</strong>
              <small>Hoshiarpur · Punjab</small>
            </div>
          </div>
        </section>

        <section className="category-rail" aria-label="Furniture categories">
          <div className="container rail-inner">
            <span className="rail-label">Designed for</span>
            <span>Homes</span><i />
            <span>Offices</span><i />
            <span>Institutions</span><i />
            <span>Shared spaces</span>
          </div>
        </section>

        <section className="section collections-section" id="collections">
          <div className="container">
            <div className="section-intro">
              <div>
                <span className="kicker">Selected collections</span>
                <h2>Storage, elevated.</h2>
              </div>
              <div className="section-intro-copy">
                <p>Explore practical steel furniture with the details, proportions and finish to belong in today&apos;s spaces.</p>
                <a href="#contact">View the complete range <ArrowIcon /></a>
              </div>
            </div>

            <div className="collection-grid">
              {collections.map((item, index) => (
                <article className={item.className} key={item.name}>
                  <div className="collection-number">0{index + 1}</div>
                  <div className="collection-image">
                    <img src={item.image} alt={item.name} loading={index ? "lazy" : "eager"} />
                  </div>
                  <div className="collection-content">
                    <span>{item.category}</span>
                    <h3>{item.name}</h3>
                    <p>{item.description}</p>
                    <button type="button" onClick={() => chooseCollection(item.name)} aria-label={`Enquire about ${item.name}`}>
                      Enquire <ArrowIcon />
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section story-section" id="story">
          <div className="container story-grid">
            <div className="story-image-wrap">
              <img src={assetPath("/assets/images/showroom-2.webp")} alt="SANKALP steel almirahs displayed in the showroom" loading="lazy" />
              <div className="story-year"><span>EST.</span><strong>{siteConfig.establishedYear}</strong></div>
            </div>

            <div className="story-copy">
              <span className="kicker kicker-light">The SANKALP philosophy</span>
              <h2>Furniture should work hard—and still look considered.</h2>
              <p>
                SANKALP is backed by the practical manufacturing experience of Jesan Steel Works. Every product begins with a simple question: how can this piece make the space more useful without making it feel ordinary?
              </p>
              <div className="story-values">
                <div><span>01</span><strong>Form</strong><p>Clean proportions and a controlled visual language.</p></div>
                <div><span>02</span><strong>Function</strong><p>Storage planned around real everyday requirements.</p></div>
                <div><span>03</span><strong>Finish</strong><p>Surfaces and details made for modern surroundings.</p></div>
              </div>
              <Link className="text-link light-link" href="/infrastructure">Discover how we work <ArrowIcon /></Link>
            </div>
          </div>
        </section>

        <section className="section process-section" id="infrastructure">
          <div className="container">
            <div className="process-heading">
              <span className="kicker">From workshop to your space</span>
              <h2>A disciplined approach to every detail.</h2>
            </div>

            <div className="process-layout">
              <div className="process-list">
                <article><span>01</span><div><h3>Structure first</h3><p>Furniture planned for stability, utility and dependable daily performance.</p></div></article>
                <article><span>02</span><div><h3>Useful interiors</h3><p>Shelves, lockers and compartments arranged around the way each product is used.</p></div></article>
                <article><span>03</span><div><h3>Clean finishing</h3><p>Careful alignment, modern surfaces and details that complete the piece.</p></div></article>
              </div>

              <div className="showroom-collage">
                <figure className="showroom-main">
                  <img src={assetPath("/assets/images/showroom-1.webp")} alt="Furniture display at the SANKALP showroom" loading="lazy" />
                  <figcaption><span>Inside the showroom</span><strong>See the range in person</strong></figcaption>
                </figure>
                <figure className="showroom-secondary">
                  <img src={assetPath("/assets/images/storefront.webp")} alt="Jesan Steel Works storefront in Hoshiarpur" loading="lazy" />
                  <figcaption>Chintpurni Road · Hoshiarpur</figcaption>
                </figure>
              </div>
            </div>
          </div>
        </section>

        <section className="section enquiry-section" id="contact">
          <div className="container enquiry-shell">
            <div className="enquiry-copy">
              <span className="kicker kicker-light">Start a conversation</span>
              <h2>Let&apos;s find the right furniture for your space.</h2>
              <p>Choose a collection and share your requirement. Your enquiry is prepared for a direct WhatsApp conversation.</p>
              <div className="interest-chips" aria-label="Choose product interest">
                {collections.map((item) => (
                  <button
                    type="button"
                    className={interest === item.name ? "selected" : ""}
                    onClick={() => setInterest(item.name)}
                    key={item.name}
                  >
                    {item.name}
                  </button>
                ))}
              </div>
            </div>

            <form className="enquiry-form" onSubmit={submitEnquiry}>
              <div className="field-row">
                <label><span>Your name</span><input name="name" type="text" placeholder="Name" required /></label>
                <label><span>Phone number</span><input name="phone" type="tel" inputMode="tel" placeholder="Phone" required /></label>
              </div>
              <label><span>What do you need?</span><textarea name="message" rows={3} placeholder="Size, quantity, preferred finish or any other detail" /></label>
              <button className="button form-submit" type="submit">Prepare WhatsApp enquiry <ArrowIcon /></button>
              {formStatus && <p className="form-status" role="status">{formStatus}</p>}
            </form>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container footer-main">
          <div className="footer-identity">
            <div className="wordmark wordmark-footer"><strong>{siteConfig.brandName}</strong><span>A product of {siteConfig.parentBrand}</span></div>
            <p>Steel furniture made with purpose in Hoshiarpur, Punjab.</p>
          </div>
          <div className="footer-links"><strong>Explore</strong><a href="#collections">Products</a><Link href="/infrastructure">Infrastructure</Link><a href="#story">About</a></div>
          <div className="footer-links"><strong>Visit</strong><span>{siteConfig.location}</span><a href="#contact">Plan an enquiry</a></div>
          <div className="footer-note"><span>Brand thought</span><strong>Style meets<br /><em>strength.</em></strong></div>
        </div>
        <div className="container footer-bottom"><span>© 2026 SANKALP · Jesan Steel Works</span><span>Built for lasting spaces.</span></div>
      </footer>

    </>
  );
}
