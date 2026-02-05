'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { screenResume } from '@/app/ai-screener/actions';
import type { AIResumeScreeningOutput } from '@/ai/flows/ai-resume-screening';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { toast } from '@/hooks/use-toast';
import { Wand2, Loader2, Star, ThumbsDown } from 'lucide-react';
import { Label } from '@/components/ui/label';

const formSchema = z.object({
  jobDescription: z.string().min(50, 'İş tanımı en az 50 karakter olmalıdır.'),
  keywords: z.string().min(3, 'En az bir anahtar kelime girin.'),
  resumeText: z.string().min(100, 'Özgeçmiş metni en az 100 karakter olmalıdır.'),
});

type FormValues = z.infer<typeof formSchema>;

export function AIScreenerForm() {
  const [result, setResult] = useState<AIResumeScreeningOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      jobDescription: '',
      keywords: '',
      resumeText: '',
    },
  });

  async function onSubmit(values: FormValues) {
    setIsLoading(true);
    setResult(null);
    const response = await screenResume(values);
    setIsLoading(false);

    if (response.success && response.data) {
      setResult(response.data);
      toast({
        title: "Tarama Tamamlandı!",
        description: "Aday özgeçmişi başarıyla analiz edildi.",
      });
    } else {
      toast({
        variant: "destructive",
        title: "Hata",
        description: response.error,
      });
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <Card>
        <CardHeader>
          <CardTitle>Aday Bilgileri</CardTitle>
          <CardDescription>Analiz edilecek özgeçmiş ve iş detaylarını girin.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="jobDescription"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>İş Tanımı</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Kıdemli Yazılım Mühendisi pozisyonu için iş tanımını yapıştırın..." {...field} rows={6} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="keywords"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Anahtar Kelimeler</FormLabel>
                    <FormControl>
                      <Input placeholder="örn. React, Node.js, TypeScript" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="resumeText"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Özgeçmiş Metni</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Adayın özgeçmiş metnini buraya yapıştırın..." {...field} rows={10} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isLoading} className="w-full">
                {isLoading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Wand2 className="mr-2 h-4 w-4" />
                )}
                Özgeçmişi Tara
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Analiz Sonuçları</CardTitle>
          <CardDescription>AI tarafından oluşturulan analiz ve uygunluk skoru.</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading && (
            <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
              <Loader2 className="h-16 w-16 animate-spin text-primary mb-4" />
              <p>AI analiz ediyor...</p>
              <p className="text-sm">Bu işlem birkaç saniye sürebilir.</p>
            </div>
          )}
          {result && (
            <div className="space-y-6">
              <div>
                <Label className="text-sm font-medium">Uygunluk Skoru</Label>
                <div className="flex items-center gap-3 mt-2">
                  <Progress value={result.suitabilityScore} className="w-full h-3" />
                  <span className="font-bold text-lg text-primary">{result.suitabilityScore}%</span>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="font-semibold flex items-center gap-2"><Star className="h-5 w-5 text-yellow-500" /> Anahtar Nitelikler</h3>
                <p className="text-sm text-muted-foreground bg-secondary p-3 rounded-md">{result.keyQualifications}</p>
              </div>

              <div className="space-y-2">
                <h3 className="font-semibold flex items-center gap-2"><ThumbsDown className="h-5 w-5 text-red-500" /> Geri Bildirim ve İyileştirme Alanları</h3>
                <p className="text-sm text-muted-foreground bg-secondary p-3 rounded-md">{result.feedback}</p>
              </div>
            </div>
          )}
          {!isLoading && !result && (
            <div className="flex items-center justify-center h-full text-center text-muted-foreground">
              <p>Analiz sonuçları burada görünecektir.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
