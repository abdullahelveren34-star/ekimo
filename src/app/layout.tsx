import type { Metadata } from 'next';
import { Inter, Poppins, Pacifico } from 'next/font/google';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { FirebaseClientProvider } from '@/firebase';
import { FirebaseErrorListener } from '@/components/FirebaseErrorListener';
import { cn } from '@/lib/utils';
import { AppShell } from '@/components/layout/app-shell';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['600', '700'],
  variable: '--font-poppins',
});

const pacifico = Pacifico({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-pacifico',
});


export const metadata: Metadata = {
  title: 'E-Kimo HR Portal',
  description: 'İnsan Kaynakları Yönetim Portalı',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className="dark">
      <body className={cn(
        "font-sans antialiased",
        inter.variable,
        poppins.variable,
        pacifico.variable
      )}>
        <FirebaseClientProvider>
          <FirebaseErrorListener />
          <AppShell>{children}</AppShell>
        </FirebaseClientProvider>
        <Toaster />
      </body>
    </html>
  );
}
