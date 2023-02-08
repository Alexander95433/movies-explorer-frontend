import React, { useEffect } from 'react';
import AuthForm from '../AuthForm/AuthForm';
import useForm from '../../Hooks/useForm';
import Preloader from '../../Movies/Preloader/Preloader';

function Login({loading, disableButton, setDisableButton, onErrorMessageState, handleAuthorization }) {
    const { errors, isValid, resetForm, values, passwordError, handleChange } = useForm();
    const [disableButtonResult, setDisableButtonResult] = React.useState(false)
    

    useEffect(() => {
        if (!disableButton) {
            if (isValid) { setDisableButtonResult(false) }
            else { setDisableButtonResult(true) }
        } else { setDisableButtonResult(true) }
    }, [isValid, disableButton])


    React.useEffect(() => {
        resetForm()
    }, []);

    function hendleSubmit(evt) {
        setDisableButton(true)
        evt.preventDefault()
        const { password, email } = values;
        if (!values.email || !values.password) { return; }

        handleAuthorization({
            endpoint: 'signin',
            methodName: 'POST',
            body: { email, password }
        }, setDisableButton)
    }
     

    return (
        <main className="authentication__background">
            <section>
            {loading ? <Preloader /> :
                <AuthForm disableButtonResult={disableButtonResult} disableElement={disableButton} onErrorMessageState={onErrorMessageState} onErrorMessage={'Не правильная почта или пароль'} passwordError={passwordError}
                 onError={errors} onValid={isValid} onValues={values} handleChange={handleChange} hendleSubmit={hendleSubmit} onButtonText={'Войти'} 
                 onSubtitleLink={'Ещё не зарегистрированы?'} onTextLink={' Регистрация'} onRouteLink={'/signup'}></AuthForm>}
            </section>
        </main>
    );
};

export default Login;