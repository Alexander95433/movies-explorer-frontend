import { Route, Switch, useLocation } from 'react-router-dom';
import React, { useState, useEffect } from "react";
import { formaTtime } from '../../../utils/Functions';
import { deleteSavedFilmsFromLocalStorege } from '../../../utils/Functions'
import mainApi from '../../../utils/MainApi';

function MoviesCard(props) { 
    const location = useLocation();
    const [visible, setVisible] = useState(false);
    const [isLiked, setisLiked] = useState(false);
    const [disabledButtomLike, setDisabledButtomLike] = useState(false);
    const [savedId, setSavedId] = useState('');

    useEffect(() => {
        const savedMovies = JSON.parse(localStorage.getItem('savedMovies'));
        if (location.pathname === '/saved-movies') { setSavedId(props.card._id) }
        if (location.pathname === '/movies') {
            
            savedMovies.forEach((savedFilm) => {
                if (savedFilm.nameRU === props.card.nameRU && savedFilm.description === props.card.description) {
                    setisLiked(true)
                    setSavedId(savedFilm._id)
                };
            })
        } else { return }
    }, [])

    function hendleSaveMoviess(data) {
        const newMovie = {};
        const { image, id } = data;
        Object.assign(newMovie, data);
        delete newMovie.id;
        delete newMovie.created_at;
        delete newMovie.updated_at;

        mainApi.saveMovies({
            endpoint: 'movies',
            methodName: 'POST',
            body: {
                ...newMovie,
                image: `https://api.nomoreparties.co/${image.url}`,
                thumbnail: `https://api.nomoreparties.co/${image.formats.thumbnail.url}`,
                movieId: id,
            }
        }).then((res) => {
            let savedMoviess = JSON.parse(localStorage.getItem('savedMovies'));
            savedMoviess.push(res);
            localStorage.setItem('savedMovies', JSON.stringify(savedMoviess))
        })
            .catch((err) => { console.log(err) })
            .finally(() => {
                setisLiked(true)
                setDisabledButtomLike(false)
            })
    }

    function hendleDeleteMovies(movieId) {
        mainApi.deleteMovies({
            endpoint: `movies/${movieId}`,
            methodName: 'DELETE'
        }).then((data) => { console.log(data) })
            .catch((err) => { console.log(err) })
            .finally(() => {
                setisLiked(false)
                setDisabledButtomLike(false)
            })
    }

    function hendleLikeButtonCard() {
        setDisabledButtomLike(true)
        if (isLiked) {
            const savedMovies = JSON.parse(localStorage.getItem('savedMovies'));
            const ff = savedMovies.filter((element) => {
                if (element.nameRU === props.card.nameRU && element.description === props.card.description) { return element };
            })
            hendleDeleteMovies(ff[0]._id)
            deleteSavedFilmsFromLocalStorege({ card: props.card })
        } else { hendleSaveMoviess(props.card) }
    };

    function handleDeleteButtonCard(evt) {
         
        

        deleteSavedFilmsFromLocalStorege({ card: props.card })
        hendleDeleteMovies(savedId)
        if (props.checDeleteCard) { props.setChecDeleteCard(false) }
        else { props.setChecDeleteCard(true) }

        if (location.pathname === '/saved-movies') {
            let elem = document.getElementById(props.id);
            elem.remove()
        }
        
        
    };

    function visableDeleteButtonOn() { setVisible(false) };

    function visableDeleteButtonOf() { setVisible(true) };

    return (
        <Switch>
            <Route exact path={'/movies'}>
            <article className='monies-card__element' onMouseEnter={visableDeleteButtonOf} onMouseLeave={visableDeleteButtonOn}>
                <a href={props.card.trailerLink} target='_blank'> <img className='monies-card__image' src={`https://api.nomoreparties.co/${props.card.image.url}`} alt='Обложка фильма' /></a>
                <div className='monies-card__subtitle-box'>
                    <h3 className='monies-card__title'>{props.card.nameRU}</h3>
                    <button disabled={disabledButtomLike} type='button' onClick={hendleLikeButtonCard} className={`monies-card__button-like-of ${isLiked && 'monies-card__button-like_on'}`} />
                </div>
                <p className='monies-card__time'>{formaTtime(props.card.duration)}</p>
                </article> 
            </Route>
            <Route path={'/saved-movies'}>
            <article id={props.id} className='monies-card__element' onMouseEnter={visableDeleteButtonOf} onMouseLeave={visableDeleteButtonOn}>
                <a href={props.card.trailerLink} target='_blank'> <img className='monies-card__image' src={props.card.image} alt='Обложка фильма' /></a>
                <div className='monies-card__subtitle-box'>
                    <h3 className='monies-card__title'>{props.card.nameRU}</h3>
                    <button onClick={handleDeleteButtonCard} type='button' className={`monies-card__delete-card ${!visible ? '' : 'monies-card__delete-card_active '}`} />
                </div>
                <p className='monies-card__time'>{formaTtime(props.card.duration)}</p>
                </article> 
            </Route>
        </Switch>
      


    );
};

export default MoviesCard;



