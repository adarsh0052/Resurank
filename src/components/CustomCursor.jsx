import React, { useEffect, useState } from "react";

function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [ringPosition, setRingPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (event) => {
      setPosition({ x: event.clientX, y: event.clientY });
      setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  useEffect(() => {
    let animationFrame;

    const updateRing = () => {
      setRingPosition((prev) => {
        const dx = position.x - prev.x;
        const dy = position.y - prev.y;
        const speed = 0.16;

        return {
          x: prev.x + dx * speed,
          y: prev.y + dy * speed,
        };
      });

      animationFrame = requestAnimationFrame(updateRing);
    };

    animationFrame = requestAnimationFrame(updateRing);

    return () => cancelAnimationFrame(animationFrame);
  }, [position]);

  useEffect(() => {
    const isInteractiveElement = (target) =>
      target instanceof Element &&
      (target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.tagName === "INPUT" ||
        target.tagName === "SELECT" ||
        target.tagName === "TEXTAREA" ||
        target.getAttribute("role") === "button" ||
        target.classList.contains("cursor-pointer") ||
        target.closest("a") ||
        target.closest("button") ||
        target.closest("[role='button']"));

    const handleMouseOver = (event) => {
      setIsHovered(isInteractiveElement(event.target));
    };

    const handleMouseOut = () => {
      setIsHovered(false);
    };

    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseout", handleMouseOut);

    return () => {
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] hidden lg:block">
      <div
        className="custom-cursor-dot"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
        }}
      />

      <div
        className="custom-cursor-ring"
        style={{
          left: `${ringPosition.x}px`,
          top: `${ringPosition.y}px`,
          width: isHovered ? "34px" : "18px",
          height: isHovered ? "34px" : "18px",
          borderColor: isHovered
            ? "rgba(255, 90, 31, 0.72)"
            : "rgba(255, 90, 31, 0.34)",
          backgroundColor: isHovered
            ? "rgba(255, 90, 31, 0.08)"
            : "rgba(255, 90, 31, 0.02)",
        }}
      />

      <style>{`
        .custom-cursor-dot,
        .custom-cursor-ring {
          position: fixed;
          pointer-events: none;
          transform: translate(-50%, -50%);
          will-change: left, top, width, height;
        }

        .custom-cursor-dot {
          width: 5px;
          height: 5px;
          border-radius: 999px;
          background: #ff5a1f;
          box-shadow:
            0 0 0 1px rgba(255, 255, 255, 0.18),
            0 0 18px rgba(255, 90, 31, 0.72);
        }

        .custom-cursor-ring {
          border: 1px solid rgba(255, 90, 31, 0.34);
          border-radius: 999px;
          transition:
            width 0.22s cubic-bezier(0.16, 1, 0.3, 1),
            height 0.22s cubic-bezier(0.16, 1, 0.3, 1),
            border-color 0.22s cubic-bezier(0.16, 1, 0.3, 1),
            background-color 0.22s cubic-bezier(0.16, 1, 0.3, 1);
          box-shadow: 0 0 28px rgba(255, 90, 31, 0.12);
        }
      `}</style>
    </div>
  );
}

export default CustomCursor;