'use client';

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { currentUser } from "@/lib/data";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { LogOut, Settings } from "lucide-react";

export function UserProfile() {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-3 h-auto p-0">
                    <div className="text-right hidden md:block">
                        <p className="font-semibold text-sm">{currentUser.name}</p>
                        <p className="text-xs text-muted-foreground">{currentUser.title}</p>
                    </div>
                    <Avatar>
                        <AvatarImage src={currentUser.avatarUrl} alt={currentUser.name} />
                        <AvatarFallback>{currentUser.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">{currentUser.name}</p>
                        <p className="text-xs leading-none text-muted-foreground">
                            {currentUser.email}
                        </p>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Ayarlar</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Çıkış Yap</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
