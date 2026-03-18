import { useEffect, useRef, useState } from "react";
import { useMagnetic } from "../hooks/useMagnetic";
import { useSEO } from "../hooks/useSEO";

// ─────────────────────────────────────────────────────────────
//  JOB DATA
// ─────────────────────────────────────────────────────────────
const fullTimeRoles = [
  {
    id: "FT-01",
    title: "Frontend Developer",
    type: "Full-time",
    location: "Remote / Chennai",
    status: "Opening Soon",
    stack: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
    about:
      "Build the interfaces of our AI products and developer tools. You'll own the frontend architecture, work closely with Santhosh (CTO), and ship things users actually touch.",
    responsibilities: [
      "Architect and build performant React/Next.js applications",
      "Translate design into pixel-perfect, accessible UI",
      "Collaborate on product decisions — we want your opinion",
      "Write clean, documented, maintainable code",
    ],
    requirements: [
      "Strong proficiency in React and modern JavaScript/TypeScript",
      "Experience with CSS-in-JS or utility-first CSS",
      "Understanding of web performance and accessibility",
      "Ability to work independently and communicate clearly",
    ],
    nice: ["Next.js App Router experience", "Framer Motion or animation libraries", "Open source contributions"],
  },
  {
    id: "FT-02",
    title: "Backend Developer",
    type: "Full-time",
    location: "Remote / Chennai",
    status: "Opening Soon",
    stack: ["Node.js", "Python", "PostgreSQL", "REST APIs"],
    about:
      "Design and build the backend systems powering our products. APIs, databases, authentication, and server logic — you'll be building the engine under the hood.",
    responsibilities: [
      "Build and maintain scalable REST APIs and backend services",
      "Design database schemas and manage data models",
      "Implement authentication, security, and performance optimizations",
      "Deploy and monitor services on cloud platforms",
    ],
    requirements: [
      "Proficiency in Node.js or Python (or both)",
      "Experience with relational databases (PostgreSQL / MySQL)",
      "Understanding of REST API design principles",
      "Familiarity with cloud deployment (AWS/GCP/DigitalOcean)",
    ],
    nice: ["GraphQL experience", "Docker and CI/CD pipelines", "Experience with AI/ML APIs"],
  },
  {
    id: "FT-03",
    title: "AI / ML Engineer",
    type: "Full-time",
    location: "Remote / Chennai",
    status: "Opening Soon",
    stack: ["Python", "PyTorch / TF", "LLMs", "APIs"],
    about:
      "We're building AI-powered products and we need someone who understands how models actually work — not just how to call an API. You'll design AI features, integrate LLMs, and build automation systems.",
    responsibilities: [
      "Integrate large language models (OpenAI, Anthropic, open-source) into products",
      "Build AI automation workflows and pipelines",
      "Evaluate model performance and improve output quality",
      "Research and prototype new AI-powered features",
    ],
    requirements: [
      "Strong Python skills and ML fundamentals",
      "Experience with LLM APIs (OpenAI, HuggingFace, etc.)",
      "Understanding of prompt engineering and RAG",
      "Ability to move fast and experiment",
    ],
    nice: ["Fine-tuning experience", "Vector databases (Pinecone, Weaviate)", "LangChain / LlamaIndex"],
  },
  {
    id: "FT-04",
    title: "Digital Marketing Specialist",
    type: "Full-time / Part-time",
    location: "Remote",
    status: "Opening Soon",
    stack: ["SEO", "Google Ads", "Analytics", "Content"],
    about:
      "Own the marketing for Promethium Labs and our client portfolio. You'll run campaigns, write copy, manage social channels, and track what actually works.",
    responsibilities: [
      "Plan and execute SEO, paid ads, and social media campaigns",
      "Write compelling copy for landing pages, emails, and social posts",
      "Track campaign performance and report real numbers",
      "Manage client marketing projects end-to-end",
    ],
    requirements: [
      "Experience with Google Ads, Meta Ads, or LinkedIn Ads",
      "Working knowledge of SEO fundamentals",
      "Strong writing skills in English",
      "Analytical mindset — you care about data, not vanity metrics",
    ],
    nice: ["Experience with Notion / project management tools", "Basic design skills (Canva/Figma)", "Content marketing experience"],
  },
];

const internRoles = [
  {
    id: "IN-01",
    title: "Web Development Intern",
    tags: ["Remote", "Mentored", "Certificate"],
    body: "Build real full-stack web applications. You'll work on live projects using React and Node.js — not fake assignments.",
  },
  {
    id: "IN-02",
    title: "Digital Marketing Intern",
    tags: ["Remote", "Stipend", "Certificate"],
    body: "Run real campaigns for real clients. SEO, ad copy, social strategy, and analytics — you'll own the whole loop.",
  },
  {
    id: "IN-03",
    title: "UI/UX Design Intern",
    tags: ["Remote", "Portfolio-heavy", "Mentored"],
    body: "Design user flows and interfaces that people actually use. Figma-based work with real user feedback.",
  },
  {
    id: "IN-04",
    title: "Content Strategy Intern",
    tags: ["Remote", "Writing-heavy", "Certificate"],
    body: "Write content that converts — landing pages, scripts, emails, and social posts for real brands.",
  },
];

const faqs = [
  {
    q: "Is the internship paid?",
    a: "Top performers receive a stipend. All interns receive a verified certificate of completion backed by shipped work, not just attendance.",
  },
  {
    q: "What is the internship duration?",
    a: "8–12 weeks depending on the role and project scope. We're flexible — we discuss start dates and timelines together.",
  },
  {
    q: "Do I need prior experience to apply?",
    a: "Not necessarily. We look for curiosity, the ability to learn fast, and a genuine interest in the domain. A small portfolio or GitHub/Behance profile helps.",
  },
  {
    q: "Can I work remotely?",
    a: "Yes, all roles are remote-friendly. We're based in Chennai but we work async and don't require you to be local.",
  },
  {
    q: "How quickly will I hear back after applying?",
    a: "We review all applications personally within 3 business days. If you're a good fit, we'll schedule a quick 20-30 minute call.",
  },
  {
    q: "What technologies will I use?",
    a: "Depends on the role: Web Dev uses React, Node.js, and modern tooling. Marketing uses Google tools, analytics platforms, and content systems. Design uses Figma.",
  },
  {
    q: "When will the full-time roles open?",
    a: "We're early stage and growing. Full-time openings will be posted as we scale — follow our GitHub or email us and we'll notify you directly.",
  },
];

// Terminal component (reused from before)
const Terminal = () => {
  const [lines, setLines] = useState([]);
  const terminalRef = useRef(null);
  const hasAnimated = useRef(false);
  const terminalData = [
    { text: "❯ ./check-openings.sh", dim: true },
    { text: "Connecting to portal...", dim: true },
    { text: "✓ Web Development — Open", green: true },
    { text: "✓ Digital Marketing — Open", green: true },
    { text: "✓ UI/UX Design — Open", green: true },
    { text: "✓ Content Strategy — Open", green: true },
    { text: "❯ apply --now_", dim: false },
  ];
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          let cumDelay = 0;
          terminalData.forEach((line, i) => {
            cumDelay += i === 0 ? 200 : 400;
            setTimeout(() => {
              setLines((prev) => [...prev, { ...line, currentText: "" }]);
              let charIdx = 0;
              const typeInterval = setInterval(() => {
                charIdx++;
                setLines((prev) => {
                  const updated = [...prev];
                  updated[updated.length - 1].currentText = line.text.slice(0, charIdx);
                  return updated;
                });
                if (charIdx >= line.text.length) clearInterval(typeInterval);
              }, 18);
            }, cumDelay);
          });
        }
      },
      { threshold: 0.3 }
    );
    if (terminalRef.current) observer.observe(terminalRef.current);
    return () => observer.disconnect();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div ref={terminalRef} className="overflow-hidden font-mono text-[0.75rem] leading-relaxed"
      style={{ background: "rgba(13,13,8,0.85)", border: "1px solid rgba(16,185,129,0.15)", backdropFilter: "blur(10px)", padding: "1.5rem", minHeight: "200px" }}>
      <div className="flex gap-2 mb-4 opacity-40">
        <span className="w-3 h-3 rounded-full bg-red-400" />
        <span className="w-3 h-3 rounded-full bg-yellow-400" />
        <span className="w-3 h-3 rounded-full" style={{ background: "#10b981" }} />
      </div>
      <div className="space-y-1.5 min-h-[150px]">
        {lines.map((line, i) => (
          <div key={i} style={{ color: line.green ? "#10b981" : line.dim ? "rgba(244,239,230,0.3)" : "rgba(244,239,230,0.75)" }}>
            {line.currentText}
            {i === lines.length - 1 && <span className="animate-pulse">_</span>}
          </div>
        ))}
      </div>
    </div>
  );
};

// FAQ Accordion
const FAQItem = ({ q, a, i }) => {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="border-t cursor-pointer"
      style={{ borderColor: "rgba(244,239,230,0.06)" }}
      onClick={() => setOpen((o) => !o)}
    >
      <div className="flex items-center justify-between py-6 gap-4">
        <div className="flex items-baseline gap-6">
          <span className="font-mono text-[0.55rem] tracking-[0.14em] uppercase shrink-0" style={{ color: "rgba(244,239,230,0.2)" }}>
            {String(i + 1).padStart(2, "0")}
          </span>
          <h3 className="font-sans font-semibold text-[1rem]" style={{ color: "#f4efe6" }}>{q}</h3>
        </div>
        <span
          className="text-lg shrink-0 transition-transform duration-300"
          style={{ color: "#10b981", transform: open ? "rotate(45deg)" : "none" }}
        >
          +
        </span>
      </div>
      <div
        className="overflow-hidden transition-all duration-400"
        style={{ maxHeight: open ? "200px" : "0", opacity: open ? 1 : 0 }}
      >
        <p className="faq-answer pl-0 sm:pl-10 pb-6 text-[0.9rem] leading-[1.85] font-light" style={{ color: "rgba(244,239,230,0.5)" }}>
          {a}
        </p>
      </div>
    </div>
  );
};

// Job Detail Card
const JobCard = ({ role, i }) => {
  const [expanded, setExpanded] = useState(false);
  return (
    <div
      className="rev border-t"
      style={{ borderColor: "rgba(244,239,230,0.06)", transitionDelay: `${i * 0.06}s` }}
    >
      <div
        className="flex items-start justify-between py-8 cursor-pointer group"
        onClick={() => setExpanded((o) => !o)}
      >
        <div className="flex items-start gap-6 min-w-0">
          <span className="font-mono text-[0.55rem] tracking-[0.14em] uppercase mt-1.5 shrink-0" style={{ color: "rgba(244,239,230,0.2)" }}>
            {role.id}
          </span>
          <div>
            <div className="flex flex-wrap items-center gap-3 mb-2">
              <span
                className="font-mono text-[0.55rem] uppercase tracking-[0.1em] px-2.5 py-1"
                style={{ border: "1px solid rgba(244,239,230,0.12)", color: "rgba(244,239,230,0.35)" }}
              >
                {role.type}
              </span>
              <span
                className="font-mono text-[0.55rem] uppercase tracking-[0.1em] px-2.5 py-1"
                style={{ border: "1px solid rgba(16,185,129,0.25)", color: "#10b981" }}
              >
                {role.status}
              </span>
            </div>
            <h3
              className="section-h mb-1 transition-all duration-300 group-hover:translate-x-1"
              style={{ fontSize: "clamp(1.5rem, 2.5vw, 2.2rem)", color: "#f4efe6" }}
            >
              {role.title}
            </h3>
            <p className="font-mono text-[0.6rem] uppercase tracking-[0.12em]" style={{ color: "#10b981" }}>
              {role.location}
            </p>
            <div className="flex flex-wrap gap-2 mt-3">
              {role.stack.map((t) => (
                <span key={t} className="font-mono text-[0.58rem] uppercase tracking-[0.08em] px-2.5 py-1"
                  style={{ border: "1px solid rgba(244,239,230,0.08)", color: "rgba(244,239,230,0.3)" }}>{t}</span>
              ))}
            </div>
          </div>
        </div>
        <span
          className="text-xl shrink-0 mt-1 transition-transform duration-300"
          style={{ color: "rgba(244,239,230,0.3)", transform: expanded ? "rotate(45deg)" : "none" }}
        >
          +
        </span>
      </div>

      {/* Expanded detail */}
      <div
        className="overflow-hidden transition-all duration-500"
        style={{ maxHeight: expanded ? "900px" : "0", opacity: expanded ? 1 : 0 }}
      >
        <div className="job-expand-panel pl-0 md:pl-12 pb-10 grid md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <p className="font-mono text-[0.58rem] uppercase tracking-[0.14em] mb-3" style={{ color: "#10b981" }}>About the role</p>
              <p className="text-[0.9rem] leading-[1.85] font-light" style={{ color: "rgba(244,239,230,0.55)" }}>{role.about}</p>
            </div>
            <div>
              <p className="font-mono text-[0.58rem] uppercase tracking-[0.14em] mb-3" style={{ color: "#10b981" }}>What you&apos;ll do</p>
              <ul className="space-y-2">
                {role.responsibilities.map((r) => (
                  <li key={r} className="flex items-start gap-3 text-[0.87rem] font-light" style={{ color: "rgba(244,239,230,0.5)" }}>
                    <span className="mt-2 h-[3px] w-[3px] rounded-full shrink-0" style={{ background: "#10b981" }} />
                    {r}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="space-y-6">
            <div>
              <p className="font-mono text-[0.58rem] uppercase tracking-[0.14em] mb-3" style={{ color: "#10b981" }}>What we need</p>
              <ul className="space-y-2">
                {role.requirements.map((r) => (
                  <li key={r} className="flex items-start gap-3 text-[0.87rem] font-light" style={{ color: "rgba(244,239,230,0.5)" }}>
                    <span className="mt-2 h-[3px] w-[3px] rounded-full shrink-0" style={{ background: "#10b981" }} />
                    {r}
                  </li>
                ))}
              </ul>
            </div>
            {role.nice && (
              <div>
                <p className="font-mono text-[0.58rem] uppercase tracking-[0.14em] mb-3" style={{ color: "rgba(244,239,230,0.3)" }}>Nice to have</p>
                <ul className="space-y-2">
                  {role.nice.map((r) => (
                    <li key={r} className="flex items-start gap-3 text-[0.87rem] font-light" style={{ color: "rgba(244,239,230,0.35)" }}>
                      <span className="mt-2 h-[3px] w-[3px] rounded-full shrink-0 opacity-50" style={{ background: "#10b981" }} />
                      {r}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <a
              href={`mailto:promethiumlabspvtltd@gmail.com?subject=Application — ${role.title}&body=Hi, I'd like to apply for the ${role.title} role at Promethium Labs.%0A%0AAbout me:%0A%0APortfolio/GitHub:%0A%0AWhy Promethium Labs:`}
              className="inline-flex items-center gap-2 font-sans font-bold text-[0.72rem] tracking-[0.1em] uppercase px-6 py-3 transition-all duration-300 mt-2"
              style={{ background: "#10b981", color: "#0d0d08" }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#34d399")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "#10b981")}
              onClick={(e) => e.stopPropagation()}
            >
              Apply for this role →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────
//  PAGE
// ─────────────────────────────────────────────────────────────
const CareersPage = () => {
  const careersCtaRef = useMagnetic(0.25);
  useSEO({
    title: "Careers",
    description:
      "Join Promethium Labs. We're hiring Frontend Developers, Backend Developers, AI Engineers, and Digital Marketing Specialists. Internship program open for students and freshers.",
    keywords: "careers Promethium Labs, jobs Chennai startup, AI developer jobs, software developer internship India",
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
      document.querySelectorAll(".rev, .rev-left, .rev-right, .rev-up, .rev-scale").forEach((el) => revObs.observe(el));
      return () => revObs.disconnect();
    }, 80);
    return () => clearTimeout(timer);
  }, []);

  return (
    <main style={{ background: "#0d0d08", color: "#f4efe6" }} className="min-h-screen overflow-x-hidden">

      {/* ── HERO ─────────────────────────────── */}
      <section className="relative min-h-screen flex flex-col justify-end px-8 md:px-16 pb-20 max-md:px-6 overflow-hidden">
        <div className="absolute pointer-events-none" style={{ width: "600px", height: "600px", borderRadius: "50%", background: "radial-gradient(circle, rgba(16,185,129,0.18) 0%, rgba(16,185,129,0) 70%)", top: "-100px", right: "-100px" }} />
        <div className="absolute pointer-events-none" style={{ width: "300px", height: "300px", borderRadius: "50%", background: "radial-gradient(circle, rgba(16,185,129,0.08) 0%, transparent 70%)", bottom: "20%", left: "-80px" }} />

        <div className="relative z-10 mx-auto w-full max-w-7xl pt-28 md:pt-0">
          <p className="rev-left font-mono text-[0.6rem] uppercase tracking-[0.2em] mb-8" style={{ color: "#10b981" }}>
            Careers at Promethium Labs
          </p>
          <h1 className="display-h rev-up mb-8" style={{ fontSize: "clamp(4rem, 10vw, 9rem)", color: "#f4efe6" }}>
            We&apos;re hiring.
            <br />
            <span style={{ color: "#10b981" }}>Come build with us.</span>
          </h1>
          <div className="pt-8 rev" style={{ borderTop: "1px solid rgba(244,239,230,0.08)" }}>
            <div className="flex flex-wrap items-start justify-between gap-10">
              <div className="max-w-lg">
                <p className="text-[1rem] leading-[1.8] font-light mb-6" style={{ color: "rgba(244,239,230,0.6)" }}>
                  We&apos;re a small team in Chennai building AI tools, developer platforms, and digital
                  products. We move fast, care deeply about craft, and give everyone ownership over their work.
                  No red tape. No useless meetings.
                </p>
                <div className="flex flex-wrap gap-8">
                  {[
                    { label: "Stage", value: "Early-stage" },
                    { label: "Location", value: "Remote / Chennai" },
                    { label: "Team size", value: "2–5 + collaborators" },
                    { label: "Model", value: "Bootstrapped" },
                  ].map((s) => (
                    <div key={s.label}>
                      <p className="font-mono text-[0.56rem] uppercase tracking-[0.14em]" style={{ color: "rgba(244,239,230,0.3)" }}>{s.label}</p>
                      <p className="font-sans font-semibold text-[0.88rem] mt-0.5" style={{ color: "#f4efe6" }}>{s.value}</p>
                    </div>
                  ))}
                </div>
              </div>
              <a
                href="#open-roles"
                ref={careersCtaRef}
                className="inline-flex items-center gap-3 font-sans font-bold text-[0.75rem] tracking-[0.1em] uppercase px-8 py-4 transition-all duration-300 self-start w-full md:w-auto justify-center md:justify-start"
                style={{ background: "#10b981", color: "#0d0d08" }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "#34d399")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "#10b981")}
              >
                See Open Roles ↓
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHY JOIN US ──────────────────────── */}
      <section style={{ background: "#10b981", color: "#0d0d08" }} className="px-8 md:px-16 py-20 max-md:px-6">
        <div className="mx-auto max-w-7xl">
          <p className="font-mono text-[0.6rem] uppercase tracking-[0.2em] mb-12" style={{ color: "rgba(13,13,8,0.5)" }}>
            Why work with us
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
            {[
              {
                icon: "◈",
                title: "Real ownership",
                body: "Every person on the team owns their domain. No micromanaging. You decide how to solve the problem.",
              },
              {
                icon: "◎",
                title: "Work that ships",
                body: "We hate work that sits in review forever. Everything we build is meant to go live and be used by real people.",
              },
              {
                icon: "◌",
                title: "Early-stage access",
                body: "You'll work directly with the founders, shape the product, and see the full picture — not just your slice of it.",
              },
            ].map((item, i) => (
              <div key={item.title} className="rev py-8 pr-8" style={{ borderTop: "1px solid rgba(13,13,8,0.15)", transitionDelay: `${i * 0.08}s` }}>
                <div className="text-2xl mb-4 opacity-30">{item.icon}</div>
                <h3 className="font-sans font-bold text-[1.1rem] tracking-[-0.02em] mb-2">{item.title}</h3>
                <p className="text-[0.88rem] leading-[1.75] font-light" style={{ color: "rgba(13,13,8,0.65)" }}>{item.body}</p>
              </div>
            ))}
          </div>
          <div style={{ borderTop: "1px solid rgba(13,13,8,0.15)" }} />
        </div>
      </section>

      {/* ── FULL-TIME ROLES ─────────────────── */}
      <section id="open-roles" className="px-8 md:px-16 py-20 max-md:px-6">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 pb-10 mb-2" style={{ borderBottom: "1px solid rgba(244,239,230,0.06)" }}>
            <div>
              <p className="rev-left font-mono text-[0.6rem] uppercase tracking-[0.2em] mb-4" style={{ color: "#10b981" }}>
                Full-time roles
              </p>
              <h2 className="section-h rev-up" style={{ fontSize: "clamp(2rem, 4.5vw, 4rem)", color: "#f4efe6" }}>
                Join the core team.
              </h2>
            </div>
            <p className="rev-right max-w-sm text-[0.88rem] leading-[1.75] font-light" style={{ color: "rgba(244,239,230,0.4)" }}>
              These roles are opening as we grow. Apply now and we&apos;ll reach out when we&apos;re ready to hire.
            </p>
          </div>

          {fullTimeRoles.map((role, i) => (
            <JobCard key={role.id} role={role} i={i} />
          ))}
          <div style={{ borderTop: "1px solid rgba(244,239,230,0.06)" }} />
        </div>
      </section>

      {/* ── INTERNSHIP PROGRAM ──────────────── */}
      <section className="px-8 md:px-16 py-20 max-md:px-6" style={{ background: "rgba(255,255,255,0.02)" }}>
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 pb-10 mb-2" style={{ borderBottom: "1px solid rgba(244,239,230,0.06)" }}>
            <div>
              <p className="rev-left font-mono text-[0.6rem] uppercase tracking-[0.2em] mb-4" style={{ color: "#10b981" }}>
                Internship Program — Currently Open
              </p>
              <h2 className="section-h rev-up" style={{ fontSize: "clamp(2rem, 4.5vw, 4rem)", color: "#f4efe6" }}>
                Internship Programme.
              </h2>
            </div>
            <div className="rev-right flex flex-wrap gap-8 shrink-0">
              {[{ label: "Duration", value: "8–12 Weeks" }, { label: "Mode", value: "Remote" }, { label: "Certificate", value: "Included" }].map((s) => (
                <div key={s.label}>
                  <p className="font-mono text-[0.56rem] uppercase tracking-[0.14em]" style={{ color: "rgba(244,239,230,0.3)" }}>{s.label}</p>
                  <p className="font-sans font-semibold text-[0.9rem] mt-0.5" style={{ color: "#f4efe6" }}>{s.value}</p>
                </div>
              ))}
            </div>
          </div>

          {internRoles.map((role, i) => (
            <a
              key={role.id}
              href={`mailto:promethiumlabspvtltd@gmail.com?subject=Internship Application — ${role.title}&body=Hi, I'd like to apply for the ${role.title} internship.%0A%0AAbout me:%0A%0APortfolio/GitHub:%0A%0AWhat I want to learn:`}
              className="group flex items-start justify-between py-8 transition-all duration-300 rev"
              style={{ borderTop: "1px solid rgba(244,239,230,0.06)", transitionDelay: `${i * 0.05}s` }}
            >
              <div className="flex items-start gap-8 min-w-0">
                <span className="font-mono text-[0.55rem] tracking-[0.14em] uppercase mt-2 shrink-0" style={{ color: "rgba(244,239,230,0.2)" }}>{role.id}</span>
                <div>
                  <div className="section-h mb-2 transition-all duration-300 group-hover:translate-x-2" style={{ fontSize: "clamp(1.5rem, 2.5vw, 2.2rem)", color: "#f4efe6" }}>{role.title}</div>
                  <p className="text-[0.85rem] font-light max-w-xl" style={{ color: "rgba(244,239,230,0.45)" }}>{role.body}</p>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {role.tags.map((tag) => (
                      <span key={tag} className="font-mono text-[0.6rem] uppercase tracking-[0.1em] px-3 py-1.5" style={{ border: "1px solid rgba(16,185,129,0.25)", color: "#10b981" }}>{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
              <span className="text-2xl shrink-0 mt-1 transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 hidden sm:block" style={{ color: "rgba(244,239,230,0.2)" }}>↗</span>
            </a>
          ))}
          <div style={{ borderTop: "1px solid rgba(244,239,230,0.06)" }} />
        </div>
      </section>

      {/* ── TERMINAL ────────────────────────── */}
      <section className="px-8 md:px-16 py-20 max-md:px-6">
        <div className="mx-auto max-w-7xl grid md:grid-cols-2 gap-16 items-center">
          <div className="rev-left">
            <p className="font-mono text-[0.6rem] uppercase tracking-[0.2em] mb-6" style={{ color: "#10b981" }}>Live openings</p>
            <h2 className="section-h mb-6" style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", color: "#f4efe6" }}>All four internship roles currently open.</h2>
            <p className="text-[0.95rem] leading-[1.85] font-light" style={{ color: "rgba(244,239,230,0.5)" }}>We run cohorts, not revolving doors. Apply now while spots are available for this cycle.</p>
          </div>
          <div className="rev-right"><Terminal /></div>
        </div>
      </section>

      {/* ── FAQ ─────────────────────────────── */}
      <section className="px-8 md:px-16 py-24 max-md:px-6" style={{ background: "rgba(255,255,255,0.02)" }}>
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between pb-10 mb-4" style={{ borderBottom: "1px solid rgba(244,239,230,0.06)" }}>
            <div>
              <p className="rev-left font-mono text-[0.6rem] uppercase tracking-[0.2em] mb-4" style={{ color: "#10b981" }}>FAQ</p>
              <h2 className="section-h rev-up" style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", color: "#f4efe6" }}>Frequently asked.</h2>
            </div>
          </div>
          {faqs.map((faq, i) => (
            <FAQItem key={i} q={faq.q} a={faq.a} i={i} />
          ))}
          <div style={{ borderTop: "1px solid rgba(244,239,230,0.06)" }} />
        </div>
      </section>

      {/* ── APPLY CTA ───────────────────────── */}
      <section className="px-8 md:px-16 py-24 max-md:px-6" style={{ borderTop: "1px solid rgba(244,239,230,0.06)" }}>
        <div className="mx-auto max-w-7xl flex flex-col md:flex-row md:items-end justify-between gap-12">
          <div>
            <h2 className="display-h rev-up" style={{ fontSize: "clamp(3rem, 7vw, 6rem)", color: "#f4efe6" }}>Interested?</h2>
            <p className="mt-4 text-[1rem] leading-[1.85] font-light max-w-md" style={{ color: "rgba(244,239,230,0.5)" }}>
              Send us a short note about yourself, the role you&apos;re interested in, and a link to your work (GitHub, portfolio, or LinkedIn). We review every application personally.
            </p>
          </div>
          <a
            href="mailto:promethiumlabspvtltd@gmail.com?subject=Application — Promethium Labs&body=Hi, I'd like to apply at Promethium Labs.%0A%0ARole I'm interested in:%0A%0AAbout me:%0A%0APortfolio/GitHub/LinkedIn:"
            className="rev-right inline-flex items-center gap-3 font-sans font-bold text-[0.75rem] tracking-[0.1em] uppercase px-10 py-5 shrink-0 transition-all duration-300"
            style={{ background: "#10b981", color: "#0d0d08" }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#34d399")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "#10b981")}
          >
            Send Your Application →
          </a>
        </div>
      </section>

    </main>
  );
};

export default CareersPage;
