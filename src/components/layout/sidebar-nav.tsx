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
} from '@/components/ui/sidebar';
import {
  Bot,
  Briefcase,
  FileText,
  Folder,
  LayoutDashboard,
  User,
  Settings,
  LogOut,
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const navItems = [
  { href: '/', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/profile', label: 'Profil', icon: User },
  { href: '/jobs', label: 'İş İlanları', icon: Briefcase },
  { href: '/applications', label: 'Başvurular', icon: FileText },
  { href: '/documents', label: 'Belgeler', icon: Folder },
  { href: '/ai-screener', label: 'AI Tarama', icon: Bot },
];

export function SidebarNav() {
  const pathname = usePathname();

  return (
    <>
      <SidebarHeader>
        <div className="flex items-center gap-3 p-2">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-8 text-primary">
                <path d="M12.378 1.602a.75.75 0 0 0-.756 0L3.366 6.136A.75.75 0 0 0 3 6.82v10.36a.75.75 0 0 0 .366.685l8.256 4.536a.75.75 0 0 0 .756 0l8.256-4.536A.75.75 0 0 0 21 17.18V6.82a.75.75 0 0 0-.366-.685L12.378 1.602ZM12 15.195a4.502 4.502 0 0 0-4.5 4.5v.09a.75.75 0 0 0 .75.75h7.5a.75.75 0 0 0 .75-.75v-.09a4.502 4.502 0 0 0-4.5-4.5Z" />
                <path d="M12 3.824a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5Z" />
            </svg>
            <span className="text-lg font-semibold text-sidebar-foreground">E-Kimo</span>
            <div className="grow" />
            <SidebarTrigger className="hidden md:flex" />
        </div>
      </SidebarHeader>
      <SidebarContent className="p-2">
        <SidebarMenu>
          {navItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <Link href={item.href} legacyBehavior passHref>
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
    </>
  );
}
