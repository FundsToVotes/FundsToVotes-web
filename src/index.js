import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
//Jay Added these
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
//import Users from "./users";
//import Contact from "./contact";
//import Notfound from "./notfound";
import Header from "./Components/header";
import Footer from "./Components/footer";

/*
<Route path="/users" component={Users} />
        <Route path="/contact" component={Contact} />
        <Route component={Notfound} />
        */

const routing = (
  <Router>
    <div>
      <Header />      <hr />
      <Switch>
        <Route exact path="/" component={App} />
         
      </Switch>
      <Footer />    </div>
  </Router>
);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
