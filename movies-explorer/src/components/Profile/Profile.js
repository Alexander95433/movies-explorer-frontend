import Header from "../Sandbox/Header/Header";
import useForm from '../Hooks/useForm'


function Profile(props) {
    const { values, handleChange } = useForm();

    function hendleSubmit(evt) {
        evt.preventDefault()
    };

    return (
        <>
            <Header onBurgerHidden={props.onBurgerMenu} onBurgerButton={props.onHendleButtonBurgerMenu} />
            <main className="profile__background" >
                <form className="profile__form" id="profile" name="profile">
                    <fieldset className="profile__form-fieldset">
                        <legend className="profile__title">Привет, Александр!</legend>
                        <label className="profile__label">Имя</label>
                        <input className="profile__input profile__input_name" id="inputName" type="text" name="profileName"
                            onChange={handleChange} value={values.profileName || 'Александр'} maxLength="30" required></input>

                        <label className="profile__label profile__label_email" >E-mail</label>
                        <input className="profile__input" id='inputEmail' type="email" name="email"
                            onChange={handleChange} value={values.email || 'a@email.com'} maxLength="30" required></input>
                    </fieldset>
                    <div className="profile__button-box">
                        <button className="profile__button-edit" type="submit"  onClick={hendleSubmit}>Редактировать</button>
                        <button className="profile__button-exit" type="button">Выйти из аккаунта</button>
                    </div>
                </form>
            </main>
        </>
    );
};

export default Profile;
