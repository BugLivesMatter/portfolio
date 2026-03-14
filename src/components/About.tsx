import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const fadeUp = {
  hidden: { opacity: 0, y: 44 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.25, 0.1, 0.25, 1] } },
} as const;

const terminalLines = [
  { key: "name",     val: '"Nikita Kovalenko"' },
  { key: "role",     val: '"Software Engineer"' },
  { key: "location", val: '"Russia"' },
  { key: "status",   val: '"open_to_work → true"', highlight: true },
  { key: "years",    val: '"3+"' },
];

export default function About() {
  const { t } = useTranslation();

  const info = [
    t("about.info.location", { returnObjects: true }) as { label: string; value: string },
    t("about.info.focus",    { returnObjects: true }) as { label: string; value: string },
    t("about.info.degree",   { returnObjects: true }) as { label: string; value: string },
  ];

  return (
    <section id="about" className="py-44 px-8" style={{ borderTop: "1px solid var(--color-line)" }}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.15 } } }}
          className="grid md:grid-cols-2 gap-24 items-center"
        >
          {/* Avatar */}
          <motion.div variants={fadeUp} className="flex justify-center md:justify-start">
            <div className="relative">
              {["-top-3 -left-3 border-t border-l", "-top-3 -right-3 border-t border-r", "-bottom-3 -left-3 border-b border-l", "-bottom-3 -right-3 border-b border-r"].map((cls, i) => (
                <div key={i} className={`absolute w-8 h-8 ${cls}`} style={{ borderColor: "var(--color-stroke)" }} />
              ))}
              <img src="/avatar.png" alt="Nikita Kovalenko" className="w-80 h-80 object-cover grayscale contrast-110 relative z-10 block" />
              <div className="absolute bottom-0 left-0 right-0 h-24 z-20 pointer-events-none" style={{ background: "linear-gradient(to top, var(--color-base), transparent)" }} />

              {/* Status badge */}
              <motion.div
                initial={{ opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.7, duration: 0.5 }}
                className="absolute -right-5 top-8 px-4 py-2.5 z-30"
                style={{ backgroundColor: "var(--color-base)", border: "1px solid var(--color-line)" }}
              >
                <p className="font-mono text-[9px] uppercase tracking-widest mb-1" style={{ color: "var(--color-ghost)" }}>{t("about.statusLabel")}</p>
                <p className="font-mono text-xs flex items-center gap-2" style={{ color: "var(--color-ink)" }}>
                  <span className="w-2 h-2 rounded-full inline-block animate-pulse" style={{ backgroundColor: "var(--color-ink)" }} />
                  {t("about.status")}
                </p>
              </motion.div>
            </div>
          </motion.div>

          {/* Text */}
          <motion.div variants={fadeUp} className="space-y-7">
            <p className="font-mono text-[11px] tracking-[0.35em] uppercase flex items-center gap-3" style={{ color: "var(--color-faint)" }}>
              <span className="h-px w-7 inline-block" style={{ backgroundColor: "var(--color-ghost)" }} />
              {t("about.label")}
            </p>
            <h2 className="text-4xl sm:text-5xl font-bold leading-tight" style={{ color: "var(--color-ink)" }}>
              {t("about.h1")}
              <br />
              <span style={{ color: "transparent", WebkitTextStroke: "1px var(--outline-color)" }}>
                {t("about.h2")}
              </span>
            </h2>
            <div className="space-y-4 text-base leading-relaxed" style={{ color: "var(--color-dim)" }}>
              <p>{t("about.p1")}</p>
              <p>{t("about.p2")}</p>
              <p>{t("about.p3")}</p>
            </div>

            {/* Info cards */}
            <div className="pt-2 grid grid-cols-3 gap-3">
              {info.map(({ label, value }) => (
                <div
                  key={label}
                  className="p-4 transition-colors duration-200"
                  style={{ border: "1px solid var(--color-line)" }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.borderColor = "var(--color-stroke)")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.borderColor = "var(--color-line)")}
                >
                  <p className="font-mono text-[9px] uppercase tracking-widest mb-2" style={{ color: "var(--color-ghost)" }}>{label}</p>
                  <p className="font-mono text-sm" style={{ color: "var(--color-muted)" }}>{value}</p>
                </div>
              ))}
            </div>

            {/* Terminal */}
            <div className="terminal-block text-xs leading-relaxed overflow-hidden">
              <div className="flex items-center gap-2 px-5 py-3" style={{ borderBottom: "1px solid var(--color-line)" }}>
                {["var(--color-ghost)", "var(--color-ghost)", "var(--color-ghost)"].map((c, i) => (
                  <span key={i} className="w-3 h-3 rounded-full" style={{ backgroundColor: c }} />
                ))}
                <span className="ml-3 font-mono text-[10px]" style={{ color: "var(--color-ghost)" }}>profile.yaml</span>
              </div>
              <div className="px-5 py-4 space-y-1.5">
                {terminalLines.map(({ key, val, highlight }) => (
                  <div key={key} className="flex gap-3">
                    <span style={{ color: "var(--color-faint)" }}>{key}:</span>
                    <span style={{ color: highlight ? "var(--color-ink)" : "var(--color-muted)" }}>{val}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
