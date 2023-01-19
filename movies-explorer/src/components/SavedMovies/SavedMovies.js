import React, { useEffect } from "react";
import { useLocation } from 'react-router-dom';
import Header from '../Sandbox/Header/Header';
import MoviesCardList from '../SavedMovies/MoviesCardList/MoviesCardList';
import Footer from '../Sandbox/Footer/Footer'; 

function SavedMovies(props) {
    const savedMovies = JSON.parse(localStorage.getItem('savedMovies'));
    const location = useLocation();
    useEffect(() => {
        props.hendleGetSavedMovies()
    }, [location.pathname='/saved-movies', savedMovies])

    return (
        <>
            <Header onBurgerHidden={props.onBurgerMenu} onBurgerButton={props.onHendleButtonBurgerMenu} loggedIn={props.loggedIn}/>
            <main className='saved-movies__page'>
                <MoviesCardList hendleGetSavedMovies={props.hendleGetSavedMovies} savedFilms={props.savedFilms} hendleDeleteMovies={props.hendleDeleteMovies} /> 
                
            </main>
            <Footer />
        </>
    )
}

export default SavedMovies;
