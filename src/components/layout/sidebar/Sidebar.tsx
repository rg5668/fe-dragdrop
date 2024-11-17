'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { ChevronLeft, ChevronRight, Menu } from 'lucide-react';
import { cn } from '@/lib/utils';
import { SidebarNavContent } from './SidebarNavContent';

export default function Sidebar({ children }: { children: React.ReactNode }) {
    const [isOpen, setIsOpen] = React.useState(false);
    const [isSidebarExpanded, setIsSidebarExpanded] = React.useState(true);

    return (
        <div className="flex h-screen">
            {/* Mobile Sidebar */}
            <aside>
                <Sheet open={isOpen} onOpenChange={setIsOpen}>
                    <SheetTrigger asChild>
                        <Button variant="outline" size="icon" className="fixed right-4 top-4 z-40 md:hidden">
                            <Menu className="h-6 w-6" />
                            <span className="sr-only">Toggle navigation menu</span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="right" className="w-64 p-0">
                        <SheetHeader className="p-4">
                            <SheetTitle>LOGO</SheetTitle>
                        </SheetHeader>
                        <SidebarNavContent expanded />
                    </SheetContent>
                </Sheet>
            </aside>

            {/* Desktop Sidebar */}

            <aside
                className={cn(
                    'hidden md:flex h-screen border-r bg-background transition-all duration-300 ease-in-out',
                    isSidebarExpanded ? 'w-64' : 'w-16'
                )}
            >
                <Sheet>
                    <div className="relative flex h-full w-full flex-col">
                        <div className="flex items-center justify-between p-4">
                            {isSidebarExpanded && (
                                <SheetHeader className="p-4">
                                    <SheetTitle>LOGO</SheetTitle>
                                </SheetHeader>
                            )}
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
                                <span className="sr-only">
                                    {isSidebarExpanded ? 'Collapse sidebar' : 'Expand sidebar'}
                                </span>
                            </Button>
                        </div>

                        <SidebarNavContent expanded={isSidebarExpanded} />
                    </div>
                </Sheet>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-auto">{children}</main>
        </div>
    );
}
