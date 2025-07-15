"use client";
import { motion, useMotionValue, useSpring, useAnimation } from "framer-motion";
import { useEffect, useState, useRef } from "react";

export default function DragBall() {
  // Motion values for cursor position
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const [isInteractive, setIsInteractive] = useState(false);
  const controls = useAnimation();
  const interactiveElements = useRef([]);

  // Smooth spring physics
  const springConfig = { 
    damping: 20, 
    stiffness: 300,
    mass: 0.5
  };
  const springX = useSpring(cursorX, springConfig);
  const springY = useSpring(cursorY, springConfig);

  // Track mouse position
  useEffect(() => {
    const moveCursor = (e) => {
      cursorX.set(e.clientX - 20);
      cursorY.set(e.clientY - 20);
    };
    window.addEventListener("pointermove", moveCursor);
    return () => window.removeEventListener("pointermove", moveCursor);
  }, [cursorX, cursorY]);

  // Detect interactive elements (with debounce)
  useEffect(() => {
    const updateInteractiveElements = () => {
      interactiveElements.current = [
        ...document.querySelectorAll('a, button, [data-interactive]')
      ];
    };

    const observer = new MutationObserver(updateInteractiveElements);
    observer.observe(document.body, { 
      subtree: true, 
      childList: true 
    });

    updateInteractiveElements();
    return () => observer.disconnect();
  }, []);

  // Handle hover states
  useEffect(() => {
    const handleEnter = () => {
      setIsInteractive(true);
      controls.start({
        scale: 1.8,
        backgroundColor: "rgba(59, 130, 246, 0.8)",
        transition: { type: "spring", damping: 10 }
      });
    };

    const handleLeave = () => {
      setIsInteractive(false);
      controls.start({
        scale: 1,
        backgroundColor: "transparent",
        transition: { type: "spring", damping: 10 }
      });
    };

    const currentElements = interactiveElements.current;
    currentElements.forEach(el => {
      el.addEventListener('mouseenter', handleEnter);
      el.addEventListener('mouseleave', handleLeave);
    });

    return () => {
      currentElements.forEach(el => {
        el.removeEventListener('mouseenter', handleEnter);
        el.removeEventListener('mouseleave', handleLeave);
      });
    };
  }, [controls]);

  // Idle animation when not interacting
  useEffect(() => {
    if (!isInteractive) {
      controls.start({
        scale: [1, 1.1, 1],
        transition: {
          duration: 2,
          repeat: Infinity,
          repeatType: "mirror"
        }
      });
    }
  }, [isInteractive, controls]);

  return (
  <motion.div
    style={{
      x: springX,
      y: springY,
    }}
    className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
    animate={controls}
  >
    <motion.img
      src="/mouse.png"  // Path to your image in public folder
      alt="Custom cursor"
      className="w-10 h-10 select-none rounded-full"
      animate={{
        scale: isInteractive ? 1.2 : 1,
        opacity: isInteractive ? 1 : 0.8
      }}
      style={{
        filter: isInteractive ? "drop-shadow(0 0 8px rgba(59, 130, 246, 0.8))" : "none"
      }}
    />
  </motion.div>
);
}