import React, { useEffect, useState } from 'react';
import { useWebSocket } from '../hooks/useWebSocket';
import Message from './Message';
import ImageUpload from './ImageUpload';
import OnlineCount from './OnlineCount';

const Chat: React.FC = () => {
    const [messages, setMessages] = useState<any[]>([]);
    const [onlineCount, setOnlineCount] = useState(0);
    const { sendMessage, messages: wsMessages } = useWebSocket();

    useEffect(() => {
        const handleNewMessage = (message: any) => {
            setMessages((prevMessages) => [...prevMessages, message]);
        };

        const handleOnlineCountUpdate = (count: number) => {
            setOnlineCount(count);
        };

        wsMessages.forEach((message) => {
            if (message.type === 'chat') {
                handleNewMessage(message);
            } else if (message.type === 'onlineCount') {
                handleOnlineCountUpdate(message.count);
            }
        });
    }, [wsMessages]);

    const handleSendMessage = (text: string) => {
        sendMessage({ type: 'chat', text });
    };

    return (
        <div className="chat-container">
            <OnlineCount count={onlineCount} />
            <div className="messages">
                {messages.map((msg, index) => (
                    <Message key={index} message={msg} />
                ))}
            </div>
            <ImageUpload onUpload={(url) => handleSendMessage(url)} />
            <input
                type="text"
                placeholder="Type your message..."
                onKeyDown={(e) => {
                    if (e.key === 'Enter' && e.currentTarget.value) {
                        handleSendMessage(e.currentTarget.value);
                        e.currentTarget.value = '';
                    }
                }}
            />
        </div>
    );
};

export default Chat;