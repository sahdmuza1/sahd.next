'use client';

import { useEffect, useRef } from 'react';
import { animate, hover } from 'motion';
import { splitText } from 'motion-plus';
import { useMotionValue } from 'framer-motion';
import ToggleButton from '../components/ToggleButton';

export default function ScatterText({ headingParts, paragraph, floatingEnabled, setFloatingEnabled }) {
  const containerRef = useRef(null);
  const velocityX = useMotionValue(0);
  const velocityY = useMotionValue(0);
  const prevEvent = useRef(0);

  useEffect(() => {
    if (!containerRef.current) return;

    const headingEls = containerRef.current.querySelectorAll('.scatter-heading-part');
    const paragraphEl = containerRef.current.querySelector('.scatter-paragraph');

    if (!paragraphEl || headingEls.length === 0) return;

    let allChars = [];

    headingEls.forEach((el) => {
      allChars.push(...splitText(el).chars);
    });

    allChars.push(...splitText(paragraphEl).chars);

    if (!floatingEnabled) {
      allChars.forEach((char) => {
        char.style.transform = 'none';
        char.style.transition = 'none';
      });
      return;
    }

    allChars.forEach((char, index) => {
      animate(
        char,
        { y: [0, -8, 0], x: [0, 2, 0], scale: [1, 1.02, 1] },
        {
          delay: index * 0.02,
          duration: 3,
          repeat: Infinity,
          easing: 'ease-in-out',
        }
      );
    });

    const handlePointerMove = (event) => {
      const now = performance.now();
      const delta = (now - prevEvent.current) / 1000;
      prevEvent.current = now;
      velocityX.set(event.movementX / delta);
      velocityY.set(event.movementY / delta);
    };

    document.addEventListener('pointermove', handlePointerMove);

    hover(allChars, (el) => {
      const speed = Math.sqrt(velocityX.get() ** 2 + velocityY.get() ** 2);
      const angle = Math.atan2(velocityY.get(), velocityX.get());
      const distance = Math.min(speed * 0.05, 50);

      animate(
        el,
        {
          x: Math.cos(angle) * distance,
          y: Math.sin(angle) * distance,
          scale: 1.1,
        },
        {
          type: 'spring',
          stiffness: 40,
          damping: 20,
        }
      );
    });

    return () => {
      document.removeEventListener('pointermove', handlePointerMove);
    };
  }, [floatingEnabled]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-screen flex flex-col items-center justify-center px-4 sm:px-6 md:px-12 text-center overflow-hidden z-20"
    >
      {/* Text Content */}
      <div className="relative max-w-3xl">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-white">
          <span className="scatter-heading-part">{headingParts[0]}</span>
          <span className="scatter-heading-part text-blue-400 ml-3">{headingParts[1]}</span>
        </h1>
        <p className="scatter-paragraph text-base sm:text-lg md:text-xl text-white leading-relaxed mb-8">
          {paragraph}
        </p>

        {/* Toggle button below the text */}
        <div className="flex justify-center">
         <ToggleButton
            isOn={floatingEnabled}
            setIsOn={setFloatingEnabled}
          />
        </div>
      </div>
    </div>
  );
}
