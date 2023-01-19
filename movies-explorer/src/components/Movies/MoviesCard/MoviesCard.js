import { Route, Switch, useLocation } from 'react-router-dom';
import React, { useState, useEffect } from "react";
import { formaTtime } from '../../../utils/Functions';
import { checkingOwnerCards, deleteSavedFilmsFromLocalStorege } from '../../../utils/Functions'

function MoviesCard(props) {
    const location = useLocation();
    const savedUser = JSON.parse(localStorage.getItem('user'));
    const [visible, setVisible] = useState(false);
    const [isLiked, setisLiked] = useState(false);
    const [savedId, setSavedId] = useState('');

    useEffect(() => {
        //props.hendleGetSavedMovies()
        const savedMovies = JSON.parse(localStorage.getItem('savedMovies'));
        checkingOwnerCards({ savedFilms: savedMovies, savedUser })
        if (location.pathname === '/saved-movies') { setSavedId(props.card._id) }
        if (location.pathname === '/movies') {
             
            savedMovies.forEach((savedFilm) => {
                if (savedFilm.nameRU === props.card.nameRU && savedFilm.description === props.card.description) {
                    setisLiked(true)
                    setSavedId(savedFilm._id)
                };
            })
        }
        else { return }
    }, [])

    function hendleLikeButtonCard() {
        const savedMovies = JSON.parse(localStorage.getItem('savedMovies'));
        checkingOwnerCards({ savedFilms: savedMovies, savedUser })
        const ff = savedMovies.filter((element) => {
            if (element.nameRU === props.card.nameRU && element.description === props.card.description) { return element };
        })

        if (isLiked) {
            props.hendleDeleteMovies(ff[0]._id)
            deleteSavedFilmsFromLocalStorege({ card: props.card })
            setisLiked(false)
        } else {
            props.hendleSaveMovies(props.card)
            
            props.hendleGetSavedMovies()
            setisLiked(true)
        }
    };

    function handleDeleteButtonCard(evt) {
        props.hendleGetSavedMovies()
        props.hendleDeleteMovies(savedId)
        deleteSavedFilmsFromLocalStorege({ card: props.card })
         
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
                   <a href={props.card.trailerLink} target='_blank'> <img className='monies-card__image' src={`https://api.nomoreparties.co/${props.card.image.url}`} alt='Обложка фильма' /></a>
                    <div className='monies-card__subtitle-box'>
                        <h3 className='monies-card__title'>{props.card.nameRU}</h3>
                        <button onClick={hendleLikeButtonCard} className={`monies-card__button-like-of ${isLiked && 'monies-card__button-like_on'}`} />
                    </div>
                    <p className='monies-card__time'>{formaTtime(props.card.duration)}</p>
                </Route>
                <Route path={'/saved-movies'}>
                <a href={props.card.trailerLink} target='_blank'> <img className='monies-card__image' src={props.card.image} alt='Обложка фильма' /></a>
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
