import React from 'react';

interface MessageProps {
    username: string;
    content: string;
    timestamp: string;
    imageUrl?: string;
}

const Message: React.FC<MessageProps> = ({ username, content, timestamp, imageUrl }) => {
    return (
        <div className="message">
            <div className="message-header">
                <strong>{username}</strong> <span>{new Date(timestamp).toLocaleTimeString()}</span>
            </div>
            <div className="message-content">
                <p>{content}</p>
                {imageUrl && <img src={imageUrl} alt="Uploaded content" className="message-image" />}
            </div>
        </div>
    );
};

export default Message;