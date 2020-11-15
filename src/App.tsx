import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch, Link } from "react-router-dom";

import './App.css';
import { firebaseApp } from "./api/firebase";
import { Home } from './Home';
import { Login } from './Login';
import { Spinner } from './components/Spinner';
import { Recent } from './pages/Recent';
import { Favorites } from './pages/Favorites';

const App: React.FC = () => {
  const [user, setUser] = useState();
  const [initialized, setInitialized] = useState(false);

  const handleLogin = fbUser => {
    setUser(fbUser);
    setInitialized(true);
  }

  useEffect(() => {
    firebaseApp.auth().onAuthStateChanged(handleLogin);
  }, [])

  return (
    <div className="App">
      {/* <button onClick={() => firebaseApp.auth().signOut()}>Logout</button> */}

      {!initialized
        ? <Spinner></Spinner>
        : (
          <Router>
            <div className="App__router">
              <Link to="/">Recent</Link>
              <Link to="/favorites">Favorites</Link>
            </div>
            <Switch>
              <Route exact path="/">
                {user ? <Recent></Recent> : <Redirect to="/login"></Redirect>}
              </Route>
              <Route path="/favorites">
                <Favorites></Favorites>
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

