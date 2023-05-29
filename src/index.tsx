import ReactDOM from 'react-dom/client';
import './index.css';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import {rootReducer} from './reducers';
import Routing from './Routing';

const store = createStore(rootReducer);
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);


root.render(
  <Provider store={store}>
    <Routing/>
  </Provider>
);

