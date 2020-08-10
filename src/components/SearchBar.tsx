import React, { FC, useState, FormEvent } from "react";
import "./SearchBar.css";

export const SearchBar: FC<{ onSubmit }> = ({ onSubmit }) => {
  const [term, setTerm] = useState("");

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    onSubmit(term);
  }

  return (
    <form onSubmit={handleSubmit} className="SearchBar">
      <input type="text" value={term} onChange={(event) => setTerm(event.target.value)} className="SearchBar__input"></input>
      <button type="submit">Lookup</button>
    </form>
  )
}
