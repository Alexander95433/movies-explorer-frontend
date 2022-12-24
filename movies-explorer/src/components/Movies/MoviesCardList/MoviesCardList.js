import React, { useState } from "react";
import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList({ cards }) {
    const [elementNumber, setElementNumber] = useState(6)

    function hendleMoreVideos() {
        setElementNumber(elementNumber + 6)
    }

    return (
        <section className="moviesCardList__section" >
            <div className="moviesCardList__elements-box">
                {cards.slice(0, elementNumber).map((item) => (<MoviesCard card={item} />))}
            </div>
            <button onClick={hendleMoreVideos} className="moviesCardList__more-videos-button" type="button">Ещё</button>
        </section>
    )
};

export default MoviesCardList;
