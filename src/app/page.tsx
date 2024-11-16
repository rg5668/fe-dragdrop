'use client';
import KanbanBoard from '@/components/KanbanBoard';

export default function Home() {
    return (
        <div className="flex justify-center p-5 overflow-hidden">
            <KanbanBoard />
        </div>
    );
}
