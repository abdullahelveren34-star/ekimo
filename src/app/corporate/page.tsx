import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Landmark, Target, Eye, Building2, GitBranch, Sitemap } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const orgChartData = {
  name: 'Zübeyir Dilek',
  title: 'Yönetim Kurulu Başkanı',
  avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  children: [
    {
      name: 'Neşe Ulu',
      title: 'Yönetim Kurulu Başkan Yrd.',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      name: 'Mahmut Yılmaz',
      title: 'Genel Müdür',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      children: [
        {
          name: 'İzlem Manduz',
          title: 'İK Müdürü',
          avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1888&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        },
        {
          name: 'Abdullah Elveren',
          title: 'Grup IT Direktörü',
          avatar: 'https://images.unsplash.com/photo-1557862921-37829c790f19?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        },
        {
          name: 'Bahar Candan',
          title: 'Mali İşler Direktörü',
          avatar: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        },
      ],
    },
  ],
};

const OrgChartNode = ({ node }: { node: typeof orgChartData }) => (
  <div className="flex flex-col items-center">
    <div className="bg-muted p-3 rounded-lg shadow-md text-center">
        <Avatar className="mx-auto h-16 w-16 mb-2">
            <AvatarImage src={node.avatar} alt={node.name} />
            <AvatarFallback>{node.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
        </Avatar>
        <p className="font-semibold">{node.name}</p>
        <p className="text-xs text-muted-foreground">{node.title}</p>
    </div>
    {node.children && node.children.length > 0 && (
      <>
        <div className="w-px h-8 bg-border" />
        <div className="flex justify-center">
          {node.children.map((child, index) => (
            <div key={index} className="px-4 relative">
                <div className="absolute top-0 left-1/2 w-px h-8 bg-border -translate-x-1/2" />
                { index > 0 && <div className="absolute top-0 right-1/2 w-1/2 h-px bg-border" />}
                { index < node.children!.length - 1 && <div className="absolute top-0 left-1/2 w-1/2 h-px bg-border" />}
                <OrgChartNode node={child as any} />
            </div>
          ))}
        </div>
      </>
    )}
  </div>
);


export default function CorporatePage() {
  return (
    <div className="space-y-8">
      <header>
        <div className="flex items-center gap-3">
          <Landmark className="h-8 w-8 text-primary" />
          <div>
            <h1 className="text-3xl font-bold text-foreground">Kurumsal</h1>
            <p className="text-muted-foreground mt-1">Şirketimizin kimliği, değerleri ve hedefleri hakkında bilgiler.</p>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="h-6 w-6 text-primary" />
              Tarihçemiz
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground">
            <p>
              E-Kimo, 1990 yılında tekstil sektörüne yenilikçi bir soluk getirme vizyonuyla Zübeyir Dilek tarafından kuruldu. Isparta'da mütevazı bir atölyede başlayan yolculuğumuz, bugün onlarca ülkeye ihracat yapan, sektörün öncü ve saygın firmalarından biri haline gelmiştir.
            </p>
            <p>
              Kurulduğumuz ilk günden beri kaliteye, yeniliğe ve insan kaynağına yatırım yapmayı temel ilkemiz olarak benimsedik. Bu ilkeler doğrultusunda, teknolojiyi yakından takip ederek üretim süreçlerimizi sürekli iyileştirdik ve global pazarda rekabet gücümüzü artırdık.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-6 w-6 text-primary" />
              Misyonumuz
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground">
            <p>
              Müşteri beklentilerini en üst düzeyde karşılayan, çevreye ve topluma duyarlı, sürdürülebilir ve yenilikçi tekstil çözümleri sunmak. Çalışanlarımıza ilham veren, adil ve gelişim odaklı bir çalışma ortamı yaratarak, tüm paydaşlarımız için değer üretmektir.
            </p>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Eye className="h-6 w-6 text-primary" />
              Vizyonumuz
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground">
            <p>
              Tasarım, teknoloji ve sürdürülebilirlik alanlarında küresel bir lider olmak. Yenilikçi ürünlerimiz ve güçlü markalarımızla dünya tekstil pazarında Türkiye'yi en iyi şekilde temsil eden, sektör trendlerini belirleyen ve ilham kaynağı olan bir kurum haline gelmektir.
            </p>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Sitemap className="h-6 w-6 text-primary" />
                    Organizasyon Şeması
                </CardTitle>
            </CardHeader>
            <CardContent className="overflow-x-auto p-6">
                <div className="min-w-max">
                   <OrgChartNode node={orgChartData} />
                </div>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
