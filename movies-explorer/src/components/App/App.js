import React from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import { useState, useEffect } from "react";
import { CurrentUserContext } from '../Sandbox/CurrentUserContext/CurrentUserContext'
import './App.css';
import BurgerMenu from '../Sandbox/BurgerMenu/BurgerMenu';
import Main from '../Main/Main'
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Register from '../Authentication/Register/Register';
import Login from '../Authentication/Login/Login';
import NotFoundPage from '../Sandbox/NotFoundPage/NotFoundPage';
import ProtectedRouter from '../Sandbox/ProtectedRouter/ProtectedRoute ';
import mainApi from '../../utils/MainApi';

function App() {
  let history = useHistory();
  const [loggedIn, setLoggedIn] = React.useState(false)
  const [burgerHidden, setBurgerHidden] = useState(true);
  const [currentUser, setCurrentUser] = useState({})
  const [errorMessage, setErrorMessage] = useState('')
  const [savedFilms, setsavedFilms] = useState([])
   

  useEffect(() => {
    handleTokenCheck()
    hendleGetSavedMovies()
    if (loggedIn) { hendleGetUserInfo() }
  }, [loggedIn])

  function handleRegister(data) {
    mainApi.register(data)
      .then((data) => {
        setErrorMessage('')
        history.push('signin')
      }).catch((err) => {
        console.log(`Ошибка регистрации: ${err}`)
        setErrorMessage('Пользователь с такой почтой уже существует')
        console.log(errorMessage)
      })
  }

  function handleAuthorization(data) {
    mainApi.authorization(data)
      .then((data) => {
        if (data.token) {
          setErrorMessage('')
          localStorage.setItem('jwt', data.token)
          setLoggedIn(true)
          history.push('movies');
        } else { return }
      }).catch((err) => {
        setErrorMessage('Не не правильная почта или пароль')
        console.log(`Ошибка входа в систему: ${err}`)
      })
  }

  function hendleAccountLogout() {
    mainApi.accountLogout({
      endpoint: 'signout',
      methodName: 'GET',
    }).then(data => console.log(data))
      .catch(err => console.log(err))
    setLoggedIn(false)
    localStorage.removeItem('jwt')
    history.push('/');
  }

  function handleTokenCheck() {
    const jwt = localStorage.getItem('jwt')
    if (jwt) {
      mainApi.checkToken({
        endpoint: 'users/me',
        methodName: 'GET',
      }).then((res) => {
        if (res) {
          setLoggedIn(true);
          history.push('movies');
        }
      }).catch((err) => { console.log(`Ошибка проверки токена: ${err}`) })
    }
  }

  function hendleGetUserInfo() {
    mainApi.detUserInfo({
      endpoint: 'users/me',
      methodName: 'GET',
    }).then((user) => { 
      localStorage.setItem('user', JSON.stringify(user))
      setCurrentUser(user) })
      .catch((err) => { console.log(err) })
  }

  function hendleEditProfile(data) {
    mainApi.patchUserInfo(data)
      .then((res) => {
        setCurrentUser(res.data)
      })
      .catch((err) => { console.log(err) })
  }

  
  function hendleGetSavedMovies() {
    let mySavedFilms = []
    mainApi.getSavedMovies({
      endpoint: 'movies',
      methodName: 'GET',
    }).then((data) => {
      console.log(data,'data')
      data.forEach((savedFilm) => {
        if (savedFilm.owner === currentUser._id) {
          
          mySavedFilms.push(savedFilm)
          localStorage.setItem('savedMovies', JSON.stringify(mySavedFilms));
          setsavedFilms(mySavedFilms)
        };
      })
      setsavedFilms(data)
        
    }).catch((err) => {
      console.log(err)})
  }


  function hendleSaveMovies(data) {
 
    const newMovie = {};
    const { image, id } = data;

    Object.assign(newMovie, data);
    delete newMovie.id;
    delete newMovie.created_at;
    delete newMovie.updated_at;

    mainApi.saveMovies({
      endpoint: 'movies',
      methodName: 'POST',
      body: {
        ...newMovie,
        image: `https://api.nomoreparties.co/${image.url}`,
        thumbnail: `https://api.nomoreparties.co/${image.formats.thumbnail.url}`,
        movieId: id,
      }
    }).then((res) => {
      console.log(res)
    }).catch((err) => { console.log(err) })
  }

  function hendleDeleteMovies(movieId) {
    mainApi.deleteMovies({
      endpoint: `movies/${movieId}`,
      methodName: 'DELETE'
    })
      .then((data) => {
        console.log(data)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  function handlerOpeningAndClosingBurgerMenu() {
    if (burgerHidden) { setBurgerHidden(false) }
    else { setBurgerHidden(true) }

  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Switch>
        <Route path='/signin'>
          <Login onErrorMessage={errorMessage} handleAuthorization={handleAuthorization} />
        </Route>
        <Route path='/signup'>
          <Register onErrorMessage={errorMessage} handleRegister={handleRegister} />
        </Route>
        <Route exact path='/'>
          <Main onBurgerMenu={burgerHidden} onHendleButtonBurgerMenu={handlerOpeningAndClosingBurgerMenu} />
        </Route>
        <ProtectedRouter path='/movies' setCurrentUser={setCurrentUser} hendleGetUserInfo={hendleGetUserInfo} hendleGetSavedMovies={hendleGetSavedMovies}
          setsavedFilms={setsavedFilms} savedFilms={savedFilms} hendleDeleteMovies={hendleDeleteMovies} hendleSaveMovies={hendleSaveMovies} logiedId={loggedIn} component={Movies}
          onBurgerMenu={burgerHidden} onHendleButtonBurgerMenu={handlerOpeningAndClosingBurgerMenu} />

        <ProtectedRouter path='/saved-movies' savedFilms={savedFilms} hendleGetSavedMovies={hendleGetSavedMovies} hendleDeleteMovies={hendleDeleteMovies} logiedId={loggedIn}
          component={SavedMovies} onBurgerMenu={burgerHidden} onHendleButtonBurgerMenu={handlerOpeningAndClosingBurgerMenu} />

        <ProtectedRouter path='/profile' onHendleEditProfile={hendleEditProfile} logiedId={loggedIn} component={Profile} onHendleAccountLogout={hendleAccountLogout}
          onBurgerMenu={burgerHidden} onHendleButtonBurgerMenu={handlerOpeningAndClosingBurgerMenu} />
        <Route path='*'>
          <NotFoundPage />
        </Route>
      </Switch>
      <BurgerMenu onBurgerHidden={burgerHidden} onHendleClickClose={handlerOpeningAndClosingBurgerMenu} />
    </CurrentUserContext.Provider>
  );
}

export default App;
