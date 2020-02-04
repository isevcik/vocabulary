import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import './App.css';
import { firebaseApp } from "./firebase";
import { TranslationItem } from './TranslationItem';
import { TranslationResult, translate } from './api/translate';
import { TranslationItemList } from './TranslationItemList';





let ref: firebase.database.Reference;

const App: React.FC = () => {
  const [term, setTerm] = useState("dog");
  const [translationResult, setTranslationResult] = useState<TranslationResult>();
  const [favorites, setFavorites] = useState<TranslationResult[]>();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => setTerm(event.target.value);
  const handleAddToFavoriteClick = () => {
    ref.update({
      [term]: translationResult
    });
  }

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    
    translate(term).then(result => setTranslationResult(result));
  }

  useEffect(() => {
    ref = firebaseApp.database().ref("favorite");

    const onValue = (snapshot) => {
      const value  = snapshot.val();

      setFavorites(Object.entries<TranslationResult>(value).map(([k, v]) => v));
    }

    ref.on("value", onValue);
  }, [])

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <input type="text" value={term} onChange={handleChange}></input>
        <button type="submit">Lookup</button>
      </form>

      {translationResult && <TranslationItem translationResult={translationResult} onAddToFavoriteClick={handleAddToFavoriteClick}></TranslationItem>}

      <div>
        Favorites
        <TranslationItemList items={favorites}></TranslationItemList>
      </div>
    </div>
  );
}

export default App;

