import { Suspense, lazy, useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { CursorProvider } from "./components/cursor/CursorContext.jsx";
import Cursor from "./components/cursor/Cursor.jsx";
import { useLenis, getLenis } from "./hooks/useLenis.js";
import Nav from "./components/layout/Nav.jsx";
import Footer from "./components/layout/Footer.jsx";
import PageTransition from "./components/layout/PageTransition.jsx";

const Home = lazy(() => import("./pages/Home.jsx"));
const ServicesPage = lazy(() => import("./pages/Services.jsx"));
const ProjectsPage = lazy(() => import("./pages/Projects.jsx"));
const LearnPage = lazy(() => import("./pages/Learn.jsx"));
const CareersPage = lazy(() => import("./pages/Careers.jsx"));
const AboutPage = lazy(() => import("./pages/About.jsx"));
const ContactPage = lazy(() => import("./pages/Contact.jsx"));
const NotFoundPage = lazy(() => import("./pages/NotFound.jsx"));

function App() {
  useLenis();
  const location = useLocation();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Scroll to top on every page change — Lenis-aware
    const lenis = getLenis();
    if (lenis) {
      // 1. Jump Lenis to top immediately
      lenis.scrollTo(0, { immediate: true });
      // 2. Give the new page DOM time to paint, then recalculate scroll height
      const t = setTimeout(() => lenis.resize(), 120);
      return () => clearTimeout(t);
    } else {
      // Mobile fallback (Lenis disabled on <768px)
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => {
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      setProgress(scrolled);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <CursorProvider>
      <div 
        className="fixed top-0 left-0 h-[2px] bg-greenMid z-[100] transition-all duration-100 ease-out" 
        style={{ width: `${progress}%` }}
      />
      <Cursor />
      <Nav />
      <main>
        <AnimatePresence mode="wait">
        <Suspense fallback={
          <div className="fixed inset-0 flex items-center justify-center" style={{ background: "#0d0d08" }}>
            <div className="flex flex-col items-center gap-4">
              <div className="w-8 h-8 border-2 border-greenMid border-t-transparent rounded-full animate-spin" />
              <p className="font-mono text-[0.6rem] uppercase tracking-[0.2em]" style={{ color: "rgba(244,239,230,0.3)" }}>Loading...</p>
            </div>
          </div>
        }>
            <PageTransition routeKey={location.pathname}>
              <Routes location={location} key={location.pathname}>
                <Route path="/" element={<Home />} />
                <Route path="/services" element={<ServicesPage />} />
                <Route path="/projects" element={<ProjectsPage />} />
                <Route path="/learn" element={<LearnPage />} />
                <Route path="/careers" element={<CareersPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </PageTransition>
          </Suspense>
        </AnimatePresence>
      </main>
      <Footer />
    </CursorProvider>
  );
}

export default App;
