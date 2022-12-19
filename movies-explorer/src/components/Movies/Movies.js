import React, {useState, useEffect } from "react";
import SearchForm from "./SearchForm/SearchForm";
import Preloader from "./Preloader/Preloader";
import MoviesCardList from "./MoviesCardList/MoviesCardList";
import {cards}  from '../../utils/MoviesData';

function Movies() {
    const [loading, setLoading] = useState(false)

    return (
        <section className="movies-page">
            <SearchForm /> {loading ? <Preloader /> :  <MoviesCardList cards={ cards } /> }
             

        </section>
    );
};

export default Movies;
