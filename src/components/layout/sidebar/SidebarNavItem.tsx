'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export function SidebarNavItem({
    icon: Icon,
    label,
    path,
    expanded,
}: {
    icon: React.ElementType;
    label: string;
    path: string;
    expanded: boolean;
}) {
    return (
        <Button
            asChild
            variant="ghost"
            size="sm"
            className={cn('w-full', expanded ? 'justify-start' : 'justify-center')}
        >
            <Link href={path} title={label}>
                <Icon className="h-4 w-4" />
                {expanded && <span className="ml-2">{label}</span>}
            </Link>
        </Button>
    );
}
