
'use client';

import { useState, useEffect } from 'react';
import { Plane, Plus } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { allEmployees } from '@/lib/data';
import { useToast } from '@/hooks/use-toast';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Skeleton } from '@/components/ui/skeleton';


type AssignmentStatus = 'Planlandı' | 'Devam Ediyor' | 'Tamamlandı' | 'İptal Edildi';

interface Assignment {
    id: number;
    employeeId: string;
    location: string;
    assignmentType: string;
    description: string;
    startDate: string;
    endDate: string;
    status: AssignmentStatus;
}

const initialAssignments: Assignment[] = [
  { id: 1, employeeId: '1', location: 'Milano, İtalya', assignmentType: 'Fuar Katılımı', description: 'Premiere Vision Sonbahar/Kış Fuarı', startDate: '2024-09-10', endDate: '2024-09-14', status: 'Planlandı' },
  { id: 2, employeeId: '6', location: 'Dhaka, Bangladeş', assignmentType: 'Tedarikçi Denetimi', description: 'ABC Apparels fabrika denetimi ve yeni sezon anlaşmaları.', startDate: '2024-08-15', endDate: '2024-08-22', status: 'Devam Ediyor' },
  { id: 3, employeeId: '14', location: 'New York, ABD', assignmentType: 'Müşteri Ziyareti', description: 'Büyük mağaza zincirleri ile yeni koleksiyon sunumları.', startDate: '2024-07-20', endDate: '2024-07-25', status: 'Tamamlandı' },
  { id: 4, employeeId: '19', location: 'Porto, Portekiz', assignmentType: 'Kalite Kontrol', description: 'Yüksek adetli ceket üretiminin yerinde kalite kontrolü.', startDate: '2024-09-01', endDate: '2024-09-07', status: 'Planlandı' },
  { id: 5, employeeId: '4', location: 'Londra, İngiltere', assignmentType: 'Pazar Araştırması', description: 'Rakip analizi ve yeni trendlerin yerinde incelenmesi.', startDate: '2024-08-05', endDate: '2024-08-09', status: 'Planlandı' },
];

const statusColors: Record<AssignmentStatus, string> = {
  'Planlandı': 'bg-blue-500/20 text-blue-400',
  'Devam Ediyor': 'bg-yellow-500/20 text-yellow-400',
  'Tamamlandı': 'bg-green-500/20 text-green-400',
  'İptal Edildi': 'bg-red-500/20 text-red-400',
};

const assignmentTypes = [
    'Fuar Katılımı',
    'Tedarikçi Denetimi',
    'Müşteri Ziyareti',
    'Pazar Araştırması',
    'Koleksiyon Sunumu',
    'Kalite Kontrol (Yurt Dışı Üretim)',
];

const FormattedDateRange = ({ startDate, endDate }: { startDate: string; endDate: string }) => {
    const [formattedDate, setFormattedDate] = useState<string | null>(null);

    useEffect(() => {
        // This effect runs only on the client, after hydration
        const start = new Date(startDate).toLocaleDateString('tr-TR');
        const end = new Date(endDate).toLocaleDateString('tr-TR');
        setFormattedDate(`${start} - ${end}`);
    }, [startDate, endDate]);

    // Render a skeleton on the server and during initial client render
    if (!formattedDate) {
        return <Skeleton className="h-4 w-[130px]" />;
    }

    // Render the formatted date on the client after the effect has run
    return <>{formattedDate}</>;
};


export default function AssignmentPage() {
  const { toast } = useToast();
  const [assignments, setAssignments] = useState<Assignment[]>(initialAssignments);
  
  // Form state
  const [employeeId, setEmployeeId] = useState('');
  const [assignmentType, setAssignmentType] = useState('');
  const [location, setLocation] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [description, setDescription] = useState('');

  const handleAddAssignment = () => {
    if (!employeeId || !assignmentType || !location || !startDate || !endDate || !description) {
        toast({
            variant: "destructive",
            title: "Hata!",
            description: "Lütfen tüm alanları eksiksiz doldurun.",
        });
        return;
    }
    
    const newAssignment: Assignment = {
      id: Date.now(),
      employeeId,
      assignmentType,
      location,
      startDate,
      endDate,
      description,
      status: 'Planlandı',
    };
    
    setAssignments(prev => [newAssignment, ...prev]);
    
    toast({
      title: "Başarılı!",
      description: "Yeni görevlendirme başarıyla oluşturuldu.",
    });

    // Reset form
    setEmployeeId('');
    setAssignmentType('');
    setLocation('');
    setStartDate('');
    setEndDate('');
    setDescription('');
  };
  

  return (
    <div className="space-y-8">
      <header>
        <div className="flex items-center gap-3">
          <Plane className="h-8 w-8 text-primary" />
          <div>
            <h1 className="text-3xl font-bold text-primary">Dış Görevlendirme Yönetimi</h1>
            <p className="text-muted-foreground mt-1">Yurt içi ve yurt dışı personel görevlendirmelerini planlayın ve takip edin.</p>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <Card className="lg:col-span-1">
            <CardHeader>
                <CardTitle>Yeni Görevlendirme</CardTitle>
                <CardDescription>Yeni bir dış görevlendirme oluşturun.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                 <div className="space-y-2">
                    <Label htmlFor="employee">Personel</Label>
                    <Select value={employeeId} onValueChange={setEmployeeId}>
                        <SelectTrigger id="employee"><SelectValue placeholder="Görevlendirilecek personeli seçin..." /></SelectTrigger>
                        <SelectContent>
                            {allEmployees.map(emp => <SelectItem key={emp.id} value={emp.id}>{emp.name}</SelectItem>)}
                        </SelectContent>
                    </Select>
                 </div>
                 <div className="space-y-2">
                    <Label htmlFor="assignment-type">Görev Türü</Label>
                    <Select value={assignmentType} onValueChange={setAssignmentType}>
                        <SelectTrigger id="assignment-type"><SelectValue placeholder="Görev türünü seçin..." /></SelectTrigger>
                        <SelectContent>
                            {assignmentTypes.map(type => <SelectItem key={type} value={type}>{type}</SelectItem>)}
                        </SelectContent>
                    </Select>
                 </div>
                 <div className="space-y-2">
                    <Label htmlFor="location">Görev Yeri (Şehir/Ülke)</Label>
                    <Input id="location" placeholder="Örn: Paris, Fransa" value={location} onChange={e => setLocation(e.target.value)} />
                 </div>
                 <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="start-date">Başlangıç Tarihi</Label>
                        <Input id="start-date" type="date" value={startDate} onChange={e => setStartDate(e.target.value)} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="end-date">Bitiş Tarihi</Label>
                        <Input id="end-date" type="date" value={endDate} onChange={e => setEndDate(e.target.value)} />
                    </div>
                 </div>
                 <div className="space-y-2">
                    <Label htmlFor="description">Görevin Açıklaması</Label>
                    <Textarea id="description" placeholder="Görevin amacı ve detayları hakkında bilgi verin." value={description} onChange={e => setDescription(e.target.value)} />
                 </div>
                 <Button onClick={handleAddAssignment} className="w-full">
                     <Plus className="mr-2 h-4 w-4" />
                     Görevlendirme Oluştur
                 </Button>
            </CardContent>
          </Card>
          
          <Card className="lg:col-span-2">
            <CardHeader>
                <CardTitle>Mevcut Görevlendirmeler</CardTitle>
                <CardDescription>Planlanan ve devam eden görevlendirmelerin listesi.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border rounded-lg">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Personel</TableHead>
                      <TableHead>Görev Yeri</TableHead>
                      <TableHead>Görev Türü</TableHead>
                      <TableHead>Tarih Aralığı</TableHead>
                      <TableHead>Durum</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {assignments.length > 0 ? (
                      assignments.map(task => {
                        const employee = allEmployees.find(e => e.id === task.employeeId);
                        return (
                        <TableRow key={task.id}>
                           <TableCell>
                             <div className="flex items-center gap-3">
                               <Avatar className="h-9 w-9">
                                 <AvatarImage src={employee?.avatarUrl} alt={employee?.name} />
                                 <AvatarFallback>{employee?.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                               </Avatar>
                               <div>
                                  <div className="font-medium">{employee?.name || 'Bilinmiyor'}</div>
                                  <div className="text-xs text-muted-foreground">{employee?.title}</div>
                               </div>
                             </div>
                           </TableCell>
                          <TableCell>{task.location}</TableCell>
                          <TableCell><Badge variant="outline">{task.assignmentType}</Badge></TableCell>
                          <TableCell className="text-xs">
                              <FormattedDateRange startDate={task.startDate} endDate={task.endDate} />
                          </TableCell>
                          <TableCell><Badge className={`pointer-events-none ${statusColors[task.status]}`}>{task.status}</Badge></TableCell>
                        </TableRow>
                      )})
                    ) : (
                      <TableRow><TableCell colSpan={5} className="h-48 text-center text-muted-foreground">Mevcut görevlendirme bulunmamaktadır.</TableCell></TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
      </div>
    </div>
  );
}
