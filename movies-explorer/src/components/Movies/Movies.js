import React, { useState, useEffect } from "react";
import Header from '../Sandbox/Header/Header';
import SearchForm from "./SearchForm/SearchForm";
import Preloader from "./Preloader/Preloader";
import MoviesCardList from "./MoviesCardList/MoviesCardList";
import Footer from '../Sandbox/Footer/Footer';
import { moviesApi } from "../../utils/Api"
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
    
    useEffect(() => {
        debugger
        props.hendleGetUserInfo()
        if (!movieSearchResult || movieSearchResult.length === 0) {
            props.hendleGetUserInfo()
            hendleGetMovies()
        } else {
            setFoundMovies(movieSearchResult)
            setTitleNotFoundMovies(true)
            setLoading(false)
            setInputValue(queryStore)
        }

    }, [])

    function hendleGetMovies() {
        moviesApi.getAllMovies()
            .then((movies) => {
                setMovies(movies)
                setFoundMovies(movies)
                localStorage.setItem('movies', JSON.stringify(movies));
                setTitleNotFoundMovies(true)
            }).catch((err) => {
                setTitleNotFoundMovies(false)
                console.log(err)
            })
        .finally(() => setLoading(false))
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
                <SearchForm filter={filter} onSearchHandler={searchHandler} inputValue={inputValue} setInputValue={setInputValue}
                    foundMovies={foundMovies} queryStore={queryStore} />

                {loading ? <Preloader /> : <MoviesCardList hendleGetSavedMovies={props.hendleGetSavedMovies} savedFilms={props.savedFilms}
                    hendleDeleteMovies={props.hendleDeleteMovies} hendleSaveMovies={props.hendleSaveMovies} cards={foundMovies}
                    moviesFromServer={moviesFromServer} titleNothingFound={titleNothingFound} titleNotFoundMovies={titleNotFoundMovies}
                    moreButtonState={moreButtonState} setMoreButtonState={setMoreButtonState} />}
            </main>
            <Footer />
        </>
    );
};

export default Movies;
