'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Landmark, Target, Eye, Building2, GitBranch } from 'lucide-react';
import React from 'react';

// Simplified structure for the organization chart based on titles and departments
const orgChartData = {
  title: 'Yönetim Kurulu',
  children: [
    {
      title: 'Genel Müdür',
      children: [
        { title: 'Satış' },
        { title: 'Pazarlama' },
        { title: 'Tasarım' },
        { title: 'Satınalma' },
        { title: 'Üretim Planlama' },
        { title: 'Üretim' },
        { title: 'Kalite ve Güvence' },
        { title: 'Sosyal Uygunluk' },
        { title: 'Mali İşler' },
        { title: 'Modelhane' },
        { title: 'Depolar' },
        { title: 'Kesimhane' },
        { title: 'Marka' },
        { title: 'İnsan Kaynakları' },
        { title: 'İdari İşler' },
        { title: 'BT' },
      ],
    },
  ],
};

const OrgChartNode = ({ node, isRoot = false }: { node: { title: string; children?: any[] }, isRoot?: boolean }) => (
    <div className={`relative flex flex-col items-center justify-center ${!isRoot && 'pl-8'}`}>
        {/* Connector line for non-root nodes */}
        {!isRoot && (
            <div className="absolute left-0 top-1/2 h-px w-8 bg-border"></div>
        )}
        <div className="bg-muted p-3 rounded-lg shadow-md text-center inline-block min-w-[150px] z-10 relative">
            <p className="font-semibold text-sm">{node.title}</p>
        </div>
        {node.children && node.children.length > 0 && (
            <div className="relative mt-2 pl-8 border-l border-border">
                <ul className="space-y-2">
                    {node.children.map((child, index) => (
                        <li key={index}>
                            <OrgChartNode node={child} />
                        </li>
                    ))}
                </ul>
            </div>
        )}
    </div>
);


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
                <div className="flex justify-start">
                   <OrgChartNode node={orgChartData} isRoot={true} />
                </div>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
