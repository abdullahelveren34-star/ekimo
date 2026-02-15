'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BookOpen, ClipboardCheck, FileText, Youtube, Award, CheckCircle, BookText } from 'lucide-react';
import React, { useState, useEffect } from 'react';
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
import { Skeleton } from '@/components/ui/skeleton';


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
  {
    id: 5,
    title: 'Yangın Güvenliği ve Acil Durum Eğitimi',
    description: 'İş yerinde yangın güvenliği önlemleri, yangın söndürücü kullanımı ve acil durum tahliye prosedürleri.',
    category: 'İSG',
    lastUpdated: '29.07.2024',
    type: 'video',
    source: 'https://www.youtube.com/embed/gO51Q2i-k5E',
  },
  {
    id: 6,
    title: 'Veri Güvenliği Farkındalık Eğitimi',
    description: 'Tüm çalışanlar için siber güvenlik tehditleri ve veri koruma en iyi uygulamaları.',
    category: 'BT',
    lastUpdated: '11.08.2024',
    type: 'document',
    source: '/docs/veri-guvenligi.pdf',
  },
  {
    id: 7,
    title: 'Etkili Zaman Yönetimi',
    description: 'İş verimliliğini artırmak için zaman yönetimi teknikleri ve önceliklendirme stratejileri.',
    category: 'Kişisel Gelişim',
    lastUpdated: '05.08.2024',
    type: 'video',
    source: 'https://www.youtube.com/embed/example7',
  },
  {
    id: 8,
    title: 'Proje Yönetimi Temelleri',
    description: 'Proje yaşam döngüsü, planlama, yürütme ve izleme konularında başlangıç seviyesi eğitim.',
    category: 'Yönetim',
    lastUpdated: '01.08.2024',
    type: 'document',
    source: '/docs/proje-yonetimi.pdf',
  },
  {
    id: 9,
    title: 'Müşteri Hizmetleri Mükemmelliği',
    description: 'Müşteri memnuniyetini artırmak için iletişim ve problem çözme becerileri.',
    category: 'Müşteri İlişkileri',
    lastUpdated: '28.07.2024',
    type: 'video',
    source: 'https://www.youtube.com/embed/example9',
  },
  {
    id: 10,
    title: 'Stres Yönetimi ve Esenlik',
    description: 'İş yerinde stresi yönetme ve zihinsel esenliği koruma teknikleri.',
    category: 'Kişisel Gelişim',
    lastUpdated: '25.07.2024',
    type: 'document',
    source: '/docs/stres-yonetimi.pdf',
  },
  {
    id: 11,
    title: 'Dijital Pazarlama ve SEO Temelleri',
    description: 'Pazarlama ekibi için dijital pazarlama kanalları ve arama motoru optimizasyonu.',
    category: 'Pazarlama',
    lastUpdated: '22.07.2024',
    type: 'video',
    source: 'https://www.youtube.com/embed/example11',
  },
  {
    id: 12,
    title: 'Tedarik Zinciri Yönetimine Giriş',
    description: 'Satınalma ve lojistik süreçlerinin temel prensipleri ve en iyi uygulamaları.',
    category: 'Satınalma',
    lastUpdated: '19.07.2024',
    type: 'document',
    source: '/docs/tedarik-zinciri.pdf',
  },
  {
    id: 13,
    title: 'Etkili İletişim ve Beden Dili',
    description: 'İş yerinde daha etkili iletişim kurma, aktif dinleme ve beden dilini anlama.',
    category: 'Kişisel Gelişim',
    lastUpdated: '16.07.2024',
    type: 'video',
    source: 'https://www.youtube.com/embed/example13',
  },
  {
    id: 14,
    title: 'Finansal Okuryazarlık Eğitimi',
    description: 'Finansal olmayan departmanlar için temel finansal kavramlar ve raporlama.',
    category: 'Mali İşler',
    lastUpdated: '13.07.2024',
    type: 'document',
    source: '/docs/finansal-okuryazarlik.pdf',
  },
  {
    id: 15,
    title: 'Kalite Yönetim Sistemleri (ISO 9001)',
    description: 'Kalite departmanı ve yöneticiler için ISO 9001 standartlarının temelleri.',
    category: 'Kalite',
    lastUpdated: '10.07.2024',
    type: 'document',
    source: '/docs/iso9001.pdf',
  },
  {
    id: 16,
    title: 'İleri Excel Kullanımı',
    description: 'Pivot tablolar, makrolar ve gelişmiş formüllerle Excel verimliliğini artırın.',
    category: 'Genel',
    lastUpdated: '07.07.2024',
    type: 'video',
    source: 'https://www.youtube.com/embed/example16',
  },
  {
    id: 17,
    title: 'İş Etiği ve Uyum Kuralları',
    description: 'Şirketin etik kodları, çıkar çatışması ve uyum politikaları hakkında zorunlu eğitim.',
    category: 'Uyum',
    lastUpdated: '04.07.2024',
    type: 'document',
    source: '/docs/is-etigi.pdf',
  },
  {
    id: 18,
    title: 'Performans Değerlendirme Süreci',
    description: 'Yöneticiler için performans değerlendirme görüşmelerini etkin bir şekilde yapma rehberi.',
    category: 'Yönetim',
    lastUpdated: '01.07.2024',
    type: 'video',
    source: 'https://www.youtube.com/embed/example18',
  },
  {
    id: 19,
    title: 'Ergonomi ve Ofis Sağlığı',
    description: 'Ofis ortamında doğru duruş, ekipman kullanımı ve fiziksel sağlığı koruma yöntemleri.',
    category: 'İSG',
    lastUpdated: '28.06.2024',
    type: 'document',
    source: '/docs/ergonomi.pdf',
  },
  {
    id: 20,
    title: 'Sunum Becerilerini Geliştirme',
    description: 'Topluluk önünde etkili ve ikna edici sunumlar yapma teknikleri.',
    category: 'Kişisel Gelişim',
    lastUpdated: '25.06.2024',
    type: 'video',
    source: 'https://www.youtube.com/embed/example20',
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
  {
    id: 5,
    title: 'Yeni Personel İşe Alım Süreci',
    description: 'Açık pozisyonun duyurulmasından işe başlama sürecine kadar tüm adımları içerir.',
    department: 'İnsan Kaynakları',
    version: 'v2.0',
    lastUpdated: '15.07.2024',
  },
  {
    id: 6,
    title: 'Performans Değerlendirme Prosedürü',
    description: 'Çalışanların yıllık performans değerlendirmelerinin nasıl yapılacağını açıklar.',
    department: 'İnsan Kaynakları',
    version: 'v1.5',
    lastUpdated: '01.07.2024',
  },
  {
    id: 7,
    title: 'Müşteri Şikayetleri Yönetim Prosedürü',
    description: 'Müşterilerden gelen şikayetlerin nasıl ele alınacağı ve çözüleceği hakkında kılavuz.',
    department: 'Satış / Müşteri Hizmetleri',
    version: 'v1.3',
    lastUpdated: '20.06.2024',
  },
  {
    id: 8,
    title: 'Tedarikçi Seçme ve Değerlendirme',
    description: 'Yeni tedarikçilerin seçilmesi ve mevcutların performansının değerlendirilmesi süreci.',
    department: 'Satınalma',
    version: 'v2.2',
    lastUpdated: '18.05.2024',
  },
  {
    id: 9,
    title: 'Veri Yedekleme ve Kurtarma Prosedürü',
    description: 'Kritik şirket verilerinin düzenli olarak nasıl yedekleneceği ve bir felaket durumunda nasıl kurtarılacağı.',
    department: 'BT',
    version: 'v4.1',
    lastUpdated: '30.07.2024',
  },
  {
    id: 10,
    title: 'Hammade Giriş Kontrol Prosedürü',
    description: 'Üretimde kullanılacak hammaddelerin kabul kriterleri ve kontrol adımları.',
    department: 'Kalite ve Güvence',
    version: 'v1.9',
    lastUpdated: '12.07.2024',
  },
  {
    id: 11,
    title: 'İşten Ayrılma Süreci Prosedürü',
    description: 'Bir çalışanın işten ayrılması durumunda takip edilmesi gereken çıkış mülakatı, zimmet teslimi gibi adımlar.',
    department: 'İnsan Kaynakları',
    version: 'v1.7',
    lastUpdated: '10.06.2024',
  },
  {
    id: 12,
    title: 'Sosyal Medya Yönetimi Prosedürü',
    description: 'Şirketin sosyal medya hesaplarında içerik paylaşımı, etkileşim ve kriz yönetimi kuralları.',
    department: 'Pazarlama',
    version: 'v1.1',
    lastUpdated: '05.08.2024',
  },
  {
    id: 13,
    title: 'Makine Bakım ve Onarım Prosedürü',
    description: 'Üretim makinelerinin periyodik bakım takvimi ve arıza durumunda müdahale prosedürleri.',
    department: 'Üretim / Bakım',
    version: 'v3.0',
    lastUpdated: '21.07.2024',
  },
  {
    id: 14,
    title: 'Ziyaretçi ve Yüklenici Giriş Prosedürü',
    description: 'Tesislerimize giren ziyaretçi ve alt yüklenici firmaların uyması gereken güvenlik ve davranış kuralları.',
    department: 'İdari İşler / Güvenlik',
    version: 'v2.5',
    lastUpdated: '03.03.2024',
  },
  {
    id: 15,
    title: 'BT Varlık Yönetimi Prosedürü',
    description: 'Şirkete ait bilgisayar, yazılım lisansı gibi BT varlıklarının envanterinin tutulması ve zimmetlenmesi.',
    department: 'BT',
    version: 'v2.0',
    lastUpdated: '28.06.2024',
  },
  {
    id: 16,
    title: 'Eğitim Talebi ve Planlama Süreci',
    description: 'Personelin eğitim taleplerinin nasıl yapılacağı ve yıllık eğitim takviminin nasıl oluşturulduğu.',
    department: 'İnsan Kaynakları',
    version: 'v1.4',
    lastUpdated: '19.04.2024',
  },
  {
    id: 17,
    title: 'Yeni Ürün Geliştirme (Ür-Ge) Prosedürü',
    description: 'Fikir aşamasından prototip üretimine ve seri üretime geçişe kadar olan ürün geliştirme adımları.',
    department: 'Tasarım / Üretim Planlama',
    version: 'v1.0',
    lastUpdated: '22.07.2024',
  },
  {
    id: 18,
    title: 'Fatura Kesme ve Muhasebeleştirme',
    description: 'Satış sonrası faturaların nasıl oluşturulacağı, müşteriye gönderimi ve muhasebe kayıtlarının nasıl yapılacağı.',
    department: 'Mali İşler',
    version: 'v1.6',
    lastUpdated: '14.07.2024',
  },
  {
    id: 19,
    title: 'İç Denetim Prosedürü',
    description: 'Departmanların ve süreçlerin belirlenen standartlara uygunluğunun nasıl denetleneceğine dair kılavuz.',
    department: 'Kalite ve Güvence',
    version: 'v2.8',
    lastUpdated: '01.08.2024',
  },
  {
    id: 20,
    title: 'Bilgi Güvenliği İhlal Olayı Yönetimi',
    description: 'Siber saldırı, veri sızıntısı gibi durumlarda yapılacak müdahale ve raporlama adımlarını içerir.',
    department: 'BT',
    version: 'v1.2',
    lastUpdated: '17.06.2024',
  },
];

const handbooks = [
  {
    id: 1,
    title: 'Çalışan El Kitabı',
    description: 'Şirket politikaları, çalışma kuralları, sosyal haklar ve genel davranış beklentilerini içeren temel rehber.',
    category: 'Genel',
    version: 'v3.0',
    lastUpdated: '01.08.2024',
  },
  {
    id: 2,
    title: 'İş Sağlığı ve Güvenliği El Kitabı',
    description: 'Tüm çalışanların uyması gereken İSG kuralları, risk analizleri ve acil durum prosedürleri.',
    category: 'İSG',
    version: 'v2.5',
    lastUpdated: '15.06.2024',
  },
  {
    id: 3,
    title: 'Kalite Yönetim Sistemi El Kitabı',
    description: 'ISO 9001 standardı kapsamında şirketimizin kalite politikası, hedefleri ve süreçlerini tanımlar.',
    category: 'Kalite',
    version: 'v1.8',
    lastUpdated: '20.07.2024',
  },
  {
    id: 4,
    title: 'Bilgi Güvenliği El Kitabı',
    description: 'Şirket verilerinin korunması, siber güvenlik politikaları ve kişisel verilerin işlenmesi (KVKK) hakkında bilgiler.',
    category: 'BT & Uyum',
    version: 'v1.2',
    lastUpdated: '10.05.2024',
  },
   {
    id: 5,
    title: 'Yönetici El Kitabı',
    description: 'Yöneticiler için liderlik, performans yönetimi, ekip motivasyonu ve idari süreçler hakkında özel rehber.',
    category: 'Yönetim',
    version: 'v1.0',
    lastUpdated: '30.07.2024',
  },
];

const DocumentsPageSkeleton = () => (
    <div className="space-y-8">
        <header>
            <div className="flex items-center gap-3">
                <Skeleton className="h-8 w-8 rounded-full" />
                <div>
                    <Skeleton className="h-8 w-64 mb-2" />
                    <Skeleton className="h-5 w-80" />
                </div>
            </div>
        </header>
        <Tabs defaultValue="training" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
                <Skeleton className="h-8 w-full" />
                <Skeleton className="h-8 w-full" />
                <Skeleton className="h-8 w-full" />
            </TabsList>
            <TabsContent value="training">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                    {Array.from({ length: 6 }).map((_, i) => (
                        <Card key={i}><CardHeader><Skeleton className="h-5 w-3/4" /></CardHeader><CardContent><Skeleton className="h-10 w-full" /></CardContent><CardFooter><Skeleton className="h-8 w-24" /></CardFooter></Card>
                    ))}
                </div>
            </TabsContent>
        </Tabs>
    </div>
);


export default function DocumentsPage() {
    const { toast } = useToast();
    const [completedTrainings, setCompletedTrainings] = useState<Set<number>>(new Set());

    const [isClient, setIsClient] = useState(false);
    useEffect(() => {
        setIsClient(true);
    }, []);

    const handleGenerateCertificate = (trainingId: number, trainingTitle: string) => {
        setCompletedTrainings(prev => new Set(prev).add(trainingId));
        toast({
            title: '🎉 Tebrikler!',
            description: `Sayın ${currentUser.name}, "${trainingTitle}" eğitimini başarıyla tamamladınız. Sertifikanız profilinize eklendi.`,
        });
    };
    

    if (!isClient) {
      return <DocumentsPageSkeleton />;
    }
    
  return (
    <div className="space-y-8">
      <header>
        <div className="flex items-center gap-3">
          <FileText className="h-8 w-8 text-primary" />
          <div>
            <h1 className="text-3xl font-bold text-primary">Doküman Merkezi</h1>
            <p className="text-muted-foreground mt-1">Eğitim materyallerine, prosedürlere ve el kitaplarına buradan ulaşın.</p>
          </div>
        </div>
      </header>
      
      <Tabs defaultValue="training" className="w-full">
        <TabsList className="grid w-full grid-cols-1 sm:grid-cols-3 h-auto">
          <div className="group relative flex items-center justify-center">
            <TabsTrigger value="training" className="w-full transition-transform duration-200 group-hover:scale-105 group-hover:text-primary">
              <BookOpen className="mr-2 h-4 w-4 text-blue-500" />
              Eğitim Dokümanları
            </TabsTrigger>
          </div>
          <div className="group relative flex items-center justify-center">
            <TabsTrigger value="sop" className="w-full transition-transform duration-200 group-hover:scale-105 group-hover:text-primary">
              <ClipboardCheck className="mr-2 h-4 w-4 text-green-500" />
              Standart Operasyon Prosedürleri (SOP)
            </TabsTrigger>
          </div>
          <div className="group relative flex items-center justify-center">
           <TabsTrigger value="handbooks" className="w-full transition-transform duration-200 group-hover:scale-105 group-hover:text-primary">
            <BookText className="mr-2 h-4 w-4 text-orange-500" />
            El Kitapları
          </TabsTrigger>
          </div>
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
        
        <TabsContent value="handbooks">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {handbooks.map((doc) => (
              <Card key={doc.id} className="flex flex-col">
                <CardHeader>
                  <CardTitle className="text-lg">{doc.title}</CardTitle>
                  <CardDescription>{doc.category} Departmanı</CardDescription>
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
