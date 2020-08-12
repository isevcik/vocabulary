import React, { useEffect, useState } from "react";

import { translate, TranslationResult } from "./api/translate";
import { firebaseApp } from "./firebase";
import { SearchBar } from "./components/SearchBar";
import { TranslationItem } from "./TranslationItem";
import { TranslationItemList } from "./TranslationItemList";
import "./Home.css";
import { Loader } from "./components/Loader";

export const Home = () => {
  const [term, setTerm] = useState();
  const [translationResult, setTranslationResult] = useState<TranslationResult>();
  const [favorites, setFavorites] = useState<TranslationResult[]>();

  const handleSubmit = async (term: string) => {
    setTerm(term);
    const result = await translate(term);
    setTranslationResult(result);
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
      <div className="Home__header">
        <SearchBar onSubmit={handleSubmit}></SearchBar>
      </div>

      {translationResult && <TranslationItem translationResult={translationResult} onAddToFavoriteClick={handleAddToFavoriteClick}></TranslationItem>}
      {!translationResult && term && <Loader></Loader>}

      <div>
        Favorites
        <TranslationItemList items={favorites}></TranslationItemList>
      </div>
    </div>
  )
}
