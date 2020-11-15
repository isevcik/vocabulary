import React, { FC, useState, FormEvent, useRef } from "react";
import { storage } from "../api/storage";
import { translate, TranslationResult } from "../api/translate";
import { Loader } from "../components/Loader";
import { SearchBar } from "../components/SearchBar";
import { TranslationItem } from "../TranslationItem";
import { TranslationItemList } from "../TranslationItemList";
import "./SearchLayout.css";

export interface SearchLayoutProps {
  listHeading: string
  translationResultList: TranslationResult[];
}

export const SearchLayout: FC<SearchLayoutProps> = (props: SearchLayoutProps) => {
  const [translationResult, setTranslationResult] = useState<TranslationResult>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const isNoResultsVisible = () =>
    translationResult && !translationResult.translations?.length && !isLoading;

  const handleOnSearch = async (term: string) => {
    setTranslationResult(undefined);
    setIsLoading(true);

    const result = await translate(term);

    setIsLoading(false);
    setTranslationResult(result);

    result && storage.addRecentTranslation(result);
  };

  const handleOnAddToFavorites = () => { };

  return (
    <div>
      <SearchBar onSubmit={handleOnSearch}></SearchBar>

      <div className="">
        {translationResult && <TranslationItem translationResult={translationResult} onAddToFavoriteClick={handleOnAddToFavorites}></TranslationItem>}
        {isLoading && <Loader></Loader>}
        {isNoResultsVisible() && <span>No results</span>}
      </div>

      <div className="SearchLayout__heading">
        {props.listHeading}
      </div>

      <TranslationItemList items={props.translationResultList}></TranslationItemList>
    </div>
  )
}
