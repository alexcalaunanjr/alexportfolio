import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { ShineBorder } from '@/components/magicui/shine-border';

export function AboutMeBento() {
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
    <Card className='relative col-span-1 md:col-span-8 bg-gradient-to-b from-transparent to-slate-700/70 hover:to-slate-600/70 border border-slate-500 hover:border-slate-300 py-6 gap-1 text-white transition-colors duration-300'>
      <ShineBorder shineColor={['#34d399', '#66a4ea', '#FFFFFF']} />
      <CardHeader>
        <CardTitle className='md:text-xl'>About</CardTitle>
      </CardHeader>
      <CardContent className='flex flex-col items-center h-full px-6'>
        <CardDescription className='lg:text-base text-slate-200'>
          {/* Show short text on mobile, full text on larger screens */}

          <span className=''>{fullText}</span>
        </CardDescription>
      </CardContent>
    </Card>
  );
}
