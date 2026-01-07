'use client';

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { currentUser } from "@/lib/data";

export function UserProfile() {
    return (
        <div className="flex items-center gap-3">
            <div className="text-right">
                <p className="font-semibold text-sm">{currentUser.name}</p>
                <p className="text-xs text-muted-foreground">{currentUser.title}</p>
            </div>
            <Avatar>
                <AvatarImage src={currentUser.avatarUrl} alt={currentUser.name} />
                <AvatarFallback>{currentUser.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
            </Avatar>
        </div>
    );
}
