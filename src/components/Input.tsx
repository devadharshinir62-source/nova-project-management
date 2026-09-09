import React, { InputHTMLAttributes, TextareaHTMLAttributes, SelectHTMLAttributes } from 'react';

type InputProps = InputHTMLAttributes<HTMLInputElement> & { className?: string };

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & { className?: string };

type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & { className?: string };

export const Input = ({ className = '', ...props }: InputProps) => (
  <input
    className={`bg-slate-900/60 border border-slate-700 text-white placeholder-slate-500 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500/40 ${className}`}
    {...props}
  />
);

export const Textarea = ({ className = '', ...props }: TextareaProps) => (
  <textarea
    className={`bg-slate-900/60 border border-slate-700 text-white placeholder-slate-500 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500/40 ${className}`}
    {...props}
  />
);

export const Select = ({ className = '', ...props }: SelectProps) => (
  <select
    className={`bg-slate-900/60 border border-slate-700 text-white placeholder-slate-500 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500/40 ${className}`}
    {...props}
  />
);
