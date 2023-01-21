import React, { useEffect } from "react";
import { Route, useLocation } from 'react-router-dom';
import Header from '../Sandbox/Header/Header';
import SearchForm from "../Movies/SearchForm/SearchForm"
import MoviesCardList from '../SavedMovies/MoviesCardList/MoviesCardList';
import Footer from '../Sandbox/Footer/Footer';

function SavedMovies(props) {
    const savedMovies = JSON.parse(localStorage.getItem('savedMovies'));
    const location = useLocation();
    useEffect(() => {
        props.hendleGetSavedMovies()
    }, [location.pathname = '/saved-movies', savedMovies])

    return (
        <>
            <Header onBurgerHidden={props.onBurgerMenu} onBurgerButton={props.onHendleButtonBurgerMenu} loggedIn={props.loggedIn} />
            
            <main className='saved-movies__page'>
            {/* <SearchForm loading={props.loading} setLoading={props.setLoading}
                checkbox={props.checkbox} setCheckbox={props.setCheckbox} setFoundMovies={props.setFoundMovies}
                inputValue={props.inputValue} setInputValue={props.setInputValue} foundMovies={props.foundMovies} /> */}
                <MoviesCardList hendleGetSavedMovies={props.hendleGetSavedMovies} savedFilms={props.savedFilms} hendleDeleteMovies={props.hendleDeleteMovies} />

            </main>
            <Footer />
        </>
    )
}

export default SavedMovies;
