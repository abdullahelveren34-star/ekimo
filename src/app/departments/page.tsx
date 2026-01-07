'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Users,
  TrendingUp,
  Megaphone,
  Briefcase,
  Palette,
  ShoppingCart,
  CalendarCog,
  Factory,
  BadgeCheck,
  HeartHandshake,
  Landmark,
  Scissors,
  Warehouse,
  Gem,
  BookUser,
} from 'lucide-react';
import React from 'react';
import { departmentMembers } from '@/lib/data';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const departments = [
  { name: 'Satış', icon: TrendingUp },
  { name: 'Pazarlama', icon: Megaphone },
  { name: 'Bağımsız', icon: Briefcase },
  { name: 'Tasarım', icon: Palette },
  { name: 'Satınalma', icon: ShoppingCart },
  { name: 'Üretim Planlama', icon: CalendarCog },
  { name: 'Üretim', icon: Factory },
  { name: 'Kalite ve Güvence', icon: BadgeCheck },
  { name: 'Sosyal Uygunluk', icon: HeartHandshake },
  { name: 'İnsan Kaynakları ve İdari İşler', icon: BookUser },
  { name: 'Mali İşler', icon: Landmark },
  { name: 'Modelhane', icon: Scissors },
  { name: 'Depolar', icon: Warehouse },
  { name: 'Kesimhane', icon: Scissors },
  { name: 'Marka', icon: Gem },
];

export default function DepartmentsPage() {
  return (
    <TooltipProvider>
      <div className="space-y-8">
        <header>
          <h1 className="text-3xl font-bold text-foreground">Departmanlar</h1>
          <p className="text-muted-foreground mt-1">Şirket departmanlarını yönetin.</p>
        </header>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {departments.map((dept) => {
            const members = departmentMembers[dept.name as keyof typeof departmentMembers] || [];
            return (
              <Dialog key={dept.name}>
                <DialogTrigger asChild>
                  <Card className="cursor-pointer hover:border-primary transition-colors">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg font-medium">{dept.name}</CardTitle>
                        <dept.icon className="h-5 w-5 text-muted-foreground" />
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex -space-x-2 overflow-hidden">
                        {members.slice(0, 5).map((member, index) => (
                          <Tooltip key={index}>
                            <TooltipTrigger asChild>
                              <Avatar className="h-8 w-8 border-2 border-card">
                                <AvatarImage src={member.avatarUrl} alt={member.name} />
                                <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                              </Avatar>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>{member.name}</p>
                            </TooltipContent>
                          </Tooltip>
                        ))}
                        {members.length > 5 && (
                           <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-card bg-muted text-xs font-medium text-muted-foreground">
                             +{members.length - 5}
                           </div>
                        )}
                      </div>
                      <div className="text-xs text-muted-foreground mt-3 flex items-center">
                        <Users className="h-3 w-3 mr-1" />
                        {members.length} Üye
                      </div>
                    </CardContent>
                  </Card>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                      <dept.icon className="h-5 w-5" />
                      {dept.name} Departmanı Üyeleri
                    </DialogTitle>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <ul className="space-y-3 max-h-80 overflow-y-auto">
                      {members.map((member, index) => (
                        <li key={index} className="flex items-center gap-3">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={member.avatarUrl} alt={member.name} />
                            <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                          </Avatar>
                          <span className="font-medium">{member.name}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </DialogContent>
              </Dialog>
            );
          })}
        </div>
      </div>
    </TooltipProvider>
  );
}
