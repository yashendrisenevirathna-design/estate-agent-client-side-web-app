import { render, screen } from '@testing-library/react';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { FavoritesProvider } from './context/FavoritesContext';
import PropertyDetails from './components/PropertyDetails';

const renderApp = () => {
  render(
    <BrowserRouter>
      <FavoritesProvider>
        <App />
      </FavoritesProvider>
    </BrowserRouter>
  );
};

test('renders Property Search heading', () => {
  renderApp();
  expect(screen.getByText(/Property Search/i)).toBeInTheDocument();
});

test('renders search button', () => {
  renderApp();
  expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument();
});
// Test to check 'Add to Favorites' button on property details page (simulates route to avoid multiple buttons)
test('renders favorites sidebar', () => {
  renderApp();

  expect(
    screen.getByRole( 'heading', { name: /Favourites List/i } )
  ).toBeInTheDocument();
});

test('search form fields are visible', () => {
  renderApp();
  expect(screen.getByText(/Property Type/i)).toBeInTheDocument();
  expect(screen.getByText(/Bedrooms/i)).toBeInTheDocument();
});

test('app loads without crashing', () => {
  renderApp();
});
