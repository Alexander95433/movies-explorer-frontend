import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import buttonIcon from '../../../image/movies__dutton-icon2.svg'
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox'
import { movieSearchHandler, searchFilter } from '../../../utils/Functions';

function SearchForm({ controlNumberFilms, foundMovies, setLoading, setFoundMovies, checkbox, setCheckbox, inputValue, setInputValue }) {
    const moviesFromServer = JSON.parse(localStorage.getItem('movies'));
    const movieSearchResult = JSON.parse(localStorage.getItem('movieSearchResult'))
    const checkboxState = JSON.parse(localStorage.getItem('shorts'))
    const queryStore = localStorage.getItem('query')
    const movieFilteredhResult = JSON.parse(localStorage.getItem('movieFilteredhResult'))
    const { pathname } = useLocation();
    const [errorClass, setErrorClass] = useState(true)
    const [plaseholderText, setPlaseholderText] = useState('Фильм');
    const savedMovies = JSON.parse(localStorage.getItem('savedMovies'));

    useEffect(() => {
        localStorage.setItem('resultRastIssue', JSON.stringify(foundMovies));
    }, [foundMovies])

    useEffect(() => {

        if (queryStore === null) { return }
        else if (!checkboxState) { }
        else if (inputValue.length === 0) {
            localStorage.setItem('movieSearchResult', JSON.stringify([]));
            setFoundMovies(movieSearchResult && moviesFromServer)
            controlNumberFilms()
            if (!checkboxState) {
                // debugger
                filter(moviesFromServer, moviesFromServer, checkboxState, inputValue)
                setFoundMovies(movieFilteredhResult)
            } else {
                localStorage.setItem('movieFilteredhResult', JSON.stringify([]))
                setFoundMovies(movieSearchResult && moviesFromServer)
            }
        }

    }, [inputValue, queryStore])

    function hendleCheckbox() {
        // debugger
        if (!checkboxState) {
            //  debugger
            setCheckbox(true)
            localStorage.setItem('shorts', true)
            console.log(checkbox, 'from checkbox')
            searchHandler(true, queryStore)
        } else {
            //  debugger
            setCheckbox(false)
            localStorage.setItem('shorts', false)
            localStorage.setItem('movieFilteredhResult', JSON.stringify([]));
            console.log(checkbox, 'from checkbox')
            filter(movieSearchResult, moviesFromServer, checkboxState, inputValue)
        }
        controlNumberFilms()
    }

    function hendleSubmit(event) {
        event.preventDefault()
        if (!inputValue) {
            setErrorClass(false)
            setPlaseholderText('');
            return
        }
        setErrorClass(true)
        setPlaseholderText('Фильм')
        localStorage.setItem((pathname === '/movies' ? 'query' : 'query-saved'), inputValue);
        searchHandler(checkboxState, inputValue)
        controlNumberFilms()
    }

    function handleInput(e) {
        setInputValue(e.target.value);
        if (e.target.value.length === 0) {
            localStorage.setItem('movieSearchResult', JSON.stringify([]));
            localStorage.setItem('query', '');
            localStorage.setItem('query-saved', '');
            filter(movieSearchResult, moviesFromServer, true, e.target.value)
        }
    }

    function searchHandler(stateCheckbox, query) {
        // debugger
        if (query === null) { setFoundMovies(moviesFromServer) }
        else if (!stateCheckbox) {
            // debugger
            let filtered = movieSearchHandler(movieFilteredhResult, query);
            localStorage.setItem('movieSearchResult', JSON.stringify(filtered));
            setFoundMovies(filtered);
        } else {
            // debugger
            let filtered = movieSearchHandler(moviesFromServer, query);
            localStorage.setItem('movieSearchResult', JSON.stringify(filtered));
            setFoundMovies(filtered);
        }
    }

    const filter = (resultSearchFilms, filmsFromServer, stateCheckbox, input) => {
        const queryStore = localStorage.getItem('query')
        // debugger
        if (resultSearchFilms === null) {
            const filtered = searchFilter(filmsFromServer, stateCheckbox)
            localStorage.setItem('movieFilteredhResult', JSON.stringify(filtered));
            setFoundMovies(filtered);
            // debugger
        }
        else if (queryStore.length > 0) {
            const filtered = searchFilter(resultSearchFilms, stateCheckbox)
            localStorage.setItem('movieFilteredhResult', JSON.stringify(filtered));
            setFoundMovies(filtered);
            // debugger
        } else {
            const filtered = searchFilter(filmsFromServer, stateCheckbox)
            localStorage.setItem('movieFilteredhResult', JSON.stringify(filtered));
            setFoundMovies(filtered);
            // debugger
        }
        //setLoading(false);
    };

    return (
        <section className='search-form__form-wrapper'>
            <form className='search-form__form'>
                <fieldset className='search-form__fildset'>
                    <div className='search-form__input-wrapper'>
                        <input className={`search-form__input ${!errorClass ? 'search-form__input-error' : ''}`} placeholder={plaseholderText}
                            id="inputSearchMovieId" name="inputSearchMovieName" type="text" onChange={handleInput} value={inputValue || ''} required />
                        <span className="search-form_error-span" hidden={errorClass}>Нужно ввести ключевое слово</span>
                        <button onClick={hendleSubmit} className='search-form__button' type="submit"><img className='search-form__button-icon' src={buttonIcon} alt='Кнопка поиска' /></button>
                    </div>
                    <FilterCheckbox checkbox={checkbox} hendleCheckbox={hendleCheckbox} />
                </fieldset>
            </form>
        </section>
    );
};

export default SearchForm;
