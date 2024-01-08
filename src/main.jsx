import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

// styles css
import './styles/global.css';
import './styles/animations.css';
import './styles/index.css';

// routing
import { BrowserRouter } from 'react-router-dom';

// redux
import { Provider } from 'react-redux';
import store from './redux/store';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
)