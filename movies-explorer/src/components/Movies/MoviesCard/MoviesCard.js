import { Route, Switch } from 'react-router-dom';
import { useState } from "react";

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


        <article className='moniesCard__element' onMouseEnter={visableDeleteButton} onMouseLeave={visableDeleteButton}>
            <img className='moniesCard__image' src={props.card.image} alt='Обложка фильма'/>
            <div className='moniesCard__subtitle-box'>
                <h3 className='moniesCard__title'>{props.card.title}</h3>
                <Switch>
                    <Route exact path={'/movies'}>
                        <button onClick={hendleClickButton} className={`moniesCard__button-like-of ${clickButton && 'moniesCard__button-like_on'}`} />
                    </Route>
                    <Route path={'/saved-movies'}>
                        <button onClick={hendleClickButton} className={`moniesCard__delete-card ${!visible ? '' : 'moniesCard__delete-card_active '}`} />
                    </Route>
                </Switch>
            </div>
            <p className='moniesCard__time'>{props.card.time}</p>
        </article>


    );
};

export default MoviesCard;
