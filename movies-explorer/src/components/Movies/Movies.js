import React, { useState, useEffect } from "react";
import Header from '../Sandbox/Header/Header';
import SearchForm from "./SearchForm/SearchForm";
import Preloader from "./Preloader/Preloader";
import MoviesCardList from "./MoviesCardList/MoviesCardList";
import Footer from '../Sandbox/Footer/Footer';

function Movies(props) {
    const moviesFromServer = JSON.parse(localStorage.getItem('movies'));
    const checkboxState = JSON.parse(localStorage.getItem('shorts'))
    const queryStore = localStorage.getItem('query')
    const [moreButtonState, setMoreButtonState] = useState(false);
    const [titleNothingFound, setTitleNothingFound] = useState(true);
    const [titleNotFoundMovies, setTitleNotFoundMovies] = useState(true)
    const [elementNumber, setElementNumber] = useState(6)
    const [screenSize, setDimension] = useState(window.innerWidth);
    const getDimension = () => { setDimension(window.innerWidth) };
    
    useEffect(() => {
        const savedMoviess = JSON.parse(localStorage.getItem('savedMovies'));
        if (checkboxState === null) { localStorage.setItem('shorts', true) }
        else if (savedMoviess === null) { localStorage.setItem('savedMovies', JSON.stringify([])); }
        else {
            props.setCheckbox(checkboxState)
            props.setInputValue(queryStore)
            setTitleNotFoundMovies(true)
        }
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

    return (
        <>
            <Header onBurgerHidden={props.onBurgerMenu} onBurgerButton={props.onHendleButtonBurgerMenu} loggedIn={props.loggedIn} />
            <main className="movies-page">
                <SearchForm loading={props.loading} setLoading={props.setLoading} controlNumberFilms={controlNumberFilms}
                    checkbox={props.checkbox} setCheckbox={props.setCheckbox} setFoundMovies={props.setFoundMovies}
                    inputValue={props.inputValue} setInputValue={props.setInputValue} foundMovies={props.foundMovies} />

                {props.loading ? <Preloader /> :
                    <MoviesCardList hendleMoreVideos={hendleMoreVideos} elementNumber={elementNumber} hendleGetSavedMovies={props.hendleGetSavedMovies} 
                    savedFilms={props.savedFilms} cards={props.foundMovies} moviesFromServer={moviesFromServer} titleNothingFound={titleNothingFound} 
                    titleNotFoundMovies={titleNotFoundMovies} moreButtonState={moreButtonState} setMoreButtonState={setMoreButtonState} />}
            </main>
            <Footer />
        </>
    );
};

export default Movies;
