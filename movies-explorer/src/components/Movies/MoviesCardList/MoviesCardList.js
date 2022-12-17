import MoviesCard from "../MoviesCard/MoviesCard";


function MoviesCardList({ cards }) {
    return (
        // <section className="element">
        //     {cards.map((item) => (<MoviesCard card={item} />))}
        // </section>
    <section className="moviesCardList__elements-box">
            <MoviesCard />
        </section>
    )
};

export default MoviesCardList;
