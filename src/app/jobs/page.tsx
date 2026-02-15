'use client';

import { useMemo } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, PlusCircle, Loader2 } from 'lucide-react';
import { useCollection, useFirebase } from '@/firebase';
import { collection } from 'firebase/firestore';

// Define the type for a job posting, matching the Firestore structure
interface JobPosting {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  description: string;
}

export default function JobsPage() {
  const { firestore } = useFirebase();

  const jobPostingsQuery = useMemo(() => {
    if (!firestore) return null;
    return collection(firestore, 'jobPostings');
  }, [firestore]);

  const { data: jobPostings, isLoading } = useCollection<JobPosting>(jobPostingsQuery);

  return (
    <div className="space-y-8">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-primary">İş İlanları</h1>
          <p className="text-muted-foreground mt-1">Şirketimizdeki açık pozisyonları keşfedin.</p>
        </div>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Yeni İş İlanı
        </Button>
      </header>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobPostings && jobPostings.length > 0 ? (
            jobPostings.map((job) => (
              <Card key={job.id} className="flex flex-col">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-lg">{job.title}</CardTitle>
                    <Badge variant="outline">{job.department}</Badge>
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground pt-1">
                    <MapPin className="h-4 w-4 mr-1.5" />
                    {job.location}
                  </div>
                </CardHeader>
                <CardContent className="flex-grow">
                  <CardDescription>{job.description}</CardDescription>
                </CardContent>
                <CardFooter className="flex justify-between items-center">
                  <Badge variant="secondary">{job.type}</Badge>
                  <div className="space-x-2">
                    <Button variant="ghost">Detaylar</Button>
                    <Button>Başvur</Button>
                  </div>
                </CardFooter>
              </Card>
            ))
          ) : (
             <div className="col-span-full text-center py-16 text-muted-foreground">
                <p>Şu anda aktif iş ilanı bulunmamaktadır.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
