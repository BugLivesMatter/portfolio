import { useEffect, useRef } from "react";
import { useTheme } from "../context/ThemeContext";

interface Particle {
  x: number; y: number;
  vx: number; vy: number;
  baseVx: number; baseVy: number;
  size: number;
}

const COUNT = 90;
const MAX_DIST = 130;
const MOUSE_R = 160;
const FORCE = 0.35;
const DAMP = 0.96;

export default function ParticleBackground() {
  const { isDark } = useTheme();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const particlesRef = useRef<Particle[]>([]);
  const rafRef = useRef<number>(0);
  const isDarkRef = useRef(isDark);

  useEffect(() => { isDarkRef.current = isDark; }, [isDark]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    window.addEventListener("resize", resize);

    particlesRef.current = Array.from({ length: COUNT }, () => {
      const vx = (Math.random() - 0.5) * 0.5;
      const vy = (Math.random() - 0.5) * 0.5;
      return { x: Math.random() * canvas.width, y: Math.random() * canvas.height, vx, vy, baseVx: vx, baseVy: vy, size: Math.random() * 1.2 + 0.3 };
    });

    const onMM = (e: MouseEvent) => { mouseRef.current = { x: e.clientX, y: e.clientY }; };
    window.addEventListener("mousemove", onMM);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const p = particlesRef.current;
      const m = mouseRef.current;
      const dark = isDarkRef.current;
      const rgb = dark ? "255,255,255" : "20,20,20";

      for (const pt of p) {
        const dx = pt.x - m.x, dy = pt.y - m.y;
        const d = Math.sqrt(dx * dx + dy * dy);
        if (d < MOUSE_R && d > 0) {
          const f = ((MOUSE_R - d) / MOUSE_R) * FORCE;
          pt.vx += (dx / d) * f; pt.vy += (dy / d) * f;
        }
        pt.vx = pt.vx * DAMP + pt.baseVx * (1 - DAMP);
        pt.vy = pt.vy * DAMP + pt.baseVy * (1 - DAMP);
        pt.x += pt.vx; pt.y += pt.vy;
        if (pt.x < 0) { pt.x = 0; pt.vx *= -1; pt.baseVx *= -1; }
        if (pt.x > canvas.width) { pt.x = canvas.width; pt.vx *= -1; pt.baseVx *= -1; }
        if (pt.y < 0) { pt.y = 0; pt.vy *= -1; pt.baseVy *= -1; }
        if (pt.y > canvas.height) { pt.y = canvas.height; pt.vy *= -1; pt.baseVy *= -1; }
      }

      for (let i = 0; i < p.length; i++) {
        for (let j = i + 1; j < p.length; j++) {
          const dx = p[i].x - p[j].x, dy = p[i].y - p[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < MAX_DIST) {
            ctx.strokeStyle = `rgba(${rgb},${(1 - d / MAX_DIST) * 0.15})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath(); ctx.moveTo(p[i].x, p[i].y); ctx.lineTo(p[j].x, p[j].y); ctx.stroke();
          }
        }
      }

      for (const pt of p) {
        const dx = pt.x - m.x, dy = pt.y - m.y;
        const dm = Math.sqrt(dx * dx + dy * dy);
        const br = dm < MOUSE_R ? 0.3 + (1 - dm / MOUSE_R) * 0.65 : 0.3;
        ctx.fillStyle = `rgba(${rgb},${br})`;
        ctx.beginPath(); ctx.arc(pt.x, pt.y, pt.size, 0, Math.PI * 2); ctx.fill();
      }

      rafRef.current = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMM);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none" style={{ zIndex: 0 }} />;
}
