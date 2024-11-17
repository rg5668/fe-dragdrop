import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    // if (request.nextUrl.pathname === '/') {
    //     // /auth/login으로 리다이렉트
    //     return NextResponse.redirect(new URL('/auth/login', request.url));
    // }
    return NextResponse.next();
}

// 특정 경로에서만 동작하도록 설정
export const config = {
    matcher: ['/', '/auth'], // 리다이렉션할 경로를 지정
};
