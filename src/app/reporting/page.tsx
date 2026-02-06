'use client';

import { useMemo, useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useFirebase, useCollection } from '@/firebase';
import { collection, query } from 'firebase/firestore';
import type { ApprovalRequest } from '@/lib/actions';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from '@/components/ui/badge';
import { allEmployees } from '@/lib/data';
import { Skeleton } from '@/components/ui/skeleton';
import { mockApprovalRequests } from '@/lib/mock-requests';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";


const statusColors: { [key: string]: string } = {
  'Onaylandı': 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300',
  'Reddedildi': 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300',
  'Beklemede': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300',
};

const requestTypes = ['Tümü', 'İzin', 'Masraf', 'Seyahat', 'Araç', 'İK Evrak'];

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
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('Tümü');

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
  
  const filteredData = useMemo(() => {
    if (activeTab === 'Tümü') {
        return processedData;
    }
    return processedData.filter(req => req.requestType === activeTab);
  }, [processedData, activeTab]);

  const reportStats = useMemo(() => {
    if (isLoading) {
      return { total: 0, approved: 0, rejected: 0, pending: 0 };
    }
    return {
      total: filteredData.length,
      approved: filteredData.filter(r => r.status === 'Onaylandı').length,
      rejected: filteredData.filter(r => r.status === 'Reddedildi').length,
      pending: filteredData.filter(r => r.status === 'Beklemede').length,
    };
  }, [filteredData, isLoading]);

  const typeDistribution = useMemo(() => {
    const distribution: {[key: string]: number} = {};
    processedData.forEach(req => {
        distribution[req.requestType] = (distribution[req.requestType] || 0) + 1;
    });
    return Object.entries(distribution).map(([name, value]) => ({ name, value }));
  }, [processedData]);

  const chartConfig = {
    value: { label: 'Talepler' },
    ...requestTypes.reduce((acc, type) => {
        acc[type] = { label: type };
        return acc;
    }, {} as any)
  };
  const PIE_COLORS = ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF", "#FF9F40"];

  const handleExport = (reportType: string) => {
    toast({
        title: 'Rapor Dışa Aktarılıyor...',
        description: `${reportType} raporu oluşturuluyor ve indirilecek.`,
    });
    // In a real app, you would generate a CSV/Excel file here.
    console.log(`Exporting ${reportType} report...`, filteredData);
  }

  return (
    <div className="space-y-8">
      <header>
        <div>
          <h1 className="text-3xl font-bold text-primary">Talep Raporlama</h1>
          <p className="text-muted-foreground mt-1">Tüm personel taleplerinin özetini ve geçmişini görüntüleyin.</p>
        </div>
      </header>
    
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-3 lg:grid-cols-6 h-auto">
            {requestTypes.map(type => (
                <TabsTrigger key={type} value={type}>{type}</TabsTrigger>
            ))}
        </TabsList>

        {requestTypes.map(type => (
            <TabsContent key={type} value={type} className="mt-6">
                 <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-6">
                    <h2 className="text-2xl font-bold text-foreground">
                        {type === 'Tümü' ? 'Genel Rapor Özeti' : `${type} Talepleri Raporu`}
                    </h2>
                    <Button onClick={() => handleExport(type)}>
                        <Download className="mr-2 h-4 w-4" />
                        {type === 'Tümü' ? 'Tüm Raporu Dışa Aktar' : `${type} Raporunu Dışa Aktar`}
                    </Button>
                </div>
                
                <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Toplam Talep</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {isLoading ? <Skeleton className="h-8 w-1/4" /> : <div className="text-2xl font-bold">{reportStats.total}</div>}
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Onaylanan Talepler</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {isLoading ? <Skeleton className="h-8 w-1/4" /> : <div className="text-2xl font-bold text-green-500">{reportStats.approved}</div>}
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Reddedilen Talepler</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {isLoading ? <Skeleton className="h-8 w-1/4" /> : <div className="text-2xl font-bold text-red-500">{reportStats.rejected}</div>}
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Bekleyen Talepler</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {isLoading ? <Skeleton className="h-8 w-1/4" /> : <div className="text-2xl font-bold text-yellow-500">{reportStats.pending}</div>}
                        </CardContent>
                    </Card>
                </section>

                <div className="grid grid-cols-1 xl:grid-cols-5 gap-6 mt-6">
                    <div className={type === 'Tümü' ? "xl:col-span-3" : "xl:col-span-5"}>
                         <Card>
                            <CardHeader>
                                <CardTitle>{type === 'Tümü' ? 'Tüm Taleplerin Geçmişi' : `${type} Talepleri`}</CardTitle>
                                <CardDescription>
                                    Oluşturulan tüm taleplerin listesi ve mevcut durumları.
                                    {isMockData && (
                                        <p className="mt-2 text-sm text-amber-600 dark:text-amber-400 p-3 bg-amber-500/10 border border-amber-500/20 rounded-md">
                                            <strong>Not:</strong> Henüz veritabanında gerçek bir talep bulunamadı. Bu nedenle aşağıda **örnek veriler** gösterilmektedir.
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
                                            ) : filteredData && filteredData.length > 0 ? (
                                                filteredData.map((request) => {
                                                    const employee = getEmployeeById(request.employeeId);
                                                    return (
                                                        <TableRow key={request.id}>
                                                            <TableCell className="font-medium">{employee?.name || request.details.employeeName || 'Bilinmiyor'}</TableCell>
                                                            <TableCell>{request.requestType}</TableCell>
                                                            <TableCell><ClientFormattedDate dateString={request.requestDate} /></TableCell>
                                                            <TableCell><ClientFormattedDate dateString={request.approvalDate} /></TableCell>
                                                            <TableCell className="text-right">
                                                                <Badge variant="outline" className={`${statusColors[request.status]}`}>
                                                                    <span>{request.status}</span>
                                                                </Badge>
                                                            </TableCell>
                                                        </TableRow>
                                                    );
                                                })
                                            ) : (
                                                <TableRow>
                                                    <TableCell colSpan={5} className="h-48 text-center">
                                                        Bu kritere uygun raporlanacak talep bulunamadı.
                                                    </TableCell>
                                                </TableRow>
                                            )}
                                        </TableBody>
                                    </Table>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {type === 'Tümü' && (
                        <div className="xl:col-span-2">
                             <Card className="flex flex-col h-full">
                                <CardHeader>
                                    <CardTitle>Talep Türü Dağılımı</CardTitle>
                                    <CardDescription>Tüm taleplerin türlerine göre yüzdesel dağılımı.</CardDescription>
                                </CardHeader>
                                <CardContent className="flex-1 pb-0">
                                   <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[300px]">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <PieChart>
                                                <Tooltip content={<ChartTooltipContent nameKey="value" hideLabel />} />
                                                <Pie
                                                    data={typeDistribution}
                                                    dataKey="value"
                                                    nameKey="name"
                                                    cx="50%"
                                                    cy="50%"
                                                    outerRadius={100}
                                                    labelLine={false}
                                                    label={({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
                                                        const RADIAN = Math.PI / 180;
                                                        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
                                                        const x = cx + radius * Math.cos(-midAngle * RADIAN);
                                                        const y = cy + radius * Math.sin(-midAngle * RADIAN);
                                                        return (
                                                            <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central" className='text-xs font-bold'>
                                                                {`${(percent * 100).toFixed(0)}%`}
                                                            </text>
                                                        );
                                                    }}
                                                >
                                                    {typeDistribution.map((entry, index) => (
                                                        <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                                                    ))}
                                                </Pie>
                                                <Legend />
                                            </PieChart>
                                        </ResponsiveContainer>
                                    </ChartContainer>
                                </CardContent>
                             </Card>
                        </div>
                    )}

                </div>

            </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}

    