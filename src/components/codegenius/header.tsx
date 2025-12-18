'use client';
import { Code2, Palette } from 'lucide-react';
import { ThemeToggle } from '../theme-toggle';

export default function Header() {
  return (
    <header className="flex items-center justify-between px-4 sm:px-6 h-16 bg-card border-b shrink-0">
      <div className="flex items-center gap-2">
        {/* <Code2 className="w-7 h-7 text-primary" /> */}
        <Palette className="w-7 h-7 text-primary" />
        <h1 className="text-xl font-bold font-headline tracking-tight">CodeGenius</h1>
      </div>
      <div className="flex items-center gap-2">
        <ThemeToggle />
      </div>
    </header>
  );
}
