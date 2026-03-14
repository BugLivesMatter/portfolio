import { useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";
import { FiGithub, FiArrowDown } from "react-icons/fi";
import { SiTelegram } from "react-icons/si";
import { useTranslation } from "react-i18next";

function useTypewriter(words: string[], speed = 70, pause = 2200, resetKey = "") {
  const [display, setDisplay] = useState("");
  const [wordIdx, setWordIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    setDisplay(""); setWordIdx(0); setCharIdx(0); setDeleting(false);
  }, [resetKey]);

  useEffect(() => {
    if (!words.length) return;
    const current = words[wordIdx % words.length];
    let t: ReturnType<typeof setTimeout>;

    if (!deleting && charIdx <= current.length) {
      t = setTimeout(() => { setDisplay(current.slice(0, charIdx)); setCharIdx((c) => c + 1); }, speed);
    } else if (!deleting && charIdx > current.length) {
      t = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && charIdx > 0) {
      t = setTimeout(() => { setDisplay(current.slice(0, charIdx - 1)); setCharIdx((c) => c - 1); }, speed / 2);
    } else {
      setDeleting(false); setWordIdx((w) => (w + 1) % words.length);
    }
    return () => clearTimeout(t);
  }, [charIdx, deleting, wordIdx, words, speed, pause]);

  return display;
}

const container = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } } as const;
const item = { hidden: { opacity: 0, y: 36 }, visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.25, 0.1, 0.25, 1] } } } as const;

export default function Hero() {
  const { t, i18n } = useTranslation();
  const roles = useMemo(() => t("hero.roles", { returnObjects: true }) as string[], [t]);
  const typed = useTypewriter(roles, 70, 2200, i18n.language);

  const stats = [
    { num: "06", label: t("hero.stats.projects") },
    { num: "20+", label: t("hero.stats.technologies") },
    { num: "3+", label: t("hero.stats.years") },
  ];

  return (
    <section id="hero" className="relative min-h-screen flex flex-col items-center justify-center px-8 overflow-hidden">
      {/* Grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(var(--color-line) 1px, transparent 1px), linear-gradient(90deg, var(--color-line) 1px, transparent 1px)`,
          backgroundSize: "64px 64px",
          maskImage: "radial-gradient(ellipse 75% 75% at 50% 50%, black 30%, transparent 100%)",
          opacity: 0.5,
        }}
      />
      {/* Glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(900px,100vw)] h-[min(900px,100vw)] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(ellipse at center, var(--glow-bg) 0%, transparent 60%)" }}
      />

      <motion.div variants={container} initial="hidden" animate="visible" className="relative z-10 text-center max-w-6xl w-full">
        {/* Label */}
        <motion.p
          variants={item}
          className="font-mono text-[11px] tracking-[0.45em] uppercase mb-10 flex items-center justify-center gap-4"
          style={{ color: "var(--color-faint)" }}
        >
          <span className="h-px w-10 inline-block" style={{ backgroundColor: "var(--color-ghost)" }} />
          {t("hero.label")}
          <span className="h-px w-10 inline-block" style={{ backgroundColor: "var(--color-ghost)" }} />
        </motion.p>

        {/* Name */}
        <motion.div variants={item} className="mb-5">
          <h1
            className="font-black tracking-tighter leading-none select-none"
            style={{ fontSize: "clamp(3.5rem, 15vw, 11rem)", color: "var(--color-ink)" }}
          >
            <span className="glitch-text inline-block" data-text="NIKITA">NIKITA</span>
          </h1>
          <h1
            className="font-black tracking-tighter leading-none select-none"
            style={{
              fontSize: "clamp(2.5rem, 11.5vw, 8.5rem)",
              color: "transparent",
              WebkitTextStroke: "1px var(--outline-color)",
            }}
          >
            KOVALENKO
          </h1>
        </motion.div>

        {/* Typewriter */}
        <motion.div variants={item} className="h-12 flex items-center justify-center mb-12">
          <span className="font-mono text-xl sm:text-2xl tracking-wide" style={{ color: "var(--color-dim)" }}>
            {typed}
            <span className="animate-pulse ml-0.5" style={{ color: "var(--color-ink)" }}>_</span>
          </span>
        </motion.div>

        {/* CTA buttons */}
        <motion.div variants={item} className="flex items-center justify-center gap-5 flex-wrap mb-16">
          <a
            href="https://github.com/BugLivesMatter"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-8 py-4 font-mono text-sm font-bold tracking-[0.15em] uppercase glow-pulse transition-opacity duration-200 hover:opacity-80"
            style={{ backgroundColor: "var(--color-mark)", color: "var(--color-on-mark)" }}
          >
            <FiGithub size={16} />
            {t("hero.github")}
          </a>
          <a
            href="https://t.me/BDSMBDSMBDSMBDSMBDSMBDSMBDSMBDSM"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-8 py-4 font-mono text-sm tracking-[0.15em] uppercase transition-all duration-200"
            style={{ border: "1px solid var(--color-line)", color: "var(--color-dim)" }}
            onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "var(--color-stroke)"; el.style.color = "var(--color-muted)"; }}
            onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "var(--color-line)"; el.style.color = "var(--color-dim)"; }}
          >
            <SiTelegram size={15} />
            Telegram
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-8 py-4 font-mono text-sm tracking-[0.15em] uppercase transition-all duration-200"
            style={{ color: "var(--color-faint)" }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--color-dim)")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--color-faint)")}
          >
            {t("hero.contact")}
          </a>
        </motion.div>

        {/* Stats */}
        <motion.div
          variants={item}
          className="flex items-center justify-center gap-12 sm:gap-24 pt-8"
          style={{ borderTop: "1px solid var(--color-line)" }}
        >
          {stats.map(({ num, label }) => (
            <div key={label} className="text-center">
              <p className="font-mono text-4xl sm:text-5xl font-bold" style={{ color: "var(--color-ink)" }}>{num}</p>
              <p className="font-mono text-[10px] uppercase tracking-widest mt-2" style={{ color: "var(--color-ghost)" }}>{label}</p>
            </div>
          ))}
        </motion.div>
      </motion.div>

      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.6 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 transition-colors duration-300"
        style={{ color: "var(--color-ghost)" }}
        onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--color-muted)")}
        onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--color-ghost)")}
      >
        <span className="font-mono text-[10px] tracking-[0.35em] uppercase">{t("hero.scroll")}</span>
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}>
          <FiArrowDown size={13} />
        </motion.div>
      </motion.a>
    </section>
  );
}
