import { Route, Switch, useLocation } from 'react-router-dom';
import React, { useState, useEffect } from "react";
import { formaTtime } from '../../../utils/Functions';

function MoviesCard(props) {
    const location = useLocation();
    const savedUser = JSON.parse(localStorage.getItem('user'));
    const savedMovies = JSON.parse(localStorage.getItem('savedMovies'));
    const [visible, setVisible] = useState(false);
    const [isLiked, setisLiked] = useState(false);
    const [savedId, setSavedId] = useState('');


    useEffect(() => {
        let mySavedFilms = []
        props.savedFilms.forEach((savedFilm) => {
            if (savedFilm.owner === savedUser._id) { mySavedFilms.push(savedFilm) };
        })
        if (location.pathname === '/saved-movies') { setSavedId(props.card._id) }
        if (location.pathname === '/movies') {
            mySavedFilms.forEach((savedFilm) => {
                if (savedFilm.nameRU === props.card.nameRU && savedFilm.description === props.card.description) {
                    setisLiked(true)
                    setSavedId(savedFilm._id)
                };
            })
        }
        else { return }
    }, [])

    function hendleLikeButtonCard() {
        props.hendleGetSavedMovies()
        let mySavedFilms = []
        props.savedFilms.forEach((savedFilm) => {
            if (savedFilm.owner === savedUser._id) {
                mySavedFilms.push(savedFilm)
                localStorage.setItem('savedMovies', JSON.stringify(mySavedFilms));
            };
        })

        const ff = savedMovies.filter((element) => {
            if (element.nameRU === props.card.nameRU && element.description === props.card.description) { return element };
        })

        if (isLiked) {
            setisLiked(false)
            props.hendleDeleteMovies(ff[0]._id)
            deleteSavedFilmsFromLocalStorege()
        } else {
            props.hendleSaveMovies(props.card)
            props.hendleGetSavedMovies()
            setisLiked(true)
        }
    };

    function handleDeleteButtonCard(evt) {
        props.hendleDeleteMovies(savedId)
        //deleteSavedFilmsFromLocalStorege()
        evt.target.closest('.monies-card__element').remove();
    };

    function deleteSavedFilmsFromLocalStorege() {
        const savedMoviess = JSON.parse(localStorage.getItem('savedMovies'));
        let index = {}
        for (let i = 0; i < savedMoviess.length; i += 1) {
            const movie = savedMoviess[i];
            if (movie.nameRU === props.card.nameRU && movie.description === props.card.description) { index = i; }
        }
        savedMoviess.splice(index, 1);
        localStorage.setItem('savedMovies', JSON.stringify(savedMoviess))
    }

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
