'use client';
import { Palette } from 'lucide-react';

export default function Header() {
  return (
    <header className="flex items-center justify-between px-4 sm:px-6 h-16 bg-card border-b shrink-0">
      <div className="flex items-center gap-2">
        <Palette className="w-7 h-7 text-primary" />
        <h1 className="text-xl font-bold font-headline tracking-tight">CodeGenius</h1>
      </div>
    </header>
  );
}
