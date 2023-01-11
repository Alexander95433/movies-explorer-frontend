import React, { useState, useEffect } from "react";
import Header from '../Sandbox/Header/Header';
import SearchForm from "./SearchForm/SearchForm";
import Preloader from "./Preloader/Preloader";
import MoviesCardList from "./MoviesCardList/MoviesCardList";
import Footer from '../Sandbox/Footer/Footer';
import { moviesApi } from "../../utils/Api"
import mainApi from '../../utils/MainApi';
import { movieSearchHandler } from '../../utils/Functions'
import { searchFilter } from "../../utils/Functions";

function Movies(props) {
    const moviesFromServer = JSON.parse(localStorage.getItem('movies'));
    const movieSearchResult = JSON.parse(localStorage.getItem('movieSearchResult'))
    const checkboxState = JSON.parse(localStorage.getItem('shorts'))
    const queryStore = localStorage.getItem('query')
    const [loading, setLoading] = useState(true);
    const [movies, setMovies] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [foundMovies, setFoundMovies] = useState([]);
    const [moreButtonState, setMoreButtonState] = useState(false);
    const [titleNothingFound, setTitleNothingFound] = useState(true);
    const [titleNotFoundMovies, setTitleNotFoundMovies] = useState(true)
    const [savedFilms, setsavedFilms] = useState([])

    useEffect(() => {
        if (!movieSearchResult || movieSearchResult.length === 0) {
            hendleGetMovies()
        } else {
            setFoundMovies(movieSearchResult)
            setTitleNotFoundMovies(true)
            setLoading(false)
            setInputValue(queryStore)
        }
        hendleGetSavedMovies()
    }, [])

    function hendleGetMovies(data) {
        moviesApi.getAllMovies()
            .then((movies) => {
                setMovies(movies)
                setFoundMovies(movies)
                localStorage.setItem('movies', JSON.stringify(movies));
                setTitleNotFoundMovies(true)
            }).catch((err) => {
                setTitleNotFoundMovies(false)
                console.log(err)
            }).finally(() => setLoading(false))
    }

    function hendleGetSavedMovies() {
        mainApi.getSavedMovies({
            endpoint: 'movies',
            methodName: 'GET',
        }).then((data) => {
            localStorage.setItem('savedMovies', JSON.stringify(data));
            setsavedFilms(data)
        }).catch((err) => {
            console.log(err)
        })
    }

    // Динамическое отображение заполнения инпута для отображения карточек с фильмами по умолчанию после его очистки (!movieSearchResult ? movies : movieSearchResult) 
    useEffect(() => {
        if (inputValue.length === 0) { setFoundMovies((!movieSearchResult ? movies : moviesFromServer)) }
        else if (inputValue === queryStore) { setFoundMovies(movieSearchResult) }
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

    const filter = (query) => {
        const storedMovies = JSON.parse(localStorage.getItem('movies'));
        const filtered = searchFilter(storedMovies, query, checkboxState)
        setFoundMovies(filtered);
        setLoading(false);
    };

    return (
        <>
            <Header onBurgerHidden={props.onBurgerMenu} onBurgerButton={props.onHendleButtonBurgerMenu} />
            <main className="movies-page">
                <SearchForm filter={filter} onSearchHandler={searchHandler} inputValue={inputValue} setInputValue={setInputValue} foundMovies={foundMovies} queryStore={queryStore} />

                {loading ? <Preloader /> : <MoviesCardList hendleGetSavedMovies={hendleGetSavedMovies} savedFilms={savedFilms} hendleDeleteMovies={props.hendleDeleteMovies} hendleSaveMovies={props.hendleSaveMovies} cards={foundMovies} moviesFromServer={moviesFromServer} titleNothingFound={titleNothingFound}
                    titleNotFoundMovies={titleNotFoundMovies} moreButtonState={moreButtonState} setMoreButtonState={setMoreButtonState} />}
            </main>
            <Footer />
        </>
    );
};

export default Movies;
