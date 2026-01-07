import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users } from 'lucide-react';

const departments = [
  'Satış',
  'Pazarlama',
  'Bağımsız',
  'Tasarım',
  'Satınalma',
  'Üretim Planlama',
  'Üretim',
  'Kalite ve Güvence',
  'Sosyal Uygunluk',
  'İnsan Kaynakları ve İdari İşler',
  'Mali İşler',
  'Modelhane',
  'Depolar',
  'Kesimhane',
  'Marka',
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
          <Card key={dept}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-lg font-medium">{dept}</CardTitle>
              <Users className="h-5 w-5 text-muted-foreground" />
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
