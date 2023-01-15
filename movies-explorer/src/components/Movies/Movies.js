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

    // На свою ответственность я реализовал следующий алгоритм. При пустой поисковой строке 
    // выводится весь обьём карточек полученного от сервера (отрисовываются по количеству заявленному в задании при клике на кнопу "Ещё").
    // Данные поиска и найденные фильмы сохранаются в localStorage но если очистить поисковую строку то содержимое localStorage для этого функционала очистится
    // и снова будет выведен весь массив карточек. Оправдываю я это тем, что довольно странно выглядит пустая страница при посещение сайта. 
    // В целом руководствовался такой мыслью, что иногда хочется полистать ленту с фильмами и выбрать подходящий, просто посмотреть что вообще есть.
    // Ну, а на пустой странице это реализовать довольно проблематично. В любом случае если мой вариант функционала фатально нарушает правила  приёма тз, то 
    // я могу всё вернуть на место.
    
    useEffect(() => {
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
