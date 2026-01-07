import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { boardMembers } from '@/lib/data';
import Image from 'next/image';

export default function HomePage() {
  return (
    <div className="flex flex-col gap-8">
      <header>
        <h1 className="text-3xl font-bold text-foreground">Ana Sayfa</h1>
        <p className="text-muted-foreground mt-1">E-Kimo insan kaynakları merkezinize hoş geldiniz.</p>
      </header>

      <section>
        <h2 className="text-2xl font-bold text-foreground mb-4">Yönetim Kurulu</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {boardMembers.map((member) => (
            <Card key={member.name}>
              <CardContent className="flex flex-col items-center text-center p-6">
                <Avatar className="h-24 w-24 mb-4">
                  <AvatarImage src={member.avatarUrl} alt={member.name} />
                  <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <h3 className="text-lg font-semibold text-foreground">{member.name}</h3>
                <p className="text-sm text-muted-foreground">{member.title}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
