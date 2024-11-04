import React, { useState } from "react";

function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");

  const handleInputChange = (event) => {
    setQuery(event.target.value);
    onSearch(event.target.value); // Pass the input value up to the parent
  };

  return (
    <input
      type='text'
      placeholder='Search...'
      value={query}
      onChange={handleInputChange}
    />
  );
}

export default SearchBar;
