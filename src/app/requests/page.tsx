
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Briefcase, Car, FileText, HandCoins, Wrench } from "lucide-react"

export default function RequestsPage() {
  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-bold text-foreground">Talepler</h1>
        <p className="text-muted-foreground mt-1">Personel taleplerini oluşturun ve yönetin.</p>
      </header>

      <Tabs defaultValue="hr_document" className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-3 lg:grid-cols-5 h-auto">
          <TabsTrigger value="hr_document">
            <FileText className="mr-2" /> İK Evrak
          </TabsTrigger>
          <TabsTrigger value="expenses">
            <HandCoins className="mr-2" /> Masraf
          </TabsTrigger>
          <TabsTrigger value="vehicle">
            <Car className="mr-2" /> Araç
          </TabsTrigger>
          <TabsTrigger value="service">
            <Wrench className="mr-2" /> Hizmet
          </TabsTrigger>
          <TabsTrigger value="advance">
            <Briefcase className="mr-2" /> Avans
          </TabsTrigger>
        </TabsList>

        <TabsContent value="hr_document">
          <Card>
            <CardHeader>
              <CardTitle>İnsan Kaynakları Evrak Talebi</CardTitle>
              <CardDescription>Resmi kurumlar veya kişisel kullanım için gerekli olan belgeleri buradan talep edebilirsiniz.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="document-type">Belge Türü</Label>
                <Select>
                  <SelectTrigger id="document-type">
                    <SelectValue placeholder="Talep ettiğiniz belgeyi seçin..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="payroll">Maaş Bordrosu</SelectItem>
                    <SelectItem value="service-record">SGK Hizmet Dökümü</SelectItem>
                    <SelectItem value="employment-certificate">Çalışma Belgesi</SelectItem>
                    <SelectItem value="other">Diğer</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="hr-notes">Ek Notlar</Label>
                <Textarea id="hr-notes" placeholder="Belgenin neden gerekli olduğu veya özel bir format gibi ek bilgileri buraya yazabilirsiniz..." />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Talep Oluştur</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="expenses">
          <Card>
            <CardHeader>
              <CardTitle>Masraf Formu</CardTitle>
              <CardDescription>Şirket için yapılan masrafların geri ödemesi için bu formu doldurun.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="expense-type">Masraf Türü</Label>
                <Input id="expense-type" placeholder="örn. Yemek, Ulaşım, Konaklama" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="expense-amount">Tutar</Label>
                <Input id="expense-amount" type="number" placeholder="0.00 TL" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="expense-description">Açıklama</Label>
                <Textarea id="expense-description" placeholder="Masrafın detaylarını açıklayın..." />
              </div>
               <div className="space-y-2">
                <Label htmlFor="expense-file">Fatura/Fiş Eki</Label>
                <Input id="expense-file" type="file" />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Masraf Bildir</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="vehicle">
          <Card>
            <CardHeader>
              <CardTitle>Araç Talep Formu</CardTitle>
              <CardDescription>Şirket aracı kullanım taleplerinizi buradan oluşturabilirsiniz.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="destination">Gidilecek Yer</Label>
                <Input id="destination" placeholder="örn. Müşteri ziyareti, Fabrika" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="start-date">Gidiş Tarihi</Label>
                  <Input id="start-date" type="date" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="end-date">Dönüş Tarihi</Label>
                  <Input id="end-date" type="date" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="vehicle-notes">Açıklama</Label>
                <Textarea id="vehicle-notes" placeholder="Yolculuğun amacı ve diğer detayları belirtin..." />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Araç Talep Et</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="service">
          <Card>
            <CardHeader>
              <CardTitle>Hizmet Talep Formu</CardTitle>
              <CardDescription>Bakım, onarım, temizlik gibi hizmet taleplerinizi buradan iletin.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="service-type">Hizmet Alanı</Label>
                <Select>
                  <SelectTrigger id="service-type">
                    <SelectValue placeholder="İlgili hizmet alanını seçin..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="it">Bilgi İşlem</SelectItem>
                    <SelectItem value="maintenance">Teknik Bakım</SelectItem>
                    <SelectItem value="cleaning">Temizlik</SelectItem>
                    <SelectItem value="administrative">İdari İşler</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="service-description">Talebin Açıklaması</Label>
                <Textarea id="service-description" placeholder="Talep ettiğiniz hizmeti ve sorunu detaylı bir şekilde açıklayın..." />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Hizmet Talebi Gönder</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="advance">
          <Card>
            <CardHeader>
              <CardTitle>Avans Talep Formu</CardTitle>
              <CardDescription>Maaş avansı taleplerinizi bu form üzerinden iletebilirsiniz.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="advance-amount">Talep Edilen Tutar</Label>
                <Input id="advance-amount" type="number" placeholder="0.00 TL" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="advance-reason">Avans Sebebi</Label>
                <Textarea id="advance-reason" placeholder="Avans talebinizin nedenini kısaca açıklayınız..." />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Avans Talep Et</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
