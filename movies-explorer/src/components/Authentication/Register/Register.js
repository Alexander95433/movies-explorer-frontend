import React from 'react';
import AuthForm from '../AuthForm/AuthForm';
import useForm from '../../Hooks/useForm';

function Register({ onErrorMessage, handleRegister }) {
    const { errors, isValid, resetForm, values, passwordError, handleChange } = useForm();
    React.useEffect(() => {
        resetForm()
    }, []);

    function hendleSubmit(evt) {
        evt.preventDefault()
        const { name, email, password } = values
        handleRegister({
            endpoint: 'signup',
            methodName: 'POST',
            body: { name, email, password }
        })
        console.log('reg')
    }

    return (
        <main className="authentication__background">
            <section>
                <AuthForm onErrorMessage={onErrorMessage} passwordError={passwordError} onError={errors} onValid={isValid} onValues={values} handleChange={handleChange}
                    hendleSubmit={hendleSubmit} onButtonText={'Зарегистрироваться'} onSubtitleLink={'Уже зарегистрированы?'}
                    onTextLink={' Войти'} onRouteLink={'/signin'}>
                    <label className="auth-form__label" htmlFor='inputName'>Имя</label>
                    <input className={`auth-form__input ${errors.name ? 'auth-form__input_error' : ''}`} id='inputEmail' type="text" name="name"
                    onChange={handleChange} value={values.name || ''} minLength="6" maxLength="30" pattern="^[a-zA-Zа-яА-Я\s-]+$" required></input>
                                <p className='auth-form__span-error' hidden={!errors.name}>{errors.name}</p>

                </AuthForm>
            </section>
        </main>
    );
};

export default Register;