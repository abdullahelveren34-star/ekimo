'use client';

import { useEffect } from 'react';
import { Shield } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useFirebase, useMemoFirebase, useCollection } from '@/firebase';
import { collection, query, where, doc } from 'firebase/firestore';
import { toast } from '@/hooks/use-toast';
import type { ApprovalRequest } from '@/lib/actions';
import { updateDocumentNonBlocking } from '@/firebase/non-blocking-updates';
import { currentUser } from '@/lib/data';

export default function ManagementPage() {
  const { firestore } = useFirebase();

  const requestsQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    return query(
      collection(firestore, "approvalRequests"),
      where("status", "==", "Beklemede")
    );
  }, [firestore]);

  const { data: requests, isLoading, error } = useCollection<ApprovalRequest>(requestsQuery);

  useEffect(() => {
    if (error) {
      console.error("Error fetching approval requests:", error);
      toast({
        variant: "destructive",
        title: "Hata!",
        description: error.message || "Talep verileri alınamadı.",
      });
    }
  }, [error]);

  const handleRequestStatusUpdate = (requestId: string, newStatus: 'Onaylandı' | 'Reddedildi') => {
    if (!firestore) return;
    const requestRef = doc(firestore, "approvalRequests", requestId);
    
    updateDocumentNonBlocking(requestRef, {
      status: newStatus,
      approvalDate: new Date().toISOString(),
    });

    toast({
      title: "Başarılı!",
      description: `Talep başarıyla ${newStatus.toLowerCase()} olarak güncellendi.`
    });
  };

  return (
    <div className="space-y-8">
      <header>
        <div className="flex items-center gap-3">
          <Shield className="h-8 w-8 text-primary" />
          <div>
            <h1 className="text-3xl font-bold text-foreground">Yönetim Paneli</h1>
            <p className="text-muted-foreground mt-1">Onay bekleyen talepleri yönetin.</p>
          </div>
        </div>
      </header>

      <Card>
        <CardHeader>
          <CardTitle>Onay Bekleyen Talepler</CardTitle>
          <CardDescription>
            Aşağıda onayınızı bekleyen taleplerin bir listesi bulunmaktadır.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <p className="text-muted-foreground">Talepler yükleniyor...</p>
          ) : requests && requests.length > 0 ? (
            <div className="space-y-4">
              {requests.map((request) => (
                <Card key={request.id} className="p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div className="flex-grow">
                    <div className="flex items-center gap-3">
                       <p className="font-semibold">{request.details.employeeName || 'Bilinmeyen Çalışan'}</p>
                       <Badge variant="outline">{request.requestType}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      {new Date(request.requestDate).toLocaleDateString('tr-TR')}
                    </p>
                     <p className="text-sm mt-2">{request.details.description || 'Açıklama yok'}</p>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <Button variant="outline" size="sm" onClick={() => handleRequestStatusUpdate(request.id, 'Onaylandı')}>
                      Onayla
                    </Button>
                    <Button variant="destructive" size="sm" onClick={() => handleRequestStatusUpdate(request.id, 'Reddedildi')}>
                      Reddet
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center h-48 border-2 border-dashed rounded-lg">
              <p className="text-muted-foreground">Onay bekleyen talep bulunmamaktadır.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
