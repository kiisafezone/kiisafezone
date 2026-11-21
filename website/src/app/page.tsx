const projects = [
  {
    number: "01",
    name: "THINK TWICE",
    category: "FINANCIAL DECISION COMPANION",
    description:
      "A thoughtful framework for evaluating purchases beyond the price tag — affordability, trade-offs, and long-term impact.",
    status: "IN DEVELOPMENT",
    className: "project-card--think",
  },
  {
    number: "02",
    name: "TEBAK PINTAR",
    category: "INTERACTIVE LIVE QUIZ",
    description:
      "A real-time quiz arena designed to turn audience participation into a lively, shared experience.",
    status: "PRODUCT EXPERIMENT",
    className: "project-card--quiz",
  },
  {
    number: "03",
    name: "BOT KEUANGAN",
    category: "PERSONAL FINANCE AUTOMATION",
    description:
      "A WhatsApp-based assistant that helps capture transactions and organize personal finances.",
    status: "PRIVATE PROJECT",
    className: "project-card--finance",
  },
];

const principles = ["Research with intent", "Design with clarity", "Build with purpose"];

export default function Home() {
  return (
    <main>
      <header className="site-header">
        <div className="page-shell header-inner">
          <a className="wordmark" href="#home" aria-label="KII home">
            KII<span className="wordmark-dot">.</span>
          </a>
          <nav aria-label="Main navigation" className="main-nav">
            <a href="#about">ABOUT</a>
            <a href="#work">WORK</a>
            <a href="#approach">APPROACH</a>
            <a href="#contact">CONTACT</a>
          </nav>
          <a className="header-availability" href="#contact">
            <span /> AVAILABLE FOR THE RIGHT THINGS
          </a>
        </div>
      </header>

      <section className="hero" id="home">
        <div className="hero-grid" aria-hidden="true" />
        <div className="page-shell hero-content">
          <div className="hero-topline">
            <span className="eyebrow">INDEPENDENT DEVELOPER · OPEN-SOURCE</span>
            <span className="hero-index interface-type">ID / KII—001</span>
          </div>
          <p className="hero-pretitle">A PERSON, A PRACTICE, A BODY OF WORK.</p>
          <h1 className="display-type">
            Beyond
            <br />
            the <span>interface.</span>
          </h1>
          <div className="hero-bottom">
            <p>
              I’m KII — also known as <strong>kiisafezone</strong>. I turn
              considered ideas into useful software, meaningful experiences,
              and things worth putting into the world.
            </p>
            <a className="round-link" href="#work" aria-label="Explore selected work">
              <span>EXPLORE WORK</span>
              <span className="round-link-icon" aria-hidden="true">↘</span>
            </a>
          </div>
          <div className="hero-footnote interface-type">
            <span>DESIGN-MINDED ENGINEERING</span>
            <span>BUILT WITH CURIOSITY, NOT NOISE</span>
          </div>
        </div>
      </section>

      <section className="intro-section page-shell" id="about">
        <div className="section-marker interface-type">
          <span>01 / THE PERSON</span>
          <span>ABOUT KII</span>
        </div>
        <div className="intro-layout">
          <h2 className="display-type">
            Curious by nature.
            <br />
            <span>Intentional by design.</span>
          </h2>
          <div className="intro-copy">
            <p>
              I’m an independent developer interested in the space where
              technology, design, and human behaviour meet.
            </p>
            <p>
              My work moves between product experiments, open-source software,
              automation, and digital experiences. I care about the details,
              but never lose sight of what a thing is meant to do.
            </p>
            <a className="text-link" href="https://github.com/kiisafezone" target="_blank" rel="noreferrer">
              MORE ON GITHUB <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
      </section>

      <section className="work-section" id="work">
        <div className="page-shell">
          <div className="section-marker section-marker--light interface-type">
            <span>02 / SELECTED WORK</span>
            <span>IDEAS MADE TANGIBLE</span>
          </div>
          <div className="work-heading">
            <h2 className="display-type">A few things<br />I’m building<span>.</span></h2>
            <p>Different problems. Different tools. One consistent curiosity.</p>
          </div>
          <div className="project-list">
            {projects.map((project) => (
              <article className={`project-card ${project.className}`} key={project.number}>
                <div className="project-number interface-type">{project.number}</div>
                <div className="project-main">
                  <span className="project-category interface-type">{project.category}</span>
                  <h3 className="display-type">{project.name}</h3>
                  <p>{project.description}</p>
                </div>
                <div className="project-meta">
                  <span className="project-status interface-type">{project.status}</span>
                  <span className="project-arrow" aria-hidden="true">↗</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="approach-section page-shell" id="approach">
        <div className="section-marker interface-type">
          <span>03 / THE PRACTICE</span>
          <span>HOW I APPROACH THE WORK</span>
        </div>
        <div className="approach-layout">
          <h2 className="display-type">Make it<br /><span>make sense.</span></h2>
          <div className="approach-detail">
            <p>
              Good software is more than a working interface. It should solve
              the right problem, respect the people using it, and remain
              understandable as it grows.
            </p>
            <ol>
              {principles.map((principle, index) => (
                <li key={principle}>
                  <span className="interface-type">0{index + 1}</span>
                  {principle}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <footer className="site-footer" id="contact">
        <div className="page-shell footer-inner">
          <span className="eyebrow">HAVE SOMETHING IN MIND?</span>
          <h2 className="display-type">Let’s make<br />it matter<span>.</span></h2>
          <div className="footer-bottom">
            <a className="footer-contact" href="https://github.com/kiisafezone">
              FIND ME ON GITHUB <span aria-hidden="true">↗</span>
            </a>
            <span className="interface-type">KII / KIISAFEZONE · 2026</span>
            <a className="interface-type back-top" href="#home">BACK TO TOP ↑</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
