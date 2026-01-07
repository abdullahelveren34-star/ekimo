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
  DraftingCompass,
  Server,
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
import Link from 'next/link';

const departments = [
  { name: 'Satış', icon: TrendingUp, color: 'text-green-500' },
  { name: 'Pazarlama', icon: Megaphone, color: 'text-blue-500' },
  { name: 'Bağımsız', icon: Briefcase, color: 'text-gray-500' },
  { name: 'Tasarım', icon: Palette, color: 'text-purple-500' },
  { name: 'Satınalma', icon: ShoppingCart, color: 'text-orange-500' },
  { name: 'Üretim Planlama', icon: CalendarCog, color: 'text-cyan-500' },
  { name: 'Üretim', icon: Factory, color: 'text-yellow-500' },
  { name: 'Kalite ve Güvence', icon: BadgeCheck, color: 'text-teal-500' },
  { name: 'Sosyal Uygunluk', icon: HeartHandshake, color: 'text-red-500' },
  { name: 'Mali İşler', icon: Landmark, color: 'text-indigo-500' },
  { name: 'Modelhane', icon: DraftingCompass, color: 'text-pink-500' },
  { name: 'Depolar', icon: Warehouse, color: 'text-amber-500' },
  { name: 'Kesimhane', icon: Scissors, color: 'text-rose-500' },
  { name: 'Marka', icon: Gem, color: 'text-violet-500' },
  { name: 'İnsan Kaynakları', icon: BookUser, color: 'text-lime-500' },
  { name: 'İdari İşler', icon: Briefcase, color: 'text-sky-500' },
  { name: 'BT', icon: Server, color: 'text-gray-500' },
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
            const deptMembers = departmentMembers[dept.name as keyof typeof departmentMembers] || [];
            return (
              <Dialog key={dept.name}>
                <DialogTrigger asChild>
                  <Card className="cursor-pointer hover:border-primary transition-colors">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg font-medium">{dept.name}</CardTitle>
                        <dept.icon className={`h-5 w-5 ${dept.color}`} />
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="text-sm text-muted-foreground mt-3 flex items-center">
                        <Users className="h-4 w-4 mr-2" />
                        {deptMembers.length} Çalışan
                      </div>
                    </CardContent>
                  </Card>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                      <dept.icon className={`h-5 w-5 ${dept.color}`} />
                      {dept.name} Departmanı
                    </DialogTitle>
                    <DialogDescription>
                      Bu departmanda görevli çalışanların listesi.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="py-4">
                    <ul className="space-y-4 max-h-[60vh] overflow-y-auto pr-4">
                      {deptMembers.length > 0 ? (
                        deptMembers.map((member) => (
                          <li key={member.id}>
                            <Link href={`/personnel/${member.id}`} className="flex items-center gap-4 p-2 rounded-md hover:bg-muted transition-colors">
                              <Avatar className="h-12 w-12">
                                <AvatarImage src={member.avatarUrl} alt={member.name} />
                                <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-semibold">{member.name}</p>
                                <p className="text-sm text-muted-foreground">{member.title}</p>
                              </div>
                            </Link>
                          </li>
                        ))
                      ) : (
                        <p className="text-sm text-muted-foreground">Bu departmanda henüz çalışan bulunmuyor.</p>
                      )}
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
