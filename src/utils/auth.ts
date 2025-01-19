import axios from "axios";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import jwt from 'jsonwebtoken';
import { userSession } from "./types";


export async function updateAndPassCookies(req: Request) {
    try {
        const cookieValue = req.headers.get('cookie');

        const response = await axios.post(
            `${process.env.NEXT_PUBLIC_BACK_URL}/auth/update-payload`,
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
    }catch(error){
        console.error(error);
        return NextResponse.next();
    }
}

export function getSession(): userSession | null {
    const cookieStore = cookies();
    const accessToken = cookieStore.get('accessToken');

    let userInfo = null;

    if (accessToken?.value) {
        try {
            userInfo = jwt.decode(accessToken.value) as userSession;


            if (userInfo.exp < Date.now() / 1000) {
                // cookieStore.delete('accessToken');
                // cookieStore.delete('refreshToken');
                return null;
            }

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
