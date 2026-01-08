import React from 'react';
import { Link } from 'react-router-dom';

const PropertyList = ({ properties, onAddFavorite }) => (
  <div className="property-grid">
    {properties.map(p => (
      <div key={p.id} className="property-card">
        <img src={p.picture} alt={p.type} style={{ width: '100%' }} />

        <h3 style={{ color: '#6e0aeb' }}>
          £{p.price.toLocaleString()}
        </h3>

        <p>{p.bedrooms} Bed {p.type}</p>
        <p>{p.location}</p>

        <Link to={`/property/${p.id}`}>View Details</Link>

        <button onClick={() => onAddFavorite(p)}>
          ❤️ Add to Favorites
        </button>
      </div>
    ))}
  </div>
);

export default PropertyList;
