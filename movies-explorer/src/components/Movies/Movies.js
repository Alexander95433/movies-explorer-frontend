import React, { useState, useEffect } from "react";
import Header from '../Sandbox/Header/Header';
import SearchForm from "./SearchForm/SearchForm";
import Preloader from "./Preloader/Preloader";
import MoviesCardList from "./MoviesCardList/MoviesCardList";
import Footer from '../Sandbox/Footer/Footer';
import { moviesApi } from "../../utils/Api"

function Movies(props) {
    const moviesFromServer = JSON.parse(localStorage.getItem('movies'));
    const movieSearchResult = JSON.parse(localStorage.getItem('movieSearchResult'))
    const checkboxState = JSON.parse(localStorage.getItem('shorts'))
    const movieFilteredhResult = JSON.parse(localStorage.getItem('movieFilteredhResult'))
    const queryStore = localStorage.getItem('query')
    const resultRastIssue = JSON.parse(localStorage.getItem('resultRastIssue'))
    const [moreButtonState, setMoreButtonState] = useState(false);
    const [titleNothingFound, setTitleNothingFound] = useState(true);
    const [titleNotFoundMovies, setTitleNotFoundMovies] = useState(true)

    const [elementNumber, setElementNumber] = useState(6)
    const [screenSize, setDimension] = useState(window.innerWidth);
    const getDimension = () => { setDimension(window.innerWidth) };

    useEffect(() => {
        props.setCheckbox(checkboxState)
        if (movieSearchResult.length === 0 && movieFilteredhResult.length === 0) {
            hendleGetMovies()
        } else {
            props.setFoundMovies(resultRastIssue)
        }
        props.setLoading(false)
        props.setInputValue(queryStore)
        setTitleNotFoundMovies(true)
    }, [])

    // Для отображения или сакрытия кнопки Ещё
    useEffect(() => {
        if (props.foundMovies.length <= 0) {
            setTitleNothingFound(false)
            setMoreButtonState(true)
        }
        else if (props.foundMovies.length > elementNumber) {
            setTitleNothingFound(true)
            setMoreButtonState(false)
        }
        else {
            setTitleNothingFound(true)
            setMoreButtonState(true)
        }
    }, [elementNumber, props.foundMovies.length])

    // Для различного числа рендора карточек в зависимости от масштаба окна
    useEffect(() => {
        controlNumberFilms()
    }, [screenSize])

    // Обновляет счётчик карточек для рендера в зависимости от масштаба окна 
    function hendleMoreVideos() {
        if (screenSize < 643) { setElementNumber(elementNumber + 5) }
        else if (screenSize < 760) { setElementNumber(elementNumber + 8) }
        else { setElementNumber(elementNumber + 12) }
    }

    // Обновляет количество карточек для первого рендера в зависимости от масштаба окна 
    function controlNumberFilms() {
        if (screenSize < 643) { setElementNumber(5) }
        else if (screenSize < 760) { setElementNumber(8) }
        else { setElementNumber(12) }
        window.addEventListener('resize', getDimension);
        return (() => { window.removeEventListener('resize', getDimension); })
    }

    function hendleGetMovies() {
        moviesApi.getAllMovies()
            .then((movies) => {
                props.setFoundMovies(movies)
                localStorage.setItem('movies', JSON.stringify(movies));
                setTitleNotFoundMovies(true)
            }).catch((err) => {
                setTitleNotFoundMovies(false)
                console.log(err)
            })
            .finally(() => props.setLoading(false))
    }

    return (
        <>
            <Header onBurgerHidden={props.onBurgerMenu} onBurgerButton={props.onHendleButtonBurgerMenu} loggedIn={props.loggedIn} />
            <main className="movies-page">
                <SearchForm loading={props.loading} setLoading={props.setLoading} controlNumberFilms={controlNumberFilms}
                    checkbox={props.checkbox} setCheckbox={props.setCheckbox} setFoundMovies={props.setFoundMovies}
                    inputValue={props.inputValue} setInputValue={props.setInputValue} foundMovies={props.foundMovies} />

                {props.loading ? <Preloader /> :
                    <MoviesCardList hendleMoreVideos={hendleMoreVideos} elementNumber={elementNumber} hendleGetSavedMovies={props.hendleGetSavedMovies} savedFilms={props.savedFilms}
                        cards={props.foundMovies}
                        moviesFromServer={moviesFromServer} titleNothingFound={titleNothingFound} titleNotFoundMovies={titleNotFoundMovies}
                        moreButtonState={moreButtonState} setMoreButtonState={setMoreButtonState} />}
            </main>
            <Footer />
        </>
    );
};

export default Movies;
