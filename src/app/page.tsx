'use client';

import KanbanBoard from '@/components/KanbanBoard';

export default function Home() {
    return (
        <div className="flex flex-col gap-2 md:flex-row justify-center p-5 overflow-hidden">
            <KanbanBoard />
        </div>
    );
}
