import {
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiOpenai,
  SiShadcnui,
  SiReact,
  SiVite,
  SiExpress,
  SiTauri,
  SiJupyter,
  SiKaggle,
  SiGooglegemini,
  SiMui,
  SiResend,
  SiReactquery,
} from 'react-icons/si';
import { TbBrandAws } from 'react-icons/tb';
import { DiDjango } from 'react-icons/di';
import { RiSupabaseLine } from 'react-icons/ri';
import { ProjectData } from '@/types';

import Image from 'next/image';

export const projectsData: ProjectData[] = [
  {
    id: 'project-1',
    title: 'Medipal',
    description:
      "An AI powered healthcare companion app revolutionizing the Emergency Room experience by supporting patients and nurses through their ER journey. Utilises OpenAI's Whisper for real-time transcription, STT and TTS for voice interaction, and AWS for secure data storage and processing.",
    technologies: [
      {
        icon: <SiNextdotjs className='w-6 h-6' />,
        title: 'Next.js',
      },
      {
        icon: <SiTypescript className='w-6 h-6' />,
        title: 'TypeScript',
      },
      {
        icon: <SiTailwindcss className='w-6 h-6' />,
        title: 'Tailwind CSS',
      },
      {
        icon: <SiShadcnui className='w-6 h-6' />,
        title: 'shadcn/ui',
      },
      {
        icon: <SiOpenai className='w-6 h-6' />,
        title: 'OpenAI',
      },
      {
        icon: <TbBrandAws className='w-6 h-6' />,
        title: 'AWS',
      },
    ],
    githubUrl: 'https://github.com/Elroy-Cor/medi-pal-frontend',
    liveUrl: 'https://medi-pal-frontend.vercel.app/',
    demoUrl:
      'https://player.vimeo.com/video/1094540664?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479',
    image: '/images/medipal.webp',
    awards: {
      description: 'SuperAI Next Hackathon 2025 Winner',
    },
  },
  {
    id: 'project-2',
    title: 'Elroy & Co Landing Page',
    subtitle: 'elroy&co',
    description:
      'A modern and responsive landing page for a startup company, showcasing latest projects, company information, and contact details.',
    technologies: [
      {
        icon: <SiNextdotjs className='w-6 h-6' />,
        title: 'Next.js',
      },
      {
        icon: <SiShadcnui className='w-6 h-6' />,
        title: 'shadcn/ui',
      },
      {
        icon: <SiResend className='w-6 h-6' />,
        title: 'Resend',
      },
      {
        icon: (
          <Image
            src='/svg/RecaptchaLogo.svg'
            alt='Google Recaptcha'
            width={24}
            height={24}
            className='w-7 h-7'
          />
        ),
        title: 'Google Recaptcha',
      },
    ],
    liveUrl: 'https://elroyandco.com/',
    image: '/images/elroyandco.webp',
  },
  {
    id: 'project-3',
    title: 'Megoria Laundry and Dry Cleaning Management System',
    subtitle: 'Megoria',
    description:
      'A full-stack laundry management system with a cross-platform desktop app built using Tauri to manage laundry, dry cleaning and pressing transactions, track inventory, manage customers, staff, finances and payment, and generate reports.',
    technologies: [
      {
        icon: <SiReact className='w-6 h-6' />,
        title: 'React',
      },
      {
        icon: <SiVite className='w-6 h-6' />,
        title: 'Vite',
      },
      {
        icon: <SiTypescript className='w-6 h-6' />,
        title: 'TypeScript',
      },
      {
        icon: <SiTailwindcss className='w-6 h-6' />,
        title: 'Tailwind CSS',
      },
      {
        icon: <SiReactquery className='w-6 h-6' />,
        title: 'Tanstack Query',
      },
      {
        icon: (
          <Image
            src='/svg/tanstack_2.svg'
            alt='Tanstack Router'
            width={24}
            height={24}
            className='w-7 h-7'
          />
        ),
        title: 'Tanstack Router',
      },
      {
        icon: <SiExpress className='w-6 h-6' />,
        title: 'Express.js',
      },
      {
        icon: <RiSupabaseLine className='w-6 h-6' />,
        title: 'Supabase',
      },
      {
        icon: <SiTauri className='w-6 h-6' />,
        title: 'Tauri',
      },
    ],
    image: '/images/megoria.webp',
  },
  {
    id: 'project-4',
    title: 'Top Care Fashion',
    description:
      'An e-commerce C2C fashion platform that allows users to buy and sell fashion items, using computer vision to detect clothing items in images and mix and match them with other items. The YOLOv8 base model is trained on large datasets of fashion images to accurately identify clothing items and their attributes.',
    technologies: [
      {
        icon: <SiReact className='w-6 h-6' />,
        title: 'React',
      },
      {
        icon: <SiMui className='w-6 h-6' />,
        title: 'Material UI',
      },
      {
        icon: <DiDjango className='w-6 h-6' />,
        title: 'Django',
      },
      {
        icon: <SiKaggle className='w-6 h-6' />,
        title: 'Kaggle',
      },
      {
        icon: <SiJupyter className='w-6 h-6' />,
        title: 'Jupyter Notebook',
      },
      {
        icon: <SiGooglegemini className='w-6 h-6' />,
        title: 'Google Gemini',
      },
      {
        icon: <p className='w-6 h-6'>YOLOv8</p>,
        title: 'Ultralytics YOLOv8',
      },
    ],
    image: '/images/tcf.webp',
  },
];
