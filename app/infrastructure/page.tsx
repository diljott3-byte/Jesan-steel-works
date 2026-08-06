"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import Link from "next/link";
import { assetPath, siteConfig } from "../site-config";

const processSteps = [
  {
    number: "01",
    phase: "Preparation",
    title: "Raw Sheet Metal",
    description: "The process begins with sheet metal selected for the furniture body, panels and internal components.",
    image: assetPath("/assets/images/process/raw-sheet-metal.webp"),
    alt: "Stacked raw sheet metal ready for furniture manufacturing",
  },
  {
    number: "02",
    phase: "Preparation",
    title: "Cutting",
    description: "Sheets and sections are cut to the required dimensions so every component starts with the right proportion.",
    image: assetPath("/assets/images/process/cutting.webp"),
    alt: "Craftsperson cutting a steel sheet with a grinder",
  },
  {
    number: "03",
    phase: "Preparation",
    title: "Bending",
    description: "Cut parts are shaped on the bending machine to create clean edges, corners and structural folds.",
    image: assetPath("/assets/images/process/bending.webp"),
    alt: "Craftsperson operating a blue sheet metal bending machine",
  },
  {
    number: "04",
    phase: "Fabrication",
    title: "MIG Welding",
    description: "Structural pieces are joined with MIG welding to build a strong and dependable furniture frame.",
    image: assetPath("/assets/images/process/mig-welding.webp"),
    alt: "Craftsperson MIG welding steel components",
  },
  {
    number: "05",
    phase: "Fabrication",
    title: "Spot Welding",
    description: "Sheet-metal panels are joined at focused points, keeping the assembly secure and neatly aligned.",
    image: assetPath("/assets/images/process/spot-welding.webp"),
    alt: "Craftsperson spot welding a steel panel",
  },
  {
    number: "06",
    phase: "Fabrication",
    title: "Drilling",
    description: "Accurate holes are prepared for hinges, locks, handles and the fittings required by each design.",
    image: assetPath("/assets/images/process/drilling.webp"),
    alt: "Drilling a steel furniture frame on a workshop drill press",
  },
  {
    number: "07",
    phase: "Fabrication",
    title: "Shaping & Assembly",
    description: "Panels, frames and compartments are brought together and aligned into the final furniture form.",
    image: assetPath("/assets/images/process/shaping-assembly.webp"),
    alt: "Assembled steel almirah frames before finishing",
  },
  {
    number: "08",
    phase: "Finishing",
    title: "Putty Filling",
    description: "Putty is applied to weld marks and surface irregularities, then levelled to prepare a smooth base.",
    image: assetPath("/assets/images/process/putty-filling.webp"),
    alt: "Craftsperson applying putty to a steel almirah surface",
  },
  {
    number: "09",
    phase: "Finishing",
    title: "Painting",
    description: "The prepared body receives an even painted finish that gives the furniture its final colour and character.",
    image: assetPath("/assets/images/process/painting.webp"),
    alt: "Craftsperson spray painting a steel almirah",
  },
  {
    number: "10",
    phase: "Complete",
    title: "Final Product",
    description: "Fittings and details come together in a finished piece, ready to serve the space it was made for.",
    image: assetPath("/assets/images/process/final-product.webp"),
    alt: "Finished SANKALP steel furniture product",
    final: true,
  },
];

const ArrowIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

export default function InfrastructurePage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const processRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const revealItems = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.14, rootMargin: "0px 0px -8%" },
    );

    revealItems.forEach((item) => observer.observe(item));

    const updateProgress = () => {
      if (!processRef.current) return;
      const rect = processRef.current.getBoundingClientRect();
      const travel = rect.height + window.innerHeight * 0.2;
      const progress = Math.min(1, Math.max(0, (window.innerHeight * 0.72 - rect.top) / travel));
      processRef.current.style.setProperty("--process-progress", String(progress));
    };

    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, []);

  const closeMenu = () => setMenuOpen(false);
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
          <Link className="wordmark" href="/" onClick={closeMenu} aria-label="SANKALP home">
            <strong>{siteConfig.brandName}</strong>
            <span>A product of {siteConfig.parentBrand}</span>
          </Link>

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
            <Link href="/" onClick={closeMenu}>Home</Link>
            <Link href="/#collections" onClick={closeMenu}>Products</Link>
            <Link className="active" href="/infrastructure" onClick={closeMenu}>Infrastructure</Link>
            <Link href="/#story" onClick={closeMenu}>About</Link>
            <Link href="/#contact" onClick={closeMenu}>Contact</Link>
          </nav>

          <Link className="header-enquiry" href="/#contact">
            Start an enquiry <ArrowIcon />
          </Link>
        </div>
      </header>

      <main className="infra-page">
        <section className="infra-hero" aria-labelledby="infra-title">
          <div className="container infra-hero-grid">
            <div className="infra-hero-copy">
              <div className="eyebrow"><i /> Inside our workshop</div>
              <h1 id="infra-title">From sheet to<br /><em>finished furniture.</em></h1>
              <p>Follow the complete SANKALP making process—ten considered steps that turn raw steel into furniture for everyday spaces.</p>
              <a className="button button-primary" href="#making-process">See how steel takes shape <ArrowIcon /></a>
              <div className="infra-hero-stat"><strong>10</strong><span>Steps.<br />One standard.</span></div>
            </div>

            <div className="infra-hero-visual" aria-label="SANKALP workshop process photographs">
              <figure className="infra-hero-photo infra-hero-photo-main">
                <img src={assetPath("/assets/images/process/cutting.webp")} alt="Steel cutting in the SANKALP workshop" />
                <figcaption>Cut · Shape · Join</figcaption>
              </figure>
              <figure className="infra-hero-photo infra-hero-photo-small">
                <img src={assetPath("/assets/images/process/bending.webp")} alt="Steel bending in the SANKALP workshop" />
              </figure>
              <div className="infra-orbit" aria-hidden="true"><span>Made with purpose</span></div>
            </div>
          </div>
        </section>

        <section className="infra-step-rail" aria-label="Manufacturing steps">
          <div className="container infra-step-rail-inner">
            {processSteps.map((step) => <a href={`#step-${step.number}`} key={step.number}><span>{step.number}</span>{step.title}</a>)}
          </div>
        </section>

        <section className="infra-process" id="making-process" ref={processRef}>
          <div className="container infra-process-intro" data-reveal>
            <span className="kicker">The making process</span>
            <h2>Steel, shaped with<br /><em>purpose.</em></h2>
            <p>Each stage adds structure, precision or finish. Together they create a piece that looks considered and works hard.</p>
          </div>

          <div className="container infra-timeline">
            <div className="infra-line" aria-hidden="true"><i /></div>
            {processSteps.map((step, index) => (
              <article
                className={`infra-process-step${step.final ? " is-final" : ""}`}
                id={`step-${step.number}`}
                data-reveal
                style={{ "--step-delay": `${(index % 2) * 90}ms` } as CSSProperties}
                key={step.number}
              >
                <div className="infra-step-image">
                  <img src={step.image} alt={step.alt} loading={index < 2 ? "eager" : "lazy"} />
                  <span>{step.phase}</span>
                </div>
                <div className="infra-step-content">
                  <div className="infra-step-number"><span>Step</span><strong>{step.number}</strong></div>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                  <div className="infra-step-rule"><i /></div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="infra-finish" data-reveal>
          <div className="container infra-finish-inner">
            <div>
              <span className="kicker kicker-light">The result</span>
              <h2>A complete journey.<br /><em>A lasting piece.</em></h2>
            </div>
            <Link className="button infra-finish-button" href="/#collections">Explore our furniture <ArrowIcon /></Link>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container footer-main">
          <div className="footer-identity">
            <div className="wordmark wordmark-footer"><strong>{siteConfig.brandName}</strong><span>A product of {siteConfig.parentBrand}</span></div>
            <p>Steel furniture made with purpose in Hoshiarpur, Punjab.</p>
          </div>
          <div className="footer-links"><strong>Explore</strong><Link href="/#collections">Products</Link><Link href="/infrastructure">Infrastructure</Link><Link href="/#story">About</Link></div>
          <div className="footer-links"><strong>Visit</strong><span>{siteConfig.location}</span><Link href="/#contact">Plan an enquiry</Link></div>
          <div className="footer-note"><span>Brand thought</span><strong>Style meets<br /><em>strength.</em></strong></div>
        </div>
        <div className="container footer-bottom"><span>© 2026 SANKALP · Jesan Steel Works</span><span>Built for lasting spaces.</span></div>
      </footer>

    </>
  );
}
