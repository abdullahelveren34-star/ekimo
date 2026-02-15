'use client';

import { useMemo } from "react";
import { useRouter } from "next/navigation";
import { useFirebase, useDoc } from "@/firebase";
import { signOut } from "firebase/auth";
import { doc } from "firebase/firestore";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { LogOut, Settings } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "../ui/skeleton";

interface UserProfileDoc {
    firstName: string;
    lastName: string;
    email: string;
}

export function UserProfile() {
    const { user, auth, firestore } = useFirebase();
    const router = useRouter();
    const { toast } = useToast();

    const userProfileRef = useMemo(() => {
        if (!user || !firestore) return null;
        return doc(firestore, 'userProfiles', user.uid);
    }, [user, firestore]);

    const { data: userProfile, isLoading } = useDoc<UserProfileDoc>(userProfileRef);

    const handleLogout = async () => {
        if (!auth) return;
        try {
            await signOut(auth);
            toast({ title: "Başarıyla çıkış yapıldı." });
            router.push('/login');
        } catch (error) {
            toast({ variant: 'destructive', title: 'Çıkış yapılamadı.' });
        }
    };
    
    if (isLoading || !user) {
        return (
            <div className="flex items-center gap-3">
                <div className="text-right hidden md:block">
                    <Skeleton className="h-4 w-20 mb-1" />
                    <Skeleton className="h-3 w-28" />
                </div>
                <Skeleton className="h-10 w-10 rounded-full" />
            </div>
        );
    }

    const name = userProfile ? `${userProfile.firstName} ${userProfile.lastName}` : user.email?.split('@')[0] || 'Kullanıcı';
    const email = user.email || 'No email';
    const initials = (userProfile ? `${userProfile.firstName[0]}${userProfile.lastName[0]}` : user.email?.[0] || 'U').toUpperCase();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-3 h-auto p-0">
                    <div className="text-right hidden md:block">
                        <p className="font-semibold text-sm">{name}</p>
                        <p className="text-xs text-muted-foreground">{email}</p>
                    </div>
                    <Avatar>
                        <AvatarFallback>{initials}</AvatarFallback>
                    </Avatar>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">{name}</p>
                        <p className="text-xs leading-none text-muted-foreground">
                            {email}
                        </p>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Ayarlar</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Çıkış Yap</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
