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
import { useToast } from '@/hooks/use-toast';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Download, FileSpreadsheet, FileText } from 'lucide-react';
import autoTable from 'jspdf-autotable';


const statusColors: { [key: string]: string } = {
  'Onaylandı': 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300',
  'Reddedildi': 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300',
  'Beklemede': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300',
};

const requestTypes = ['Tümü', 'İzin', 'Masraf', 'Seyahat', 'Araç', 'İK Evrak'];

// E-Kimo logo Base64 data URL (PNG format)
const logoBase64 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAJRSURBVHgB7Zu/S1RRHMe/s4wWgo2gCEZBCNZBixsEGxsbG1v9Bf4BLQRhRRCsLLQIiigIgmghgoj/QkcEENHYCAqlKJRiMvfe4XUj3Nz73Lt35x58D5y5e+893zd3z73nwkYmNv7XATwBTgLdwEfgK3AGvAI+gXvAJfAq+AX8A/YC9r+Aq/8U0ApkAefAXeAocAecN1s3AbqBy8AbcBlYCcyD/k/AK+A6sEzI/wB5YBrYBn4Bw8Am8Dtwzqh/BmgG5oD3wFngMvCAUW8eGAYGgR/AfeAhsA+sAX3fM9BDiG/AKvAVeAvcAX5P6P8G6ATagHXAfeBAf3O2bQHegC3gJHAQOAI+T+i/BmgD9gD7wAvgP/B5s3UD6Ad2AA/AI+AmsA1sZfR/AP2A3cAzYAL4BTwBVrL67wP0AbeA98A88BqYyeg3AXqAG8A74DlgHpjI6HcD9AHXgffAM+A5MJPRbwvQA5wA3gNPgWlgJqPvFqAHOAPeA0+Bh8BMvP/3gB5gA7gDvAOGgfF2l3cDeoDjwBvgHbAMjLd7vZtAD/AcOAa8A5aB8XaPdwd6gOPAW+A9MAyMt7s8DNBjjBvgfTCPg/cEulV5oYd4GfxaF1gD3gO+kUuGg21APzCezvPewDjgY/JiA/QDc2I+H9+BZuBNQv8dUA2sB4b9nAGngWfAbeAsMAssB7b9nIHOgI3AnpDPgW5gKjD7+wEAAAAAAAAAAADwyz0H0WJp77RkhzIAAAAASUVORK5CYII=';


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
      return (sourceData ?? []).map((req, index) => {
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
    return (processedData ?? []).filter(
  req => req.requestType === activeTab
);

  

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
  
  (processedData ?? []).forEach(req => {
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

  const handleExportToExcel = async () => {
    const XLSX = await import('xlsx');
    const dataToExport = filteredData.map(req => {
        const employee = getEmployeeById(req.employeeId);
        return {
            'Çalışan': employee?.name || req.details.employeeName || 'Bilinmiyor',
            'Talep Türü': req.requestType,
            'Talep Tarihi': req.requestDate ? new Date(req.requestDate).toLocaleDateString('tr-TR') : '-',
            'Onay Tarihi': req.approvalDate ? new Date(req.approvalDate).toLocaleDateString('tr-TR') : '-',
            'Durum': req.status,
            'Açıklama': req.details.description || ''
        };
    });

    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Rapor");
    XLSX.writeFile(workbook, `${activeTab}_Raporu.xlsx`);
    toast({
        title: 'Excel Raporu İndirildi',
        description: `${activeTab} raporu başarıyla dışa aktarıldı.`,
    });
  };

  const handleExportToPdf = async () => {
    const { jsPDF } = await import('jspdf');
    
    const doc = new jsPDF();
    
    // Add Logo and Main Title
    doc.addImage(logoBase64, 'PNG', 14, 10, 15, 15);
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text('E-Kimo Raporu', 32, 18);
    
    // Add Report Specific Title
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    doc.text(`${activeTab} Talepleri`, 14, 30);


    const tableColumn = ["Çalışan", "Talep Türü", "Talep Tarihi", "Onay Tarihi", "Durum"];
    const tableRows: (string|undefined)[][] = [];

    filteredData.forEach(req => {
        const employee = getEmployeeById(req.employeeId);
        const reqData = [
            employee?.name || req.details.employeeName || 'Bilinmiyor',
            req.requestType,
            req.requestDate ? new Date(req.requestDate).toLocaleDateString('tr-TR') : '-',
            req.approvalDate ? new Date(req.approvalDate).toLocaleDateString('tr-TR') : '-',
            req.status,
        ];
        tableRows.push(reqData);
    });

    autoTable(doc, {
        head: [tableColumn],
        body: tableRows,
        startY: 35,
        theme: 'grid',
        headStyles: { fillColor: [24, 6, 95] },
        // Note: The built-in jsPDF fonts have limited support for Turkish characters.
        // Some characters might not render correctly in the PDF.
        // Excel export does not have this limitation.
    });

    doc.save(`${activeTab}_Raporu.pdf`);

    toast({
        title: 'PDF Raporu İndirildi',
        description: `PDF dışa aktarma işlemi tamamlandı.`,
    });
  };

  return (
    <div className="space-y-8">
      <header>
        <div>
          <h1 className="text-3xl font-bold text-primary">Talep Raporlama</h1>
          <p className="text-muted-foreground mt-1">Tüm personel taleplerinin özetini ve geçmişini görüntüleyin.</p>
        </div>
      </header>
    
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 h-auto">
            {requestTypes.map(type => (
                <TabsTrigger key={type} value={type}>{type}</TabsTrigger>
            ))}
        </TabsList>

        {requestTypes.map(type => (
            <TabsContent key={type} value={type} className="mt-6">
                 <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-6">
                    <h2 className="text-2xl font-bold text-primary">
                        {type === 'Tümü' ? 'Genel Rapor Özeti' : `${type} Talepleri Raporu`}
                    </h2>
                     <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button>
                                <Download className="mr-2 h-4 w-4" />
                                Raporu Dışa Aktar
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuItem onClick={handleExportToExcel}>
                                <FileSpreadsheet className="mr-2 h-4 w-4" />
                                <span>Excel olarak dışa aktar</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={handleExportToPdf}>
                                <FileText className="mr-2 h-4 w-4" />
                                <span>PDF olarak dışa aktar</span>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
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
                            <CardTitle className="text-sm font-medium text-green-500">Onaylanan Talepler</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {isLoading ? <Skeleton className="h-8 w-1/4" /> : <div className="text-2xl font-bold text-green-500">{reportStats.approved}</div>}
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-red-500">Reddedilen Talepler</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {isLoading ? <Skeleton className="h-8 w-1/4" /> : <div className="text-2xl font-bold text-red-500">{reportStats.rejected}</div>}
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-yellow-500">Bekleyen Talepler</CardTitle>
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
                                <CardTitle className="text-primary">{type === 'Tümü' ? 'Tüm Taleplerin Geçmişi' : `${type} Talepleri`}</CardTitle>
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
                                    <CardTitle className="text-primary">Talep Türü Dağılımı</CardTitle>
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
  )

export default ReportingPage;
   

