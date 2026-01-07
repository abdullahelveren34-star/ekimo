"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
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
  AtSign,
  Home,
  Building,
  ClipboardList,
  FileText,
  Briefcase,
  Server,
  Users,
  Shield,
} from 'lucide-react';
import { useFirebase, useCollection, useMemoFirebase } from '@/firebase';
import { collection, query, where } from 'firebase/firestore';

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/', label: 'Ana Sayfa', icon: Home },
  { href: '/departments', label: 'Departmanlar', icon: Building },
  { href: '/personnel', label: 'Personel', icon: Users },
  { href: '/jobs', label: 'İş İlanları', icon: Briefcase },
  { href: '/requests', label: 'Talepler', icon: ClipboardList },
  { href: '/bt-requests', label: 'BT Talepleri', icon: Server },
  { href: '/documents', label: 'Dokümanlar', icon: FileText },
  { href: '/management', label: 'Yönetim', icon: Shield, id: 'management' },
];

const bottomNavItems = [
    { href: '/ai-screener', label: 'AI Tarama', icon: Bot },
]

export function SidebarNav() {
  const pathname = usePathname();
  const { firestore, user } = useFirebase();

  const pendingRequestsQuery = useMemoFirebase(() => {
    if (!firestore || !user) return null;
    return query(
      collection(firestore, 'approvalRequests'),
      where('approverId', '==', 'izlem-manduz-id'),
      where('status', '==', 'Beklemede')
    );
  }, [firestore, user]);

  const { data: pendingRequests } = useCollection(pendingRequestsQuery);

  return (
    <>
      <SidebarHeader>
        <div className="flex items-center gap-3 p-2">
            <AtSign className="size-8 text-primary" />
            <span className="text-lg font-semibold text-sidebar-foreground">E-Kimo</span>
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
                  <item.icon />
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
                    <item.icon />
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
