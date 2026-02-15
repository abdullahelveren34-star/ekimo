'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';
import { useFirebase } from '@/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Loader2, UserPlus } from 'lucide-react';
import { Logo } from '@/components/logo';

const formSchema = z.object({
  firstName: z.string().min(2, 'İsim en az 2 karakter olmalıdır.'),
  lastName: z.string().min(2, 'Soyisim en az 2 karakter olmalıdır.'),
  email: z.string().email('Geçerli bir e-posta adresi girin.'),
  password: z.string().min(6, 'Şifre en az 6 karakter olmalıdır.'),
});

type FormValues = z.infer<typeof formSchema>;

export default function SignUpPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const { auth, firestore } = useFirebase();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { firstName: '', lastName: '', email: '', password: '' },
  });

  async function onSubmit(values: FormValues) {
    if (!auth || !firestore) {
      toast({ variant: 'destructive', title: 'Hata', description: 'Gerekli hizmetler yüklenemedi. Lütfen sayfayı yenileyin.' });
      return;
    }
    setIsLoading(true);
    try {
      const email = values.email.toLowerCase();
      const userCredential = await createUserWithEmailAndPassword(auth, email, values.password);
      const user = userCredential.user;

      // Create user profile in Firestore
      const userProfileRef = doc(firestore, 'userProfiles', user.uid);
      await setDoc(userProfileRef, {
        id: user.uid,
        firstName: values.firstName,
        lastName: values.lastName,
        email: email,
        phone: '',
        title: 'Yeni Kullanıcı',
        department: 'Atanmamış',
        photoUrl: '',
        skills: [],
        experience: '',
      });

      toast({
        title: 'Kayıt Başarılı!',
        description: 'Hesabınız oluşturuldu, panele yönlendiriliyorsunuz...',
      });
      router.push('/');
    } catch (error: any) {
      // For debugging purposes, as requested by the user
      console.error("HATA KODU:", error.code);
      console.error("HATA MESAJI:", error.message);
      alert(`Bir hata oluştu. Kod: ${error.code || 'Bilinmiyor'}\nMesaj: ${error.message}`);


      let userMessage = 'Beklenmedik bir hata oluştu. Lütfen tekrar deneyin.';

      // Handle common Firebase Auth errors
      if (error.code === 'auth/email-already-in-use') {
        userMessage = 'Bu e-posta adresi zaten başka bir hesap tarafından kullanılıyor.';
      } else if (error.code === 'auth/weak-password') {
        userMessage = 'Şifreniz yeterince güçlü değil. En az 6 karakter olmalıdır.';
      } else if (error.code === 'auth/invalid-email') {
        userMessage = 'Girdiğiniz e-posta adresi geçersizdir.';
      } else if (error.message.includes('permission-denied') || error.message.includes('insufficient permissions')) {
        userMessage = 'Kullanıcı profili oluşturulamadı. Lütfen sistem yöneticisi ile iletişime geçin.';
      }
      
      const detailedDescription = `${userMessage} (Hata Kodu: ${error.code || 'Bilinmiyor'})`;

      toast({
        variant: 'destructive',
        title: 'Kayıt Başarısız',
        description: detailedDescription,
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-background to-muted p-4">
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center">
          <Logo className="mx-auto mb-4" />
          <CardTitle className="text-2xl">Yeni Hesap Oluştur</CardTitle>
          <CardDescription>Portalı kullanmaya başlamak için kaydolun.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <Label>İsim</Label>
                      <FormControl>
                        <Input placeholder="Ahmet" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <Label>Soyisim</Label>
                      <FormControl>
                        <Input placeholder="Yılmaz" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <Label>E-posta</Label>
                    <FormControl>
                      <Input type="email" placeholder="ornek@kimotekstil.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <Label>Şifre</Label>
                    <FormControl>
                      <Input type="password" placeholder="••••••••" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={isLoading || !auth || !firestore}>
                {isLoading ? <Loader2 className="animate-spin" /> : <UserPlus className="mr-2" />}
                Hesap Oluştur
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <div className="text-sm text-muted-foreground">
            Zaten bir hesabınız var mı?{' '}
            <Link href="/login" className="text-primary hover:underline">
              Giriş Yapın
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
