import "./App.css";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";
import { useEffect, useRef, useState } from "react";

function LuxuryObject() {
  const group = useRef();

  useFrame((state, delta) => {
    if (group.current) {
      group.current.rotation.y += delta * 0.22;
      group.current.rotation.x =
        Math.sin(state.clock.elapsedTime * 0.35) * 0.08;
    }
  });

  return (
    <group ref={group}>
      <mesh>
        <boxGeometry args={[2.4, 2.4, 2.4]} />
        <meshStandardMaterial
          color="#c9a227"
          metalness={0.95}
          roughness={0.18}
        />
      </mesh>

      <mesh scale={0.82}>
        <boxGeometry args={[2.4, 2.4, 2.4]} />
        <meshStandardMaterial
          color="#050505"
          metalness={0.75}
          roughness={0.22}
        />
      </mesh>

      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.8, 0.045, 16, 100]} />
        <meshStandardMaterial
          color="#c9a227"
          metalness={1}
          roughness={0.15}
        />
      </mesh>

      <mesh rotation={[0, Math.PI / 2, 0]}>
        <torusGeometry args={[1.8, 0.045, 16, 100]} />
        <meshStandardMaterial
          color="#c9a227"
          metalness={1}
          roughness={0.15}
        />
      </mesh>
    </group>
  );
}

function Scene3D() {
  return (
    <>
      <ambientLight intensity={0.5} />

      <directionalLight
        position={[4, 5, 4]}
        intensity={2.5}
      />

      <pointLight
        position={[-4, 2, -3]}
        intensity={2}
        color="#c9a227"
      />

      <LuxuryObject />

      <Environment preset="city" />

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate={false}
      />
    </>
  );
}

function Reveal({ children, className = "" }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;

    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.12,
      }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal ${visible ? "reveal-visible" : ""} ${className}`}
    >
      {children}
    </div>
  );
}

function ProjectModal({ project, onClose }) {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  if (!project) return null;

  const whatsappMessage = encodeURIComponent(
    `Hello Aavaas Studios, I am interested in the ${project.title} concept. I would like to discuss a similar interior design project.`
  );

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="project-modal"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          className="modal-close"
          onClick={onClose}
          aria-label="Close project"
        >
          ×
        </button>

        <div className="modal-image">
          <img
            src={project.image}
            alt={project.title}
          />
        </div>

        <div className="modal-content">
          <span className="modal-number">
            {project.number}
          </span>

          <span className="modal-category modal-project-category">
  {project.category}
</span>

<span className="modal-category modal-project-category">
  CONCEPT PROJECT
</span>

          <h3>{project.title}</h3>

          <p className="modal-description">
            {project.description}
          </p>

          <div className="modal-details">
            <div>
              <span>STYLE</span>
              <strong>{project.style}</strong>
            </div>

            <div>
              <span>FOCUS</span>
              <strong>{project.focus}</strong>
            </div>

            <div>
              <span>APPROACH</span>
              <strong>{project.approach}</strong>
            </div>
          </div>

          <a
            className="modal-contact"
            href={`https://wa.me/9779716446982?text=${whatsappMessage}`}
            target="_blank"
            rel="noreferrer"
          >
            DISCUSS A SIMILAR PROJECT ↗
          </a>
        </div>
      </div>
    </div>
  );
}

function App() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const projects = [
    {
      number: "01",
      category: "RESIDENTIAL CONCEPT",
      title: "MODERN LIVING",
      image:
        "https://i.pinimg.com/originals/62/c7/e7/62c7e7ffe897527f857071c6bcd4eedb.png",
      description:
        "A refined residential concept exploring clean geometry, warm materials and quiet luxury for a contemporary living environment.",
      style: "Modern Luxury",
      focus: "Living Space",
      approach: "Minimal + Warm",
    },
    {
      number: "02",
      category: "RESIDENTIAL CONCEPT",
      title: "LUXURY BEDROOM",
      image:
        "https://i.pinimg.com/originals/92/74/7f/92747f46873aa056879886be283877ae.jpg",
      description:
        "A sophisticated bedroom concept balancing comfort, atmosphere and timeless material choices for a calm private retreat.",
      style: "Contemporary",
      focus: "Private Space",
      approach: "Soft + Elegant",
    },
    {
      number: "03",
      category: "COMMERCIAL CONCEPT",
      title: "PRIVATE OFFICE",
      image:
        "https://i.pinimg.com/originals/01/45/d4/0145d4c13db4fa2b345e70740efe9fe9.jpg",
      description:
        "A premium workspace concept designed to communicate confidence, focus and understated luxury through refined spatial planning.",
      style: "Executive Modern",
      focus: "Workspace",
      approach: "Bold + Refined",
    },
  ];

  const closeMenu = () => {
    setMenuOpen(false);
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <div className="app">
      {/* NAVIGATION */}
      <header className="navbar">
        <a
          href="#home"
          className="nav-logo"
          onClick={closeMenu}
        >
          AAVAAS
        </a>

        <nav className="nav-links">
          <a href="#about">ABOUT</a>
          <a href="#founder">FOUNDER</a>
          <a href="#services">SERVICES</a>
          <a href="#portfolio">PORTFOLIO</a>
          <a href="#contact">CONTACT</a>
        </nav>

        <button
          className={`menu-toggle ${menuOpen ? "menu-active" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </header>

      {/* MOBILE NAVIGATION */}
      <div
        className={`mobile-menu ${
          menuOpen ? "mobile-menu-open" : ""
        }`}
      >
        <div className="mobile-menu-inner">
          <div className="mobile-menu-top">
            <span>MENU</span>
            <span>AAVAAS STUDIOS</span>
          </div>

          <nav className="mobile-nav-links">
            <a href="#about" onClick={closeMenu}>
              <span>01</span>
              ABOUT
            </a>

            <a href="#founder" onClick={closeMenu}>
              <span>02</span>
              FOUNDER
            </a>

            <a href="#services" onClick={closeMenu}>
              <span>03</span>
              SERVICES
            </a>

            <a href="#portfolio" onClick={closeMenu}>
              <span>04</span>
              PORTFOLIO
            </a>

            <a href="#contact" onClick={closeMenu}>
              <span>05</span>
              CONTACT
            </a>
          </nav>

          <div className="mobile-menu-footer">
            <span>KATHMANDU · NEPAL</span>

            <a
              href="https://wa.me/9779716446982?text=Hello%20Aavaas%20Studios%2C%20I%20would%20like%20to%20discuss%20an%20interior%20design%20project."
              target="_blank"
              rel="noreferrer"
              onClick={closeMenu}
            >
              WHATSAPP ↗
            </a>
          </div>
        </div>
      </div>

      <main>
        {/* HERO */}
        <section className="hero" id="home">
          <div className="hero-grid-lines"></div>

          <div className="hero-content">
            <Reveal>
              <div className="hero-topline">
                <span className="hero-eyebrow">
                  AAVAAS STUDIOS
                </span>

                <span className="hero-location">
                  KATHMANDU · NEPAL
                </span>
              </div>
            </Reveal>

            <Reveal>
              <div className="hero-title-wrap">
                <h1>AAVAAS</h1>
              </div>
            </Reveal>

            <Reveal>
              <p className="hero-tagline">
                Designing spaces.
                <br />
                <span>Creating experiences.</span>
              </p>
            </Reveal>

            <Reveal>
              <div className="hero-actions">
                <a
                  href="#portfolio"
                  className="hero-button"
                >
                  <span>EXPLORE OUR WORK</span>
                  <span className="hero-button-arrow">↗</span>
                </a>

                <span className="hero-caption">
                  INTERIOR DESIGN · 3D · 2D
                </span>
              </div>
            </Reveal>
          </div>

          <div className="hero-visual-label hero-label-top">
            <span>FORM / 001</span>
            <span>SPATIAL STUDIES</span>
          </div>

          <div className="hero-3d hero-3d-behind-title">
            <div className="hero-glow"></div>

            <div className="hero-ring hero-ring-one"></div>
            <div className="hero-ring hero-ring-two"></div>

            <Canvas
              camera={{
                position: [0, 0, 7],
                fov: 42,
              }}
              dpr={[1, 1.5]}
            >
              <Scene3D />
            </Canvas>
          </div>

          <div className="hero-visual-label hero-label-bottom">
            <span>EST. 2026</span>
            <span>DESIGN / EXPERIENCE</span>
          </div>

          <div className="scroll-indicator">
            <span>SCROLL TO EXPLORE</span>
            <div className="scroll-line"></div>
          </div>
        </section>

        {/* ABOUT */}
        <section
          className="about-section section"
          id="about"
        >
          <div className="section-number">01</div>

          <Reveal>
            <div className="about-heading">
              <span className="section-eyebrow">
                THE AAVAAS STORY
              </span>

              <h2>
                WE DON'T JUST DESIGN SPACES.
                <br />
                WE DESIGN EXPERIENCES.
              </h2>
            </div>
          </Reveal>

          <div className="about-grid">
            <Reveal>
              <div className="about-story">
                <p className="large-text">
                  Aavaas Studios was built around a simple
                  idea: your space should feel like you.
                </p>

                <p>
                  We combine thoughtful planning,
                  contemporary aesthetics and detailed
                  visualization to create interiors that
                  are personal, functional and timeless.
                </p>

                <p>
                  From the first idea to the final detail,
                  every decision has a purpose.
                </p>
              </div>
            </Reveal>

            <Reveal>
              <div className="about-values">
                <div className="value-item">
                  <span>01</span>
                  <h3>INTENTION</h3>
                  <p>
                    Every space begins with a reason.
                    We design with purpose, not decoration.
                  </p>
                </div>

                <div className="value-item">
                  <span>02</span>
                  <h3>IDENTITY</h3>
                  <p>
                    Your environment should reflect the
                    people who live and work within it.
                  </p>
                </div>

                <div className="value-item">
                  <span>03</span>
                  <h3>DETAIL</h3>
                  <p>
                    The smallest details often create
                    the strongest impressions.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* FOUNDER */}
        <section
          className="founder-section section"
          id="founder"
        >
          <div className="section-number">02</div>

          <div className="founder-layout">
            <Reveal>
              <div className="founder-intro">
                <span className="section-eyebrow">
                  THE FOUNDER
                </span>

                <div className="founder-name-wrap">
                  <h2>
                    KAUSHAL
                    <br />
                    PANDEY
                  </h2>
                </div>

                <p className="founder-role">
                  FOUNDER & CREATIVE DIRECTOR
                </p>
              </div>
            </Reveal>

            <Reveal>
              <div className="founder-story">
                <div className="founder-mark">
                  K
                </div>

                <p className="founder-large-text">
                  Aavaas Studios began with a simple
                  ambition: to build something meaningful
                  from the ground up.
                </p>

                <p>
                  Initiated by Kaushal Pandey, Aavaas Studios
                  brings together interior design,
                  visualization and a strong attention to
                  detail to create spaces that feel
                  intentional and personal.
                </p>

                <p>
                  The vision is not simply to design
                  beautiful interiors, but to build a
                  studio that grows with every project,
                  every client and every idea.
                </p>

                <div className="founder-signature">
                  <span>KAUSHAL PANDEY</span>
                  <small>FOUNDER · AAVAAS STUDIOS</small>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* SERVICES */}
        <section
          className="services-section section"
          id="services"
        >
          <div className="section-number">03</div>

          <Reveal>
            <div className="services-content">
              <span className="services-eyebrow">
                SERVICES & PACKAGES
              </span>

              <h2>DESIGN YOUR WAY.</h2>

              <p className="services-intro">
                Whether you need a clear starting direction,
                a complete visual concept or detailed
                documentation for execution, choose the
                level of support your project needs.
              </p>
            </div>
          </Reveal>

          <div className="packages-grid">
            <Reveal>
              <div className="package-card">
                <div className="package-top">
                  <span>01</span>
                  <span>ESSENTIAL</span>
                </div>

                <h3>STARTING POINT</h3>

                <p className="package-description">
                  Ideal for clients who have a space but
                  need a strong creative direction before
                  moving forward.
                </p>

                <div className="package-divider"></div>

                <ul>
                  <li>Space concept</li>
                  <li>Furniture layout</li>
                  <li>Material direction</li>
                  <li>Basic 3D visualization</li>
                </ul>

                <a
                  href="#contact"
                  className="package-button"
                >
                  DISCUSS THIS PACKAGE ↗
                </a>
              </div>
            </Reveal>

            <Reveal>
              <div className="package-card package-featured">
                <div className="package-badge">
                  MOST REQUESTED
                </div>

                <div className="package-top">
                  <span>02</span>
                  <span>SIGNATURE</span>
                </div>

                <h3>COMPLETE CONCEPT</h3>

                <p className="package-description">
                  For clients who want to see how their
                  space will come together through planning,
                  materials, furniture and detailed
                  visualization.
                </p>

                <div className="package-divider"></div>

                <ul>
                  <li>Complete space planning</li>
                  <li>2D layout</li>
                  <li>Detailed 3D visualization</li>
                  <li>Material & color selection</li>
                  <li>Furniture & lighting concept</li>
                </ul>

                <a
                  href="#contact"
                  className="package-button"
                >
                  DISCUSS THIS PACKAGE ↗
                </a>
              </div>
            </Reveal>

            <Reveal>
              <div className="package-card">
                <div className="package-top">
                  <span>03</span>
                  <span>PREMIUM</span>
                </div>

                <h3>FULL DESIGN</h3>

                <p className="package-description">
                  A complete design service for projects
                  that require both creative direction and
                  detailed documentation for execution.
                </p>

                <div className="package-divider"></div>

                <ul>
                  <li>Complete interior design</li>
                  <li>Detailed 2D drawings</li>
                  <li>High-quality 3D renders</li>
                  <li>Working drawings</li>
                  <li>Material & quantity planning</li>
                </ul>

                <a
                  href="#contact"
                  className="package-button"
                >
                  DISCUSS THIS PACKAGE ↗
                </a>
              </div>
            </Reveal>
          </div>

          <Reveal>
            <div className="services-subheading">
              <span>WHAT WE DO</span>
            </div>
          </Reveal>

          <div className="services-grid">
            <Reveal>
              <div className="service-card">
                <span>01</span>
                <h3>INTERIOR DESIGN</h3>
                <p>
                  Complete interior concepts built around
                  your lifestyle, space and identity.
                </p>
              </div>
            </Reveal>

            <Reveal>
              <div className="service-card">
                <span>02</span>
                <h3>3D VISUALIZATION</h3>
                <p>
                  Photorealistic visual experiences that
                  let you see your space before it exists.
                </p>
              </div>
            </Reveal>

            <Reveal>
              <div className="service-card">
                <span>03</span>
                <h3>2D PLANNING</h3>
                <p>
                  Clear layouts and spatial planning that
                  turn ideas into practical spaces.
                </p>
              </div>
            </Reveal>

            <Reveal>
              <div className="service-card">
                <span>04</span>
                <h3>WORKING DRAWINGS</h3>
                <p>
                  Detailed technical drawings prepared
                  for accurate execution.
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        {/* PORTFOLIO / CONCEPT COLLECTION */}
        <section
          className="portfolio-section section"
          id="portfolio"
        >
          <div className="section-number">04</div>

          <Reveal>
            <div className="portfolio-heading">
              <span className="section-eyebrow">
                CONCEPT COLLECTION
              </span>

              <h2>
                DESIGN
                <br />
                CONCEPTS.
              </h2>
            </div>
          </Reveal>

          <Reveal>
            <div className="portfolio-intro">
              <p>
                A selection of interior design concepts
                exploring different spaces, materials and
                visual directions.
              </p>
            </div>
          </Reveal>

          <div className="portfolio-grid">
            {projects.map((project) => (
              <Reveal key={project.number}>
                <button
                  className="portfolio-card"
                  onClick={() =>
                    setSelectedProject(project)
                  }
                >
                  <div className="portfolio-image">
                    <img
                      src={project.image}
                      alt={project.title}
                    />

                    <div className="portfolio-overlay">
                      <span>VIEW CONCEPT ↗</span>
                    </div>
                  </div>

                  <div className="portfolio-info">
                    <span>{project.number}</span>

                    <div>
                      <span>{project.category}</span>

                      <h3>{project.title}</h3>
                    </div>
                  </div>
                </button>
              </Reveal>
            ))}
          </div>
        </section>

        {/* CONTACT */}
        <section
          className="contact-section section"
          id="contact"
        >
          <div className="section-number">05</div>

          <Reveal>
            <div className="contact-content">
              <span className="section-eyebrow">
                START A PROJECT
              </span>

              <h2>
                LET'S CREATE
                <br />
                SOMETHING
                <br />
                <span>MEANINGFUL.</span>
              </h2>

              <p>
                Have a space in mind?
                <br />
                Tell us what you're imagining, and let's
                turn the idea into a considered design.
              </p>

              <p>
                Whether it's a single room, a complete
                home, a workspace or a larger interior
                project, Aavaas Studios is ready to hear
                about it.
              </p>

              <a
                href="https://wa.me/9779716446982?text=Hello%20Aavaas%20Studios%2C%20I%20would%20like%20to%20discuss%20an%20interior%20design%20project."
                className="contact-button"
                target="_blank"
                rel="noreferrer"
              >
                TALK TO AAVAAS
                <span>↗</span>
              </a>

              <div className="contact-note">
                <span>DIRECT INQUIRIES</span>
                <span>WHATSAPP · KATHMANDU · NEPAL</span>
              </div>
            </div>
          </Reveal>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-top">
          <div className="footer-brand">
            <span>AAVAAS</span>

            <p>
              Designing spaces.
              <br />
              Creating experiences.
            </p>
          </div>

          <div className="footer-links">
            <a href="#about">ABOUT</a>
            <a href="#founder">FOUNDER</a>
            <a href="#services">SERVICES</a>
            <a href="#portfolio">PORTFOLIO</a>
            <a href="#contact">CONTACT</a>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© 2026 AAVAAS STUDIOS</span>
          <span>KATHMANDU · NEPAL</span>
        </div>
      </footer>

      {/* PROJECT MODAL */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </div>
  );
}

export default App;