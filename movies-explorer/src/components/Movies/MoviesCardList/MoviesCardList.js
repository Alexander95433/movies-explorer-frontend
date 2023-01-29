import React, { useState, useEffect } from "react";
import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList({ elementNumber, hendleMoreVideos, hendleGetSavedMovies, savedFilms, cards, titleNothingFound, titleNotFoundMovies, moreButtonState, setMoreButtonState }) {
    // const [elementNumber, setElementNumber] = useState(6)
    // const [screenSize, setDimension] = useState(window.innerWidth);
    // const getDimension = () => { setDimension(window.innerWidth) };

    // //Обновляет счётчик карточек для рендера в зависимости от масштаба окна 
    // function hendleMoreVideos() {
    //     debugger
    //     if (screenSize < 643) {
    //          setElementNumber(elementNumber + 5)
    //          debugger
    //          }
    //     else if (screenSize < 760) { 
    //         setElementNumber(elementNumber + 8)
    //         debugger
    //      }
    //     else {
    //          setElementNumber(elementNumber + 12) 
    //          debugger
    //         }

    // }

    // //Для корректного отображения/скрытия кнопки "Ещё" при отсутствии карточек
    // useEffect(() => {
        
    //     if (cards.length < elementNumber) { 
    //         setMoreButtonState(true) 
    //         debugger
    //     }
    // }, [elementNumber, cards.length])

    // //Для различного числа рендора карточек в зависимости от масштаба окна
    // useEffect(() => {
    //     debugger
    //     if (screenSize < 643) {
    //          setElementNumber(5) 
    //          debugger
    //         }
    //     else if (screenSize < 760) {
    //          setElementNumber(8) 
    //          debugger
    //         }
    //     else { 
    //         setElementNumber(12)
    //         debugger
    //      }
    //     window.addEventListener('resize', getDimension);
    //     return (() => {
    //          window.removeEventListener('resize', getDimension);
    //          })
    // }, [screenSize])

    return (
        <section className="movies-cardList__section" >
            <h3 className={`movies-cardList__not-found-title ${!titleNotFoundMovies ? 'movies-cardList__not-found-title_loading-error' : ''}`} hidden={titleNothingFound}>{
                titleNotFoundMovies ? 'Ничего не найдено' : 'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз'}</h3>
            <div className="movies-cardList__elements-box">
                {cards.slice(0, elementNumber).map((movie) => (
                    <MoviesCard key={movie.id} hendleGetSavedMovies={hendleGetSavedMovies} card={movie} savedFilms={savedFilms} />))}
            </div>
            <button onClick={hendleMoreVideos} className="movies-cardList__more-videos-button" type="button" hidden={moreButtonState}>Ещё</button>
        </section>
    )

}

export default MoviesCardList;