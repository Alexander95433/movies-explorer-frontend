import { Link, useLocation } from 'react-router-dom';
import imageGreenCircle from '../../../image/header-icon2.svg'
import useForm from '../../Hooks/useForm';

function AuthForm(props) {
    const location = useLocation();
    const {values, handleChange }  = useForm();
    
    function hendleSubmit(evt) {
        evt.preventDefault()
    }

    return (
        <form className="auth-form__form" id="authForm" name="authForm">
            <fieldset className="auth-form__fieldset">
                <legend className="auth-form__title"><img className='auth-form__image' src={imageGreenCircle} alt='Логотип сайта'/>
                    Рады видеть!
                </legend>
                <label className="auth-form__label" htmlFor='inputName'>Имя</label>
                <input className="auth-form__input " id="inputName" type="text" name="name" onChange={handleChange}
                value={values.name || ''} minLength="2" maxLength="30" required></input>

                <label className="auth-form__label" htmlFor='inputEmail'>E-mail</label>
                <input className="auth-form__input" id='inputEmail' type="email" name="email" onChange={handleChange}
                value={values.email || ''} minLength="2" maxLength="30" required></input>
                {props.children}
                <div className={`auth-form__button-box ${location.pathname !=='/signup' ? 'auth-form__button-box_login' : ''}`}>
                <button className='auth-form__button'  type="submit" onClick={hendleSubmit}>{props.onButtonText}</button>
                <p className='auth-form__subtitle-link'>{props.onSubtitleLink}<Link className='auth-form__link' to={props.onRouteLink}>{props.onTextLink}</Link></p>
            </div>
            </fieldset>
        </form>
    );
};

export default AuthForm;