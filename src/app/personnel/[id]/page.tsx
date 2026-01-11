
'use client';

import { useState } from 'react';
import { notFound } from 'next/navigation';
import { allEmployees } from '@/lib/data';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Briefcase, Building, Cake, CalendarDays, Contact, HardDrive, Mail, Phone, User, TrendingUp } from 'lucide-react';
import { PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar, RadarChart } from 'recharts';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

function getAge(birthDateString: string) {
    const birthDate = new Date(birthDateString);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

export default function PersonnelDetailPage({ params }: { params: { id: string } }) {
  const employee = allEmployees.find(e => e.id === params.id);
  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState<number>(currentYear);

  if (!employee) {
    notFound();
  }
  
  const birthDate = new Date(employee.birthDate);
  const formattedBirthDate = birthDate.toLocaleDateString('tr-TR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
  const age = getAge(employee.birthDate);

  const performanceDataForYear = employee.performanceHistory.find(p => p.year === selectedYear)?.monthlyScores || [];

  const chartConfig = {
    score: {
      label: "Performans Skoru",
      color: "hsl(var(--primary))",
    },
  };

  const availableYears = employee.performanceHistory.map(p => p.year).sort((a, b) => b - a);

  return (
    <div className="space-y-8">
       <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Avatar className="h-24 w-24">
            <AvatarImage src={employee.avatarUrl} alt={employee.name} />
            <AvatarFallback>{employee.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-3xl font-bold text-foreground">{employee.name}</h1>
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
                    {employee.equipment.map((item, index) => (
                      <li key={index} className="text-sm p-3 bg-muted/50 rounded-md">
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
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="flex items-center gap-2 text-xl">
                      <TrendingUp className="h-5 w-5 text-primary" />
                      Performans Geçmişi
                  </CardTitle>
                  <Select value={String(selectedYear)} onValueChange={(value) => setSelectedYear(Number(value))}>
                      <SelectTrigger className="w-[120px]">
                          <SelectValue placeholder="Yıl seçin" />
                      </SelectTrigger>
                      <SelectContent>
                          {availableYears.map(year => (
                              <SelectItem key={year} value={String(year)}>{year}</SelectItem>
                          ))}
                      </SelectContent>
                  </Select>
              </CardHeader>
              <CardContent>
                {performanceDataForYear.length > 0 ? (
                  <ChartContainer config={chartConfig} className="h-[300px] w-full">
                    <RadarChart data={performanceDataForYear}>
                        <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="line" />} />
                        <PolarAngleAxis dataKey="month" />
                        <PolarGrid />
                        <PolarRadiusAxis angle={30} domain={[0, 100]} />
                        <Radar
                            name="Performans"
                            dataKey="score"
                            stroke="var(--color-score)"
                            fill="var(--color-score)"
                            fillOpacity={0.6}
                        />
                    </RadarChart>
                  </ChartContainer>
                ) : (
                  <div className="flex items-center justify-center h-[300px] text-muted-foreground text-sm">
                      {selectedYear} yılı için performans verisi bulunamadı.
                  </div>
                )}
              </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
