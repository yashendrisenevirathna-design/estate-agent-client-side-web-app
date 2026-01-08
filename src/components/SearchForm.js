import React, { useState } from 'react';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const SearchForm = ({ onSearch }) => {
  const [type, setType] = useState(null);
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [bedroomsRange, setBedroomsRange] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [postcode, setPostcode] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const [minBed, maxBed] = bedroomsRange ? bedroomsRange.value.split('-').map(Number) : [null, null];
    onSearch({
      type: type ? type.value : null,
      minPrice: minPrice ? Number(minPrice) : null,
      maxPrice: maxPrice ? Number(maxPrice) : null,
      minBedrooms: minBed,
      maxBedrooms: maxBed,
      startDate,
      endDate,
      postcode,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="search-form">
      <label>Property Type:</label>
      <Select options={[{value: 'House', label: 'House'}, {value: 'Flat', label: 'Flat'}, {value: 'Any', label: 'Any'}]} onChange={setType} />
      <label>Min Price:</label>
      <input type="number" value={minPrice} onChange={(e) => setMinPrice(e.target.value)} />
      <label>Max Price:</label>
      <input type="number" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} />
      <label>Bedrooms:</label>
      <Select options={[{value: '2-4', label: '2-4'}, {value: '1-3', label: '1-3'}, {value: 'Any', label: 'Any'}]} onChange={setBedroomsRange} />
      <label>Date Added:</label>
      <DatePicker selected={startDate} onChange={setStartDate} placeholderText="From" />
      <DatePicker selected={endDate} onChange={setEndDate} placeholderText="To" />
      <label>Postcode:</label>
      <input type="text" value={postcode} onChange={(e) => setPostcode(e.target.value)} />
      <button type="submit" style={{backgroundColor: '#6e0aeb'}}>Search</button>
    </form>
  );
};

export default SearchForm;