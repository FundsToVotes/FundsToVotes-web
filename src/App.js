import React from 'react';
import { Router } from "@reach/router";

import About from "./Components/StaticPages/About";
import Finance101 from "./Components/StaticPages/Finance101";
import OurData from "./Components/StaticPages/OurData";
import TakeAction from "./Components/StaticPages/TakeAction";
import NotFound from "./Components/StaticPages/NotFound";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Banner from "./Components/Banner";
import RepresentativeDetails from "./Components/RepresentativeDetails";
import LandingPage from "./LandingPage";

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
    return (
        <div>
            <Banner />
            <Header />

            <Router>
                <LandingPage exact path="/" />
                <Finance101 path="/finance-101" />
                <TakeAction path="/take-action" />
                <OurData path="/our-data" />
                <About path="/about" />
                <RepresentativeDetails path="/representative-details" />
                <NotFound default />
            </Router>

            <Footer />
        </div>

    );
}

export default App;
