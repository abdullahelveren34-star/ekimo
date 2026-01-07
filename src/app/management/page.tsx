import { Shield } from 'lucide-react';

export default function ManagementPage() {
  return (
    <div className="space-y-8">
      <header>
        <div className="flex items-center gap-3">
          <Shield className="h-8 w-8 text-primary" />
          <div>
            <h1 className="text-3xl font-bold text-foreground">Yönetim Paneli</h1>
            <p className="text-muted-foreground mt-1">Genel sistem yönetimi ve ayarları.</p>
          </div>
        </div>
      </header>
      <div className="flex items-center justify-center h-96 border-2 border-dashed rounded-lg">
        <p className="text-muted-foreground">Yönetim paneli içeriği buraya gelecek.</p>
      </div>
    </div>
  );
}
