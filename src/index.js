import React from 'react';
import { createRoot } from 'react-dom/client';
import ReactPixel from 'react-facebook-pixel';

import App from './App';
import * as serviceWorker from './serviceWorker';


async function loadPolyfills() {
  if (typeof window.IntersectionObserver === 'undefined') {
    await import('intersection-observer')
  }
}

ReactPixel.init(process.env.REACT_APP_FACEBOOK_PIXEL_ID);

loadPolyfills();

const domNode = document.getElementById('root');
const root = createRoot(domNode);
root.render(<App />);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
