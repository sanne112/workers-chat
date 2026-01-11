import { Router } from 'itty-router';
import { getChatRoom } from './durable_objects/chat_room';
import { handleGitHubOAuth } from './github_oauth';
import { uploadImage } from './upload';

const router = Router();

// Middleware to handle CORS
const cors = (request) => {
    return new Response(null, {
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        },
    });
};

// Route for GitHub OAuth login
router.get('/auth/github', async (request) => {
    return handleGitHubOAuth(request);
});

// Route for chat room
router.get('/chat/:roomId', async (request) => {
    const { roomId } = request.params;
    const chatRoom = await getChatRoom(roomId);
    return new Response(JSON.stringify(chatRoom), {
        headers: { 'Content-Type': 'application/json' },
    });
});

// Route for sending messages
router.post('/chat/:roomId/message', async (request) => {
    const { roomId } = request.params;
    const message = await request.json();
    const chatRoom = await getChatRoom(roomId);
    await chatRoom.sendMessage(message);
    return new Response('Message sent', { status: 200 });
});

// Route for image upload
router.post('/upload', async (request) => {
    const image = await request.formData();
    const imageUrl = await uploadImage(image);
    return new Response(JSON.stringify({ url: imageUrl }), {
        headers: { 'Content-Type': 'application/json' },
    });
});

// Handle CORS preflight requests
router.options('*', cors);

// Default route
router.all('*', () => new Response('Not Found', { status: 404 }));

export default {
    fetch: router.handle,
};