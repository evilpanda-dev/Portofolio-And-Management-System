import "./assets/styles/scss/App.css";
import Home from "./pages/Home/Home";
import Inner from "./pages/Inner/Inner";
import UserProfile from "./pages/UserProfile/UserProfile";
import Dashboard from "./pages/Dashboard/Dashboard";
import { Provider } from "react-redux";
import { store, persistor } from "./store";
import { PersistGate } from "redux-persist/integration/react";
import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect, useState,useContext } from "react";
import RequireAuth from "./components/RequireAuth/RequireAuth";
import Layout from "./components/Layout/Layout";
import { UserContext } from "./providers/UserProvider";
import { UserProfileContext } from "./providers/UserProfileProvider";
import UserProfileData from "./pages/UserProfileData/UserProfileData";
import { getDate } from "./helpers/getDate";
import DynamicUserProfile from "./pages/DynamicUserProfile/DynamicUserProfile";

const App = () => {
  const { pathname, hash, key } = useLocation();
  const [image, setImage] = useState("");
  const [userName, setUserName] = useState("");
  const [role, setRole] = useState("");
const {setUserProfile} = useContext(UserProfileContext)

  useEffect(() => {
    // if not a hash link, scroll to top
    if (hash === "") {
      window.scrollTo(0, 0);
    }
    // else scroll to id
    else {
      setTimeout(() => {
        const id = hash.replace("#", "");
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView();
        }
      }, 0);
    }
    (async () => {
      await fetch("https://localhost:5000/api/userProfile", {
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      })
        .then((response) => response.json())
        .then((data) => {
          //console.log(data)
          setImage(data.imgByte);
          setUserProfile({firstName: data.firstName,
            lastName: data.lastName,
          // birthDate: (data.birthDate).toString().slice(0,10),
          birthDate : getDate(data.birthDate),
        address: data.address,
      city: data.city,
    country: data.country,
  phoneNumber: data.phoneNumber,
  aboutMe: data.aboutMe,
id: data.id})
        });
    })();
  }, [pathname, hash, key]); // do this on route change




  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {/* <UserProvider> */}
        <Routes>
          {/* public routes */}
          <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route
            path="/Inner"
            element={<Inner setImage={setImage} imageSrc={image} />}
          />
          {/* protected routes */}
      <Route element={<RequireAuth allowedRoles={["Admin"]}/>}>
         <Route path="/dashboard" element={<Dashboard />} />
         </Route>
         <Route element={<RequireAuth allowedRoles={["Admin","User"]}/>}>
          <Route path="/profile" element={<UserProfile setImage={setImage} imageSrc={image} setUserName={setUserName} setRole={setRole}/>} />
          <Route path="/profileData" element={<UserProfileData setImage={setImage} imageSrc={image} setUserName={setUserName} setRole={setRole}/>} />
          <Route path="/profile/:userName" element={<DynamicUserProfile setImage={setImage} imageSrc={image} setUserName={setUserName} setRole={setRole}/>}/>
          </Route>

          {/* catch all */}
          {/* <Route path='/noPermission' element={<NoPermission/>}/> */}
          {/* <Route path="*" element={<NotFound/>} /> */}
          </Route>
        </Routes>
      </PersistGate>
    </Provider>
  );
};

export default App;
