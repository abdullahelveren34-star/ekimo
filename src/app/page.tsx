'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { boardMembers, textileNews, companyNews, departmentMembers, employeeOfTheMonth } from '@/lib/data';
import Image from 'next/image';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Cake, Gift, Star, Send, Leaf, Clock, Calendar, MapPin, CloudSun } from 'lucide-react';
import { Logo } from '@/components/logo';

type Employee = {
  name: string;
  title: string;
  avatarUrl: string;
  birthDate: string;
};

export default function HomePage() {
  const chairman = boardMembers.find(member => member.title === 'Yönetim Kurulu Başkanı');
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
        // Fetch location
        const locationResponse = await fetch('https://ipapi.co/json/');
        const locationData = await locationResponse.json();
        const city = locationData.city || 'Bilinmiyor';
        setUserCity(city);

        // Fetch weather if city is known
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
      title: 'Başarılı!',
      description: `${name} için tebrik mesajı gönderildi.`,
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
       <section className="flex justify-center p-6 bg-muted/50 rounded-lg -mt-4 -mx-4 sm:-mt-6 sm:-mx-6 lg:-mt-8 lg:-mx-8 mb-4">
        <Logo />
      </section>

       <section>
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <Calendar className="h-5 w-5 text-primary" />
                <span>{formattedDate}</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <Clock className="h-5 w-5 text-primary" />
                <span>{formattedTime}</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <MapPin className="h-5 w-5 text-primary" />
                <span>{userCity}</span>
              </div>
               <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <CloudSun className="h-5 w-5 text-primary" />
                <span>{weather || 'Yükleniyor...'}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      <header>
        <h1 className="text-3xl font-bold text-foreground">Ana Sayfa</h1>
        <p className="text-muted-foreground mt-1">E-Kimo insan kaynakları merkezinize hoş geldiniz.</p>
      </header>
      
      {chairman && (
        <section>
          <Card className="overflow-hidden">
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
                  "Sevgili Kimo Tekstil ailesi,
                  <br/><br/>
                  Kurulduğumuz ilk günden beri en büyük gücümüz, yenilikçi ruhumuz ve birbirine kenetlenmiş ekibimiz oldu. Hep birlikte daha nice başarılara imza atacağımıza ve sektördeki öncü konumumuzu daha da güçlendireceğimize inancım tam. Katkılarınız ve bağlılığınız için her birinize ayrı ayrı teşekkür ederim."
                </p>
              </div>
            </div>
          </Card>
        </section>
      )}

      <section>
        <Card>
          <CardHeader>
            <CardTitle>Şirketimiz Hakkında</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              E-Kimo, 1990 yılında kurulmuş olup, tekstil sektöründe yenilikçi ve sürdürülebilir çözümler sunan lider bir şirkettir. Müşteri memnuniyetini en üst düzeyde tutarak, kaliteli ve çevre dostu ürünler üretmekteyiz. Global pazarda Türkiye'yi gururla temsil etmeye devam ediyoruz.
            </p>
          </CardContent>
        </Card>
      </section>

      <section>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
                <Leaf className="text-green-500" />
                Sürdürülebilirlik Vizyonumuz
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              E-Kimo olarak, geleceğe karşı sorumluluklarımızın bilincindeyiz. Üretim süreçlerimizin her aşamasında çevresel etkiyi en aza indirmeyi hedefliyoruz. Bu doğrultuda, su ve enerji tüketimini azaltan teknolojilere yatırım yapıyor, atık yönetimini önemsiyor ve tedarik zincirimizde sürdürülebilir kaynakları tercih ediyoruz. Amacımız, sadece bugünün değil, gelecek nesillerin de ihtiyaçlarını gözeten bir üretim anlayışını benimsemektir.
            </p>
          </CardContent>
        </Card>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-foreground mb-4">Şirketten Haberler</h2>
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
                  <Card className="h-full flex flex-col">
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
          <h2 className="text-2xl font-bold text-foreground">Tekstil Dünyasından Haberler</h2>
          <p className="text-muted-foreground">Sektördeki son gelişmeler ve trendler.</p>
        </header>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {textileNews.map((news) => (
            <Card key={news.id} className="flex flex-col overflow-hidden">
              <div className="relative h-48 w-full">
                <Image 
                  src={news.imageUrl} 
                  alt={news.title} 
                  fill 
                  className="object-cover" 
                  data-ai-hint={news.imageHint}
                />
              </div>
              <CardHeader>
                <CardTitle>{news.title}</CardTitle>
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
              <Star className="text-yellow-500" />
              Ayın Personeli
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div className="flex items-center gap-6">
              <Avatar className="h-24 w-24">
                <AvatarImage src={employeeOfTheMonth.avatarUrl} alt={employeeOfTheMonth.name} />
                <AvatarFallback>{employeeOfTheMonth.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <div className="space-y-2">
                <h3 className="text-xl font-bold">{employeeOfTheMonth.name}</h3>
                <p className="text-muted-foreground">{employeeOfTheMonth.title}, {employeeOfTheMonth.department}</p>
                <p className="text-sm italic">"{employeeOfTheMonth.reason}"</p>
              </div>
            </div>
            <Button onClick={() => handleCongratulate(employeeOfTheMonth.name)} size="sm" className="self-start">
              <Send className="mr-2 h-4 w-4" />
              Tebrik Et
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Cake className="text-pink-500" />
              Bugün Doğanlar
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
                       <Gift className="mr-2 h-4 w-4 text-red-500" />
                       Tebrik Et
                    </Button>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-muted-foreground text-center py-8">Bugün doğum günü olan çalışanımız bulunmamaktadır.</p>
            )}
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
