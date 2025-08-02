'use client';

// react
import { useRef, useState, useEffect } from 'react';
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

export function Hero() {
  // states and refs for threejs avatar
  const glowRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [cameraFov, setCameraFov] = useState(15);
  const [avatarPosition, setAvatarPosition] = useState<
    [number, number, number]
  >([0, -1.3, 0]);
  const [isAvatarLoaded] = useState(false);

  const handleAvatarHover = (hovered: boolean) => {
    if (glowRef.current) {
      glowRef.current.style.opacity = hovered ? '0.5' : '0';
    }
  };

  // Debounce function
  const debounce = <T extends unknown[]>(
    func: (...args: T) => void,
    wait: number
  ) => {
    let timeout: NodeJS.Timeout;
    return function executedFunction(...args: T) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  };

  // Check if device is mobile and set responsive FOV
  useEffect(() => {
    const updateResponsiveSettings = () => {
      const width = window.innerWidth;
      setIsMobile(width < 640); // sm breakpoint

      // Set responsive FOV
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

      // Set responsive avatar position
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

    return () => window.removeEventListener('resize', debouncedResize);
  }, []);

  return (
    <section
      id='hero'
      className='flex flex-col justify-center bg-gradient-to-b from-transparent via-slate-700 to-transparent w-full items-center min-h-screen z-20 relative'
    >
      {/* Background Particles */}
      <div className='absolute left-0 right-0 h-full z-20'>
        <ParticlesComponent options={heroOption} id={'tsparticles1'} />
      </div>

      {/* Avatar Container with CSS Glow */}
      <div className='relative z-20'>
        {/* Avatar Glow Effect - Only appears when avatar is hovered */}
        <div
          ref={glowRef}
          className='hidden sm:block absolute inset-0 w-88 h-88 rounded-full opacity-0 transition-opacity duration-500 bg-gradient-to-br from-indigo-300 to-sky-300 blur-2xl -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 pointer-events-none'
        />

        <Canvas
          camera={{ position: [10, 0, 8], fov: cameraFov }}
          style={{ height: '100vh', width: '100vw' }}
          className='z-20'
          performance={{ max: 1, min: 0.1 }}
          dpr={[1, 2]}
        >
          <ambientLight intensity={2} />
          <pointLight position={[5, 5, 5]} intensity={20} />
          <pointLight position={[-5, 5, 5]} intensity={1.5} />
          <directionalLight position={[0, 10, 5]} intensity={5} />
          <Avatar position={avatarPosition} onHover={handleAvatarHover} />
          {!isMobile && (
            <OrbitControls
              enablePan={false}
              enableZoom={false}
              target={[0, 0, 0]}
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
