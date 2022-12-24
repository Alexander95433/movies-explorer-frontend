import React from 'react';

import AuthForm from '../AuthForm/AuthForm';

function Register() {
   //Для проверки работоспособности классов ошибки пароля
   const [classPasword, setClassPasword] = React.useState(false)
   const classPaswordTest = `authForm__input ${classPasword ? '' : "authForm__input_password"}`;
   //----------
    return (
        <section className="authentication__background">
                <AuthForm onButtonText={'Зарегистрироваться'}  onSubtitleLink={'Уже зарегистрированы?'} onTextLink={' Войти'} onRouteLink={'/signin'}>
                <label className="authForm__label" for='inputpassword'>Пароль</label>
                <input className={classPaswordTest} id='inputpassword' type="password" name="password" value='123456789' minlength="2" maxlength="30" required></input>
                <span className='authForm__span-password-error' hidden={classPasword}>Что-то пошло не так...</span>
                 </AuthForm>
        </section>
    );
};

export default Register;