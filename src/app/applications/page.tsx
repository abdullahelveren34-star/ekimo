import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { applications } from '@/lib/data';
import { MoreHorizontal } from 'lucide-react';

const statusColors: { [key: string]: 'default' | 'secondary' | 'outline' | 'destructive' } = {
  'Yeni': 'default',
  'Değerlendirme': 'secondary',
  'Mülakat': 'outline',
  'Teklif': 'default', // Using default to highlight
  'Reddedildi': 'destructive',
};

export default function ApplicationsPage() {
  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-bold text-foreground">Başvuru Takibi</h1>
        <p className="text-muted-foreground mt-1">Aday başvurularını ve işe alım sürecini yönetin.</p>
      </header>
      <Card>
        <CardHeader>
          <CardTitle>Tüm Başvurular</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Aday</TableHead>
                <TableHead className="hidden md:table-cell">Pozisyon</TableHead>
                <TableHead className="hidden lg:table-cell">Başvuru Tarihi</TableHead>
                <TableHead>Durum</TableHead>
                <TableHead>
                  <span className="sr-only">Eylemler</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {applications.map((app) => (
                <TableRow key={app.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-9 w-9">
                        <AvatarImage src={app.avatarUrl} alt={app.candidateName} data-ai-hint="person face" />
                        <AvatarFallback>{app.candidateName.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="font-medium">{app.candidateName}</div>
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">{app.jobTitle}</TableCell>
                  <TableCell className="hidden lg:table-cell">{app.appliedDate}</TableCell>
                  <TableCell>
                    <Badge variant={statusColors[app.status] || 'secondary'}>{app.status}</Badge>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button aria-haspopup="true" size="icon" variant="ghost">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Menüyü aç</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Profili Görüntüle</DropdownMenuItem>
                        <DropdownMenuItem>Durumu Güncelle</DropdownMenuItem>
                        <DropdownMenuItem>Reddet</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
