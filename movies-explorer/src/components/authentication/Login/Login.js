import React from 'react';
import imageGreenCircle from '../../../image/header-icon.png'

import AuthForm from '../AuthForm/AuthForm';

function Login() {
    return (
        <section className="authentication__background">
            <div className='authentication__title-box'>
                <img className='authentication__image' src={imageGreenCircle} />
                <h2 className="authentication__title">Рады видеть!</h2>
                <AuthForm onButtonText={'Войти'} onSubtitleLink={'Ещё не зарегистрированы?'} onTextLink={' Регистрация'} onRouteLink={'/signup'}></AuthForm>
            </div>
        </section>
    );
};

export default Login;