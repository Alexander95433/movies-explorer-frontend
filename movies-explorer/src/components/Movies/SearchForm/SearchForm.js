import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import buttonIcon from '../../../image/movies__dutton-icon2.svg'
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox'


function SearchForm({onSearchHandler, handleInput, inputValue, setInputValue}) {
    // const [ inputValue, setInputValue ] = useState('')
    const [ errorClass, setErrorClass] = useState(true)
    const [plaseholderText, setPlaseholderText] = useState('Фильм');
    const {pathname} = useLocation();

    


    function hendleSubmit(event) {
        event.preventDefault()
        if(!inputValue) {
            setErrorClass(false)
            setPlaseholderText('');
            return
        }
        setErrorClass(true)
        setPlaseholderText('Фильм')
        localStorage.setItem((pathname === '/movies' ? 'query' : 'query-saved'), inputValue);
        onSearchHandler(inputValue)
    }

   
    // function handleInput(e) {
    //     setInputValue(e.target.value);
    // }


    return (
        <section className='search-form__form-wrapper'>
            <form className='search-form__form'>
                <fieldset className='search-form__fildset'>
                    <div className='search-form__input-wrapper'>
                        <input className={`search-form__input ${ !errorClass ? 'search-form__input-error' : ''}`} placeholder={plaseholderText}
                            id="inputSearchMovieId" name="inputSearchMovieName" type="text" onChange={handleInput} value={inputValue || ''}  required />
                            <span className="search-form_error-span" hidden={errorClass}>Нужно ввести ключевое слово</span>
                        <button onClick={hendleSubmit} className='search-form__button' type="submit"><img className='search-form__button-icon' src={buttonIcon} alt='Кнопка поиска'/></button>
                    </div>
                    <FilterCheckbox />
                </fieldset>
            </form>
        </section>
    );
};

export default SearchForm;
