import { api } from "@/utils/api";


export async function POST(req: Request ) {
    const { email, password } = await req.json();

    if (!email || !password) {
        return Response.json({ message: "Email e/ou senha inválidos" });
    }

    const response = await api.post("/auth/login", {email, password});

    const setCookieHeader = Array.isArray(response.headers['set-cookie']) ? response.headers['set-cookie'].join(', ') : response.headers['set-cookie'] || '';

    return new Response(JSON.stringify({ user: response.data.user }), {
        status: 200,
        headers: {
            'Content-Type': 'application/json',
            'Set-Cookie': setCookieHeader
        }
    });
}

