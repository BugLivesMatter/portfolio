import { useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { FiGithub, FiLock } from "react-icons/fi";

interface ProjectMeta {
  github?: string;
  featured?: boolean;
  tags: string[];
}

function ProjectImage({ num }: { num: number }) {
  const [error, setError] = useState(false);
  if (error) {
    return (
      <div
        className="w-full h-full flex items-center justify-center font-mono text-2xl font-bold"
        style={{ color: "var(--color-line)", backgroundColor: "var(--color-card)" }}
      >
        {num}
      </div>
    );
  }
  return (
    <img
      src={`/${num}.png`}
      alt=""
      className="w-full h-full object-cover transition-transform duration-500 ease-out project-card-img"
      onError={() => setError(true)}
    />
  );
}

const projectMeta: ProjectMeta[] = [
  { tags: ["OpenCV", "Python"] },
  { tags: ["C#", "DirectML", "ONNX-Runtime"], featured: true },
  { tags: ["TypeScript", "React", "Vite", "Tailwind", "CryptoJS"], github: "https://github.com/BugLivesMatter/Best-Python-Obfuscator-NGL" },
  { tags: ["Unity", "C#", ".NET", "Mobile"] },
  { tags: ["Python", "PyQt5", "Xray-core", "VLESS"], github: "https://github.com/BugLivesMatter/AnonLine_VPN-VLESS" },
  { tags: ["Python", "Selenium", "PyQt5", "Telegram Bot"], github: "https://github.com/BugLivesMatter/LZT-Market-Monitor" },
];

export default function Projects() {
  const { t } = useTranslation();
  const items = t("projects.items", { returnObjects: true }) as Array<{ title: string; description: string }>;

  return (
    <section id="projects" className="py-44 px-8" style={{ borderTop: "1px solid var(--color-line)" }}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mb-20 flex items-end justify-between flex-wrap gap-6"
        >
          <div>
            <p className="font-mono text-[11px] tracking-[0.35em] uppercase mb-5 flex items-center gap-3" style={{ color: "var(--color-faint)" }}>
              <span className="h-px w-7 inline-block" style={{ backgroundColor: "var(--color-ghost)" }} />
              {t("projects.label")}
            </p>
            <h2 className="text-4xl sm:text-5xl font-bold" style={{ color: "var(--color-ink)" }}>{t("projects.heading")}</h2>
          </div>
          <a
            href="https://github.com/BugLivesMatter"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-[11px] tracking-widest uppercase flex items-center gap-2 transition-colors duration-200"
            style={{ color: "var(--color-ghost)" }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--color-ink)")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--color-ghost)")}
          >
            <FiGithub size={13} /> {t("projects.viewAll")}
          </a>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((proj, i) => {
            const meta = projectMeta[i] ?? { tags: [] };
            const imgNum = i + 1;
            return (
              <motion.article
                key={proj.title}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.07 }}
                className="project-card flex flex-col overflow-hidden rounded-sm"
                style={{ backgroundColor: "var(--color-base)", border: "1px solid var(--color-line)" }}
              >
                {/* Project image */}
                <div className="relative aspect-[16/10] w-full overflow-hidden" style={{ backgroundColor: "var(--color-panel)" }}>
                  <ProjectImage num={imgNum} />
                  {meta.featured && (
                    <span
                      className="absolute top-3 right-3 font-mono text-[9px] tracking-widest uppercase px-2.5 py-1"
                      style={{ color: "var(--color-ink)", backgroundColor: "var(--color-base)", border: "1px solid var(--color-line)" }}
                    >
                      {t("projects.featured")}
                    </span>
                  )}
                </div>

                <div className="p-6 flex flex-col gap-4 flex-1">
                  <div className="flex items-start gap-3">
                    <span
                      className="font-mono text-2xl font-bold leading-none select-none shrink-0 transition-colors duration-300"
                      style={{ color: "var(--color-line)" }}
                    >
                      {String(imgNum).padStart(2, "0")}
                    </span>
                    <div className="flex-1 min-w-0 flex items-start justify-between gap-2">
                      <h3 className="text-lg font-semibold leading-snug truncate transition-colors duration-300" style={{ color: "var(--color-ink)" }}>
                        {proj.title}
                      </h3>
                      <div className="shrink-0">
                        {meta.github ? (
                          <a
                            href={meta.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="transition-colors duration-200"
                            style={{ color: "var(--color-ghost)" }}
                            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--color-ink)")}
                            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--color-ghost)")}
                          >
                            <FiGithub size={16} />
                          </a>
                        ) : (
                          <FiLock size={14} style={{ color: "var(--color-line)" }} />
                        )}
                      </div>
                    </div>
                  </div>

                  <p className="text-[0.9375rem] leading-relaxed flex-1 transition-colors duration-300" style={{ color: "var(--color-dim)" }}>
                    {proj.description}
                  </p>

                  <div className="flex flex-wrap gap-x-3 gap-y-2 pt-3" style={{ borderTop: "1px solid var(--color-line)" }}>
                    {meta.tags.map((tag) => (
                      <span key={tag} className="font-mono text-[10px] tracking-widest uppercase" style={{ color: "var(--color-ghost)" }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
