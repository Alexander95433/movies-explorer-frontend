import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useState } from 'react';

import './App.css';
//import { useHistory } from 'react-router-dom'; authentication

import BurgerMenu from '../Sandbox/BurgerMenu/BurgerMenu';
import Main from '../Main/Main'
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Register from '../Authentication/Register/Register';
import Login from '../Authentication/Login/Login';
import NotFoundPage from '../Sandbox/NotFoundPage/NotFoundPage';

function App() {
  const [burgerHidden, setBurgerHidden] = useState(true);

  function handlerOpeningAndClosingBurgerMenu() {
      if (burgerHidden) { setBurgerHidden(false) }
      else { setBurgerHidden(true) }
    
  }

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/'>
          <Main onBurgerMenu={burgerHidden} onHendleButtonBurgerMenu={handlerOpeningAndClosingBurgerMenu}/>
        </Route>
        <Route path='/movies'>
          <Movies onBurgerMenu={burgerHidden} onHendleButtonBurgerMenu={handlerOpeningAndClosingBurgerMenu}/>
        </Route>
        <Route path='/saved-movies'>
          <SavedMovies onBurgerMenu={burgerHidden} onHendleButtonBurgerMenu={handlerOpeningAndClosingBurgerMenu}/>
        </Route>
        <Route path='/profile'>
          <Profile onBurgerMenu={burgerHidden} onHendleButtonBurgerMenu={handlerOpeningAndClosingBurgerMenu}/>
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
       <BurgerMenu onBurgerHidden={burgerHidden} onHendleClickClose={handlerOpeningAndClosingBurgerMenu}/>
    </BrowserRouter>
  );
}

export default App;
