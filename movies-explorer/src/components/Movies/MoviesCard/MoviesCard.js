import { Route, Switch } from 'react-router-dom';
import { useState } from "react";

function MoviesCard(props) {
    const [clickButton, setclickButton] = useState(false)
    const cardLikeButtonClassName = `moniesCard__button-like-of ${clickButton && 'moniesCard__button-like_on'}`

    function hendleClickButton() {
        if (clickButton) {
            setclickButton(false)
        } else {
            setclickButton(true)
        }

    }

    return (


        <article className='moniesCard__element'>
            <img className='moniesCard__image' src={props.card.image} />
            <div className='moniesCard__subtitle-box'>
                <h3 className='moniesCard__title'>{props.card.title}</h3>
                <Switch>
                    <Route exact path={'/movies'}>
                        <button onClick={hendleClickButton} className={cardLikeButtonClassName} />
                    </Route>
                    <Route path={'/saved-movies'}>
                        <button onClick={hendleClickButton} className='moniesCard__delete-card' />
                    </Route>
                </Switch>
            </div>
            <p className='moniesCard__time'>{props.card.time}</p>
        </article>


    );
};

export default MoviesCard;
