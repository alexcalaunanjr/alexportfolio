import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Image from 'next/image';
import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import Link from 'next/link';
// icons
import { SiGithub } from 'react-icons/si';
import { SpotifyLastPlayed } from './SpotifyLastPlayed';
import GitHubCalendar from 'react-github-calendar';
import { TechStack } from './TechStack';

export function AboutMe() {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  const fullText = (
    <>
      I&apos;ve always been passionate about tech, art and design, and UI/UX to
      improve the quality of life. I enjoy building applications that serve
      different needs, understanding different domains and also building to
      learn.
      <br />
      Nowadays, I focus on web development, particularly with Next.js and
      different tech stacks and architectures, and exploring agentic AI and what
      it can do for humanity. Currently building for{' '}
      <Link
        href={'https://elroyandco.com'}
        target='_blank'
        rel='noopener noreferrer'
        className=' hover:text-sky-600 transition-colors duration-200'
      >
        <span className='underline underline-offset-2'>
          elroy<span className='text-amber-700'>&</span>co
        </span>
      </Link>
      .
      <br />
      <br />
      <p className='relative group w-fit mb-4'>
        <Link
          href={'https://superai.com/next-hackathon'}
          target='_blank'
          rel='noopener noreferrer'
        >
          🏆{' '}
          <span className='animate-gradient-x'>
            SuperAI Next Hackathon 2025 Winner
          </span>
          <span className='absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-indigo-400 to-sky-500 transition-all duration-300 ease-out group-hover:w-full'></span>
        </Link>
      </p>
    </>
  );

  const shortText =
    "I've always been passionate about tech, art and design, and UI/UX to improve the quality of life.";

  return (
    // <section className='flex flex-col items-center justify-center min-h-screen md:px-8 bg-gray-100 dark:bg-gray-900'>

    <section
      id='about_me'
      className='z-20 min-h-screen flex flex-col items-start justify-start p-4 md:px-15 lg:px-40 md:py-5'
    >
      {/* TITLE */}
      <Link href={`#about_me`}>
        <h2 className='relative text-3xl md:text-4xl font-bold text-white mb-6 group cursor-pointer'>
          <span className='text-slate-700'>#</span> About
          {/* Animated underline */}
          <span className='absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-indigo-400 to-sky-500 transition-all duration-300 ease-out group-hover:w-full'></span>
        </h2>
      </Link>

      {/* BENTO-STYLE SECTIONS USING GRID */}
      <div className='grid grid-cols-1 md:grid-cols-3 gap-2'>
        {/* PICTURE*/}
        <Card className='col-span-1 bg-gradient-to-b from-slate-400/20 to-sky-800/20 border border-slate-700 text-white hover:bg-gradient-to-tl hover:from-slate-500/30 hover:to-sky-700/30 transition-colors duration-300 '>
          <CardContent className='flex flex-col items-center h-full'>
            {/* Circle image */}
            <div className='relative w-40 h-40 md:w-48 md:h-48 rounded-full overflow-hidden border-2 border-sky-600'>
              <Image src='/images/me.webp' alt='Alex Calaunan Jr' fill />
            </div>
          </CardContent>
        </Card>

        {/* ABOUT ME */}
        <Card className='col-span-1 md:col-span-2 bg-gradient-to-br from-slate-400/20 to-sky-800/20 border border-slate-700 py-6 gap-1 text-white transition-colors duration-300 hover:bg-gradient-to-br hover:from-slate-500/30 hover:to-sky-700/30'>
          <CardHeader>
            <CardTitle className='md:text-xl'>About</CardTitle>
          </CardHeader>
          <CardContent className='flex flex-col items-center h-full px-6'>
            <CardDescription className='lg:text-base text-slate-200'>
              {/* Show short text on mobile, full text on larger screens or when expanded */}
              <span className='md:hidden'>
                {isExpanded ? fullText : shortText}
              </span>
              <span className='hidden md:block'>{fullText}</span>
            </CardDescription>

            {/* View More button (mobile) */}
            <button
              onClick={toggleExpanded}
              className='md:hidden mt-4 flex items-center gap-2 text-sky-600 hover:text-sky-500 transition-colors duration-200 text-sm hover:cursor-pointer'
            >
              <span>{isExpanded ? 'View Less' : 'View More'}</span>
              {isExpanded ? (
                <ChevronUp className='w-4 h-4' />
              ) : (
                <ChevronDown className='w-4 h-4' />
              )}
            </button>
          </CardContent>
        </Card>

        {/* TECH STACK */}
        <TechStack />

        {/* GITHUB ACTIVITY CARD */}
        <Card className='col-span-1 md:col-span-2 bg-gradient-to-br from-slate-400/20 to-sky-800/20 border border-slate-700 py-6'>
          <CardHeader className='w-full flex justify-between items-center'>
            <CardTitle className='md:text-xl text-white'>
              GitHub Activity
            </CardTitle>
            <Link
              href={'https://github.com/alexcalaunanjr'}
              target='_blank'
              rel='noopener noreferrer'
            >
              <SiGithub className='text-white hover:text-sky-500 w-6 h-6 transition-colors duration-300' />
            </Link>
          </CardHeader>
          <Link
            href={'https://github.com/alexcalaunanjr'}
            target='_blank'
            rel='noopener noreferrer'
          >
            <CardContent className='flex items-center justify-center h-full'>
              <GitHubCalendar username='alexcalaunanjr' />
            </CardContent>
          </Link>
        </Card>

        {/* SPOTIFY MOST RECENTLY PLAYED CARD */}
        <SpotifyLastPlayed />
      </div>
    </section>
  );
}
