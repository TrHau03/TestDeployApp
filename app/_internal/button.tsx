import Loading from '@/app/_internal/loading';
import { cn } from '@/app/_internal/utils/style';
import React from 'react';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  className?: string;
  children: React.ReactNode;
}

export default function Button({ isLoading = false, className, children, ...rest }: Props) {
  return (
    <button
      disabled={isLoading}
      style={{ fontWeight: 'bold' }}
      className={cn(
        'btn flex w-full items-center gap-2 border-0 bg-[linear-gradient(90deg,rgb(135,255,0),rgb(38,77,74))] py-3 shadow-[0_10px_20px_-10px_rgba(67,97,238,0.44)] hover:bg-[linear-gradient(90deg,rgb(38,77,74),rgb(135,255,0))]',
        {
          'cursor-wait bg-gray-300': isLoading,
          'bg-blue-500 text-white hover:bg-blue-600': !isLoading,
        },
        className,
      )}
      {...rest}
    >
      {isLoading && <Loading className="size-5" />}
      {children}
    </button>
  );
}
