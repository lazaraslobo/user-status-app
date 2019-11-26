import React from 'react';
import {renderRoutes} from 'react-router-config';
import { BrowserRouter } from 'react-router-dom';
import routes from './components/core/routes.config';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import rootReducer from './components/core/redux/combine.reducer';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Provider store={appState()}>
        {renderRoutes(routes)}
      </Provider>
    </BrowserRouter>
  );
}

const appState = () =>{
  let store = createStore(rootReducer, {}, applyMiddleware(ReduxThunk));
  store.subscribe(()=>{
    let stateData = store.getState();
    console.log("store Updated => ", stateData);
  });

  return store;
}

export default App;
