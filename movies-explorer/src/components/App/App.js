import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useState } from 'react';

import './App.css';
//import { useHistory } from 'react-router-dom';

import BurgerMenu from '../Sandbox/BurgerMenu/BurgerMenu';
import Header from '../Sandbox/Header/Header';
import Main from '../Main/Main'
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Register from '../Authentication/Register/Register';
import Login from '../Authentication/Login/Login';
import NotFoundPage from '../Sandbox/NotFoundPage/NotFoundPage';
import Footer from '../Sandbox/Footer/Footer';

function App() {
  const [burgerHidden, setBurgerHidden] = useState(true);
  function hendleBurgerButtonClick() {
    if (burgerHidden) { setBurgerHidden(false) }
    else { setBurgerHidden(true) }

    console.log(burgerHidden)
  }

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/'>
          <Main onBurgerMenu={burgerHidden} onHendleButtonBurgerMenu={hendleBurgerButtonClick}/>
        </Route>
        <Route path='/movies'>
          <Movies onBurgerMenu={burgerHidden} onHendleButtonBurgerMenu={hendleBurgerButtonClick}/>
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
        <Route path='*'>
          <NotFoundPage />
        </Route>
      </Switch>
      <BurgerMenu onBurgerHidden={burgerHidden} />
    </BrowserRouter>
  );
}

export default App;
