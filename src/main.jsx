import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './app/App.jsx'
// import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store/store.js'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext.jsx';
// import 'select2/dist/css/select2.min.css';
// import 'select2/dist/js/select2.min.js';
// import $ from 'jquery';

createRoot(document.getElementById('root')).render(
  // <StrictMode>
  //   <App />
  // </StrictMode>,

  <Provider store={store}>
    <AuthProvider>
      <App />
    </AuthProvider>
    <ToastContainer />
  </Provider>,
)
