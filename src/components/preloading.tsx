'use client';

import { motion } from 'motion/react';
import { useState, useEffect } from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

interface PreloadingProps {
  isVisible: boolean;
}

export function Preloading({ isVisible }: PreloadingProps) {
  const [particles, setParticles] = useState<
    Array<{ left: number; top: number; delay: number }>
  >([]);

  // generate particles on client side only to avoid hydration mismatch
  useEffect(() => {
    const particleArray = Array.from({ length: 50 }, () => ({
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 2,
    }));
    setParticles(particleArray);
  }, []);

  if (!isVisible) return null;

  return (
    <motion.div
      className='fixed inset-0 z-50 bg-black flex items-center justify-center'
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, ease: 'easeInOut' }}
    >
      {/* Background particles effect */}
      <div className='absolute inset-0 overflow-hidden'>
        {particles.map((particle, i) => (
          <motion.div
            key={i}
            className='absolute w-1 h-1 bg-white rounded-full'
            style={{
              left: `${particle.left}%`,
              top: `${particle.top}%`,
            }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: particle.delay,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <div className='z-10 flex flex-col items-center'>
        {/* Rocket container with glow effect */}
        {/* Rocket lottie */}
        <DotLottieReact
          src='/lottie/loading_rocket.lottie'
          autoplay
          loop
          className='w-80'
        />

        {/* Loading text */}
        <motion.div
          className='text-center'
          initial={{ y: 30, opacity: 0, filter: 'blur(10px)' }}
          animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
          transition={{
            duration: 0.5,
            ease: 'easeOut',
          }}
        >
          <h2 className='text-2xl md:text-5xl  text-white mb-2'>
            Loading
          </h2>
        </motion.div>
      </div>
    </motion.div>
  );
}
