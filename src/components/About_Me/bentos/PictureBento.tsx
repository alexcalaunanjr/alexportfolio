import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';

export function PictureBento() {
  return (
    <Card className='relative col-span-1 bg-gradient-to-b from-transparent to-slate-700/70 border border-slate-500 text-white hover:to-slate-600/70 transition-colors duration-300'>
      <CardContent className='flex flex-col items-center h-full'>
        {/* Circle image */}
        <div className='relative w-40 h-40 md:w-48 md:h-48 rounded-full overflow-hidden border-1 border-sky-200'>
          <Image src='/images/me.webp' alt='Alex Calaunan Jr' fill />
        </div>
      </CardContent>
    </Card>
  );
}
