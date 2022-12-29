import React from 'react';
import AuthForm from '../AuthForm/AuthForm';

function Login() {
    return (
        <main className="authentication__background">
                <AuthForm onButtonText={'Войти'} onSubtitleLink={'Ещё не зарегистрированы?'} onTextLink={' Регистрация'} onRouteLink={'/signup'}></AuthForm>
        </main>
    );
};

export default Login;