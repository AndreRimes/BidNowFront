// /api/auth/login/route.ts
export async function POST(req: Request) {
    const { email, password } = await req.json();

    if (!email || !password) {
        return Response.json({ message: "Email e/ou senha inválidos" });
    }

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACK_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include', // Important for handling cookies
            body: JSON.stringify({email, password}),
        });
        
        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.message || 'Login failed');
        }

        const setCookieHeader = response.headers.get('set-cookie');

        return new Response(JSON.stringify({ user: data.user }), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
                'Set-Cookie': setCookieHeader || '',
                'Access-Control-Allow-Credentials': 'true',
                'Access-Control-Allow-Origin': 'https://bidnow.andrerimes.com'
            }
        });
    } catch (error) {
        return new Response(JSON.stringify({ message: 'Login failed' }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
}