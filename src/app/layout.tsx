import type { Metadata } from 'next';
import { Inter, Poppins, Pacifico } from 'next/font/google';
import './globals.css';
import { SidebarProvider, Sidebar, SidebarInset } from '@/components/ui/sidebar';
import { SidebarNav } from '@/components/layout/sidebar-nav';
import { Toaster } from '@/components/ui/toaster';
import { UserProfile } from '@/components/layout/user-profile';
import { FirebaseClientProvider } from '@/firebase';
import { FirebaseErrorListener } from '@/components/FirebaseErrorListener';
import { cn } from '@/lib/utils';

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
          <SidebarProvider>
            <Sidebar>
              <SidebarNav />
            </Sidebar>
            <SidebarInset>
              <div className="flex flex-col min-h-screen">
                <header className="flex items-center justify-end p-4 border-b">
                    <UserProfile />
                </header>
                <main className="flex-grow p-4 sm:p-6 lg:p-8">
                  {children}
                </main>
              </div>
            </SidebarInset>
          </SidebarProvider>
        </FirebaseClientProvider>
        <Toaster />
      </body>
    </html>
  );
}
