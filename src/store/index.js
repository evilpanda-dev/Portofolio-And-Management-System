import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { persistStore, persistReducer } from "redux-persist";
import { toggleButtonReducer } from "./reducers/toggleButtonReducer";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";
import educationReducer from "../features/education/educationSlice";
import skillReducer from "../features/skills/skillSlice";
import { openEditreducer } from "../store/reducers/openEditReducer";
import { loginButtonReducer } from "./reducers/loginButtonReducer";
import { registerButtonReducer } from "./reducers/registerButtonReducer";
import { editEducationReducer } from "./reducers/editEducationReducer";
import { alertWindowReducer } from "./reducers/alertWindowReducer";
import { newsLetterReducer } from "./reducers/newsLetterReducer";

const rootReducer = combineReducers({
  visibilityState: toggleButtonReducer,
  educationState: educationReducer,
  skills: skillReducer,
  editState: openEditreducer,
  editEducationState: editEducationReducer,
  popupState: loginButtonReducer,
  registerPopupState: registerButtonReducer,
  alertWindowState: alertWindowReducer,
  newsLetterState: newsLetterReducer,
});

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(
  persistedReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export const persistor = persistStore(store);
