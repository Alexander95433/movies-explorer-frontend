import buttonIcon from '../../../image/movies__dutton-icon2.svg'
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox'

function SearchForm() {

    function hendleSubmit(event) {
        event.preventDefault()
    }

    return (
        <form className='search-form__form'>
            <fieldset className='search-form__fildset'>
                <div className='search-form__input-wrapper'>
                    <input className='search-form__input' placeholder="Фильм"
                        id="inputSearchMovieId" name="inputSearchMovieName" type="text" required/>
                    <button onClick={ hendleSubmit } className='search-form__button' type="submit"><img className='search-form__button-icon' src={buttonIcon} /></button>
                </div>
                <FilterCheckbox />
            </fieldset>
        </form>
    );
};

export default SearchForm;
