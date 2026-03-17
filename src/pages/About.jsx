import { useEffect } from "react";
import { useSEO } from "../hooks/useSEO.js";

const AboutPage = () => {
  useSEO({
    title: "About",
    description: "Promethium Labs — a bootstrapped software lab in Chennai, Tamil Nadu. We build AI tools, web apps, and run digital marketing for startups and businesses across India.",
    keywords: "about Promethium Labs, Chennai software startup, AI software lab India",
    path: "/about",
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
      document.querySelectorAll(".rev, .rev-left, .rev-right, .rev-up").forEach((el) => revObs.observe(el));
      return () => revObs.disconnect();
    }, 80);
    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="min-h-screen bg-cream text-ink overflow-x-hidden">

      {/* ── HERO ───────────────────────────────── */}
      <section className="px-8 md:px-16 pt-36 pb-20 max-md:px-6 border-b border-ink/[0.08]">
        <div className="mx-auto max-w-7xl">
          <p className="rev-left font-mono text-[0.6rem] uppercase tracking-[0.2em] text-greenMid mb-8">
            About
          </p>
          <h1 className="section-h rev-up text-[clamp(3.5rem,8vw,7rem)] mb-10">
            Hey.
            <br />
            <em className="not-italic text-greenMid">We&apos;re Promethium.</em>
          </h1>
          <div className="rule-top pt-8">
            <p className="rev max-w-2xl text-[1rem] text-gray leading-[1.85] font-light">
              An experimental software lab in Chennai, Tamil Nadu, building modern AI solutions,
              developer tools, and innovative digital platforms. We work with startups, businesses,
              and creators to design scalable software and technology-driven products.
            </p>
          </div>
        </div>
      </section>

      {/* ── COMPANY INFO STRIP ──────────────── */}
      <section style={{ background: "#10b981", color: "#0d0d08" }} className="px-8 md:px-16 py-10 max-md:px-6">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: "Founded", value: "2026" },
              { label: "Location", value: "Chennai, Tamil Nadu" },
              { label: "Team", value: "2–5 Members" },
              { label: "Model", value: "Bootstrapped" },
            ].map((item) => (
              <div key={item.label}>
                <p className="font-mono text-[0.58rem] uppercase tracking-[0.16em] mb-1" style={{ color: "rgba(13,13,8,0.5)" }}>{item.label}</p>
                <p className="font-sans font-bold text-[1rem]" style={{ color: "#0d0d08" }}>{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ── VALUES ─────────────────────────── */}
      <section className="bg-ink text-cream px-8 md:px-16 py-24 max-md:px-6">
        <div className="mx-auto max-w-7xl">
          <p className="rev font-mono text-[0.6rem] uppercase tracking-[0.2em] text-greenMid mb-12">
            What we believe
          </p>

          {[
            {
              title: "Conviction over consensus.",
              body: "We listen, ask the right questions, then recommend what we actually believe will work — even if it's not the easiest sell. We're not here to nod along; we're here to help you win.",
            },
            {
              title: "Ships over perfection.",
              body: "Perfect work that never launches is useless. We aim for excellent and live, not flawless and stuck in review. Small, frequent releases beat one giant reveal.",
            },
            {
              title: "People over process.",
              body: "We keep process light so people can do their best work. Fewer meetings, more ownership, clear communication. This applies to clients and to our interns.",
            },
          ].map((v, i) => (
            <article
              key={i}
              className="rev grid md:grid-cols-[280px_1fr] gap-8 py-10 border-t border-white/[0.06] last:border-b last:border-white/[0.06]"
            >
              <h2 className="section-h text-[clamp(1.5rem,2.5vw,2rem)] text-cream">{v.title}</h2>
              <p className="text-cream/55 text-[0.95rem] leading-[1.85] font-light max-w-xl self-center">
                {v.body}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* ── STUDIO / CTA ──────────────────── */}
      <section className="px-8 md:px-16 py-24 max-md:px-6">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between rule-bottom pb-10 mb-12">
            <div>
              <p className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-greenMid mb-3">
                Find us
              </p>
              <h2 className="section-h text-[clamp(2rem,4vw,3.5rem)]">Come say hello.</h2>
            </div>
            <p className="max-w-md text-[0.95rem] text-gray leading-[1.85] font-light">
              Based in Chennai. Building remotely. Drop us an email or check out what we&apos;re building on GitHub.
            </p>
          </div>

          <article className="border border-ink/[0.1] px-8 py-8">
            <h3 className="section-h text-xl mb-1">Promethium Labs</h3>
            <p className="font-mono text-[0.6rem] uppercase tracking-[0.16em] text-greenMid mb-5">
              Chennai, Tamil Nadu, India · Est. 2026
            </p>
            <p className="text-[0.95rem] text-gray leading-[1.85] max-w-md font-light mb-6">
              An experimental lab for startups and teams who want honest, fast, thoughtful work
              across AI, software development, and digital marketing.
            </p>
            <div className="flex flex-wrap gap-6">
              <a
                href="mailto:promethiumlabspvtltd@gmail.com"
                className="inline-flex items-center gap-2 text-[0.7rem] font-mono uppercase tracking-[0.14em] text-greenMid border-b border-greenMid/40 pb-0.5 hover:border-greenMid transition-colors"
              >
                Email us ↗
              </a>
              <a
                href="https://github.com/promethiumlabs"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-[0.7rem] font-mono uppercase tracking-[0.14em] text-greenMid border-b border-greenMid/40 pb-0.5 hover:border-greenMid transition-colors"
              >
                GitHub ↗
              </a>
            </div>
          </article>
        </div>
      </section>

    </main>
  );
};

export default AboutPage;
