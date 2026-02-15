'use client';

import { useState, useEffect } from 'react';
import type { Employee } from '@/lib/data';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Cake, CalendarDays, Contact, HardDrive, Mail, Phone, User } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

const PersonnelDetailSkeleton = () => (
    <div className="space-y-8">
        <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
                <Skeleton className="h-24 w-24 rounded-full" />
                <div>
                    <Skeleton className="h-8 w-48 mb-2" />
                    <Skeleton className="h-6 w-64 mb-2" />
                    <Skeleton className="h-5 w-32" />
                </div>
            </div>
        </header>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
                <Card>
                    <CardHeader>
                        <CardTitle><Skeleton className="h-6 w-40" /></CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <Skeleton className="h-5 w-full" />
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle><Skeleton className="h-6 w-48" /></CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                           <Skeleton className="h-5 w-full" />
                           <Skeleton className="h-5 w-full" />
                        </div>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader>
                        <CardTitle><Skeleton className="h-6 w-52" /></CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                            <Skeleton className="h-12 w-full" />
                            <Skeleton className="h-12 w-full" />
                        </div>
                    </CardContent>
                </Card>
            </div>
            <div className="space-y-8">
                <Card>
                    <CardHeader>
                        <CardTitle><Skeleton className="h-6 w-44" /></CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 text-center">
                        <Skeleton className="h-10 w-16 mx-auto" />
                        <Skeleton className="h-4 w-24 mx-auto" />
                        <Separator />
                        <div className="grid grid-cols-2 gap-4">
                            <div className="text-center"><Skeleton className="h-5 w-8 mx-auto" /><Skeleton className="h-4 w-16 mx-auto mt-1" /></div>
                            <div className="text-center"><Skeleton className="h-5 w-8 mx-auto" /><Skeleton className="h-4 w-16 mx-auto mt-1" /></div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    </div>
);

export function PersonnelDetailPageContent({ employee }: { employee: Employee }) {
  const [age, setAge] = useState<number | null>(null);
  const [formattedBirthDate, setFormattedBirthDate] = useState<string | null>(null);

  useEffect(() => {
    // Perform date calculations only on the client side after hydration
    const birthDateObj = new Date(employee.birthDate);
    const today = new Date();
    let calculatedAge = today.getFullYear() - birthDateObj.getFullYear();
    const m = today.getMonth() - birthDateObj.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDateObj.getDate())) {
        calculatedAge--;
    }
    setAge(calculatedAge);

    setFormattedBirthDate(birthDateObj.toLocaleDateString('tr-TR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }));
  }, [employee.birthDate]);

  if (age === null || formattedBirthDate === null) {
    return <PersonnelDetailSkeleton />;
  }

  return (
    <div className="space-y-8">
       <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Avatar className="h-24 w-24">
            <AvatarFallback>{employee.name.split(' ').map((n: string) => n[0]).join('')}</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-3xl font-bold text-primary">{employee.name}</h1>
            <p className="text-xl text-muted-foreground">{employee.title}</p>
            <p className="text-md text-primary">{employee.department} Departmanı</p>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
           <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                  <User className="h-5 w-5 text-primary" />
                  Kişisel Bilgiler
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center gap-3">
                        <Cake className="h-4 w-4 text-muted-foreground" />
                        <strong>Doğum Tarihi:</strong>
                        <span>{formattedBirthDate} ({age} yaşında)</span>
                    </div>
                 </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                  <Contact className="h-5 w-5 text-primary" />
                  İletişim Bilgileri
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center gap-3">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <strong>E-posta:</strong>
                        <a href={`mailto:${employee.email}`} className="text-primary hover:underline">{employee.email}</a>
                    </div>
                     <div className="flex items-center gap-3">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <strong>Telefon:</strong>
                        <span>{employee.phone}</span>
                    </div>
                 </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                    <HardDrive className="h-5 w-5 text-primary" />
                    Zimmetli Demirbaşlar
                </CardTitle>
              </CardHeader>
              <CardContent>
                {employee.equipment.length > 0 ? (
                  <ul className="space-y-3">
                    {employee.equipment.map((item) => (
                      <li key={item.serialNumber} className="text-sm p-3 bg-muted/50 rounded-md">
                        <strong className="font-semibold">{item.type}:</strong> {item.model}
                        <span className="text-muted-foreground text-xs block mt-1">Seri No: {item.serialNumber}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-muted-foreground">Personele zimmetli demirbaş bulunmamaktadır.</p>
                )}
              </CardContent>
            </Card>
        </div>
        
        <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                    <CalendarDays className="h-5 w-5 text-primary" />
                    Yıllık İzin Durumu
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-center">
                  <div>
                      <p className="text-4xl font-bold text-primary">{employee.annualLeave.remaining}</p>
                      <p className="text-sm text-muted-foreground">Kalan İzin Günü</p>
                  </div>
                  <Separator />
                  <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="text-center">
                          <p className="font-semibold">{employee.annualLeave.total}</p>
                          <p className="text-muted-foreground">Toplam Hak</p>
                      </div>
                      <div className="text-center">
                          <p className="font-semibold">{employee.annualLeave.used}</p>
                          <p className="text-muted-foreground">Kullanılan</p>
                      </div>
                  </div>
              </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
