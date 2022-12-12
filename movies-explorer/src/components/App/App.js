import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import './App.css';
//import { useHistory } from 'react-router-dom';

import Main from '../Main/Main'

function App() {
  return (
    <BrowserRouter>
    <Switch>
      <Route exact  path='/'>
        <Main />
      </Route>
      <Route path='/movies'></Route>
      <React path='/saved-movies'></React>
      <React path='/profile'></React>
      <React path='/signin'></React>
      <React path='/signup'></React>
    </Switch>
    </BrowserRouter>
  );
}

export default App;
