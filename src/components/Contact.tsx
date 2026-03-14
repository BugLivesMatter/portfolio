import { useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { FiGithub, FiMail, FiExternalLink, FiCopy, FiCheck } from "react-icons/fi";
import { SiTelegram, SiVk, SiDiscord } from "react-icons/si";
import type { ReactNode } from "react";

interface Social {
  name: string;
  handle: string;
  href?: string;
  copy?: string;
  icon: ReactNode;
}

const socials: Social[] = [
  {
    name: "GitHub",
    handle: "BugLivesMatter",
    href: "https://github.com/BugLivesMatter",
    icon: <FiGithub size={24} />,
  },
  {
    name: "Telegram",
    handle: "@BDSMBDSMBDSMBDSMBDSMBDSMBDSMBDSM",
    href: "https://t.me/BDSMBDSMBDSMBDSMBDSMBDSMBDSMBDSM",
    icon: <SiTelegram size={24} />,
  },
  {
    name: "VK",
    handle: "robloxemoboy",
    href: "https://vk.com/robloxemoboy",
    icon: <SiVk size={24} />,
  },
  {
    name: "Discord",
    handle: "ilikebigtities",
    copy: "ilikebigtities",
    icon: <SiDiscord size={24} />,
  },
];

function SocialCard({ social }: { social: Social }) {
  const { t } = useTranslation();
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!social.copy) return;
    await navigator.clipboard.writeText(social.copy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const cardContent = (
    <div className="p-7 flex flex-col gap-5 h-full">
      <div className="flex items-start justify-between">
        <span
          className="transition-colors duration-300"
          style={{ color: "var(--color-faint)" }}
        >
          {social.icon}
        </span>
        <span
          className="transition-colors duration-300"
          style={{ color: "var(--color-ghost)" }}
        >
          {social.copy
            ? copied
              ? <FiCheck size={14} />
              : <FiCopy size={14} />
            : <FiExternalLink size={14} />}
        </span>
      </div>
      <div>
        <p
          className="font-mono text-[10px] tracking-[0.25em] uppercase mb-2"
          style={{ color: "var(--color-ghost)" }}
        >
          {social.name}
        </p>
        <p
          className="font-mono text-sm font-medium truncate transition-colors duration-200"
          style={{ color: copied ? "var(--color-ink)" : "var(--color-dim)" }}
        >
          {copied ? t("contact.copied") : social.handle}
        </p>
      </div>
    </div>
  );

  const sharedStyle = {
    border: "1px solid var(--color-line)",
    backgroundColor: "var(--color-base)",
  };

  const sharedClass = "block w-full text-left transition-all duration-300 group";

  const hoverStyle = (e: React.MouseEvent<HTMLElement>, enter: boolean) => {
    const el = e.currentTarget as HTMLElement;
    el.style.borderColor = enter ? "var(--color-stroke)" : "var(--color-line)";
    el.style.backgroundColor = enter ? "var(--color-panel)" : "var(--color-base)";
    const icon = el.querySelector("[data-icon]") as HTMLElement | null;
    if (icon) icon.style.color = enter ? "var(--color-muted)" : "var(--color-faint)";
  };

  if (social.href) {
    return (
      <motion.a
        href={social.href}
        target="_blank"
        rel="noopener noreferrer"
        className={sharedClass}
        style={sharedStyle}
        whileHover={{ y: -4 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        onMouseEnter={(e) => hoverStyle(e, true)}
        onMouseLeave={(e) => hoverStyle(e, false)}
      >
        {cardContent}
      </motion.a>
    );
  }

  return (
    <motion.button
      onClick={handleCopy}
      className={sharedClass}
      style={sharedStyle}
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      onMouseEnter={(e) => hoverStyle(e, true)}
      onMouseLeave={(e) => hoverStyle(e, false)}
    >
      {cardContent}
    </motion.button>
  );
}

export default function Contact() {
  const { t } = useTranslation();

  return (
    <section id="contact" className="py-44 px-8" style={{ borderTop: "1px solid var(--color-line)" }}>
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <p
            className="font-mono text-[11px] tracking-[0.4em] uppercase mb-8 flex items-center justify-center gap-4"
            style={{ color: "var(--color-faint)" }}
          >
            <span className="h-px w-10 inline-block" style={{ backgroundColor: "var(--color-ghost)" }} />
            {t("contact.label")}
            <span className="h-px w-10 inline-block" style={{ backgroundColor: "var(--color-ghost)" }} />
          </p>

          <h2
            className="text-6xl sm:text-7xl md:text-8xl font-bold leading-[0.95] tracking-tight mb-8"
            style={{ color: "var(--color-ink)" }}
          >
            {t("contact.h1")}
            <br />
            <span style={{ color: "transparent", WebkitTextStroke: "1px var(--outline-color)" }}>
              {t("contact.h2")}
            </span>
          </h2>

          <p className="text-base leading-relaxed mb-10 max-w-sm mx-auto" style={{ color: "var(--color-dim)" }}>
            {t("contact.description")}
          </p>

          <motion.a
            href="mailto:your@email.com"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center justify-center gap-3 px-10 py-5 font-mono text-sm font-bold tracking-[0.15em] uppercase transition-opacity duration-200 hover:opacity-80"
            style={{ backgroundColor: "var(--color-mark)", color: "var(--color-on-mark)" }}
          >
            <FiMail size={16} />
            {t("contact.write")}
          </motion.a>
        </motion.div>

        {/* Social grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div
            className="h-px w-full mb-10"
            style={{ background: "linear-gradient(to right, transparent, var(--color-line), transparent)" }}
          />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {socials.map((s, i) => (
              <motion.div
                key={s.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
              >
                <SocialCard social={s} />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-24 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{ borderTop: "1px solid var(--color-line)" }}
        >
          <span className="font-mono text-sm font-bold tracking-[0.3em] uppercase" style={{ color: "var(--color-ghost)" }}>NK.</span>
          <span className="font-mono text-[10px] tracking-widest uppercase" style={{ color: "var(--color-ghost)" }}>
            © {new Date().getFullYear()} Nikita Kovalenko — {t("contact.copyright")}
          </span>
          <span className="font-mono text-[10px] tracking-widest uppercase" style={{ color: "var(--color-ghost)" }}>
            {t("contact.builtWith")}
          </span>
        </motion.div>
      </div>
    </section>
  );
}
