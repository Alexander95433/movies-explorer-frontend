import React from 'react';
import AuthForm from '../AuthForm/AuthForm';
import useForm from '../../Hooks/useForm';

function Register() {
    //Для проверки работоспособности классов ошибки пароля 
    // Если ввести пароль длинне 4ёх символов выйдет класс ошибки
    const { values, passwordError, handleChange } = useForm();
    const classPaswordTest = `authForm__input ${passwordError ? '' : "authForm__input_password"}`;

    return (
        <section className="authentication__background">
            <AuthForm onButtonText={'Зарегистрироваться'} onSubtitleLink={'Уже зарегистрированы?'} onTextLink={' Войти'} onRouteLink={'/signin'}>
                <label className="authForm__label" htmlFor='inputpassword'>Пароль</label>
                <input className={classPaswordTest} id='inputpassword' type="password" name="password" onChange={handleChange}
                    value={values.password || ''} minLength="2" maxLength="30" required></input>
                <span className='authForm__span-password-error' hidden={passwordError}>Что-то пошло не так...</span>
            </AuthForm>
        </section>
    );
};

export default Register;