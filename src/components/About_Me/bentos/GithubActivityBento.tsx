'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { useEffect } from 'react';
// icons
import { SiGithub } from 'react-icons/si';
import { ShineBorder } from '@/components/magicui/shine-border';

// GitHub calendar needs client-side rendering
const GitHubCalendar = dynamic(() => import('react-github-calendar'), {
  ssr: false,
  loading: () => (
    <div className='flex items-center justify-center h-32 text-slate-400'>
      Loading GitHub activity...
    </div>
  ),
});

export function GithubActivityBento() {
  useEffect(() => {
    const scrollToLatest = () => {
      // Find the actual scroll container created by react-github-calendar
      const scrollContainer = document.querySelector(
        '.react-activity-calendar__scroll-container'
      ) as HTMLElement;

      if (scrollContainer) {
        // Add smooth scrolling behavior
        scrollContainer.style.scrollBehavior = 'smooth';

        // Scroll to the rightmost position (latest contributions)
        scrollContainer.scrollLeft =
          scrollContainer.scrollWidth - scrollContainer.clientWidth;

        console.log('Scrolled GitHub calendar to latest contributions');

        // Reset scroll behavior after scrolling
        setTimeout(() => {
          scrollContainer.style.scrollBehavior = 'auto';
        }, 1000);
      }
    };

    // Try multiple times with different delays to ensure the calendar is rendered
    const timeouts = [500, 1000, 1500, 2000];
    const timeoutIds = timeouts.map((delay) =>
      setTimeout(scrollToLatest, delay)
    );

    // Also use MutationObserver to detect when the calendar is added to DOM
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList') {
          // Check if the calendar scroll container was added
          const scrollContainer = document.querySelector(
            '.react-activity-calendar__scroll-container'
          );
          if (scrollContainer) {
            setTimeout(scrollToLatest, 100); // Small delay to ensure it's fully rendered
          }
        }
      });
    });

    // Start observing the document for changes
    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      timeoutIds.forEach(clearTimeout);
      observer.disconnect();
    };
  }, []);

  return (
    <Card className='relative col-span-1 md:col-span-7 bg-gradient-to-b from-transparent to-slate-700/70 hover:to-slate-600/70 border border-slate-500 hover:border-slate-300 transition-colors duration-300'>
      <ShineBorder shineColor={['#34d399', '#66a4ea', '#FFFFFF']} />
      <CardHeader className='w-full flex justify-between items-center'>
        <CardTitle className='md:text-xl text-white'>GitHub Activity</CardTitle>
        <Link
          href={'https://github.com/alexcalaunanjr'}
          aria-label='GitHub profile'
          target='_blank'
          rel='noopener noreferrer'
        >
          <SiGithub className='text-white hover:text-sky-300 w-6 h-6 transition-colors duration-300' />
        </Link>
      </CardHeader>
      <Link
        href={'https://github.com/alexcalaunanjr'}
        aria-label='GitHub activity calendar'
        target='_blank'
        rel='noopener noreferrer'
      >
        <CardContent className='flex items-center justify-center h-full overflow-x-auto scroll-smooth'>
          <GitHubCalendar
            username='alexcalaunanjr'
            theme={{
              light: ['hsl(0, 0%, 22%)', 'hsl(162 95.8% 50%)'],
              dark: ['hsl(0, 0%, 22%)', 'hsl(162 95.8% 50%)'],
            }}
          />
        </CardContent>
      </Link>
    </Card>
  );
}
