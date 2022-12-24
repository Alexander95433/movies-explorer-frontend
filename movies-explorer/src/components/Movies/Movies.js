import React, { useState, useEffect } from "react";

import Header from '../Sandbox/Header/Header';
import SearchForm from "./SearchForm/SearchForm";
import Preloader from "./Preloader/Preloader";
import MoviesCardList from "./MoviesCardList/MoviesCardList";
import { cards } from '../../utils/MoviesData';
import Footer from '../Sandbox/Footer/Footer';

function Movies(props) {
    const [loading, setLoading] = useState(false)
    return (
        <>
          <Header onBurgerHidden={props.onBurgerMenu} onBurgerButton={props.onHendleButtonBurgerMenu} />
            <section className="movies-page">
                <SearchForm /> 
                {loading ? <Preloader /> : <MoviesCardList cards={cards} />}
            </section>
            <Footer />
        </>
    );
};

export default Movies;
