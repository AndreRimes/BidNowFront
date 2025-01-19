import { logoutUser } from "@/utils/auth";
import { NextResponse } from "next/server";


export async function GET() {
    const response = NextResponse.next();
    
    response.cookies.delete('accessToken');
    response.cookies.delete('refreshToken');
    logoutUser();

    return response;
}