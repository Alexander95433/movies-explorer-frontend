import { Link, useLocation } from 'react-router-dom';

import imageGreenCircle from '../../../image/header-icon.png'
function AuthForm(props) {
    const location = useLocation();

    function hendleSubmit(evt) {
        evt.preventDefault()
    }

    return (
        <form className="authForm__form" id="authForm" name="authForm">
            <fieldset className="authForm__fieldset">
                <legend className="authForm__title"><img className='authForm__image' src={imageGreenCircle} />
                    Рады видеть!
                </legend>
                <label className="authForm__label" for='inputName'>Имя</label>
                <input className="authForm__input " id="inputName" type="text" name="name" value='Александр' minlength="2" maxlength="30" required></input>

                <label className="authForm__label" for='inputEmail'>E-mail</label>
                <input className="authForm__input" id='inputEmail' type="email" name="email" value='a@gmail.com' minlength="2" maxlength="30" required></input>
                {props.children}
                <div className={`authForm__button-box ${location.pathname !=='/signup' ? 'authForm__button-box_login' : ''}`}>
                <button className='authForm__button'  type="submit" onClick={hendleSubmit}>{props.onButtonText}</button>
                <p className='authForm__subtitle-link'>{props.onSubtitleLink}<Link className='authForm__link' to={props.onRouteLink}>{props.onTextLink}</Link></p>
            </div>
            </fieldset>
        </form>
    );
};

export default AuthForm;