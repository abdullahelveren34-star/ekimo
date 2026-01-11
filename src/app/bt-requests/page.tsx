'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Server } from "lucide-react";
import { useState } from "react";

const requestExamples: Record<string, { subject: string, description: string }> = {
  'new-user': {
    subject: "Yeni Personel İçin Kullanıcı ve E-posta Hesabı",
    description: "Yeni işe başlayan [Personel Adı], [Departman Adı] departmanı, [Unvanı] için e-posta ve [Yazılım Adı] sistemine kullanıcı hesabı oluşturulmasını rica ederim."
  },
  'password-reset': {
    subject: "Şifre Sıfırlama Talebi",
    description: "[Yazılım/Sistem Adı] hesabımın şifresini unuttum. Şifre sıfırlama bağlantısı gönderilmesini rica ederim. Kullanıcı adım: [Kullanıcı Adınız]"
  },
  'file-access': {
    subject: "Dosya/Klasör Erişim Yetkisi Talebi",
    description: "Aşağıdaki ağ sürücüsünde bulunan klasöre erişim yetkisi talep ediyorum:\n\nKlasör Yolu: [\\\\SunucuAdi\\Paylasim\\KlasorAdi]\n\nGerekçe: [Proje Adı] projesi kapsamında bu dosyalara erişmem gerekiyor."
  },
  'email-group': {
    subject: "E-posta Grubu Yönetimi Talebi (Ekleme/Çıkarma)",
    description: "Lütfen [Personel Adı] adlı kullanıcıyı '[Grup Adı]@e-kimo.com' e-posta grubuna ekleyin/çıkarın.\n\nGerekçe: [Proje ekibine dahil oldu / Departman değişikliği vb.]"
  },
  'hardware-purchase': {
    subject: "Yeni Donanım Satın Alma Talebi",
    description: "Departmanımız için [adet] adet [donanım türü, örn: 27 inç monitör] satın alınmasını talep ediyorum.\n\nGerekçe: [Neden ihtiyaç duyulduğunu açıklayın, örn: Yeni başlayan personel için...]"
  },
  'hardware-repair': {
    subject: "Donanım Arıza Bildirimi",
    description: "Kullanmakta olduğum [Donanım, örn: HP Marka Yazıcı]'da aşağıdaki sorun mevcut:\n\nSorun: [Sorunu detaylıca açıklayın, örn: Kağıt sıkıştırıyor ve baskı almıyor.]\nDemirbaş No: [Varsa]"
  },
  'software-install': {
    subject: "Yazılım Kurulum/Lisans Talebi",
    description: "Bilgisayarıma [Yazılım Adı ve Versiyonu] yazılımının kurulmasını ve lisanslanmasını talep ediyorum.\n\nGerekçe: [Bu yazılıma neden ihtiyaç duyduğunuzu belirtin.]"
  },
  'technical-support': {
    subject: "Teknik Destek Talebi",
    description: "Yaşadığım sorun: [Sorunu mümkün olduğunca detaylı açıklayın, örn: E-postalarımı gönderemiyorum, 'sunucu hatası' alıyorum.]\n\nBu sorunu yeniden oluşturmak için adımlar:\n1. [Adım 1]\n2. [Adım 2]\n\nAldığım hata mesajı (varsa): [Hata mesajını buraya kopyalayın]"
  },
   'other': {
    subject: "",
    description: ""
  },
};


export default function BTRequestsPage() {
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');

  const handleRequestTypeChange = (value: string) => {
    if(requestExamples[value]) {
      setSubject(requestExamples[value].subject);
      setDescription(requestExamples[value].description);
    } else {
      setSubject('');
      setDescription('');
    }
  };

  return (
    <div className="space-y-8">
      <header>
        <div className="flex items-center gap-3">
          <Server className="h-8 w-8 text-primary" />
          <div>
            <h1 className="text-3xl font-bold text-foreground">BT Talepleri</h1>
            <p className="text-muted-foreground mt-1">Bilgi Teknolojileri departmanına yönelik taleplerinizi buradan oluşturun.</p>
          </div>
        </div>
      </header>
      
      <Card>
        <CardHeader>
          <CardTitle>Yeni BT Talep Formu</CardTitle>
          <CardDescription>Lütfen talebinizi aşağıdaki formu doldurarak detaylı bir şekilde iletin.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="request-type">Talep Türü</Label>
              <Select onValueChange={handleRequestTypeChange}>
                <SelectTrigger id="request-type">
                  <SelectValue placeholder="Talebinizin türünü seçin..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="new-user">Yeni Kullanıcı ve E-posta Hesabı</SelectItem>
                  <SelectItem value="password-reset">Şifre Sıfırlama Talebi</SelectItem>
                  <SelectItem value="file-access">Dosya/Klasör Erişim Yetkisi</SelectItem>
                  <SelectItem value="email-group">E-posta Grup Yönetimi (Ekleme/Çıkarma)</SelectItem>
                  <SelectItem value="hardware-purchase">Donanım Talebi (Satın Alma)</SelectItem>
                  <SelectItem value="hardware-repair">Donanım Talebi (Arıza/Yenileme)</SelectItem>
                  <SelectItem value="software-install">Yazılım Talebi (Kurulum/Lisans)</SelectItem>
                  <SelectItem value="technical-support">Teknik Destek / Genel Arıza Bildirimi</SelectItem>
                  <SelectItem value="other">Diğer</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="urgency">Aciliyet Seviyesi</Label>
              <Select>
                <SelectTrigger id="urgency">
                  <SelectValue placeholder="Talebinizin aciliyetini belirtin..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Düşük</SelectItem>
                  <SelectItem value="normal">Normal</SelectItem>
                  <SelectItem value="high">Yüksek</SelectItem>
                  <SelectItem value="critical">Kritik (İş Durdurucu)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="subject">Konu</Label>
            <Input 
              id="subject" 
              placeholder="Talebinizin konusunu kısaca yazın (örn. Yeni monitör talebi)" 
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Açıklama</Label>
            <Textarea 
              id="description" 
              placeholder="Talebinizle ilgili tüm detayları buraya yazın. Bir sorun bildiriyorsanız, hatayı nasıl tekrar oluşturabileceğimizi adım adım anlatın." 
              rows={6}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="attachment">Ek Dosya (isteğe bağlı)</Label>
            <Input id="attachment" type="file" />
            <p className="text-xs text-muted-foreground">Sorunu gösteren bir ekran görüntüsü veya ilgili bir belge ekleyebilirsiniz.</p>
          </div>
        </CardContent>
        <CardFooter>
          <Button>Talep Gönder</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
