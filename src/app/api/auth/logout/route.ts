import { logoutUser } from "@/utils/auth";


export async function GET() {
    logoutUser();
    return new Response("ok", { status: 200 });
}