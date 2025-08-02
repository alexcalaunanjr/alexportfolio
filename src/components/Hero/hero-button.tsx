import Link from 'next/link';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '../ui/hover-card';
import { motion } from 'motion/react';

interface HeroButtonsProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  target?: string;
}

export function HeroButton({ href, icon, label, target }: HeroButtonsProps) {
  return (
    <HoverCard openDelay={100} closeDelay={100}>
      <HoverCardTrigger asChild>
        <Link
          href={href}
          target={target || '_blank'}
          rel='noopener noreferrer'
          className='relative inline-flex group items-center'
        >
          {/* Button glow */}
          <div className='absolute z-10 -inset-1 opacity-80 bg-gradient-to-r from-emerald-400 to-sky-500 rounded-full blur-sm group-hover:blur-lg group-hover:opacity-100 transition-all duration-300 group-hover:animate-pulse'></div>
          {/* Button */}
          <button className='bg-black/80 z-50 text-lg p-3 rounded-full ring-zinc-400 ring-2 text-white hover:cursor-pointer pointer-events-auto hover:bg-slate-700 transition-all duration-300'>
            {icon}
          </button>
        </Link>
      </HoverCardTrigger>
      {/* content */}
      <HoverCardContent
        side='top'
        asChild
        className='py-2 rounded-lg shadow-lg border-slate-500'
      >
        <motion.div
          className='text-sm font-medium w-fit'
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            type: 'spring',
            stiffness: 400,
            damping: 25,
            duration: 0.3,
          }}
        >
          {label}
        </motion.div>
      </HoverCardContent>
    </HoverCard>
  );
}
