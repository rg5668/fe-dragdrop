'use client';

import React from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Home, Users, Settings, HelpCircle, Info, LogOut } from 'lucide-react';
import { SidebarNavItem } from './SidebarNavItem';

const paths = [
    {
        label: 'Home',
        icon: Home,
        path: '/',
    },
    {
        label: 'Users',
        icon: Users,
        path: '/',
    },
    {
        label: 'Settings',
        icon: Settings,
        path: '/',
    },
    {
        label: 'HelpCircle',
        icon: HelpCircle,
        path: '/',
    },
];

export const SidebarNavContent = React.forwardRef<
    React.ElementRef<'div'>,
    React.ComponentPropsWithoutRef<'div'> & { expanded: boolean }
>(({ className, expanded, ...props }, ref) => {
    return (
        <div className={cn('flex h-full flex-col', className)} ref={ref} {...props}>
            <ScrollArea className="flex-1">
                <div className="flex flex-col gap-1 p-2">
                    {paths?.map((path, i) => (
                        <SidebarNavItem
                            key={i}
                            icon={path.icon}
                            label={path.label}
                            path={path.path}
                            expanded={expanded}
                        />
                    ))}
                </div>
            </ScrollArea>
            <div className="mt-auto p-2">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            variant="ghost"
                            size="sm"
                            className={cn('w-full', expanded ? 'justify-start' : 'justify-center')}
                        >
                            <Info className="h-4 w-4" />
                            {expanded && <span className="ml-2">About</span>}
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="center" className="w-48">
                        <DropdownMenuItem>
                            <LogOut className="mr-2 h-4 w-4" />
                            Logout
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <Info className="mr-2 h-4 w-4" />
                            About
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    );
});
SidebarNavContent.displayName = 'SidebarNavContent';
