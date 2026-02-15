'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useUser } from '@/firebase';
import { SidebarProvider, Sidebar, SidebarInset } from '@/components/ui/sidebar';
import { SidebarNav } from '@/components/layout/sidebar-nav';
import { UserProfile } from '@/components/layout/user-profile';
import { Loader2 } from 'lucide-react';

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, isUserLoading } = useUser();

  const isAuthPage = pathname === '/login' || pathname === '/signup';
  const isPublicPage = isAuthPage;

  useEffect(() => {
    if (isUserLoading) return;

    // Use user.isAnonymous to distinguish between signed-in and anonymous users
    const isAuthenticated = user && !user.isAnonymous;

    if (!isAuthenticated && !isPublicPage) {
      router.push('/login');
    }
    
    if (isAuthenticated && isAuthPage) {
      router.push('/');
    }

  }, [user, isUserLoading, isPublicPage, router, isAuthPage, pathname]);
  
  if (isUserLoading && !isPublicPage) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  // For auth pages, render children without the main layout
  if (isAuthPage) {
    return <>{children}</>;
  }
  
  // For protected pages, if user is not authenticated yet, don't render anything while redirecting
  const isAuthenticated = user && !user.isAnonymous;
  if (!isAuthenticated && !isPublicPage) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  // Render the main app layout for authenticated users on protected pages
  return (
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
  );
}
