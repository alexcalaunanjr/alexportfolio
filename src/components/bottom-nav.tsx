'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
// icons
import { FaUserAstronaut } from 'react-icons/fa6';
import { LuAppWindowMac, LuMail } from 'react-icons/lu';
import { PiHandPeace } from 'react-icons/pi';
// motion
import { motion, AnimatePresence } from 'motion/react';
import { HeroButton } from './Hero/hero-button';
import { TbBrandGithub, TbBrandLinkedin, TbFileCv, TbX } from 'react-icons/tb';
import { MdOutlineSwitchAccessShortcut } from 'react-icons/md';

export const BottomNav = () => {
  // useStates
  const [isShrunk, setIsShrunk] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Intersection Observer API for section detection
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        threshold: 0.3, // Trigger when 30% of section is visible
        rootMargin: '-20% 0px -20% 0px', // Better detection area
      }
    );

    // Observe all sections
    const sections = ['hero', 'about_me', 'projects', 'contact'];
    const sectionElements: Element[] = [];

    sections.forEach((sectionId) => {
      const element = document.getElementById(sectionId);
      if (element) {
        observer.observe(element);
        sectionElements.push(element);
      }
    });

    // Set initial active section
    setActiveSection('hero');

    return () => {
      observer.disconnect(); // Clean cleanup
    };
  }, []);

  // Separate scroll handler only for nav shrinking (throttled)
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;

          // Only handle nav shrinking logic
          if (currentScrollY > lastScrollY && currentScrollY > 10) {
            setIsShrunk(true);
            setIsOpen(false);
          } else if (currentScrollY < lastScrollY) {
            setIsShrunk(false);
          }
          setLastScrollY(currentScrollY);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);

  const menuItems = [
    {
      href: 'https://github.com/alexcalaunanjr',
      icon: <TbBrandGithub size={22} />,
      label: 'GitHub',
    },
    {
      href: 'https://www.linkedin.com/in/alexander-calaunan-jr-a8b8b4136/',
      icon: <TbBrandLinkedin size={22} />,
      label: 'LinkedIn',
    },
    {
      href: '/Alex_Calaunan_Jr_Resume.pdf',
      icon: <TbFileCv size={22} />,
      label: 'Resume',
      target: '_blank', // Opens in new tab
    },
  ];

  return (
    <div
      className={`
        fixed z-30 left-1/2 transform -translate-x-1/2 mx-auto w-full
        transition-all duration-300 md:duration-500 ease-in-out
        ${isShrunk ? '-bottom-20' : 'bottom-6'}
      `}
    >
      <div className='flex justify-between items-center h-full w-full'>
        {/* CENTER: NAVIGATION LINKS */}
        <div className='flex-1 flex justify-center opacity-100'>
          <div className='bg-gradient-to-br from-transparent to-slate-700 backdrop-blur-md shadow-xl rounded-full border border-slate-400 px-4 py-3'>
            <nav className='flex items-center space-x-6'>
              {/* # HERO  */}
              <Link
                href='/#hero'
                className='font-semibold text-white whitespace-nowrap'
              >
                <FaUserAstronaut
                  className={`transition-all duration-300 ${
                    activeSection === 'hero'
                      ? 'text-sky-300 scale-120'
                      : 'text-slate-300 hover:text-sky-200'
                  }`}
                />
              </Link>

              {/* # ABOUT  */}
              <Link
                href='/#about_me'
                className='font-semibold text-white whitespace-nowrap'
              >
                <PiHandPeace
                  size={20}
                  className={`transition-all duration-300 ${
                    activeSection === 'about_me'
                      ? 'text-sky-300 scale-120'
                      : 'text-slate-300 hover:text-sky-200'
                  }`}
                />
              </Link>
              {/* # PROJECTS */}
              <Link
                href='/#projects'
                className='font-semibold text-white transition-colors duration-300 whitespace-nowrap'
              >
                <LuAppWindowMac
                  size={20}
                  className={`transition-all duration-300 ${
                    activeSection === 'projects'
                      ? 'text-sky-300 scale-120'
                      : 'text-slate-300 hover:text-sky-200'
                  }`}
                />
              </Link>
              {/* # CONTACT */}
              <Link
                href='/#contact'
                className='font-semibold text-white transition-colors duration-300 whitespace-nowrap'
              >
                <LuMail
                  size={20}
                  className={`transition-all duration-300 ${
                    activeSection === 'contact'
                      ? 'text-sky-300 scale-120'
                      : 'text-slate-300 hover:text-sky-200'
                  }`}
                />
              </Link>
            </nav>
          </div>
        </div>
      </div>

      <div className='fixed bottom-0 right-6 flex flex-col items-end gap-3'>
        {/* Menu Items */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className='flex flex-col gap-3'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {menuItems.map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{
                    scale: 0,
                    y: 20,
                    opacity: 0,
                  }}
                  animate={{
                    scale: 1,
                    y: 0,
                    opacity: 1,
                  }}
                  exit={{
                    scale: 0,
                    y: 20,
                    opacity: 0,
                  }}
                  transition={{
                    duration: 0.3,
                    delay: (menuItems.length - 1 - index) * 0.1,
                    type: 'spring',
                    stiffness: 300,
                    damping: 25,
                  }}
                  onClick={() => setIsOpen(false)}
                >
                  {item.label !== 'Resume' ? (
                    <HeroButton
                      href={item.href}
                      icon={item.icon}
                      label={item.label}
                    />
                  ) : (
                    <HeroButton
                      href={item.href}
                      icon={item.icon}
                      label={item.label}
                      target='_blank'
                    />
                  )}
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Floating Button */}
        <motion.button
          onClick={toggleMenu}
          className={`z-50 text-lg p-3 rounded-full ring-zinc-400 ring-1 text-white hover:cursor-pointer pointer-events-auto backdrop-blur-md hover:bg-blue-300/80 transition-all duration-300
                  ${
                    isOpen
                      ? 'bg-gradient-to-r from-emerald-400/80 to-sky-300/80'
                      : 'bg-gradient-to-br from-transparent to-slate-700'
                  }
                  hover:opacity-100`}
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* // Button content  */}
          <div className='relative z-10'>
            <AnimatePresence mode='wait'>
              {isOpen ? (
                <motion.div
                  key='close'
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <TbX size={22} />
                </motion.div>
              ) : (
                <motion.div
                  key='menu'
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <MdOutlineSwitchAccessShortcut size={22} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.button>
      </div>
    </div>
  );
};
