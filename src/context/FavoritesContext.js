import React, { createContext, useState } from 'react';

export const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  const addFavorite = (prop) => {
    if (!favorites.some(f => f.id === prop.id)) setFavorites([...favorites, prop]);
  };

  const removeFavorite = (id) => setFavorites(favorites.filter(f => f.id !== id));

  const clearFavorites = () => setFavorites([]);

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, clearFavorites }}>
      {children}
    </FavoritesContext.Provider>
  );
};