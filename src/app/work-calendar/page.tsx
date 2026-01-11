
'use client';

import { useState } from 'react';
import { CalendarCheck, ChevronDown, Plus, Tag, Edit, Trash2, CheckCircle, GripVertical } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { allEmployees, currentUser } from '@/lib/data';
import { useToast } from '@/hooks/use-toast';

type TaskStatus = 'Beklemede' | 'Devam Ediyor' | 'Tamamlandı';
type TaskPriority = 'Düşük' | 'Orta' | 'Yüksek' | 'Kritik';

interface Task {
    id: number;
    employeeId: string;
    description: string;
    type: string;
    status: TaskStatus;
    priority: TaskPriority;
    dueDate: string;
}

const initialTasks: Task[] = [
  { id: 1, employeeId: '24', description: 'Yaz koleksiyonu için kesim planını oluştur', type: 'Planlama', status: 'Beklemede' as const, priority: 'Yüksek' as const, dueDate: '2024-08-05' },
  { id: 2, employeeId: '28', description: '5. üretim bandındaki makine bakımını denetle', type: 'Üretim', status: 'Devam Ediyor' as const, priority: 'Orta' as const, dueDate: '2024-08-02' },
  { id: 3, employeeId: '24', description: 'Yeni gelen kumaşların stok girişini planla', type: 'Planlama', status: 'Tamamlandı' as const, priority: 'Orta' as const, dueDate: '2024-07-30' },
  { id: 4, employeeId: '27', description: 'Haftalık üretim hedeflerini gözden geçir ve raporla', type: 'Üretim', status: 'Beklemede' as const, priority: 'Yüksek' as const, dueDate: '2024-08-01' },
  { id: 5, employeeId: '28', description: 'Vardiya devir teslim prosedürlerini kontrol et', type: 'Üretim', status: 'Devam Ediyor' as const, priority: 'Düşük' as const, dueDate: '2024-08-01' },
  { id: 6, employeeId: '23', description: 'Sonraki ayın hammadde ihtiyacını belirle', type: 'Planlama', status: 'Beklemede' as const, priority: 'Kritik' as const, dueDate: '2024-08-10' },
];

const priorityColors: Record<TaskPriority, string> = {
  'Yüksek': 'bg-red-500/10 text-red-700 border-red-500/20',
  'Orta': 'bg-yellow-500/10 text-yellow-700 border-yellow-500/20',
  'Düşük': 'bg-blue-500/10 text-blue-700 border-blue-500/20',
  'Kritik': 'bg-red-700 text-white border-red-900',
};

const statusColors: Record<TaskStatus, string> = {
  'Beklemede': 'bg-gray-500/20 text-gray-400',
  'Devam Ediyor': 'bg-blue-500/20 text-blue-400',
  'Tamamlandı': 'bg-green-500/20 text-green-400',
};

const relevantEmployees = allEmployees.filter(e => e.department === 'Üretim Planlama' || e.department === 'Üretim' || e.department === 'BT');

interface FormContentProps {
  formDescription: string;
  setFormDescription: (value: string) => void;
  formEmployee: string;
  setFormEmployee: (value: string) => void;
  formType: string;
  setFormType: (value: string) => void;
  formPriority: TaskPriority;
  setFormPriority: (value: TaskPriority) => void;
  formDueDate: string;
  setFormDueDate: (value: string) => void;
}

const FormContent = ({
  formDescription, setFormDescription,
  formEmployee, setFormEmployee,
  formType, setFormType,
  formPriority, setFormPriority,
  formDueDate, setFormDueDate
}: FormContentProps) => (
  <div className="grid gap-6 py-4">
      <div className="grid gap-2">
          <Label htmlFor="task-description">Görev Açıklaması</Label>
          <Textarea id="task-description" placeholder="Yapılacak işin detaylarını yazın..." value={formDescription} onChange={(e) => setFormDescription(e.target.value)} rows={5} />
      </div>
      <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-2">
              <Label htmlFor="task-employee">Atanacak Çalışan</Label>
              <Select value={formEmployee} onValueChange={setFormEmployee}>
                  <SelectTrigger id="task-employee"><SelectValue placeholder="Çalışan seçin..." /></SelectTrigger>
                  <SelectContent>{relevantEmployees.map(emp => <SelectItem key={emp.id} value={emp.id}>{emp.name}</SelectItem>)}</SelectContent>
              </Select>
          </div>
          <div className="grid gap-2">
              <Label htmlFor="task-type">Görev Türü</Label>
              <Select value={formType} onValueChange={setFormType}>
                  <SelectTrigger id="task-type"><SelectValue placeholder="Tür seçin..." /></SelectTrigger>
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
              <Select value={formPriority} onValueChange={(v) => setFormPriority(v as TaskPriority)}>
                  <SelectTrigger id="task-priority"><SelectValue placeholder="Öncelik seçin..." /></SelectTrigger>
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
              <Input id="task-due-date" type="date" value={formDueDate} onChange={(e) => setFormDueDate(e.target.value)} />
          </div>
      </div>
  </div>
);


export default function WorkCalendarPage() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState(currentUser.id);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const { toast } = useToast();

  const [formDescription, setFormDescription] = useState('');
  const [formEmployee, setFormEmployee] = useState(currentUser.id);
  const [formType, setFormType] = useState('Planlama');
  const [formPriority, setFormPriority] = useState<TaskPriority>('Orta');
  const [formDueDate, setFormDueDate] = useState('');

  const selectedEmployee = allEmployees.find(emp => emp.id === selectedEmployeeId);
  const filteredTasks = tasks.filter(task => task.employeeId === selectedEmployeeId);

  const resetForm = () => {
    setFormDescription('');
    setFormEmployee(currentUser.id);
    setFormType('Planlama');
    setFormPriority('Orta');
    setFormDueDate('');
  };

  const handleOpenAddDialog = () => {
    resetForm();
    setIsAddDialogOpen(true);
  };
  
  const handleAddTask = () => {
    if (!formDescription || !formEmployee || !formDueDate) {
      toast({ variant: "destructive", title: "Eksik Bilgi", description: "Lütfen tüm zorunlu alanları doldurun." });
      return;
    }
    const newTask: Task = {
      id: Date.now(),
      employeeId: formEmployee,
      description: formDescription,
      type: formType,
      status: 'Beklemede',
      priority: formPriority,
      dueDate: formDueDate,
    };
    setTasks(prevTasks => [...prevTasks, newTask]);
    toast({ title: "Görev Eklendi!", description: `"${newTask.description}" görevi başarıyla oluşturuldu.` });
    setIsAddDialogOpen(false);
  };

  const handleOpenEditDialog = (task: Task) => {
    setEditingTask(task);
    setFormDescription(task.description);
    setFormEmployee(task.employeeId);
    setFormType(task.type);
    setFormPriority(task.priority);
    setFormDueDate(task.dueDate);
    setIsEditDialogOpen(true);
  };

  const handleUpdateTask = () => {
    if (!editingTask) return;
    setTasks(prev => prev.map(task => 
      task.id === editingTask.id 
        ? { ...task, description: formDescription, employeeId: formEmployee, type: formType, priority: formPriority, dueDate: formDueDate } 
        : task
    ));
    toast({ title: "Görev Güncellendi!", description: `Görev başarıyla güncellendi.` });
    setIsEditDialogOpen(false);
    setEditingTask(null);
  };

  const handleCompleteTask = (taskId: number) => {
    setTasks(prev => prev.map(task => task.id === taskId ? { ...task, status: 'Tamamlandı' } : task));
    toast({ title: "Görev Tamamlandı!", description: "Görevin durumu 'Tamamlandı' olarak işaretlendi." });
  };

  const handleDeleteTask = (taskId: number) => {
    setTasks(prev => prev.filter(task => task.id !== taskId));
    toast({ title: "Görev Silindi!", description: "Görev başarıyla silindi." });
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
        <Button onClick={handleOpenAddDialog}><Plus className="mr-2 h-4 w-4" />Yeni Görev Ekle</Button>
      </header>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Görev Listesi</CardTitle>
              <CardDescription>{selectedEmployee ? `${selectedEmployee.name} için atanan görevler.` : 'Bir çalışan seçin.'}</CardDescription>
            </div>
             <DropdownMenu>
              <DropdownMenuTrigger asChild><Button variant="outline">{selectedEmployee?.name || 'Çalışan Seç'}<ChevronDown className="ml-2 h-4 w-4" /></Button></DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>Çalışan Seçin</DropdownMenuLabel><DropdownMenuSeparator />
                <DropdownMenuRadioGroup value={selectedEmployeeId} onValueChange={setSelectedEmployeeId}>
                  {relevantEmployees.map(emp => <DropdownMenuRadioItem key={emp.id} value={emp.id}>{emp.name}</DropdownMenuRadioItem>)}
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
                  <TableHead className="w-[100px] text-right">İşlemler</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTasks.length > 0 ? (
                  filteredTasks.map(task => (
                    <TableRow key={task.id}>
                      <TableCell className="font-medium">{task.description}</TableCell>
                      <TableCell><Badge variant="outline" className="flex items-center gap-1.5"><Tag className="h-3 w-3" />{task.type}</Badge></TableCell>
                      <TableCell><Badge variant="outline" className={priorityColors[task.priority]}>{task.priority}</Badge></TableCell>
                      <TableCell><Badge className={`pointer-events-none ${statusColors[task.status]}`}>{task.status}</Badge></TableCell>
                      <TableCell>{new Date(task.dueDate).toLocaleDateString('tr-TR')}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild><Button variant="ghost" size="icon"><GripVertical className="h-4 w-4" /></Button></DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuItem onClick={() => handleOpenEditDialog(task)}><Edit className="mr-2 h-4 w-4" /> Düzenle</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleCompleteTask(task.id)}><CheckCircle className="mr-2 h-4 w-4" /> Tamamla</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-500" onClick={() => handleDeleteTask(task.id)}><Trash2 className="mr-2 h-4 w-4" /> Sil</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow><TableCell colSpan={6} className="h-48 text-center text-muted-foreground">Bu çalışana atanmış görev bulunmamaktadır.</TableCell></TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
      
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogContent className="sm:max-w-[480px]">
            <DialogHeader><DialogTitle>Yeni Görev Oluştur</DialogTitle><DialogDescription>Aşağıdaki formu doldurarak yeni bir görev atayın.</DialogDescription></DialogHeader>
            <FormContent
                formDescription={formDescription} setFormDescription={setFormDescription}
                formEmployee={formEmployee} setFormEmployee={setFormEmployee}
                formType={formType} setFormType={setFormType}
                formPriority={formPriority} setFormPriority={setFormPriority}
                formDueDate={formDueDate} setFormDueDate={setFormDueDate}
            />
            <DialogFooter><Button type="button" variant="outline" onClick={() => setIsAddDialogOpen(false)}>İptal</Button><Button type="button" onClick={handleAddTask}>Görevi Kaydet</Button></DialogFooter>
          </DialogContent>
      </Dialog>
      
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="sm:max-w-[480px]">
            <DialogHeader><DialogTitle>Görevi Düzenle</DialogTitle><DialogDescription>Görevin detaylarını güncelleyin.</DialogDescription></DialogHeader>
            <FormContent
                formDescription={formDescription} setFormDescription={setFormDescription}
                formEmployee={formEmployee} setFormEmployee={setFormEmployee}
                formType={formType} setFormType={setFormType}
                formPriority={formPriority} setFormPriority={setFormPriority}
                formDueDate={formDueDate} setFormDueDate={setFormDueDate}
            />
            <DialogFooter><Button type="button" variant="outline" onClick={() => setIsEditDialogOpen(false)}>İptal</Button><Button type="button" onClick={handleUpdateTask}>Değişiklikleri Kaydet</Button></DialogFooter>
          </DialogContent>
      </Dialog>
    </div>
  );
}
