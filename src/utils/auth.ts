import axios from "axios";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import jwt from 'jsonwebtoken';
import { loginUserDto, userSession } from "./types";


export async function updateAndPassCookies(req: Request) {
    const cookieValue = req.headers.get('cookie');

    const response = await axios.post(
        "http://localhost:3333/auth/update-payload",
        {},
        {
            headers: {
                Cookie: cookieValue,
            },
            withCredentials: true,
        }
    );

    const setCookieHeader = Array.isArray(response.headers['set-cookie']) 
        ? response.headers['set-cookie'].join(', ') 
        : response.headers['set-cookie'] || '';

    const headers = new Headers(req.headers);
    headers.set('Set-Cookie', setCookieHeader);

    return NextResponse.next({
        headers: headers,
    });
}

export function getSession(): userSession | null {
    const cookieStore = cookies();
    const accessToken = cookieStore.get('accessToken');

    let userInfo = null;

    if (accessToken?.value) {
        try {
            userInfo = jwt.decode(accessToken.value) as userSession;
        } catch (error) {
            console.error('Error decoding token:', error);
        }
    }
    return userInfo;
}



export const logoutUser = async () => {
    const cookieStore = cookies();
    cookieStore.delete('accessToken');
    cookieStore.delete('refreshToken');
}
