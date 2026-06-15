import React, { useEffect, useRef } from "react";
import { cn } from "../../lib/Utils";

export const Spotlight = ({
  className,
  fill = "rgba(255,255,255,0.28)",
  active = true,
}) => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!active) return;

    const handleMouseMove = (e) => {
      if (!containerRef.current) return;
      
      const halfWidth = window.innerWidth / 2;

      if (e.clientX >= halfWidth) {
        containerRef.current.style.setProperty("--mouse-x", `${e.clientX}px`);
        containerRef.current.style.setProperty("--mouse-y", `${e.clientY}px`);
        containerRef.current.style.setProperty("--spotlight-opacity", "1");
      } else {
        containerRef.current.style.setProperty("--spotlight-opacity", "0");
      }
    };

    const handleMouseLeave = () => {
      if (containerRef.current) {
        containerRef.current.style.setProperty("--spotlight-opacity", "0");
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [active]);

  if (!active) return null;

  return (
    <div
      ref={containerRef}
      className={cn(
        "pointer-events-none fixed inset-0 z-[1] transition-opacity duration-200",
        className
      )}
      style={{
        opacity: "var(--spotlight-opacity, 0)",
        clipPath: "polygon(50% 0%, 100% 0%, 100% 100%, 50% 100%)",
        background: `
          radial-gradient(
            80px circle at var(--mouse-x, 0px) var(--mouse-y, 0px),
            ${fill},
            rgba(255,255,255,0.08) 25%,
            transparent 50%
          )
        `,
      }}
    />
  );
};
