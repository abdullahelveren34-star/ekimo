import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Briefcase, FilePlus, Users } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export default function Dashboard() {
  return (
    <div className="flex flex-col gap-8">
      <header>
        <h1 className="text-3xl font-bold text-foreground">Hoş Geldiniz, İK Ekibi!</h1>
        <p className="text-muted-foreground mt-1">E-Kimo insan kaynakları merkezinize genel bakış.</p>
      </header>

      <section>
        <Card className="overflow-hidden">
          <div className="md:flex">
            <div className="md:flex-shrink-0">
              <Avatar className="h-full w-full md:w-48 rounded-none">
                <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="İzlem Manduz" className="object-cover h-full w-full" />
                <AvatarFallback>İM</AvatarFallback>
              </Avatar>
            </div>
            <div className="p-8">
              <div className="uppercase tracking-wide text-sm text-primary font-semibold">İnsan Kaynakları Müdürü</div>
              <h2 className="mt-1 text-2xl font-bold text-foreground">İzlem Manduz</h2>
              <p className="mt-4 text-muted-foreground">
                "Değerli ekip arkadaşlarım,
                <br/><br/>
                İnsan kaynakları olarak en büyük hedefimiz, E-Kimo'yu her bir çalışanımız için daha değerli, adil ve motive edici bir çalışma ortamı haline getirmektir. Bu portal, süreçlerimizi kolaylaştırmak ve sizlere daha iyi hizmet vermek için tasarlandı. Tüm öneri ve geri bildirimlerinize açığız."
              </p>
            </div>
          </div>
        </Card>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Açık Pozisyonlar</CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">Şu anda aktif iş ilanları</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Yeni Başvurular</CardTitle>
            <FilePlus className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+25</div>
            <p className="text-xs text-muted-foreground">Bu hafta alınan yeni başvurular</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Toplam Çalışan</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">215</div>
            <p className="text-xs text-muted-foreground">Şirket genelindeki toplam personel</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Yaklaşan Görevler</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              <li className="flex items-center gap-3">
                <div className="h-2 w-2 rounded-full bg-primary"></div>
                <span>Ayşe Yılmaz ile 2. tur mülakat (Yazılım Müh.)</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="h-2 w-2 rounded-full bg-secondary-foreground"></div>
                <span>Performans değerlendirmelerini sonlandırın (3. Çeyrek)</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="h-2 w-2 rounded-full bg-accent"></div>
                <span>Yeni işe alım oryantasyonunu planlayın</span>
              </li>
            </ul>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Son Aktiviteler</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">"Pazarlama Müdürü" pozisyonu eklendi.</p>
            <p className="text-muted-foreground mt-2">Can Boz'un başvurusu "Mülakat" aşamasına taşındı.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
