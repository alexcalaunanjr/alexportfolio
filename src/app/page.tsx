'use client';

// react
import { useState, useEffect } from 'react';
// ts-particles
import { ParticlesComponent } from '@/lib/particles/Particles';
import { heroOption } from '@/lib/particles/heroOption';
// sections
import { Hero } from '@/components/Hero/hero';
// components
import { Preloading } from '@/components/preloading';
import { FloatingMenu } from '@/components/Hero/floating-menu';
// motion
import { AnimatePresence } from 'motion/react';
import { AboutMe } from '@/components/About_Me/about-me';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [isAvatarLoaded] = useState(false);

  // Hide preloader when avatar loads or after maximum time
  useEffect(() => {
    if (isAvatarLoaded) {
      // Quick transition after avatar loads - just enough time for smooth fade
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 200); // Very short delay for smooth transition
      return () => clearTimeout(timer);
    } else {
      // Maximum loading time fallback
      const maxTimer = setTimeout(() => {
        setIsLoading(false);
      }, 1200);
      return () => clearTimeout(maxTimer);
    }
  }, [isAvatarLoaded]);

  return (
    <div className='relative min-h-screen bg-black flex flex-col items-center justify-center'>
      {/* Preloading Screen with AnimatePresence for exit animation */}
      <AnimatePresence>
        {isLoading && <Preloading isVisible={isLoading} />}
      </AnimatePresence>

      <div className='absolute left-0 right-0 h-full z-20'>
        <ParticlesComponent options={heroOption} id={'tsparticles1'} />
      </div>

      {/* HERO */}
      <Hero />

      {/* ABOUT ME */}
      <AboutMe />

      {/* PROJECTS */}
      {/* <div
        className='min-h-screen w-full bg-transparent dark:bg-gray-800 flex
        items-center justify-center relative z-20'
      >
        <h2 className='text-4xl font-semibold text-gray-900 dark:text-white'>
          Random Section
        </h2>
        <p className='text-lg text-gray-700 dark:text-gray-300 mt-2'>
          This is a random section to test the layout.
        </p>
      </div> */}

      {/* CONTACT ME */}

      {/* Floating Menu */}
      <FloatingMenu />
    </div>
  );
}
