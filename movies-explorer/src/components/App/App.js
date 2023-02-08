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
import { moviesApi } from "../../utils/Api"

function App() {
  let history = useHistory();
  const [loggedIn, setLoggedIn] = useState(false)
  const [loading, setLoading] = useState(true);
  const [burgerHidden, setBurgerHidden] = useState(true);
  const [currentUser, setCurrentUser] = useState({})
  const [errorMessage, setErrorMessage] = useState(false)
  const [savedFilms, setsavedFilms] = useState([])
  const [checkbox, setCheckbox] = useState(true)
  const [inputValue, setInputValue] = useState('');
  const [foundMovies, setFoundMovies] = useState([]);
  const [titleNotFoundMovies, setTitleNotFoundMovies] = useState(true)
  const resultRastIssue = JSON.parse(localStorage.getItem('resultRastIssue'))
  const [disableButton, setDisableButton] = React.useState(false)

  useEffect(() => {
    handleTokenCheck()
    if (loggedIn) {
      Promise.all([
        moviesApi.getAllMovies(),
        mainApi.getSavedMovies({ endpoint: 'movies', methodName: 'GET',}),
        mainApi.detUserInfo({ endpoint: 'users/me', methodName: 'GET', })
      ])
        .then((([dataFilmsFromServer, dataCards, dataUser]) => {
          localStorage.setItem('user', JSON.stringify(dataUser))
          setCurrentUser(dataUser)
          const userData = JSON.parse(localStorage.getItem('user'))
          let mySavedFilms = []
          dataCards.forEach((savedFilm) => {
            if (savedFilm.owner === userData._id) {
              mySavedFilms.push(savedFilm)
              setsavedFilms(mySavedFilms)
            };
          })
          localStorage.setItem('savedMovies', JSON.stringify(mySavedFilms));
          if (resultRastIssue) { setFoundMovies(resultRastIssue) }
          else { setFoundMovies(dataFilmsFromServer) }
          localStorage.setItem('movies', JSON.stringify(dataFilmsFromServer));
        }))
        .catch((err) => {
          history.push('/');
          console.log(err)
        })
        .finally(() => {
          setTitleNotFoundMovies(true)
          setLoading(false)
        })
    }
  }, [loggedIn])


  function handleRegister(data) {
    const { name, email, password } = data.body
    mainApi.register(data)
      .then((data) => {
        setLoading(true)
        setErrorMessage(false)
        setDisableButton(false)
        handleAuthorization({ body: { email, password }, endpoint: 'signin', methodName: 'POST' })
      }).catch((err) => {

        setLoading(false)
        console.log(`Ошибка регистрации: ${err}`)
        setErrorMessage(true)
        setTimeout(hendkeTimeoutSpan, 3000);
      })
      .finally(() => {
        setDisableButton(false)
      }
      )
  }

  function handleAuthorization(data) {
    setDisableButton(true)
    mainApi.authorization(data)
      .then((data) => {
        if (data.token) {
          setLoading(true)
          setLoggedIn(true)
          setErrorMessage(false)
          localStorage.setItem('jwt', data.token)
          history.push('/movies');
          setDisableButton(false)
        } else { return }
      }).catch((err) => {
        setLoading(false)
        setErrorMessage(true)
        setTimeout(hendkeTimeoutSpan, 3000);
        console.log(`Ошибка входа в систему: ${err}`)
        setDisableButton(false)
      })
      .finally(() => {
        hendleGetUserInfo()
        hendleGetSavedMovies()


      })
  }


  function hendleAccountLogout() {
    setLoading(true)
    setDisableButton(true)
    mainApi.accountLogout({
      endpoint: 'signout',
      methodName: 'GET',
    }).then(data => console.log(data))
      .catch((err) => {
        alert('Произошла ошибка, повторите запрос позднее')
        console.log(err)
      })
      .finally(() => {
        setDisableButton(false)
        localStorage.removeItem('jwt')
        localStorage.clear();
        setLoggedIn(false)
        history.push('/');
        setLoading(false)

        setCurrentUser({})
        setsavedFilms([])
        setFoundMovies([])
        setCheckbox(true)
        setErrorMessage(false)
        setInputValue('')
      })

  }

  function handleTokenCheck() {
    const jwt = localStorage.getItem('jwt')
    if (jwt) {
      mainApi.checkToken({
        endpoint: 'users/me',
        methodName: 'GET',
      }).then((res) => {
        setLoggedIn(true);
      }).catch((err) => {
        console.log(`Ошибка проверки токена: ${err}`)
      })
    } else { setLoading(false) }
  }

  function hendleGetUserInfo() {
    mainApi.detUserInfo({
      endpoint: 'users/me',
      methodName: 'GET',
    }).then((user) => {
      setCurrentUser(user)
      localStorage.setItem('user', JSON.stringify(user))
    })
      .catch((err) => {
        console.log(err)
      })
  }

  function hendleEditProfile(data, setSpanSuccessfully, setSpanButtonSubmitText, setDisabledButtonEditProfile) {
    setDisabledButtonEditProfile(true)
    mainApi.patchUserInfo(data)
      .then((res) => {
        
        //setCurrentUser(res.data)
        localStorage.setItem('user', JSON.stringify(res.data))
        setSpanButtonSubmitText('Изменение данных прошло успешно :)')
        setSpanSuccessfully(false)
      })
      .catch((err) => {
        setSpanButtonSubmitText('Что-то пошло не так :(')
        setSpanSuccessfully(false)
        console.log(err)
      })
      .finally(() => { 
        hendleGetUserInfo() })
  }



  function hendleGetSavedMovies() {
    let mySavedFilms = []
    mainApi.getSavedMovies({
      endpoint: 'movies',
      methodName: 'GET',
    }).then((data) => {
      const userData = JSON.parse(localStorage.getItem('user'))
      data.forEach((savedFilm) => {
        if (savedFilm.owner === userData._id) {
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
  function hendkeTimeoutSpan() { setErrorMessage(false) }
  return (
    <CurrentUserContext.Provider value={currentUser}>


      <Switch>

        <Route exact path='/'>
          <Main loggedIn={loggedIn} setLoading={setLoading} onBurgerMenu={burgerHidden} onHendleButtonBurgerMenu={handlerOpeningAndClosingBurgerMenu} />
        </Route>

        <ProtectedRouter path='/signup' loading={loading} setLoading={setLoading} loggedIn={!loggedIn} component={Register} disableButton={disableButton} setDisableButton={setDisableButton}
          onErrorMessageState={errorMessage} handleRegister={handleRegister} />
        <ProtectedRouter path='/signin' loading={loading} setLoading={setLoading} loggedIn={!loggedIn} component={Login} disableButton={disableButton} setDisableButton={setDisableButton}
          onErrorMessageState={errorMessage} handleAuthorization={handleAuthorization} />

        <ProtectedRouter path='/movies' clearData setFoundMovies={setFoundMovies} checkbox={checkbox} setCheckbox={setCheckbox} inputValue={inputValue} setInputValue={setInputValue}
          foundMovies={foundMovies} loading={loading} setLoading={setLoading} setCurrentUser={setCurrentUser} hendleGetUserInfo={hendleGetUserInfo} hendleGetSavedMovies={hendleGetSavedMovies}
          setsavedFilms={setsavedFilms} savedFilms={savedFilms} loggedIn={loggedIn} component={Movies}
          onBurgerMenu={burgerHidden} onHendleButtonBurgerMenu={handlerOpeningAndClosingBurgerMenu} />

        <ProtectedRouter path='/saved-movies' loading={loading} setLoading={setLoading} setTitleNotFoundMovies={setTitleNotFoundMovies} titleNotFoundMovies={titleNotFoundMovies}
          foundMovies={foundMovies} savedFilms={savedFilms} hendleGetSavedMovies={hendleGetSavedMovies} loggedIn={loggedIn}
          component={SavedMovies} onBurgerMenu={burgerHidden} onHendleButtonBurgerMenu={handlerOpeningAndClosingBurgerMenu} />

        <ProtectedRouter path='/profile' loading={loading} disableButton={disableButton} setDisableButton={setDisableButton} onHendleEditProfile={hendleEditProfile}
          loggedIn={loggedIn} component={Profile} onHendleAccountLogout={hendleAccountLogout} onBurgerMenu={burgerHidden} onHendleButtonBurgerMenu={handlerOpeningAndClosingBurgerMenu} />

        <Route path='*'>
          <NotFoundPage />
        </Route>
      </Switch>
      {/* <ProtectedRouter loggedIn={loggedIn} component={BurgerMenu} onBurgerHidden={burgerHidden} onHendleClickClose={handlerOpeningAndClosingBurgerMenu}  /> */}
      <BurgerMenu onBurgerHidden={burgerHidden} onHendleClickClose={handlerOpeningAndClosingBurgerMenu} />
    </CurrentUserContext.Provider>
  );
}

export default App;


