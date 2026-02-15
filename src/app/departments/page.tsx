'use client';

import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
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
  Building2,
} from 'lucide-react';
import React, { useState } from 'react';
import { departmentMembers } from '@/lib/data';
import Link from 'next/link';

const departments = [
  { name: 'Satış & Pazarlama', icon: TrendingUp, color: 'text-green-500' },
  { name: 'Bağımsız', icon: Briefcase, color: 'text-gray-500' },
  { name: 'Tasarım', icon: Palette, color: 'text-pink-400' },
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
  const [selectedDepartment, setSelectedDepartment] = useState<{ name: string, members: any[] } | null>(null);

  const handleOpenDialog = (dept: { name: string; icon: React.ElementType; color: string }) => {
    const deptMembers = departmentMembers[dept.name as keyof typeof departmentMembers] || [];
    setSelectedDepartment({ name: dept.name, members: deptMembers });
  };

  const handleCloseDialog = () => {
    setSelectedDepartment(null);
  };

  return (
    <div className="space-y-8">
      <header>
        <div className="flex items-center gap-3">
          <Users className="h-8 w-8 text-primary" />
          <div>
            <h1 className="text-3xl font-bold text-primary">Departmanlar</h1>
            <p className="text-muted-foreground mt-1">Şirket departmanlarını ve çalışanlarını görüntüleyin.</p>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {departments.map((dept) => {
          const deptMembers = departmentMembers[dept.name as keyof typeof departmentMembers] || [];
          return (
            <Card
              key={dept.name}
              onClick={() => handleOpenDialog(dept)}
              className="group flex flex-col items-center justify-center p-6 text-center cursor-pointer hover:shadow-lg hover:border-primary transition-all"
            >
              <CardHeader className="p-0">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-muted group-hover:bg-primary transition-colors">
                  <dept.icon className={`h-8 w-8 ${dept.color} group-hover:text-primary-foreground transition-colors`} />
                </div>
              </CardHeader>
              <CardContent className="p-0 mt-4">
                <CardTitle className="text-lg">{dept.name}</CardTitle>
                <p className="text-sm text-muted-foreground mt-1">{deptMembers.length} Çalışan</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

       {selectedDepartment && (
        <Dialog open={!!selectedDepartment} onOpenChange={(isOpen) => !isOpen && handleCloseDialog()}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                <DialogTitle>{selectedDepartment.name} Departmanı</DialogTitle>
                <DialogDescription>
                    Bu departmanda görevli çalışanların listesi.
                </DialogDescription>
                </DialogHeader>
                <div className="max-h-[60vh] overflow-y-auto pr-4">
                    {selectedDepartment.members.length > 0 ? (
                        <ul className="space-y-4">
                        {selectedDepartment.members.map((member) => (
                            <li key={member.id}>
                            <Link href={`/personnel/${member.id}`} className="flex items-center gap-4 p-2 rounded-md hover:bg-muted transition-colors" onClick={handleCloseDialog}>
                                <Avatar className="h-12 w-12">
                                <AvatarFallback>{member.name.split(' ').map((n: string) => n[0]).join('')}</AvatarFallback>
                                </Avatar>
                                <div>
                                <p className="font-semibold">{member.name}</p>
                                <p className="text-sm text-muted-foreground">{member.title}</p>
                                </div>
                            </Link>
                            </li>
                        ))}
                        </ul>
                    ) : (
                        <p className="text-sm text-muted-foreground text-center py-4">Bu departmanda henüz çalışan bulunmuyor.</p>
                    )}
                </div>
            </DialogContent>
        </Dialog>
       )}
    </div>
  );
}

    