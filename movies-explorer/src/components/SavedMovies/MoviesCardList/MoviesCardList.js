import React from "react";
import MoviesCard from '../../Movies/MoviesCard/MoviesCard';

function MoviesCardList({ savedMovies, titleNothingFound, titleNotFoundMovies, savedFilms, hendleDeleteMovies, hendleGetSavedMovies }) {

    return (
        <section className="movies-cardList__section">
            <h3 className={`movies-cardList__not-found-title ${!titleNotFoundMovies ? 'movies-cardList__not-found-title_loading-error' : ''}`} hidden={titleNothingFound}>{
                titleNotFoundMovies ? 'Ничего не найдено' : 'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз'}</h3>
            <div className="movies-cardList__elements-box">
                {savedMovies.map((savedMovie) => (<MoviesCard key={savedMovie._id} hendleGetSavedMovies={hendleGetSavedMovies} savedFilms={savedFilms} card={savedMovie} hendleDeleteMovies={hendleDeleteMovies} />))}
            </div>
        </section>

    )
}

export default MoviesCardList;
