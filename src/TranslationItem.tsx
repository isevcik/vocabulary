
import React from 'react';
import { TranslationResult } from './api/translate';

export const TranslationItem: React.FC<{ translationResult: TranslationResult, onAddToFavoriteClick?: () => void }> = (props) => {
  return (
    <div>
      <button onClick={props.onAddToFavoriteClick}>Add to Favorites</button>
      {props.translationResult.term} {props.translationResult.pronunciation}
      <ul>
        {props.translationResult.translations.map((t, i) => <li key={i}>{t.wordClass}: {t.translation}</li>)}
      </ul>
    </div>
  )
}