import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import './App.css';
//import { useHistory } from 'react-router-dom';

import Header from '../Sandbox/Header/Header';
import Main from '../Main/Main'
import Movies from '../Movies/Movies';
import Footer from '../Sandbox/Footer/Footer';

function App() {
  return (
    <BrowserRouter>
    <Header />
    <Switch>
      <Route exact  path='/'>
        <Main />
      </Route>
      <Route path='/movies'>
        <Movies />
      </Route>
      <React path='/saved-movies'></React>
      <React path='/profile'></React>
      <React path='/signin'></React>
      <React path='/signup'></React>
    </Switch>
    <Footer />
    </BrowserRouter>
  );
}

export default App;
