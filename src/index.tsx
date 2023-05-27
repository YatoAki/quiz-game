import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Home from './Components/Home';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import {rootReducer} from './reducers';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import QSection from './Components/QSection';

const store = createStore(rootReducer);
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Provider store={store}>
    <BrowserRouter basename='quiz-game'>
      <Routes>
        <Route path="" element={<Home/>}/>
        <Route path="/questions" element={<QSection/>}/>
      </Routes>
    </BrowserRouter>
  </Provider>
);

