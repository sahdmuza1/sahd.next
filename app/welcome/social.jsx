'use client';

import { motion } from 'framer-motion';

export default function Social({ goBack }) {
  return (
    <motion.div
      className="relative w-full h-screen flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* Back Button (top-left corner) */}
      <button
        onClick={goBack}
        className="absolute top-4 left-4 z-50  text-blue-500 px-4 py-2  hover:bg-white/20 transition text-sm sm:text-base"
      >
        ⬅ Back
      </button>

      {/* Centered 404 Error Message */}
      <div className="text-white text-center p-4">
        <h1 className="text-3xl sm:text-4xl font-bold">404 error..</h1>
        <p className="text-sm sm:text-base mt-2 text-blue-300">This page is under construction.</p>
      </div>
    </motion.div>
  );
}
