import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function Cursor() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [dot, setDot] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const [hidden, setHidden] = useState(true);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    setIsTouch(window.matchMedia("(hover: none)").matches);
  }, []);

  useEffect(() => {
    if (isTouch) return;

    const move = (e: MouseEvent) => { setPos({ x: e.clientX, y: e.clientY }); setHidden(false); };
    const dotMove = (e: MouseEvent) => { setDot({ x: e.clientX, y: e.clientY }); };
    const over = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      setHovered(!!(t.tagName === "A" || t.tagName === "BUTTON" || t.closest("a") || t.closest("button")));
    };
    const leave = () => setHidden(true);
    const enter = () => setHidden(false);

    window.addEventListener("mousemove", move);
    window.addEventListener("mousemove", dotMove);
    window.addEventListener("mouseover", over);
    document.addEventListener("mouseleave", leave);
    document.addEventListener("mouseenter", enter);

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mousemove", dotMove);
      window.removeEventListener("mouseover", over);
      document.removeEventListener("mouseleave", leave);
      document.removeEventListener("mouseenter", enter);
    };
  }, [isTouch]);

  if (isTouch) return null;

  const size = hovered ? 48 : 32;

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 pointer-events-none rounded-full mix-blend-difference"
        style={{ border: "1px solid white", zIndex: 9999 }}
        animate={{ x: pos.x - size / 2, y: pos.y - size / 2, width: size, height: size, opacity: hidden ? 0 : 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 28, mass: 0.5 }}
      />
      <motion.div
        className="fixed top-0 left-0 pointer-events-none w-1.5 h-1.5 rounded-full bg-white mix-blend-difference"
        style={{ zIndex: 9999 }}
        animate={{ x: dot.x - 3, y: dot.y - 3, opacity: hidden ? 0 : 1 }}
        transition={{ duration: 0 }}
      />
    </>
  );
}
