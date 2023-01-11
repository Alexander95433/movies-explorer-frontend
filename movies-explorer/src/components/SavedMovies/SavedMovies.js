import React, { useState, useEffect } from "react";
import { Route, Switch, useLocation } from 'react-router-dom';
import Header from '../Sandbox/Header/Header';
import MoviesCardList from '../SavedMovies/MoviesCardList/MoviesCardList';
import Footer from '../Sandbox/Footer/Footer';
import mainApi from '../../utils/MainApi';



function SavedMovies(props) {
    const location = useLocation();
    useEffect(() => {
        mainApi.getSavedMovies({
            endpoint: 'movies',
            methodName: 'GET',
        })
            .then((data) => {
                localStorage.setItem('savedMovies', JSON.stringify(data));
                console.log(data)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [location.pathname='/saved-movies'])


    return (
        <>
            <Header onBurgerHidden={props.onBurgerMenu} onBurgerButton={props.onHendleButtonBurgerMenu} />
            <main className='saved-movies__page'>
                
                <MoviesCardList hendleDeleteMovies={props.hendleDeleteMovies} /> 
                
            </main>
            <Footer />
        </>
    )
}

export default SavedMovies;
