import React from 'react';
import { Member } from '@/lib/types';

interface MemberCardProps {
  member: Member;
}

export default function MemberCard({ member }: MemberCardProps) {
  return (
    <div className="flex items-center space-x-3 p-2 bg-slate-900/60 border border-slate-800 rounded-2xl hover:bg-slate-800/80 transition-colors">
      {member.avatarUrl ? (
        <img src={member.avatarUrl} alt={member.name} className="w-10 h-10 rounded-full" />
      ) : (
        <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-gray-700 font-medium">
          {member.name.split(' ').map((n) => n[0]).join('')}
        </div>
      )}
      <div>
        <p className="font-medium">{member.name}</p>
        <p className="text-sm text-gray-500">{member.role}</p>
        <p className="text-xs text-gray-400">{member.email}</p>
      </div>
    </div>
  );
}
