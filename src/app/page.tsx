'use client';

import { Hero } from '@/components/Hero/hero';
import { AboutMe } from '@/components/About_Me/about-me';
import { Projects } from '@/components/Projects/projects';
import { Contact } from '@/components/Contact/contact';
import { Footer } from '@/components/footer';
import { BottomNav } from '@/components/bottom-nav';

export default function Home() {
  return (
    <div className='relative min-h-screen bg-black flex flex-col items-center justify-center overflow-x-hidden'>
      {/* Main Content */}
      {/* HERO */}
      <Hero />
      {/* ABOUT ME */}
      <AboutMe />
      {/* PROJECTS */}
      <Projects />
      {/* CONTACT ME */}
      <Contact />
      {/* FOOTER */}
      <Footer />

      {/* Bottom Nav */}
      <BottomNav />
    </div>
  );
}
