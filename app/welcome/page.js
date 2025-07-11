'use client';

import { useRouter } from 'next/navigation';

export default function Welcome() {
  const router = useRouter();

  

  return (
    <div className="relative w-full h-screen flex flex-col items-center justify-center">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover"
      >
        <source src="/driving.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="absolute inset-0 bg-black bg-opacity-10"></div>

      <div className="relative z-10 text-center">
        <h1 className="text-5xl md:text-6xl font-bold text-white">
          Hello, <span className="text-blue-400">sahD!</span>
        </h1>
      </div>
    </div>
  );
}
