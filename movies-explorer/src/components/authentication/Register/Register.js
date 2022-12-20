
function Register() {

    function hendleSubmit(evt) {
        evt.preventDefault()
    }

    return (
        <section className="register__">
            <h2 className="register__">Добро пожаловать!</h2>
            <form className="register__" id="profile" name="profile">
                <fieldset className="register__">
                    <label className="register__" for='inputName'>Имя</label>
                    <input className="register__ " id="inputName" type="text" name="profileName" value='Александр' maxlength="30" required></input>
                    
                    <label className="register__ " for='inputEmail'>E-mail</label>
                    <input className="register__ register__" id='inputEmail' type="email" name="email" value='a@gmail.com' maxlength="30" required></input>

                    <label className="register__ " for='inputpassword'>E-mail</label>
                    <input className="register__ " id='inputpassword' type="text" name="password" value='a@gmail.com' maxlength="30" required></input>

                    <button className="register__" type="submit" onClick={hendleSubmit}>Редактировать</button>
                </fieldset>
            </form>
        </section>
    );
};

export default Register;