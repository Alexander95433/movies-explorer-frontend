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
  const [errorMessage, setErrorMessage] = useState('')
  const [savedFilms, setsavedFilms] = useState([])
  const [checkbox, setCheckbox] = useState(true)
  const [inputValue, setInputValue] = useState('');
  const [foundMovies, setFoundMovies] = useState([]);
  const [titleNotFoundMovies, setTitleNotFoundMovies] = useState(true)
  const [checDeleteCard, setChecDeleteCard] = useState(false)
  const resultRastIssue = JSON.parse(localStorage.getItem('resultRastIssue'))

  useEffect(() => {
    handleTokenCheck()
    if (loggedIn) {
      Promise.all([mainApi.detUserInfo({ endpoint: 'users/me', methodName: 'GET', }),
      mainApi.getSavedMovies({ endpoint: 'movies', methodName: 'GET', }),
      moviesApi.getAllMovies()])
        .then((([dataUser, dataCards, dataFilmsFromServer]) => {
          localStorage.setItem('user', JSON.stringify(dataUser))
          setCurrentUser(dataUser)
          const userData = JSON.parse(localStorage.getItem('user'))
          let mySavedFilms = []
          // debugger
          dataCards.forEach((savedFilm) => {
            if (savedFilm.owner === userData._id) {
              mySavedFilms.push(savedFilm)
              setsavedFilms(mySavedFilms)
            };
          })
          localStorage.setItem('savedMovies', JSON.stringify(mySavedFilms));
          // debugger
          if (resultRastIssue) { setFoundMovies(resultRastIssue) }
          else { setFoundMovies(dataFilmsFromServer) }
          localStorage.setItem('movies', JSON.stringify(dataFilmsFromServer));
        }))
        .catch(err => console.log(`Ошибка: ${err}`))
        .finally(() => {
          setTitleNotFoundMovies(true)
          setLoading(false)
          // debugger
        })
    }
  }, [loggedIn])


  function handleRegister(data) {
    const { name, email, password } = data.body
    mainApi.register(data)
      .then((data) => {
        setErrorMessage('')
        setLoggedIn(true)
      }).catch((err) => {
        console.log(`Ошибка регистрации: ${err}`)
        setErrorMessage('Пользователь с такой почтой уже существует')
      })
      .finally(() => {
        handleAuthorization({ body: { email, password }, endpoint: 'signin', methodName: 'POST' })
      }
      )
  }

  function handleAuthorization(data) {
    mainApi.authorization(data)
      .then((data) => {
        if (data.token) {
          setLoggedIn(true)
          setErrorMessage('')
          localStorage.setItem('jwt', data.token)
          history.push('/movies');
        } else { return }
      }).catch((err) => {
        setErrorMessage('Не не правильная почта или пароль')
        console.log(`Ошибка входа в систему: ${err}`)
      })
      .finally(() => {
        hendleGetUserInfo()
        hendleGetSavedMovies()
        setLoading(true)

      })
  }

  function hendleAccountLogout() {
    mainApi.accountLogout({
      endpoint: 'signout',
      methodName: 'GET',
    }).then(data => console.log(data))
      .catch(err => console.log(err))
      .finally(() => {
        localStorage.removeItem('jwt')
        localStorage.clear();
        debugger
        setLoggedIn(false)
        history.push('/');
      })

  }

  function handleTokenCheck() {
    const jwt = localStorage.getItem('jwt')
    if(jwt){
      mainApi.checkToken({
        endpoint: 'users/me',
        methodName: 'GET',
      }).then((res) => {
        setLoggedIn(true);
        
        // if (res) {
        //   setLoggedIn(true);
        // }
      }).catch((err) => {
       // setLoggedIn(false);
        console.log(`Ошибка проверки токена: ${err}`)
      }) 
    } else {setLoading(false)}
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

  function hendleEditProfile(data, setSpanSuccessfully, setSpanButtonSubmitText) {
    debugger
    mainApi.patchUserInfo(data)
      .then((res) => {
        setCurrentUser(res.data)
        localStorage.setItem('user', JSON.stringify(res.data))
        setSpanButtonSubmitText('Изменение данных прошло успешно :)')
        setSpanSuccessfully(false)
      })
      .catch((err) => { 
        setSpanButtonSubmitText('Что-то пошло не так :(')
        setSpanSuccessfully(false)
        console.log(err) })
      .finally(() => {  hendleGetUserInfo() }) 
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

  return (
    <CurrentUserContext.Provider value={currentUser}>
        
      
      <Switch>
      
        <Route exact path='/'>
          <Main loggedIn={loggedIn} setLoading={setLoading} onBurgerMenu={burgerHidden} onHendleButtonBurgerMenu={handlerOpeningAndClosingBurgerMenu} />
        </Route>
        
        <ProtectedRouter path='/signup' loading={loading} loggedIn={!loggedIn} component={Register} onErrorMessage={errorMessage} handleRegister={handleRegister} />
        <ProtectedRouter path='/signin' loading={loading} loggedIn={!loggedIn} component={Login} onErrorMessage={errorMessage} handleAuthorization={handleAuthorization} />
       
        <ProtectedRouter path='/movies' setFoundMovies={setFoundMovies} checkbox={checkbox} setCheckbox={setCheckbox} inputValue={inputValue} setInputValue={setInputValue}
          foundMovies={foundMovies} loading={loading} setLoading={setLoading} setCurrentUser={setCurrentUser} hendleGetUserInfo={hendleGetUserInfo} hendleGetSavedMovies={hendleGetSavedMovies}
          setsavedFilms={setsavedFilms} savedFilms={savedFilms} loggedIn={loggedIn} component={Movies}
          onBurgerMenu={burgerHidden} onHendleButtonBurgerMenu={handlerOpeningAndClosingBurgerMenu} />

        <ProtectedRouter path='/saved-movies' checDeleteCard={checDeleteCard} setChecDeleteCard={setChecDeleteCard}
          loading={loading} setLoading={setLoading} setTitleNotFoundMovies={setTitleNotFoundMovies} titleNotFoundMovies={titleNotFoundMovies}
          foundMovies={foundMovies} savedFilms={savedFilms} hendleGetSavedMovies={hendleGetSavedMovies} loggedIn={loggedIn}
          component={SavedMovies} onBurgerMenu={burgerHidden} onHendleButtonBurgerMenu={handlerOpeningAndClosingBurgerMenu} />

        <ProtectedRouter path='/profile' loading={loading} onHendleEditProfile={hendleEditProfile} loggedIn={loggedIn} component={Profile} onHendleAccountLogout={hendleAccountLogout}
          onBurgerMenu={burgerHidden} onHendleButtonBurgerMenu={handlerOpeningAndClosingBurgerMenu} /> 
      
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
