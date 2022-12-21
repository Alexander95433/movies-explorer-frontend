import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import './App.css';
//import { useHistory } from 'react-router-dom';

import Header from '../Sandbox/Header/Header';
import Main from '../Main/Main'
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Register from '../Authentication/Register/Register';
import Login from '../Authentication/Login/Login';
import Footer from '../Sandbox/Footer/Footer';

function App() {
 

  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route exact path='/'>
          <Main />
        </Route>
        <Route path='/movies'>
          <Movies />
        </Route>
        <Route path='/saved-movies'>
          <SavedMovies />
        </Route>
        <Route path='/profile'>
          <Profile />
        </Route>
        <Route path='/signin'>
          <Login />
        </Route>
        <Route path='/signup'>
          <Register />
        </Route>
      </Switch>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
