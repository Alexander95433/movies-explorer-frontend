import SearchForm from '../../Movies/SearchForm/SearchForm';
import MoviesCard from '../../Movies/MoviesCard/MoviesCard';
import {selectedCards} from '../../../utils/MoviesData'

function MoviesCardList() {
    return(
        <section className='moviesCardList__section moviesCardList__section_saved-movies'>
            <SearchForm />
            <div className="moviesCardList__elements-box">
            {selectedCards.map((item) => (<MoviesCard key={item._id} card={item} />))}
            </div>
        </section>
    )
}

export default MoviesCardList;
