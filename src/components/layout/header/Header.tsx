'use client';

import Breadcrumb from '@/components/layout/header/Breadcrumb';
import React from 'react';

export default function Header() {
    return (
        <header>
            <div className="fixed w-full bg-white dark:bg-black transition-colors">
                <Breadcrumb />
            </div>
        </header>
    );
}
