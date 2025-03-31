import { NextResponse } from "next/server";


export async function GET() {
    const response = new NextResponse();
    
    response.cookies.delete({
        name: 'accessToken',
        path: '/',
        domain: '.andrerimes.com',
        secure: true,
        sameSite: 'strict'
    });
    
    response.cookies.delete({
        name: 'refreshToken',
        path: '/',
        domain: '.andrerimes.com',
        secure: true,
        sameSite: 'strict'
    });

    return response;
}