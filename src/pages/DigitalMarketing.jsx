import { useEffect } from "react";
import { useSEO } from "../hooks/useSEO.js";

const offerings = [
  {
    id: "01",
    title: "Search Engine Optimisation",
    icon: "◎",
    desc: "Rank where your customers are already looking. We conduct deep technical audits, fix on-page issues, build authoritative backlinks, and create content that search engines and humans both love.",
    items: [
      "Technical SEO audits & site health",
      "On-page optimisation & structured data",
      "Keyword research & content planning",
      "Link building & domain authority growth",
      "Local SEO & Google Business Profile",
    ],
  },
  {
    id: "02",
    title: "Social Media Marketing",
    icon: "⬡",
    desc: "Build a brand presence that feels alive. We manage content calendars, design scroll-stopping creatives, engage your community, and turn followers into loyal customers.",
    items: [
      "Strategy & content calendar",
      "Instagram, LinkedIn, YouTube & more",
      "Reel & short-form video production",
      "Community management & engagement",
      "Influencer & creator partnerships",
    ],
  },
  {
    id: "03",
    title: "Paid Advertising",
    icon: "◈",
    desc: "Get results from day one. We plan, launch, and continuously optimise ad campaigns across Google, Meta, and other platforms — squeezing every rupee for maximum return.",
    items: [
      "Google Ads (Search, Display, Shopping)",
      "Meta Ads (Facebook & Instagram)",
      "YouTube & video advertising",
      "Retargeting & lookalike audiences",
      "Campaign reporting & analytics",
    ],
  },
  {
    id: "04",
    title: "Content Marketing",
    icon: "◉",
    desc: "Content that earns trust and drives action. From blog articles to case studies to email sequences — every piece is built with a clear purpose and distribution plan.",
    items: [
      "Blog articles & long-form content",
      "Email marketing & automation",
      "Case studies & success stories",
      "Whitepapers & lead magnets",
      "Brand voice & tone development",
    ],
  },
  {
    id: "05",
    title: "Analytics & Growth Strategy",
    icon: "◌",
    desc: "Data without interpretation is just noise. We configure tracking, build dashboards, and translate numbers into decisions that accelerate your growth trajectory.",
    items: [
      "Google Analytics 4 & Tag Manager setup",
      "Conversion rate optimisation (CRO)",
      "Custom reporting dashboards",
      "A/B testing & experimentation",
      "Monthly growth reviews",
    ],
  },
  {
    id: "06",
    title: "Brand Identity & Design",
    icon: "⬢",
    desc: "Look the part. We design brand systems — logos, colour palettes, typography, and visual guidelines — that make your business instantly recognisable and consistently compelling.",
    items: [
      "Logo design & visual identity",
      "Brand guidelines & style system",
      "Social media templates & assets",
      "Pitch decks & presentation design",
      "Ad creative & banner design",
    ],
  },
];

const DigitalMarketingPage = () => {
  useSEO({
    title: "Digital Marketing Agency Chennai — Promethium Labs",
    description: "Full-stack digital marketing from Promethium Labs — SEO, social media, paid ads, content marketing, analytics, and brand design. Trusted by startups across India.",
    keywords: "digital marketing agency Chennai, SEO agency India, social media marketing India, Google Ads agency, content marketing, brand design Chennai",
    path: "/services/digital-marketing",
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
      return () => revObs.disconnect();
    }, 80);
    return () => clearTimeout(timer);
  }, []);

  return (
    <main style={{ background: "#0d0d08", color: "#f4efe6" }} className="min-h-screen overflow-x-hidden">

      {/* ── HERO ─────────────────────────────────────── */}
      <section className="px-8 md:px-16 pt-36 pb-20 max-md:px-6" style={{ borderBottom: "1px solid rgba(244,239,230,0.06)" }}>
        <div className="mx-auto max-w-7xl">
          <p className="rev-left font-mono text-[0.6rem] uppercase tracking-[0.2em] mb-8" style={{ color: "#10b981" }}>
            Services · Digital Marketing
          </p>
          <h1 className="section-h rev-up mb-8" style={{ fontSize: "clamp(3rem, 8vw, 7rem)" }}>
            Everything digital
            <br />
            <span style={{ color: "#10b981" }}>marketing.</span>
          </h1>
          <div className="pt-8" style={{ borderTop: "1px solid rgba(244,239,230,0.06)" }}>
            <p className="rev max-w-2xl text-[0.95rem] leading-[1.85] font-light" style={{ color: "rgba(244,239,230,0.55)" }}>
              From search rankings to social media, paid ads to brand identity — we handle every channel that connects your business to its customers. Strategy-first. Results-obsessed.
            </p>
          </div>
        </div>
      </section>

      {/* ── MENU — WHAT WE OFFER ─────────────────────── */}
      <section className="px-8 md:px-16 py-24 max-md:px-6">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 pb-10" style={{ borderBottom: "1px solid rgba(244,239,230,0.06)" }}>
            <p className="rev-left font-mono text-[0.6rem] uppercase tracking-[0.2em]" style={{ color: "#10b981" }}>
              What we offer
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0">
            {offerings.map((o, i) => (
              <div
                key={o.id}
                className="rev group py-10 pr-8"
                style={{
                  borderTop: "1px solid rgba(244,239,230,0.06)",
                  transitionDelay: `${i * 0.07}s`,
                }}
              >
                {/* Icon + number */}
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-2xl" style={{ color: "#10b981", opacity: 0.7 }}>{o.icon}</span>
                  <span className="font-mono text-[0.5rem] tracking-[0.18em] uppercase" style={{ color: "rgba(244,239,230,0.2)" }}>{o.id}</span>
                </div>

                <h2 className="section-h mb-3" style={{ fontSize: "clamp(1.2rem, 2vw, 1.6rem)", color: "#f4efe6" }}>{o.title}</h2>
                <p className="text-[0.85rem] leading-[1.8] font-light mb-6" style={{ color: "rgba(244,239,230,0.45)" }}>{o.desc}</p>

                <ul className="space-y-2">
                  {o.items.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-[0.78rem]" style={{ color: "rgba(244,239,230,0.5)" }}>
                      <span className="mt-[6px] h-[3px] w-[3px] rounded-full shrink-0" style={{ background: "#10b981" }} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div style={{ borderTop: "1px solid rgba(244,239,230,0.06)" }} />
        </div>
      </section>

      {/* ── WHY US STRIP ─────────────────────────────── */}
      <section style={{ background: "#10b981", color: "#0d0d08" }} className="px-8 md:px-16 py-16 max-md:px-6">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              { n: "Strategy First", d: "Every campaign starts with understanding your business, not a template." },
              { n: "Full Funnel", d: "Awareness to conversion — we cover every stage of your customer journey." },
              { n: "Transparent", d: "Clear reporting. No vanity metrics. Numbers that actually move your business." },
            ].map((item) => (
              <div key={item.n} className="rev">
                <h3 className="section-h text-[1.3rem] mb-2">{item.n}</h3>
                <p className="text-[0.88rem] leading-[1.8] font-light" style={{ color: "rgba(13,13,8,0.65)" }}>{item.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CASE STUDIES ─────────────────────────────── */}
      <section className="px-8 md:px-16 py-24 max-md:px-6" style={{ borderTop: "1px solid rgba(244,239,230,0.06)" }}>
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 pb-10" style={{ borderBottom: "1px solid rgba(244,239,230,0.06)" }}>
            <p className="rev-left font-mono text-[0.6rem] uppercase tracking-[0.2em]" style={{ color: "#10b981" }}>
              Results we&apos;ve driven
            </p>
            <p className="rev-right text-[0.8rem] font-light max-w-xs text-right" style={{ color: "rgba(244,239,230,0.35)" }}>
              Industry benchmark results from our playbook — applied to businesses like yours.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
            {[
              {
                id: "01",
                sector: "Local F&B · Chennai",
                title: "3× organic traffic in 4 months",
                body: "A Chennai-based restaurant group had near-zero online discovery. We ran a full local SEO overhaul — Google Business Profile, schema markup, location-based content — taking them from page 4 to top-3 rankings for 12 commercial keywords.",
                stats: [
                  { n: "312%", l: "Organic traffic growth" },
                  { n: "#1", l: "Google ranking — 'best biryani Chennai'" },
                  { n: "4 mo", l: "To see measurable ROI" },
                ],
                tag: "SEO",
              },
              {
                id: "02",
                sector: "E-commerce · Fashion",
                title: "4.8× ROAS on Meta Ads",
                body: "A D2C fashion brand was spending ₹80K/month on Meta with a 1.2× return. We rebuilt their campaign structure, refined audience targeting with lookalikes and retargeting stacks, and redesigned their ad creatives — slashing CPA by 61%.",
                stats: [
                  { n: "4.8×", l: "Return on ad spend" },
                  { n: "−61%", l: "Cost per acquisition" },
                  { n: "₹3.2L", l: "Revenue in first 30 days" },
                ],
                tag: "Paid Ads",
              },
              {
                id: "03",
                sector: "B2B SaaS · HR Tech",
                title: "68 qualified leads in 6 weeks",
                body: "A bootstrapped HR-tech SaaS had a great product and zero inbound pipeline. We built a LinkedIn content engine, launched targeted lead gen campaigns, and wrote a long-form article series that now drives 40% of their monthly signups.",
                stats: [
                  { n: "68", l: "Qualified leads in 6 weeks" },
                  { n: "40%", l: "Monthly signups from content" },
                  { n: "2.1×", l: "Trial-to-paid conversion lift" },
                ],
                tag: "Content + LinkedIn",
              },
            ].map((cs, i) => (
              <div
                key={cs.id}
                className="rev py-10 pr-8"
                style={{
                  borderTop: "1px solid rgba(244,239,230,0.06)",
                  transitionDelay: `${i * 0.1}s`,
                }}
              >
                <div className="flex items-center justify-between mb-6">
                  <span className="font-mono text-[0.5rem] tracking-[0.18em] uppercase" style={{ color: "rgba(244,239,230,0.2)" }}>{cs.id}</span>
                  <span className="font-mono text-[0.55rem] uppercase tracking-[0.1em] px-3 py-1" style={{ border: "1px solid rgba(16,185,129,0.3)", color: "#10b981" }}>{cs.tag}</span>
                </div>
                <p className="font-mono text-[0.58rem] uppercase tracking-[0.14em] mb-3" style={{ color: "rgba(244,239,230,0.3)" }}>{cs.sector}</p>
                <h3 className="section-h mb-4" style={{ fontSize: "clamp(1.2rem, 2vw, 1.6rem)", color: "#f4efe6" }}>{cs.title}</h3>
                <p className="text-[0.85rem] leading-[1.8] font-light mb-8" style={{ color: "rgba(244,239,230,0.45)" }}>{cs.body}</p>
                <div className="grid grid-cols-3 gap-2" style={{ borderTop: "1px solid rgba(244,239,230,0.06)", paddingTop: "1.5rem" }}>
                  {cs.stats.map((s) => (
                    <div key={s.l}>
                      <div className="font-sans font-black text-[1.3rem] mb-1" style={{ color: "#10b981" }}>{s.n}</div>
                      <div className="font-mono text-[0.5rem] uppercase tracking-[0.1em]" style={{ color: "rgba(244,239,230,0.3)" }}>{s.l}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div style={{ borderTop: "1px solid rgba(244,239,230,0.06)" }} />
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────── */}
      <section className="px-8 md:px-16 py-24 max-md:px-6" style={{ borderTop: "1px solid rgba(244,239,230,0.06)" }}>
        <div className="mx-auto max-w-7xl flex flex-col md:flex-row md:items-end justify-between gap-12">
          <div>
            <p className="font-mono text-[0.6rem] uppercase tracking-[0.2em] mb-4" style={{ color: "rgba(244,239,230,0.3)" }}>Ready to grow?</p>
            <h2 className="display-h rev-up" style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)", color: "#f4efe6" }}>
              Let&apos;s grow your
              <br />
              <span style={{ color: "#10b981" }}>business together.</span>
            </h2>
          </div>
          <div className="flex flex-wrap gap-4 shrink-0">
            <a
              href="/contact"
              className="inline-flex items-center gap-3 font-sans font-bold text-[0.75rem] tracking-[0.1em] uppercase px-8 py-4 transition-all duration-300"
              style={{ background: "#10b981", color: "#0d0d08" }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#34d399")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "#10b981")}
            >
              Start a conversation →
            </a>
            <a
              href="/services"
              className="inline-flex items-center gap-3 font-sans font-bold text-[0.75rem] tracking-[0.1em] uppercase px-8 py-4 transition-all duration-300"
              style={{ border: "1px solid rgba(244,239,230,0.2)", color: "#f4efe6" }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#10b981"; e.currentTarget.style.color = "#10b981"; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(244,239,230,0.2)"; e.currentTarget.style.color = "#f4efe6"; }}
            >
              All services →
            </a>
          </div>
        </div>
      </section>

    </main>
  );
};

export default DigitalMarketingPage;
