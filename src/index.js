import React from 'react';
import { createRoot } from 'react-dom/client';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import App from './App';
import { UserProvider } from './contexts/user.context';
import { ProductProvider } from './contexts/products-context';
import { CartProvider } from './contexts/cart.context';
import './index.scss';

const rootElement = createRoot(document.getElementById('root'));

rootElement.render(
  <React.StrictMode>
    <BrowserRouter>
      <UserProvider>
        <ProductProvider>
          <CartProvider>
            <App />
          </CartProvider>
        </ProductProvider>
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>
);
