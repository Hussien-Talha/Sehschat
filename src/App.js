import React from 'react';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Profile from './components/Profile';
import ContactList from './components/ContactList';
import Chat from './components/Chat';
import Group from './components/Group';
import Settings from './components/Settings';
import ChatMenu from './components/ChatMenu';
import AuthService from './services/AuthService';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkUser = async () => {
      const currentUser = await AuthService.getCurrentUser();
      setUser(currentUser);
    };

    checkUser();
  }, []);

  return (
    <Router>
      <div className="App">
        <Header user={user} />
        <Switch>
          <Route exact path="/">
            <Profile user={user} />
          </Route>
          <Route path="/contacts">
            <ContactList user={user} />
          </Route>
          <Route path="/chat/:id">
            <Chat user={user} />
          </Route>
          <Route path="/group/:id">
            <Group user={user} />
          </Route>
          <Route path="/settings">
            <Settings user={user} />
          </Route>
          <Route path="/chat-menu">
            <ChatMenu user={user} />
          </Route>
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
