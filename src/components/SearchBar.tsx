import React, { FC, useState, FormEvent, useRef } from "react";
import "./SearchBar.css";

export const SearchBar: FC<{ onSubmit }> = ({ onSubmit }) => {
  const [term, setTerm] = useState("");
  const inputRef = useRef(null);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    inputRef.current.blur();
    onSubmit(term);
  }

  return (
    <form onSubmit={handleSubmit} className="SearchBar">
      <input type="search" value={term} onChange={(event) => setTerm(event.target.value)} ref={inputRef} autoCapitalize="none" autoCorrect="off" autoComplete="off" className="SearchBar__input"></input>
      <button type="submit">
        <svg width="17" height="18" viewBox="0 0 17 18" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M11.5714 7.92857C11.5714 10.4096 9.55246 12.4286 7.07143 12.4286C4.5904 12.4286 2.57143 10.4096 2.57143 7.92857C2.57143 5.44754 4.5904 3.42857 7.07143 3.42857C9.55246 3.42857 11.5714 5.44754 11.5714 7.92857ZM16.7143 16.2857C16.7143 15.9442 16.5737 15.6127 16.3426 15.3817L12.8973 11.9364C13.7109 10.7612 14.1429 9.35491 14.1429 7.92857C14.1429 4.0212 10.9788 0.857142 7.07143 0.857142C3.16406 0.857142 0 4.0212 0 7.92857C0 11.8359 3.16406 15 7.07143 15C8.49777 15 9.90402 14.5681 11.0792 13.7545L14.5246 17.1897C14.7556 17.4308 15.0871 17.5714 15.4286 17.5714C16.1317 17.5714 16.7143 16.9888 16.7143 16.2857Z" fill="#282020" />
        </svg>
      </button>
    </form>
  )
}
