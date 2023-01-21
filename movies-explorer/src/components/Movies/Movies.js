import React, { useState, useEffect } from "react";
import Header from '../Sandbox/Header/Header';
import SearchForm from "./SearchForm/SearchForm";
import Preloader from "./Preloader/Preloader";
import MoviesCardList from "./MoviesCardList/MoviesCardList";
import Footer from '../Sandbox/Footer/Footer';
import { moviesApi } from "../../utils/Api"
import { Route, Switch, useLocation } from "react-router-dom";

function Movies(props) {
    const moviesFromServer = JSON.parse(localStorage.getItem('movies'));
    const movieSearchResult = JSON.parse(localStorage.getItem('movieSearchResult'))
    const checkboxState = JSON.parse(localStorage.getItem('shorts'))
    const movieFilteredhResult = JSON.parse(localStorage.getItem('movieFilteredhResult'))
    const queryStore = localStorage.getItem('query')
    const location = useLocation();
    const [movies, setMovies] = useState([]);
    const [moreButtonState, setMoreButtonState] = useState(false);
    const [titleNothingFound, setTitleNothingFound] = useState(true);
    const [titleNotFoundMovies, setTitleNotFoundMovies] = useState(true)

    // На свою ответственность я реализовал следующий алгоритм. При пустой поисковой строке 
    // выводится весь обьём карточек полученного от сервера (отрисовываются по количеству заявленному в задании при клике на кнопу "Ещё").
    // Данные поиска и найденные фильмы сохранаются в localStorage но если очистить поисковую строку то содержимое localStorage для этого функционала очистится
    // и снова будет выведен весь массив карточек. Оправдываю я это тем, что довольно странно выглядит пустая страница при посещение сайта. 
    // В целом руководствовался такой мыслью, что иногда хочется полистать ленту с фильмами и выбрать подходящий, просто посмотреть что вообще есть.
    // Ну, а на пустой странице это реализовать довольно проблематично. В любом случае если мой вариант функционала фатально нарушает правила  приёма тз, то 
    // я могу всё вернуть на место.   checkbox, setCheckbox, filter, onSearchHandler, inputValue, setInputValue

    useEffect(() => {
        console.log(movieSearchResult, 'hhhhhhh')
        props.setCheckbox(checkboxState)
        if (!movieSearchResult || movieSearchResult.length === 0) {
            hendleGetMovies()
        } else {
            props.setFoundMovies(movieSearchResult)
            setTitleNotFoundMovies(true)
            props.setLoading(false)
            props.setInputValue(queryStore)
        }

    }, [])

    function hendleGetMovies() {
        moviesApi.getAllMovies()
            .then((movies) => {
                setMovies(movies)
                props.setFoundMovies(movies)
                localStorage.setItem('movies', JSON.stringify(movies));
                setTitleNotFoundMovies(true)
            }).catch((err) => {
                setTitleNotFoundMovies(false)
                console.log(err)
            })
            .finally(() => props.setLoading(false))
    }
    // Динамическое отображение заполнения инпута для отображения карточек с фильмами по умолчанию после его очистки (!movieSearchResult ? movies : movieSearchResult) 
    useEffect(() => {
        console.log(movieFilteredhResult,'movieFilteredhResult')
        if (movieFilteredhResult) { props.setFoundMovies(movieFilteredhResult) }
        else {
            if (props.inputValue.length === 0) {
                props.setFoundMovies((!movieSearchResult ? movies : moviesFromServer))
                filter = (films)
            }
            else if (props.inputValue === queryStore) { props.setFoundMovies(movieSearchResult) }
        }
    }, [props.inputValue])

    //Динамическое отображение длинны массива с карточками фильмов для корректной работы сообщения о не корректном запросе
    useEffect(() => {
        if (props.foundMovies.length <= 0) {
            setTitleNothingFound(false)
            setMoreButtonState(true)
            return
        }
        if (props.foundMovies.length > 6) {
            setTitleNothingFound(true)
            setMoreButtonState(false)
        } else {
            setTitleNothingFound(true)
            setMoreButtonState(true)
        }
    }, [props.foundMovies])

    return (
        <>
            <Header onBurgerHidden={props.onBurgerMenu} onBurgerButton={props.onHendleButtonBurgerMenu} loggedIn={props.loggedIn} />
            <main className="movies-page">
                <SearchForm loading={props.loading} setLoading={props.setLoading}
                    checkbox={props.checkbox} setCheckbox={props.setCheckbox} setFoundMovies={props.setFoundMovies}
                    inputValue={props.inputValue} setInputValue={props.setInputValue} foundMovies={props.foundMovies} />

                {props.loading ? <Preloader /> :
                    <MoviesCardList hendleGetSavedMovies={props.hendleGetSavedMovies} savedFilms={props.savedFilms}
                        hendleDeleteMovies={props.hendleDeleteMovies} hendleSaveMovies={props.hendleSaveMovies} cards={props.foundMovies}
                        moviesFromServer={moviesFromServer} titleNothingFound={titleNothingFound} titleNotFoundMovies={titleNotFoundMovies}
                        moreButtonState={moreButtonState} setMoreButtonState={setMoreButtonState} />}
            </main>
            <Footer />
        </>
    );
};

export default Movies;
