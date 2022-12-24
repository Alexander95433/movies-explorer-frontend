import Header from "../Sandbox/Header/Header";


function Profile(props) {

    function hendleSubmit(evt) {
        evt.preventDefault()
    }

    return (
        <>
            <Header onBurgerHidden={props.onBurgerMenu} onBurgerButton={props.onHendleButtonBurgerMenu} />

            <section className="profile__background">
                <form className="profile__form" id="profile" name="profile">
                    <fieldset className="profile__form-fieldset">
                        <legend className="profile__title">Привет, Александр!</legend>
                        <label className="profile__label" for='inputName'>Имя</label>
                        <input className="profile__input profile__input_name" id="inputName" type="text" name="profileName" value='Александр' maxlength="30" required></input>

                        <label className="profile__label profile__label_email" for='inputEmail'>E-mail</label>
                        <input className="profile__input" id='inputEmail' type="email" name="email" value='a@gmail.com' maxlength="30" required></input>
                    </fieldset>
                    <div>
                            <button className="profile__button-edit" type="submit" onClick={hendleSubmit}>Редактировать</button>
                            <button className="profile__button-exit" type="button">Выйти из аккаунта</button>
                        </div>
                </form>

            </section>
        </>
    );
};

export default Profile;
