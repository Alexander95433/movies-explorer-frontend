import React from 'react';
import { Link } from 'react-router-dom';

function AuthForm(props) {
    //Для проверки работоспособности классов ошибки пароля
    const [classPasword, setClassPasword] = React.useState(false)
    const classPaswordTest = `authForm__input ${classPasword ? '' : "authForm__input_password"}`;
    //----------

    function hendleSubmit(evt) {
        evt.preventDefault()
    }

    return (
        <form className="authForm__form" id="authForm" name="authForm">
            <fieldset className="authForm__fieldset">
                <label className="authForm__label" for='inputName'>Имя</label>
                <input className="authForm__input " id="inputName" type="text" name="name" value='Александр' minlength="2" maxlength="30" required></input>

                <label className="authForm__label" for='inputEmail'>E-mail</label>
                <input className="authForm__input" id='inputEmail' type="email" name="email" value='a@gmail.com' minlength="2" maxlength="30" required></input>

                <label className="authForm__label" for='inputpassword'>Пароль</label>
                <input className={classPaswordTest} id='inputpassword' type="password" name="password" value='123456789' minlength="2" maxlength="30" required></input>
                <span className='authForm__span-password-error' hidden={classPasword}>Что-то пошло не так...</span>

                <button className="authForm__button" type="submit" onClick={hendleSubmit}>{props.onButtonText}</button>
                <p className='authForm__subrirle-link'>Уже зарегистрированы? <Link className='authForm__link' to='/signin'>Войти</Link></p>
            </fieldset>
        </form>
    );
};

export default AuthForm;