import { Route, Switch } from 'react-router-dom';
import { useState } from "react";

import { formaTtime } from '../../../utils/Functions';

function MoviesCard(props) {
    const [clickButton, setclickButton] = useState(false);
    const [visible, setVisible] = useState(false);

    function hendleClickButton() {
        if (clickButton) {
            setclickButton(false)
        } else {
            setclickButton(true)
        }
    };
    function visableDeleteButton() {
        if (visible) {
            setVisible(false)
        } else {
            setVisible(true)
        }
    };

    return (


        <article className='monies-card__element' onMouseEnter={visableDeleteButton} onMouseLeave={visableDeleteButton}>
            <img className='monies-card__image' src={`https://api.nomoreparties.co/${props.card.image.url}`} alt='Обложка фильма'/>
            <div className='monies-card__subtitle-box'>
                <h3 className='monies-card__title'>{props.card.nameRU}</h3>
                <Switch>
                    <Route exact path={'/movies'}>
                        <button onClick={hendleClickButton} className={`monies-card__button-like-of ${clickButton && 'monies-card__button-like_on'}`} />
                    </Route>
                    <Route path={'/saved-movies'}>
                        <button onClick={hendleClickButton} className={`monies-card__delete-card ${!visible ? '' : 'monies-card__delete-card_active '}`} />
                    </Route>
                </Switch>
            </div>
            <p className='monies-card__time'>{formaTtime(props.card.duration)}</p>
        </article>


    );
};

export default MoviesCard;
