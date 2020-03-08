import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";
import { translate, TranslationResult } from './api/translate';
import './App.css';
import { firebaseApp } from "./firebase";
import { Login } from './Login';
import { SearchBar } from './SearchBar';
import { TranslationItem } from './TranslationItem';
import { TranslationItemList } from './TranslationItemList';

let ref: firebase.database.Reference;

const App: React.FC = () => {
  const [term, setTerm] = useState("dog");
  const [translationResult, setTranslationResult] = useState<TranslationResult>();
  const [favorites, setFavorites] = useState<TranslationResult[]>();
  const [user, setUser] = useState();
  const [initialized, setInitialized] = useState(false);

  const handleAddToFavoriteClick = () => {
    ref.update({
      [term]: translationResult
    });
  }

  const handleSubmit = (term: string) => {
    translate(term).then(result => setTranslationResult(result));
  }

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

const Home = () => {
  const handleSubmit = null;
  const translationResult = null;
  const handleAddToFavoriteClick = null;
  const [favorites, setFavorites] = useState();

  useEffect(() => {
    firebaseApp.database().ref("favorite").on("value", (snapshot) => {
      const value = snapshot.val();
      setFavorites(Object.entries<TranslationResult>(value).map(([k, v]) => v));
    })
  }, []);

  return (
    <div>
      <SearchBar onSubmit={handleSubmit}></SearchBar>
      {translationResult && <TranslationItem translationResult={translationResult} onAddToFavoriteClick={handleAddToFavoriteClick}></TranslationItem>}
      <div>
        Favorites
        <TranslationItemList items={favorites}></TranslationItemList>
      </div>
    </div>
  )
}

export default App;

