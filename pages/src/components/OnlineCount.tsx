import React, { useEffect, useState } from 'react';

const OnlineCount: React.FC = () => {
    const [onlineCount, setOnlineCount] = useState<number>(0);

    useEffect(() => {
        const socket = new WebSocket('wss://your-websocket-url');

        socket.onmessage = (event) => {
            const data = JSON.parse(event.data);
            if (data.type === 'onlineCount') {
                setOnlineCount(data.count);
            }
        };

        return () => {
            socket.close();
        };
    }, []);

    return (
        <div className="online-count">
            <h2>在线人数: {onlineCount}</h2>
        </div>
    );
};

export default OnlineCount;