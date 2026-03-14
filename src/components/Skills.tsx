import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import {
  SiDocker, SiCplusplus, SiSharp, SiHtml5, SiJavascript, SiLua, SiGo,
  SiLinux, SiPytorch, SiUnity, SiPython, SiGit, SiPostgresql, SiFlask,
  SiTensorflow, SiDotnet, SiOpencv,
} from "react-icons/si";
import { VscCode } from "react-icons/vsc";
import { TbApi } from "react-icons/tb";
import type { ReactNode } from "react";

interface Skill { name: string; icon: ReactNode; catKey: string; }

const skills: Skill[] = [
  { name: "Python",           icon: <SiPython />,     catKey: "languages" },
  { name: "C++",              icon: <SiCplusplus />,  catKey: "languages" },
  { name: "C#",               icon: <SiSharp />,      catKey: "languages" },
  { name: "C",                icon: <VscCode />,      catKey: "languages" },
  { name: "Go",               icon: <SiGo />,         catKey: "languages" },
  { name: "JavaScript",       icon: <SiJavascript />, catKey: "languages" },
  { name: "LUA",              icon: <SiLua />,        catKey: "languages" },
  { name: "HTML",             icon: <SiHtml5 />,      catKey: "languages" },
  { name: "PyTorch",          icon: <SiPytorch />,    catKey: "aiml" },
  { name: "TensorFlow",       icon: <SiTensorflow />, catKey: "aiml" },
  { name: "OpenCV",           icon: <SiOpencv />,     catKey: "aiml" },
  { name: "Flask",            icon: <SiFlask />,      catKey: "backend" },
  { name: "Gin",              icon: <SiGo />,         catKey: "backend" },
  { name: "REST",             icon: <TbApi />,        catKey: "backend" },
  { name: ".NET",             icon: <SiDotnet />,     catKey: "backend" },
  { name: "Entity Framework", icon: <SiDotnet />,     catKey: "backend" },
  { name: "PostgreSQL",       icon: <SiPostgresql />, catKey: "database" },
  { name: "Docker",           icon: <SiDocker />,     catKey: "devops" },
  { name: "Linux",            icon: <SiLinux />,      catKey: "devops" },
  { name: "Git",              icon: <SiGit />,        catKey: "devops" },
  { name: "Unity",            icon: <SiUnity />,      catKey: "other" },
];

const catKeys = ["languages", "aiml", "backend", "database", "devops", "other"];

export default function Skills() {
  const { t } = useTranslation();

  return (
    <section id="skills" className="py-44 px-8" style={{ borderTop: "1px solid var(--color-line)" }}>
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
            {t("skills.label")}
          </p>
          <h2 className="text-4xl sm:text-5xl font-bold" style={{ color: "var(--color-ink)" }}>{t("skills.heading")}</h2>
        </motion.div>

        <div className="space-y-12">
          {catKeys.map((catKey, ci) => (
            <motion.div
              key={catKey}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: ci * 0.06 }}
            >
              <div className="flex items-center gap-5 mb-6">
                <p className="font-mono text-xs tracking-[0.28em] uppercase shrink-0" style={{ color: "var(--color-muted)" }}>
                  {t(`skills.categories.${catKey}`)}
                </p>
                <div className="h-px flex-1" style={{ backgroundColor: "var(--color-line)" }} />
              </div>
              <div className="flex flex-wrap gap-3">
                {skills.filter((s) => s.catKey === catKey).map((skill, i) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 1, y: 6 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.35, delay: i * 0.03 }}
                    className="skill-badge"
                  >
                    <span className="skill-icon">{skill.icon}</span>
                    <span className="skill-name font-mono">{skill.name}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
