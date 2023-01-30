import { useState, useEffect } from "react";
import buttonIcon from '../../../image/movies__dutton-icon2.svg'
import FilterCheckbox from '../../Movies/FilterCheckbox/FilterCheckbox'
import { movieSearchHandler, searchFilter } from '../../../utils/Functions';

function SearchForm({ checDeleteCard, foundSavedMovies, setLoading, setFoundSavedMovies, checkbox, setCheckbox, inputValue, setInputValue }) {

    const savedMovies = JSON.parse(localStorage.getItem('savedMovies'));
    const movieSearchResult = JSON.parse(localStorage.getItem('movieSearchResultSaved'))
    const checkboxState = JSON.parse(localStorage.getItem('shortSaved'))
    const queryStore = localStorage.getItem('querySaved')
    const movieFilteredhResult = JSON.parse(localStorage.getItem('movieFilteredhResultSaved'))
    const [errorClass, setErrorClass] = useState(true)
    const [plaseholderText, setPlaseholderText] = useState('Фильм');
    const resultRastIssueSaved = JSON.parse(localStorage.getItem('resultRastIssueSved'))

    useEffect(() => {
        if (queryStore === null) { setFoundSavedMovies(savedMovies) }
        else if (!checkboxState) {
            if (queryStore.length > 0) {
                filter(savedMovies, savedMovies, checkboxState, queryStore)
                searchHandler(checkboxState, queryStore)
                setFoundSavedMovies(resultRastIssueSaved)
            } else {
                filter(savedMovies, savedMovies, checkboxState, queryStore)
                setFoundSavedMovies(resultRastIssueSaved)
            }
        } else {
            searchHandler(true, queryStore)
        }
    }, [checDeleteCard])

    useEffect(() => {
        localStorage.setItem('resultRastIssueSved', JSON.stringify(foundSavedMovies));
    }, [foundSavedMovies,])

    useEffect(() => {
        if (queryStore === null) { return }
        else if (!checkboxState) { }
        else if (inputValue.length === 0) {
            localStorage.setItem('movieSearchResultSaved', JSON.stringify([]));
            setFoundSavedMovies(savedMovies)
            if (!checkboxState) {
                filter(savedMovies, savedMovies, checkboxState, inputValue)
                setFoundSavedMovies(movieFilteredhResult)
            } else {
                localStorage.setItem('movieFilteredhResultSaved', JSON.stringify([]))
                setFoundSavedMovies(movieSearchResult && savedMovies)
            }
        }

    }, [inputValue, checkboxState, queryStore])

    function hendleCheckbox() {
        if (!checkboxState) {
            setCheckbox(true)
            localStorage.setItem('shortSaved', true)
            console.log(checkbox, 'from checkbox')
            localStorage.setItem('movieFilteredhResultSaved', JSON.stringify([]));
            searchHandler(true, queryStore)
        } else {
            setCheckbox(false)
            localStorage.setItem('shortSaved', false)
            filter(movieSearchResult, savedMovies, checkboxState, inputValue)
            console.log(checkbox, 'from checkbox')
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
        localStorage.setItem('querySaved', inputValue);
        searchHandler(checkboxState, inputValue)
    }

    function handleInput(e) {
        setInputValue(e.target.value);
        if (e.target.value.length === 0) {
            localStorage.setItem('movieSearchResultSaved', JSON.stringify([]));
            localStorage.setItem('querySaved', '');
            filter(movieSearchResult, savedMovies, true, e.target.value)
        }
    }

    function searchHandler(stateCheckbox, query) {
        const movieFilteredhResult = JSON.parse(localStorage.getItem('movieFilteredhResultSaved'))
        if (query === null) { setFoundSavedMovies(savedMovies) }
        else if (!stateCheckbox) {
            let filtered = movieSearchHandler(movieFilteredhResult, query);
            localStorage.setItem('movieSearchResultSaved', JSON.stringify(filtered));
            setFoundSavedMovies(filtered);
        } else {
            let filtered = movieSearchHandler(savedMovies, query);
            localStorage.setItem('movieSearchResultSaved', JSON.stringify(filtered));
            setFoundSavedMovies(filtered);
        }
    }

    const filter = (resultSearchFilms, savedFilms, stateCheckbox, input) => {
        const queryStore = localStorage.getItem('querySaved')
        if (resultSearchFilms === null) {
            const filtered = searchFilter(savedFilms, stateCheckbox)
            localStorage.setItem('movieFilteredhResultSaved', JSON.stringify(filtered));
            setFoundSavedMovies(filtered);
        }
        else if (queryStore.length > 0) {
            const filtered = searchFilter(resultSearchFilms, stateCheckbox)
            localStorage.setItem('movieFilteredhResultSaved', JSON.stringify(filtered));
            setFoundSavedMovies(filtered);
        } else {
            const filtered = searchFilter(savedFilms, stateCheckbox)
            localStorage.setItem('movieFilteredhResultSaved', JSON.stringify(filtered));
            setFoundSavedMovies(filtered);
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
