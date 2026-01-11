
'use client';

import { useState, useEffect } from 'react';
import { CalendarCheck, ChevronDown, Plus, Tag } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuLabel, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { allEmployees, currentUser } from '@/lib/data';
import { useToast } from '@/hooks/use-toast';

const initialTasks = [
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

const relevantEmployees = allEmployees.filter(e => e.department === 'Üretim Planlama' || e.department === 'Üretim' || e.department === 'BT');

export default function WorkCalendarPage() {
  const [tasks, setTasks] = useState(initialTasks);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState(currentUser.id); // Default to current user
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  // New Task Form State
  const [newTaskDescription, setNewTaskDescription] = useState('');
  const [newTaskEmployee, setNewTaskEmployee] = useState(currentUser.id); // Default to current user
  const [newTaskType, setNewTaskType] = useState('Planlama');
  const [newTaskPriority, setNewTaskPriority] = useState('Orta');
  const [newTaskDueDate, setNewTaskDueDate] = useState('');


  const selectedEmployee = allEmployees.find(emp => emp.id === selectedEmployeeId);
  const filteredTasks = tasks.filter(task => task.employeeId === selectedEmployeeId);
  
  useEffect(() => {
    // When the dialog opens, reset the employee to the current user
    if (isDialogOpen) {
      setNewTaskEmployee(currentUser.id);
    }
  }, [isDialogOpen]);

  const handleAddTask = () => {
    if (!newTaskDescription || !newTaskEmployee || !newTaskDueDate) {
      toast({
        variant: "destructive",
        title: "Eksik Bilgi",
        description: "Lütfen tüm zorunlu alanları doldurun.",
      });
      return;
    }

    const newTask = {
      id: tasks.length + 1,
      employeeId: newTaskEmployee,
      description: newTaskDescription,
      type: newTaskType,
      status: 'Beklemede' as 'Beklemede',
      priority: newTaskPriority as 'Yüksek' | 'Orta' | 'Düşük' | 'Kritik',
      dueDate: newTaskDueDate,
    };

    setTasks(prevTasks => [...prevTasks, newTask]);
    
    toast({
      title: "Görev Eklendi!",
      description: `"${newTask.description}" görevi başarıyla oluşturuldu.`,
    });

    // Reset form and close dialog
    setNewTaskDescription('');
    setNewTaskEmployee(currentUser.id);
    setNewTaskType('Planlama');
    setNewTaskPriority('Orta');
    setNewTaskDueDate('');
    setIsDialogOpen(false);
  };

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
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Yeni Görev Ekle
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[480px]">
            <DialogHeader>
              <DialogTitle>Yeni Görev Oluştur</DialogTitle>
              <DialogDescription>
                Aşağıdaki formu doldurarak yeni bir görev atayın.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-6 py-4">
              <div className="grid gap-2">
                <Label htmlFor="task-description">Görev Açıklaması</Label>
                <Textarea id="task-description" placeholder="Yapılacak işin detaylarını yazın..." value={newTaskDescription} onChange={(e) => setNewTaskDescription(e.target.value)} rows={5} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                    <Label htmlFor="task-employee">Atanacak Çalışan</Label>
                    <Select value={newTaskEmployee} onValueChange={setNewTaskEmployee}>
                        <SelectTrigger id="task-employee">
                        <SelectValue placeholder="Çalışan seçin..." />
                        </SelectTrigger>
                        <SelectContent>
                        {relevantEmployees.map(emp => (
                            <SelectItem key={emp.id} value={emp.id}>{emp.name}</SelectItem>
                        ))}
                        </SelectContent>
                    </Select>
                </div>
                 <div className="grid gap-2">
                    <Label htmlFor="task-type">Görev Türü</Label>
                    <Select value={newTaskType} onValueChange={setNewTaskType}>
                        <SelectTrigger id="task-type">
                        <SelectValue placeholder="Tür seçin..." />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Planlama">Planlama</SelectItem>
                            <SelectItem value="Üretim">Üretim</SelectItem>
                            <SelectItem value="Geliştirme">Geliştirme</SelectItem>
                            <SelectItem value="Analiz">Analiz</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
              </div>
               <div className="grid grid-cols-2 gap-4">
                 <div className="grid gap-2">
                    <Label htmlFor="task-priority">Öncelik</Label>
                     <Select value={newTaskPriority} onValueChange={setNewTaskPriority}>
                        <SelectTrigger id="task-priority">
                        <SelectValue placeholder="Öncelik seçin..." />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Düşük">Düşük</SelectItem>
                            <SelectItem value="Orta">Orta</SelectItem>
                            <SelectItem value="Yüksek">Yüksek</SelectItem>
                             <SelectItem value="Kritik">Kritik</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="task-due-date">Bitiş Tarihi</Label>
                    <Input id="task-due-date" type="date" value={newTaskDueDate} onChange={(e) => setNewTaskDueDate(e.target.value)} />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>İptal</Button>
              <Button type="button" onClick={handleAddTask}>Görevi Kaydet</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
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
                  {relevantEmployees.map(emp => (
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

    