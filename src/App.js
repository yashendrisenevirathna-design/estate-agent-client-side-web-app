import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import propertiesData from './data/properties.json';
import SearchPage from './components/SearchPage';
import PropertyDetails from './components/PropertyDetails';

// Helper to convert month name to number
const getMonthNumber = (month) => {
  const months = { January: 0, February: 1, March: 2, April: 3, May: 4, June: 5, July: 6, August: 7, September: 8, October: 9, November: 10, December: 11 };
  return months[month];
};

function App() {
  const properties = propertiesData.properties;
  return (
    <Routes>
      <Route path="/" element={<SearchPage properties={properties} getMonthNumber={getMonthNumber} />} />
      <Route path="/property/:id" element={<PropertyDetails properties={properties} />} />
    </Routes>
  );
}



export default App;