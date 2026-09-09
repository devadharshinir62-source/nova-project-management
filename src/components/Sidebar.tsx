"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';

const navigation = [
  { name: 'Dashboard', href: '/dashboard' },
  { name: 'Projects', href: '/projects' },
  { name: 'Tasks', href: '/tasks' },
  { name: 'Team', href: '/team' },
  { name: 'Settings', href: '/settings' },
];

export default function Sidebar() {
  const pathname = usePathname();
  return (
    <aside className="w-64 bg-gray-800 text-white flex flex-col">
      <div className="p-4 border-b border-gray-700">
        <h1 className="text-2xl font-bold">NOVA</h1>
      </div>
      <nav className="flex-1 p-2 space-y-1">
        {navigation.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={`block px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700 ${pathname === item.href ? 'bg-gray-900' : ''}`}
          >
            {item.name}
          </Link>
        ))}
      </nav>
      <div className="p-4 border-t border-gray-700">
<button onClick={() => signOut({ callbackUrl: '/' })} className="block w-full text-center px-3 py-2 rounded-md text-sm font-medium bg-red-600 hover:bg-red-700">Logout</button>
      </div>
    </aside>
  );
}
