import React, { useState, useEffect } from "react";
import Header from '../Sandbox/Header/Header';
import SearchForm from "./SearchForm/SearchForm"
import MoviesCardList from '../SavedMovies/MoviesCardList/MoviesCardList';
import Footer from '../Sandbox/Footer/Footer';

function SavedMovies(props) {
    const savedMovies = JSON.parse(localStorage.getItem('savedMovies'));
    const movieSearchResult = JSON.parse(localStorage.getItem('movieSearchResultSaved'))
    const checkboxState = JSON.parse(localStorage.getItem('shortSaved'))
    const movieFilteredhResult = JSON.parse(localStorage.getItem('movieFilteredhResultSaved'))
    const queryStore = localStorage.getItem('querySaved')
    const resultRastIssueSaved = JSON.parse(localStorage.getItem('resultRastIssueSved'))
    const [foundSavedMovies, setFoundSavedMovies] = useState([]);
    const [checkboxSaved, setCheckboxSaved] = useState(checkboxState || false)
    const [inputValueSaved, setInputValueSaved] = useState('');
    const [titleNothingFound, setTitleNothingFound] = useState(true);

    // useEffect(() => {
    //     props.hendleGetSavedMovies()
    //     setCheckboxSaved(checkboxState)
    //     if (movieSearchResult.length === 0 && movieFilteredhResult.length === 0) {
    //         props.hendleGetSavedMovies()
    //         setFoundSavedMovies(resultRastIssueSaved)
    //     } else {
    //         setFoundSavedMovies(resultRastIssueSaved)
    //     }
    //     props.setLoading(false)
    //     setInputValueSaved(queryStore)
    // }, [])
    
     
    useEffect(() => {
        setCheckboxSaved(checkboxState)
        // if (movieSearchResult.length === 0 && movieFilteredhResult.length === 0) {
        //     props.hendleGetSavedMovies()
        //     setFoundSavedMovies(resultRastIssueSaved)
        // } else {
        //     setFoundSavedMovies(resultRastIssueSaved)
        // }
        props.setLoading(false)
        setInputValueSaved(queryStore)
}, [])


    useEffect(() => {
        if (foundSavedMovies.length === 0) { setTitleNothingFound(false) }
        else { setTitleNothingFound(true) }
    }, [foundSavedMovies])

    return (
        <>
            <Header onBurgerHidden={props.onBurgerMenu} onBurgerButton={props.onHendleButtonBurgerMenu} loggedIn={props.loggedIn} />
            <main className='saved-movies__page'>
                <SearchForm  savedFilms={props.savedFilms} loading={props.loading} setLoading={props.setLoading}
                    checkbox={checkboxSaved} setCheckbox={setCheckboxSaved} setFoundSavedMovies={setFoundSavedMovies}
                    inputValue={inputValueSaved} setInputValue={setInputValueSaved} foundSavedMovies={foundSavedMovies} />
                <MoviesCardList titleNothingFound={titleNothingFound} titleNotFoundMovies={props.titleNotFoundMovies} hendleGetSavedMovies={props.hendleGetSavedMovies} savedFilms={props.savedFilms} savedMovies={foundSavedMovies} hendleDeleteMovies={props.hendleDeleteMovies} />
            </main>
            <Footer />
        </>
    )
}

export default SavedMovies;
