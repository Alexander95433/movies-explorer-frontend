import { useState, useEffect } from "react";
import buttonIcon from '../../../image/movies__dutton-icon2.svg'
import FilterCheckbox from '../../Movies/FilterCheckbox/FilterCheckbox'
import { movieSearchHandler, searchFilter } from '../../../utils/Functions';

function SearchForm({checkboxSaved, setCheckboxSaved, movieFilteredhResult, setmovieFilteredhResult, setFoundSavedMovies}) {

    const savedMovies = JSON.parse(localStorage.getItem('savedMovies'));
    // const [movieFilteredhResult, setmovieFilteredhResult] = useState([])
    const [movieSearchResult, setmovieSearchResult] = useState([])
    const [errorClass, setErrorClass] = useState(true)
    const [plaseholderText, setPlaseholderText] = useState('Фильм');
    // const [checkboxSaved, setCheckboxSaved] = useState(true)
    const [inputValueSaved, setInputValueSaved] = useState('');

    useEffect(() => { 
        setFoundSavedMovies(movieFilteredhResult) }, [])

    function hendleCheckbox() {
        if (!checkboxSaved) {
            setCheckboxSaved(true)
            setmovieFilteredhResult([])
            searchHandler(true, inputValueSaved)
        } else {
            setCheckboxSaved(false)
            filter(movieSearchResult, savedMovies, true, inputValueSaved)
        }
    }

    function hendleSubmit(event) {
        event.preventDefault()

        if (!inputValueSaved) {
            setErrorClass(false)
            setPlaseholderText('');
            return
        }
        setErrorClass(true)
        setPlaseholderText('Фильм')
        searchHandler(checkboxSaved, inputValueSaved)
    }

    function handleInput(e) {
        setInputValueSaved(e.target.value);
        if (e.target.value.length === 0) {
            filter(movieSearchResult, savedMovies, !checkboxSaved, e.target.value)
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
                            id="inputSearchMovieId" name="inputSearchMovieName" type="text" onChange={handleInput} value={inputValueSaved || ''} required />
                        <span className="search-form_error-span" hidden={errorClass}>Нужно ввести ключевое слово</span>
                        <button onClick={hendleSubmit} className='search-form__button' type="submit"><img className='search-form__button-icon' src={buttonIcon} alt='Кнопка поиска' /></button>
                    </div>
                    <FilterCheckbox checkbox={checkboxSaved} hendleCheckbox={hendleCheckbox} />
                </fieldset>
            </form>
        </section>
    );
};

export default SearchForm;
