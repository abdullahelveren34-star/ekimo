import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Landmark, Target, Eye, Building2, GitBranch, Rocket } from 'lucide-react';
import React from 'react';
import { departmentMembers } from '@/lib/data';

const getPersonByTitle = (title: string) => {
    const allEmployees = Object.values(departmentMembers).flat();
    return allEmployees.find(emp => emp.title === title)?.name || null;
}

const getDirectorForDepartment = (departmentName: string) => {
    const directorsAndManagers = Object.values(departmentMembers).flat().filter(
        emp => emp.title.includes('Müdürü') || emp.title.includes('Direktörü') || emp.title.includes('Sorumlusu') || emp.title.includes('Kaptanı')
    );
    return directorsAndManagers.find(dir => dir.department === departmentName)?.name || null;
}

const orgChartData = {
  title: 'StellarCorp Konseyi',
  children: [
    {
      title: 'CEO & Baş Kaşif',
      person: getPersonByTitle('CEO & Baş Kaşif'),
      children: [
        { title: 'Operasyonlar', person: getDirectorForDepartment('Operasyonlar') },
        { title: 'Ar-Ge', person: getDirectorForDepartment('Ar-Ge') },
        { title: 'Koloni Yönetimi', person: getDirectorForDepartment('Koloni Yönetimi') },
        { title: 'BT', person: getDirectorForDepartment('BT') },
      ],
    },
  ],
};


const OrgChartNode = ({ node }: { node: { title: string; person?: string | null; children?: any[] }}) => (
    <div className="relative flex flex-col items-center p-2">
        <div className="bg-muted text-foreground p-2 rounded-lg shadow-sm border border-border inline-block text-center min-w-[140px] whitespace-nowrap">
            <div className="font-headline">{node.title}</div>
            {node.person && (
                <div className="text-primary text-xs mt-1">{node.person}</div>
            )}
        </div>
        {node.children && node.children.length > 0 && (
            <div className="flex pt-5 mt-5 relative">
                {/* Vertical line from parent */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 h-5 w-px bg-border"></div>
                {node.children.map((child, index) => (
                    <div key={index} className="relative px-2 flex flex-col items-center">
                         {/* Horizontal line */}
                        <div className="absolute top-0 left-0 w-full h-px bg-border"></div>
                        {/* Hide ends for single child */}
                        {node.children.length > 1 && index === 0 && <div className="absolute top-0 left-1/2 w-1/2 h-px bg-background"></div>}
                        {node.children.length > 1 && index === node.children.length - 1 && <div className="absolute top-0 left-0 w-1/2 h-px bg-background"></div>}
                        {/* Vertical line to child */}
                        <div className="absolute -top-5 left-1/2 -translate-x-1/2 h-5 w-px bg-border"></div>
                        <OrgChartNode node={child} />
                    </div>
                ))}
            </div>
        )}
    </div>
);


export default function CorporatePage() {
  return (
    <div className="space-y-8 font-headline">
      <header>
        <div className="flex items-center gap-3">
          <Rocket className="h-8 w-8 text-primary" />
          <div>
            <h1 className="text-3xl font-bold text-foreground">StellarCorp Direktifleri</h1>
            <p className="text-muted-foreground mt-1">Şirketimizin kimliği, değerleri ve galaktik hedefleri.</p>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="h-6 w-6 text-primary" />
              Tarihçemiz: Yeni Bir Başlangıç
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground">
            <p>
              StellarCorp, 21. yüzyılın ortalarında artan küresel krizler ve tükenen kaynaklar karşısında insanlığa yeni bir umut sunma vizyonuyla 2042 yılında kuruldu. Mars yörüngesindeki mütevazı bir istasyonda başlayan yolculuğumuz, bugün bilinen galaksinin sınırlarını zorlayan, yıldızlararası bir güç haline gelmiştir.
            </p>
            <p>
              Kurulduğumuz ilk günden beri en cesur zihinleri bir araya getirmeyi, bilinmeyeni keşfetmeyi ve teknolojinin sınırlarını zorlamayı temel ilkemiz olarak benimsedik. Bu ilkelerle, insanlığın geleceğini yıldızlarda arıyoruz.
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
              İnsanlığın geleceğini güvence altına almak için yıldızlararası keşifler yapmak, yaşanabilir gezegenleri kolonileştirmek ve evrenin sırlarını açığa çıkarmak. Tüm operasyonlarımızda bilimsel merakı, etik değerleri ve evrensel barışı en üst düzeyde tutmaktır.
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
              İnsanlığı çok gezegenli bir tür haline getirerek galaktik bir medeniyetin temellerini atmak. Bilgi, teknoloji ve refahı tüm evrene yayan, yıldızlar arasında bir köprü görevi gören ve gelecek nesillere sonsuz bir olasılıklar evreni bırakan öncü kurum olmaktır.
            </p>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <GitBranch className="h-6 w-6 text-primary" />
                    Organizasyon Şeması
                </CardTitle>
            </CardHeader>
            <CardContent className="overflow-x-auto p-6">
                <div className="flex justify-center">
                   <OrgChartNode node={orgChartData} />
                </div>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
