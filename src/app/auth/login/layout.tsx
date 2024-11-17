import React from 'react';

export default function layout({ children }: { children: React.ReactNode }) {
    return <div className="h-screen flex items-center justify-center p-6">{children}</div>;
}
