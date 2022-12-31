import SearchForm from '../../Movies/SearchForm/SearchForm';
import MoviesCard from '../../Movies/MoviesCard/MoviesCard';
import { selectedCards } from '../../../utils/MoviesData'

function MoviesCardList() {
    return (
        <>

            {/* // <section className='movies-cardList__section movies-cardList__section_saved-movies'> */}
            <SearchForm />
            <section className="movies-cardList__elements-box">
                {selectedCards.map((item) => (<MoviesCard key={item._id} card={item} />))}
            </section>
            {/* // </section> */}
            </>
    )
}

export default MoviesCardList;
