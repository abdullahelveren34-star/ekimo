'use client';

import { useMemo, useState, useEffect } from 'react';
import { FileChart, CheckCircle, XCircle, Clock, Briefcase } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useFirebase, useCollection } from '@/firebase';
import { collection, query } from 'firebase/firestore';
import type { ApprovalRequest } from '@/lib/actions';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from '@/components/ui/badge';
import { allEmployees } from '@/lib/data';
import { Skeleton } from '@/components/ui/skeleton';
import { mockApprovalRequests } from '@/lib/mock-requests';

const statusIcons = {
    'Onaylandı': <CheckCircle className="h-4 w-4 text-green-500" />,
    'Reddedildi': <XCircle className="h-4 w-4 text-red-500" />,
    'Beklemede': <Clock className="h-4 w-4 text-yellow-500" />,
};

const statusColors: { [key: string]: string } = {
  'Onaylandı': 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300',
  'Reddedildi': 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300',
  'Beklemede': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300',
};

const getEmployeeById = (id: string) => allEmployees.find(e => e.id === id);

const ClientFormattedDate = ({ dateString }: { dateString: string | undefined | null }) => {
    const [formattedDate, setFormattedDate] = useState<string | null>(null);

    useEffect(() => {
        if (!dateString) {
            setFormattedDate('-');
            return;
        }
        setFormattedDate(new Date(dateString).toLocaleDateString('tr-TR'));
    }, [dateString]);

    if (formattedDate === null) {
        return <Skeleton className="h-4 w-[90px] inline-block" />;
    }
    return <>{formattedDate}</>;
};

export default function ReportingPage() {
  const { firestore } = useFirebase();

  const allRequestsQuery = useMemo(() => {
    if (!firestore) return null;
    return query(collection(firestore, 'approvalRequests'));
  }, [firestore]);

  const { data: requests, isLoading } = useCollection<ApprovalRequest>(allRequestsQuery);

  const isMockData = !isLoading && (!requests || requests.length === 0);

  const processedData = useMemo(() => {
    if (isLoading) return []; 
    
    const sourceData = isMockData ? mockApprovalRequests : requests;

    if (isMockData) {
      return sourceData.map((req, index) => {
        const newReq = { ...req }; 
        if (index < 4) {
          newReq.status = 'Onaylandı';
          newReq.approvalDate = new Date(Date.now() - (index + 2) * 24 * 3600 * 1000).toISOString();
        } else if (index < 6) {
          newReq.status = 'Reddedildi';
          newReq.approvalDate = new Date(Date.now() - (index + 2) * 24 * 3600 * 1000).toISOString();
        } else {
          newReq.status = 'Beklemede';
          newReq.approvalDate = undefined;
        }
        return newReq;
      });
    }
    return sourceData;
  }, [requests, isLoading, isMockData]);
  
  const reportStats = useMemo(() => {
    if (isLoading || !processedData) {
      return { total: 0, approved: 0, rejected: 0, pending: 0 };
    }
    return {
      total: processedData.length,
      approved: processedData.filter(r => r.status === 'Onaylandı').length,
      rejected: processedData.filter(r => r.status === 'Reddedildi').length,
      pending: processedData.filter(r => r.status === 'Beklemede').length,
    };
  }, [processedData, isLoading]);

  return (
    <div className="space-y-8">
      <header>
        <div className="flex items-center gap-3">
          <FileChart className="h-8 w-8 text-primary" />
          <div>
            <h1 className="text-3xl font-bold text-primary">Talep Raporlama</h1>
            <p className="text-muted-foreground mt-1">Tüm personel taleplerinin özetini ve geçmişini görüntüleyin.</p>
          </div>
        </div>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Toplam Talep</CardTitle>
                <Briefcase className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                {isLoading ? <Skeleton className="h-8 w-1/4" /> : <div className="text-2xl font-bold">{reportStats.total}</div>}
            </CardContent>
        </Card>
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Onaylanan Talepler</CardTitle>
                <CheckCircle className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
                {isLoading ? <Skeleton className="h-8 w-1/4" /> : <div className="text-2xl font-bold">{reportStats.approved}</div>}
            </CardContent>
        </Card>
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Reddedilen Talepler</CardTitle>
                <XCircle className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
                {isLoading ? <Skeleton className="h-8 w-1/4" /> : <div className="text-2xl font-bold">{reportStats.rejected}</div>}
            </CardContent>
        </Card>
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Bekleyen Talepler</CardTitle>
                <Clock className="h-4 w-4 text-yellow-500" />
            </CardHeader>
            <CardContent>
                {isLoading ? <Skeleton className="h-8 w-1/4" /> : <div className="text-2xl font-bold">{reportStats.pending}</div>}
            </CardContent>
        </Card>
      </section>

      <Card>
        <CardHeader>
            <CardTitle>Tüm Taleplerin Geçmişi</CardTitle>
            <CardDescription>
                Oluşturulan tüm taleplerin listesi ve mevcut durumları.
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
                            <TableHead>Çalışan</TableHead>
                            <TableHead>Talep Türü</TableHead>
                            <TableHead>Talep Tarihi</TableHead>
                            <TableHead>Onay Tarihi</TableHead>
                            <TableHead className="text-right">Durum</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {isLoading ? (
                            Array.from({ length: 5 }).map((_, i) => (
                                <TableRow key={i}>
                                    <TableCell colSpan={5}><Skeleton className="h-10 w-full" /></TableCell>
                                </TableRow>
                            ))
                        ) : processedData && processedData.length > 0 ? (
                            processedData.map((request) => {
                                const employee = getEmployeeById(request.employeeId);
                                return (
                                    <TableRow key={request.id}>
                                        <TableCell className="font-medium">{employee?.name || request.details.employeeName || 'Bilinmiyor'}</TableCell>
                                        <TableCell>{request.requestType}</TableCell>
                                        <TableCell><ClientFormattedDate dateString={request.requestDate} /></TableCell>
                                        <TableCell><ClientFormattedDate dateString={request.approvalDate} /></TableCell>
                                        <TableCell className="text-right">
                                            <Badge variant="outline" className={`${statusColors[request.status]}`}>
                                                {statusIcons[request.status as keyof typeof statusIcons]}
                                                <span className="ml-2">{request.status}</span>
                                            </Badge>
                                        </TableCell>
                                    </TableRow>
                                );
                            })
                        ) : (
                            <TableRow>
                                <TableCell colSpan={5} className="h-48 text-center">
                                    Raporlanacak talep bulunamadı.
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
