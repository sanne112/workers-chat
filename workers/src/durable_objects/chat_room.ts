import { DurableObject } from '@cloudflare/workers-types';

export interface ChatRoomState extends DurableObject {
    fetch(request: Request): Promise<Response>;
    sendMessage(message: string, user: string): void;
    getOnlineCount(): number;
}

export class ChatRoom implements ChatRoomState {
    private messages: Array<{ user: string; message: string }> = [];
    private onlineUsers: Set<string> = new Set();

    constructor(private state: DurableObjectState) {}

    async fetch(request: Request): Promise<Response> {
        const url = new URL(request.url);
        const path = url.pathname;

        if (request.method === 'POST' && path === '/send') {
            const { user, message } = await request.json();
            this.sendMessage(message, user);
            return new Response('Message sent', { status: 200 });
        } else if (request.method === 'GET' && path === '/messages') {
            return new Response(JSON.stringify(this.messages), {
                headers: { 'Content-Type': 'application/json' },
            });
        } else if (request.method === 'GET' && path === '/online-count') {
            return new Response(JSON.stringify({ count: this.getOnlineCount() }), {
                headers: { 'Content-Type': 'application/json' },
            });
        }

        return new Response('Not found', { status: 404 });
    }

    sendMessage(message: string, user: string): void {
        this.messages.push({ user, message });
        this.state.storage.put('messages', this.messages);
    }

    getOnlineCount(): number {
        return this.onlineUsers.size;
    }

    addUser(user: string): void {
        this.onlineUsers.add(user);
    }

    removeUser(user: string): void {
        this.onlineUsers.delete(user);
    }
}