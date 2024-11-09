// src/entry-server.jsx
import React from 'react';
import { StaticRouter } from 'react-router-dom/server';
import App from './App';

export function render(url) {
    console.log(111);
  return (
    <StaticRouter location={url}>
      <App />
    </StaticRouter>
  );
}
