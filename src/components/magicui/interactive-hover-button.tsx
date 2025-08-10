import React from 'react';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export const InteractiveHoverButton = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ children, className, ...props }, ref) => {
  return (
    <button
      ref={ref}
      type='button'
      aria-label={children as string}
      aria-describedby={children as string}
      role='button'
      className={cn(
        'group relative w-auto cursor-pointer overflow-hidden rounded-full border bg-background p-2 px-6 text-center font-semibold',
        className
      )}
      {...props}
    >
      <div className='flex items-center gap-2'>
        <div className='h-2 w-2 rounded-full bg-white transition-all duration-300 group-hover:scale-[100.8]'></div>
        <span className='flex items-center gap-2 transition-all duration-300 group-hover:translate-x-12 group-hover:opacity-0'>
          {children}
        </span>
      </div>
      <div className='absolute top-0 z-10 flex h-full w-full translate-x-12 items-center justify-center gap-2 text-black opacity-0 transition-all duration-300 group-hover:-translate-x-5 group-hover:opacity-100'>
        <span className='flex gap-2 items-center'>{children}</span>
        <ArrowRight />
      </div>
    </button>
  );
});

InteractiveHoverButton.displayName = 'InteractiveHoverButton';
