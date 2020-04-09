import React, { useEffect, useState } from "react";

import { translate, TranslationResult } from "./api/translate";
import { firebaseApp } from "./firebase";
import { SearchBar } from "./SearchBar";
import { TranslationItem } from "./TranslationItem";
import { TranslationItemList } from "./TranslationItemList";

export const Home = () => {
  const [term, setTerm] = useState();
  const [translationResult, setTranslationResult] = useState<TranslationResult>();
  const [favorites, setFavorites] = useState<TranslationResult[]>();

  const handleSubmit = (term: string) => {
    setTerm(term);
    translate(term).then(result => setTranslationResult(result));
  }

  const handleAddToFavoriteClick = () => {
    firebaseApp.database().ref("favorite").update({
      [term]: { ...translationResult, date: new Date() }
    });
  }

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
