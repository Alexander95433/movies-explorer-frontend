import { useState, useEffect } from "react";
import Header from '../Sandbox/Header/Header';
import SearchForm from "./SearchForm/SearchForm";
import Preloader from "./Preloader/Preloader";
import MoviesCardList from "./MoviesCardList/MoviesCardList";
import Footer from '../Sandbox/Footer/Footer';
import { moviesApi } from "../../utils/Api"
import { movieSearchHandler } from '../../utils/Functions'

function Movies(props) {
    const [loading, setLoading] = useState(true)
    const [movies, setMovies] = useState([])
    const [inputValue, setInputValue] = useState('')

    const [foundMovies, setFoundMovies] = useState([])
    const movieStorage = JSON.parse(localStorage.getItem('movies'));
    const [titleNothingFound, setTitleNothingFound] = useState(true)


    let filtered = [];

    useEffect(() => {
        moviesApi.getAllMovies()
            .then((movies) => {
                setMovies(movies)
                setFoundMovies(movies)
                localStorage.setItem('movies', JSON.stringify(movies));
            })
            .catch(err => console.log(err))
            .finally(() => setLoading(false))
    }, [])

    // Динамическое отображение заполнения инпута для отображения карточек с фильмами по умолчанию после его очистки
    useEffect(() => { if (inputValue.length === 0) { setFoundMovies(movies) }; }, [inputValue])
    //Динамическое отображение длинны массива с карточками фильмов для корректной работы сообщения о не корректном запросе
    useEffect(() => {
        if (foundMovies.length === 0) { setTitleNothingFound(false) } else {
            setTitleNothingFound(true)
        }
    }, [foundMovies])

    function handleInput(e) { setInputValue(e.target.value); }

    function searchHandler(query) {
        filtered = movieSearchHandler(movieStorage, query);
        setFoundMovies(filtered);

    }


    return (
        <>
            <Header onBurgerHidden={props.onBurgerMenu} onBurgerButton={props.onHendleButtonBurgerMenu} />
            <main className="movies-page">
                <SearchForm onSearchHandler={searchHandler} inputValue={inputValue} handleInput={handleInput} />
                
                {loading ? <Preloader /> : <MoviesCardList cards={foundMovies} movieStorage={movieStorage} titleNothingFound={titleNothingFound}/>}
            </main>
            <Footer />
        </>
    );
};

export default Movies;
