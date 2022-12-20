import buttonIcon from '../../../image/movies__dutton-icon.png'
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox'

function SearchForm() {

    function hendleSubmit(event) {
        event.preventDefault()
    }

    return (
        <form className='searchForm__form'>
            <fieldset className='searchForm__fildset'>
                <div className='searchForm__input-wrapper'>
                    <input className='searchForm__input' placeholder="Фильмы"
                        id="inputSearchMovieId" name="inputSearchMovieName" type="text"
                    ></input>
                    <button onClick={ hendleSubmit } className='searchForm__button' type="submit"><img className='searchForm__button-icon' src={buttonIcon} /></button>
                </div>
                <FilterCheckbox />
            </fieldset>

        </form>
    );
};

export default SearchForm;
