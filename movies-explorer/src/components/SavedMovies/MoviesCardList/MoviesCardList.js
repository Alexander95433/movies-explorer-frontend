import React from "react";
import MoviesCard from '../../Movies/MoviesCard/MoviesCard';

function MoviesCardList({ff, setTitleNotFoundMovies, setTitleNothingFound, savedMovies, titleNothingFound, titleNotFoundMovies, savedFilms, hendleGetSavedMovies }) {
    const moviesSaved = JSON.parse(localStorage.getItem('savedMovies'));

   

    return (
        <section className="movies-cardList__section">
            <h3 className={`movies-cardList__not-found-title ${!titleNotFoundMovies ? 'movies-cardList__not-found-title_loading-error' : ''}`} hidden={titleNothingFound}>{
                titleNotFoundMovies ? 'Ничего не найдено' : 'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз'}</h3>
            <div className="movies-cardList__elements-box">
                {savedMovies.map((savedMovie) => ( <MoviesCard key={savedMovie._id} titleNotFoundMovies={titleNotFoundMovies} id={savedMovie._id} 
                setTitleNothingFound={setTitleNothingFound} setTitleNotFoundMovies={setTitleNotFoundMovies} hendleGetSavedMovies={hendleGetSavedMovies}
                 savedFilms={savedFilms} card={savedMovie}  ff={ff}/>
                ))}
            </div>
        </section>

    )
}

export default MoviesCardList;
