import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
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
} from 'react-icons/si';
import { RiNextjsLine } from 'react-icons/ri';

export function TechStackBento() {
  // list of tech stack icons
  const techStackIcons = [
    { icon: <SiReact className='w-8 h-8 lg:w-10 lg:h-10' />, title: 'React' },
    { icon: <RiNextjsLine className='w-8 h-8 lg:w-10 lg:h-10' />, title: 'Next.js' },
    { icon: <SiVite className='w-8 h-8 lg:w-10 lg:h-10' />, title: 'Vite' },
    { icon: <SiTailwindcss className='w-8 h-8 lg:w-10 lg:h-10' />, title: 'Tailwind CSS' },
    { icon: <SiClerk className='w-8 h-8 lg:w-10 lg:h-10' />, title: 'Clerk' },
    { icon: <SiPrisma className='w-8 h-8 lg:w-10 lg:h-10' />, title: 'Prisma' },
    { icon: <SiNestjs className='w-8 h-8 lg:w-10 lg:h-10' />, title: 'NestJS' },
    { icon: <SiTypescript className='w-8 h-8 lg:w-10 lg:h-10' />, title: 'TypeScript' },
    { icon: <SiPython className='w-8 h-8 lg:w-10 lg:h-10' />, title: 'Python' },
    { icon: <SiFastapi className='w-8 h-8 lg:w-10 lg:h-10' />, title: 'FastAPI' },
    { icon: <SiDocker className='w-8 h-8 lg:w-10 lg:h-10' />, title: 'Docker' },
    { icon: <SiTauri className='w-8 h-8 lg:w-10 lg:h-10' />, title: 'Tauri' },
  ];

  return (
    <Card className='col-span-1 md:col-span-3 bg-gradient-to-b from-transparent to-slate-700/70 hover:to-slate-600/70 border border-slate-500 py-6 text-white transition-colors duration-300'>
      <CardHeader>
        <CardTitle className='md:text-xl'>Tech Stack</CardTitle>
      </CardHeader>
      <CardContent className='flex flex-col items-center h-full'>
        {/* TICKER SCROLL WITH LOGOS OF STACK */}
        <div className='flex flex-wrap justify-center gap-4 lg:gap-12'>
          {techStackIcons.map((tech, index) => (
            <Tooltip key={index} delayDuration={100}>
              <TooltipTrigger className='flex items-center justify-center'>
                <div className='flex flex-col items-center text-slate-200 hover:text-white transition-colors duration-300'>
                  {tech.icon}
                  <span className='block md:hidden text-xs text-center mt-1'>{tech.title}</span>
                </div>
              </TooltipTrigger>
              <TooltipContent side='top' className='bg-slate-800 text-sm text-white p-2 rounded-lg shadow-lg'>
                {tech.title}
              </TooltipContent>
            </Tooltip>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
