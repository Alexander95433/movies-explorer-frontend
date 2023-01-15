import React from "react";
import SearchForm from '../../Movies/SearchForm/SearchForm';
import MoviesCard from '../../Movies/MoviesCard/MoviesCard';

function MoviesCardList({savedFilms, hendleDeleteMovies}) {
    const savedMovies = JSON.parse(localStorage.getItem('savedMovies'));
    
    
    return (
        <>
            <SearchForm />
            <section className="movies-cardList__elements-box">
                {savedMovies.map((savedMovie) => (<MoviesCard key={savedMovie._id} savedFilms={savedFilms} card={savedMovie} hendleDeleteMovies={hendleDeleteMovies}/>))}
                {/* <h3 hidden={titleNothingFound}>нет</h3> */}
            </section>
            </>
    )
}

export default MoviesCardList;
