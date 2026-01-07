import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { boardMembers, textileNews } from '@/lib/data';
import Image from 'next/image';

export default function HomePage() {
  const chairman = boardMembers.find(member => member.title === 'Yönetim Kurulu Başkanı');

  return (
    <div className="flex flex-col gap-8">
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
                  "Sevgili E-Kimo ailesi,
                  <br/><br/>
                  Kurulduğumuz ilk günden beri en büyük gücümüz, yenilikçi ruhumuz ve birbirine kenetlenmiş ekibimiz oldu. Hep birlikte daha nice başarılara imza atacağımıza ve sektördeki öncü konumumuzu daha da güçlendireceğimize inancım tam. Katkılarınız ve bağlılığınız için her birinize ayrı ayrı teşekkür ederim."
                </p>
              </div>
            </div>
          </Card>
        </section>
      )}

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
    </div>
  );
}
