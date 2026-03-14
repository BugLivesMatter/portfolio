import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

export default function Education() {
  const { t } = useTranslation();

  return (
    <section id="education" className="py-44 px-8" style={{ borderTop: "1px solid var(--color-line)" }}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <p className="font-mono text-[11px] tracking-[0.35em] uppercase mb-5 flex items-center gap-3" style={{ color: "var(--color-faint)" }}>
            <span className="h-px w-7 inline-block" style={{ backgroundColor: "var(--color-ghost)" }} />
            {t("education.label")}
          </p>
          <h2 className="text-4xl sm:text-5xl font-bold" style={{ color: "var(--color-ink)" }}>{t("education.heading")}</h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="p-10 md:p-14 transition-colors duration-300"
          style={{ border: "1px solid var(--color-line)" }}
          onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.borderColor = "var(--color-stroke)")}
          onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.borderColor = "var(--color-line)")}
        >
          <div className="grid md:grid-cols-[1fr_auto] gap-10 items-start">
            <div className="space-y-5">
              <div className="flex flex-wrap gap-2.5">
                {[t("education.badge1"), t("education.badge2")].map((b) => (
                  <span
                    key={b}
                    className="font-mono text-[10px] uppercase tracking-[0.2em] px-3 py-1.5"
                    style={{ border: "1px solid var(--color-line)", color: "var(--color-ghost)" }}
                  >
                    {b}
                  </span>
                ))}
              </div>

              <h3 className="text-2xl md:text-3xl font-semibold leading-snug" style={{ color: "var(--color-ink)" }}>
                {t("education.university")}
              </h3>

              <p className="font-mono text-base tracking-wide" style={{ color: "var(--color-dim)" }}>
                {t("education.specialty")}
              </p>

              <p className="text-base leading-relaxed max-w-2xl" style={{ color: "var(--color-faint)" }}>
                {t("education.description")}
              </p>
            </div>

            <div className="font-mono text-right shrink-0">
              <span className="text-7xl font-bold leading-none block" style={{ color: "var(--color-line)" }}>B.Sc.</span>
              <span className="text-[10px] tracking-widest uppercase" style={{ color: "var(--color-ghost)" }}>SE</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
