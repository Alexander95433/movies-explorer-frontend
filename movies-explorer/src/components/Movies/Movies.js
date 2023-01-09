import React, { useState, useEffect } from "react";
import Header from '../Sandbox/Header/Header';
import SearchForm from "./SearchForm/SearchForm";
import Preloader from "./Preloader/Preloader";
import MoviesCardList from "./MoviesCardList/MoviesCardList";
import Footer from '../Sandbox/Footer/Footer';
import { moviesApi } from "../../utils/Api"
import mainApi from '../../utils/MainApi';
import { movieSearchHandler } from '../../utils/Functions'



function Movies(props) {
    const moviesFromServer = JSON.parse(localStorage.getItem('movies'));
    const movieSearchResult = JSON.parse(localStorage.getItem('movieSearchResult'))
    const queryStore = localStorage.getItem('query')
    const [loading, setLoading] = useState(true);
    const [movies, setMovies] = useState([]);
    const [savedMovies, setSavedMovies] = useState([]);

    const [inputValue, setInputValue] = useState('');
    const [foundMovies, setFoundMovies] = useState([]);
    const [moreButtonState, setMoreButtonState] = useState(false);
    const [titleNothingFound, setTitleNothingFound] = useState(true);
    const [titleNotFoundMovies, setTitleNotFoundMovies] = useState(true)
    // const [clickButton, setclickButton] = useState(false);
    // const [e, setE] = useState({})
    useEffect(() => {
        if (!movieSearchResult || movieSearchResult.length === 0) {
            moviesApi.getAllMovies()
                .then((movies) => {
                    setMovies(movies)
                    setFoundMovies(movies)
                    localStorage.setItem('movies', JSON.stringify(movies));
                    setTitleNotFoundMovies(true)
                })
                .catch((err) => {
                    setTitleNotFoundMovies(false)
                    console.log(err)
                })
                .finally(() => setLoading(false))
        } else {
            setFoundMovies(movieSearchResult)
            setTitleNotFoundMovies(true)
            setLoading(false)
            setInputValue(queryStore)
        }
        mainApi.getSavedMovies({
            endpoint: 'movies',
            methodName: 'GET',
        })
            .then((data) => {
                setSavedMovies(data)
                localStorage.setItem('savedMovies', JSON.stringify(data));
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])


    // Динамическое отображение заполнения инпута для отображения карточек с фильмами по умолчанию после его очистки (!movieSearchResult ? movies : movieSearchResult) 
    useEffect(() => {
        if (inputValue.length === 0) {
            setFoundMovies((!movieSearchResult ? movies : moviesFromServer))
        } else if (inputValue === queryStore) {
            setFoundMovies(movieSearchResult)
        }
    }, [inputValue])

    //Динамическое отображение длинны массива с карточками фильмов для корректной работы сообщения о не корректном запросе
    useEffect(() => {
        if (foundMovies.length <= 0) {
            setTitleNothingFound(false)
            setMoreButtonState(true)
            return
        }
        if (foundMovies.length > 6) {
            setTitleNothingFound(true)
            setMoreButtonState(false)
        } else {
            setTitleNothingFound(true)
            setMoreButtonState(true)
        }
    }, [foundMovies])


    function searchHandler(query) {
        let filtered = movieSearchHandler(moviesFromServer, query);
        localStorage.setItem('movieSearchResult', JSON.stringify(filtered));
        setFoundMovies(filtered);
    }


    return (
        <>
            <Header onBurgerHidden={props.onBurgerMenu} onBurgerButton={props.onHendleButtonBurgerMenu} />
            <main className="movies-page">
                <SearchForm onSearchHandler={searchHandler} inputValue={inputValue} setInputValue={setInputValue} foundMovies={foundMovies} queryStore={queryStore} />

                {loading ? <Preloader /> : <MoviesCardList cards={foundMovies} moviesFromServer={moviesFromServer} titleNothingFound={titleNothingFound}
                    titleNotFoundMovies={titleNotFoundMovies} moreButtonState={moreButtonState} setMoreButtonState={setMoreButtonState} />}
            </main>
            <Footer />
        </>
    );
};

export default Movies;
