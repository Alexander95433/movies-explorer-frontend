import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList({ elementNumber, hendleMoreVideos, hendleGetSavedMovies, savedFilms, cards, titleNothingFound, titleNotFoundMovies, moreButtonState }) {

    return (
        <section className="movies-cardList__section" >
            <h3 className={`movies-cardList__not-found-title ${!titleNotFoundMovies ? 'movies-cardList__not-found-title_loading-error' : ''}`} hidden={titleNothingFound}>{
                titleNotFoundMovies ? 'Ничего не найдено' : 'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз'}</h3>
            <div className="movies-cardList__elements-box">
                {cards.slice(0, elementNumber).map((movie) => (
                    <MoviesCard key={movie.id} hendleGetSavedMovies={hendleGetSavedMovies} card={movie} savedFilms={savedFilms} />
                   
                    ))}
            </div>
            <button onClick={hendleMoreVideos} className="movies-cardList__more-videos-button" type="button" hidden={moreButtonState}>Ещё</button>
        </section>
    )

}

export default MoviesCardList;