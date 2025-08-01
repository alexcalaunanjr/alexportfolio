'use client';

// react
// import { useState, useEffect } from 'react';
// ts-particles
import { ParticlesComponent } from '@/lib/particles/Particles';
import { heroOption } from '@/lib/particles/heroOption';
// sections
import { Hero } from '@/components/Hero/hero';
import { AboutMe } from '@/components/About_Me/about-me';
import { Projects } from '@/components/Projects/projects';
// components
// import { Preloading } from '@/components/preloading';
// motion
// import { AnimatePresence } from 'motion/react';
import { BottomNav } from '@/components/bottom-nav';

export default function Home() {
  // const [isLoading, setIsLoading] = useState(true);
  // const [isAvatarLoaded] = useState(false);

  // // Hide preloader when avatar loads or after maximum time
  // useEffect(() => {
  //   if (isAvatarLoaded) {
  //     // Quick transition after avatar loads - just enough time for smooth fade
  //     const timer = setTimeout(() => {
  //       setIsLoading(false);
  //     }, 200); // Very short delay for smooth transition
  //     return () => clearTimeout(timer);
  //   } else {
  //     // Maximum loading time fallback
  //     const maxTimer = setTimeout(() => {
  //       setIsLoading(false);
  //     }, 1200);
  //     return () => clearTimeout(maxTimer);
  //   }
  // }, [isAvatarLoaded]);

  return (
    <div className='relative min-h-screen bg-black flex flex-col items-center justify-center'>
      {/* Preloading Screen with AnimatePresence for exit animation */}
      {/* <AnimatePresence> */}
        {/* {isLoading && <Preloading isVisible={isLoading} />} */}
      {/* </AnimatePresence> */}

      {/* Background Particles */}
      <div className='absolute left-0 right-0 h-full z-20'>
        <ParticlesComponent options={heroOption} id={'tsparticles1'} />
      </div>

      {/* Main Content */}
      {/* HERO */}
      <Hero />
      {/* ABOUT ME */}
      <AboutMe />
      {/* PROJECTS */}
      <Projects />
      {/* CONTACT ME */}


      {/* Bottom Nav */}
      <BottomNav />
    </div>
  );
}
