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

const navItems = [
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/', label: 'Ana Sayfa' },
  { href: '/departments', label: 'Departmanlar' },
  { href: '/personnel', label: 'Personel' },
  { href: '/jobs', label: 'İş İlanları' },
  { href: '/requests', label: 'Talepler' },
  { href: '/bt-requests', label: 'BT Talepleri' },
  { href: '/documents', label: 'Eğitim & Dokümanlar' },
  { href: '/corporate', label: 'Kurumsal' },
  { href: '/sustainability', label: 'Sürdürülebilirlik' },
  { href: '/work-calendar', label: 'Görevlendirme' },
  { href: '/management', label: 'Yönetim', id: 'management' },
  { href: '/reporting', label: 'Raporlama' },
];

const bottomNavItems = [
    { href: '/ai-screener', label: 'AI Tarama' },
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
