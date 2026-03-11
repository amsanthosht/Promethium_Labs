import { useEffect, useState, useRef } from "react";
import { useMagnetic } from "../hooks/useMagnetic";
import { useSEO } from "../hooks/useSEO";
import emailjs from "emailjs-com";

// ── EmailJS config ──────────────────────────────────────────────
const EMAILJS_SERVICE_ID = "service_xvwz5oo";
const EMAILJS_TEMPLATE_ID = "template_r50er4k";
const EMAILJS_PUBLIC_KEY = "zk2MOQJu4Pj2temgK";

const ContactPage = () => {
  useSEO({
    title: "Contact",
    description:
      "Get in touch with Promethium Labs. Start a project, enquire about our internship program, or just say hello. Based in Chennai, India.",
    keywords: "contact Promethium Labs, start a project, Chennai software company",
  });

  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState(false);
  const [formData, setFormData] = useState({ fn: "", ln: "", em: "", sv: "", msg: "" });
  const submitRef = useMagnetic(0.15);
  const formRef = useRef(null);

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
    document.querySelectorAll(".rev, .rev-left, .rev-right, .rev-up").forEach((el) => revObs.observe(el));
    return () => revObs.disconnect();
  }, []);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    setError(false);

    const { fn, em, msg } = formData;
    if (!fn || !em || !msg) {
      const form = formRef.current;
      if (form) {
        form.style.animation = "shake 0.4s cubic-bezier(0.36, 0.07, 0.19, 0.97)";
        setTimeout(() => (form.style.animation = ""), 400);
      }
      return;
    }

    setSending(true);

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          // Sender info (person filling the form)
          user_name: `${fn} ${formData.ln}`.trim(),
          user_email: em,
          from_name: `${fn} ${formData.ln}`.trim(),
          from_email: em,
          reply_to: em,
          // Recipient — hardcoded so "To Email" in template always resolves
          to_name: "Promethium Labs",
          to_email: "promethiumlabspvtltd@gmail.com",
          email: em,                    // some templates use {{email}}
          // Message content
          service: formData.sv || "General Inquiry",
          message: msg,
        },
        EMAILJS_PUBLIC_KEY
      );
      setSubmitted(true);
    } catch (err) {
      console.error("EmailJS error:", err);
      setError(true);
    } finally {
      setSending(false);
    }
  };

  return (
    <main className="min-h-screen bg-cream text-ink overflow-x-hidden">
      <section className="grid min-h-screen grid-cols-1 lg:grid-cols-2">

        {/* ── LEFT COPY PANEL ──────────────────────────────── */}
        <div
          className="flex flex-col justify-center gap-10 px-8 py-28 md:px-16 rev-left border-b lg:border-b-0 border-ink/[0.08]"
          style={{ borderRight: "1px solid rgba(13,13,8,0.08)" }}
        >
          <p className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-greenMid">
            Get in touch
          </p>

          <h1 className="section-h text-[clamp(2.8rem,5.5vw,4.5rem)]">
            Let&apos;s make
            <br />
            <em className="not-italic text-greenMid">something</em>
            <br />
            worth making.
          </h1>

          <div className="rule-top pt-8 space-y-5 text-sm">
            <p className="text-gray/80 text-[0.95rem] leading-[1.85] font-light max-w-sm">
              A product idea you can&apos;t shake, a brand that deserves better marketing, or
              an internship you&apos;re interested in — send it over. We read every message ourselves.
            </p>

            {/* Location */}
            <div className="flex items-center gap-2 pt-1">
              <span className="text-[0.6rem] font-mono uppercase tracking-[0.16em] text-gray/50">Based in</span>
              <span className="font-sans font-semibold text-[0.88rem] text-ink/70">Chennai, Tamil Nadu, India</span>
            </div>

            {/* Email link */}
            <a
              href="mailto:promethiumlabspvtltd@gmail.com"
              className="group flex items-center gap-3 text-ink/80 hover:text-greenMid transition-colors duration-200 pt-2"
            >
              <span className="text-[0.65rem] font-mono uppercase tracking-[0.16em] text-gray/50">
                Email us →
              </span>
              <span className="font-sans font-semibold text-[0.95rem] tracking-[-0.01em]">
                promethiumlabspvtltd@gmail.com
              </span>
            </a>

            {/* Links */}
            <div className="flex gap-3 pt-2">
              <a
                href="https://github.com/promethiumlabs"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[0.7rem] font-mono uppercase tracking-[0.1em] border border-ink/15 px-4 py-2.5 text-ink/50 hover:border-greenMid hover:text-greenMid transition-all duration-200"
              >
                GitHub ↗
              </a>
            </div>
          </div>
        </div>

        {/* ── RIGHT FORM PANEL ─────────────────────────────── */}
        <div className="flex items-center bg-ink px-8 py-28 md:px-16 rev-right">
          <div ref={formRef} className="ct-form mx-auto w-full max-w-md">
            {!submitted ? (
              <>
                <h2 className="section-h text-[1.75rem] text-cream mb-2">Send us a message</h2>
                <p className="mb-10 text-[0.9rem] text-cream/40 leading-relaxed font-light">
                  Tell us what you&apos;re working on and what success looks like for you.
                </p>

                {error && (
                  <div
                    className="mb-6 px-4 py-3 font-mono text-[0.68rem] uppercase tracking-[0.1em]"
                    style={{ border: "1px solid rgba(239,68,68,0.4)", color: "rgba(239,68,68,0.8)" }}
                  >
                    Something went wrong. Please email us directly at promethiumlabspvtltd@gmail.com
                  </div>
                )}

                <form className="space-y-8" onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div className="cf-g">
                      <input
                        id="fn"
                        type="text"
                        required
                        placeholder="Arjun"
                        onChange={handleInputChange}
                        className="w-full border-b border-cream/15 bg-transparent py-2.5 text-[0.9rem] text-cream outline-none focus:border-greenMid transition-colors placeholder:opacity-0"
                      />
                      <label htmlFor="fn" className="absolute left-0 top-2.5 text-[0.6rem] font-mono uppercase tracking-widest text-cream/30">
                        First Name
                      </label>
                    </div>
                    <div className="cf-g">
                      <input
                        id="ln"
                        type="text"
                        placeholder="Sharma"
                        onChange={handleInputChange}
                        className="w-full border-b border-cream/15 bg-transparent py-2.5 text-[0.9rem] text-cream outline-none focus:border-greenMid transition-colors placeholder:opacity-0"
                      />
                      <label htmlFor="ln" className="absolute left-0 top-2.5 text-[0.6rem] font-mono uppercase tracking-widest text-cream/30">
                        Last Name
                      </label>
                    </div>
                  </div>

                  <div className="cf-g">
                    <input
                      id="em"
                      type="email"
                      required
                      placeholder="you@example.com"
                      onChange={handleInputChange}
                      className="w-full border-b border-cream/15 bg-transparent py-2.5 text-[0.9rem] text-cream outline-none focus:border-greenMid transition-colors placeholder:opacity-0"
                    />
                    <label htmlFor="em" className="absolute left-0 top-2.5 text-[0.6rem] font-mono uppercase tracking-widest text-cream/30">
                      Email
                    </label>
                  </div>

                  <div className="cf-g">
                    <select
                      id="sv"
                      onChange={handleInputChange}
                      className="w-full border-b border-cream/15 bg-transparent py-2.5 text-[0.9rem] text-cream/60 outline-none focus:border-greenMid transition-colors"
                    >
                      <option value="" className="bg-ink">I&apos;m interested in...</option>
                      <option value="AI & Software Development" className="bg-ink">AI &amp; Software Development</option>
                      <option value="Digital Marketing" className="bg-ink">Digital Marketing</option>
                      <option value="Careers / Internship" className="bg-ink">Careers / Internship Program</option>
                      <option value="Something Else" className="bg-ink">Something Else</option>
                    </select>
                  </div>

                  <div className="cf-g">
                    <textarea
                      id="msg"
                      rows={4}
                      required
                      placeholder="Your message"
                      onChange={handleInputChange}
                      className="w-full border-b border-cream/15 bg-transparent py-2.5 text-[0.9rem] text-cream outline-none focus:border-greenMid transition-colors resize-none placeholder:opacity-0"
                    />
                    <label htmlFor="msg" className="absolute left-0 top-2.5 text-[0.6rem] font-mono uppercase tracking-widest text-cream/30">
                      Message
                    </label>
                  </div>

                  <button
                    type="submit"
                    ref={submitRef}
                    disabled={sending}
                    className="cf-submit mt-2 w-full bg-greenMid text-cream py-4 text-[0.75rem] font-sans font-bold tracking-[0.12em] uppercase transition-all duration-300 hover:bg-green disabled:opacity-60 disabled:cursor-not-allowed"
                    style={{ borderRadius: 0 }}
                  >
                    {sending ? "Sending..." : "Send Message ✦"}
                  </button>
                </form>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center min-h-[350px] text-center gap-6 animate-[fadeIn_0.5s_ease]">
                <div className="w-14 h-14 border border-greenMid flex items-center justify-center text-xl text-greenMid">
                  ✓
                </div>
                <div className="section-h text-[2rem] text-cream">We got it.</div>
                <p className="text-[0.9rem] text-cream/40 leading-relaxed max-w-[280px] font-light">
                  Expect a reply within 24 hours. Check your inbox — we&apos;ve also sent you a confirmation.
                </p>
              </div>
            )}
          </div>
        </div>

      </section>
    </main>
  );
};

export default ContactPage;
