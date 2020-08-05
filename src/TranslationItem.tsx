
import React from 'react';
import { TranslationResult } from './api/translate';
import "./TranslationItem.css";

export const TranslationItem: React.FC<{ translationResult: TranslationResult, onAddToFavoriteClick?: () => void }> = (props) => {
  return (
    <div className="TranslationItem">
      {props.onAddToFavoriteClick && <button onClick={props.onAddToFavoriteClick}>Add to Favorites</button>}
      <div className="TranslationItem__header">
        <span className="TranslationItem__header__word">{props.translationResult.term}</span>
        {props.translationResult.pronunciation}
      </div>
      <ul>
        {props.translationResult.translations.map((t, i) => <li key={i}>{t.wordClass}: {t.translation}</li>)}
      </ul>
    </div>
  )
}
