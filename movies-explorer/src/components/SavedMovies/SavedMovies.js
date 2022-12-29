import Header from '../Sandbox/Header/Header';
import MoviesCardList from '../SavedMovies/MoviesCardList/MoviesCardList';
import Footer from '../Sandbox/Footer/Footer';

function SavedMovies(props) {
    return (
        <>
            <Header onBurgerHidden={props.onBurgerMenu} onBurgerButton={props.onHendleButtonBurgerMenu} />
            <main className='saved-movies__page'>
                <MoviesCardList />
            </main>
            <Footer />
        </>
    )
}

export default SavedMovies;
