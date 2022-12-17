import React, { useState } from "react";
import image1 from "../../../image/movie1.png";
import image2 from "../../../image/movie2.png";
import image3 from "../../../image/movie3.png";
import image4 from "../../../image/movie4.png";
import image5 from "../../../image/movie5.png";
import image6 from "../../../image/movie6.png";
import image7 from "../../../image/movie7.png";
import image8 from "../../../image/movie8.png";
import image9 from "../../../image/movie9.png";
import image10 from "../../../image/movie10.png";
import image11 from "../../../image/movie11.png";
import image12 from "../../../image/movie12.png";

function MoviesCard(props) {
    const [clickButton, setclickButton] = useState(false)
    const cardLikeButtonClassName = `moniesCard__button-like-of ${clickButton && 'moniesCard__button-like_on'}`

    function clockButton() {
        if (clickButton) {
            setclickButton(false)
        } else {
            setclickButton(true)
        }
    }

    return (
        // <article className='moniesCard__element'>
        //     <img className='moniesCard__image' src={props.card.image}/>
        //     <div className='moniesCard__subtitle-box'>
        //         <h3 className='moniesCard__title'>{props.card.title}</h3>
        //         <button onClick={clockButton} className = {cardLikeButtonClassName} />
        //     </div>
        //     <p className='moniesCard__time'>{props.card.time}</p>
        // </article>
        <>
            <article className='moniesCard__element'>
                <img className='moniesCard__image' src={image1} />
                <div className='moniesCard__subtitle-box'>
                    <h3 className='moniesCard__title'>33 слова о дизайне</h3>
                    <button onClick={clockButton} className={cardLikeButtonClassName} />
                </div>
                <p className='moniesCard__time'>1ч 47м</p>
            </article>
            <article className='moniesCard__element'>
                <img className='moniesCard__image' src={image2} />
                <div className='moniesCard__subtitle-box'>
                    <h3 className='moniesCard__title'>Киноальманах «100 лет дизайна»</h3>
                    <button onClick={clockButton} className={cardLikeButtonClassName} />
                </div>
                <p className='moniesCard__time'>1ч 3м</p>
            </article>
            <article className='moniesCard__element'>
                <img className='moniesCard__image' src={image3} />
                <div className='moniesCard__subtitle-box'>
                    <h3 className='moniesCard__title'>В погоне за Бенкси</h3>
                    <button onClick={clockButton} className={cardLikeButtonClassName} />
                </div>
                <p className='moniesCard__time'>1ч 42м</p>
            </article>
            <article className='moniesCard__element'>
                <img className='moniesCard__image' src={image4} />
                <div className='moniesCard__subtitle-box'>
                    <h3 className='moniesCard__title'>Баския: Взрыв реальности</h3>
                    <button onClick={clockButton} className={cardLikeButtonClassName} />
                </div>
                <p className='moniesCard__time'>1ч 21м</p>
            </article>
            <article className='moniesCard__element'>
                <img className='moniesCard__image' src={image5} />
                <div className='moniesCard__subtitle-box'>
                    <h3 className='moniesCard__title'>Бег это свобода</h3>
                    <button onClick={clockButton} className={cardLikeButtonClassName} />
                </div>
                <p className='moniesCard__time'>1ч 44м</p>
            </article>
            <article className='moniesCard__element'>
                <img className='moniesCard__image' src={image6} />
                <div className='moniesCard__subtitle-box'>
                    <h3 className='moniesCard__title'>Книготорговцы</h3>
                    <button onClick={clockButton} className={cardLikeButtonClassName} />
                </div>
                <p className='moniesCard__time'>1ч 37м</p>
            </article>
            <article className='moniesCard__element'>
                <img className='moniesCard__image' src={image7} />
                <div className='moniesCard__subtitle-box'>
                    <h3 className='moniesCard__title'>Когда я думаю о Германии ночью</h3>
                    <button onClick={clockButton} className={cardLikeButtonClassName} />
                </div>
                <p className='moniesCard__time'>1ч 59м</p>
            </article>
            <article className='moniesCard__element'>
                <img className='moniesCard__image' src={image8} />
                <div className='moniesCard__subtitle-box'>
                    <h3 className='moniesCard__title'>Gimme Danger: История Игги и The Stooge...</h3>
                    <button onClick={clockButton} className={cardLikeButtonClassName} />
                </div>
                <p className='moniesCard__time'>1ч 59м</p>
            </article>
            <article className='moniesCard__element'>
                <img className='moniesCard__image' src={image9} />
                <div className='moniesCard__subtitle-box'>
                    <h3 className='moniesCard__title'>Дженис: Маленькая девочка грустит</h3>
                    <button onClick={clockButton} className={cardLikeButtonClassName} />
                </div>
                <p className='moniesCard__time'>1ч 42м</p>
            </article>
            <article className='moniesCard__element'>
                <img className='moniesCard__image' src={image10} />
                <div className='moniesCard__subtitle-box'>
                    <h3 className='moniesCard__title'>Соберись перед прыжком</h3>
                    <button onClick={clockButton} className={cardLikeButtonClassName} />
                </div>
                <p className='moniesCard__time'>1ч 47м</p>
            </article>
            <article className='moniesCard__element'>
                <img className='moniesCard__image' src={image12} />
                <div className='moniesCard__subtitle-box'>
                    <h3 className='moniesCard__title'>Пи Джей Харви: A dog called money</h3>
                    <button onClick={clockButton} className={cardLikeButtonClassName} />
                </div>
                <p className='moniesCard__time'>1ч 4м</p>
            </article>
            <article className='moniesCard__element'>
                <img className='moniesCard__image' src={image11} />
                <div className='moniesCard__subtitle-box'>
                    <h3 className='moniesCard__title'>По волнам: Искусство звука в кино</h3>
                    <button onClick={clockButton} className={cardLikeButtonClassName} />
                </div>
                <p className='moniesCard__time'>1ч 7м</p>
            </article>
        </>
    );
};

export default MoviesCard;
