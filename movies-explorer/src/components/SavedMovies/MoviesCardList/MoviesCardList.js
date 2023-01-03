import SearchForm from '../../Movies/SearchForm/SearchForm';
import MoviesCard from '../../Movies/MoviesCard/MoviesCard';
import { selectedCards } from '../../../utils/MoviesData'

function MoviesCardList() {
    return (
        <>
            <SearchForm />
            <section className="movies-cardList__elements-box">
                {selectedCards.map((item) => (<MoviesCard key={item._id} card={item} />))}
                {/* <h3 hidden={titleNothingFound}>нет</h3> */}
            </section>
            </>
    )
}

export default MoviesCardList;
