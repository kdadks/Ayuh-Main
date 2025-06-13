import React from 'react';
import { clsx } from 'clsx';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export function Button({ 
  variant = 'primary', 
  size = 'md', 
  className, 
  children, 
  ...props 
}: ButtonProps) {
  return (
    <button
      className={clsx(
        'inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed',
        {
          // Variants
          'bg-primary-600 text-white hover:bg-primary-700 focus:ring-primary-500': variant === 'primary',
          'bg-secondary-600 text-white hover:bg-secondary-700 focus:ring-secondary-500': variant === 'secondary',
          'border border-secondary-200 bg-white text-secondary-700 hover:bg-secondary-50 focus:ring-primary-500': variant === 'outline',
          'text-secondary-700 hover:bg-secondary-100 focus:ring-primary-500': variant === 'ghost',
          
          // Sizes
          'px-3 py-1.5 text-sm rounded-md': size === 'sm',
          'px-4 py-2 text-sm rounded-lg': size === 'md',
          'px-6 py-3 text-base rounded-lg': size === 'lg',
        },
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
