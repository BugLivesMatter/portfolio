import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { FiSun, FiMoon } from "react-icons/fi";
import { useTheme } from "../context/ThemeContext";

export default function Navbar() {
  const { t, i18n } = useTranslation();
  const { isDark, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { label: t("nav.about"),     href: "#about" },
    { label: t("nav.github"),    href: "#github" },
    { label: t("nav.skills"),    href: "#skills" },
    { label: t("nav.projects"),  href: "#projects" },
    { label: t("nav.education"), href: "#education" },
    { label: t("nav.contact"),   href: "#contact" },
  ];

  const switchLang = (lang: string) => {
    i18n.changeLanguage(lang);
    localStorage.setItem("portfolio-lang", lang);
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -90, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        borderBottom: scrolled ? `1px solid var(--color-line)` : "1px solid transparent",
        backdropFilter: scrolled ? "blur(16px) saturate(180%)" : "none",
        backgroundColor: scrolled ? "color-mix(in srgb, var(--color-base) 85%, transparent)" : "transparent",
        transition: "border-color 0.3s, backdrop-filter 0.3s, background-color 0.3s",
      }}
    >
      <div className="max-w-7xl mx-auto px-8 h-20 flex items-center justify-between gap-8">
        {/* Logo */}
        <a href="#hero" className="font-mono text-base font-black tracking-widest uppercase" style={{ color: "var(--color-ink)" }}>
          NK<span style={{ color: "var(--color-faint)" }}>.</span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-9 flex-1 justify-center">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="font-mono text-xs tracking-widest uppercase transition-colors duration-200"
              style={{ color: "var(--color-dim)" }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--color-ink)")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--color-dim)")}
            >
              {l.label}
            </a>
          ))}
        </nav>

        {/* Controls */}
        <div className="flex items-center gap-4">
          {/* Language switcher */}
          <div className="hidden md:flex items-center font-mono text-xs tracking-widest border px-3 py-1.5" style={{ borderColor: "var(--color-line)" }}>
            <button
              onClick={() => switchLang("en")}
              className="transition-colors duration-200 px-0.5"
              style={{ color: i18n.language === "en" ? "var(--color-ink)" : "var(--color-ghost)" }}
            >EN</button>
            <span className="mx-1.5" style={{ color: "var(--color-line)" }}>/</span>
            <button
              onClick={() => switchLang("ru")}
              className="transition-colors duration-200 px-0.5"
              style={{ color: i18n.language === "ru" ? "var(--color-ink)" : "var(--color-ghost)" }}
            >RU</button>
          </div>

          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            className="w-9 h-9 flex items-center justify-center border transition-all duration-200"
            style={{ borderColor: "var(--color-line)", color: "var(--color-ghost)" }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "var(--color-stroke)"; (e.currentTarget as HTMLElement).style.color = "var(--color-ink)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "var(--color-line)"; (e.currentTarget as HTMLElement).style.color = "var(--color-ghost)"; }}
            aria-label="Toggle theme"
          >
            {isDark ? <FiSun size={14} /> : <FiMoon size={14} />}
          </button>

          {/* Mobile hamburger */}
          <button className="md:hidden flex flex-col gap-1.5 w-6" onClick={() => setMenuOpen((v) => !v)} aria-label="Toggle menu">
            <motion.span animate={menuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }} className="block h-px w-full origin-center" style={{ backgroundColor: "var(--color-ink)" }} />
            <motion.span animate={menuOpen ? { opacity: 0 } : { opacity: 1 }} className="block h-px w-full" style={{ backgroundColor: "var(--color-ink)" }} />
            <motion.span animate={menuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }} className="block h-px w-full origin-center" style={{ backgroundColor: "var(--color-ink)" }} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden overflow-hidden"
            style={{ borderTop: `1px solid var(--color-line)`, backgroundColor: "var(--color-base)" }}
          >
            <nav className="flex flex-col px-8 py-5 gap-5">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setMenuOpen(false)}
                  className="font-mono text-xs tracking-widest uppercase transition-colors"
                  style={{ color: "var(--color-dim)" }}
                >
                  {l.label}
                </a>
              ))}
              <div className="flex items-center gap-5 pt-3" style={{ borderTop: `1px solid var(--color-line)` }}>
                <div className="flex items-center font-mono text-xs tracking-widest gap-1.5">
                  <button onClick={() => switchLang("en")} style={{ color: i18n.language === "en" ? "var(--color-ink)" : "var(--color-ghost)" }}>EN</button>
                  <span style={{ color: "var(--color-ghost)" }}>/</span>
                  <button onClick={() => switchLang("ru")} style={{ color: i18n.language === "ru" ? "var(--color-ink)" : "var(--color-ghost)" }}>RU</button>
                </div>
                <button onClick={toggleTheme} className="flex items-center gap-2 font-mono text-xs tracking-widest" style={{ color: "var(--color-dim)" }}>
                  {isDark ? <FiSun size={13} /> : <FiMoon size={13} />}
                  {isDark ? "Light" : "Dark"}
                </button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
