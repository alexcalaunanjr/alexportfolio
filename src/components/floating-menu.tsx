'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { HeroButton } from './Hero/hero-button';
import {
  TbBrandGithub,
  TbBrandLinkedin,
  TbFileCv,
  TbX,
} from 'react-icons/tb';
import { MdOutlineSwitchAccessShortcut } from 'react-icons/md';

export function FloatingMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

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
      href: '#projects',
      icon: <TbFileCv size={22} />,
      label: 'Resume',
    },
  ];

  return (
    <div className='fixed bottom-6 right-6 z-30 flex flex-col items-end gap-3'>
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
                {item.label !== 'Projects' ? (
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
                    target='_self'
                  />
                )}
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Floating Button */}
      <motion.button
        onClick={toggleMenu}
        className={`z-50 text-lg p-3 rounded-full ring-zinc-400 ring-1 text-white hover:cursor-pointer pointer-events-auto backdrop-blur-md hover:bg-blue-300/80 transition-all duration-300
          ${
            isOpen
              ? 'bg-gradient-to-r from-indigo-400/80 to-sky-300/80'
              : 'bg-gradient-to-br from-transparent to-slate-700'
          }
          hover:opacity-100`}
        animate={{ rotate: isOpen ? 180 : 0 }}
        transition={{ duration: 0.3 }}
      >
        {/* Button content */}
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
  );
}
