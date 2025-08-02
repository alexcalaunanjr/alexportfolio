'use client';

import { motion, AnimatePresence } from 'motion/react';
import { useState, useRef, useEffect, Fragment } from 'react';
import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from '@/components/ui/card';
import Image from 'next/image';
// tooltip
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
// icons
import { X, Minus, ExternalLink, Video } from 'lucide-react';
import { RiExpandLeftRightFill } from 'react-icons/ri';
import { SiGithub } from 'react-icons/si';
// types
import { ProjectData } from '@/types';

interface ProjectCardProps {
  project: ProjectData;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isExpanded) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    // Cleanup function to restore scroll when component unmounts
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isExpanded]);

  // Handle escape key to close modal
  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isExpanded) {
        setIsExpanded(false);
      }
    };

    if (isExpanded) {
      document.addEventListener('keydown', handleEscapeKey);
    }

    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [isExpanded]);

  const handleVideoDemoClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click
    setIsExpanded(true);
  };

  const handleClose = () => {
    setIsExpanded(false);
  };

  return (
    <>
      {/* Original Card */}
      <motion.div ref={cardRef} className='cursor-default'>
        <Card className='bg-gradient-to-br from-transparent to-slate-700/70 hover:from-black hover:to-slate-500/70 border border-slate-500 py-6 transition-colors duration-300'>
          <CardContent className='flex max-md:flex-col max-md:items-center justify-center gap-4 md:gap-8 text-slate-200'>
            {/* IMAGE */}
            <motion.div
              layoutId={`image-${project.id}`}
              className='md:w-2/5 max-w-[450px] h-full relative group'
            >
              {project.image && (
                <>
                  {/* Glow Effect */}
                  <div className='absolute -inset-1 opacity-60 bg-gradient-to-r from-sky-500 via-white to-emerald-500 rounded-lg blur-sm group-hover:opacity-80 group-hover:-inset-2 group-hover:blur-md group-hover:animate-pulse transition-all duration-500'></div>

                  {/* Mac Window Frame */}
                  <div className='relative z-10 bg-gray-800 rounded-lg border border-gray-600 shadow-2xl'>
                    {/* Title Bar */}
                    <div className='flex items-center justify-between px-4 py-0.5 bg-gradient-to-r from-gray-700 to-gray-800 rounded-t-lg border-b border-gray-600'>
                      {/* Traffic Light Buttons */}
                      <div className='flex items-center space-x-2'>
                        <div className='flex items-center justify-center w-3 h-3 bg-red-400 rounded-full hover:bg-red-300 transition-colors'>
                          <X
                            size={10}
                            className='hover:opacity-100 opacity-0 text-red-700'
                          />
                        </div>
                        <div className='flex items-center justify-center w-3 h-3 bg-yellow-400 rounded-full hover:bg-yellow-300 transition-colors'>
                          <Minus
                            size={10}
                            className='hover:opacity-100 opacity-0 text-yellow-700'
                          />
                        </div>
                        <div className='flex items-center justify-center w-3 h-3 bg-green-400 rounded-full hover:bg-green-300 transition-colors'>
                          <RiExpandLeftRightFill
                            size={10}
                            className='hover:opacity-100 opacity-0 text-green-700 rotate-45'
                          />
                        </div>
                      </div>

                      {/* Window Title */}
                      <div className='flex-1 text-center'>
                        <span className='text-gray-300 text-sm font-medium'>
                          {project.subtitle ? project.subtitle : project.title}
                        </span>
                      </div>

                      {/* Right side spacer (to balance the traffic lights) */}
                      <div className='w-[50px]'></div>
                    </div>

                    {/* Content Area */}
                    <div className='overflow-hidden rounded-b-lg bg-slate-800/50'>
                      <Image
                        src={project.image}
                        alt={project.title}
                        width={800}
                        height={450}
                        className='w-full h-full object-cover hover:scale-105 transition-transform duration-300'
                      />
                    </div>
                  </div>
                </>
              )}
            </motion.div>

            {/* DESC, TECH, LINKS */}
            <motion.div
              layoutId={`description-${project.id}`}
              className='md:w-3/5'
            >
              {/* title and desc */}
              <CardTitle className='text-xl text-white font-bold mb-2'>
                {project.title}
              </CardTitle>
              <CardDescription className='text-base text-white'>
                {project.description}
              </CardDescription>

              {/* Technologies */}
              <h3 className='mt-4 text-lg font-bold text-white'>Tech Stack</h3>
              <div className='mt-2 flex flex-wrap gap-4'>
                {project.technologies.map((tech) => (
                  <Tooltip key={tech.title} delayDuration={100}>
                    <TooltipTrigger className='flex items-center justify-center'>
                      <div className='text-slate-400 hover:text-white transition-colors duration-300'>
                        {tech.icon}
                      </div>
                    </TooltipTrigger>
                    <TooltipContent side='top' className='bg-slate-800 text-sm text-white p-2 rounded-lg shadow-lg'>
                      {tech.title}
                    </TooltipContent>
                  </Tooltip>
                ))}
              </div>

              {/* Links */}
              <div className='mt-8 flex gap-4 text-sm'>
                {project.githubUrl && (
                  <Link
                    href={project.githubUrl}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='flex items-center gap-2 bg-slate-600 hover:bg-slate-500 border border-slate-200 py-2 px-4 rounded-full transition-colors duration-300'
                  >
                    <SiGithub className='max-md:w-4 max-md:h-4 w-5 h-5' />
                    Repo
                  </Link>
                )}
                {project.demoUrl && (
                  <button
                    onClick={handleVideoDemoClick}
                    className='flex items-center gap-2 bg-sky-200 hover:bg-sky-50 text-slate-700 border border-slate-200 py-2 px-4 rounded-full transition-colors duration-300 hover:cursor-pointer'
                  >
                    <Video className='max-md:w-4 max-md:h-4 w-5 h-5' />
                    Demo
                  </button>
                )}
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='flex items-center gap-2 hover:bg-slate-800 border border-slate-200 py-2 px-4 rounded-full transition-colors duration-300'
                  >
                    <ExternalLink className='max-md:w-4 max-md:h-4 w-5 h-5' />
                    Visit
                  </a>
                )}
              </div>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Video Demo Modal */}
      <AnimatePresence>
        {isExpanded && project.demoUrl && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className='fixed inset-0 z-[9999] flex items-center justify-center p-4'
            onClick={handleClose}
            style={{ position: 'fixed', zIndex: 9999 }}
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className='absolute inset-0 bg-black/80 backdrop-blur-sm'
            />

            {/* Video Player Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className='relative w-full max-w-4xl group'
              onClick={(e) => e.stopPropagation()}
            >
              {/* Glow Effect */}
              <div className='absolute -inset-2 opacity-80 bg-gradient-to-r from-sky-500 via-white to-emerald-500 rounded-lg blur-md group-hover:animate-pulse'></div>

              {/* Mac Window Frame */}
              <div className='relative z-10 bg-gray-800 rounded-lg border border-gray-600 shadow-2xl'>
                {/* Title Bar */}
                <div className='flex items-center justify-between px-4 py-1 bg-gradient-to-r from-gray-700 to-gray-800 rounded-t-lg border-b border-gray-600'>
                  {/* Traffic Light Buttons */}
                  <div className='flex items-center space-x-2'>
                    <button
                      onClick={handleClose}
                      className='flex items-center justify-center w-3 h-3 bg-red-500 rounded-full hover:bg-red-400 transition-colors'
                    >
                      <X size={10} className='text-red-700' />
                    </button>
                    <div className='flex items-center justify-center w-3 h-3 bg-yellow-500 rounded-full hover:bg-yellow-400 transition-colors'>
                      <Minus
                        size={10}
                        className='hover:opacity-100 opacity-0 text-yellow-700'
                      />
                    </div>
                    <div className='flex items-center justify-center w-3 h-3 bg-green-500 rounded-full hover:bg-green-400 transition-colors'>
                      <RiExpandLeftRightFill
                        size={10}
                        className='hover:opacity-100 opacity-0 text-green-700 rotate-45'
                      />
                    </div>
                  </div>

                  {/* Window Title */}
                  <div className='flex-1 text-center'>
                    <span className='text-gray-300 text-sm font-medium'>
                      {project.title} - Demo Video
                    </span>
                  </div>

                  {/* Right side spacer */}
                  <div className='w-[50px]'></div>
                </div>

                {/* Video Content Area */}
                <div className='bg-gray-900 rounded-b-lg'>
                  <div className='aspect-video w-full overflow-hidden bg-black'>
                    <iframe
                      src={project.demoUrl}
                      className='w-full h-full'
                      allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                      allowFullScreen
                      title={`${project.title} Demo Video`}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
