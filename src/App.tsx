import React, { useState, ChangeEvent, FormEvent } from 'react';
import './App.css';

interface TranslationResult {
  term: string;
  pronunciation: string;
  translations: { wordClass: string, translation: string }[];
}

function parseFetchResponse(response: any): TranslationResult {
  if (!response.translate.length) {
    return undefined;
  }

  const translate = response.translate[0];

  const term = translate.head.entr;
  const pronunciation = translate.head.pron;
  const translations = translate.grps.map(g => ({
    wordClass: g.morf,
    translation: g.sens.flatMap(s => s.trans).join(", ")
  }))

  return { term, pronunciation, translations };
}

const App: React.FC = () => {
  const [term, setTerm] = useState("dog");
  const [translationResult, setTranslationResult] = useState<TranslationResult>();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => setTerm(event.target.value);

  const clicked = (event: FormEvent) => {
    event.preventDefault();
    
    const url = `http://cors-anywhere.herokuapp.com/https://slovnik.seznam.cz/api/slovnik?dictionary=en&query=${term}`;
    fetch(url).then(response => {
      response.json().then(response => {
        const result = parseFetchResponse(response);
        setTranslationResult(result);
        console.log(result);
      });
    }, error => {
      alert(error);
    });
  }

  return (
    <div className="App">
      <form onSubmit={clicked}>
        <input type="text" value={term} onChange={handleChange}></input>
        <button type="submit">Lookup</button>
      </form>

      {translationResult && <TranslationIten translationResult={translationResult}></TranslationIten>}
    </div>
  );
}

export default App;

const TranslationIten: React.FC<any> = (props: any) => {
  return (
    <div>
      {props.translationResult.term} {props.translationResult.pronunciation}
      <ul>
        {props.translationResult.translations.map((t, i) => <li key={i}>{t.wordClass}: {t.translation}</li>)}
      </ul>
    </div>
  )
}