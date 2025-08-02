'use client';

import { Hero } from '@/components/Hero/hero';
import { AboutMe } from '@/components/About_Me/about-me';
import { Projects } from '@/components/Projects/projects';
import { BottomNav } from '@/components/bottom-nav';

export default function Home() {
  return (
    <div className='relative min-h-screen bg-black flex flex-col items-center justify-center'>
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
