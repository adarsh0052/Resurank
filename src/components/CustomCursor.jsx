import React, { useEffect, useState } from "react";

function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [ringPosition, setRingPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
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

  // Handle trailing ring lag effect using requestAnimationFrame
  useEffect(() => {
    let animFrame;
    const updateRing = () => {
      setRingPosition((prev) => {
        const dx = position.x - prev.x;
        const dy = position.y - prev.y;
        const speed = 0.15; // trail delay speed parameter
        return {
          x: prev.x + dx * speed,
          y: prev.y + dy * speed,
        };
      });
      animFrame = requestAnimationFrame(updateRing);
    };
    animFrame = requestAnimationFrame(updateRing);
    return () => cancelAnimationFrame(animFrame);
  }, [position]);

  // Handle hover effect on clickable elements
  useEffect(() => {
    const handleMouseOver = (e) => {
      const target = e.target;
      if (
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button") ||
        target.getAttribute("role") === "button" ||
        target.tagName === "INPUT" ||
        target.tagName === "SELECT" ||
        target.classList.contains("cursor-pointer") ||
        target.tagName === "TEXTAREA"
      ) {
        setIsHovered(true);
      }
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
    <div className="hidden lg:block">
      {/* Central Dot */}
      <div
        className="custom-cursor-dot"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          width: "4px",
          height: "4px",
          borderRadius: "0px",
          backgroundColor: "rgb(15, 23, 42)",
        }}
      />
      {/* Trailing Ring (Square Frame) */}
      <div
        className="custom-cursor-ring"
        style={{
          left: `${ringPosition.x}px`,
          top: `${ringPosition.y}px`,
          width: isHovered ? "20px" : "12px",
          height: isHovered ? "20px" : "12px",
          borderRadius: "0px",
          borderColor: isHovered ? "rgba(15, 23, 42, 0.4)" : "rgba(15, 23, 42, 0.15)",
          backgroundColor: isHovered ? "rgba(15, 23, 42, 0.03)" : "transparent",
        }}
      />
    </div>
  );
}

export default CustomCursor;
