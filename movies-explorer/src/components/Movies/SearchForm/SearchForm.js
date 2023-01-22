import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import buttonIcon from '../../../image/movies__dutton-icon2.svg'
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox'
import { movieSearchHandler, searchFilter } from '../../../utils/Functions';


/// Ошибка  срока поиск включён, наполнение rt, чексбокс on, чекбокс of, очитка строки в результате не обновляется рузультат с фильмами в локал сторадж
// это происходит только после рестарта страницы,  напиши обновление локального хранилища после очистки поля поиска

function SearchForm({ setLoading, setFoundMovies, checkbox, setCheckbox, inputValue, setInputValue }) {
    const moviesFromServer = JSON.parse(localStorage.getItem('movies'));
    const movieSearchResult = JSON.parse(localStorage.getItem('movieSearchResult'))
    const checkboxState = JSON.parse(localStorage.getItem('shorts'))
    const queryStore = localStorage.getItem('query')
    const movieFilteredhResult = JSON.parse(localStorage.getItem('movieFilteredhResult'))
    const { pathname } = useLocation();
    const [errorClass, setErrorClass] = useState(true)
    const [plaseholderText, setPlaseholderText] = useState('Фильм');
console.log(movieFilteredhResult)
    useEffect(() => {
        if (!checkboxState) {
            // debugger
            // //filter(movieSearchResult, moviesFromServer, checkboxState)
            // setFoundMovies(movieSearchResult && moviesFromServer)
            // console.log(movieFilteredhResult, checkboxState, 'movieFilteredhResult', movieSearchResult)
            // debugger
        }
        else {

            // if (inputValue.length === 0) {
                if (inputValue.length === 0) {
                      debugger
                localStorage.setItem('movieSearchResult', JSON.stringify([]));
                 setFoundMovies(movieSearchResult && moviesFromServer)
                if (!checkboxState) {
                     debugger
                    filter(moviesFromServer, moviesFromServer, checkboxState, queryStore)
                    setFoundMovies(movieFilteredhResult)
                } else {
                    
                    localStorage.setItem('movieFilteredhResult', JSON.stringify([]))
                    setFoundMovies(movieSearchResult && moviesFromServer)
                     debugger
                }

            } 
            //  else if (inputValue === queryStore) { 
            //     debugger
            //     setFoundMovies(movieSearchResult) }

        }
    }, [inputValue, checkboxState, queryStore])



    function hendleCheckbox() {
        if (!checkboxState) {
             
            setCheckbox(true)
            localStorage.setItem('shorts', true)
            console.log(checkbox, 'from checkbox')
             debugger
            searchHandler(true, inputValue)
        }
        else {
            setCheckbox(false)
            localStorage.setItem('shorts', false)
            localStorage.setItem('movieFilteredhResult', JSON.stringify([]));
            console.log(checkbox, 'from checkbox')
            filter(movieSearchResult, moviesFromServer, checkboxState, queryStore)
            debugger
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
        localStorage.setItem((pathname === '/movies' ? 'query' : 'query-saved'), inputValue);
        searchHandler(checkboxState, inputValue)
    }

    function handleInput(e) {
        setInputValue(e.target.value);
        localStorage.setItem((pathname === '/movies' ? 'query' : 'query-saved'), e.target.value);
        debugger
        if (e.target.value.length === 0) {
            localStorage.setItem((pathname === '/movies' ? 'query' : 'query-saved'), e.target.value);
            localStorage.setItem('movieSearchResult', JSON.stringify([]));
             debugger
             filter(movieSearchResult, moviesFromServer, true, e.target.value)
        }

            //localStorage.setItem((pathname === '/movies' ? 'query' : 'query-saved'), e.target.value);
            
        
    }

    function searchHandler(stateCheckbox, query) {
         debugger
        if (!stateCheckbox) {
            let filtered = movieSearchHandler(movieFilteredhResult, query);
            localStorage.setItem('movieSearchResult', JSON.stringify(filtered));
            setFoundMovies(filtered);
        } else{
            debugger
        let filtered = movieSearchHandler(moviesFromServer, query);
        localStorage.setItem('movieSearchResult', JSON.stringify(filtered));
        setFoundMovies(filtered);}
        debugger
    }


    const filter = (resultSearchFilms, filmsFromServer, stateCheckbox, input) => {
        if (input.length > 0 ) {
            debugger
            const filtered = searchFilter(resultSearchFilms, stateCheckbox)
            // localStorage.setItem('movieFilteredhResult', JSON.stringify(filtered));
            localStorage.setItem('movieFilteredhResult', JSON.stringify(filtered));
            setFoundMovies(filtered);
        } else {
            debugger
            const filtered = searchFilter(filmsFromServer, stateCheckbox)
            // localStorage.setItem('movieFilteredhResult', JSON.stringify(filtered));
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
