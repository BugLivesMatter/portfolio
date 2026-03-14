interface MarqueeProps { reverse?: boolean; }

const techs = [
  "Python", "C++", "C#", "Go", "Gin", "Docker", "Linux", "PyTorch",
  "TensorFlow", "PostgreSQL", "Flask", "REST", "Unity", "OpenCV",
  ".NET", "Entity Framework", "Git", "JavaScript", "LUA", "HTML",
];

export default function Marquee({ reverse = false }: MarqueeProps) {
  const items = [...techs, ...techs];

  return (
    <div
      className="relative overflow-hidden py-5 select-none"
      style={{
        borderTop: "1px solid var(--color-line)",
        borderBottom: "1px solid var(--color-line)",
        backgroundColor: "var(--color-panel)",
      }}
    >
      {/* Fade edges */}
      <div
        className="absolute inset-y-0 left-0 w-16 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to right, var(--color-panel), transparent)" }}
      />
      <div
        className="absolute inset-y-0 right-0 w-16 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to left, var(--color-panel), transparent)" }}
      />

      <div
        className="flex whitespace-nowrap"
        style={{
          animation: `marquee-${reverse ? "right" : "left"} 50s linear infinite`,
          width: "max-content",
        }}
      >
        {items.map((tech, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-5 px-6 font-mono text-xs tracking-[0.22em] uppercase"
            style={{ color: "var(--color-ghost)" }}
          >
            {tech}
            <span style={{ color: "var(--color-line)", fontSize: "0.45rem" }}>◆</span>
          </span>
        ))}
      </div>
    </div>
  );
}
