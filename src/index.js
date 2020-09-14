import React from 'react';
import ReactDOM from 'react-dom';
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

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
