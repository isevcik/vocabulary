import React, { useEffect, useState } from "react";

import { translate, TranslationResult, hydrateTranslationResult } from "./api/translate";
import { firebaseApp } from "./api/firebase";
import { SearchBar } from "./components/SearchBar";
import { TranslationItem } from "./TranslationItem";
import { TranslationItemList } from "./TranslationItemList";
import "./Home.css";
import { Loader } from "./components/Loader";
import { storage } from "./api/storage";

export const Home = () => {
  const [term, setTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [translationResult, setTranslationResult] = useState<TranslationResult | false>();
  const [recent, setRecent] = useState<TranslationResult[]>();

  const handleSubmit = async (term: string) => {
    setTerm(term);
    setTranslationResult(undefined);
    setIsLoading(true);

    const result = await translate(term) || false;

    setIsLoading(false);
    setTranslationResult(result);

    result && storage.addRecentTranslation(result);
  }

  const handleAddToFavoriteClick = () => {
    const key = term.trim();
    firebaseApp.database().ref("favorite").update({
      [key]: { ...translationResult, date: new Date() }
    });
  }

  useEffect(() => {
    firebaseApp.database().ref("recent").on("value", (snapshot) => {
      const value = snapshot.val();
      if (!value) {
        return;
      }

      const recent = Object.entries<TranslationResult>(value)
        .map(([k, v]) => v)
        .map(hydrateTranslationResult)
        .sort((a, b) => b.date.valueOf() - a.date.valueOf())

      setRecent(recent);
    })
  }, []);

  return (
    <div>
      <div className="Home__header">
        <SearchBar onSubmit={handleSubmit}></SearchBar>
      </div>

      <div className="Home__result">
        {translationResult && <TranslationItem translationResult={translationResult} onAddToFavoriteClick={handleAddToFavoriteClick}></TranslationItem>}
        {isLoading && <Loader></Loader>}
        {translationResult === false && <span>No results</span>}
      </div>


      <div className="Home__recent">
        <div className="Home__recent__heading">
          Recent
        </div>
        <TranslationItemList items={recent}></TranslationItemList>
      </div>
    </div>
  )
}
