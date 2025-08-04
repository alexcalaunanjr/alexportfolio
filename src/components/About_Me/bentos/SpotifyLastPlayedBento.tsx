import { useFormattedSpotifyTrack } from '@/hooks/useSpotifyLastPlayed';
import Image from 'next/image';
import Link from 'next/link';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from '../../ui/card';
// icons
import { SiSpotify } from 'react-icons/si';

export function SpotifyLastPlayedBento() {
  const { track, isLoading, error, isError } = useFormattedSpotifyTrack();

  if (isLoading) {
    return (
      <Card className='relative col-span-1 bg-gradient-to-b from-transparent to-slate-700/70 hover:to-slate-600/70 border border-slate-500 py-6 text-white transition-colors duration-300 overflow-hidden'>
        <CardHeader>
          <CardTitle className='md:text-xl text-white'>
            Last Played Track
          </CardTitle>
        </CardHeader>
        <CardContent className='flex items-center gap-3'>
          <div className='w-16 h-16 bg-slate-600 rounded animate-pulse shrink-0' />
          <div className='flex-1'>
            <div className='h-4 bg-slate-600 rounded animate-pulse mb-2' />
            <div className='h-3 bg-slate-600 rounded animate-pulse w-2/3 mb-1' />
            <div className='h-3 bg-slate-600 rounded animate-pulse w-1/2' />
          </div>
        </CardContent>
      </Card>
    );
  }

  if (isError) {
    return (
      <Card className='relative col-span-1 bg-gradient-to-b from-transparent to-slate-700/70 hover:to-slate-600/70 border border-slate-500 py-6 text-white transition-colors duration-300 overflow-hidden'>
        <CardHeader>
          <CardTitle className='md:text-xl text-white'>
            Last Played Track
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className='text-slate-400 text-sm'>
            {error?.message || 'Failed to load Spotify data'}
          </p>
        </CardContent>
      </Card>
    );
  }

  if (!track) {
    return (
      <Card className='relative col-span-1 bg-gradient-to-b from-transparent to-slate-700/70 hover:to-slate-600/70 border border-slate-500 py-6 text-white transition-colors duration-300 overflow-hidden'>
        <CardHeader className='w-full flex justify-between items-center'>
          <CardTitle className='md:text-xl text-white'>
            Last Played Track
          </CardTitle>
          <SiSpotify className='text-green-500 w-6 h-6' />
        </CardHeader>
        <CardContent>
          <p className='text-slate-400 text-sm'>No recent tracks found</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className='relative col-span-1 bg-gradient-to-b from-transparent to-slate-700/70 hover:to-slate-600/70 border border-slate-500 hover:border-slate-300 py-6 text-white transition-colors duration-300 overflow-hidden'>
      <CardHeader className='w-full flex justify-between items-center'>
        <CardTitle className='md:text-xl'>Last Played Track</CardTitle>
        <Link
          href={'https://open.spotify.com/user/boiboikikoy?si=5d268ddc747c4818'}
          target='_blank'
          rel='noopener noreferrer'
        >
          <SiSpotify className='hover:text-green-500 w-6 h-6 transition-colors duration-300' />
        </Link>
      </CardHeader>
      <CardContent className='flex flex-col items-start h-full'>
        <Link
          href={track.spotifyUrl}
          target='_blank'
          rel='noopener noreferrer'
          className='w-full hover:opacity-80 transition-opacity duration-200'
        >
          <div className='flex items-center gap-3'>
            {track.image && (
              <div className='w-24 h-24 rounded overflow-hidden shrink-0'>
                <Image
                  src={track.image}
                  alt={`${track.album} cover`}
                  width={120}
                  height={120}
                  className='w-full h-full object-cover'
                />
              </div>
            )}
            <div className='flex-1 min-w-0'>
              <h4 className='text-white font-medium truncate text-lg'>
                {track.name}
              </h4>
              <p className='text-slate-300 text-sm truncate'>{track.artist}</p>
              <p className='text-slate-400 text-sm truncate mt-1'>
                {track.album}
              </p>
            </div>
          </div>
        </Link>
      </CardContent>
      <CardFooter className='flex items-center justify-center w-full'>
        <div className='relative group w-fit'>
          <Link
            href={
              'https://open.spotify.com/user/boiboikikoy?si=5d268ddc747c4818'
            }
            target='_blank'
            rel='noopener noreferrer'
          >
            <p className='flex gap-2 items-center hover:text-green-500 transition-colors duration-300'>
              <span>
                <SiSpotify size={14} />
              </span>
              <span className='animate-gradient-x'>Spotify Profile</span>
            </p>
            <span className='absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-indigo-400 to-sky-500 transition-all duration-300 ease-out group-hover:w-full'></span>
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
}
