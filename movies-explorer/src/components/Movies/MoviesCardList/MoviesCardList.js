import React, { useState, useEffect } from "react";
import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList({ cards, moviesFromServer, titleNothingFound, titleNotFoundMovies, moreButtonState, setMoreButtonState }) {
    const [elementNumber, setElementNumber] = useState(6)
    ///
    const [screenSize, setDimension] = useState(window.innerWidth);
    const getDimension = () => { setDimension(window.innerWidth) };



    //Обновляет счётчик карточек для рендера в зависимости от масштаба окна
    function hendleMoreVideos() {
        if (screenSize < 643) {
            setElementNumber(elementNumber + 5)
        } else if (screenSize < 760) {
            setElementNumber(elementNumber + 8)
        } else { setElementNumber(elementNumber + 12) }
    }

    //Для корректного отображения/скрытия кнопки "Ещё" при отсутствии карточек
    useEffect(() => {
        //  if (moviesFromServer.length - elementNumber <= 0) { setMoreButtonState(true) }
        if(cards.length < elementNumber) {setMoreButtonState(true)}
    }, [elementNumber, cards.length])
    
    //Для различного числа рендора карточек в зависимости от масштаба окна
    useEffect(() => {
        if (screenSize < 643) {
            setElementNumber(5)
        } else if (screenSize < 760) {
            setElementNumber(8)
        } else {
            setElementNumber(12)
        }
        window.addEventListener('resize', getDimension);
        return (() => { window.removeEventListener('resize', getDimension); })
    }, [screenSize])




    return (
        <section className="movies-cardList__section" >
            <h3 className={`movies-cardList__not-found-title ${!titleNotFoundMovies ? 'movies-cardList__not-found-title_loading-error' : ''}`} hidden={titleNothingFound}>{
                titleNotFoundMovies ? 'Ничего не найдено' : 'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз'}</h3>
            <div className="movies-cardList__elements-box">
                {cards.slice(0, elementNumber).map((item) => (<MoviesCard key={item.id} card={item} />))}
            </div>
            <button onClick={hendleMoreVideos} className="movies-cardList__more-videos-button" type="button" hidden={moreButtonState}>Ещё</button>
        </section>
    )

}

export default MoviesCardList;