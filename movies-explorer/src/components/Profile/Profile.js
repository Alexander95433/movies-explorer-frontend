import React, { useEffect, useState } from "react";
import Header from "../Sandbox/Header/Header";
import useForm from '../Hooks/useForm'
import { CurrentUserContext } from '../Sandbox/CurrentUserContext/CurrentUserContext'


function Profile(props) {
    const { errors, isValid, resetForm, values, handleChange, setValues } = useForm();
    const currentUser = React.useContext(CurrentUserContext);
    const [inputFocus, setInputFocus] = useState(false)
    const [classBurder, setClassBurder] = useState('')
    const [eventTargetInput, setEventTargetInput] = useState('')
    const [errorText, setErrorText] = useState('')

    const [disabledButtonEditProfile, setDisabledButtonEditProfile] = useState(true)
    const [spanButtonSubmit, setSpanButtonSubmit] = useState(true)
    const [spanButtonSubmitText, setSpanButtonSubmitText] = useState(' ')


    useEffect(() => {
        if (values.name) {

            if (isValid) {
                if (currentUser.name === values.name && currentUser.email === values.email) {
                    setDisabledButtonEditProfile(true)
                    // props.setDisableButton(true)
                } else {
                    setDisabledButtonEditProfile(false)
                    // props.setDisableButton(false)
                }
            } else {
                setDisabledButtonEditProfile(true)
            }
        }
    }, [values, currentUser])

    useEffect(() => {
        resetForm()
        setValues(currentUser)
    }, [])

    useEffect(() => {
        if (eventTargetInput === 'name') {

            setClassBurder('profile__border_focus')
            if (errors.name) {
                setClassBurder('profile__border_focus-error')
                setErrorText(errors.name)
            } else {
                setClassBurder('profile__border_focus')
                setErrorText('')
            }
        }
        if (eventTargetInput === 'email') {

            setClassBurder('profile__border_focus')
            if (errors.email) {
                setClassBurder('profile__border_focus-error')
                setErrorText('Не корректный email')
            } else {
                setClassBurder('profile__border_focus')
                setErrorText('')
            }
        }
    }, [errors, eventTargetInput])

    function hendkeTimeoutSpan() { setSpanButtonSubmit(true) }

    function hendleSubmit(evt) {
        setDisabledButtonEditProfile(true)
        //props.setDisableButton(true)
        evt.preventDefault()
        const { name, email, password } = values
        props.onHendleEditProfile({
            endpoint: 'users/me',
            methodName: 'PATCH',
            body: { name, email, password }
        }, setSpanButtonSubmit, setSpanButtonSubmitText)
        setDisabledButtonEditProfile(false)
        //props.setDisableButton(false)
        setTimeout(hendkeTimeoutSpan, 3000);
    };

    function hendleOnInputFocus(e) {
        setEventTargetInput(e.currentTarget.name)
        if (e.currentTarget === e.target) {
            setInputFocus(true);
        }
    }

    function hendleOfInputFocuss(e) {
        if (e.currentTarget === e.target) {
            setEventTargetInput('')
            setInputFocus(false)
            setErrorText('')
        }
    }

    return (
        <>
            <Header onBurgerHidden={props.onBurgerMenu} onBurgerButton={props.onHendleButtonBurgerMenu} loggedIn={props.loggedIn} />
            <main className="profile__background" >
                <section>
                    <form className="profile__form" id="profile" name="profile">
                        <fieldset className="profile__form-fieldset">
                            <legend className="profile__title">{`Привет, ${currentUser.name}`}</legend>
                            <label className={`profile__label ${errors.name ? 'profile__text_error' : ''}`}>Имя</label>

                            <input className={`profile__input  profile__input_name ${errors.name ? 'profile__text_error' : ''}`} id="inputName" type="text" name="name"
                                onFocus={hendleOnInputFocus} onBlur={hendleOfInputFocuss} onChange={handleChange} value={values.name || ''} minLength='6'
                                maxLength="30" pattern="^[a-zA-Zа-яА-Я\s-]+$" required></input>
                            <div className={`profile__border ${inputFocus ? classBurder : ''} `} />
                            <span className='profile__span-error' hidden={inputFocus ? false : true}>{errorText}</span>

                            <label className={`profile__label profile__label_email ${errors.email ? 'profile__text_error' : ''}`} >E-mail</label>
                            <input className={`profile__input ${errors.email ? 'profile__text_error' : ''} ${errorText.length > 0 ? 'profile__input_email' : ''}`} id='inputEmail' type="email" name="email"
                                onFocus={hendleOnInputFocus} onBlur={hendleOfInputFocuss} onChange={handleChange} value={values.email || ''} minLength='6'
                                maxLength="30" pattern="^[\w]+@[a-zA-Z]+\.[a-zA-Z]{1,3}$" required></input>

                        </fieldset>
                        <div className="profile__button-box">
                            <span className={`profile__button-span ${!spanButtonSubmit ? 'profile__button-span_wisable' : ''}`}> {spanButtonSubmitText}</span>
                            <button className="profile__button-edit" type="submit" onClick={hendleSubmit} disabled={disabledButtonEditProfile}>Редактировать</button>
                            <button className="profile__button-exit" type="button" onClick={props.onHendleAccountLogout} disabled={props.disableButton}>Выйти из аккаунта</button>
                        </div>
                    </form>
                </section>
            </main>
        </>
    );
};

export default Profile;
