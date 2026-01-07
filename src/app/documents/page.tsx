import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { documents } from '@/lib/data';
import { Download, Eye, PlusCircle } from 'lucide-react';

export default function DocumentsPage() {
  return (
    <div className="space-y-8">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Belge Yönetimi</h1>
          <p className="text-muted-foreground mt-1">Çalışan belgelerini güvenli bir şekilde saklayın ve yönetin.</p>
        </div>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Yeni Belge Yükle
        </Button>
      </header>

      <Card>
        <CardHeader>
          <CardTitle>Tüm Belgeler</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Belge Adı</TableHead>
                <TableHead className="hidden sm:table-cell">Tür</TableHead>
                <TableHead className="hidden md:table-cell">Yükleme Tarihi</TableHead>
                <TableHead className="hidden lg:table-cell">Boyut</TableHead>
                <TableHead className="text-right">Eylemler</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {documents.map((doc) => (
                <TableRow key={doc.id}>
                  <TableCell className="font-medium">{doc.name}</TableCell>
                  <TableCell className="hidden sm:table-cell">{doc.type}</TableCell>
                  <TableCell className="hidden md:table-cell">{doc.uploadDate}</TableCell>
                  <TableCell className="hidden lg:table-cell">{doc.size}</TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button variant="ghost" size="icon">
                      <Eye className="h-4 w-4" />
                      <span className="sr-only">Görüntüle</span>
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Download className="h-4 w-4" />
                      <span className="sr-only">İndir</span>
                    </Button>
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
