import type { Metadata } from 'next';
import './globals.css';
import { SidebarProvider, Sidebar, SidebarInset } from '@/components/ui/sidebar';
import { SidebarNav } from '@/components/layout/sidebar-nav';
import { Toaster } from '@/components/ui/toaster';
import { UserProfile } from '@/components/layout/user-profile';
import { FirebaseClientProvider } from '@/firebase';

export const metadata: Metadata = {
  title: 'E-Kimo',
  description: 'Gelişmiş İnsan Kaynakları Portalı',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        <FirebaseClientProvider>
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
