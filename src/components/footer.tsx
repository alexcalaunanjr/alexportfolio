import Link from 'next/link';
// icons
import {
  TbBrandGithub,
  TbBrandLinkedin,
  TbMail,
  TbFileCv,
} from 'react-icons/tb';

export function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      href: 'https://github.com/alexcalaunanjr',
      icon: <TbBrandGithub size={20} />,
      label: 'GitHub',
    },
    {
      href: 'https://www.linkedin.com/in/alexander-calaunan-jr-a8b8b4136/',
      icon: <TbBrandLinkedin size={20} />,
      label: 'LinkedIn',
    },
    {
      href: '/Alex_Calaunan_Jr_Resume.pdf',
      icon: <TbFileCv size={20} />,
      label: 'Resume',
    },
    {
      href: 'mailto:alexcalaunan30@gmail.com',
      icon: <TbMail size={20} />,
      label: 'Email',
    },
  ];

  return (
    <footer className='relative bg-black border-t border-slate-700/50 mt-20 w-full overflow-hidden'>
      <div className='flex items-center justify-between mx-auto px-6 md:px-20 py-12 w-full'>
        {/* LEFT SIDE */}
        <div className='flex flex-col items-start justify-between h-full'>
          {/* top left: social links */}
          <div className='flex items-center gap-4 mb-6'>
            {/* name */}
            <h3 className='font-bold text-lg animate-gradient-x'>
              Alex Calaunan Jr
            </h3>

            {socialLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                target='_blank'
                rel='noopener noreferrer'
                className='text-white hover:text-sky-300 transition-colors duration-300'
                aria-label={link.label}
              >
                {link.icon}
              </Link>
            ))}
          </div>
          {/* bottom left: copyright */}
          <div className='text-start text-gray-400 text-sm'>
            &copy; {currentYear} Alex Calaunan Jr. All rights reserved.
          </div>
        </div>

        {/* RIGHT SIDE */}
                  {/* Contact Info */}
          <div className='space-y-4'>
            <h4 className='text-lg font-semibold text-white'>Get In Touch</h4>
            <div className='space-y-2'>
              <p className='text-slate-300 text-sm'>
                Open to new opportunities and collaborations
              </p>
              <Link
                href='#contact'
                className=' text-sky-400 hover:text-sky-300 transition-colors duration-300 text-sm font-medium'
              >
                Let's chat together →
              </Link>
            </div>
          </div>
      </div>

      {/* absolute positioning of huge name text at the VERY bottom of the footer */}
      <div className='absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-4 md:translate-y-6 lg:translate-y-12 text-9xl sm:text-[14vw] text-nowrap bg-gradient-to-b from-slate-200 to-slate-800 bg-clip-text text-transparent font-bold opacity-10 pointer-events-none leading-none m-0 p-0'>
        alex calaunan jr
      </div>
    </footer>
  );
}
