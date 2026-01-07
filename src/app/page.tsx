import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Briefcase, FilePlus, Users } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="flex flex-col gap-8">
      <header>
        <h1 className="text-3xl font-bold text-foreground">Ana Sayfa</h1>
        <p className="text-muted-foreground mt-1">E-Kimo insan kaynakları merkezinize hoş geldiniz.</p>
      </header>
    </div>
  );
}
