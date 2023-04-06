import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const SearchResults = () => {
  const [searchInput, setSearchInput] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const history = useHistory();

  const handleSearch = () => {
    axios.get(`http://localhost:9093/product/search/${searchInput}`)
      .then(response => {
        setSearchResults(response.data);
        history.push({
          pathname: '/result',
          state: { results: response.data }
        });
      })
      .catch(error => {
        console.error(error);
      });
  }

  return (
    <div>
      <input type="text" value={searchInput} onChange={(event) => setSearchInput(event.target.value)} />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default SearchResults;
