import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import imageGreenCircle from '../../../image/header-icon2.svg'

function AuthForm(props) {
    const location = useLocation();
     
    return (
        <form className="auth-form__form" id="authForm" name="authForm">
            <fieldset className="auth-form__fieldset">
                <legend className="auth-form__title">
                    <Link to='/'><img className='auth-form__image' src={imageGreenCircle} alt='Логотип сайта' /></Link>
                    {location.pathname === '/signin' ? 'Рады видеть!' : 'Добро пожаловать!'}
                </legend>
                {props.children}

                <label className="auth-form__label" htmlFor='inputEmail'>E-mail</label>
                <input className={`auth-form__input ${props.onError.email ? 'auth-form__input_error' : ''}`} id='inputEmail' type="email" name="email"
                    onChange={props.handleChange} value={props.onValues.email || ''} minLength="2" maxLength="30" pattern="^[\w]+@[a-zA-Z]+\.[a-zA-Z]{1,3}$" disabled={props.disableElement} required></input>
                <p className='auth-form__span-error' hidden={!props.onError.email}>Не корректный Email</p>

                <label className="auth-form__label" htmlFor='inputpassword'>Пароль</label>
                <input className={`auth-form__input ${props.onError.password ? "auth-form__input_error" : ''}`} id='inputpassword' type="password"
                    name="password" onChange={props.handleChange} value={props.onValues.password || ''} minLength="6" maxLength="30" disabled={props.disableElement} required ></input>
                <p className='auth-form__span-error auth-form__span-error_password' hidden={!props.onError.password}>{props.onError.password}</p>

                <div className={`auth-form__button-box ${location.pathname !== '/signup' ? 'auth-form__button-box_login' : ''}`}>
                    <span className={`auth-form__button-span ${props.onErrorMessageState ?'auth-form__button-span_visable' : ''}`}>{props.onErrorMessage} </span>
                    <button className='auth-form__button' onClick={props.hendleSubmit} type="submit" disabled={props.disableButtonResult}>{props.onButtonText}</button>
                    <p className='auth-form__subtitle-link'>{props.onSubtitleLink}<Link className='auth-form__link' to={props.onRouteLink}>{props.onTextLink}</Link></p>
                </div>
            </fieldset>
        </form>
    );
};

export default AuthForm;