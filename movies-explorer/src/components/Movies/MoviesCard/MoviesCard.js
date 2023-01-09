import { Route, Switch } from 'react-router-dom';
import { useState, useContext, useEffect } from "react";
import { CurrentUserContext } from '../../Sandbox/CurrentUserContext/CurrentUserContext'
import { formaTtime } from '../../../utils/Functions';
import mainApi from '../../../utils/MainApi';

function MoviesCard(props) {
    const savedMovies = JSON.parse(localStorage.getItem('savedMovies'));
    const currentUser = useContext(CurrentUserContext);
    const [visible, setVisible] = useState(false);

    const [clickButton, setclickButton] = useState(false);
    const [isLiked, setisLiked] = useState(false)
    const [savedCard, setSavedCard] = useState({})



    function hendleLikeButtonCard() {
        // if (props.clickButton) { props.setclickButton(false)
        // } else { props.setclickButton(true) }




        hendleSaveMovies(props.card)

    };

    function handleDeleteButtonCard() {

    };
    function visableDeleteButton() {
        if (visible) {
            setVisible(false)
        } else {
            setVisible(true)
        }
    };


    function hendleSaveMovies(data) {
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
        })
            .then((res) => {
                setVisible(true)
                console.log(res)
            })
            .catch((err) => {
                console.log(err)
            })
    }


    return (


        <article className='monies-card__element' onMouseEnter={visableDeleteButton} onMouseLeave={visableDeleteButton}>

            <Switch>
                <Route exact path={'/movies'}>
                    <img className='monies-card__image' src={`https://api.nomoreparties.co/${props.card.image.url}`} alt='Обложка фильма' />
                    <div className='monies-card__subtitle-box'>
                        <h3 className='monies-card__title'>{props.card.nameRU}</h3>
                        {/* <button onClick={hendleLikeButtonCard} className={`monies-card__button-like-of ${isLiked && 'monies-card__button-like_on'}`} /> */}
                        <button onClick={hendleLikeButtonCard} className={`monies-card__button-like-of ${isLiked && 'monies-card__button-like_on'}`} />
                    </div>
                    <p className='monies-card__time'>{formaTtime(props.card.duration)}</p>
                </Route>
                <Route path={'/saved-movies'}>
                <img className='monies-card__image' src={props.card.image} alt='Обложка фильма' />
                    <div className='monies-card__subtitle-box'>
                        <h3 className='monies-card__title'>{props.card.title}</h3>
                        <button onClick={handleDeleteButtonCard} className={`monies-card__delete-card ${!visible ? '' : 'monies-card__delete-card_active '}`} />
                    </div>
                    <p className='monies-card__time'>{props.card.time}</p>
                     
                </Route>
            </Switch>

        </article>


    );
};

export default MoviesCard;
