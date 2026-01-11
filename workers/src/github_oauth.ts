import { Router } from 'itty-router';
import { fetch } from 'undici';

const router = Router();

const GITHUB_CLIENT_ID = 'YOUR_GITHUB_CLIENT_ID';
const GITHUB_CLIENT_SECRET = 'YOUR_GITHUB_CLIENT_SECRET';
const REDIRECT_URI = 'YOUR_REDIRECT_URI';

router.get('/auth/github', (request) => {
    const url = `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&redirect_uri=${REDIRECT_URI}`;
    return Response.redirect(url);
});

router.get('/auth/github/callback', async (request) => {
    const url = new URL(request.url);
    const code = url.searchParams.get('code');

    const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
        },
        body: JSON.stringify({
            client_id: GITHUB_CLIENT_ID,
            client_secret: GITHUB_CLIENT_SECRET,
            code,
        }),
    });

    const tokenData = await tokenResponse.json();
    const accessToken = tokenData.access_token;

    if (accessToken) {
        const userResponse = await fetch('https://api.github.com/user', {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        const userData = await userResponse.json();
        // Here you would typically create a session or JWT for the user
        return new Response(JSON.stringify(userData), {
            headers: { 'Content-Type': 'application/json' },
        });
    } else {
        return new Response('Authentication failed', { status: 401 });
    }
});

export default {
    fetch: router.handle,
};