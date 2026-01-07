'use client';

import { useEffect, useMemo, useState } from 'react';
import { Shield, FileText, CalendarPlus, HandCoins, Car, Plane, Wrench, Briefcase, Loader2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useFirebase } from '@/firebase';
import { doc } from 'firebase/firestore';
import { toast } from '@/hooks/use-toast';
import type { ApprovalRequest, RequestDetails } from '@/lib/actions';
import { updateDocumentNonBlocking } from '@/firebase/non-blocking-updates';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { allEmployees } from '@/lib/data';
import { mockApprovalRequests } from '@/lib/mock-requests';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Skeleton } from '@/components/ui/skeleton';

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

export default function ManagementPage() {
  const { firestore, user } = useFirebase();
  const [requests, setRequests] = useState<ApprovalRequest[]>(mockApprovalRequests);
  const isLoading = false; // Mock loading state

  const handleRequestStatusUpdate = (requestId: string, newStatus: 'Onaylandı' | 'Reddedildi') => {
    // For live data, this would interact with Firestore
    if (firestore) {
      const requestRef = doc(firestore, "approvalRequests", requestId);
      updateDocumentNonBlocking(requestRef, {
        status: newStatus,
        approvalDate: new Date().toISOString(),
      });
    }

    // For mock data, we just filter it out from the local state
    setRequests(prevRequests => prevRequests.filter(req => req.id !== requestId));

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
        {renderDetail('Çalışan', details.employeeName)}
        {renderDetail('Açıklama', details.description)}
      </>
    );

    switch (requestType) {
      case 'İK Evrak':
        return <>
          {commonDetails}
          {renderDetail('Belge Türü', details.documentType)}
        </>;
      case 'İzin':
        return <>
          {commonDetails}
          {renderDetail('İzin Türü', details.leaveType)}
          {renderDetail('Başlangıç Tarihi', details.startDate ? new Date(details.startDate).toLocaleDateString('tr-TR') : null)}
          {renderDetail('Bitiş Tarihi', details.endDate ? new Date(details.endDate).toLocaleDateString('tr-TR') : null)}
        </>;
      case 'Masraf':
        return <>
          {commonDetails}
          {renderDetail('Masraf Türü', details.expenseType)}
          {renderDetail('Tutar', details.amount ? `${details.amount} TL` : null)}
        </>;
      case 'Seyahat':
        return <>
          {commonDetails}
          {renderDetail('Seyahat Tipi', details.travelRequestType === 'accommodation' ? 'Konaklama' : 'Uçak Bileti')}
          {details.travelRequestType === 'accommodation' && renderDetail('Şehir', details.city)}
          {details.travelRequestType === 'accommodation' && renderDetail('Otel', details.hotel)}
          {details.travelRequestType === 'flight' && renderDetail('Kalkış', `${details.departureCity} - ${details.departureAirport}`)}
          {details.travelRequestType === 'flight' && renderDetail('Varış', `${details.arrivalCity} - ${details.arrivalAirport}`)}
          {renderDetail('Gidiş Tarihi', details.startDate ? new Date(details.startDate).toLocaleDateString('tr-TR') : null)}
          {renderDetail('Dönüş Tarihi', details.endDate ? new Date(details.endDate).toLocaleDateString('tr-TR') : null)}
          {renderDetail('İkinci Yolcu', details.secondPassenger)}
        </>;
      case 'Araç':
        return <>
          {commonDetails}
          {renderDetail('Talep Eden', details.requesterName)}
          {renderDetail('Araç Plakası', details.vehiclePlate)}
          {renderDetail('Gidilecek Yer', details.destination)}
          {renderDetail('Gidiş Tarihi', details.startDate ? new Date(details.startDate).toLocaleDateString('tr-TR') : null)}
          {renderDetail('Dönüş Tarihi', details.endDate ? new Date(details.endDate).toLocaleDateString('tr-TR') : null)}
        </>;
      default:
        return commonDetails;
    }
  };

  return (
    <div className="space-y-8">
      <header>
        <div className="flex items-center gap-3">
          <Shield className="h-8 w-8 text-primary" />
          <div>
            <h1 className="text-3xl font-bold text-foreground">Yönetim Onay Paneli</h1>
            <p className="text-muted-foreground mt-1">
              {isLoading ? 'Bekleyen talepler yükleniyor...' : `Onayınızı bekleyen ${requests?.length || 0} talep bulunuyor.`}
            </p>
          </div>
        </div>
      </header>

      <Card>
        <CardHeader>
          <CardTitle>Onay Bekleyen Talepler</CardTitle>
          <CardDescription>
            Aşağıdaki talepleri onaylayabilir veya reddedebilirsiniz. Detayları görmek için talep türü üzerine tıklayın.
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
                ) : requests && requests.length > 0 ? (
                  requests.map((request) => {
                    const employee = getEmployeeById(request.employeeId);
                    return (
                      <Dialog key={request.id}>
                        <TableRow>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <Avatar>
                                <AvatarImage src={employee?.avatarUrl} alt={employee?.name} />
                                <AvatarFallback>{employee?.name ? employee.name.split(' ').map(n => n[0]).join('') : '?'}</AvatarFallback>
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
                            {new Date(request.requestDate).toLocaleDateString('tr-TR')}
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex items-center justify-end gap-2">
                              <Button variant="outline" size="sm" onClick={() => handleRequestStatusUpdate(request.id, 'Onaylandı')}>
                                Onayla
                              </Button>
                              <Button variant="destructive" size="sm" onClick={() => handleRequestStatusUpdate(request.id, 'Reddedildi')}>
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
                              {new Date(request.requestDate).toLocaleString('tr-TR', { dateStyle: 'long', timeStyle: 'short' })} tarihinde oluşturuldu.
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
