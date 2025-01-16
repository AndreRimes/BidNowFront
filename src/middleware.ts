import { NextResponse } from "next/server";
import { getSession, updateAndPassCookies } from "./utils/auth";


export default async function middleware(req: Request) {
    const url = req.url;
    const isRootPath = url.endsWith("/");


    const user = getSession();


    if (isRootPath && user !== null) {
        const newUrl = new URL(req.url);
        newUrl.pathname = '/userDashboard';
        return NextResponse.redirect(newUrl);
    }
    const isUserDashboardPath = url.endsWith("/userDashboard");

    if (isUserDashboardPath && user === null) {
        const newUrl = new URL(req.url);
        newUrl.pathname = '/auth/login';
        return NextResponse.redirect(newUrl);
    }

    const isCreateProjectPath = url.endsWith("/createProject");
    
    if (isCreateProjectPath && user === null) {
        const newUrl = new URL(req.url);
        newUrl.pathname = '/auth/login';
        return NextResponse.redirect(newUrl);
    }

    const isProfilePath = url.endsWith("/profile");

    if (isProfilePath && user === null) {
        const newUrl = new URL(req.url);
        newUrl.pathname = '/auth/login';
        return NextResponse.redirect(newUrl);
    }

    if(!user){
        return NextResponse.next();
    }


    return updateAndPassCookies(req);    
}