import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

// styles css
import './styles/global.css';
import './styles/animations.css';
import './styles/index.css';

// routing
import { BrowserRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)