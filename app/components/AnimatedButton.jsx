'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export default function AnimatedButton({ label, onClick, bg = '', iconSrc }) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
      className={`${bg} hover:brightness-110 text-white font-semibold py-3 px-6 rounded-xl shadow-xl transition duration-300 flex items-center space-x-3`}
    >
      {iconSrc && (
        <Image
          src={iconSrc}
          alt={label}
          width={84}
          height={240}
          className="object-contain"
        />
      )}
      <span>{label}</span>
    </motion.button>
  );
}
