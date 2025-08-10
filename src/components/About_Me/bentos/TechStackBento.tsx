import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
// icons
import {
  SiClerk,
  SiReact,
  SiFastapi,
  SiNestjs,
  SiDocker,
  SiTailwindcss,
  SiTauri,
  SiVite,
  SiPrisma,
  SiTypescript,
  SiPython,
  SiPostgresql,
  SiReactquery,
} from 'react-icons/si';
import { RiNextjsLine } from 'react-icons/ri';
// magic ui
import { Marquee } from '@/components/magicui/marquee';
import { ShineBorder } from '@/components/magicui/shine-border';

export function TechStackBento() {
  // list of tech stack icons
  const techStackIcons = [
    { icon: <SiReact className='w-8 h-8 lg:w-10 lg:h-10' />, title: 'React' },
    {
      icon: <RiNextjsLine className='w-8 h-8 lg:w-10 lg:h-10' />,
      title: 'Next.js',
    },
    { icon: <SiVite className='w-8 h-8 lg:w-10 lg:h-10' />, title: 'Vite' },
    {
      icon: <SiTailwindcss className='w-8 h-8 lg:w-10 lg:h-10' />,
      title: 'Tailwind CSS',
    },
    {
      icon: <SiReactquery className='w-8 h-8 lg:w-10 lg:h-10' />,
      title: 'React Query',
    },
    { icon: <SiClerk className='w-8 h-8 lg:w-10 lg:h-10' />, title: 'Clerk' },
    { icon: <SiPrisma className='w-8 h-8 lg:w-10 lg:h-10' />, title: 'Prisma' },
    { icon: <SiNestjs className='w-8 h-8 lg:w-10 lg:h-10' />, title: 'NestJS' },
    {
      icon: <SiTypescript className='w-8 h-8 lg:w-10 lg:h-10' />,
      title: 'TypeScript',
    },
    { icon: <SiPython className='w-8 h-8 lg:w-10 lg:h-10' />, title: 'Python' },
    {
      icon: <SiFastapi className='w-8 h-8 lg:w-10 lg:h-10' />,
      title: 'FastAPI',
    },
    { icon: <SiDocker className='w-8 h-8 lg:w-10 lg:h-10' />, title: 'Docker' },
    { icon: <SiTauri className='w-8 h-8 lg:w-10 lg:h-10' />, title: 'Tauri' },
    {
      icon: <SiPostgresql className='w-8 h-8 lg:w-10 lg:h-10' />,
      title: 'PostgreSQL',
    },
  ];

  return (
    <Card className='relative col-span-1 md:col-span-12 bg-gradient-to-r from-transparent via-slate-700/70 to-transparent from-20% to-80% hover:via-slate-600/70 border border-slate-500 hover:border-slate-300 py-6 text-white transition-colors duration-300'>
      <ShineBorder shineColor={['#34d399', '#66a4ea', '#FFFFFF']} />
      <CardHeader>
        <CardTitle className='md:text-xl'>Tech Stack</CardTitle>
      </CardHeader>
      <CardContent className='relative flex flex-col items-center h-full overflow-hidden'>
        {/* MARQUEE SCROLL WITH LOGOS OF STACK */}
        <Marquee className='[--duration:40s] [--gap:2rem] md:[--gap:3rem]'>
          {techStackIcons.map((tech, index) => (
            <Tooltip key={index} delayDuration={100}>
              <TooltipTrigger
                className='flex items-center justify-center'
                aria-label={`${tech.title} technology`}
              >
                <div className='flex flex-col items-center text-slate-200 hover:text-white transition-colors duration-300'>
                  {tech.icon}
                  <span className='block md:hidden text-xs text-center mt-1'>
                    {tech.title}
                  </span>
                </div>
              </TooltipTrigger>
              <TooltipContent
                side='top'
                className='bg-slate-800 text-sm text-white p-2 rounded-lg shadow-lg'
              >
                {tech.title}
              </TooltipContent>
            </Tooltip>
          ))}
        </Marquee>
        {/* GRADIENT FADE AT THE SIDES */}
        <div className='pointer-events-none absolute inset-y-0 left-0.5 w-1/4 bg-gradient-to-r from-black'></div>
        <div className='pointer-events-none absolute inset-y-0 right-0.5 w-1/4 bg-gradient-to-l from-black'></div>
      </CardContent>
    </Card>
  );
}
