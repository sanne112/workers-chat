import React from 'react';

const LoginWithGitHub: React.FC = () => {
    const handleLogin = async () => {
        const response = await fetch('/api/auth/github', {
            method: 'GET',
            credentials: 'include',
        });
        if (response.ok) {
            window.location.href = response.url;
        } else {
            console.error('GitHub login failed');
        }
    };

    return (
        <div className="login-container">
            <h2>登录到聊天室</h2>
            <button onClick={handleLogin} className="github-login-button">
                使用 GitHub 登录
            </button>
        </div>
    );
};

export default LoginWithGitHub;