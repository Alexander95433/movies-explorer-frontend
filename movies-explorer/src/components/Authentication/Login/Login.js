import React from 'react';
import AuthForm from '../AuthForm/AuthForm';
import useForm from '../../Hooks/useForm';

function Login({onErrorMessage, handleAuthorization }) {
    const { errors, isValid, resetForm, values, passwordError, handleChange } = useForm();

    React.useEffect(() => {
        resetForm()
    }, []);

    function hendleSubmit(evt) {
        evt.preventDefault()
        const { password, email } = values;
        if (!values.email || !values.password) { return; }

        handleAuthorization({
            endpoint: 'signin',
            methodName: 'POST',
            body: { email, password }
        })
    }


    return (
        <main className="authentication__background">
            <section>
                <AuthForm onErrorMessage={onErrorMessage} passwordError={passwordError} onError={errors} onValid={isValid} onValues={values} handleChange={handleChange}
                    hendleSubmit={hendleSubmit} onButtonText={'Войти'} onSubtitleLink={'Ещё не зарегистрированы?'}
                    onTextLink={' Регистрация'} onRouteLink={'/signup'}></AuthForm>
            </section>
        </main>
    );
};

export default Login;