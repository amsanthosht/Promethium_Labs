import { useEffect, useRef } from "react";
import RotatingWord from "../components/hero/RotatingWord.jsx";
import { useSEO } from "../hooks/useSEO.js";

const Home = () => {
  const heroRef = useRef(null);
  const blobRefs = useRef([]);
  useSEO({
    title: "Promethium Labs — Software Development & Digital Marketing",
    description: "Promethium Labs is a Chennai-based software lab building web apps, AI tools, mobile apps, and running results-driven digital marketing for startups and businesses across India.",
    keywords: "software development Chennai, web development India, AI tools, digital marketing agency India, React development, mobile app development India",
    path: "/",
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      const revObs = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("in");
              revObs.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.05 }
      );
      document
        .querySelectorAll(".rev, .rev-up, .rev-left, .rev-right, .rev-scale, .rev-clip")
        .forEach((el) => revObs.observe(el));

      const handleMouseMove = (e) => {
        if (!heroRef.current) return;
        const rect = heroRef.current.getBoundingClientRect();
        const cx = (e.clientX - rect.left) / rect.width - 0.5;
        const cy = (e.clientY - rect.top) / rect.height - 0.5;
        blobRefs.current.forEach((blob, i) => {
          if (!blob) return;
          const depth = (i + 1) * 12;
          blob.style.transform = `translate3d(${cx * depth}px, ${cy * depth}px, 0)`;
        });
      };

      const hero = heroRef.current;
      if (hero) hero.addEventListener("mousemove", handleMouseMove);
      return () => {
        revObs.disconnect();
        if (hero) hero.removeEventListener("mousemove", handleMouseMove);
      };
    }, 80);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="overflow-x-hidden" style={{ background: "#f4efe6", color: "#0d0d08" }}>

      {/* ══════════════════════════════════════════════════
          HERO — cream background, bold ink type
      ══════════════════════════════════════════════════ */}
      <section
        ref={heroRef}
        className="hero relative min-h-screen flex flex-col justify-center px-8 md:px-16 pt-32 pb-20 max-md:px-6"
        style={{ borderBottom: "1px solid rgba(13,13,8,0.08)" }}
      >
        <div className="hero-blob hero-blob-1" ref={(el) => (blobRefs.current[0] = el)} />
        <div className="hero-blob hero-blob-2" ref={(el) => (blobRefs.current[1] = el)} />
        <div className="hero-blob hero-blob-3" ref={(el) => (blobRefs.current[2] = el)} />
        <div className="hero-blob hero-blob-4" ref={(el) => (blobRefs.current[3] = el)} />
        <div className="hero-grain" />

        <div className="mx-auto w-full max-w-7xl relative z-10">
          <p className="rev-left font-mono text-[0.6rem] uppercase tracking-[0.2em] mb-8" style={{ color: "#10b981" }}>
            Est. 2026 · Chennai, India · Bootstrapped
          </p>

          {/* Display headline */}
          <h1 className="display-h mb-10" style={{ fontSize: "clamp(3.5rem, 9.5vw, 8rem)" }}>
            <span className="block rev-up rev-d1" style={{ color: "#0d0d08" }}>We build</span>
            <span className="block rev-up rev-d2" style={{ color: "#0d0d08" }}>
              things that&nbsp;<RotatingWord />
            </span>
          </h1>

          {/* Rule + body row */}
          <div className="pt-10 mt-2" style={{ borderTop: "1px solid rgba(13,13,8,0.1)" }}>
            <div className="flex flex-wrap items-start justify-between gap-10">
              <div>
                <p className="rev max-w-lg text-[1rem] leading-[1.75] font-light" style={{ color: "#7a7468" }}>
                  <strong style={{ color: "#0d0d08", fontWeight: 600 }}>Promethium Labs</strong> is an experimental
                  software lab building{" "}
                  <strong style={{ color: "#0d0d08", fontWeight: 600 }}>
                    AI tools, developer platforms,
                  </strong>{" "}
                  and digital products for startups and businesses. Based in Chennai. Built to last.
                </p>
                <p className="mt-4 font-mono text-[0.6rem] uppercase tracking-[0.14em]" style={{ color: "#10b981" }}>
                  ✦ 10+ projects shipped · 5 active clients · Est. 2026
                </p>
              </div>
              <div className="rev-right flex flex-wrap items-start gap-4 pt-1">
                <a href="/projects" className="cta-main">See Our Work</a>
                <a href="/contact" className="cta-ghost">Work With Us →</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          STATS TICKER
      ══════════════════════════════════════════════════ */}
      <div style={{ background: "#0d0d08", borderTop: "1px solid rgba(244,239,230,0.06)", borderBottom: "1px solid rgba(244,239,230,0.06)" }}>
        <div className="stats-bar">
          <div className="stats-track">
            {[1, 2].map((i) => (
              <div key={i} className="flex">
                {[
                  ["AI", "Products"], ["Software", "Development"],
                  ["Digital", "Marketing"], ["10+", "Projects"],
                  ["Chennai", "India"], ["2026", "Founded"],
                ].map(([n, l]) => (
                  <div key={n + l + i} className="stat-item"><span className="n">{n}</span><span className="l">{l}</span></div>
                ))}
              </div>
            ))}
          </div>
        </div>
        <div className="stats-bar" style={{ opacity: 0.65 }}>
          <div className="stats-track" style={{ animationDirection: "reverse", animationDuration: "42s" }}>
            {[1, 2].map((i) => (
              <div key={i} className="flex">
                {[
                  ["Fast", "Delivery"], ["Real", "Results"],
                  ["Zero", "Bullshit"], ["Live", "Projects"],
                  ["India", "Based Team"], ["Remote", "Friendly"],
                ].map(([n, l]) => (
                  <div key={n + l + i} className="stat-item"><span className="n">{n}</span><span className="l">{l}</span></div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════
          TRUST BAR — social proof
      ══════════════════════════════════════════════════ */}
      <section style={{ background: "#0d0d08", borderBottom: "1px solid rgba(244,239,230,0.06)" }} className="px-8 md:px-16 py-12 max-md:px-6">
        <div className="mx-auto max-w-7xl">
          <p className="font-mono text-[0.55rem] uppercase tracking-[0.2em] mb-8 text-center" style={{ color: "rgba(244,239,230,0.25)" }}>
            Trusted by startups &amp; businesses across India
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-0">
            {[
              { stat: "10+", label: "Projects Shipped" },
              { stat: "5+", label: "Active Clients" },
              { stat: "2", label: "Core Services" },
              { stat: "100%", label: "Remote Capable" },
            ].map((item, i) => (
              <div
                key={item.label}
                className="rev text-center py-8"
                style={{
                  borderLeft: i > 0 ? "1px solid rgba(244,239,230,0.06)" : "none",
                  transitionDelay: `${i * 0.08}s`,
                }}
              >
                <div className="font-sans font-black mb-1" style={{ fontSize: "clamp(2rem, 4vw, 3rem)", color: "#10b981" }}>
                  {item.stat}
                </div>
                <div className="font-mono text-[0.58rem] uppercase tracking-[0.14em]" style={{ color: "rgba(244,239,230,0.35)" }}>
                  {item.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          WHAT WE DO — AI Products first
      ══════════════════════════════════════════════════ */}
      <section style={{ background: "#10b981", color: "#0d0d08" }} className="px-8 md:px-16 py-20 max-md:px-6">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 pb-8" style={{ borderBottom: "1px solid rgba(13,13,8,0.15)" }}>
            <p className="rev-left font-mono text-[0.6rem] uppercase tracking-[0.2em]" style={{ color: "rgba(13,13,8,0.5)" }}>
              What we do
            </p>
            <a href="/services" className="rev-right font-mono text-[0.65rem] uppercase tracking-[0.14em] font-bold hover:underline" style={{ color: "#0d0d08" }}>
              See all services →
            </a>
          </div>

          <div className="space-y-0">
            {[
              { n: "01", title: "AI & Software Development", desc: "Web apps, APIs, AI integrations, and automation tools — built to scale.", href: "/services" },
              { n: "02", title: "Digital Marketing", desc: "SEO, social media, content strategy, and growth campaigns that convert.", href: "/services/digital-marketing" },
            ].map((svc, i) => (
              <a
                key={svc.n}
                href={svc.href}
                className="group flex items-center justify-between py-8 transition-all duration-300"
                style={{
                  borderTop: "1px solid rgba(13,13,8,0.15)",
                  animationDelay: `${i * 0.08}s`,
                }}
              >
                <div className="flex items-baseline gap-8">
                  <span className="font-mono text-[0.55rem] tracking-[0.14em] uppercase" style={{ color: "rgba(13,13,8,0.4)" }}>
                    {svc.n}
                  </span>
                  <div>
                    <div className="display-h transition-all duration-300 group-hover:translate-x-2"
                      style={{ fontSize: "clamp(1.8rem, 3.5vw, 3rem)", color: "#0d0d08" }}>
                      {svc.title}
                    </div>
                    <p className="text-[0.85rem] mt-1 font-light" style={{ color: "rgba(13,13,8,0.6)" }}>{svc.desc}</p>
                  </div>
                </div>
                <span className="text-2xl transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" style={{ color: "rgba(13,13,8,0.4)" }}>
                  ↗
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          PROJECTS IN PROGRESS
      ══════════════════════════════════════════════════ */}
      <section style={{ background: "#0d0d08", color: "#f4efe6" }} className="px-8 md:px-16 py-24 max-md:px-6">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 pb-10" style={{ borderBottom: "1px solid rgba(244,239,230,0.06)" }}>
            <div>
              <p className="rev-left font-mono text-[0.6rem] uppercase tracking-[0.2em] mb-4" style={{ color: "#10b981" }}>
                What we&apos;re building
              </p>
              <h2 className="section-h rev-up" style={{ fontSize: "clamp(2rem, 4.5vw, 4rem)", color: "#f4efe6" }}>
                Projects in progress.
              </h2>
            </div>
            <a href="/projects" className="rev-right font-mono text-[0.65rem] uppercase tracking-[0.14em] font-bold hover:text-greenMid transition-colors" style={{ color: "rgba(244,239,230,0.4)" }}>
              View all →
            </a>
          </div>

          <div className="grid md:grid-cols-3 gap-0">
            {[
              {
                id: "01",
                name: "Promethium Learn",
                desc: "Developer learning platform with structured paths for modern technologies.",
                tags: ["Education", "Platform"],
              },
              {
                id: "02",
                name: "DevForge",
                desc: "Experimental developer toolkit for building and deploying modern web apps.",
                tags: ["Developer Tools", "CLI"],
              },
              {
                id: "03",
                name: "AI Assist",
                desc: "AI-powered productivity assistant to help developers automate workflows.",
                tags: ["AI", "Productivity"],
              },
            ].map((p, i) => (
              <div
                key={p.id}
                className="rev py-10 pr-6"
                style={{
                  borderTop: "1px solid rgba(244,239,230,0.06)",
                  transitionDelay: `${i * 0.1}s`,
                }}
              >
                <div className="flex items-center justify-between mb-5">
                  <span className="font-mono text-[0.55rem] tracking-[0.14em] uppercase" style={{ color: "rgba(244,239,230,0.2)" }}>{p.id}</span>
                  <span
                    className="font-mono text-[0.55rem] uppercase tracking-[0.1em] px-3 py-1"
                    style={{ border: "1px solid rgba(16,185,129,0.3)", color: "#10b981" }}
                  >
                    In Progress
                  </span>
                </div>
                <h3 className="section-h mb-3" style={{ fontSize: "clamp(1.4rem, 2.2vw, 1.9rem)", color: "#f4efe6" }}>{p.name}</h3>
                <p className="text-[0.88rem] leading-[1.8] font-light mb-5" style={{ color: "rgba(244,239,230,0.5)" }}>{p.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {p.tags.map((t) => (
                    <span key={t} className="font-mono text-[0.58rem] uppercase tracking-[0.1em] px-2.5 py-1" style={{ border: "1px solid rgba(244,239,230,0.1)", color: "rgba(244,239,230,0.35)" }}>{t}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div style={{ borderTop: "1px solid rgba(244,239,230,0.06)" }} />
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          MANIFESTO
      ══════════════════════════════════════════════════ */}
      <section style={{ background: "#f4efe6", color: "#0d0d08" }} className="px-8 md:px-16 py-28 max-md:px-6">
        <div className="mx-auto max-w-7xl">
          <p className="rev font-mono text-[0.6rem] uppercase tracking-[0.2em] mb-10" style={{ color: "#10b981" }}>
            [ Who We Are ]
          </p>
          <h2 className="section-h rev-up mb-12" style={{ fontSize: "clamp(2.5rem, 6vw, 5.5rem)", color: "#0d0d08" }}>
            An experimental lab.
            <br />
            <span style={{ color: "#10b981" }}>Building things that matter.</span>
          </h2>
          <div className="pt-10" style={{ borderTop: "1px solid rgba(13,13,8,0.08)" }}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <p className="rev text-[1rem] leading-[1.9] font-light" style={{ color: "#7a7468" }}>
                Promethium Labs is a{" "}
                <strong style={{ color: "#0d0d08", fontWeight: 500 }}>bootstrapped startup</strong>{" "}
                in Chennai building modern AI solutions, developer tools, and digital platforms. Small team. High conviction. We work with startups, businesses, and creators.
              </p>
              <div className="rev-right space-y-6">
                <p className="text-[1rem] leading-[1.9] font-light" style={{ color: "#7a7468" }}>
                  We work across{" "}
                  <strong style={{ color: "#0d0d08", fontWeight: 500 }}>AI &amp; software development</strong>{" "}
                  and{" "}
                  <strong style={{ color: "#0d0d08", fontWeight: 500 }}>digital marketing</strong>{" "}
                  — two disciplines that compound when done together. Built to move fast.
                </p>
                <div
                  className="inline-flex items-center gap-2 px-4 py-2 font-mono text-[0.6rem] tracking-[0.12em] uppercase"
                  style={{ border: "1px solid rgba(16,185,129,0.3)", color: "#10b981" }}
                >
                  ✦ Promethium — the element of energy &amp; possibility
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          TECH STACK
      ══════════════════════════════════════════════════ */}
      <section style={{ background: "#0d0d08", color: "#f4efe6" }} className="px-8 md:px-16 py-20 max-md:px-6">
        <div className="mx-auto max-w-7xl">
          <p className="rev-left font-mono text-[0.6rem] uppercase tracking-[0.2em] mb-12" style={{ color: "#10b981" }}>
            Our tech stack
          </p>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-0">
            {[
              { icon: "⬡", name: "React / Next.js", sub: "Frontend" },
              { icon: "◈", name: "Node.js", sub: "Backend" },
              { icon: "◎", name: "Python", sub: "AI / Scripting" },
              { icon: "◉", name: "AI / ML", sub: "Intelligence" },
              { icon: "◌", name: "Cloud Platforms", sub: "Infrastructure" },
            ].map((tech, i) => (
              <div
                key={tech.name}
                className="rev py-8 pr-6"
                style={{
                  borderTop: "1px solid rgba(244,239,230,0.06)",
                  transitionDelay: `${i * 0.07}s`,
                }}
              >
                <div className="text-2xl mb-4 opacity-30">{tech.icon}</div>
                <div className="font-sans font-semibold text-[0.95rem] mb-1" style={{ color: "#f4efe6" }}>{tech.name}</div>
                <div className="font-mono text-[0.58rem] uppercase tracking-[0.12em]" style={{ color: "#10b981" }}>{tech.sub}</div>
              </div>
            ))}
          </div>
          <div style={{ borderTop: "1px solid rgba(244,239,230,0.06)" }} />
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          CTA SECTION
      ══════════════════════════════════════════════════ */}
      <section
        style={{ background: "#f4efe6", color: "#0d0d08" }}
        className="px-8 md:px-16 py-24 max-md:px-6"
      >
        <div className="mx-auto max-w-7xl flex flex-col md:flex-row md:items-end justify-between gap-12">
          <div>
            <p className="font-mono text-[0.6rem] uppercase tracking-[0.2em] mb-6" style={{ color: "rgba(13,13,8,0.4)" }}>
              Ready to start?
            </p>
            <h2 className="display-h rev-up" style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", color: "#0d0d08" }}>
              Let&apos;s make something
              <br />
              <span style={{ color: "#10b981" }}>worth making.</span>
            </h2>
          </div>
          <div className="flex flex-col sm:flex-row flex-wrap gap-4 shrink-0">
            <a
              href="/contact"
              className="rev-right inline-flex items-center gap-3 font-sans font-bold text-[0.75rem] tracking-[0.1em] uppercase px-8 py-4 transition-all duration-300"
              style={{ background: "#10b981", color: "#0d0d08" }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#00e676")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "#10b981")}
            >
              Work With Us →
            </a>
            <a
              href="/careers"
              className="rev-right inline-flex items-center gap-3 font-sans font-bold text-[0.75rem] tracking-[0.1em] uppercase px-8 py-4 transition-all duration-300"
              style={{ border: "1px solid rgba(13,13,8,0.2)", color: "#0d0d08" }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#10b981"; e.currentTarget.style.color = "#10b981"; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(13,13,8,0.2)"; e.currentTarget.style.color = "#0d0d08"; }}
            >
              Join Our Team →
            </a>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;
