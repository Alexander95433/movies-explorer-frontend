import React, { useState, useEffect } from "react";
import SearchForm from '../../Movies/SearchForm/SearchForm';
import MoviesCard from '../../Movies/MoviesCard/MoviesCard';
import mainApi from "../../../utils/MainApi";

function MoviesCardList({hendleDeleteMovies}) {
    const savedMovies = JSON.parse(localStorage.getItem('savedMovies'));
    
  
    return (
        <>
            <SearchForm />
            <section className="movies-cardList__elements-box">
                {savedMovies.map((savedMovie) => (<MoviesCard key={savedMovie._id} card={savedMovie} hendleDeleteMovies={hendleDeleteMovies}/>))}
                {/* <h3 hidden={titleNothingFound}>нет</h3> */}
            </section>
            </>
    )
}

export default MoviesCardList;
