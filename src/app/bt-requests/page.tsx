'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Server } from "lucide-react";

export default function BTRequestsPage() {
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
              <Select>
                <SelectTrigger id="request-type">
                  <SelectValue placeholder="Talebinizin türünü seçin..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="hardware">Donanım Talebi (Mouse, Klavye, Monitör vb.)</SelectItem>
                  <SelectItem value="software">Yazılım Talebi (Kurulum, Lisans vb.)</SelectItem>
                  <SelectItem value="access">Erişim Yetkisi Talebi</SelectItem>
                  <SelectItem value="support">Teknik Destek / Arıza Bildirimi</SelectItem>
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
                  <SelectItem value="critical">Kritik</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="subject">Konu</Label>
            <Input id="subject" placeholder="Talebinizin konusunu kısaca yazın (örn. Yeni monitör talebi)" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Açıklama</Label>
            <Textarea 
              id="description" 
              placeholder="Talebinizle ilgili tüm detayları buraya yazın. Bir sorun bildiriyorsanız, hatayı nasıl tekrar oluşturabileceğimizi adım adım anlatın." 
              rows={6}
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
