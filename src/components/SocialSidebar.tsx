import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiGithub, FiCheck } from "react-icons/fi";
import { SiTelegram, SiVk, SiDiscord } from "react-icons/si";

interface SocialItem {
  icon: React.ReactNode;
  label: string;
  href?: string;
  copy?: string;
}

const socials: SocialItem[] = [
  { icon: <FiGithub size={16} />,    label: "GitHub",   href: "https://github.com/BugLivesMatter" },
  { icon: <SiTelegram size={15} />,  label: "Telegram", href: "https://t.me/BDSMBDSMBDSMBDSMBDSMBDSMBDSMBDSM" },
  { icon: <SiVk size={16} />,        label: "VK",       href: "https://vk.com/robloxemoboy" },
  { icon: <SiDiscord size={15} />,   label: "Discord",  copy: "ilikebigtities" },
];

export default function SocialSidebar() {
  const [copied, setCopied] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);

  const handleCopy = async (text: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed left-7 bottom-0 z-40 hidden lg:flex flex-col items-center gap-5">
      {socials.map((s) => {
        const isHovered = hovered === s.label;
        const isCopied = copied && s.copy;

        const inner = (
          <motion.div
            className="relative flex items-center gap-3"
            onMouseEnter={() => setHovered(s.label)}
            onMouseLeave={() => setHovered(null)}
          >
            <motion.span
              animate={{ color: isHovered ? "var(--color-ink)" : "var(--color-ghost)" }}
              transition={{ duration: 0.2 }}
              className="block"
            >
              {isCopied ? <FiCheck size={15} /> : s.icon}
            </motion.span>

            <AnimatePresence>
              {isHovered && (
                <motion.span
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -6 }}
                  transition={{ duration: 0.15 }}
                  className="absolute left-7 font-mono text-[9px] tracking-widest uppercase whitespace-nowrap px-2 py-1"
                  style={{ color: "var(--color-muted)", backgroundColor: "var(--color-panel)", border: "1px solid var(--color-line)" }}
                >
                  {isCopied ? "Copied!" : s.label}
                </motion.span>
              )}
            </AnimatePresence>
          </motion.div>
        );

        if (s.href) {
          return (
            <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer">
              {inner}
            </a>
          );
        }
        return (
          <button key={s.label} onClick={() => handleCopy(s.copy!)}>
            {inner}
          </button>
        );
      })}

      <div className="w-px h-24 mt-1" style={{ backgroundColor: "var(--color-line)" }} />
    </div>
  );
}
