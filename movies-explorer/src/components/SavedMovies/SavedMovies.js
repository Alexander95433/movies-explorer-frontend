import React, { useState, useEffect } from "react";

import Header from '../Sandbox/Header/Header';
import MoviesCardList from '../SavedMovies/MoviesCardList/MoviesCardList';
import Footer from '../Sandbox/Footer/Footer';
import mainApi from '../../utils/MainApi';



function SavedMovies(props) {
    const savedMovies = JSON.parse(localStorage.getItem('savedMovies'));
    // const [savedMovies, setSavedMovies] = useState([]);

    // useEffect(() => {
    //     mainApi.getSavedMovies({
    //         endpoint: 'movies',
    //         methodName: 'GET',
    //     })
    //         .then((data) => {
    //             setSavedMovies(data)
    //             localStorage.setItem('savedMovies', JSON.stringify(data));
    //         })
    //         .catch((err) => {
    //             console.log(err)
    //         })
    // },[])

    return (
        <>
            <Header onBurgerHidden={props.onBurgerMenu} onBurgerButton={props.onHendleButtonBurgerMenu} />
            <main className='saved-movies__page'>{savedMovies.map((savedCard) => (
                <MoviesCardList cards={savedCard} />
            ))}
                 
            </main>
            <Footer />
        </>
    )
}

export default SavedMovies;
