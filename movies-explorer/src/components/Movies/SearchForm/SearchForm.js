import buttonIcon from '../../../image/movies__dutton-icon.png'
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox'

function SearchForm() {
    return (
        <form className='searchForm__form'>
            <fieldset className='searchForm__fildset'>
                <div className='searchForm__input-wrapper'>
                    <input className='searchForm__input' placeholder="Фильмы"></input>
                    <button className='searchForm__button'><img className='searchForm__button-icon' src={buttonIcon} /></button>
                </div>
                <FilterCheckbox />
            </fieldset>

        </form>
    );
};

export default SearchForm;
