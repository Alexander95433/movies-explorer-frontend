import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import buttonIcon from '../../../image/movies__dutton-icon2.svg'
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox'
import { movieSearchHandler, searchFilter } from '../../../utils/Functions';

function SearchForm({controlNumberFilms, foundMovies, setLoading, setFoundMovies, checkbox, setCheckbox, inputValue, setInputValue }) {
    const moviesFromServer = JSON.parse(localStorage.getItem('movies'));
    const movieSearchResult = JSON.parse(localStorage.getItem('movieSearchResult'))
    const checkboxState = JSON.parse(localStorage.getItem('shorts'))
    const queryStore = localStorage.getItem('query')
    const movieFilteredhResult = JSON.parse(localStorage.getItem('movieFilteredhResult'))
    const { pathname } = useLocation();
    const [errorClass, setErrorClass] = useState(true)
    const [plaseholderText, setPlaseholderText] = useState('Фильм');

    useEffect(() => {
        localStorage.setItem('resultRastIssue', JSON.stringify(foundMovies));
      }, [foundMovies])
     

    useEffect(() => {
        if (!checkboxState) { } 
        else { if (inputValue.length === 0) { 
                localStorage.setItem('movieSearchResult', JSON.stringify([]));
                setFoundMovies(movieSearchResult && moviesFromServer)
                controlNumberFilms()
                if (!checkboxState) {
                    filter(moviesFromServer, moviesFromServer, checkboxState, inputValue)
                    setFoundMovies(movieFilteredhResult)
                } else {
                    localStorage.setItem('movieFilteredhResult', JSON.stringify([]))
                    setFoundMovies(movieSearchResult && moviesFromServer)
                }}}
    }, [inputValue, checkboxState, queryStore])

    function hendleCheckbox() {
        if (!checkboxState) {
            setCheckbox(true)
            localStorage.setItem('shorts', true)
            console.log(checkbox, 'from checkbox')
            searchHandler(true, queryStore)
        } else {
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
        if (!stateCheckbox) {
            let filtered = movieSearchHandler(movieFilteredhResult, query);
            localStorage.setItem('movieSearchResult', JSON.stringify(filtered));
            setFoundMovies(filtered);
        } else {
            let filtered = movieSearchHandler(moviesFromServer, query);
            localStorage.setItem('movieSearchResult', JSON.stringify(filtered));
            setFoundMovies(filtered);
        }
    }

    const filter = (resultSearchFilms, filmsFromServer, stateCheckbox, input) => {
        if (input.length > 0) {
            const filtered = searchFilter(resultSearchFilms, stateCheckbox)
            localStorage.setItem('movieFilteredhResult', JSON.stringify(filtered));
            setFoundMovies(filtered);
        } else {
            const filtered = searchFilter(filmsFromServer, stateCheckbox)
            localStorage.setItem('movieFilteredhResult', JSON.stringify(filtered));
            setFoundMovies(filtered);
        }
        setLoading(false);
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
