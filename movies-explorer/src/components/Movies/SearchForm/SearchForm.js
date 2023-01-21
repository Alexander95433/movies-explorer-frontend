import { useState } from "react";
import { useLocation } from "react-router-dom";
import buttonIcon from '../../../image/movies__dutton-icon2.svg'
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox'
import { movieSearchHandler, searchFilter } from '../../../utils/Functions';


/// Ошибка  срока поиск включён, наполнение rt, чексбокс on, чекбокс of, очитка строки в результате не обновляется рузультат с фильмами в локал сторадж
// это происходит только после рестарта страницы,  напиши обновление локального хранилища после очистки поля поиска

function SearchForm({ setLoading, foundMovies, setFoundMovies, checkbox, setCheckbox, inputValue, setInputValue }) {
    const moviesFromServer = JSON.parse(localStorage.getItem('movies'));
    const movieSearchResult = JSON.parse(localStorage.getItem('movieSearchResult'))
    const checkboxState = JSON.parse(localStorage.getItem('shorts'))
    const queryStore = localStorage.getItem('query')
    const { pathname } = useLocation();
    const [errorClass, setErrorClass] = useState(true)
    const [plaseholderText, setPlaseholderText] = useState('Фильм');
    //  const [checkbox, setCheckbox] = useState(false)
    const storedMovies = JSON.parse(localStorage.getItem('movies'));
    function hendleCheckbox() {
        if (!checkbox) {
            setCheckbox(true)
            localStorage.setItem('shorts', true)
        }
        else {
            setCheckbox(false)
            localStorage.setItem('shorts', false)
        }
        localStorage.setItem('movieFilteredhResult', JSON.stringify([]));
        console.log(checkbox)
        filter(movieSearchResult)
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
        searchHandler(inputValue)
    }

    function handleInput(e) {
        setInputValue(e.target.value);
        if (e.target.value.length === 0) {
            localStorage.setItem((pathname === '/movies' ? 'query' : 'query-saved'), e.target.value);
            // localStorage.setItem('movieSearchResult', JSON.stringify([]));
        }
    }

    function searchHandler(query) {
        let filtered = movieSearchHandler(moviesFromServer, query);
        localStorage.setItem('movieSearchResult', JSON.stringify(filtered));
        setFoundMovies(filtered);

    }


    const filter = (resultSearchFilms,) => {


        console.log(storedMovies)
        if (queryStore.length > 0) {
            console.log('ggg')
            //const filtered = searchFilter(movieSearchResult, query, checkboxState)
            const filtered = searchFilter(resultSearchFilms, checkboxState)
            localStorage.setItem('movieFilteredhResult', JSON.stringify(filtered));
            console.log(filtered, 'filtered1')
            setFoundMovies(filtered);
        } else {
            console.log('fff')
            const filtered = searchFilter(storedMovies, checkboxState)
                localStorage.setItem('movieFilteredhResult', JSON.stringify(filtered));
            console.log(filtered, 'filtered')
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
