import { useEffect } from "react";
import { useSEO } from "../hooks/useSEO.js";

const services = [
  {
    id: "01",
    title: "Web Development",
    eyebrow: "From landing page to full platform",
    body: "Responsive, fast, and beautiful websites and web apps — built for real users and real traffic. We work across the full stack, from pixel-perfect frontends to robust backend systems.",
    bullets: [
      "Landing pages & marketing sites",
      "Full-stack web applications",
      "E-commerce & product stores",
      "Admin dashboards & internal tools",
      "CMS integration (headless & traditional)",
    ],
    tag: "Start a project →",
    href: "/contact",
  },
  {
    id: "02",
    title: "Software Development",
    eyebrow: "Custom software, built to last",
    body: "Bespoke software engineered to fit your business processes exactly. We architect, build, and maintain production-grade systems — scalable, maintainable, and delivered on time.",
    bullets: [
      "SaaS product development",
      "Backend systems & APIs",
      "Database design & optimisation",
      "Third-party integrations & webhooks",
      "Legacy system modernisation",
    ],
    tag: "Talk requirements →",
    href: "/contact",
  },
  {
    id: "03",
    title: "AI & Automation",
    eyebrow: "Intelligent systems that do the work",
    body: "We integrate AI and automation into your products and workflows — cutting manual effort, surfacing insights, and giving your team superpowers without the overhead.",
    bullets: [
      "LLM integrations (OpenAI, Gemini, etc.)",
      "Custom AI-powered features",
      "Workflow automation & bots",
      "Data pipelines & processing",
      "Chatbots & conversational UI",
    ],
    tag: "Explore AI →",
    href: "/contact",
  },
  {
    id: "04",
    title: "Mobile App Development",
    eyebrow: "iOS, Android & cross-platform",
    body: "Mobile apps that users actually keep. We design and build native-quality mobile experiences using React Native — one codebase, two platforms, no compromise on feel.",
    bullets: [
      "React Native cross-platform apps",
      "iOS & Android deployment",
      "Offline-first architecture",
      "Push notifications & real-time features",
      "App Store & Play Store submission",
    ],
    tag: "Build your app →",
    href: "/contact",
  },
  {
    id: "05",
    title: "API & Backend Services",
    eyebrow: "The engine under the hood",
    body: "Solid, well-documented APIs and backend services that power your product. We build RESTful and GraphQL APIs, design scalable architectures, and handle the heavy lifting.",
    bullets: [
      "REST & GraphQL API design",
      "Authentication & security (OAuth, JWT)",
      "Cloud deployment (AWS, GCP, Vercel)",
      "Scalable microservice architecture",
      "Performance monitoring & logging",
    ],
    tag: "Get in touch →",
    href: "/contact",
  },
  {
    id: "06",
    title: "UI/UX Design",
    eyebrow: "Design that earns trust",
    body: "Great software starts with great design. We produce high-fidelity UI designs, interactive prototypes, and complete design systems that make development faster and products better.",
    bullets: [
      "Product & interface design (Figma)",
      "Design system & component library",
      "User research & wireframing",
      "Interactive prototypes",
      "Handoff-ready specs for developers",
    ],
    tag: "See design work →",
    href: "/contact",
  },
];

const ServiceRow = ({ svc }) => {
  return (
    <a
      href={svc.href}
      className="svc-row group"
    >
      {/* Left: Number + Title */}
      <div className="flex items-baseline gap-6 min-w-0">
        <span
          className="font-mono text-[0.55rem] tracking-[0.14em] uppercase shrink-0 transition-colors duration-300"
          style={{ color: "rgba(244,239,230,0.3)" }}
        >
          {svc.id}
        </span>
        <div>
          <p className="font-mono text-[0.6rem] uppercase tracking-[0.16em] text-greenMid mb-2 group-hover:text-cream/70 transition-colors duration-300">
            {svc.eyebrow}
          </p>
          <span className="svc-row-title">{svc.title}</span>
        </div>
      </div>

      {/* Right: Tag + Arrow */}
      <div className="flex items-center gap-6 shrink-0">
        <span className="svc-row-tag hidden md:inline-flex">{svc.tag}</span>
        <span className="svc-row-arrow">↗</span>
      </div>
    </a>
  );
};

const ServiceDetail = ({ svc }) => (
  <div className="px-8 md:px-16 py-14 border-t border-white/[0.06] bg-ink/50 rev">
    <div className="mx-auto max-w-7xl grid md:grid-cols-2 gap-12">
      <p className="text-cream/60 text-[0.95rem] leading-[1.85] font-light">{svc.body}</p>
      <ul className="space-y-3">
        {svc.bullets.map((item) => (
          <li key={item} className="flex items-start gap-3 text-[0.85rem] text-cream/55">
            <span className="mt-[5px] h-[3px] w-[3px] rounded-full bg-greenMid shrink-0" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  </div>
);

const ServicesPage = () => {
  useSEO({
    title: "Software & Web Development Services — Promethium Labs",
    description: "Promethium Labs builds web apps, custom software, AI tools, mobile apps, APIs, and UI/UX designs. Based in Chennai — fast, scalable, and built to last.",
    keywords: "web development Chennai, software development, AI integration, mobile app development, API development, UI UX design India",
    path: "/services",
  });

  useEffect(() => {
    const revObs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            revObs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08 }
    );
    document
      .querySelectorAll(".rev, .rev-up, .rev-left, .rev-right, .rev-clip")
      .forEach((el) => revObs.observe(el));
    return () => revObs.disconnect();
  }, []);

  return (
    <main style={{ background: "#0d0d08", color: "#f4efe6" }} className="min-h-screen">

      {/* ── HERO ───────────────────────────────────────── */}
      <section className="px-8 md:px-16 pt-36 pb-20 max-md:px-6">
        <div className="mx-auto max-w-7xl">
          <p className="rev-left font-mono text-[0.6rem] uppercase tracking-[0.2em] text-greenMid mb-8">
            Services · Software & Web Dev
          </p>
          <h1 className="section-h text-[clamp(3rem,8vw,7rem)] rev-up mb-8">
            We build things
            <br />
            <span style={{ color: "#10b981" }}>that work.</span>
          </h1>
          <div className="rule-top-dark pt-8">
            <p className="rev max-w-2xl text-cream/55 text-[0.95rem] leading-[1.85] font-light">
              From a simple landing page to a complex AI-powered platform — we handle every layer
              of software and web development with the same level of care and craftsmanship.
            </p>
          </div>
        </div>
      </section>

      {/* ── SERVICE ROWS ─────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-8 md:px-16 pb-4 max-md:px-6">
        {services.map((svc, idx) => (
          <ServiceRow key={svc.id} svc={svc} index={idx} />
        ))}
      </section>

      {/* ── SERVICE DETAIL PANELS ────────────────────── */}
      <section style={{ borderTop: "1px solid rgba(244,239,230,0.06)" }} className="mt-4">
        {services.map((svc) => (
          <ServiceDetail key={svc.id} svc={svc} />
        ))}
      </section>

      {/* ── HOW WE WORK ──────────────────────────────── */}
      <section className="px-8 md:px-16 py-24 max-md:px-6" style={{ background: "#10b981", color: "#0d0d08" }}>
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 pb-10" style={{ borderBottom: "1px solid rgba(13,13,8,0.15)" }}>
            <p className="rev-left font-mono text-[0.6rem] uppercase tracking-[0.2em]" style={{ color: "rgba(13,13,8,0.5)" }}>
              How we work
            </p>
            <h2 className="section-h rev-up" style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", color: "#0d0d08" }}>
              Simple process.<br />No surprises.
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-0">
            {[
              { n: "01", title: "Discovery", desc: "We learn your business, goals, and constraints. One focused call — no bloated intake forms." },
              { n: "02", title: "Proposal", desc: "You get a clear scope, timeline, and fixed quote within 48 hours. Nothing hidden." },
              { n: "03", title: "Build", desc: "We ship in iterations. You see real progress weekly — no disappearing for months." },
              { n: "04", title: "Launch", desc: "We handle deployment, QA, and post-launch support. You own everything, always." },
            ].map((step, i) => (
              <div
                key={step.n}
                className="rev py-10 pr-8"
                style={{
                  borderTop: "1px solid rgba(13,13,8,0.15)",
                  transitionDelay: `${i * 0.08}s`,
                }}
              >
                <span className="font-mono text-[0.55rem] tracking-[0.14em] uppercase block mb-4" style={{ color: "rgba(13,13,8,0.4)" }}>{step.n}</span>
                <h3 className="section-h text-[1.4rem] mb-3" style={{ color: "#0d0d08" }}>{step.title}</h3>
                <p className="text-[0.88rem] leading-[1.8] font-light" style={{ color: "rgba(13,13,8,0.65)" }}>{step.desc}</p>
              </div>
            ))}
          </div>
          <div style={{ borderTop: "1px solid rgba(13,13,8,0.15)" }} />
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────── */}
      <section className="px-8 md:px-16 py-24 max-md:px-6" style={{ borderTop: "1px solid rgba(244,239,230,0.06)" }}>
        <div className="mx-auto max-w-7xl flex flex-col md:flex-row md:items-end justify-between gap-12">
          <div>
            <p className="font-mono text-[0.6rem] uppercase tracking-[0.2em] mb-4" style={{ color: "rgba(244,239,230,0.3)" }}>Ready to build?</p>
            <h2 className="display-h rev-up" style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)", color: "#f4efe6" }}>
              Let&apos;s build something
              <br />
              <span style={{ color: "#10b981" }}>worth shipping.</span>
            </h2>
          </div>
          <div className="flex flex-wrap gap-4">
            <a
              href="/contact"
              className="inline-flex items-center gap-3 font-sans font-bold text-[0.75rem] tracking-[0.1em] uppercase px-8 py-4 transition-all duration-300"
              style={{ background: "#10b981", color: "#0d0d08" }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#34d399")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "#10b981")}
            >
              Start a project →
            </a>
            <a
              href="/services/digital-marketing"
              className="inline-flex items-center gap-3 font-sans font-bold text-[0.75rem] tracking-[0.1em] uppercase px-8 py-4 transition-all duration-300"
              style={{ border: "1px solid rgba(244,239,230,0.2)", color: "#f4efe6" }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#10b981"; e.currentTarget.style.color = "#10b981"; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(244,239,230,0.2)"; e.currentTarget.style.color = "#f4efe6"; }}
            >
              Digital marketing →
            </a>
          </div>
        </div>
      </section>

    </main>
  );
};

export default ServicesPage;
