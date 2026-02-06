'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Landmark, Target, Eye, Building2, GitBranch } from 'lucide-react';
import React from 'react';
import { departmentMembers } from '@/lib/data';

const getPersonByTitle = (title: string) => {
    const allEmployees = Object.values(departmentMembers).flat();
    return allEmployees.find(emp => emp.title === title)?.name || null;
}

const getDirectorForDepartment = (departmentName: string) => {
    const employeesInDept = departmentMembers[departmentName as keyof typeof departmentMembers];
    if (!employeesInDept) {
        return null;
    }
    // Define a priority order for titles
    const titlePriority = ['Direktörü', 'Müdürü', 'Sorumlusu'];

    for (const priorityTitle of titlePriority) {
        const found = employeesInDept.find(emp => emp.title.includes(priorityTitle));
        if (found) {
            return found.name;
        }
    }
    
    return null;
}

const orgChartData = {
  title: 'Yönetim Kurulu',
  children: [
    {
      title: 'Yönetim Kurulu Başkanı',
      person: getPersonByTitle('Yönetim Kurulu Başkanı'),
      children: [
        { title: 'Satış & Pazarlama', person: getDirectorForDepartment('Satış') },
        { title: 'Üretim', person: getDirectorForDepartment('Üretim') },
        { title: 'Tasarım', person: getDirectorForDepartment('Tasarım') },
        { title: 'Mali İşler', person: getDirectorForDepartment('Mali İşler') },
      ],
    },
  ],
};


const OrgChartNode = ({ node }: { node: { title: string; person?: string | null; children?: any[] }}) => (
    <div className="relative flex flex-col items-center p-2">
        <div className="bg-muted text-foreground p-2 rounded-lg shadow-sm border border-border inline-block text-center min-w-[140px] whitespace-nowrap">
            <div className="font-semibold">{node.title}</div>
            {node.person && (
                <div className="text-primary text-xs mt-1">{node.person}</div>
            )}
        </div>
        {node.children && node.children.length > 0 && (
            <div className="flex pt-5 mt-5 relative">
                {/* Vertical line from parent */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 h-5 w-px bg-border"></div>
                {node.children.map((child, index) => (
                    <div key={child.title} className="relative px-2 flex flex-col items-center">
                         {/* Horizontal line */}
                        <div className="absolute top-0 left-0 w-full h-px bg-border"></div>
                        {/* Hide ends for single child */}
                        {node.children && node.children.length > 1 && index === 0 && <div className="absolute top-0 left-1/2 w-1/2 h-px bg-background"></div>}
                        {node.children && node.children.length > 1 && index === node.children.length - 1 && <div className="absolute top-0 left-0 w-1/2 h-px bg-background"></div>}
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
    <div className="space-y-8">
      <header>
        <div className="flex items-center gap-3">
          <Landmark className="h-8 w-8 text-primary" />
          <div>
            <h1 className="text-3xl font-bold text-primary">Kurumsal Kimlik</h1>
            <p className="text-muted-foreground mt-1">Şirketimizin değerleri, geçmişi ve hedefleri.</p>
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
              1985 yılında küçük bir atölyede başlayan E-Kimo'nun yolculuğu, bugün sektörün öncü firmalarından biri olma gururunu yaşamaktadır. Kalite ve yeniliği her zaman ön planda tutarak, Türk tekstilini dünyaya tanıtan bir marka haline geldik.
            </p>
            <p>
              Kurulduğumuz ilk günden beri en büyük yatırımımız insana ve teknolojiye oldu. Bu sayede, değişen moda akımlarına hızla adapte olarak global pazarda rekabet gücümüzü koruduk.
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
              Yüksek kaliteli, sürdürülebilir ve yenilikçi tekstil ürünleri üreterek müşteri memnuniyetini en üst düzeyde tutmak. Çalışanlarımıza adil, güvenli ve gelişim odaklı bir çalışma ortamı sunarak sektörde öncü olmaktır.
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
              Modayı teknolojiyle birleştirerek, "akıllı tekstil" alanında dünya lideri olmak. Üretim süreçlerimizin tamamını çevre dostu hale getirerek gelecek nesillere daha yaşanabilir bir dünya bırakmaktır.
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
