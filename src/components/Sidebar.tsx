'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { Menu, Home, Users, Settings, HelpCircle, LogOut, Info, ChevronRight, ChevronLeft } from 'lucide-react';

export default function ImprovedCollapsibleSidebar({ children }: { children: React.ReactNode }) {
    const [isOpen, setIsOpen] = React.useState(false);
    const [isSidebarExpanded, setIsSidebarExpanded] = React.useState(true);

    const NavContent = React.forwardRef<React.ElementRef<'div'>, React.ComponentPropsWithoutRef<'div'>>(
        ({ className, ...props }, ref) => (
            <div className={cn('flex h-full flex-col', className)} ref={ref} {...props}>
                <ScrollArea className="flex-1">
                    <div className="flex flex-col gap-1 p-2">
                        <NavItem icon={Home} label="Home" expanded={isSidebarExpanded} />
                        <NavItem icon={Users} label="Users" expanded={isSidebarExpanded} />
                        <NavItem icon={Settings} label="Settings" expanded={isSidebarExpanded} />
                        <NavItem icon={HelpCircle} label="Help" expanded={isSidebarExpanded} />
                    </div>
                </ScrollArea>
                <div className="mt-auto p-2">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant="ghost"
                                size="sm"
                                className={cn('w-full', isSidebarExpanded ? 'justify-start' : 'justify-center')}
                            >
                                <Info className="h-4 w-4" />
                                {isSidebarExpanded && <span className="ml-2">About</span>}
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-48">
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
        )
    );
    NavContent.displayName = 'NavContent';

    return (
        <div className="flex h-screen">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                    <Button variant="outline" size="icon" className="fixed left-4 top-4 z-40 md:hidden">
                        <Menu className="h-6 w-6" />
                        <span className="sr-only">Toggle navigation menu</span>
                    </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-64 p-0">
                    <SheetHeader className="p-4">
                        <SheetTitle>Navigation</SheetTitle>
                    </SheetHeader>
                    <NavContent />
                </SheetContent>
            </Sheet>
            <div
                className={cn(
                    'hidden md:flex h-screen border-r bg-background transition-all duration-300 ease-in-out',
                    isSidebarExpanded ? 'w-64' : 'w-16'
                )}
            >
                <div className="relative flex h-full w-full flex-col">
                    <div className="flex items-center justify-end p-4">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => setIsSidebarExpanded(!isSidebarExpanded)}
                        >
                            {isSidebarExpanded ? (
                                <ChevronLeft className="h-4 w-4" />
                            ) : (
                                <ChevronRight className="h-4 w-4" />
                            )}
                            <span className="sr-only">{isSidebarExpanded ? 'Collapse sidebar' : 'Expand sidebar'}</span>
                        </Button>
                    </div>
                    <NavContent />
                </div>
            </div>
            <main className="flex-1 overflow-auto">{children}</main>
        </div>
    );
}

function NavItem({ icon: Icon, label, expanded }: { icon: React.ElementType; label: string; expanded: boolean }) {
    return (
        <Button variant="ghost" size="sm" className={cn('w-full', expanded ? 'justify-start' : 'justify-center')}>
            <Icon className="h-4 w-4" />
            {expanded && <span className="ml-2">{label}</span>}
        </Button>
    );
}
