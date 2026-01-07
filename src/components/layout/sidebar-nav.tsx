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
} from 'lucide-react';

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/', label: 'Ana Sayfa', icon: Home },
  { href: '/departments', label: 'Departmanlar', icon: Building },
  { href: '/jobs', label: 'İş İlanları', icon: Briefcase },
  { href: '/requests', label: 'Talepler', icon: ClipboardList },
  { href: '/bt-requests', label: 'BT Talepleri', icon: Server },
  { href: '/documents', label: 'Dokümanlar', icon: FileText },
];

const bottomNavItems = [
    { href: '/ai-screener', label: 'AI Tarama', icon: Bot },
]

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
