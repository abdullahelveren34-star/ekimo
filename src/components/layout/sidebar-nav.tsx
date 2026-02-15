"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useMemo } from 'react';
import {
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
  SidebarMenuBadge,
} from '@/components/ui/sidebar';
import { useFirebase, useCollection } from '@/firebase';
import { collection, query, where } from 'firebase/firestore';
import { Logo } from '../logo';
import { 
  Home, 
  Users, 
  Briefcase, 
  FileText, 
  BookOpen, 
  Landmark, 
  Leaf, 
  Shield, 
  BarChart2,
  Bot,
  SlidersHorizontal
} from 'lucide-react';

const navItems = [
  { href: '/', label: 'Ana Sayfa', icon: Home, color: 'text-green-400' },
  { href: '/departments', label: 'Departmanlar', icon: Users, color: 'text-orange-400' },
  { href: '/jobs', label: 'İş İlanları', icon: Briefcase, color: 'text-indigo-400' },
  { href: '/requests', label: 'Talepler', icon: FileText, color: 'text-blue-400' },
  { href: '/documents', label: 'Eğitim & Dokümanlar', icon: BookOpen, color: 'text-yellow-400' },
  { href: '/corporate', label: 'Kurumsal', icon: Landmark, color: 'text-pink-400' },
  { href: '/sustainability', label: 'Sürdürülebilirlik', icon: Leaf, color: 'text-teal-400' },
  { href: '/management', label: 'Onay Yönetimi', id: 'management', icon: Shield, color: 'text-red-400' },
  { href: '/reporting', label: 'Raporlama', icon: BarChart2, color: 'text-purple-400' },
  { href: '/portal-management', label: 'Portal Yönetimi', icon: SlidersHorizontal, color: 'text-gray-400' },
];

const bottomNavItems = [
    { href: '/ai-screener', label: 'AI Tarama', icon: Bot, color: 'text-fuchsia-400' },
]

export function SidebarNav() {
  const pathname = usePathname();
  const { firestore, user } = useFirebase();

  const pendingRequestsQuery = useMemo(() => {
    if (!firestore || !user) return null;
    return query(
      collection(firestore, 'approvalRequests'),
      // This can be adjusted to be more specific if needed, e.g., by approverId
      where('status', '==', 'Beklemede')
    );
  }, [firestore, user]);

  const { data: pendingRequests } = useCollection(pendingRequestsQuery);

  return (
    <>
      <SidebarHeader>
        <div className="flex items-center gap-3 p-2">
            <Logo className="w-auto h-10" />
            <div className="grow" />
            <SidebarTrigger className="hidden md:flex" />
        </div>
      </SidebarHeader>
      <SidebarContent className="p-2">
        <SidebarMenu>
          {navItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <Link href={item.href}>
                <SidebarMenuButton
                  isActive={pathname.startsWith(item.href) && (item.href !== '/' || pathname === '/')}
                  tooltip={item.label}
                >
                  <item.icon className={item.color} />
                  <span>{item.label}</span>
                  {item.id === 'management' && pendingRequests && pendingRequests.length > 0 && (
                    <SidebarMenuBadge>{pendingRequests.length}</SidebarMenuBadge>
                  )}
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
        <div className="grow" />
        <SidebarMenu>
          {bottomNavItems.map((item) => (
            <SidebarMenuItem key={item.href}>
                <Link href={item.href}>
                    <SidebarMenuButton
                    isActive={pathname === item.href}
                    tooltip={item.label}
                    >
                    <item.icon className={item.color} />
                    <span>{item.label}</span>
                    </SidebarMenuButton>
                </Link>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
    </>
  );
}
