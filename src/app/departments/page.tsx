import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
  BookUser
} from 'lucide-react';
import React from 'react';

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
        {departments.map((dept) => (
          <Card key={dept.name}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-lg font-medium">{dept.name}</CardTitle>
              <dept.icon className="h-5 w-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-xs text-muted-foreground">Departman</div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
