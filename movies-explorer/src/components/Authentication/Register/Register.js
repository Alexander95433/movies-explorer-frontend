import React from 'react';
import AuthForm from '../AuthForm/AuthForm';
import useForm from '../../Hooks/useForm';

function Register() {
    //Для проверки работоспособности классов ошибки пароля 
    // Если ввести пароль длинне 4ёх символов выйдет класс ошибки
    const { values, passwordError, handleChange } = useForm();
    const classPaswordTest = `auth-form__input ${passwordError ? '' : "auth-form__input_password"}`;

    return (
        <main className="authentication__background">
            <section>
                <AuthForm onButtonText={'Зарегистрироваться'} onSubtitleLink={'Уже зарегистрированы?'} onTextLink={' Войти'} onRouteLink={'/signin'}>
                    <label className="auth-form__label" htmlFor='inputpassword'>Пароль</label>
                    <input className={classPaswordTest} id='inputpassword' type="password" name="password" onChange={handleChange}
                        value={values.password || ''} minLength="2" maxLength="30" required></input>
                    <span className='auth-form__span-password-error' hidden={passwordError}>Что-то пошло не так...</span>
                </AuthForm>
            </section>
        </main>
    );
};

export default Register;