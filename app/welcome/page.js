'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ScatterText from '../welcome/ScatterText';
import Projects from '../welcome/Projects';
import Contact from '../welcome/Contact';
import Social from '../welcome/social';

import AnimatedButton from '../components/AnimatedButton';
import ThreeCube from '../components/ThreeCube';

export default function AboutPage() {
  const [isVisible, setIsVisible] = useState(true);
  const [section, setSection] = useState('about');
  const [floatingEnabled, setFloatingEnabled] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef(null);

  const handleClick = () => {
    if (audioRef.current) {
      audioRef.current.play().catch(console.warn);
    }
    setIsVisible(false);
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !audioRef.current.muted;
      setIsMuted(audioRef.current.muted);
    }
  };

  const sizeClasses =
    'w-[100px] h-[100px] sm:w-[160px] sm:h-[160px] md:w-[200px] md:h-[200px]';

  const cubeVariants = {
    initial: {
      top: '50%',
      left: '50%',
      x: '-50%',
      y: '-50%',
      scale: 1,
      opacity: 1,
    },
    movedTopLeft: {
      top: '1rem',
      left: '1rem',
      x: '0%',
      y: '0%',
      scale: 1,
      opacity: 1,
    },
    hidden: {
      opacity: 0,
      scale: 0,
      pointerEvents: 'none',
    },
  };

  return (
    <div className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden px-4 sm:px-6 md:px-0 py-12 bg-black">
      <img
        src="/welcome.png"
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover hidden sm:block z-[-1]"
      />

      <audio ref={audioRef} src="/mix.wav" preload="auto" loop />

      {!isVisible && (
        <div className="fixed inset-0 z-0 pointer-events-none">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
            key={section}
            src={section === 'about' ? '/driving.mp4' : '/about.mp4'}
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
      )}

      <motion.div
        className={`fixed z-20 pointer-events-none ${sizeClasses}`}
        variants={cubeVariants}
        initial="initial"
        animate={
          isVisible ? 'initial' : section === 'about' ? 'movedTopLeft' : 'hidden'
        }
        transition={{ duration: 0.8, ease: 'easeInOut' }}
        style={{ willChange: 'transform, top, left' }}
      >
        <ThreeCube />
      </motion.div>

      <AnimatePresence mode="wait" initial={false}>
        {isVisible ? (
          <motion.div
            key="welcome"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.8, ease: 'backOut' }}
            onClick={handleClick}
            className="cursor-pointer relative z-30 flex items-center justify-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{ width: '90vw', maxWidth: 400, height: 300 }}
          >
            <motion.div className="z-10 text-center select-none pointer-events-none px-4">
              <motion.h1
                className="text-4xl sm:text-5xl md:text-6xl font-bold text-white whitespace-nowrap"
                animate={{
                  textShadow: [
                    '0 0 0px rgba(255,255,255,0.5)',
                    '0 0 20px rgba(96, 165, 250, 0.8)',
                    '0 0 0px rgba(255,255,255,0.5)',
                  ],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  repeatType: 'reverse',
                }}
              >
                Hello, <span className="text-blue-400">sahD!</span>
              </motion.h1>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            key="main"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 0.8 }}
            className="w-full max-w-4xl relative z-30 flex flex-col items-center justify-start px-4 sm:px-6 md:px-0 pt-24 sm:pt-32"
          >
            {section === 'about' && (
              <ScatterText
                headingParts={['About ', 'sahD!']}
                paragraph={"I am a Front-End Developer skilled in building modern, responsive web apps with React, Next.js, Tailwind CSS, and JavaScript. Experienced with headless CMS like WordPress, Shopify, and Contentful, I create scalable websites focused on clean code and great user experience."} 
                floatingEnabled={floatingEnabled}
                setFloatingEnabled={setFloatingEnabled}
              />
            )}
            {section === 'projects' && <Projects goBack={()=> setSection('about')} />}
            {section === 'contact' && <Contact goBack={() => setSection('about')} />}
            {section === 'social' && <Social goBack={() => setSection('about')} />}

            {/* TOP RIGHT BUTTONS */}
            {section === 'about' && (
              <div className="fixed top-4 right-4 z-30 flex flex-col items-end gap-3 sm:gap-4">
                <AnimatedButton
                  label=""
                  onClick={() => setSection('projects')}
                  iconSrc="/head.jpg"
                  iconWidth={40}
                  iconHeight={40}
                  className="sm:w-[60px] sm:h-[60px] md:w-[70px] md:h-[70px]"
                />
                <button
                  onClick={toggleMute}
                  className="w-[40px] h-[40px] sm:w-[60px] sm:h-[60px] md:w-[70px] md:h-[70px] bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-white/20 transition"
                  aria-label="Toggle Mute"
                >
                  <span className="text-white text-lg sm:text-xl md:text-2xl">
                    {isMuted ? '🔇' : '🔊'}
                  </span>
                </button>
              </div>
            )}

            {/* LEFT SIDE BUTTONS */}
            {section === 'about' && (
              <div>
                <div className="fixed top-[calc(100px+1rem)] sm:top-[calc(140px+1rem)] md:top-[calc(180px+1rem)] left-4 sm:left-6 md:left-8 z-30">
                  <AnimatedButton
                    label=""
                    onClick={() => setSection('contact')}
                    iconSrc="/phone.jpg"
                    iconWidth={40}
                    iconHeight={40}
                    className="sm:w-[60px] sm:h-[60px] md:w-[70px] md:h-[70px]"
                  />
                </div>
                <div className="fixed bottom-4 left-4 z-30 sm:bottom-6 sm:left-6 md:bottom-8 md:left-8">
                  <AnimatedButton
                    label=""
                    onClick={() => setSection('social')}
                    iconSrc="/back.jpg"
                    iconWidth={40}
                    iconHeight={40}
                    className="sm:w-[60px] sm:h-[60px] md:w-[70px] md:h-[70px]"
                  />
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
