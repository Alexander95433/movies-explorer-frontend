import { useState, useEffect } from "react";
import Header from '../Sandbox/Header/Header';
import SearchForm from "./SearchForm/SearchForm";
import Preloader from "./Preloader/Preloader";
import MoviesCardList from "./MoviesCardList/MoviesCardList";
import Footer from '../Sandbox/Footer/Footer';
import { moviesApi } from "../../utils/Api"
import { movieSearchHandler } from '../../utils/Functions'


function Movies(props) {
    const moviesFromServer = JSON.parse(localStorage.getItem('movies'));
    const movieSearchResult = JSON.parse(localStorage.getItem('movieSearchResult'))
    const queryStore = localStorage.getItem('query')
    const [loading, setLoading] = useState(true);
    const [movies, setMovies] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [foundMovies, setFoundMovies] = useState([]);
    const [titleNothingFound, setTitleNothingFound] = useState(true);
    const [moreButtonState, setMoreButtonState] = useState(false)
    const [titleNotFoundMovies, setTitleNotFoundMovies] = useState(true)

    useEffect(() => {
        if (!movieSearchResult || movieSearchResult.length === 0 ) {
            moviesApi.getAllMovies()
                .then((movies) => {
                    console.log(movies)
                    setMovies(movies)
                    setFoundMovies(movies)
                    localStorage.setItem('movies', JSON.stringify(movies));
                    setTitleNotFoundMovies(true)
                })
                .catch((err) => {
                    setTitleNotFoundMovies(false)
                    console.log(err)
                })
                .finally(() => setLoading(false))
        } else {
            setFoundMovies(movieSearchResult)
            setTitleNotFoundMovies(true)
            setLoading(false)
            console.log(queryStore)
            setInputValue(queryStore)
        }
    }, [])

  
    // Динамическое отображение заполнения инпута для отображения карточек с фильмами по умолчанию после его очистки (!movieSearchResult ? movies : movieSearchResult) 
    useEffect(() => {
        if (inputValue.length === 0) {
            setFoundMovies((!movieSearchResult ? movies : moviesFromServer))
        } else if (inputValue === queryStore) {
            setFoundMovies(movieSearchResult)
        }
    }, [inputValue])

    //Динамическое отображение длинны массива с карточками фильмов для корректной работы сообщения о не корректном запросе
    useEffect(() => {
        if (foundMovies.length <= 0) {
            setTitleNothingFound(false)
            setMoreButtonState(true)
            return
        }
        if (foundMovies.length > 6) {
            setTitleNothingFound(true)
            setMoreButtonState(false)
        } else {
            setTitleNothingFound(true)
            setMoreButtonState(true)
        }
    }, [foundMovies])

    function searchHandler(query) {
        let filtered = movieSearchHandler(moviesFromServer, query);
        localStorage.setItem('movieSearchResult', JSON.stringify(filtered));
        setFoundMovies(filtered);
    }


    return (
        <>
            <Header onBurgerHidden={props.onBurgerMenu} onBurgerButton={props.onHendleButtonBurgerMenu} />
            <main className="movies-page">
                <SearchForm onSearchHandler={searchHandler} inputValue={inputValue} setInputValue={setInputValue} foundMovies={foundMovies} queryStore={queryStore} />

                {loading ? <Preloader /> : <MoviesCardList cards={foundMovies} moviesFromServer={moviesFromServer} titleNothingFound={titleNothingFound}
                    titleNotFoundMovies={titleNotFoundMovies} moreButtonState={moreButtonState} setMoreButtonState={setMoreButtonState} />}
            </main>
            <Footer />
        </>
    );
};

export default Movies;
