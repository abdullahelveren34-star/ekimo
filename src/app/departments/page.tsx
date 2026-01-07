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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
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
                      <div className="text-sm text-muted-foreground mt-3 flex items-center">
                        <Users className="h-4 w-4 mr-2" />
                        {members.length} Üye
                      </div>
                    </CardContent>
                  </Card>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                      <dept.icon className="h-5 w-5" />
                      {dept.name} Departmanı
                    </DialogTitle>
                    <DialogDescription>
                      Bu departmanda görevli çalışanların listesi.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="py-4">
                    <ul className="space-y-4 max-h-[60vh] overflow-y-auto pr-4">
                      {members.map((member, index) => (
                        <li key={index} className="flex items-center gap-4">
                          <Avatar className="h-12 w-12">
                            <AvatarImage src={member.avatarUrl} alt={member.name} />
                            <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-semibold">{member.name}</p>
                            <p className="text-sm text-muted-foreground">{member.title}</p>
                          </div>
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
  );
}
