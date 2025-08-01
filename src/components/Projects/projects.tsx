import Link from 'next/link';

export function Projects() {
  return (
    <section
      id='projects'
      className='z-20 min-h-screen w-full flex flex-col items-start justify-start p-4 md:px-15 lg:px-40 md:py-5'
    >
      {/* TITLE */}
      <Link href={`#projects`}>
        <h2 className='relative text-3xl md:text-4xl font-bold text-white mb-6 group cursor-pointer'>
          <span className='text-slate-700'>#</span> Projects
          {/* Animated underline */}
          <span className='absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-indigo-400 to-sky-500 transition-all duration-300 ease-out group-hover:w-full'></span>
        </h2>
      </Link>
    </section>
  );
}
