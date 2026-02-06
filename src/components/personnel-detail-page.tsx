'use client';

import { useState, useEffect } from 'react';
import type { Employee } from '@/lib/data';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Cake, CalendarDays, Contact, HardDrive, Mail, Phone, User, TrendingUp } from 'lucide-react';
import { Bar, BarChart, XAxis, YAxis } from 'recharts';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';

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

export function PersonnelDetailPageContent({ employee }: { employee: Employee }) {
  const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear());
  const [clientSideData, setClientSideData] = useState<{ age: number; formattedBirthDate: string } | null>(null);

  useEffect(() => {
    if (employee) {
      const age = getAge(employee.birthDate);
      const birthDate = new Date(employee.birthDate);
      const formattedBirthDate = birthDate.toLocaleDateString('tr-TR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      });
      setClientSideData({ age, formattedBirthDate });
    }
  }, [employee]);

  const performanceDataForYear = employee.performanceHistory.find(p => p.year === selectedYear)?.monthlyScores || [];

  const chartConfig = {
    workQuality: { label: "İş Kalitesi", color: "hsl(var(--chart-1))" },
    communication: { label: "İletişim", color: "hsl(var(--chart-2))" },
    responsibility: { label: "Sorumluluk", color: "hsl(var(--chart-3))" },
    average: { label: "Ortalama", color: "hsl(var(--foreground))" },
    target: { label: "Hedef", color: "hsl(var(--primary))" },
  };

  const availableYears = employee.performanceHistory.map(p => p.year).sort((a, b) => b - a);

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
                        {clientSideData ? (
                          <span>{clientSideData.formattedBirthDate} ({clientSideData.age} yaşında)</span>
                        ) : (
                          <Skeleton className="h-5 w-40" />
                        )}
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
        </div>
      </div>
      <Card>
        <CardHeader className="items-start gap-4 space-y-0 sm:flex-row sm:items-center">
            <div className="flex-1">
                <CardTitle className="flex items-center gap-2 text-xl">
                    <TrendingUp className="h-5 w-5 text-primary" />
                    Yıllık Performans Analizi
                </CardTitle>
                <p className="text-sm text-muted-foreground mt-1">
                    Seçilen yılın aylık yetkinlik puanları, hedef ve ortalamaya göre gösterimi.
                </p>
            </div>
            <Select value={String(selectedYear)} onValueChange={(value) => setSelectedYear(Number(value))}>
                <SelectTrigger className="w-full sm:w-[120px]">
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
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-6">
                    {performanceDataForYear.map((monthData) => (
                    <div key={monthData.month} className="space-y-1">
                        <p className="text-sm font-medium text-center">{monthData.month}</p>
                        <ChartContainer config={chartConfig} className="h-8 w-full">
                        <BarChart
                            accessibilityLayer
                            layout="vertical"
                            margin={{ left: 0, top: 0, right: 0, bottom: 0 }}
                            data={[monthData]}
                        >
                            <XAxis type="number" dataKey="target" hide domain={[0, 100]} />
                            <YAxis type="category" dataKey="month" hide />
                            <ChartTooltip
                            cursor={false}
                            content={
                                <ChartTooltipContent
                                hideLabel
                                formatter={(value, name) => (
                                    <div className="flex min-w-[120px] items-center text-xs">
                                        <div className="flex flex-1 items-center gap-2">
                                            <div
                                            className="h-2 w-2 rounded-full"
                                            style={{
                                                backgroundColor: chartConfig[name as keyof typeof chartConfig]?.color,
                                            }}
                                            />
                                            {chartConfig[name as keyof typeof chartConfig]?.label || name}
                                        </div>
                                        <span className="font-bold">
                                            {value}
                                        </span>
                                    </div>
                                )}
                                />
                            }
                            />
                             <Bar
                                dataKey="responsibility"
                                layout="vertical"
                                stackId="a"
                                fill="var(--color-responsibility)"
                                radius={[4, 4, 4, 4]}
                                barSize={8}
                            />
                            <Bar
                                dataKey="communication"
                                layout="vertical"
                                stackId="a"
                                fill="var(--color-communication)"
                                radius={[4, 4, 4, 4]}
                                barSize={8}
                            />
                            <Bar
                                dataKey="workQuality"
                                layout="vertical"
                                stackId="a"
                                fill="var(--color-workQuality)"
                                radius={[4, 4, 4, 4]}
                                barSize={8}
                            />
                            <path
                                d={`M${(monthData.target / 100) * 100}% 0 V 100%`}
                                stroke="hsl(var(--primary))"
                                strokeWidth={2}
                                strokeDasharray="3 3"
                            />
                            <path
                                d={`M${(monthData.average / 100) * 100}% 0 V 100%`}
                                stroke="hsl(var(--foreground))"
                                strokeWidth={1}
                                strokeOpacity={0.5}
                            />
                        </BarChart>
                        </ChartContainer>
                    </div>
                    ))}
                </div>
            ) : (
                <div className="flex items-center justify-center h-[200px] text-muted-foreground text-sm">
                    {selectedYear} yılı için performans verisi bulunamadı.
                </div>
            )}
        </CardContent>
    </Card>
    </div>
  );
}

    