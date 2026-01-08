import React, { useState, useContext } from 'react';
import SearchForm from './SearchForm';
import PropertyList from './PropertyList';
import { FavoritesContext } from '../context/FavoritesContext';

const getMonthNumber = (month) => ({
  January: 0, February: 1, March: 2, April: 3,
  May: 4, June: 5, July: 6, August: 7,
  September: 8, October: 9, November: 10, December: 11
}[month]);

const SearchPage = ({ properties }) => {
  const [results, setResults] = useState(properties);
  const { favorites, addFavorite, removeFavorite, clearFavorites } =
    useContext(FavoritesContext);

  const handleSearch = (criteria) => {
    let filtered = properties;

    if (criteria.type && criteria.type !== 'Any')
      filtered = filtered.filter(p => p.type === criteria.type);

    if (criteria.minPrice)
      filtered = filtered.filter(p => p.price >= criteria.minPrice);

    if (criteria.maxPrice)
      filtered = filtered.filter(p => p.price <= criteria.maxPrice);

    if (criteria.minBedrooms)
      filtered = filtered.filter(p => p.bedrooms >= criteria.minBedrooms);

    if (criteria.maxBedrooms)
      filtered = filtered.filter(p => p.bedrooms <= criteria.maxBedrooms);

    if (criteria.startDate)
      filtered = filtered.filter(p =>
        new Date(p.added.year, getMonthNumber(p.added.month), p.added.day) >= criteria.startDate
      );

    if (criteria.endDate)
      filtered = filtered.filter(p =>
        new Date(p.added.year, getMonthNumber(p.added.month), p.added.day) <= criteria.endDate
      );

    if (criteria.postcode)
      filtered = filtered.filter(p =>
        p.location.toUpperCase().startsWith(criteria.postcode.toUpperCase())
      );

    setResults(filtered);
  };

  return (
  <div className="app-container">

    {/* LEFT: Search Form */}
    <div className="search-form">
      <h1 className="page-title">Property Search</h1>
      <SearchForm onSearch={handleSearch} />
    </div>

    {/* MIDDLE: Results */}
    <div className="results-section">
      <h2>Search Results</h2>

      <PropertyList
        properties={results}
        onAddFavorite={addFavorite}
      />
    </div>

    {/* RIGHT: Favourites */}
    <div className="favorites-sidebar">
      <h3>Favourites List</h3>

      {favorites.length === 0 && <p>No favourites yet</p>}

      {favorites.map(p => (
        <div key={p.id} className="favorite-item">
          <p>❤️ {p.type}</p>
          <p>£{p.price.toLocaleString()}</p>
          <button onClick={() => removeFavorite(p.id)}>Remove</button>
        </div>
      ))}

      {favorites.length > 0 && (
        <button onClick={clearFavorites}>Clear All</button>
      )}
    </div>

  </div>
);

};

export default SearchPage;
