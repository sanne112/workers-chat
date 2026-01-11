import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Chat from './components/Chat';
import LoginWithGitHub from './components/LoginWithGitHub';
import OnlineCount from './components/OnlineCount';
import './styles/global.css';

const App: React.FC = () => {
    return (
        <Router>
            <div className="app">
                <header>
                    <h1>Welcome to the Chat Room</h1>
                    <OnlineCount />
                    <LoginWithGitHub />
                </header>
                <main>
                    <Switch>
                        <Route path="/" component={Chat} />
                    </Switch>
                </main>
            </div>
        </Router>
    );
};

export default App;