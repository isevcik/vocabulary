import React, { FC, useState, FormEvent } from "react";

export const SearchBar: FC<{ onSubmit }> = ({ onSubmit }) => {
  const [term, setTerm] = useState("dog");

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    onSubmit(term);
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={term} onChange={(event) => setTerm(event.target.value)}></input>
      <button type="submit">Lookup</button>
    </form>
  )
}
