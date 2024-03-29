import React from 'react';
import AuthForm from '../AuthForm/AuthForm';
import useForm from '../../Hooks/useForm';
import Preloader from '../../Movies/Preloader/Preloader';

function Register({setLoading, loading, disableButton, setDisableButton, onErrorMessageState, handleRegister }) {
    const { errors, isValid, resetForm, values, passwordError, handleChange } = useForm();
    const [disableButtonResult, setDisableButtonResult] = React.useState(false)


    React.useEffect(() => {
        if (!disableButton) {
            if (isValid) { setDisableButtonResult(false) }
            else { setDisableButtonResult(true) }
        } else { setDisableButtonResult(true) }
    }, [isValid, disableButton])

    React.useEffect(() => {
        resetForm()
    }, []);

    function hendleSubmit(evt) {
        //setLoading(true)
        evt.preventDefault()
        setDisableButton(true)
        const { name, email, password } = values

        handleRegister({
            endpoint: 'signup',
            methodName: 'POST',
            body: { name, email, password }
        })

    }

    return (
        <main className="authentication__background">
            <section>
            {loading ? <Preloader /> :
                <AuthForm disableButtonResult={disableButtonResult} disableElement={disableButton} onErrorMessage={'Пользователь с такой почтой уже существует'} passwordError={passwordError} 
                onError={errors} onValid={isValid} onValues={values} handleChange={handleChange} hendleSubmit={hendleSubmit} onButtonText={'Зарегистрироваться'}
                 onSubtitleLink={'Уже зарегистрированы?'} onTextLink={' Войти'} onErrorMessageState={onErrorMessageState} onRouteLink={'/signin'}>
                    <label className="auth-form__label" htmlFor='inputName'>Имя</label>
                    <input className={`auth-form__input ${errors.name ? 'auth-form__input_error' : ''}`} id='inputName' type="text" name="name"
                        onChange={handleChange} value={values.name || ''} minLength="6" maxLength="30" pattern="^[a-zA-Zа-яА-Я\s-]+$" disabled={disableButton} required></input>
                    <p className='auth-form__span-error' hidden={!errors.name}>{errors.name}</p>

                </AuthForm> }
            </section>
        </main>
    );
};

export default Register;