import React, { useState, useEffect } from "react";
import Header from '../Sandbox/Header/Header';
import SearchForm from "./SearchForm/SearchForm"
import MoviesCardList from '../SavedMovies/MoviesCardList/MoviesCardList';
import Footer from '../Sandbox/Footer/Footer';

function SavedMovies(props) {
    const checkboxState = JSON.parse(localStorage.getItem('shortSaved'))
    const queryStore = localStorage.getItem('querySaved')
    const [foundSavedMovies, setFoundSavedMovies] = useState([]);
    const [checkboxSaved, setCheckboxSaved] = useState(true)
    const [inputValueSaved, setInputValueSaved] = useState('');
    const [titleNothingFound, setTitleNothingFound] = useState(true);

    useEffect(() => {
        if(checkboxState === null){
            setCheckboxSaved(true)
        } else{
        setCheckboxSaved(checkboxState)
        setInputValueSaved(queryStore)}
    }, [])

    useEffect(() => {
        if (foundSavedMovies.length === 0) { setTitleNothingFound(false) }
        else { setTitleNothingFound(true) }
    }, [foundSavedMovies])

    return (
        <>
            <Header onBurgerHidden={props.onBurgerMenu} onBurgerButton={props.onHendleButtonBurgerMenu} loggedIn={props.loggedIn} />
            <main className='saved-movies__page'>
                <SearchForm  loading={props.loading} setLoading={props.setLoading} checDeleteCard={props.checDeleteCard}
                    checkbox={checkboxSaved} setCheckbox={setCheckboxSaved} setFoundSavedMovies={setFoundSavedMovies}
                    inputValue={inputValueSaved} setInputValue={setInputValueSaved} foundSavedMovies={foundSavedMovies} />
                <MoviesCardList titleNothingFound={titleNothingFound} titleNotFoundMovies={props.titleNotFoundMovies} hendleGetSavedMovies={props.hendleGetSavedMovies} 
                savedFilms={props.savedFilms} savedMovies={foundSavedMovies} checDeleteCard={props.checDeleteCard}    setChecDeleteCard={props.setChecDeleteCard}/>
            </main>
            <Footer />
        </>
    )
}

export default SavedMovies;
