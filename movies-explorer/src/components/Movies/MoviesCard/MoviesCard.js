import { Route, Switch, useLocation } from 'react-router-dom';
import { useState, useEffect } from "react";
import { formaTtime } from '../../../utils/Functions';

function MoviesCard(props) {
    const location = useLocation();
    const savedMovies = JSON.parse(localStorage.getItem('savedMovies'));
    const [visible, setVisible] = useState(false);
    const [isLiked, setisLiked] = useState(false);
    const [savedId, setSavedId] = useState('');

    useEffect(() => {
        if (location.pathname === '/saved-movies') {
            setSavedId(props.card._id)
        }
        if (location.pathname === '/movies') {
            props.savedFilms.forEach((savedFilm) => {
                if (savedFilm.nameRU === props.card.nameRU && savedFilm.description === props.card.description) {
                    setisLiked(true)
                    setSavedId(savedFilm._id) };
            })
        } else { return }
    }, [])

    function hendleLikeButtonCard() {
        props.hendleGetSavedMovies()
        const ff = savedMovies.filter((element) => {
            if (element.nameRU === props.card.nameRU && element.description === props.card.description) {
                return element };
        })

        if (isLiked) {
            setisLiked(false)
            props.hendleDeleteMovies(ff[0]._id)
            let index = {}
            for (let i = 0; i < savedMovies.length; i += 1) {
                const movie = savedMovies[i];
                if (movie._id === props.card.id) { index = i; }
            }
            savedMovies.splice(index, 1);
            localStorage.setItem('savedMovies', JSON.stringify(savedMovies));
        } else {
            setisLiked(true)
            props.hendleSaveMovies(props.card)
        } };

    function handleDeleteButtonCard(evt) {
         
        props.hendleDeleteMovies(savedId)
        evt.target.closest('.monies-card__element').remove();
        
    };

    function visableDeleteButtonOn() {
    setVisible(false)
     };
     function visableDeleteButtonOf() {
        setVisible(true)
         
     };

    return (
        <article className='monies-card__element' onMouseEnter={visableDeleteButtonOf} onMouseLeave={visableDeleteButtonOn}>

            <Switch>
                <Route exact path={'/movies'}>
                    <img className='monies-card__image' src={`https://api.nomoreparties.co/${props.card.image.url}`} alt='Обложка фильма' />
                    <div className='monies-card__subtitle-box'>
                        <h3 className='monies-card__title'>{props.card.nameRU}</h3>
                        <button onClick={hendleLikeButtonCard} className={`monies-card__button-like-of ${isLiked && 'monies-card__button-like_on'}`} />
                    </div>
                    <p className='monies-card__time'>{formaTtime(props.card.duration)}</p>
                </Route>
                <Route path={'/saved-movies'}>
                    <img className='monies-card__image' src={props.card.image} alt='Обложка фильма' />
                    <div className='monies-card__subtitle-box'>
                        <h3 className='monies-card__title'>{props.card.nameRU}</h3>
                        <button onClick={handleDeleteButtonCard} className={`monies-card__delete-card ${!visible ? '' : 'monies-card__delete-card_active '}`} /> 
                    </div>
                    <p className='monies-card__time'>{formaTtime(props.card.duration)}</p>

                </Route>
            </Switch>

        </article>


    );
};

export default MoviesCard;
