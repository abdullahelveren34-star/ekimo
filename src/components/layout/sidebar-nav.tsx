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
  AtSign,
  Home,
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const navItems = [
  { href: '/', label: 'Ana Sayfa', icon: Home },
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
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
