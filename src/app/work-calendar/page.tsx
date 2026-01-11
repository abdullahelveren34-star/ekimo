
'use client';

import { useState } from 'react';
import { CalendarCheck, ChevronDown, Plus, Tag } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuLabel, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import { allEmployees } from '@/lib/data';

const tasks = [
  { id: 1, employeeId: '24', description: 'Yaz koleksiyonu için kesim planını oluştur', type: 'Planlama', status: 'Beklemede', priority: 'Yüksek', dueDate: '2024-08-05' },
  { id: 2, employeeId: '28', description: '5. üretim bandındaki makine bakımını denetle', type: 'Üretim', status: 'Devam Ediyor', priority: 'Orta', dueDate: '2024-08-02' },
  { id: 3, employeeId: '24', description: 'Yeni gelen kumaşların stok girişini planla', type: 'Planlama', status: 'Tamamlandı', priority: 'Orta', dueDate: '2024-07-30' },
  { id: 4, employeeId: '27', description: 'Haftalık üretim hedeflerini gözden geçir ve raporla', type: 'Üretim', status: 'Beklemede', priority: 'Yüksek', dueDate: '2024-08-01' },
  { id: 5, employeeId: '28', description: 'Vardiya devir teslim prosedürlerini kontrol et', type: 'Üretim', status: 'Devam Ediyor', priority: 'Düşük', dueDate: '2024-08-01' },
  { id: 6, employeeId: '23', description: 'Sonraki ayın hammadde ihtiyacını belirle', type: 'Planlama', status: 'Beklemede', priority: 'Kritik', dueDate: '2024-08-10' },
];

const priorityColors = {
  'Yüksek': 'bg-red-500/10 text-red-700 border-red-500/20',
  'Orta': 'bg-yellow-500/10 text-yellow-700 border-yellow-500/20',
  'Düşük': 'bg-blue-500/10 text-blue-700 border-blue-500/20',
  'Kritik': 'bg-red-700 text-white border-red-900',
};

const statusColors = {
  'Beklemede': 'bg-gray-500/20 text-gray-400',
  'Devam Ediyor': 'bg-blue-500/20 text-blue-400',
  'Tamamlandı': 'bg-green-500/20 text-green-400',
};


export default function WorkCalendarPage() {
  const [selectedEmployeeId, setSelectedEmployeeId] = useState('24'); // Kaan Vural as default

  const selectedEmployee = allEmployees.find(emp => emp.id === selectedEmployeeId);
  const filteredTasks = tasks.filter(task => task.employeeId === selectedEmployeeId);

  return (
    <div className="space-y-8">
      <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <CalendarCheck className="h-8 w-8 text-primary" />
          <div>
            <h1 className="text-3xl font-bold text-foreground">İş Takvim ve Planlama</h1>
            <p className="text-muted-foreground mt-1">Çalışanların üretim ve planlama görevlerini yönetin.</p>
          </div>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Yeni Görev Ekle
        </Button>
      </header>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Görev Listesi</CardTitle>
              <CardDescription>
                {selectedEmployee ? `${selectedEmployee.name} için atanan görevler.` : 'Bir çalışan seçin.'}
              </CardDescription>
            </div>
             <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  {selectedEmployee?.name || 'Çalışan Seç'}
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>Çalışan Seçin</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuRadioGroup value={selectedEmployeeId} onValueChange={setSelectedEmployeeId}>
                  {allEmployees.filter(e => e.department === 'Üretim Planlama' || e.department === 'Üretim').map(emp => (
                    <DropdownMenuRadioItem key={emp.id} value={emp.id}>{emp.name}</DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardHeader>
        <CardContent>
          <div className="border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Görev</TableHead>
                  <TableHead className="w-[120px]">Tür</TableHead>
                  <TableHead className="w-[120px]">Öncelik</TableHead>
                  <TableHead className="w-[150px]">Durum</TableHead>
                  <TableHead className="w-[150px]">Bitiş Tarihi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTasks.length > 0 ? (
                  filteredTasks.map(task => (
                    <TableRow key={task.id}>
                      <TableCell className="font-medium">{task.description}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="flex items-center gap-1.5">
                            <Tag className="h-3 w-3" />
                            {task.type}
                        </Badge>
                      </TableCell>
                       <TableCell>
                        <Badge variant="outline" className={priorityColors[task.priority as keyof typeof priorityColors]}>{task.priority}</Badge>
                      </TableCell>
                      <TableCell>
                         <Badge className={`pointer-events-none ${statusColors[task.status as keyof typeof statusColors]}`}>{task.status}</Badge>
                      </TableCell>
                      <TableCell>{new Date(task.dueDate).toLocaleDateString('tr-TR')}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="h-48 text-center text-muted-foreground">
                      Bu çalışana atanmış görev bulunmamaktadır.
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
