
'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Landmark, Target, Eye, Building2, GitBranch, ChevronsUpDown } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { allEmployees } from '@/lib/data';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Button } from '@/components/ui/button';
import Link from 'next/link';

type EmployeeNode = {
  id: string;
  name: string;
  title: string;
  avatar: string;
  children?: EmployeeNode[];
};

const buildHierarchy = (employees: typeof allEmployees): EmployeeNode | null => {
  const employeeMap: { [id: string]: EmployeeNode & { employee: any } } = {};
  employees.forEach(emp => {
    employeeMap[emp.id] = { 
      id: emp.id,
      name: emp.name, 
      title: emp.title, 
      avatar: emp.avatarUrl, 
      children: [], 
      employee: emp 
    };
  });

  let root: EmployeeNode | null = null;
  const directors: { [title: string]: EmployeeNode } = {};

  // First pass: identify root and directors
  employees.forEach(emp => {
    const node = employeeMap[emp.id];
    if (emp.title === 'Yönetim Kurulu Başkanı') {
      root = node;
    } else if (emp.title === 'Genel Müdür' || emp.title.includes('Direktör') || emp.title.includes('Müdür')) {
       if(!emp.title.includes('Yönetim Kurulu')){
         directors[emp.title] = node;
       }
    }
  });

  if (!root) return null;

  // Find the General Manager and build the main branch
  const generalManager = Object.values(employeeMap).find(e => e.title === 'Genel Müdür');
  if (generalManager) {
      const boardMember = Object.values(employeeMap).find(e=> e.title === 'Yönetim Kurulu Başkan Yrd.');
      if(boardMember) {
        root.children?.push(boardMember);
      }
      root.children?.push(generalManager);

      // Assign directors under the General Manager
      Object.values(directors).forEach(directorNode => {
          if(directorNode.title !== 'Genel Müdür' && (directorNode.title.includes('Direktör') || directorNode.title.includes('Müdür'))){
              generalManager.children?.push(directorNode);
          }
      });
  }


  // Assign employees to their respective directors
  employees.forEach(emp => {
    if (emp.title !== 'Yönetim Kurulu Başkanı' && emp.title !== 'Genel Müdür' && !emp.title.includes('Direktör') && !emp.title.includes('Müdür') && emp.title !== 'Yönetim Kurulu Başkan Yrd.') {
      const directorTitle = emp.department === 'İnsan Kaynakları' ? 'İK Müdürü' :
                           emp.department === 'BT' ? 'Grup IT Direktörü' :
                           emp.department === 'Mali İşler' ? 'Mali İşler Direktörü' : null;
      
      const directorNode = Object.values(directors).find(d => d.title === directorTitle);

      if (directorNode) {
        directorNode.children?.push(employeeMap[emp.id]);
      }
    }
  });

  return root;
};


const OrgChartNode = ({ node }: { node: EmployeeNode }) => (
  <div className="flex flex-col items-center text-center">
     <Collapsible>
        <div className="bg-muted/50 p-3 rounded-lg shadow-md text-center inline-block">
            <Link href={`/personnel/${node.id}`}>
                <Avatar className="mx-auto h-20 w-20 mb-2 cursor-pointer transition-transform hover:scale-105">
                    <AvatarImage src={node.avatar} alt={node.name} />
                    <AvatarFallback>{node.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
            </Link>
            <p className="font-semibold">{node.name}</p>
            <p className="text-xs text-muted-foreground">{node.title}</p>
            {node.children && node.children.length > 0 && (
                 <CollapsibleTrigger asChild>
                    <Button variant="ghost" size="sm" className="mt-2 text-xs">
                        <ChevronsUpDown className="h-3 w-3 mr-1" />
                        {node.children.length} Bağlı Kişi
                    </Button>
                </CollapsibleTrigger>
            )}
        </div>
        {node.children && node.children.length > 0 && (
        <CollapsibleContent>
            <div className="flex flex-col items-center pt-4">
                <div className="w-px h-4 bg-border" />
                <div className="flex justify-center flex-wrap">
                {node.children.map((child, index) => (
                    <div key={index} className="px-4 relative pt-4 mt-4">
                        <div className="absolute top-0 left-1/2 w-px h-8 bg-border -translate-x-1/2" />
                        { node.children!.length > 1 && <div className={`absolute top-4 h-px bg-border ${index === 0 ? 'left-1/2 w-1/2' : index === node.children!.length - 1 ? 'right-1/2 w-1/2' : 'w-full left-0'}`} />}
                        <OrgChartNode node={child} />
                    </div>
                ))}
                </div>
            </div>
        </CollapsibleContent>
        )}
    </Collapsible>
  </div>
);

const orgChartData = buildHierarchy(allEmployees);

export default function CorporatePage() {
  return (
    <div className="space-y-8">
      <header>
        <div className="flex items-center gap-3">
          <Landmark className="h-8 w-8 text-purple-500" />
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
                    <GitBranch className="h-6 w-6 text-red-500" />
                    Organizasyon Şeması
                </CardTitle>
            </CardHeader>
            <CardContent className="overflow-x-auto p-6">
                <div className="min-w-max py-4">
                   {orgChartData ? <OrgChartNode node={orgChartData} /> : <p>Organizasyon şeması yüklenemedi.</p>}
                </div>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}

    