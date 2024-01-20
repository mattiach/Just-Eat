import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

// styles css
import './styles/global.css';
import './styles/animations.css';
import './styles/index.css';

// routing
import { BrowserRouter } from 'react-router-dom';

// context
import { AppProvider } from './context/AppContext';

// redux
import { Provider } from 'react-redux';
import store from './redux/store';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <AppProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </AppProvider>
    </Provider>
  </React.StrictMode>,
)