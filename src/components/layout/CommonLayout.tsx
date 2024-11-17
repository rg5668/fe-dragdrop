'use client';

import ModeToggle from '@/components/layout/ModeToggle';
import Header from '@/components/layout/header/Header';
import Sidebar from '@/components/layout/sidebar/Sidebar';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';
import React from 'react';

export default function CommonLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    const isAuthRoute = pathname.startsWith('/auth');

    return (
        <>
            {!isAuthRoute ? (
                <Sidebar>
                    <Header />
                    <div className={cn('pt-20')}>{children}</div>
                    <ModeToggle />
                </Sidebar>
            ) : (
                <>
                    <div>{children}</div>
                    <ModeToggle />
                </>
            )}
        </>
    );
}
