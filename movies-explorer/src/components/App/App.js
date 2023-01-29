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
  const [loading, setLoading] = useState(true);
  const [burgerHidden, setBurgerHidden] = useState(true);
  const [currentUser, setCurrentUser] = useState({})
  const [errorMessage, setErrorMessage] = useState('')
  const [savedFilms, setsavedFilms] = useState([])


  const [checkbox, setCheckbox] = useState(false)
  const [inputValue, setInputValue] = useState('');
  const [foundMovies, setFoundMovies] = useState([]);
  const [titleNotFoundMovies, setTitleNotFoundMovies] = useState(true)

  const [checDeleteCard, setChecDeleteCard] = useState(false)


  useEffect(() => {
    handleTokenCheck()
    if (loggedIn) { hendleGetUserInfo() }
  }, [loggedIn])

  useEffect(() => {
    hendleGetSavedMovies()
  }, [])

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

      setCurrentUser(user)
      localStorage.setItem('user', JSON.stringify(user))
    })
      .catch((err) => { console.log(err) })
  }

  function hendleEditProfile(data) {
    mainApi.patchUserInfo(data)
      .then((res) => {

        setCurrentUser(res.data)
        localStorage.setItem('user', JSON.stringify(res.data))
        console.log(currentUser)
      })
      .catch((err) => { console.log(err) })
      .finally(() => { hendleGetUserInfo() })
  }

  function hendleGetSavedMovies() {
    let mySavedFilms = []
    mainApi.getSavedMovies({
      endpoint: 'movies',
      methodName: 'GET',
    }).then((data) => {
      data.forEach((savedFilm) => {
        if (savedFilm.owner === currentUser._id) {
          mySavedFilms.push(savedFilm)
          localStorage.setItem('savedMovies', JSON.stringify(mySavedFilms));
          setsavedFilms(mySavedFilms)
        };
      })
      setTitleNotFoundMovies(true)
    }).catch((err) => {
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
        <ProtectedRouter path='/movies' setFoundMovies={setFoundMovies} checkbox={checkbox} setCheckbox={setCheckbox} inputValue={inputValue} setInputValue={setInputValue}
          foundMovies={foundMovies} loading={loading} setLoading={setLoading} setCurrentUser={setCurrentUser} hendleGetUserInfo={hendleGetUserInfo} hendleGetSavedMovies={hendleGetSavedMovies}
          setsavedFilms={setsavedFilms} savedFilms={savedFilms} logiedId={loggedIn} component={Movies}
          onBurgerMenu={burgerHidden} onHendleButtonBurgerMenu={handlerOpeningAndClosingBurgerMenu} />

        <ProtectedRouter path='/saved-movies' checDeleteCard={checDeleteCard} setChecDeleteCard={setChecDeleteCard}
          loading={loading} setLoading={setLoading} setTitleNotFoundMovies={setTitleNotFoundMovies} titleNotFoundMovies={titleNotFoundMovies}
          foundMovies={foundMovies} savedFilms={savedFilms} hendleGetSavedMovies={hendleGetSavedMovies} logiedId={loggedIn}
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
