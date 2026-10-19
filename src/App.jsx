import React, { useEffect, useRef, useState } from "react";
import "./App.css";

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [activeStory, setActiveStory] = useState(0);
  const progressRef = useRef(null);
  const heroRef = useRef(null);
  const year = new Date().getFullYear();

  useEffect(() => {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.13 });
    document.querySelectorAll(".reveal:not(.visible)").forEach((element) => revealObserver.observe(element));

    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setActiveSection(entry.target.id);
      });
    }, { rootMargin: "-35% 0px -55% 0px" });
    document.querySelectorAll("main section[id], #contact").forEach((section) => sectionObserver.observe(section));

    const storyObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setActiveStory(Number(entry.target.dataset.scene));
      });
    }, { rootMargin: "-42% 0px -42% 0px", threshold: 0 });
    document.querySelectorAll(".story-step").forEach((step) => storyObserver.observe(step));

    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const max = document.documentElement.scrollHeight - window.innerHeight;
        const progress = max > 0 ? window.scrollY / max : 0;
        if (progressRef.current) progressRef.current.style.width = `${progress * 100}%`;
        setScrolled(window.scrollY > 24);
        if (heroRef.current) {
          const heroProgress = Math.min(1, Math.max(0, window.scrollY / (window.innerHeight * 0.8)));
          heroRef.current.style.transform = `translate3d(0, ${heroProgress * -34}px, 0)`;
          heroRef.current.style.opacity = String(1 - heroProgress * 0.42);
        }
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
      revealObserver.disconnect();
      sectionObserver.disconnect();
      storyObserver.disconnect();
    };
  }, []);

  return (
    <>
  <div className="grain" aria-hidden="true"></div>
  <div className="progress" aria-hidden="true" ref={progressRef}></div>
  <header className={`topbar${scrolled ? ' scrolled' : ''}`} id="topbar">
    <a className="brand" href="#home" aria-label="Junho Kim home"><span className="brand-mark">JK</span> Junho Kim</a>
    <button className="menu-toggle" aria-label={menuOpen ? "Close navigation" : "Open navigation"} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? "×" : "☰"}</button>
    <nav className={`nav${menuOpen ? ' open' : ''}`} aria-label="Main navigation"><a className={activeSection === "about" ? "active" : ""} onClick={() => setMenuOpen(false)} href="#about">About</a><a className={activeSection === "expertise" ? "active" : ""} onClick={() => setMenuOpen(false)} href="#expertise">Focus</a><a className={activeSection === "work" ? "active" : ""} onClick={() => setMenuOpen(false)} href="#work">Selected work</a><a className={activeSection === "experience" ? "active" : ""} onClick={() => setMenuOpen(false)} href="#experience">Experience</a><a className={activeSection === "toolkit" ? "active" : ""} onClick={() => setMenuOpen(false)} href="#toolkit">Toolkit</a><a className={`contact-link${activeSection === "contact" ? ' active' : ''}`} onClick={() => setMenuOpen(false)} href="#contact">Get in touch ↗</a></nav>
  </header>
  <main>
    <section className="section hero" id="home">
      <div className="wrap hero-grid">
        <div className="hero-copy reveal visible" ref={heroRef}>
          <div className="eyebrow">Software &amp; systems engineer · New Jersey</div>
          <h1>Building tools<br />for the <span>real world.</span></h1>
          <p className="hero-sub">Web and mobile engineering for warehouse operations, automation, and business-critical systems.</p>
          <p className="hero-text">I connect the people on the floor, the systems behind the work, and the software that keeps everything moving.</p>
          <div className="hero-actions"><a className="button" href="#work">Explore my work <span>↓</span></a><a className="button button-quiet" href="./Junho-Kim-Resume.pdf" download="Junho-Kim-Resume.pdf">Download résumé <span>↓</span></a><a className="text-link" href="#contact">Let’s connect <span>↗</span></a></div>
        </div>
        <aside className="hero-aside reveal delay-2">
          <div className="aside-label">A practical engineering mindset</div>
          <p className="aside-title">From warehouse workflows to <em>reliable software.</em></p>
          <div className="aside-stats"><div className="stat"><strong>6+</strong><span>Years in software</span></div><div className="stat"><strong>160+</strong><span>Warehouse app users</span></div><div className="stat"><strong>3</strong><span>Core domains</span></div></div>
        </aside>
      </div><a className="scroll-note" href="#about"><i></i> Scroll to explore</a>
    </section>
    <section className="section" id="about">
      <div className="wrap about-grid">
        <div className="about-sticky reveal"><div className="eyebrow">01 / About</div><h2 className="section-heading">Software should work where work happens.</h2></div>
        <div className="about-copy reveal delay-1"><p>I’m <strong>Junho Kim</strong>, a software and systems engineer with 6+ years of experience across enterprise web and mobile applications, warehouse systems, and business-critical software.</p><p>My work starts with understanding the real workflow. I partner with operations and engineering teams to turn floor-level needs into clear interfaces, dependable integrations, and tools people can use at speed.</p><p>Today, I lead front-end work for warehouse automation and WMS modernization, while building mobile experiences for industrial devices and busy warehouse teams.</p>
          <div className="about-note"><div><div className="note-label">Based in</div><div className="note-value">New Jersey, USA</div></div><div><div className="note-label">Languages</div><div className="note-value">Korean · Native &nbsp; / &nbsp; English · Professional</div></div></div>
        </div>
      </div>
    </section>
    <section className="section expertise" id="expertise">
      <div className="wrap"><div className="expertise-top reveal"><div><div className="eyebrow">02 / What I do</div><h2 className="section-heading">Where I make a difference.</h2></div><p className="section-intro">I work across interfaces, devices, and data to make complex operational systems easier to run.</p></div>
        <div className="expertise-grid">
          <article className="expertise-card reveal"><div className="card-no">01</div><div className="card-icon">↗</div><h3>Warehouse systems</h3><p>Real-time dashboards and WMS interfaces that help teams track inventory, equipment, and operational flow.</p></article>
          <article className="expertise-card reveal delay-1"><div className="card-no">02</div><div className="card-icon">⌘</div><h3>Web applications</h3><p>Responsive React applications and data-heavy tools designed for validation, batch work, and clear decisions.</p></article>
          <article className="expertise-card reveal delay-2"><div className="card-no">03</div><div className="card-icon">▣</div><h3>Mobile on the floor</h3><p>React Native and Flutter apps for industrial PDAs, barcode scanning, and fast inbound and outbound workflows.</p></article>
          <article className="expertise-card reveal"><div className="card-no">04</div><div className="card-icon">⌁</div><h3>System integration</h3><p>Connecting user workflows, databases, and automation systems; tracing mismatches to their source.</p></article>
          <article className="expertise-card reveal delay-1"><div className="card-no">05</div><div className="card-icon">▤</div><h3>Operational UX</h3><p>AG Grid and Syncfusion experiences for large datasets, dynamic allocation, and real-time feedback.</p></article>
          <article className="expertise-card reveal delay-2"><div className="card-no">06</div><div className="card-icon">⌕</div><h3>Production support</h3><p>Practical troubleshooting across application, database, and interface layers to keep critical work moving.</p></article>
        </div>
      </div>
    </section>
    <section className="story" id="work">
      <div className="story-stage-wrap">
        <div className={`story-stage scene-${activeStory}`}>
          <div className="story-stage-top"><span className="brand-mark">JK</span><span>FIELD NOTES / 2026</span><span className="story-live"><i></i> SYSTEMS IN MOTION</span></div>
          <div className="story-art" aria-hidden="true">
            <div className="art-orbit orbit-one"></div><div className="art-orbit orbit-two"></div>
            <div className="ops-screen">
              <div className="ops-header"><span className="ops-menu">☰</span><span>FULFILLMENT / CONTROL</span><span className="ops-state"><i></i> LIVE</span></div>
              <div className="ops-layout">
                <div className="ops-sidebar"><b>OVERVIEW</b><span className="selected">◈ &nbsp; Operations</span><span>▦ &nbsp; Inventory</span><span>⌁ &nbsp; Equipment</span><span>↗ &nbsp; Analytics</span><div className="sidebar-user"><i>JK</i><span>Junho Kim<br /><small>ENGINEERING</small></span></div></div>
                <div className="ops-main">
                  <div className="ops-title-row"><div><small>{["WAREHOUSE AUTOMATION", "WMS MODERNIZATION", "MOBILE FLOOR TOOLS", "SYSTEM INTEGRATION"][activeStory]}</small><h3>{["Live operations", "Warehouse control", "Floor workflow", "Signal to solution"][activeStory]}</h3></div><span className="ops-period">TODAY &nbsp;⌄</span></div>
                  <div className="ops-metrics"><div><small>{["Orders in motion", "Active workflows", "Team members", "Events traced"][activeStory]}</small><strong>{["1,284", "08", "160+", "2,406"][activeStory]}</strong><em>↗ &nbsp; { ["12.8%", "4 sites", "On the floor", "Resolved"][activeStory] }</em></div><div><small>{["System health", "Picking accuracy", "Scan success", "Data integrity"][activeStory]}</small><strong>{["99.98%", "99.6%", "Fast", "Verified"][activeStory]}</strong><em>● &nbsp; Stable</em></div></div>
                  <div className="ops-chart"><div className="chart-label"><span>FLOW / THROUGHPUT</span><b>+18.4%</b></div><div className="chart-grid"><svg viewBox="0 0 520 120" preserveAspectRatio="none"><defs><linearGradient id="fill" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor="#c9f36b" stopOpacity=".3"/><stop offset="1" stopColor="#c9f36b" stopOpacity="0"/></linearGradient></defs><path className="chart-area" d={[["M0 100 C35 96 40 73 78 78 S130 88 162 63 S219 79 250 49 S302 68 337 42 S397 53 425 26 S477 42 520 10 V120 H0 Z"],["M0 87 C37 90 50 72 82 76 S125 41 164 57 S220 48 248 31 S301 61 337 35 S390 46 424 18 S481 35 520 8 V120 H0 Z"],["M0 103 C34 101 47 92 77 85 S130 79 162 70 S212 65 250 55 S302 46 337 37 S393 31 425 21 S480 16 520 8 V120 H0 Z"],["M0 94 C38 95 55 77 80 83 S125 45 163 63 S214 74 250 43 S298 58 338 29 S393 53 426 22 S480 35 520 6 V120 H0 Z"]][activeStory][0]} fill="url(#fill)"/><path className="chart-line" d={[["M0 100 C35 96 40 73 78 78 S130 88 162 63 S219 79 250 49 S302 68 337 42 S397 53 425 26 S477 42 520 10"],["M0 87 C37 90 50 72 82 76 S125 41 164 57 S220 48 248 31 S301 61 337 35 S390 46 424 18 S481 35 520 8"],["M0 103 C34 101 47 92 77 85 S130 79 162 70 S212 65 250 55 S302 46 337 37 S393 31 425 21 S480 16 520 8"],["M0 94 C38 95 55 77 80 83 S125 45 163 63 S214 74 250 43 S298 58 338 29 S393 53 426 22 S480 35 520 6"]][activeStory][0]} fill="none"/></svg></div><div className="chart-time"><span>08:00</span><span>10:00</span><span>12:00</span><span>14:00</span><span>16:00</span></div></div>
                  <div className="ops-foot"><span><i></i> WMS connected</span><span><i></i> Devices online</span><span>UPDATED JUST NOW</span></div>
                </div>
              </div>
              <div className="floating-alert"><span>↗</span><div><b>{["Throughput up", "Migration ready", "Scan received", "Issue resolved"][activeStory]}</b><small>{["Inbound is moving ahead of plan", "A clearer workflow, site by site", "Barcode event matched instantly", "Root cause found across systems"][activeStory]}</small></div><i>NOW</i></div>
            </div>
            <div className="story-orb orb-a"></div><div className="story-orb orb-b"></div>
          </div>
          <div className="story-stage-foot"><span>BUILDING FOR THE REAL WORLD</span><span>SCROLL TO EXPLORE &nbsp; ↓</span></div>
        </div>
      </div>
      <div className="story-copy">
        <div className="story-intro"><span className="eyebrow">03 / Selected work</span><h2>Software that moves<br />with the work.</h2><p>Scroll through the systems, screens, and people behind what I build.</p></div>
        <article className={`story-step${activeStory===0 ? " is-active" : ""}`} data-scene="0"><span className="story-index">01 <i></i> OPERATIONS</span><h3>See the whole operation.</h3><p>Turn a fast-moving warehouse into a clear picture: live equipment, inventory, and workflow status in one place.</p><div className="story-tags"><span>React</span><span>Real-time UI</span><span>Automation</span></div></article>
        <article className={`story-step${activeStory===1 ? " is-active" : ""}`} data-scene="1"><span className="story-index">02 <i></i> MODERNIZATION</span><h3>Make the next move simpler.</h3><p>Replace a third-party WMS with tools tailored to real multi-site workflows and the teams who use them.</p><div className="story-tags"><span>React</span><span>AG Grid</span><span>Syncfusion</span></div></article>
        <article className={`story-step${activeStory===2 ? " is-active" : ""}`} data-scene="2"><span className="story-index">03 <i></i> MOBILE</span><h3>Every scan, one step forward.</h3><p>Build fast mobile workflows for warehouse teams, industrial devices, and barcode scanners used on the floor.</p><div className="story-tags"><span>React Native</span><span>Flutter</span><span>PDA SDKs</span></div></article>
        <article className={`story-step${activeStory===3 ? " is-active" : ""}`} data-scene="3"><span className="story-index">04 <i></i> INTEGRATION</span><h3>Follow the signal to its source.</h3><p>Connect interfaces, databases, and automation, then trace mismatches across the full system.</p><div className="story-tags"><span>MS SQL</span><span>Oracle</span><span>Production support</span></div></article>
      </div>
    </section>
    <section className="section experience" id="experience">
      <div className="wrap"><div className="reveal"><div className="eyebrow">04 / Experience</div><h2 className="section-heading">Building software where the work happens.</h2><p className="section-intro">From retail ordering and manufacturing systems to warehouse automation, I’ve worked close to the teams who depend on the software.</p></div>
        <div className="exp-layout"><div className="exp-aside reveal"><p className="exp-caption">A progression from shipping customer-facing products to owning operational interfaces, integrations, and mobile tools used in active production environments.</p><div className="experience-snapshot"><div><strong>160+</strong><span>warehouse app users</span></div><div><strong>24/7</strong><span>production monitoring</span></div><div><strong>6+</strong><span>years building software</span></div></div></div><div className="timeline">
          <article className="timeline-item reveal"><div className="timeline-year">JUL 2022 — NOW</div><div className="timeline-body"><h3>IT Application Engineer</h3><div className="timeline-company">HL Choice Corp. (SUNSSC) · Moonachie, NJ</div><ul className="timeline-highlights"><li><strong>Warehouse automation:</strong> Lead front-end work for an automated warehouse migration, building live dashboards and PDA interfaces to track equipment and inventory flows.</li><li><strong>WMS replacement:</strong> Serve as primary front-end engineer on a custom React platform replacing a third-party WMS for multi-site operations.</li><li><strong>Operational data:</strong> Build AG Grid and Syncfusion interfaces for batch editing, dynamic row allocation, and real-time validation across large datasets.</li><li><strong>Mobile on the floor:</strong> Ship React Native and Flutter apps used by 160+ warehouse staff, integrating industrial PDA barcode SDKs for inbound and outbound work.</li><li><strong>System troubleshooting:</strong> Optimize MS SQL and Oracle queries and work with automation and backend engineers to resolve equipment-to-database data mismatches.</li></ul><div className="timeline-tools"><span>React · TypeScript</span><span>React Native · Flutter</span><span>AG Grid · Syncfusion</span><span>MS SQL · Oracle</span></div></div></article>
          <article className="timeline-item reveal"><div className="timeline-year">JAN — JUN 2022</div><div className="timeline-body"><h3>MES Monitoring Operator</h3><div className="timeline-company">SK C&amp;C USA · Commerce, GA</div><ul className="timeline-highlights"><li><strong>Production systems:</strong> Monitored MES applications and real-time manufacturing lines around the clock to help keep production systems stable.</li><li><strong>Incident response:</strong> Investigated critical application and data-interface anomalies using database tools and system logs, escalating issues with clear operational context.</li></ul><div className="timeline-tools"><span>MES operations</span><span>Database tools</span><span>System logs</span></div></div></article>
          <article className="timeline-item reveal"><div className="timeline-year">OCT 2019 — NOV 2021</div><div className="timeline-body"><h3>Software Engineer</h3><div className="timeline-company">NAU Computer Inc. · Springfield, VA</div><ul className="timeline-highlights"><li><strong>Ordering and POS:</strong> Built online ordering and kiosk point-of-sale experiences with responsive flows for desktop, tablet, and kiosk screens.</li><li><strong>Modernization:</strong> Reworked legacy applications with reusable React components, integrated REST APIs, and improved reliability in production.</li></ul><div className="timeline-tools"><span>React</span><span>REST APIs</span><span>Responsive UI</span><span>Kiosk POS</span></div></div></article>
        </div></div>
      </div>
    </section>
    <section className="section" id="toolkit">
      <div className="wrap"><div className="reveal"><div className="eyebrow">05 / Toolkit</div><h2 className="section-heading">Tools chosen for the workflow.</h2><p className="section-intro">A hands-on stack across web, data-heavy screens, mobile devices, and production support.</p></div>
        <div className="toolkit-grid">
          <div className="tool-group reveal"><div className="tool-number">01 / WEB APPLICATIONS</div><h3>Interfaces for complex work</h3><p className="tool-explain">Build responsive operational applications, connect REST services, and manage data and client-side state.</p><div className="tool-cloud"><span>React</span><span>TypeScript</span><span>Vite</span><span>TanStack Query</span><span>Zustand</span><span>Tailwind CSS</span><span>REST API integration</span></div></div>
          <div className="tool-group reveal delay-1"><div className="tool-number">02 / OPERATIONAL UI</div><h3>Make large datasets usable</h3><p className="tool-explain">Support batch edits, dynamic row allocation, and real-time validation in data-heavy workflows.</p><div className="tool-cloud"><span>AG Grid</span><span>Syncfusion</span><span>Batch editing</span><span>Real-time validation</span></div></div>
          <div className="tool-group reveal"><div className="tool-number">03 / MOBILE</div><h3>Apps for teams on the floor</h3><p className="tool-explain">Create mobile workflows for warehouse staff, with navigation and notifications suited to active operations.</p><div className="tool-cloud"><span>React Native</span><span>Flutter</span><span>React Navigation</span><span>Push notifications</span></div></div>
          <div className="tool-group reveal delay-1"><div className="tool-number">04 / DEVICES</div><h3>Connect software to scanners</h3><p className="tool-explain">Integrate barcode hardware and industrial PDA software into fast inbound and outbound flows.</p><div className="tool-cloud"><span>Barcode scanners</span><span>Industrial PDA SDKs</span><span>Inbound workflows</span><span>Outbound workflows</span></div></div>
          <div className="tool-group reveal"><div className="tool-number">05 / DATA &amp; INTEGRATION</div><h3>Follow data across systems</h3><p className="tool-explain">Use SQL and system-level troubleshooting to trace mismatches between databases, interfaces, and automated equipment.</p><div className="tool-cloud"><span>MS SQL Server</span><span>Oracle SQL</span><span>Windows Server</span><span>System integration</span></div></div>
          <div className="tool-group reveal delay-1"><div className="tool-number">06 / DELIVERY</div><h3>Keep releases moving</h3><p className="tool-explain">Work with source control, CI/CD, mobile app consoles, and production support processes.</p><div className="tool-cloud"><span>Git</span><span>CI/CD</span><span>App Store Connect</span><span>Google Play Console</span><span>Production support</span></div></div>
        </div>
        <div className="languages reveal"><div className="language"><b>KO</b> Korean — Native</div><div className="language"><b>EN</b> English — Professional</div></div>
      </div>
    </section>
    <section className="contact" id="contact"><div className="wrap"><div className="contact-grid"><div className="reveal"><div className="eyebrow">06 / Contact</div><h2>Let’s make work<br />flow better.</h2><p className="contact-copy">Have an interesting system, product, or operational challenge? I’d be glad to connect.</p></div><div className="contact-actions reveal delay-1"><a href="mailto:juno880218@gmail.com">juno880218@gmail.com ↗</a><a href="tel:+14709695812">+1 (470) 969-5812 ↗</a><a href="./Junho-Kim-Resume.pdf" download="Junho-Kim-Resume.pdf">Download résumé PDF ↓</a><a href="#home">Back to top ↑</a></div></div><footer className="footer"><span>© {year} Junho Kim</span><span>Software · Systems · Operations</span><a href="#home">Back to top ↑</a></footer></div></section>
  </main>
  
    </>
  );
}
