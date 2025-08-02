import Link from 'next/link';
// bentos
import { PictureBento } from './bentos/PictureBento';
import { AboutMeBento } from './bentos/AboutMeBento';
import { TechStackBento } from './bentos/TechStackBento';
import { GithubActivityBento } from './bentos/GithubActivityBento';
import { SpotifyLastPlayedBento } from './bentos/SpotifyLastPlayedBento';

export function AboutMe() {
  return (
    <section
      id='about_me'
      className='min-h-screen w-full flex flex-col items-start justify-start p-4 md:px-15 lg:px-40 md:py-5'
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
        <PictureBento />

        {/* ABOUT ME */}
        <AboutMeBento />
        
        {/* TECH STACK */}
        <TechStackBento />

        {/* GITHUB ACTIVITY CARD */}
        <GithubActivityBento />

        {/* SPOTIFY MOST RECENTLY PLAYED CARD */}
        <SpotifyLastPlayedBento />
      </div>
    </section>
  );
}
