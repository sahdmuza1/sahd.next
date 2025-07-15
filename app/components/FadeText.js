// components/FadeText.js
import { motion } from 'framer-motion';

const FadeText = ({ 
  text, 
  delay = 0,
  duration = 0.8,
  stagger = 0.02
}) => {
  const letters = text.split('');
  
  return (
    <div className="inline-flex flex-wrap">
      {letters.map((char, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            delay: delay + (i * stagger),
            duration: duration,
            ease: "easeOut"
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </div>
  );
};

export default FadeText;