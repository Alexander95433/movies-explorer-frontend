import React, { useState, useEffect } from "react";
import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList({cards, movieStorage, titleNothingFound}) {
    const [elementNumber, setElementNumber] = useState(6)
    const [moreButtonState, setMoreButtonState] = useState(false)

    

    function hendleMoreVideos() {
        setElementNumber(elementNumber + 6)
        if(movieStorage.length - elementNumber <= 0) { setMoreButtonState(true) }
    }

    return (
        <section className="movies-cardList__section" >
            <h3 className="movies-cardList__not-found-title" hidden={titleNothingFound}>Фильмы не найдены </h3> 
            <div className="movies-cardList__elements-box">
                {cards.slice(0, elementNumber).map((item) => (<MoviesCard key={ item.id } card={ item } />))}
            </div>
            <button onClick={hendleMoreVideos} className="movies-cardList__more-videos-button" type="button" hidden={moreButtonState || !titleNothingFound}>Ещё</button>
        </section>
    )
};

export default MoviesCardList;
