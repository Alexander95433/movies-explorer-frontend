import React from 'react';
import AuthForm from '../AuthForm/AuthForm';

function Login() {
    return (
        <main className="authentication__background">
            <section>
                <AuthForm onButtonText={'Войти'} onSubtitleLink={'Ещё не зарегистрированы?'} onTextLink={' Регистрация'} onRouteLink={'/signup'}></AuthForm>
            </section>
        </main>
    );
};

export default Login;