import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
    //Token will exist if user is logged in
    const token = await getToken({ req, secret: process.env.JWT_SECRET })

    const { pathname } = req.nextUrl;

    // Allow the requests if the following is true..
    // 1.) Its a request for next-auth session & provider fetching
    // 2.) the token exists


    if (pathname.includes('/api/auth') || token) {
        return NextResponse.next();
    }

    //    Redirect then to login page if they dont have token and are requesting a protected route
    if (!token && pathname !== '/login') {
        return NextResponse.redirect('http://localhost:3000/login');
    }
}