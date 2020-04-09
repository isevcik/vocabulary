import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";

import './App.css';
import { firebaseApp } from "./firebase";
import { Home } from './Home';
import { Login } from './Login';

const App: React.FC = () => {
  const [user, setUser] = useState();
  const [initialized, setInitialized] = useState(false);

  const handleLogin = user => {
    setUser(user);
    setInitialized(true);
  }

  useEffect(() => {
    firebaseApp.auth().onAuthStateChanged(handleLogin);
  }, [])

  return (
    <div className="App">
      <button onClick={() => firebaseApp.auth().signOut()}>Logout</button>

      {initialized && (
        <Router>
          <Switch>
            <Route exact path="/">
              {user ? <Home></Home> : <Redirect to="/login"></Redirect>}
            </Route>
            <Route path="/login">
              <Login onLogin={handleLogin}></Login>
            </Route>
          </Switch>
        </Router>
      )}
    </div >
  );
}

export default App;

