import { useScroll, useSpring, motion } from "framer-motion";
import { ThemeProvider } from "./context/ThemeContext";
import Cursor from "./components/Cursor";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Education from "./components/Education";
import Contact from "./components/Contact";
import ParticleBackground from "./components/ParticleBackground";
import Marquee from "./components/Marquee";
import SocialSidebar from "./components/SocialSidebar";
import GitHubActivity from "./components/GitHubActivity";

function Inner() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30 });

  return (
    <>
      <div className="grain-overlay" aria-hidden="true" />
      <div className="scanline" aria-hidden="true" />

      <motion.div
        className="fixed top-0 left-0 right-0 h-0.5 z-[100] origin-left"
        style={{ scaleX, backgroundColor: "var(--color-ink)", opacity: 0.85 }}
      />

      <ParticleBackground />
      <Cursor />
      <Navbar />
      <SocialSidebar />

      <main className="relative" style={{ zIndex: 1 }}>
        <Hero />
        <Marquee />
        <GitHubActivity />
        <About />
        <Skills />
        <Marquee reverse />
        <Projects />
        <Education />
        <Contact />
      </main>
    </>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <Inner />
    </ThemeProvider>
  );
}
