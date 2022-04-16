import './assets/styles/css/App.css';
import Home from './pages/Home/Home';
import Inner from './pages/Inner/Inner';
import { Provider } from 'react-redux';
import { store, persistor } from './store';
import { PersistGate } from 'redux-persist/integration/react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react';

const App = () => {

  const { pathname, hash, key } = useLocation();

  useEffect(() => {
    // if not a hash link, scroll to top
    if (hash === '') {
      window.scrollTo(0, 0);
    }
    // else scroll to id
    else {
      setTimeout(() => {
        const id = hash.replace('#', '');
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView();
        }
      }, 0);
    }
  }, [pathname, hash, key]); // do this on route change


  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Inner" element={<Inner />} />
        </Routes>
      </PersistGate>
    </Provider>
  );
}

export default App;
