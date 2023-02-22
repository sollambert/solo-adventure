import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './Components/App/App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import logger from 'redux-logger';

const history = (state = [], action) => {
  switch (action.type) {
    case "ADD_HISTORY":
      return [...state, action.payload];
  }
  return state;
}

const room = (state = {}, action) => {
  switch (action.type) {
    case "SET_ROOM":
      return action.payload;
  }
  return state;
}

const store = createStore(
  combineReducers(
    {
      history,
      room
    }
  ),
  applyMiddleware(logger)
)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  // </React.StrictMode>
);
