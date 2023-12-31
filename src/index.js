import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Store from './Redux/Store';
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={Store}>
        <Router>
          <App />
        </Router>
    
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
