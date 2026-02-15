'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { boardMembers, textileNews, companyNews, departmentMembers, employeeOfTheMonth, type Employee } from '@/lib/data';
import Image from 'next/image';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Cake, Gift, Star, Send } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

export default function HomePage() {
  const chairman = boardMembers.find(member => member.title === 'Yönetim Kurulu Başkanı');
  const [birthdayPersonnel, setBirthdayPersonnel] = useState<Employee[] | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    // This effect runs only on the client side, after hydration.
    const today = new Date();
    const todayMonth = today.getMonth() + 1;
    const todayDay = today.getDate();

    const allEmployees = Object.values(departmentMembers).flat();
    
    const todaysBirthdays = allEmployees.filter(employee => {
      if (!employee.birthDate) return false;
      const [year, month, day] = employee.birthDate.split('-').map(Number);
      return month === todayMonth && day === todayDay;
    });

    setBirthdayPersonnel(todaysBirthdays);
  }, []);
  
  const handleCongratulate = (name: string) => {
    toast({
      title: 'Tebrikler!',
      description: `${name} için kutlama mesajınız başarıyla iletildi.`,
    });
  };
  
  return (
    <div className="flex flex-col gap-8">
      <header>
        <h1 className="text-3xl font-bold text-primary">Ana Sayfa</h1>
        <p className="text-muted-foreground mt-1">E-Kimo portalına hoş geldiniz. İşte günün özeti.</p>
      </header>
      
      {chairman && (
        <section>
          <Card className="overflow-hidden">
            <div className="md:flex">
              <div className="md:flex-shrink-0">
                <Avatar className="h-full w-full md:w-48 rounded-none">
                  <AvatarFallback>{chairman.name.split(' ').map((n: string) => n[0]).join('')}</AvatarFallback>
                </Avatar>
              </div>
              <div className="p-8">
                <div className="uppercase tracking-wide text-sm text-primary font-semibold">{chairman.title}</div>
                <h2 className="mt-1 text-2xl font-bold text-foreground">{chairman.name}</h2>
                <p className="mt-4 text-muted-foreground">
                  "Değerli E-Kimo ailesi,
                  <br/><br/>
                  Yenilikçi adımlarımız ve sizlerin özverili çalışmaları sayesinde sektördeki liderliğimizi pekiştiriyoruz. Birlikte daha nice başarılara imza atacağımıza olan inancım tam. Hepinize verimli bir gün dilerim."
                </p>
              </div>
            </div>
          </Card>
        </section>
      )}

      <section>
        <h2 className="text-2xl font-bold text-foreground mb-4">Şirket Duyuruları</h2>
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent>
            {companyNews.map((news) => (
              <CarouselItem key={news.id} className="md:basis-1/2 lg:basis-1/3">
                <div className="p-1 h-full">
                  <Card className="h-full flex flex-col bg-muted/50 hover:border-primary transition-colors">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <CardTitle>{news.title}</CardTitle>
                        <Badge variant="outline">{news.category}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <p className="text-muted-foreground">{news.description}</p>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden sm:flex" />
          <CarouselNext className="hidden sm:flex" />
        </Carousel>
      </section>

      <section className="space-y-6">
        <header>
          <h2 className="text-2xl font-bold text-foreground">Sektörden Haberler</h2>
          <p className="text-muted-foreground">Tekstil ve moda dünyasındaki son gelişmeler.</p>
        </header>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {textileNews.map((news) => (
            <Card key={news.id} className="flex flex-col overflow-hidden group">
              <div className="relative h-48 w-full">
                <Image 
                  src={news.imageUrl} 
                  alt={news.title} 
                  fill 
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  data-ai-hint={news.imageHint}
                />
                 <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              </div>
              <CardHeader>
                <CardTitle className="z-10">{news.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <CardDescription>{news.description}</CardDescription>
              </CardContent>
              <CardFooter>
                <p className="text-xs text-muted-foreground">{news.date}</p>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="text-yellow-400" />
              Ayın Personeli
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center sm:items-start gap-4">
            <div className="flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
              <Avatar className="h-24 w-24 border-2 border-primary">
                <AvatarFallback>{employeeOfTheMonth.name.split(' ').map((n: string) => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <div className="space-y-2">
                <h3 className="text-xl font-bold">{employeeOfTheMonth.name}</h3>
                <p className="text-muted-foreground">{employeeOfTheMonth.title}, {employeeOfTheMonth.department}</p>
                <p className="text-sm italic text-primary/80">"{employeeOfTheMonth.reason}"</p>
              </div>
            </div>
            <Button onClick={() => handleCongratulate(employeeOfTheMonth.name)} size="sm" className="self-center sm:self-start">
              <Send className="mr-2 h-4 w-4" />
              Tebrik Mesajı Gönder
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Cake className="text-pink-400" />
              Doğum Günü Kutlamaları
            </CardTitle>
          </CardHeader>
          <CardContent>
            {birthdayPersonnel === null ? (
              <div className="space-y-6 py-8">
                <div className="flex items-center gap-4">
                  <Skeleton className="h-10 w-10 rounded-full" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-[150px]" />
                    <Skeleton className="h-3 w-[100px]" />
                  </div>
                </div>
              </div>
            ) : birthdayPersonnel.length > 0 ? (
              <ul className="space-y-6">
                {birthdayPersonnel.map((person) => (
                  <li key={person.id} className="flex flex-col items-start gap-4">
                    <div className="flex items-center gap-4">
                      <Avatar>
                        <AvatarFallback>{person.name.split(' ').map((n: string) => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold">{person.name}</p>
                        <p className="text-sm text-muted-foreground">{person.title}</p>
                      </div>
                    </div>
                    <Button onClick={() => handleCongratulate(person.name)} variant="outline" size="sm" className="self-start">
                       <Gift className="mr-2 h-4 w-4 text-red-400" />
                       Tebrik Et
                    </Button>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-muted-foreground text-center py-8">Bugün doğum günü olan çalışan bulunmamaktadır.</p>
            )}
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
