'use client';

// react
import React, { useState, useEffect, useMemo, useCallback } from 'react';
// lodash
import { debounce } from 'lodash';
// react-three-fiber/threejs
import { Avatar } from '@/components/avatar';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
// icons
import { ChevronsDown } from 'lucide-react';
// components
import Link from 'next/link';
// motion
import { motion } from 'motion/react';
// tsparticles
import { ParticlesComponent } from '@/lib/particles/Particles';
import { heroOption } from '@/lib/particles/heroOption';

// Memoized particles component to prevent re-renders
const MemoizedParticles = React.memo(() => (
  <ParticlesComponent options={heroOption} id={'tsparticles1'} />
));

export function Hero() {
  // states for threejs avatar
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [cameraFov, setCameraFov] = useState(15);
  const [avatarPosition, setAvatarPosition] = useState<
    [number, number, number]
  >([0, -1.3, 0]);
  const [isAvatarLoaded] = useState(false);
  const [isAvatarHovered, setIsAvatarHovered] = useState(false);

  // Memoize the hover handler to prevent unnecessary re-renders
  const handleAvatarHover = useCallback((hovered: boolean) => {
    setIsAvatarHovered(hovered);
  }, []);

  // check device capabilities and set responsive settings
  useEffect(() => {
    const updateResponsiveSettings = () => {
      const width = window.innerWidth;

      // detect touch capability
      const isTouchCapable =
        'ontouchstart' in window ||
        navigator.maxTouchPoints > 0 ||
        window.matchMedia('(pointer: coarse)').matches;

      setIsTouchDevice(isTouchCapable);

      // set responsive FOV
      if (width < 640) {
        // mobile
        setCameraFov(20);
      } else if (width < 768) {
        // sm
        setCameraFov(18);
      } else if (width < 1024) {
        // md
        setCameraFov(16);
      } else {
        // lg and above
        setCameraFov(12);
      }

      // set responsive avatar position
      if (width < 640) {
        // mobile
        setAvatarPosition([0, -1, 0]);
      } else if (width < 768) {
        // sm
        setAvatarPosition([0, -1.4, 0]);
      } else if (width < 1024) {
        // md
        setAvatarPosition([0, -1.3, 0]);
      } else {
        // lg and above
        setAvatarPosition([0, -1.3, 0]);
      }
    };

    const debouncedResize = debounce(updateResponsiveSettings, 250);

    updateResponsiveSettings();
    window.addEventListener('resize', debouncedResize);

    return () => {
      window.removeEventListener('resize', debouncedResize);
      debouncedResize.cancel(); // Clean up the debounced function
    };
  }, []);

  return (
    <section
      id='hero'
      className='flex flex-col justify-center bg-gradient-to-b from-transparent via-slate-700 to-transparent w-full items-center min-h-screen z-20 relative'
    >
      {/* Background Particles */}
      <div className='absolute left-0 right-0 h-full z-20'>
        <MemoizedParticles />
      </div>

      {/* Avatar Container */}
      <div
        className={`relative z-20 transition-all duration-300 ${
          isAvatarHovered ? 'drop-shadow-[0_0_40px_rgba(203,213,225,0.8)]' : 'drop-shadow-[0_0_5px_rgba(203,213,225,0.8)]'
        }`}
      >
        <Canvas
          camera={{ position: [10, 0, 8], fov: cameraFov }}
          style={{ height: '100vh', width: '100vw' }}
          className='z-20'
          performance={{ max: 1, min: 0.1 }}
          dpr={[1, 1.5]}
        >
          <ambientLight intensity={1.5} />
          <directionalLight position={[0, 10, 5]} intensity={5} />
          <Avatar position={avatarPosition} onHover={handleAvatarHover} />
          {!isTouchDevice && (
            <OrbitControls
              enablePan={false}
              enableZoom={false}
              target={[0, 0, 0]}
              // better performance and UX settings
              enableDamping={true}
              dampingFactor={0.05}
              rotateSpeed={0.8}
            />
          )}
        </Canvas>
      </div>

      {/* Overlay Text */}
      <div className='absolute inset-0 pointer-events-none z-30'>
        {/* Top left text */}
        <div className='px-8 py-10 md:p-20 text-left'>
          <motion.h1
            className='text-3xl sm:text-5xl md:text-6xl font-bold text-white mb-4'
            initial={{ y: 30, opacity: 0, filter: 'blur(10px)' }}
            animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
            transition={{
              duration: 0.5,
              ease: 'easeOut',
              delay: isAvatarLoaded ? 0.3 : 1.2,
            }}
          >
            Hi, I&apos;m{' '}
            <span className='bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-sky-500 animate-gradient-x'>
              Alex Calaunan Jr
            </span>
          </motion.h1>
          <motion.p
            className='text-sm md:text-lg text-gray-300 max-w-md md:max-w-lg font-mono'
            initial={{ y: 30, opacity: 0, filter: 'blur(10px)' }}
            animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
            transition={{
              duration: 0.5,
              ease: 'easeOut',
              delay: isAvatarLoaded ? 0.5 : 1.4,
            }}
          >
            <span className='border-b border-sky-500 font-bold animate-gradient-x'>
              Full-stack developer
            </span>{' '}
            who reaches for the stars to build applications that help to improve
            people&apos;s lives through tech.
          </motion.p>
        </div>

        {/* button to invite user to scroll */}
        <Link href={`#about_me`}>
          <motion.div
            initial={{ y: 30, opacity: 0, filter: 'blur(10px)' }}
            animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
            transition={{
              duration: 0.5,
              ease: 'easeOut',
              delay: isAvatarLoaded ? 0.7 : 1.6,
            }}
            className='flex flex-col justify-center items-center gap-3 z-50 absolute bottom-50 sm:bottom-20 text-center left-1/2 transform -translate-x-1/2 pointer-events-auto text-slate-400 hover:text-white transition-colors duration-300'
          >
            <div className='font-mono text-sm'>
              <span className='text-green-400'>$</span>{' '}
              <span className='text-white'> cd about_me/</span>
              <span className='animate-pulse text-white'>_</span>
            </div>
            {/* chevrons */}
            <ChevronsDown className='sm:w-8 sm:h-8 animate-bounce' />
          </motion.div>
        </Link>
      </div>
    </section>
  );
}
