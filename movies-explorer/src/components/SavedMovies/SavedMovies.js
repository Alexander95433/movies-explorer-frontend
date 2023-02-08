import React, { useState, useEffect } from "react";
import Header from '../Sandbox/Header/Header';
import SearchForm from "./SearchForm/SearchForm"
import MoviesCardList from '../SavedMovies/MoviesCardList/MoviesCardList';
import Footer from '../Sandbox/Footer/Footer';

function SavedMovies(props) {
    const savedMovies = JSON.parse(localStorage.getItem('savedMovies'));
    const [foundSavedMovies, setFoundSavedMovies] = useState([]);
    const [titleNothingFound, setTitleNothingFound] = useState(true);
    const [movieFilteredhResult, setmovieFilteredhResult] = useState([])
    const [checkboxSaved, setCheckboxSaved] = useState(true)


    useEffect(() => {
        setFoundSavedMovies(savedMovies)
    }, [])

    useEffect(() => {
        if (foundSavedMovies.length === 0) { setTitleNothingFound(false) }
        else { setTitleNothingFound(true) }
    }, [foundSavedMovies])



    // разработка альтернативного удаления сохров
    function ff(cards, card) {
        let filmsRender = cards
        let index = {}
        for (let i = 0; i < filmsRender.length; i += 1) {
            let movie = filmsRender[i];
            if (movie._id === card._id) { index = i; }
        }
        filmsRender.splice(index, 1);

        if (!checkboxSaved) {
            debugger
            let filmsRenderFilter = movieFilteredhResult
            let index = {}
            for (let i = 0; i < filmsRenderFilter.length; i += 1) {
                let movie = filmsRenderFilter[i];
                if (movie._id === card._id) { index = i; }
            }
            filmsRenderFilter.splice(index, 1);
            debugger
            setFoundSavedMovies(filmsRenderFilter)
        } else {
            setFoundSavedMovies(filmsRender)
        }
    }
    /////////





    return (
        <>
            <Header onBurgerHidden={props.onBurgerMenu} onBurgerButton={props.onHendleButtonBurgerMenu} loggedIn={props.loggedIn} />
            <main className='saved-movies__page'>
                <SearchForm loading={props.loading} setLoading={props.setLoading} movieFilteredhResult={movieFilteredhResult} setmovieFilteredhResult={setmovieFilteredhResult}
                    checkboxSaved={checkboxSaved} setCheckboxSaved={setCheckboxSaved} setFoundSavedMovies={setFoundSavedMovies} foundSavedMovies={foundSavedMovies} />
                <MoviesCardList setTitleNotFoundMovies={props.setTitleNotFoundMovies} setTitleNothingFound={setTitleNothingFound} titleNotFoundMovies={props.titleNotFoundMovies}
                    titleNothingFound={titleNothingFound} hendleGetSavedMovies={props.hendleGetSavedMovies}
                    savedFilms={props.savedFilms} savedMovies={foundSavedMovies} setFoundSavedMovies={setFoundSavedMovies} ff={ff} />
            </main>
            <Footer />
        </>
    )
}

export default SavedMovies;
