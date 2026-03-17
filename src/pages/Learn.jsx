import { useEffect } from "react";
import { useSEO } from "../hooks/useSEO.js";

const paths = [
  {
    id: "01",
    icon: "⬡",
    title: "Web Development",
    desc: "From HTML/CSS fundamentals to full-stack React and Node.js applications. Learn to build real products from scratch.",
    topics: ["HTML & CSS", "JavaScript", "React", "Node.js & APIs", "Databases"],
    level: "Beginner → Advanced",
  },
  {
    id: "02",
    icon: "◈",
    title: "AI / Machine Learning",
    desc: "Introduction to AI concepts, Python for data science, machine learning models, and building AI-powered applications.",
    topics: ["Python Fundamentals", "Data Science", "ML Models", "AI APIs", "Automation"],
    level: "Intermediate",
  },
  {
    id: "03",
    icon: "◎",
    title: "Backend Development",
    desc: "APIs, databases, authentication, and server-side logic. Learn how modern backends are architected and deployed.",
    topics: ["Node.js / Python", "REST APIs", "Databases", "Auth & Security", "Cloud Deploy"],
    level: "Beginner → Intermediate",
  },
  {
    id: "04",
    icon: "◌",
    title: "DevOps / Cloud",
    desc: "CI/CD pipelines, containerization, cloud platforms, and deploying applications that scale reliably.",
    topics: ["Git & GitHub", "Docker", "CI/CD", "AWS / GCP Basics", "Monitoring"],
    level: "Intermediate → Advanced",
  },
];

const LearnPage = () => {
  useSEO({
    title: "Resources",
    description: "Developer resources from Promethium Labs — structured learning paths for Web Development, AI/ML, Backend, and DevOps. Build real skills on real projects.",
    keywords: "developer resources, web development learning, AI ML learning paths, coding resources India, software dev tutorials Chennai",
    path: "/resources",
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
      document.querySelectorAll(".rev, .rev-up, .rev-left, .rev-right").forEach((el) => revObs.observe(el));
      return () => revObs.disconnect();
    }, 80);
    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="min-h-screen overflow-x-hidden" style={{ background: "#f4efe6", color: "#0d0d08" }}>

      {/* ── HERO ─────────────────────────────── */}
      <section className="px-8 md:px-16 pt-36 pb-20 max-md:px-6" style={{ borderBottom: "1px solid rgba(13,13,8,0.08)" }}>
        <div className="mx-auto max-w-7xl">
          <p className="rev-left font-mono text-[0.6rem] uppercase tracking-[0.2em] mb-8" style={{ color: "#10b981" }}>
            Resources — Start Learning With Us
          </p>
          <h1 className="display-h rev-up mb-10" style={{ fontSize: "clamp(3.5rem, 9vw, 8rem)", color: "#0d0d08" }}>
            Build real skills.
            <br />
            <span style={{ color: "#10b981" }}>Not just certificates.</span>
          </h1>
          <div className="pt-10" style={{ borderTop: "1px solid rgba(13,13,8,0.1)" }}>
            <div className="flex flex-wrap items-start justify-between gap-10">
              <p className="rev max-w-lg text-[1rem] leading-[1.75] font-light" style={{ color: "#7a7468" }}>
                Structured learning paths for modern technologies — built around real project experience.
                Learn the skills that actually matter in 2026.
              </p>
              <a
                href="/careers"
                className="rev-right inline-flex items-center gap-3 font-sans font-bold text-[0.75rem] tracking-[0.1em] uppercase px-8 py-4 transition-all duration-300"
                style={{ background: "#10b981", color: "#0d0d08" }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "#059669")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "#10b981")}
              >
                Start Learning →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── LEARNING PATHS ───────────────────── */}
      <section className="px-8 md:px-16 py-24 max-md:px-6">
        <div className="mx-auto max-w-7xl">
          <p className="rev-left font-mono text-[0.6rem] uppercase tracking-[0.2em] mb-12" style={{ color: "#10b981" }}>
            Learning paths
          </p>
          <div className="grid md:grid-cols-2 gap-0">
            {paths.map((path, i) => (
              <article
                key={path.id}
                className="rev py-10 pr-8"
                style={{
                  borderTop: "1px solid rgba(13,13,8,0.08)",
                  transitionDelay: `${i * 0.09}s`,
                }}
              >
                <div className="flex items-start justify-between mb-6">
                  <span className="text-3xl opacity-20">{path.icon}</span>
                  <span
                    className="font-mono text-[0.55rem] uppercase tracking-[0.1em] px-3 py-1"
                    style={{ border: "1px solid rgba(13,13,8,0.12)", color: "rgba(13,13,8,0.45)" }}
                  >
                    {path.level}
                  </span>
                </div>
                <span className="font-mono text-[0.55rem] tracking-[0.14em] uppercase" style={{ color: "rgba(13,13,8,0.25)" }}>{path.id}</span>
                <h2
                  className="section-h my-3"
                  style={{ fontSize: "clamp(1.6rem, 3vw, 2.4rem)", color: "#0d0d08" }}
                >
                  {path.title}
                </h2>
                <p className="text-[0.9rem] leading-[1.8] font-light mb-5" style={{ color: "#7a7468" }}>
                  {path.desc}
                </p>
                <div className="flex flex-wrap gap-2">
                  {path.topics.map((t) => (
                    <span
                      key={t}
                      className="font-mono text-[0.58rem] uppercase tracking-[0.1em] px-2.5 py-1"
                      style={{ border: "1px solid rgba(13,13,8,0.1)", color: "rgba(13,13,8,0.45)" }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <div
                  className="mt-6 inline-flex items-center gap-2 font-mono text-[0.62rem] uppercase tracking-[0.12em] transition-colors duration-200"
                  style={{ color: "#10b981" }}
                >
                  Coming Soon ✦
                </div>
              </article>
            ))}
          </div>
          <div style={{ borderTop: "1px solid rgba(13,13,8,0.08)" }} />
        </div>
      </section>

      {/* ── INTERNSHIP BRIDGE ─────────────────── */}
      <section style={{ background: "#10b981", color: "#0d0d08" }} className="px-8 md:px-16 py-20 max-md:px-6">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
            <div>
              <p className="font-mono text-[0.6rem] uppercase tracking-[0.2em] mb-4" style={{ color: "rgba(13,13,8,0.5)" }}>
                Ready to go further?
              </p>
              <h2 className="section-h rev-up" style={{ fontSize: "clamp(2rem, 4.5vw, 4rem)", color: "#0d0d08" }}>
                Join our internship program.
                <br />
                Learn by doing real work.
              </h2>
            </div>
            <div className="flex flex-col gap-4 shrink-0">
              <p className="text-[0.88rem] leading-[1.7] font-light max-w-xs" style={{ color: "rgba(13,13,8,0.65)" }}>
                8–12 weeks. Real projects. Real mentorship. Open to students and self-taught developers.
              </p>
              <a
                href="/careers"
                className="inline-flex items-center gap-3 font-sans font-bold text-[0.75rem] tracking-[0.1em] uppercase px-8 py-4 transition-all duration-300 self-start"
                style={{ background: "#0d0d08", color: "#f4efe6" }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "#1a1a14")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "#0d0d08")}
              >
                View Careers →
              </a>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
};

export default LearnPage;
