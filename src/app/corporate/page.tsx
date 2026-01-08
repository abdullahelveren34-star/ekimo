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
    const directorsAndManagers = Object.values(departmentMembers).flat().filter(
        emp => emp.title.includes('Müdürü') || emp.title.includes('Direktörü')
    );
    return directorsAndManagers.find(dir => dir.department === departmentName)?.name || null;
}

const orgChartData = {
  title: 'Yönetim Kurulu',
  children: [
    {
      title: 'Genel Müdür',
      person: getPersonByTitle('Genel Müdür'),
      children: [
        { title: 'Satış', person: getDirectorForDepartment('Satış') },
        { title: 'Pazarlama', person: getDirectorForDepartment('Pazarlama') },
        { title: 'Tasarım', person: getDirectorForDepartment('Tasarım') },
        { title: 'Satınalma', person: getDirectorForDepartment('Satınalma') },
        { title: 'Üretim Planlama', person: getDirectorForDepartment('Üretim Planlama') },
        { title: 'Üretim', person: getDirectorForDepartment('Üretim') },
        { title: 'Kalite ve Güvence', person: getDirectorForDepartment('Kalite ve Güvence') },
        { title: 'Sosyal Uygunluk', person: getDirectorForDepartment('Sosyal Uygunluk') },
        { title: 'Mali İşler', person: getDirectorForDepartment('Mali İşler') },
        { title: 'Modelhane', person: getDirectorForDepartment('Modelhane') },
        { title: 'Depolar', person: getDirectorForDepartment('Depolar') },
        { title: 'Kesimhane', person: getDirectorForDepartment('Kesimhane') },
        { title: 'Marka', person: getDirectorForDepartment('Marka') },
        { title: 'İnsan Kaynakları', person: getDirectorForDepartment('İnsan Kaynakları') },
        { title: 'İdari İşler', person: getDirectorForDepartment('İdari İşler') },
        { title: 'BT', person: getDirectorForDepartment('BT') },
      ],
    },
  ],
};


const OrgChartNode = ({ node }: { node: { title: string; person?: string | null; children?: any[] }}) => (
    <div className="tree-node">
        <div className="node-content bg-muted text-foreground p-2 rounded-lg shadow-sm border border-border inline-block text-center">
            <div>{node.title}</div>
            {node.person && (
                <div className="text-orange-500 text-xs mt-1">{node.person}</div>
            )}
        </div>
        {node.children && node.children.length > 0 && (
            <ul className="tree-children">
                {node.children.map((child, index) => (
                    <li key={index}>
                        <OrgChartNode node={child} />
                    </li>
                ))}
            </ul>
        )}
        <style jsx>{`
            .tree-node {
                position: relative;
                display: flex;
                flex-direction: column;
                align-items: center;
                margin: 0 5px;
            }
            .node-content {
                white-space: nowrap;
                min-width: 120px;
            }
            .tree-children {
                display: flex;
                padding-left: 0;
                list-style-type: none;
                position: relative;
                margin-top: 20px;
            }
            .tree-children::before {
                content: '';
                position: absolute;
                top: -10px;
                left: 50%;
                width: 1px;
                height: 10px;
                background-color: hsl(var(--border));
            }
            .tree-children > li {
                padding: 20px 5px 0;
                position: relative;
            }
            .tree-children > li::before,
            .tree-children > li::after {
                content: '';
                position: absolute;
                top: 0;
                left: 50%;
                width: 50%;
                height: 1px;
                background-color: hsl(var(--border));
            }
            .tree-children > li::after {
                left: 0;
                width: 50%;
            }
            .tree-children > li:first-child::after {
                border-top-left-radius: 4px;
                border-left: 0;
                left: 50%;
                width: 50%;
            }
            .tree-children > li:last-child::before {
                 border-top-right-radius: 4px;
                 border-right: 0;
                 left:0;
                 width: 50%;
            }
            .tree-children > li:only-child::before, .tree-children > li:only-child::after {
                display: none;
            }

            .tree-children > li:first-child:not(:only-child)::after {
                left: 50%;
                width: 50%;
                border-top-left-radius: 0;
            }

            .tree-children > li:last-child:not(:only-child)::before {
                width: 50%;
                left: 0;
                border-top-right-radius: 0;
            }
            
            .tree-children > li > .tree-node::before {
                content: '';
                position: absolute;
                top: -20px;
                left: 50%;
                width: 1px;
                height: 20px;
                background-color: hsl(var(--border));
            }
        `}</style>
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
