'use client';

import { useMemo, useState, useEffect } from 'react';
import { Shield, FileText, CalendarPlus, HandCoins, Car, Plane, Wrench, Briefcase, Loader2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useFirebase, useCollection } from '@/firebase';
import { doc, collection, query, where } from 'firebase/firestore';
import { useToast } from '@/hooks/use-toast';
import type { ApprovalRequest, RequestDetails } from '@/lib/actions';
import { updateDocumentNonBlocking } from '@/firebase/non-blocking-updates';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { allEmployees } from '@/lib/data';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Skeleton } from '@/components/ui/skeleton';
import { mockApprovalRequests } from '@/lib/mock-requests';

const requestTypeIcons = {
  'İK Evrak': <FileText className="h-4 w-4" />,
  'İzin': <CalendarPlus className="h-4 w-4" />,
  'Masraf': <HandCoins className="h-4 w-4" />,
  'Araç': <Car className="h-4 w-4" />,
  'Seyahat': <Plane className="h-4 w-4" />,
  'Hizmet': <Wrench className="h-4 w-4" />,
  'Avans': <Briefcase className="h-4 w-4" />,
  'default': <Briefcase className="h-4 w-4" />
};

const requestTypeColors: { [key: string]: string } = {
  'İK Evrak': 'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/50 dark:text-blue-300 dark:border-blue-700',
  'İzin': 'bg-orange-100 text-orange-800 border-orange-200 dark:bg-orange-900/50 dark:text-orange-300 dark:border-orange-700',
  'Masraf': 'bg-green-100 text-green-800 border-green-200 dark:bg-green-900/50 dark:text-green-300 dark:border-green-700',
  'Araç': 'bg-red-100 text-red-800 border-red-200 dark:bg-red-900/50 dark:text-red-300 dark:border-red-700',
  'Seyahat': 'bg-cyan-100 text-cyan-800 border-cyan-200 dark:bg-cyan-900/50 dark:text-cyan-300 dark:border-cyan-700',
  'Hizmet': 'bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/50 dark:text-yellow-300 dark:border-yellow-700',
  'Avans': 'bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-900/50 dark:text-purple-300 dark:border-purple-700',
  'default': 'bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-900/50 dark:text-gray-300 dark:border-gray-700',
};

const getEmployeeById = (id: string) => allEmployees.find(e => e.id === id);

const ClientFormattedDate = ({ dateString, options, placeholderWidth = "w-[90px]" }: { dateString: string | undefined | null, options?: Intl.DateTimeFormatOptions, placeholderWidth?: string }) => {
    const [formattedDate, setFormattedDate] = useState<string | null>(null);

    useEffect(() => {
        if (!dateString) {
            setFormattedDate('-');
            return;
        }
        setFormattedDate(new Date(dateString).toLocaleString('tr-TR', options));
    }, [dateString, options]);

    if (formattedDate === null) {
        return <Skeleton className={`h-4 ${placeholderWidth} inline-block`} />;
    }
    return <>{formattedDate}</>;
};

export default function ManagementPage() {
  const { firestore, user, isUserLoading } = useFirebase();
  const { toast } = useToast();

  const pendingRequestsQuery = useMemo(() => {
    if (!firestore) return null;
    return query(
      collection(firestore, 'approvalRequests'),
      where('status', '==', 'Beklemede')
      // Potentially add: where('approverId', '==', user.uid)
    );
  }, [firestore]);

  const { data: requests, isLoading } = useCollection<ApprovalRequest>(pendingRequestsQuery);

  const isMockData = !isLoading && (!requests || requests.length === 0);
  const displayData = isMockData ? mockApprovalRequests : requests;

  const handleRequestStatusUpdate = (requestId: string, newStatus: 'Onaylandı' | 'Reddedildi') => {
    if (!firestore) {
      toast({
        variant: "destructive",
        title: "Hata!",
        description: "Veritabanı bağlantısı kurulamadı."
      });
      return;
    }
    const requestRef = doc(firestore, "approvalRequests", requestId);
    updateDocumentNonBlocking(requestRef, {
      status: newStatus,
      approvalDate: new Date().toISOString(),
    });

    toast({
      title: "Başarılı!",
      description: `Talep başarıyla ${newStatus === 'Onaylandı' ? 'onaylandı' : 'reddedildi'}.`
    });
  };

  const renderDetail = (label: string, value: any) => {
    if (!value) return null;
    return (
      <div className="flex justify-between text-sm py-2 border-b border-border/50">
        <span className="text-muted-foreground">{label}:</span>
        <span className="font-medium text-right">{String(value)}</span>
      </div>
    );
  };
  
  const renderRequestDetails = (details: RequestDetails, requestType: string) => {
    const commonDetails = (
      <>
        {renderDetail('Talep Eden', details.employeeName)}
        {renderDetail('Açıklama / Gerekçe', details.description)}
      </>
    );

    switch (requestType) {
      case 'İK Evrak':
        return <>
          {renderDetail('Belge Türü', details.documentType)}
          {commonDetails}
        </>;
      case 'İzin':
        return <>
          {renderDetail('İzin Türü', details.leaveType)}
          {renderDetail('Başlangıç Tarihi', details.startDate ? <ClientFormattedDate dateString={details.startDate} options={{ year: 'numeric', month: '2-digit', day: '2-digit' }} /> : null)}
          {renderDetail('Bitiş Tarihi', details.endDate ? <ClientFormattedDate dateString={details.endDate} options={{ year: 'numeric', month: '2-digit', day: '2-digit' }} /> : null)}
          {details.leaveType === 'Fazla Mesai' && renderDetail('Başlangıç Saati', details.startTime)}
          {details.leaveType === 'Fazla Mesai' && renderDetail('Bitiş Saati', details.endTime)}
          {commonDetails}
        </>;
      case 'Masraf':
        return <>
          {renderDetail('Masraf Türü', details.expenseType)}
          {renderDetail('Tutar', details.amount ? `${details.amount} TL` : null)}
          {commonDetails}
        </>;
      case 'Seyahat':
        return <>
          {renderDetail('Seyahat Tipi', details.travelRequestType === 'accommodation' ? 'Konaklama' : 'Uçak Bileti')}
          {details.travelRequestType === 'accommodation' && renderDetail('Şehir', details.city)}
          {details.travelRequestType === 'accommodation' && renderDetail('Otel', details.hotel)}
          {details.travelRequestType === 'flight' && renderDetail('Kalkış', `${details.departureCity} - ${details.departureAirport}`)}
          {details.travelRequestType === 'flight' && renderDetail('Varış', `${details.arrivalCity} - ${details.arrivalAirport}`)}
          {renderDetail('Gidiş Tarihi', details.startDate ? <ClientFormattedDate dateString={details.startDate} options={{ year: 'numeric', month: '2-digit', day: '2-digit' }} /> : null)}
          {renderDetail('Dönüş Tarihi', details.endDate ? <ClientFormattedDate dateString={details.endDate} options={{ year: 'numeric', month: '2-digit', day: '2-digit' }} /> : null)}
          {renderDetail('İkinci Yolcu', details.secondPassenger)}
          {commonDetails}
        </>;
      case 'Araç':
        return <>
          {renderDetail('Araç Plakası', details.vehiclePlate)}
          {renderDetail('Gidilecek Yer', details.destination)}
          {renderDetail('Gidiş Tarihi', details.startDate ? <ClientFormattedDate dateString={details.startDate} options={{ year: 'numeric', month: '2-digit', day: '2-digit' }} /> : null)}
          {renderDetail('Dönüş Tarihi', details.endDate ? <ClientFormattedDate dateString={details.endDate} options={{ year: 'numeric', month: '2-digit', day: '2-digit' }} /> : null)}
          {commonDetails}
        </>;
      default:
        return commonDetails;
    }
  };

  if (isUserLoading && !user) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <header>
        <div className="flex items-center gap-3">
          <Shield className="h-8 w-8 text-primary" />
          <div>
            <h1 className="text-3xl font-bold text-primary">Onay Yönetimi</h1>
            <p className="text-muted-foreground mt-1">
              {isLoading ? 'Bekleyen talepler yükleniyor...' : `Onayınızı bekleyen ${displayData?.length || 0} talep bulunuyor.`}
            </p>
          </div>
        </div>
      </header>

      <Card>
        <CardHeader>
          <CardTitle>Onay Bekleyen Talepler</CardTitle>
          <CardDescription>
            Aşağıdaki talepleri onaylayabilir veya reddedebilirsiniz. Detayları görmek için talep türü üzerine tıklayın.
            {isMockData && (
              <p className="mt-2 text-sm text-amber-600 dark:text-amber-400 p-3 bg-amber-500/10 border border-amber-500/20 rounded-md">
                <strong>Not:</strong> Henüz veritabanında gerçek bir talep bulunamadı. Bu nedenle aşağıda **örnek veriler** gösterilmektedir. 
                <code className="mx-1 p-1 bg-muted rounded-sm text-xs">/requests</code> sayfasından yeni bir talep oluşturduğunuzda, gerçek talepler burada listelenecektir.
              </p>
            )}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[250px]">Çalışan</TableHead>
                  <TableHead>Talep Türü</TableHead>
                  <TableHead>Tarih</TableHead>
                  <TableHead className="text-right">İşlemler</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  Array.from({ length: 3 }).map((_, i) => (
                    <TableRow key={i}>
                      <TableCell><Skeleton className="h-10 w-full" /></TableCell>
                      <TableCell><Skeleton className="h-10 w-full" /></TableCell>
                      <TableCell><Skeleton className="h-10 w-full" /></TableCell>
                      <TableCell><Skeleton className="h-10 w-full" /></TableCell>
                    </TableRow>
                  ))
                ) : displayData && displayData.length > 0 ? (
                  displayData.map((request) => {
                    const employee = getEmployeeById(request.employeeId);
                    return (
                      <Dialog key={request.id}>
                        <TableRow>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <Avatar>
                                <AvatarFallback>{employee?.name ? employee.name.split(' ').map((n: string) => n[0]).join('') : '?'}</AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-medium">{employee?.name || 'Bilinmeyen Çalışan'}</p>
                                <p className="text-xs text-muted-foreground">{employee?.title}</p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <DialogTrigger asChild>
                              <Button variant="outline" size="sm" className={`flex w-fit items-center gap-2 cursor-pointer transition-opacity hover:opacity-80 ${requestTypeColors[request.requestType] || requestTypeColors.default}`}>
                                {requestTypeIcons[request.requestType as keyof typeof requestTypeIcons] || requestTypeIcons.default}
                                {request.requestType}
                              </Button>
                            </DialogTrigger>
                          </TableCell>
                          <TableCell>
                             <ClientFormattedDate dateString={request.requestDate} options={{ year: 'numeric', month: '2-digit', day: '2-digit' }} />
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex flex-wrap items-center justify-end gap-2">
                              <Button variant="outline" size="sm" onClick={() => handleRequestStatusUpdate(request.id, 'Onaylandı')} disabled={isMockData}>
                                Onayla
                              </Button>
                              <Button variant="destructive" size="sm" onClick={() => handleRequestStatusUpdate(request.id, 'Reddedildi')} disabled={isMockData}>
                                Reddet
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                        <DialogContent className="sm:max-w-md">
                          <DialogHeader>
                            <DialogTitle className="flex items-center gap-3">
                                <div className={`p-2 rounded-full ${requestTypeColors[request.requestType] || requestTypeColors.default}`}>
                                  {requestTypeIcons[request.requestType as keyof typeof requestTypeIcons] || requestTypeIcons.default}
                                </div>
                                {request.requestType} Talep Detayları
                            </DialogTitle>
                            <DialogDescription>
                              <ClientFormattedDate dateString={request.requestDate} options={{ dateStyle: 'long', timeStyle: 'short' }} placeholderWidth="w-[200px]" /> tarihinde oluşturuldu.
                            </DialogDescription>
                          </DialogHeader>
                          <div className="space-y-1 pt-4">
                            {renderRequestDetails(request.details, request.requestType)}
                          </div>
                        </DialogContent>
                      </Dialog>
                    );
                  })
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} className="h-48 text-center">
                      <div className="flex flex-col items-center justify-center gap-3">
                         <Shield className="h-12 w-12 text-muted-foreground/50" />
                         <p className="text-muted-foreground">Onay bekleyen talep bulunmamaktadır.</p>
                         <p className="text-xs text-muted-foreground">Tüm talepler işlenmiş gibi görünüyor. Harika iş!</p>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
