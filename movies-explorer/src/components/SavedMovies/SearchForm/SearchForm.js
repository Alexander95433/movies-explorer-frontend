import { useState, useEffect } from "react";
import buttonIcon from '../../../image/movies__dutton-icon2.svg'
import FilterCheckbox from '../../Movies/FilterCheckbox/FilterCheckbox'
import { movieSearchHandler, searchFilter } from '../../../utils/Functions';

function SearchForm({ checDeleteCard, foundSavedMovies, setLoading, setFoundSavedMovies, checkbox, setCheckbox, inputValue, setInputValue }) {

    const savedMovies = JSON.parse(localStorage.getItem('savedMovies'));
    const [movieFilteredhResult, setmovieFilteredhResult] = useState([])
    const [movieSearchResult, setmovieSearchResult] = useState([])
    const [errorClass, setErrorClass] = useState(true)
    const [plaseholderText, setPlaseholderText] = useState('Фильм');

    useEffect(() => {
        setFoundSavedMovies(movieFilteredhResult) 

        // if(movieFilteredhResult.length > 0){

        // setFoundSavedMovies(movieFilteredhResult)}
        // else if (movieFilteredhResult.length <= 0) {

        //     setFoundSavedMovies(savedMovies)
        // }
    }, [])
    
    function hendleCheckbox() {
        if (!checkbox) {
            setCheckbox(true)
            setmovieFilteredhResult([])
            
            searchHandler(true, inputValue)
        } else {
            //debugger
            setCheckbox(false)
            debugger
            filter(movieSearchResult, savedMovies, true, inputValue)
        }
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
        searchHandler(checkbox, inputValue)
    }

    function handleInput(e) {
        setInputValue(e.target.value);
        if (e.target.value.length === 0) {
            filter(movieSearchResult, savedMovies, !checkbox, e.target.value)
        }
    }

    function searchHandler(stateCheckbox, query) {

        if (query === null) { setFoundSavedMovies(savedMovies) }
        else if (!stateCheckbox) { searchScriptHandler(movieFilteredhResult, query) }
        else { searchScriptHandler(savedMovies, query) }
    }

    const filter = (resultSearchFilms, savedFilms, stateCheckbox, input) => {
        if (resultSearchFilms === null) { filteringScriptHandler(savedFilms, stateCheckbox) }
        else if (input === null) { return }
        else if (input.length > 0) { filteringScriptHandler(resultSearchFilms, stateCheckbox) }
        else { filteringScriptHandler(savedFilms, stateCheckbox) }

    };

    function filteringScriptHandler(films, statusCheckbox) {
        const filtered = searchFilter(films, statusCheckbox)
        setmovieFilteredhResult(filtered)
        setFoundSavedMovies(filtered);
    }

    function searchScriptHandler(films, query) {
        let filtered = movieSearchHandler(films, query);
        setmovieSearchResult(filtered)
        setFoundSavedMovies(filtered);
    }

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
