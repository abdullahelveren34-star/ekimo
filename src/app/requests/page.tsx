'use client';

import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Briefcase, Car, FileText, HandCoins, Plane, Wrench, BedDouble, PlaneTakeoff, CalendarPlus, Server } from "lucide-react"
import { currentUser, approverUser } from "@/lib/data"
import { useFirebase } from "@/firebase"
import { createApprovalRequest } from "@/lib/actions"
import { useToast } from "@/hooks/use-toast"

const btRequestExamples: Record<string, { subject: string, description: string }> = {
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
    description: "Lütfen [Personel Adı] adlı kullanıcıyı '[Grup Adı]@kimotekstil.com' e-posta grubuna ekleyin/çıkarın.\n\nGerekçe: [Proje ekibine dahil oldu / Departman değişikliği vb.]"
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


export default function RequestsPage() {
  const { firestore } = useFirebase();
  const { toast } = useToast();

  // Common state - Using IDs from data.ts
  const [employeeId] = useState(currentUser.id); 
  const [approverId] = useState(approverUser.id);

  // HR Document State
  const [documentType, setDocumentType] = useState('');
  const [hrNotes, setHrNotes] = useState('');

  // Leave Request State
  const [leaveType, setLeaveType] = useState('');
  const [leaveStartDate, setLeaveStartDate] = useState('');
  const [leaveEndDate, setLeaveEndDate] = useState('');
  const [leaveStartTime, setLeaveStartTime] = useState('');
  const [leaveEndTime, setLeaveEndTime] = useState('');
  const [leaveDescription, setLeaveDescription] = useState('');

  // Expense State
  const [expenseType, setExpenseType] = useState('');
  const [expenseAmount, setExpenseAmount] = useState('');
  const [expenseDescription, setExpenseDescription] = useState('');

  // Vehicle State
  const [requesterName, setRequesterName] = useState('');
  const [vehiclePlate, setVehiclePlate] = useState('');
  const [vehicleKm, setVehicleKm] = useState('');
  const [destination, setDestination] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [vehicleNotes, setVehicleNotes] = useState('');


  // Travel State - SIMPLIFIED
  const [travelRequestType, setTravelRequestType] = useState('accommodation');
  const [accommodationCity, setAccommodationCity] = useState('');
  const [accommodationHotel, setAccommodationHotel] = useState('');
  const [flightDeparture, setFlightDeparture] = useState('');
  const [flightArrival, setFlightArrival] = useState('');
  const [travelStartDate, setTravelStartDate] = useState('');
  const [travelEndDate, setTravelEndDate] = useState('');
  const [secondPassenger, setSecondPassenger] = useState('');
  const [travelNotes, setTravelNotes] = useState('');

  // BT Request State
  const [btSubject, setBtSubject] = useState('');
  const [btDescription, setBtDescription] = useState('');

  const handleBtRequestTypeChange = (value: string) => {
    if(btRequestExamples[value]) {
      setBtSubject(btRequestExamples[value].subject);
      setBtDescription(btRequestExamples[value].description);
    } else {
      setBtSubject('');
      setBtDescription('');
    }
  };

  const resetForms = () => {
    setDocumentType('');
    setHrNotes('');
    setLeaveType('');
    setLeaveStartDate('');
    setLeaveEndDate('');
    setLeaveStartTime('');
    setLeaveEndTime('');
    setLeaveDescription('');
    setExpenseType('');
    setExpenseAmount('');
    setExpenseDescription('');
    setRequesterName('');
    setVehiclePlate('');
    setVehicleKm('');
    setDestination('');
    setStartDate('');
    setEndDate('');
    setVehicleNotes('');
    setTravelRequestType('accommodation');
    setAccommodationCity('');
    setAccommodationHotel('');
    setFlightDeparture('');
    setFlightArrival('');
    setTravelStartDate('');
    setTravelEndDate('');
    setSecondPassenger('');
    setTravelNotes('');
  };

  const handleSubmit = (requestType: string, details: any) => {
    if (!firestore) {
      toast({ variant: "destructive", title: "Hata!", description: "Veritabanı bağlantısı henüz hazır değil. Lütfen bir kaç saniye bekleyip tekrar deneyin." });
      return;
    }
    
    // Add employee name to details for easier display in management panel
    details.employeeName = currentUser.name;

    createApprovalRequest(firestore, {
      employeeId,
      approverId,
      requestType,
      details
    }).then(() => {
        resetForms();
        toast({
            title: "Talep Gönderildi!",
            description: "Talebiniz başarıyla yönetici onayına gönderilmiştir.",
        });
    }).catch(error => {
        console.error("Talep oluşturulurken hata:", error);
        toast({ variant: "destructive", title: "Hata!", description: error.message || "Talep oluşturulurken bir sorun oluştu." });
    });
  };


  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-bold text-primary">Talepler</h1>
        <p className="text-muted-foreground mt-1">Personel taleplerini oluşturun ve yönetin.</p>
      </header>

      <Tabs defaultValue="hr_document" className="w-full">
        <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-8 h-auto">
          <TabsTrigger value="hr_document">
            <FileText className="mr-2 text-blue-500" /> İK Evrak
          </TabsTrigger>
           <TabsTrigger value="leave">
            <CalendarPlus className="mr-2 text-orange-500" /> İzin Talebi
          </TabsTrigger>
          <TabsTrigger value="expenses">
            <HandCoins className="mr-2 text-green-500" /> Masraf
          </TabsTrigger>
          <TabsTrigger value="vehicle">
            <Car className="mr-2 text-red-500" /> Araç
          </TabsTrigger>
          <TabsTrigger value="service">
            <Wrench className="mr-2 text-yellow-500" /> Hizmet
          </TabsTrigger>
          <TabsTrigger value="advance">
            <Briefcase className="mr-2 text-purple-500" /> Avans
          </TabsTrigger>
          <TabsTrigger value="travel">
            <Plane className="mr-2 text-cyan-500" /> Seyahat
          </TabsTrigger>
          <TabsTrigger value="bt_request">
            <Server className="mr-2 text-slate-500" /> BT Talepleri
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
                <Select value={documentType} onValueChange={setDocumentType}>
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
                <Textarea id="hr-notes" placeholder="Belgenin neden gerekli olduğu veya özel bir format gibi ek bilgileri buraya yazabilirsiniz..." value={hrNotes} onChange={(e) => setHrNotes(e.target.value)} />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={() => handleSubmit('İK Evrak', { documentType, description: hrNotes })} disabled={!firestore}>Talep Oluştur</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="leave">
          <Card>
            <CardHeader>
              <CardTitle>İzin Talep Formu</CardTitle>
              <CardDescription>Lütfen izin talebinizin detaylarını eksiksiz olarak doldurun.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="leave-type">İzin Türü</Label>
                <Select value={leaveType} onValueChange={setLeaveType}>
                  <SelectTrigger id="leave-type">
                    <SelectValue placeholder="İzin türünü seçiniz..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="annual">Yıllık İzin</SelectItem>
                    <SelectItem value="excuse">Mazeret İzni (Evlilik, Doğum, Ölüm vb.)</SelectItem>
                    <SelectItem value="birthday">Doğum Günü İzni</SelectItem>
                    <SelectItem value="sick">Raporlu İzin</SelectItem>
                    <SelectItem value="unpaid">Ücretsiz İzin</SelectItem>
                    <SelectItem value="overtime">Fazla Mesai</SelectItem>
                    <SelectItem value="other">Diğer</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <div className="space-y-2">
                  <Label htmlFor="leave-start-date">Başlangıç Tarihi</Label>
                  <Input id="leave-start-date" type="date" value={leaveStartDate} onChange={(e) => setLeaveStartDate(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="leave-end-date">Bitiş Tarihi</Label>
                  <Input id="leave-end-date" type="date" value={leaveEndDate} onChange={(e) => setLeaveEndDate(e.target.value)} />
                </div>
              </div>
              {leaveType === 'overtime' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="leave-start-time">Başlangıç Saati</Label>
                        <Input id="leave-start-time" type="time" value={leaveStartTime} onChange={(e) => setLeaveStartTime(e.target.value)} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="leave-end-time">Bitiş Saati</Label>
                        <Input id="leave-end-time" type="time" value={leaveEndTime} onChange={(e) => setLeaveEndTime(e.target.value)} />
                    </div>
                </div>
              )}
               <div className="space-y-2">
                <Label htmlFor="leave-description">Açıklama</Label>
                <Textarea id="leave-description" placeholder="İzin talebinizin nedenini kısaca açıklayınız..." value={leaveDescription} onChange={(e) => setLeaveDescription(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="leave-attachment">Belge Eki (varsa)</Label>
                <Input id="leave-attachment" type="file" />
                 <p className="text-xs text-muted-foreground">Mazeret veya raporlu izinler için ilgili belgeyi ekleyebilirsiniz.</p>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={() => handleSubmit('İzin', { 
                leaveType, 
                startDate: leaveStartDate, 
                endDate: leaveEndDate, 
                startTime: leaveStartTime,
                endTime: leaveEndTime,
                description: leaveDescription 
              })} disabled={!firestore}>İzin Talebi Gönder</Button>
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="expense-type">Masraf Türü</Label>
                    <Select value={expenseType} onValueChange={setExpenseType}>
                      <SelectTrigger id="expense-type">
                        <SelectValue placeholder="Masraf türünü seçin..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Yemek">Yemek</SelectItem>
                        <SelectItem value="Ulaşım">Ulaşım (Taksi, Toplu Taşıma vb.)</SelectItem>
                        <SelectItem value="Konaklama">Konaklama</SelectItem>
                        <SelectItem value="Ofis Malzemesi">Ofis Malzemesi</SelectItem>
                        <SelectItem value="Diğer">Diğer</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="expense-amount">Tutar</Label>
                    <Input id="expense-amount" type="number" placeholder="0.00" value={expenseAmount} onChange={(e) => setExpenseAmount(e.target.value)} />
                  </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="expense-description">Açıklama</Label>
                <Textarea id="expense-description" placeholder="Masrafın detaylarını açıklayın..." value={expenseDescription} onChange={(e) => setExpenseDescription(e.target.value)} />
              </div>
               <div className="space-y-2">
                <Label htmlFor="expense-file">Fatura/Fiş Eki</Label>
                <Input id="expense-file" type="file" />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={() => handleSubmit('Masraf', { 
                  expenseType, 
                  amount: expenseAmount,
                  description: expenseDescription 
              })} disabled={!firestore}>Masraf Bildir</Button>
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
                <Label htmlFor="requester-name">Ad Soyad</Label>
                <Input id="requester-name" placeholder="Aracı talep eden kişinin adı ve soyadı..." value={requesterName} onChange={e => setRequesterName(e.target.value)}/>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="vehicle-plate">Araç Plakası</Label>
                  <Input id="vehicle-plate" placeholder="örn. 34 ABC 123" value={vehiclePlate} onChange={e => setVehiclePlate(e.target.value)}/>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="vehicle-km">Mevcut Km</Label>
                  <Input id="vehicle-km" type="number" placeholder="örn. 125000" value={vehicleKm} onChange={e => setVehicleKm(e.target.value)}/>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="destination">Gidilecek Yer</Label>
                <Input id="destination" placeholder="örn. Müşteri ziyareti, Fabrika" value={destination} onChange={e => setDestination(e.target.value)}/>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="start-date">Gidiş Tarihi</Label>
                  <Input id="start-date" type="date" value={startDate} onChange={e => setStartDate(e.target.value)}/>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="end-date">Dönüş Tarihi</Label>
                  <Input id="end-date" type="date" value={endDate} onChange={e => setEndDate(e.target.value)}/>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="vehicle-notes">Açıklama</Label>
                <Textarea id="vehicle-notes" placeholder="Yolculuğun amacı ve diğer detayları belirtin..." value={vehicleNotes} onChange={e => setVehicleNotes(e.target.value)}/>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={() => handleSubmit('Araç', { 
                requesterName, vehiclePlate, vehicleKm, destination, startDate, endDate, description: vehicleNotes
              })} disabled={!firestore}>Araç Talep Et</Button>
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
              <Button disabled={!firestore}>Hizmet Talebi Gönder</Button>
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
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="advance-amount">Talep Edilen Tutar</Label>
                    <Input id="advance-amount" type="number" placeholder="0.00 TL" />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="advance-installments">Taksit Sayısı</Label>
                    <Select>
                        <SelectTrigger id="advance-installments">
                            <SelectValue placeholder="Taksit sayısı seçin..." />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="2">2 Taksit</SelectItem>
                            <SelectItem value="3">3 Taksit</SelectItem>
                            <SelectItem value="6">6 Taksit</SelectItem>
                            <SelectItem value="9">9 Taksit</SelectItem>
                            <SelectItem value="12">12 Taksit</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="advance-reason">Avans Sebebi</Label>
                <Textarea id="advance-reason" placeholder="Avans talebinizin nedenini kısaca açıklayınız..." />
              </div>
            </CardContent>
            <CardFooter>
              <Button disabled={!firestore}>Avans Talep Et</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="travel">
          <Card>
            <CardHeader>
              <CardTitle>Seyahat Talep Formu</CardTitle>
              <CardDescription>Konaklama ve uçak bileti gibi seyahat ihtiyaçlarınız için talep oluşturun.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Talep Türü</Label>
                <RadioGroup defaultValue={travelRequestType} onValueChange={setTravelRequestType} className="flex items-center gap-6">
                  <Label htmlFor="accommodation" className="flex items-center gap-2 cursor-pointer">
                    <RadioGroupItem value="accommodation" id="accommodation" />
                    <BedDouble className="h-4 w-4" />
                    Konaklama
                  </Label>
                  <Label htmlFor="flight" className="flex items-center gap-2 cursor-pointer">
                    <RadioGroupItem value="flight" id="flight" />
                    <PlaneTakeoff className="h-4 w-4" />
                    Uçak Bileti
                  </Label>
                </RadioGroup>
              </div>

              {travelRequestType === 'accommodation' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="travel-city">Şehir</Label>
                    <Input id="travel-city" placeholder="Örn. Ankara" value={accommodationCity} onChange={(e) => setAccommodationCity(e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="travel-hotel">Otel Adı</Label>
                    <Input id="travel-hotel" placeholder="Örn. HiltonSA" value={accommodationHotel} onChange={(e) => setAccommodationHotel(e.target.value)} />
                  </div>
                </div>
              )}

              {travelRequestType === 'flight' && (
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="flight-departure">Kalkış (Şehir / Havalimanı)</Label>
                        <Input id="flight-departure" placeholder="Örn. İstanbul / Sabiha Gökçen (SAW)" value={flightDeparture} onChange={(e) => setFlightDeparture(e.target.value)} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="flight-arrival">Varış (Şehir / Havalimanı)</Label>
                        <Input id="flight-arrival" placeholder="Örn. İzmir / Adnan Menderes (ADB)" value={flightArrival} onChange={(e) => setFlightArrival(e.target.value)} />
                    </div>
                </div>
              )}


              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="travel-start-date">Gidiş Tarihi</Label>
                  <Input id="travel-start-date" type="date" value={travelStartDate} onChange={e => setTravelStartDate(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="travel-end-date">Dönüş Tarihi</Label>
                  <Input id="travel-end-date" type="date" value={travelEndDate} onChange={e => setTravelEndDate(e.target.value)} />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="second-passenger">İkinci Yolcu Adı (varsa)</Label>
                <Input id="second-passenger" placeholder="örn. Ali Veli" value={secondPassenger} onChange={e => setSecondPassenger(e.target.value)} />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="travel-notes">Ek Notlar ve Açıklamalar</Label>
                <Textarea id="travel-notes" placeholder="Uçuş tercihleri, konaklama detayları veya seyahat amacı gibi bilgileri ekleyebilirsiniz..." value={travelNotes} onChange={e => setTravelNotes(e.target.value)} />
              </div>

            </CardContent>
            <CardFooter>
              <Button onClick={() => handleSubmit('Seyahat', {
                travelRequestType,
                city: accommodationCity,
                hotel: accommodationHotel,
                departureCity: flightDeparture,
                arrivalCity: flightArrival,
                startDate: travelStartDate,
                endDate: travelEndDate,
                secondPassenger,
                description: travelNotes,
              })} disabled={!firestore}>Seyahat Talebi Oluştur</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="bt_request">
            <Card>
            <CardHeader>
                <CardTitle>Bilgi Teknolojileri Talep Formu</CardTitle>
                <CardDescription>BT departmanına yönelik taleplerinizi aşağıdaki formu doldurarak iletin.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <Label htmlFor="bt-request-type">Talep Türü</Label>
                    <Select onValueChange={handleBtRequestTypeChange}>
                    <SelectTrigger id="bt-request-type">
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
                    <Label htmlFor="bt-urgency">Aciliyet Seviyesi</Label>
                    <Select>
                    <SelectTrigger id="bt-urgency">
                        <SelectValue placeholder="Talebinizin aciliyetini belirtin..." />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="low">Düşük</SelectItem>
                        <SelectItem value="normal">Normal</SelectItem>
                        <SelectItem value="high">Yüksek</SelectItem>
                        <SelectItem value="critical">İş Durdurucu</SelectItem>
                    </SelectContent>
                    </Select>
                </div>
                </div>
                
                <div className="space-y-2">
                <Label htmlFor="bt-subject">Konu</Label>
                <Input 
                    id="bt-subject" 
                    placeholder="Talebinizin konusunu kısaca yazın (örn. Yeni monitör talebi)" 
                    value={btSubject}
                    onChange={(e) => setBtSubject(e.target.value)}
                />
                </div>

                <div className="space-y-2">
                <Label htmlFor="bt-description">Açıklama</Label>
                <Textarea 
                    id="bt-description" 
                    placeholder="Talebinizle ilgili tüm detayları buraya yazın. Bir sorun bildiriyorsanız, hatayı nasıl tekrar oluşturabileceğimizi adım adım anlatın." 
                    rows={6}
                    value={btDescription}
                    onChange={(e) => setBtDescription(e.target.value)}
                />
                </div>

                <div className="space-y-2">
                <Label htmlFor="bt-attachment">Ek Dosya (isteğe bağlı)</Label>
                <Input id="bt-attachment" type="file" />
                <p className="text-xs text-muted-foreground">Sorunu gösteren bir ekran görüntüsü veya ilgili bir belge ekleyebilirsiniz.</p>
                </div>
            </CardContent>
            <CardFooter>
                <Button>Talep Gönder</Button>
            </CardFooter>
            </Card>
        </TabsContent>

      </Tabs>
    </div>
  );
}
    
