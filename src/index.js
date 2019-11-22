import "materialize-css/dist/css/materialize.min.css";
import "materialize-css/dist/js/materialize.min.js";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import reduxThunk from "redux-thunk";
import reducers from "./reducers";
import App from "./App";
import * as firebase from "firebase";
import { ReactReduxFirebaseProvider } from 'react-redux-firebase';
import { createFirestoreInstance } from 'redux-firestore';
import registerServiceWorker from "./registerServiceWorker";
import { reduxFirebase } from "./config/keys";
const store = createStore(reducers, {}, applyMiddleware(reduxThunk));

ReactDOM.render(
  <Provider store={store}>
  <ReactReduxFirebaseProvider
  firebase={firebase}
  config={reduxFirebase}
  dispatch={store.dispatch}
  createFirestoreInstance={createFirestoreInstance}>
  <App />
</ReactReduxFirebaseProvider>
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
