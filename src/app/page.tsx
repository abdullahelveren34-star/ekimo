'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { boardMembers, textileNews as spaceNews, companyNews, departmentMembers, employeeOfTheMonth } from '@/lib/data';
import Image from 'next/image';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Cake, Gift, Star, Send, Rocket, Sparkles, Clock, Calendar, MapPin, CloudSun } from 'lucide-react';
import { Logo } from '@/components/logo';

type Employee = {
  name: string;
  title: string;
  avatarUrl: string;
  birthDate: string;
};

export default function HomePage() {
  const chairman = boardMembers.find(member => member.title === 'CEO & Baş Kaşif');
  const [birthdayPersonnel, setBirthdayPersonnel] = useState<Employee[]>([]);
  const { toast } = useToast();
  const [currentDateTime, setCurrentDateTime] = useState<Date | null>(null);
  const [userCity, setUserCity] = useState<string>('Yükleniyor...');
  const [weather, setWeather] = useState<string | null>(null);

  useEffect(() => {
    setCurrentDateTime(new Date());
    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    const fetchLocationAndWeather = async () => {
      try {
        const locationResponse = await fetch('https://ipapi.co/json/');
        const locationData = await locationResponse.json();
        const city = locationData.city || 'Bilinmiyor';
        setUserCity(city);

        if (city !== 'Bilinmiyor') {
          try {
            const weatherResponse = await fetch(`https://wttr.in/${city}?format=j1`);
            const weatherData = await weatherResponse.json();
            const currentWeather = weatherData.current_condition[0];
            setWeather(`${currentWeather.temp_C}°C, ${currentWeather.weatherDesc[0].value}`);
          } catch (weatherError) {
             console.error('Hava durumu bilgisi alınamadı:', weatherError);
             setWeather('Alınamadı');
          }
        } else {
            setWeather('Konum bulunamadı');
        }
      } catch (error) {
        console.error('Konum bilgisi alınamadı:', error);
        setUserCity('Bilinmiyor');
        setWeather('Alınamadı');
      }
    };
    
    fetchLocationAndWeather();

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
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
      title: 'Mesaj Gönderildi!',
      description: `${name} için tebrik mesajı hiper-uzay rölesi ile iletildi.`,
    });
  };

  const formattedDate = currentDateTime
    ? currentDateTime.toLocaleDateString('tr-TR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        weekday: 'long',
      })
    : 'Yükleniyor...';

  const formattedTime = currentDateTime
    ? currentDateTime.toLocaleTimeString('tr-TR', {
        hour: '2-digit',
        minute: '2-digit',
      })
    : '...';

  return (
    <div className="flex flex-col gap-8">
      <header>
        <h1 className="text-3xl font-bold text-foreground">StellarCorp Komuta Merkezi</h1>
        <p className="text-muted-foreground mt-1">Galaktik operasyonlarınıza hoş geldiniz.</p>
      </header>
      
      {chairman && (
        <section>
          <Card className="overflow-hidden border-primary/20">
            <div className="md:flex">
              <div className="md:flex-shrink-0">
                <Avatar className="h-full w-full md:w-56 rounded-none">
                  <AvatarImage src={chairman.avatarUrl} alt={chairman.name} className="object-cover h-full w-full" />
                  <AvatarFallback>{chairman.name.charAt(0)}</AvatarFallback>
                </Avatar>
              </div>
              <div className="p-8">
                <div className="uppercase tracking-wide text-sm text-primary font-semibold">{chairman.title}</div>
                <h2 className="mt-1 text-2xl font-bold text-foreground">{chairman.name}</h2>
                <p className="mt-4 text-muted-foreground">
                  "StellarCorp ailesi,
                  <br/><br/>
                  Önümüzdeki her sınır, keşfedilmeyi bekleyen bir evrendir. En büyük gücümüz, yıldızlara olan merakımız ve birbirimize olan sarsılmaz güvenimizdir. Birlikte, insanlığın kaderini galaksinin dört bir yanına yazacağız. Cesaretiniz ve adanmışlığınız için her birinize minnettarım."
                </p>
              </div>
            </div>
          </Card>
        </section>
      )}

      <section>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Rocket className="text-accent"/>StellarCorp Hakkında</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              StellarCorp, 2042 yılında insanlığın ufkunu yıldızlara taşımak amacıyla kurulmuş, lider bir uzay araştırma ve kolonizasyon şirketidir. Amacımız, galaksiyi keşfetmek, yaşanabilir yeni dünyalar bulmak ve teknolojinin sınırlarını zorlayarak insanlığın geleceğini güvence altına almaktır.
            </p>
          </CardContent>
        </Card>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-foreground mb-4">Galaktik Gelişmeler</h2>
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
                  <Card className="h-full flex flex-col bg-muted/50 hover:border-accent transition-colors">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <CardTitle>{news.title}</CardTitle>
                        <Badge variant="outline" className="border-accent text-accent">{news.category}</Badge>
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
          <h2 className="text-2xl font-bold text-foreground">Sektörden Haberler: Exoplanet Raporları</h2>
          <p className="text-muted-foreground">Keşfedilen yeni dünyalar ve kozmik olaylar.</p>
        </header>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {spaceNews.map((news) => (
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
              Ayın Kaşifi
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div className="flex items-center gap-6">
              <Avatar className="h-24 w-24 border-2 border-primary">
                <AvatarImage src={employeeOfTheMonth.avatarUrl} alt={employeeOfTheMonth.name} />
                <AvatarFallback>{employeeOfTheMonth.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <div className="space-y-2">
                <h3 className="text-xl font-bold">{employeeOfTheMonth.name}</h3>
                <p className="text-muted-foreground">{employeeOfTheMonth.title}, {employeeOfTheMonth.department}</p>
                <p className="text-sm italic text-primary/80">"{employeeOfTheMonth.reason}"</p>
              </div>
            </div>
            <Button onClick={() => handleCongratulate(employeeOfTheMonth.name)} size="sm" className="self-start bg-primary/20 text-primary-foreground hover:bg-primary/30">
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
            {birthdayPersonnel.length > 0 ? (
              <ul className="space-y-6">
                {birthdayPersonnel.map((person) => (
                  <li key={person.name} className="flex flex-col items-start gap-4">
                    <div className="flex items-center gap-4">
                      <Avatar>
                        <AvatarImage src={person.avatarUrl} alt={person.name} />
                        <AvatarFallback>{person.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
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
              <p className="text-muted-foreground text-center py-8">Bugün doğum günü olan mürettebat bulunmamaktadır.</p>
            )}
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
