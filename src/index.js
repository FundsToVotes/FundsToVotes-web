import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import App from "./App";
import About from "./Components/StaticPages/about";
import Finance101 from "./Components/StaticPages/finance101";
import OurData from "./Components/StaticPages/ourdata"
import TakeAction from "./Components/StaticPages/takeaction"
import Notfound from "./Components/StaticPages/notfound";
import Header from "./Components/header";
import Footer from "./Components/footer";
import Banner from "./Components/banner";
import { LandingPage } from "./LandingPage";
import { RepresentativePage } from "./RepresentativePage";

//My tutorial said to put this here, but my other tutorials said logic
/////goes in app.js, and components go in index.js, so... ???
const routing = (
  <Router>
    <div>
      <Banner></Banner>
      <Header />      <hr />

      <body>
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route path="/home" component={LandingPage} />
        <Route path="/finance101" component={Finance101} />
        <Route path="/takeaction" component={TakeAction} />
        <Route path="/ourdata" component={OurData} />
        <Route path="/about" component={About} />
        <Route path="/representativepage" component={RepresentativePage} />
        <Route component={Notfound} />
      </Switch>
      </body>

      <Footer />    </div>
  </Router>
);

ReactDOM.render(routing, document.getElementById("root"));