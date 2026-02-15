'use client';

import { useState, useMemo, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import {
  SlidersHorizontal,
  Users,
  Briefcase,
  Megaphone,
  BookOpen,
  PlusCircle,
  Loader2,
} from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useToast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useCollection, useFirebase } from '@/firebase';
import { collection } from 'firebase/firestore';
import { 
    createPersonnel, 
    updatePersonnel, 
    deletePersonnel,
    createJobPosting,
    updateJobPosting,
    deleteJobPosting,
    type PersonnelData,
    type UpdatePersonnelData,
    type JobPostingData,
    type UpdateJobPostingData,
} from '@/lib/actions';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { departmentMembers, allEmployees } from '@/lib/data';

const personnelSchema = z.object({
  firstName: z.string().min(2, 'İsim en az 2 karakter olmalıdır.'),
  lastName: z.string().min(2, 'Soyisim en az 2 karakter olmalıdır.'),
  department: z.string().min(2, 'Departman seçilmelidir.'),
  title: z.string().min(2, 'Unvan seçilmelidir.'),
  email: z.string().email('Geçerli bir e-posta adresi girin.'),
  phone: z.string().optional(),
  birthDate: z.string().optional(),
  startDate: z.string().optional(),
  photoUrl: z.any().optional(),
});
type PersonnelFormValues = z.infer<typeof personnelSchema>;

const jobPostingSchema = z.object({
    title: z.string().min(5, "Başlık en az 5 karakter olmalıdır."),
    department: z.string().min(2, "Departman belirtilmelidir."),
    location: z.string().min(2, "Lokasyon belirtilmelidir."),
    type: z.string().min(2, "İlan türü seçilmelidir."),
    description: z.string().min(10, "Açıklama en az 10 karakter olmalıdır."),
    requirements: z.string().min(10, "Gereksinimler en az 10 karakter olmalıdır."),
})
type JobPostingFormValues = z.infer<typeof jobPostingSchema>;

type ItemToDelete = {
    id: string;
    name: string;
    type: 'personnel' | 'jobPosting';
}

export default function PortalManagementPage() {
  const { toast } = useToast();
  const { firestore, storage, user, isUserLoading } = useFirebase();

  // Dialog and submission states
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Personnel states
  const [isPersonnelDialogOpen, setIsPersonnelDialogOpen] = useState(false);
  const [editingPersonnel, setEditingPersonnel] = useState<any | null>(null);

  // Job posting states
  const [isJobPostingDialogOpen, setIsJobPostingDialogOpen] = useState(false);
  const [editingJobPosting, setEditingJobPosting] = useState<any | null>(null);

  // Deletion states
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<ItemToDelete | null>(null);

  // Data fetching
  const personnelQuery = useMemo(() => firestore ? collection(firestore, 'userProfiles') : null, [firestore]);
  const { data: personnel, isLoading: isLoadingPersonnel } = useCollection(personnelQuery);

  const jobPostingsQuery = useMemo(() => firestore ? collection(firestore, 'jobPostings') : null, [firestore]);
  const { data: jobPostings, isLoading: isLoadingJobPostings } = useCollection(jobPostingsQuery);

  const departments = useMemo(() => Object.keys(departmentMembers), []);
  const titles = useMemo(() => {
    const allTitles = allEmployees.map(e => e.title);
    return [...new Set(allTitles)].sort();
  }, []);

  // Form hooks
  const personnelForm = useForm<PersonnelFormValues>({
    resolver: zodResolver(personnelSchema),
    defaultValues: { firstName: '', lastName: '', department: '', title: '', email: '', phone: '', birthDate: '', startDate: '', photoUrl: '' },
  });

  const jobPostingForm = useForm<JobPostingFormValues>({
    resolver: zodResolver(jobPostingSchema),
    defaultValues: { title: '', department: '', location: '', type: '', description: '', requirements: '' },
  });
  
  // Effects to reset form when dialogs open/close
  useEffect(() => {
    if (isPersonnelDialogOpen) {
      if (editingPersonnel) {
        personnelForm.reset({
            ...editingPersonnel,
            email: editingPersonnel.email.toLowerCase() 
        });
      } else {
        personnelForm.reset({ firstName: '', lastName: '', department: '', title: '', email: '', phone: '', birthDate: '', startDate: '', photoUrl: '' });
      }
    }
  }, [isPersonnelDialogOpen, editingPersonnel, personnelForm]);

  useEffect(() => {
    if (isJobPostingDialogOpen) {
      if (editingJobPosting) {
        jobPostingForm.reset(editingJobPosting);
      } else {
        jobPostingForm.reset({ title: '', department: '', location: '', type: '', description: '', requirements: '' });
      }
    }
  }, [isJobPostingDialogOpen, editingJobPosting, jobPostingForm]);

  // Handlers
  async function onPersonnelSubmit(values: PersonnelFormValues) {
    if (!firestore) {
        toast({ variant: 'destructive', title: 'Hata', description: 'Veritabanı bağlantısı kurulamadı.' });
        return;
    }
    setIsSubmitting(true);
    try {
      let finalPhotoUrl: string;

      if (values.photoUrl && typeof values.photoUrl === 'object' && values.photoUrl.length > 0) {
        if (!storage) {
          throw new Error("Depolama hizmeti yüklenemedi. Lütfen sayfayı yenileyip tekrar deneyin.");
        }
        const file = values.photoUrl[0];
        const filePath = `profile-photos/${Date.now()}-${file.name}`;
        const storageRef = ref(storage, filePath);
        await uploadBytes(storageRef, file);
        finalPhotoUrl = await getDownloadURL(storageRef);
      } else if (typeof values.photoUrl === 'string') {
        finalPhotoUrl = values.photoUrl;
      } else {
        finalPhotoUrl = '';
      }
      
      const email = values.email.toLowerCase();
      const dataToSubmit = { ...values, email, photoUrl: finalPhotoUrl };
      
      if (editingPersonnel) {
        await updatePersonnel(firestore, { id: editingPersonnel.id, ...dataToSubmit });
        toast({ title: "Personel Güncellendi", description: `${values.firstName} ${values.lastName} bilgileri başarıyla güncellendi.` });
      } else {
        await createPersonnel(firestore, dataToSubmit);
        toast({ title: "Personel Eklendi", description: "Yeni personel başarıyla eklendi." });
      }
      setIsPersonnelDialogOpen(false);
      setEditingPersonnel(null);
    } catch (error: any) {
        const description = `${error.message || 'İşlem sırasında bilinmeyen bir sorun oluştu.'} (Kod: ${error.code || 'Bilinmiyor'})`;
        console.error("HATA KODU:", error.code);
        console.error("HATA MESAJI:", error.message);
        toast({ 
            variant: 'destructive', 
            title: 'İşlem Başarısız Oldu', 
            description: description 
        });
    } finally {
        setIsSubmitting(false);
    }
  }

  async function onJobPostingSubmit(values: JobPostingFormValues) {
    if (!firestore) {
        toast({ variant: 'destructive', title: 'Hata', description: 'Veritabanı bağlantısı kurulamadı.' });
        return;
    }
    setIsSubmitting(true);
    try {
      if (editingJobPosting) {
        await updateJobPosting(firestore, { id: editingJobPosting.id, ...values });
        toast({ title: "İş İlanı Güncellendi", description: `"${values.title}" ilanı başarıyla güncellendi.` });
      } else {
        await createJobPosting(firestore, values);
        toast({ title: "İş İlanı Eklendi", description: "Yeni iş ilanı başarıyla eklendi." });
      }
      setIsJobPostingDialogOpen(false);
      setEditingJobPosting(null);
    } catch (error: any) {
        const description = `${error.message || 'İşlem sırasında bilinmeyen bir sorun oluştu.'} (Kod: ${error.code || 'Bilinmiyor'})`;
        console.error(error); // Log the full error
        toast({ 
            variant: 'destructive', 
            title: 'İşlem Başarısız Oldu', 
            description: description 
        });
    } finally {
        setIsSubmitting(false);
    }
  }

  const handleDelete = async () => {
    if (!itemToDelete || !firestore) return;

    setIsSubmitting(true);
    try {
        if (itemToDelete.type === 'personnel') {
            await deletePersonnel(firestore, itemToDelete.id);
            toast({ title: "Personel Silindi", description: `${itemToDelete.name} adlı personel başarıyla silindi.` });
        } else if (itemToDelete.type === 'jobPosting') {
            await deleteJobPosting(firestore, itemToDelete.id);
            toast({ title: "İş İlanı Kaldırıldı", description: `"${itemToDelete.name}" adlı ilan başarıyla kaldırıldı.` });
        }
    } catch (error: any) {
        const description = `${error.message || 'Silme işlemi sırasında bir sorun oluştu.'} (Kod: ${error.code || 'Bilinmiyor'})`;
        console.error(error); // Log the full error
        toast({ 
            variant: 'destructive', 
            title: 'İşlem Başarısız Oldu', 
            description: description 
        });
    } finally {
        setIsSubmitting(false);
        setIsDeleteDialogOpen(false);
        setItemToDelete(null);
    }
  }

  const openDeleteDialog = (item: ItemToDelete) => {
    setItemToDelete(item);
    setIsDeleteDialogOpen(true);
  };

  if (isUserLoading && !user) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <>
      <div className="space-y-8">
        <header>
          <div className="flex items-center gap-3">
            <SlidersHorizontal className="h-8 w-8 text-primary" />
            <div>
              <h1 className="text-3xl font-bold text-primary">Portal Yönetimi</h1>
              <p className="text-muted-foreground mt-1">
                Portalın içeriğini, personelleri, ilanları ve dokümanları buradan
                yönetin.
              </p>
            </div>
          </div>
        </header>

        <Tabs defaultValue="personnel" className="w-full">
          <TabsList className="grid w-full grid-cols-1 sm:grid-cols-2 md:grid-cols-4 h-auto">
            <TabsTrigger value="personnel">
              <Users className="mr-2" /> Personel Yönetimi
            </TabsTrigger>
            <TabsTrigger value="jobs">
              <Briefcase className="mr-2" /> İş İlanları
            </TabsTrigger>
            <TabsTrigger value="announcements">
              <Megaphone className="mr-2" /> Duyurular
            </TabsTrigger>
            <TabsTrigger value="documents">
              <BookOpen className="mr-2" /> Eğitim & Dokümanlar
            </TabsTrigger>
          </TabsList>

          {/* Personnel Tab */}
          <TabsContent value="personnel" className="mt-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Personel Listesi</CardTitle>
                    <CardDescription>
                      Mevcut personelleri düzenleyin, silin veya yeni personel
                      ekleyin.
                    </CardDescription>
                  </div>
                  <Button onClick={() => { setEditingPersonnel(null); setIsPersonnelDialogOpen(true); }}>
                    <PlusCircle className="mr-2" /> Yeni Personel Ekle
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="border rounded-lg">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Ad Soyad</TableHead>
                        <TableHead>Departman</TableHead>
                        <TableHead>Unvan</TableHead>
                        <TableHead>E-posta</TableHead>
                        <TableHead className="text-right">İşlemler</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {isLoadingPersonnel ? (
                        <TableRow>
                          <TableCell colSpan={5} className="h-24 text-center">
                            <Loader2 className="mx-auto h-8 w-8 animate-spin text-primary" />
                          </TableCell>
                        </TableRow>
                      ) : personnel && personnel.length > 0 ? (
                        personnel.map((employee: any) => (
                          <TableRow key={employee.id}>
                            <TableCell className="font-medium">
                              {employee.firstName} {employee.lastName}
                            </TableCell>
                            <TableCell>{employee.department}</TableCell>
                            <TableCell>{employee.title}</TableCell>
                            <TableCell>{employee.email}</TableCell>
                            <TableCell className="text-right space-x-2">
                              <Button variant="outline" size="sm" onClick={() => { setEditingPersonnel(employee); setIsPersonnelDialogOpen(true); }}>
                                Düzenle
                              </Button>
                              <Button variant="destructive" size="sm" onClick={() => openDeleteDialog({ id: employee.id, name: `${employee.firstName} ${employee.lastName}`, type: 'personnel' })}>
                                Sil
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={5} className="h-24 text-center">
                            Personel bulunamadı.
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Job Postings Tab */}
          <TabsContent value="jobs" className="mt-6">
            <Card>
                <CardHeader>
                    <div className="flex justify-between items-center">
                        <div>
                            <CardTitle>İş İlanları</CardTitle>
                            <CardDescription>Mevcut iş ilanlarını düzenleyin veya yeni ilan ekleyin.</CardDescription>
                        </div>
                        <Button onClick={() => { setEditingJobPosting(null); setIsJobPostingDialogOpen(true); }}>
                            <PlusCircle className="mr-2" /> Yeni İlan Ekle
                        </Button>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="border rounded-lg">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>İlan Başlığı</TableHead>
                                    <TableHead>Departman</TableHead>
                                    <TableHead>Lokasyon</TableHead>
                                    <TableHead>Türü</TableHead>
                                    <TableHead className="text-right">İşlemler</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {isLoadingJobPostings ? (
                                    <TableRow>
                                        <TableCell colSpan={5} className="h-24 text-center">
                                            <Loader2 className="mx-auto h-8 w-8 animate-spin text-primary" />
                                        </TableCell>
                                    </TableRow>
                                ) : jobPostings && jobPostings.length > 0 ? (
                                    jobPostings.map((job: any) => (
                                        <TableRow key={job.id}>
                                            <TableCell className="font-medium">{job.title}</TableCell>
                                            <TableCell>{job.department}</TableCell>
                                            <TableCell>{job.location}</TableCell>
                                            <TableCell>{job.type}</TableCell>
                                            <TableCell className="text-right space-x-2">
                                                <Button variant="outline" size="sm" onClick={() => { setEditingJobPosting(job); setIsJobPostingDialogOpen(true); }}>
                                                    Düzenle
                                                </Button>
                                                <Button variant="destructive" size="sm" onClick={() => openDeleteDialog({ id: job.id, name: job.title, type: 'jobPosting' })}>
                                                    Kaldır
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={5} className="h-24 text-center">
                                            İş ilanı bulunamadı.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="announcements" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Duyuru Yönetimi</CardTitle>
                <CardDescription>Ana sayfada gösterilecek yeni bir duyuru oluşturun.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2"><Label htmlFor="announcement-title">Duyuru Başlığı</Label><Input id="announcement-title" placeholder="Örn: Yeni Fabrika Yatırımı Tamamlandı"/></div>
                <div className="space-y-2">
                  <Label htmlFor="announcement-category">Kategori</Label>
                  <Select>
                    <SelectTrigger id="announcement-category">
                      <SelectValue placeholder="Bir kategori seçin..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Yatırım">Yatırım</SelectItem>
                      <SelectItem value="Başarı">Başarı</SelectItem>
                      <SelectItem value="Sosyal Sorumluluk">Sosyal Sorumluluk</SelectItem>
                      <SelectItem value="Kalite">Kalite</SelectItem>
                      <SelectItem value="Genel">Genel</SelectItem>
                      <SelectItem value="Etkinlik">Etkinlik</SelectItem>
                      <SelectItem value="Doğum Günü Kutlama">Doğum Günü Kutlama</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2"><Label htmlFor="announcement-description">Duyuru İçeriği</Label><Textarea id="announcement-description" placeholder="Duyurunun detaylarını buraya yazın." rows={4}/></div>
                <Button onClick={() => toast({ title: "İşlem Başarılı", description: 'Duyuru başarıyla yayınlandı.' })}>Duyuruyu Yayınla</Button>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="documents" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Eğitim & Doküman Yükleme</CardTitle>
                <CardDescription>Yeni eğitim dokümanları, SOP'ler veya el kitapları yükleyin.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2"><Label htmlFor="doc-title">Doküman Başlığı</Label><Input id="doc-title" placeholder="Örn: Yeni İşe Başlayanlar İçin Oryantasyon"/></div>
                <div className="space-y-2"><Label htmlFor="doc-type">Doküman Türü</Label><Input id="doc-type" placeholder="Örn: Eğitim, SOP, El Kitabı"/></div>
                <div className="space-y-2"><Label htmlFor="doc-file">Dosya</Label><Input id="doc-file" type="file"/></div>
                <Button onClick={() => toast({ title: "İşlem Başarılı", description: 'Doküman başarıyla portala yüklendi.' })}>Dokümanı Yükle</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Personnel Dialog */}
      <Dialog open={isPersonnelDialogOpen} onOpenChange={setIsPersonnelDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{editingPersonnel ? 'Personeli Düzenle' : 'Yeni Personel Ekle'}</DialogTitle>
            <DialogDescription>{editingPersonnel ? 'Personelin bilgilerini güncelleyin.' : 'Yeni personelin bilgilerini girerek kaydedin.'}</DialogDescription>
          </DialogHeader>
          <Form {...personnelForm}>
            <form id="personnel-form" onSubmit={personnelForm.handleSubmit(onPersonnelSubmit)} className="space-y-4 max-h-[70vh] overflow-y-auto pr-6">
              <div className="grid grid-cols-2 gap-4">
                <FormField control={personnelForm.control} name="firstName" render={({ field }) => (<FormItem><FormLabel>İsim</FormLabel><FormControl><Input placeholder="Ahmet" {...field} /></FormControl><FormMessage /></FormItem>)}/>
                <FormField control={personnelForm.control} name="lastName" render={({ field }) => (<FormItem><FormLabel>Soyisim</FormLabel><FormControl><Input placeholder="Yılmaz" {...field} /></FormControl><FormMessage /></FormItem>)}/>
              </div>
              <FormField control={personnelForm.control} name="email" render={({ field }) => (<FormItem><FormLabel>E-posta</FormLabel><FormControl><Input type="email" placeholder="ahmet.yilmaz@kimotekstil.com" {...field} onChange={(e) => field.onChange(e.target.value.toLowerCase())} /></FormControl><FormMessage /></FormItem>)}/>
              <FormField control={personnelForm.control} name="phone" render={({ field }) => (<FormItem><FormLabel>Telefon</FormLabel><FormControl><Input type="tel" placeholder="555-123-4567" {...field} /></FormControl><FormMessage /></FormItem>)}/>
              <div className="grid grid-cols-2 gap-4">
                <FormField control={personnelForm.control} name="title" render={({ field }) => (
                    <FormItem>
                        <FormLabel>Unvan</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl><SelectTrigger><SelectValue placeholder="Bir unvan seçin..." /></SelectTrigger></FormControl>
                            <SelectContent><SelectContent>{titles.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}</SelectContent></SelectContent>
                        </Select>
                        <FormMessage />
                    </FormItem>
                )}/>
                <FormField control={personnelForm.control} name="department" render={({ field }) => (
                    <FormItem>
                        <FormLabel>Departman</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl><SelectTrigger><SelectValue placeholder="Bir departman seçin..." /></SelectTrigger></FormControl>
                            <SelectContent>{departments.map(d => <SelectItem key={d} value={d}>{d}</SelectItem>)}</SelectContent>
                        </Select>
                        <FormMessage />
                    </FormItem>
                )}/>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <FormField control={personnelForm.control} name="birthDate" render={({ field }) => (<FormItem><FormLabel>Doğum Tarihi</FormLabel><FormControl><Input type="date" {...field} /></FormControl><FormMessage /></FormItem>)}/>
                <FormField control={personnelForm.control} name="startDate" render={({ field }) => (<FormItem><FormLabel>İşe Başlama Tarihi</FormLabel><FormControl><Input type="date" {...field} /></FormControl><FormMessage /></FormItem>)}/>
              </div>
               <FormField control={personnelForm.control} name="photoUrl" render={({ field: { onChange, value, ...rest } }) => (
                <FormItem><FormLabel>Fotoğraf</FormLabel>
                    <FormControl>
                        <Input 
                            type="file" 
                            accept="image/*"
                            onChange={(e) => onChange(e.target.files)} 
                            {...rest}
                        />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}/>
            </form>
          </Form>
          <DialogFooter>
            <Button type="submit" form="personnel-form" disabled={isSubmitting}>
              {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {editingPersonnel ? 'Değişiklikleri Kaydet' : 'Personeli Kaydet'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Job Posting Dialog */}
      <Dialog open={isJobPostingDialogOpen} onOpenChange={setIsJobPostingDialogOpen}>
        <DialogContent className="sm:max-w-lg">
            <DialogHeader>
                <DialogTitle>{editingJobPosting ? 'İş İlanını Düzenle' : 'Yeni İş İlanı Ekle'}</DialogTitle>
                <DialogDescription>{editingJobPosting ? 'İlanın detaylarını güncelleyin.' : 'Yeni bir pozisyon ilanı oluşturun.'}</DialogDescription>
            </DialogHeader>
            <Form {...jobPostingForm}>
                <form id="job-posting-form" onSubmit={jobPostingForm.handleSubmit(onJobPostingSubmit)} className="space-y-4 max-h-[70vh] overflow-y-auto pr-6">
                    <FormField control={jobPostingForm.control} name="title" render={({ field }) => (<FormItem><FormLabel>İlan Başlığı</FormLabel><FormControl><Input placeholder="Kıdemli Yazılım Mühendisi" {...field} /></FormControl><FormMessage /></FormItem>)} />
                    <div className="grid grid-cols-2 gap-4">
                        <FormField control={jobPostingForm.control} name="department" render={({ field }) => (<FormItem><FormLabel>Departman</FormLabel><FormControl><Input placeholder="BT" {...field} /></FormControl><FormMessage /></FormItem>)} />
                        <FormField control={jobPostingForm.control} name="location" render={({ field }) => (<FormItem><FormLabel>Lokasyon</FormLabel><FormControl><Input placeholder="İstanbul (Hibrit)" {...field} /></FormControl><FormMessage /></FormItem>)} />
                    </div>
                    <FormField control={jobPostingForm.control} name="type" render={({ field }) => (
                        <FormItem>
                            <FormLabel>İlan Türü</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl><SelectTrigger><SelectValue placeholder="Bir ilan türü seçin..." /></SelectTrigger></FormControl>
                                <SelectContent>
                                    <SelectItem value="Tam Zamanlı">Tam Zamanlı</SelectItem>
                                    <SelectItem value="Yarı Zamanlı">Yarı Zamanlı</SelectItem>
                                    <SelectItem value="Stajyer">Stajyer</SelectItem>
                                    <SelectItem value="Proje Bazlı">Proje Bazlı</SelectItem>
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )} />
                    <FormField control={jobPostingForm.control} name="description" render={({ field }) => (<FormItem><FormLabel>Açıklama (Kısa)</FormLabel><FormControl><Textarea placeholder="İlan kartında görünecek kısa iş tanımı." {...field} rows={3} /></FormControl><FormMessage /></FormItem>)} />
                    <FormField control={jobPostingForm.control} name="requirements" render={({ field }) => (<FormItem><FormLabel>Gereksinimler (Detaylı)</FormLabel><FormControl><Textarea placeholder="Pozisyon için aranan nitelikleri ve sorumlulukları detaylandırın." {...field} rows={5} /></FormControl><FormMessage /></FormItem>)} />
                </form>
            </Form>
            <DialogFooter>
                <Button type="submit" form="job-posting-form" disabled={isSubmitting}>
                    {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    {editingJobPosting ? 'İlanı Güncelle' : 'İlanı Yayınla'}
                </Button>
            </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle>Emin misiniz?</AlertDialogTitle>
                <AlertDialogDescription>
                    "{itemToDelete?.name}" kaydını silmek üzeresiniz. Bu işlem geri alınamaz.
                </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
                <AlertDialogCancel>İptal</AlertDialogCancel>
                <AlertDialogAction onClick={handleDelete} disabled={isSubmitting} className="bg-destructive hover:bg-destructive/90">
                    {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Evet, Sil
                </AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
