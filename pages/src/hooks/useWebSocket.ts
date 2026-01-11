import { useEffect, useRef, useState } from 'react';

const useWebSocket = (url: string) => {
    const [messages, setMessages] = useState<string[]>([]);
    const [onlineCount, setOnlineCount] = useState<number>(0);
    const socketRef = useRef<WebSocket | null>(null);

    useEffect(() => {
        socketRef.current = new WebSocket(url);

        socketRef.current.onopen = () => {
            console.log('WebSocket connection established');
        };

        socketRef.current.onmessage = (event) => {
            const data = JSON.parse(event.data);
            if (data.type === 'message') {
                setMessages((prevMessages) => [...prevMessages, data.payload]);
            } else if (data.type === 'onlineCount') {
                setOnlineCount(data.payload);
            }
        };

        socketRef.current.onclose = () => {
            console.log('WebSocket connection closed');
        };

        return () => {
            socketRef.current?.close();
        };
    }, [url]);

    const sendMessage = (message: string) => {
        if (socketRef.current) {
            socketRef.current.send(JSON.stringify({ type: 'message', payload: message }));
        }
    };

    return { messages, onlineCount, sendMessage };
};

export default useWebSocket;