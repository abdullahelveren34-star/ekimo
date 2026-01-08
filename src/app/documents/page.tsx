
'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BookOpen, ClipboardCheck, FileText } from 'lucide-react';

const trainingDocuments = [
  {
    id: 1,
    title: 'Yeni İşe Başlayanlar İçin Oryantasyon',
    description: 'Şirket kültürümüz, temel prosedürler ve departmanlar hakkında genel bilgilendirme.',
    category: 'Genel',
    lastUpdated: '15.07.2024',
  },
  {
    id: 2,
    title: 'İş Sağlığı ve Güvenliği Eğitimi',
    description: 'Tüm çalışanlar için zorunlu olan temel iş sağlığı ve güvenliği kuralları.',
    category: 'İSG',
    lastUpdated: '01.06.2024',
  },
  {
    id: 3,
    title: 'Liderlik Gelişim Programı',
    description: 'Yönetici ve yönetici adayları için liderlik becerilerini geliştirme materyalleri.',
    category: 'Yönetim',
    lastUpdated: '20.05.2024',
  },
   {
    id: 4,
    title: 'Satış Teknikleri ve Müşteri İlişkileri',
    description: 'Satış ekibinin müşteri portföyünü ve satış başarısını artırmaya yönelik teknikler.',
    category: 'Satış',
    lastUpdated: '18.07.2024',
  },
];

const sopDocuments = [
  {
    id: 1,
    title: 'Üretim Hattı Kalite Kontrol Prosedürü',
    description: 'Üretimin her aşamasında uygulanması gereken kalite kontrol adımlarını detaylandırır.',
    department: 'Kalite ve Güvence',
    version: 'v2.1',
    lastUpdated: '10.07.2024',
  },
  {
    id: 2,
    title: 'Acil Durum ve Tahliye Prosedürü',
    description: 'Yangın, deprem gibi acil durumlarda takip edilecek adımlar ve toplanma alanları.',
    department: 'İdari İşler / İSG',
    version: 'v3.5',
    lastUpdated: '01.04.2024',
  },
  {
    id: 3,
    title: 'Yazılım Geliştirme Yaşam Döngüsü',
    description: 'BT departmanı için yazılım projelerinin planlama, geliştirme, test ve dağıtım süreçleri.',
    department: 'BT',
    version: 'v1.8',
    lastUpdated: '25.06.2024',
  },
  {
    id: 4,
    title: 'Masraf Bildirim ve Onay Süreci',
    description: 'Personel masraflarının nasıl bildirileceği ve onay sürecinin nasıl işlediğine dair kılavuz.',
    department: 'Mali İşler',
    version: 'v1.2',
    lastUpdated: '05.05.2024',
  },
];


export default function DocumentsPage() {
  return (
    <div className="space-y-8">
      <header>
        <div className="flex items-center gap-3">
          <FileText className="h-8 w-8 text-primary" />
          <div>
            <h1 className="text-3xl font-bold text-foreground">Doküman Merkezi</h1>
            <p className="text-muted-foreground mt-1">Eğitim materyallerine ve standart operasyon prosedürlerine buradan ulaşın.</p>
          </div>
        </div>
      </header>
      
      <Tabs defaultValue="training" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="training">
            <BookOpen className="mr-2 h-4 w-4" />
            Eğitim Dokümanları
          </TabsTrigger>
          <TabsTrigger value="sop">
            <ClipboardCheck className="mr-2 h-4 w-4" />
            Standart Operasyon Prosedürleri (SOP)
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="training">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {trainingDocuments.map((doc) => (
              <Card key={doc.id} className="flex flex-col">
                <CardHeader>
                  <CardTitle className="text-lg">{doc.title}</CardTitle>
                  <CardDescription>{doc.category} Kategorisi</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-sm text-muted-foreground">{doc.description}</p>
                </CardContent>
                <CardFooter className="flex justify-between items-center text-xs text-muted-foreground">
                   <span>Son Güncelleme: {doc.lastUpdated}</span>
                   <Button variant="secondary" size="sm">Görüntüle</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="sop">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {sopDocuments.map((doc) => (
              <Card key={doc.id} className="flex flex-col">
                <CardHeader>
                  <CardTitle className="text-lg">{doc.title}</CardTitle>
                  <CardDescription>{doc.department} Departmanı</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-sm text-muted-foreground">{doc.description}</p>
                </CardContent>
                <CardFooter className="flex justify-between items-center text-xs text-muted-foreground">
                   <div>
                     <span>Versiyon: {doc.version}</span>
                     <span className="mx-2">|</span>
                     <span>{doc.lastUpdated}</span>
                   </div>
                   <Button variant="secondary" size="sm">Görüntüle</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
