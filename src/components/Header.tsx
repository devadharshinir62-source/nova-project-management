'use client';

import React from 'react';
import { usePathname } from 'next/navigation';

export default function Header() {
  const pathname = usePathname() ?? '/';
  // Derive page title from pathname
  const pageTitle = pathname.replace('/', '') || 'Home';
  const formattedTitle = pageTitle.charAt(0).toUpperCase() + pageTitle.slice(1);
  return (
    <header className="bg-white shadow px-4 py-2 flex items-center justify-between">
      <h2 className="text-xl font-semibold">{formattedTitle}</h2>
      {/* Placeholder for future actions like dark mode toggle */}
    </header>
  );
}
