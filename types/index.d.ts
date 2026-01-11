// This file contains TypeScript type definitions used throughout the project.

declare module 'chat' {
    export interface Message {
        id: string;
        userId: string;
        content: string;
        timestamp: number;
        imageUrl?: string;
    }

    export interface User {
        id: string;
        username: string;
        online: boolean;
    }

    export interface ChatRoom {
        id: string;
        messages: Message[];
        users: User[];
    }

    export interface OnlineCount {
        count: number;
    }
}