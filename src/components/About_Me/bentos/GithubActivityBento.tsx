import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import GitHubCalendar from 'react-github-calendar';
// icons
import { SiGithub } from 'react-icons/si';

export function GithubActivityBento() {
  return (
    <Card className='col-span-1 md:col-span-2 bg-gradient-to-b from-transparent to-slate-700/70 hover:to-slate-600/70 border border-slate-500 transition-colors duration-300'>
      <CardHeader className='w-full flex justify-between items-center'>
        <CardTitle className='md:text-xl text-white'>GitHub Activity</CardTitle>
        <Link
          href={'https://github.com/alexcalaunanjr'}
          target='_blank'
          rel='noopener noreferrer'
        >
          <SiGithub className='text-white hover:text-sky-500 w-6 h-6 transition-colors duration-300' />
        </Link>
      </CardHeader>
      <Link
        href={'https://github.com/alexcalaunanjr'}
        target='_blank'
        rel='noopener noreferrer'
      >
        <CardContent className='flex items-center justify-center h-full'>
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
