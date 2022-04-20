import './assets/styles/scss/App.css';
import Home from './pages/Home/Home';
import Inner from './pages/Inner/Inner';
import UserProfile from './pages/UserProfile/UserProfile';
import { Provider } from 'react-redux';
import { store, persistor } from './store';
import { PersistGate } from 'redux-persist/integration/react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect,useState } from 'react';

const App = () => {

  const { pathname, hash, key } = useLocation();
const [image,setImage] = useState("")
const [userName,setUserName] = useState("")
const [role,setRole] = useState("")

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
    (
      async () => {
         await fetch('https://localhost:5000/api/userProfile',{
          headers: {'Content-Type': 'application/json'},
          credentials:'include',
      })
      .then(response => response.json())
      .then(data=>{
          //console.log(data)
            setImage(data.imgByte)
      })
      }
    )();
  }, [pathname, hash, key]); // do this on route change


  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Inner" element={<Inner setImage={setImage} imageSrc={image}/>} />
          <Route path="/profile" element ={<UserProfile setImage={setImage} imageSrc={image} setUserName={setUserName} setRole={setRole}/>} />
        </Routes>
      </PersistGate>
    </Provider>
  );
}

export default App;
