
'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BookOpen, ClipboardCheck, FileText, Youtube, Award, CheckCircle } from 'lucide-react';
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { currentUser } from '@/lib/data';


const trainingDocuments = [
  {
    id: 1,
    title: 'Yeni İşe Başlayanlar İçin Oryantasyon',
    description: 'Şirket kültürümüz, temel prosedürler ve departmanlar hakkında genel bilgilendirme.',
    category: 'Genel',
    lastUpdated: '15.07.2024',
    type: 'document',
    source: '/docs/oryantasyon.pdf',
  },
  {
    id: 2,
    title: 'İş Sağlığı ve Güvenliği Eğitimi',
    description: 'Tüm çalışanlar için zorunlu olan temel iş sağlığı ve güvenliği kuralları.',
    category: 'İSG',
    lastUpdated: '01.06.2024',
    type: 'video',
    source: 'https://www.youtube.com/embed/5_v-y_I-o-0',
  },
  {
    id: 3,
    title: 'Liderlik Gelişim Programı',
    description: 'Yönetici ve yönetici adayları için liderlik becerilerini geliştirme materyalleri.',
    category: 'Yönetim',
    lastUpdated: '20.05.2024',
    type: 'document',
    source: '/docs/liderlik.pdf',
  },
   {
    id: 4,
    title: 'Satış Teknikleri ve Müşteri İlişkileri',
    description: 'Satış ekibinin müşteri portföyünü ve satış başarısını artırmaya yönelik teknikler.',
    category: 'Satış',
    lastUpdated: '18.07.2024',
    type: 'video',
    source: 'https://www.youtube.com/embed/zEuA6pGK2gU'
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
    const { toast } = useToast();
    const [completedTrainings, setCompletedTrainings] = useState<Set<number>>(new Set());

    const handleGenerateCertificate = (trainingId: number, trainingTitle: string) => {
        setCompletedTrainings(prev => new Set(prev).add(trainingId));
        toast({
            title: '🎉 Tebrikler!',
            description: `Sayın ${currentUser.name}, "${trainingTitle}" eğitimini başarıyla tamamladınız. Sertifikanız profilinize eklendi.`,
        });
    };
    
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
            {trainingDocuments.map((doc) => {
              const isCompleted = completedTrainings.has(doc.id);
              const trainingCard = (
                <Card key={doc.id} className="flex flex-col">
                    <CardHeader>
                        <div className='flex justify-between items-start'>
                            <CardTitle className="text-lg">{doc.title}</CardTitle>
                             <Badge variant="outline" className='flex items-center gap-2'>
                                {doc.type === 'video' ? <Youtube className='h-4 w-4 text-red-500' /> : <FileText className='h-4 w-4' />}
                                <span>{doc.type === 'video' ? 'Video' : 'Doküman'}</span>
                            </Badge>
                        </div>
                        <CardDescription>{doc.category} Kategorisi</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-grow">
                        <p className="text-sm text-muted-foreground">{doc.description}</p>
                    </CardContent>
                    <CardFooter className="flex justify-between items-center text-xs text-muted-foreground">
                        <span>Son Güncelleme: {doc.lastUpdated}</span>
                        {isCompleted ? (
                             <div className="flex items-center gap-2 text-green-500 font-semibold">
                                <CheckCircle className="h-4 w-4" />
                                Tamamlandı
                            </div>
                        ) : doc.type === 'document' ? (
                            <Button size="sm" onClick={() => handleGenerateCertificate(doc.id, doc.title)}>
                                <Award className="mr-2 h-4 w-4" />
                                Eğitimi Tamamla & Sertifika Al
                            </Button>
                        ) : (
                            <DialogTrigger asChild>
                                <Button variant="secondary" size="sm">Videoyu İzle</Button>
                            </DialogTrigger>
                        )}
                    </CardFooter>
                </Card>
              );

              if (doc.type === 'video') {
                return (
                    <Dialog key={doc.id}>
                        {trainingCard}
                        <DialogContent className="max-w-4xl p-0">
                            <div className="aspect-video">
                                <iframe 
                                    width="100%" 
                                    height="100%" 
                                    src={doc.source}
                                    title={doc.title}
                                    frameBorder="0" 
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                                    allowFullScreen
                                ></iframe>
                            </div>
                            <DialogFooter className="p-4 bg-muted/50 border-t">
                                <Button disabled={isCompleted} onClick={() => handleGenerateCertificate(doc.id, doc.title)}>
                                    <Award className="mr-2 h-4 w-4" />
                                    Eğitimi Tamamladım & Sertifika Al
                                </Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                )
              }
              
              return trainingCard;
            })}
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
