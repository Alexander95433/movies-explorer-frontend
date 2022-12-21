import React from 'react';
import imageGreenCircle from '../../../image/header-icon.png'

import AuthForm from '../AuthForm/AuthForm';

function Register() {

    return (
        <section className="authentication__background">
            <div className='authentication__title-box'>
                <img className='authentication__image' src={imageGreenCircle} />
                <h2 className="authentication__title">Добро пожаловать!</h2>
                <AuthForm onButtonText={'Зарегистрироваться'} />
            </div>
        </section>
    );
};

export default Register;