import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function DepartmentsPage() {
  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-bold text-foreground">Departmanlar</h1>
        <p className="text-muted-foreground mt-1">Şirket departmanlarını yönetin.</p>
      </header>
      <Card>
        <CardHeader>
          <CardTitle>Tüm Departmanlar</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Departman listesi burada görünecektir.</p>
        </CardContent>
      </Card>
    </div>
  );
}
