import React, { useState } from "react";
import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList({ cards }) {
    const [elementNumber, setElementNumber] = useState(6)

    function hendleMoreVideos() {
        setElementNumber(elementNumber + 6)
    }

    return (
        <section className="movies-cardList__section" >
            <div className="movies-cardList__elements-box">
                {cards.slice(0, elementNumber).map((item) => (<MoviesCard key={ item._id } card={ item } />))}
            </div>
            <button onClick={hendleMoreVideos} className="movies-cardList__more-videos-button" type="button">Ещё</button>
        </section>
    )
};

export default MoviesCardList;
