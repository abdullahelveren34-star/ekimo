"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useMemo } from 'react';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
  SidebarFooter,
  SidebarMenuBadge,
} from '@/components/ui/sidebar';
import {
  Bot,
  LayoutDashboard,
  Settings,
  LogOut,
  Home,
  Building,
  ClipboardList,
  FileText,
  Briefcase,
  Server,
  Users,
  Shield,
  Landmark,
  CalendarCheck,
} from 'lucide-react';
import { useFirebase, useCollection } from '@/firebase';
import { collection, query, where } from 'firebase/firestore';
import { approverUser } from '@/lib/data';
import { Logo } from '../logo';

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard, color: 'text-sky-500' },
  { href: '/', label: 'Ana Sayfa', icon: Home, color: 'text-green-500' },
  { href: '/departments', label: 'Departmanlar', icon: Building, color: 'text-yellow-500' },
  { href: '/personnel', label: 'Personel', icon: Users, color: 'text-orange-500' },
  { href: '/jobs', label: 'İş İlanları', icon: Briefcase, color: 'text-blue-500' },
  { href: '/requests', label: 'Talepler', icon: ClipboardList, color: 'text-cyan-500' },
  { href: '/bt-requests', label: 'BT Talepleri', icon: Server, color: 'text-gray-500' },
  { href: '/documents', label: 'Eğitim & Dokümanlar', icon: FileText, color: 'text-indigo-500' },
  { href: '/corporate', label: 'Kurumsal', icon: Landmark, color: 'text-purple-500' },
  { href: '/work-calendar', label: 'İş Takvim ve Planlama', icon: CalendarCheck, color: 'text-rose-500' },
  { href: '/management', label: 'Yönetim', icon: Shield, id: 'management', color: 'text-red-500' },
];

const bottomNavItems = [
    { href: '/ai-screener', label: 'AI Tarama', icon: Bot, color: 'text-teal-500' },
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
      {/* 
      This is commented out as per the new implementation where the logout and settings are in a dropdown menu in the user profile.
      <SidebarFooter>
        <div className="flex flex-col gap-2 p-2">
            <SidebarMenu>
                <SidebarMenuItem>
                    <SidebarMenuButton tooltip="Ayarlar">
                        <Settings />
                        <span>Ayarlar</span>
                    </SidebarMenuButton>
                </SidebarMenuItem>
                 <SidebarMenuItem>
                    <SidebarMenuButton tooltip="Çıkış Yap">
                        <LogOut />
                        <span>Çıkış Yap</span>
                    </SidebarMenuButton>
                </SidebarMenuItem>
            </SidebarMenu>
        </div>
      </SidebarFooter> 
      */}
    </>
  );
}

    