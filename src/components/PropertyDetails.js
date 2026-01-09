import React, { useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import { Tabs, TabList, Tab, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { FavoritesContext } from '../context/FavoritesContext';

const PropertyDetails = ({ properties }) => {
  const { addFavorite } = useContext(FavoritesContext);
  const { id } = useParams();
  const property = properties.find(p => p.id === id);

  if (!property) return <p>Property not found</p>;

  

  // Build gallery safely
  const images = property.images.map((img, index) => ({
    original: process.env.PUBLIC_URL +img,
    thumbnail: property.thumbnails?.[index] || process.env.PUBLIC_URL +img
  }));

  return (
    <div style={{ padding: '20px' }}>
      <Link to="/" style={{ color: '#004889', fontSize: '1.1rem' }}>
        ← Back to Search
      </Link>

      <ImageGallery items={images} showPlayButton={false} />

      <h2 style={{ color: '#6e0aeb', margin: '20px 0' }}>
        £{property.price.toLocaleString()} | {property.bedrooms} Bed {property.type} | {property.location}
      </h2>

      <button
        onClick={() => addFavorite(property)}
        style={{
          backgroundColor: '#6e0aeb',
          color: 'white',
          padding: '10px 15px',
          border: 'none',
          borderRadius: '5px',
          fontSize: '1rem',
          cursor: 'pointer'
        }}
      >
        ❤️ Add to Favorites
      </button>

      <Tabs style={{ marginTop: '30px' }}>
        <TabList>
          <Tab>Description</Tab>
          <Tab>Floor Plan</Tab>
          <Tab>Map</Tab>
        </TabList>

        <TabPanel>
          <div dangerouslySetInnerHTML={{ __html: property.description }} />
        </TabPanel>

        <TabPanel>
          {property.floorPlan ? (
            <img
              src={process.env.PUBLIC_URL +property.floorPlan}
              alt="Floor Plan"
              style={{
                width: '100%',
                maxWidth: '800px',
                display: 'block',
                margin: '0 auto',
                border: '1px solid #ddd',
                borderRadius: '8px'
              }}
            />
          ) : (
            <p style={{ textAlign: 'center' }}>Floor plan not available</p>
          )}
        </TabPanel>


        <TabPanel>
          <iframe
            src={`https://www.google.com/maps?q=${encodeURIComponent(property.location)}&output=embed`}
            width="100%"
            height="450"
            style={{ border: 0 }}
            loading="lazy"
            title="Property map"
          />
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default PropertyDetails;
