import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { FiGithub, FiGitCommit, FiExternalLink, FiCode, FiUsers, FiActivity } from "react-icons/fi";
import { GitHubCalendar } from "react-github-calendar";
import { useTheme } from "../context/ThemeContext";

const USERNAME = "BugLivesMatter";
const GITHUB_URL = "https://github.com/BugLivesMatter";

interface GitHubEvent {
  id: string;
  type: string;
  repo: { name: string; url: string };
  payload: {
    commits?: Array<{ sha: string; message: string }>;
    ref?: string;
  };
  created_at: string;
}

interface GitHubUser {
  public_repos: number;
  followers: number;
}

interface CommitItem {
  id: string;
  repo: string;
  branch: string;
  message: string;
  time: string;
}

function timeAgo(isoDate: string, lang: string): string {
  const diff = Math.floor((Date.now() - new Date(isoDate).getTime()) / 1000);
  if (lang === "ru") {
    if (diff < 60) return `${diff}с назад`;
    if (diff < 3600) return `${Math.floor(diff / 60)}м назад`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}ч назад`;
    return `${Math.floor(diff / 86400)}д назад`;
  }
  if (diff < 60) return `${diff}s ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}

function truncate(str: string, max = 72): string {
  const first = str.split("\n")[0];
  return first.length > max ? first.slice(0, max) + "…" : first;
}

export default function GitHubActivity() {
  const { t, i18n } = useTranslation();
  const { isDark } = useTheme();

  const [commits, setCommits] = useState<CommitItem[]>([]);
  const [user, setUser] = useState<GitHubUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(false);

    Promise.all([
      fetch(`https://api.github.com/users/${USERNAME}/events/public?per_page=60`).then((r) => r.json()),
      fetch(`https://api.github.com/users/${USERNAME}`).then((r) => r.json()),
    ])
      .then(([events, userData]: [GitHubEvent[], GitHubUser]) => {
        if (cancelled) return;
        // parse push events → individual commits
        const list: CommitItem[] = [];
        for (const ev of events) {
          if (ev.type !== "PushEvent") continue;
          const branch = (ev.payload.ref ?? "").replace("refs/heads/", "");
          for (const c of ev.payload.commits ?? []) {
            list.push({
              id: c.sha,
              repo: ev.repo.name.replace(`${USERNAME}/`, ""),
              branch,
              message: truncate(c.message),
              time: timeAgo(ev.created_at, i18n.language),
            });
            if (list.length >= 12) break;
          }
          if (list.length >= 12) break;
        }
        setCommits(list);
        setUser(userData);
        setLoading(false);
      })
      .catch(() => {
        if (!cancelled) { setError(true); setLoading(false); }
      });

    return () => { cancelled = true; };
  }, [i18n.language]);

  const calendarTheme = isDark
    ? {
        dark: ["#111111", "#1c2a1c", "#234d23", "#2e6b2e", "#3a8c3a"],
      }
    : {
        light: ["#eeeeee", "#c8dac8", "#9fc09f", "#6b9f6b", "#3a7a3a"],
      };

  const stats = [
    { icon: <FiCode size={14} />, label: t("github.repositories"), val: user ? String(user.public_repos) : "—" },
    { icon: <FiUsers size={14} />, label: t("github.followers"), val: user ? String(user.followers) : "—" },
  ];

  return (
    <section id="github" className="py-44 px-8" style={{ borderTop: "1px solid var(--color-line)" }}>
      <div className="max-w-7xl mx-auto space-y-16">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="flex items-end justify-between flex-wrap gap-6"
        >
          <div>
            <p
              className="font-mono text-[11px] tracking-[0.35em] uppercase mb-5 flex items-center gap-3"
              style={{ color: "var(--color-faint)" }}
            >
              <span className="h-px w-7 inline-block" style={{ backgroundColor: "var(--color-ghost)" }} />
              {t("github.label")}
            </p>
            <h2 className="text-4xl sm:text-5xl font-bold" style={{ color: "var(--color-ink)" }}>
              {t("github.heading")}
            </h2>
          </div>

          <div className="flex items-center gap-5">
            {stats.map((s) => (
              <div key={s.label} className="text-center px-5 py-3" style={{ border: "1px solid var(--color-line)" }}>
                <div className="flex items-center justify-center gap-1.5 mb-1" style={{ color: "var(--color-ghost)" }}>
                  {s.icon}
                </div>
                <p className="font-mono text-xl font-bold" style={{ color: "var(--color-ink)" }}>{s.val}</p>
                <p className="font-mono text-[9px] tracking-widest uppercase mt-1" style={{ color: "var(--color-ghost)" }}>{s.label}</p>
              </div>
            ))}

            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:inline-flex items-center gap-2 px-5 py-3 font-mono text-xs tracking-widest uppercase transition-all duration-200"
              style={{ border: "1px solid var(--color-line)", color: "var(--color-dim)" }}
              onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "var(--color-stroke)"; el.style.color = "var(--color-ink)"; }}
              onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "var(--color-line)"; el.style.color = "var(--color-dim)"; }}
            >
              <FiGithub size={13} />
              {t("github.viewProfile")}
              <FiExternalLink size={11} />
            </a>
          </div>
        </motion.div>

        {/* Calendar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="p-8 overflow-x-auto github-calendar-wrapper"
          style={{ border: "1px solid var(--color-line)", backgroundColor: "var(--color-panel)" }}
        >
          <div className="flex items-center gap-3 mb-6">
            <FiActivity size={13} style={{ color: "var(--color-ghost)" }} />
            <p className="font-mono text-[10px] tracking-[0.3em] uppercase" style={{ color: "var(--color-ghost)" }}>
              {t("github.contributions")}
            </p>
          </div>
          <GitHubCalendar
            username={USERNAME}
            colorScheme={isDark ? "dark" : "light"}
            theme={calendarTheme}
            blockSize={12}
            blockMargin={4}
            fontSize={11}
            style={{ fontFamily: "JetBrains Mono, monospace" }}
          />
        </motion.div>

        {/* Recent commits */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="terminal-block overflow-hidden"
        >
          {/* Terminal header */}
          <div className="flex items-center gap-3 px-6 py-4" style={{ borderBottom: "1px solid var(--color-line)" }}>
            <div className="flex gap-1.5">
              {["var(--color-stroke)", "var(--color-stroke)", "var(--color-stroke)"].map((c, i) => (
                <span key={i} className="w-3 h-3 rounded-full" style={{ backgroundColor: c }} />
              ))}
            </div>
            <div className="flex items-center gap-2 ml-2">
              <FiGitCommit size={11} style={{ color: "var(--color-ghost)" }} />
              <span className="font-mono text-[10px] tracking-widest uppercase" style={{ color: "var(--color-ghost)" }}>
                {t("github.recentCommits")} — {USERNAME}
              </span>
            </div>
          </div>

          {/* Body */}
          <div className="p-2">
            {loading && (
              <div className="px-4 py-10 text-center">
                <p className="font-mono text-xs animate-pulse" style={{ color: "var(--color-ghost)" }}>
                  {t("github.loading")}
                </p>
              </div>
            )}

            {error && (
              <div className="px-4 py-10 text-center">
                <p className="font-mono text-xs" style={{ color: "var(--color-ghost)" }}>{t("github.error")}</p>
              </div>
            )}

            {!loading && !error && commits.length === 0 && (
              <div className="px-4 py-10 text-center">
                <p className="font-mono text-xs" style={{ color: "var(--color-ghost)" }}>{t("github.noActivity")}</p>
              </div>
            )}

            {!loading && !error && commits.map((c, i) => (
              <motion.div
                key={`${c.id}-${i}`}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.25, delay: i * 0.03 }}
                className="group flex items-start gap-4 px-4 py-3 rounded-sm transition-colors duration-150"
                style={{ borderBottom: i < commits.length - 1 ? "1px solid var(--color-line)" : "none" }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.backgroundColor = "var(--color-ghost)")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.backgroundColor = "transparent")}
              >
                {/* Line indicator */}
                <span
                  className="font-mono text-[10px] shrink-0 pt-0.5 select-none tabular-nums"
                  style={{ color: "var(--color-line)", minWidth: "1.5rem" }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>

                <FiGitCommit
                  size={12}
                  className="shrink-0 mt-0.5 transition-colors duration-150"
                  style={{ color: "var(--color-ghost)" }}
                />

                <div className="flex-1 min-w-0">
                  <p
                    className="font-mono text-[0.8125rem] leading-snug truncate transition-colors duration-150"
                    style={{ color: "var(--color-dim)" }}
                  >
                    {c.message}
                  </p>
                  <div className="flex items-center gap-2 mt-1 flex-wrap">
                    <span className="font-mono text-[9px] tracking-widest uppercase" style={{ color: "var(--color-line)" }}>
                      {c.repo}
                    </span>
                    {c.branch && (
                      <>
                        <span style={{ color: "var(--color-line)" }}>·</span>
                        <span className="font-mono text-[9px]" style={{ color: "var(--color-ghost)" }}>
                          {c.branch}
                        </span>
                      </>
                    )}
                  </div>
                </div>

                <span
                  className="font-mono text-[9px] shrink-0 pt-0.5 tabular-nums whitespace-nowrap"
                  style={{ color: "var(--color-ghost)" }}
                >
                  {c.time}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
