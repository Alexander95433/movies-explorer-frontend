import { Link } from "react-router-dom";

import accountIcon from '../../../image/movies-header-icon-account.png'

function BurgerMenu(props) {
    return (

        <section className={`burgerMenu__wrapper ${props.onBurgerHidden ? 'burgerMenu__wrapper_hidden' : ''}`}>
            <div className={`burgerMenu__burger ${props.onBurgerHidden ? '' : 'burgerMenu__burger_visable'}`} >
                <nav className="burgerMenu__list">
                    <li className="burgerMenu__list-element"><Link className="burgerMenu__link" to='/' onClick={props.onHendleClickClose}>Главная</Link></li>
                    <li className="burgerMenu__list-element"><Link className="burgerMenu__link" to='/movies'onClick={props.onHendleClickClose}>Фильмы</Link></li>
                    <li className="burgerMenu__list-element"><Link className="burgerMenu__link" to='/saved-movies'onClick={props.onHendleClickClose} >Сохранённые фильмы</Link></li>
                </nav>
                <Link className='burgerMenu__link burgerMenu__link-account' to='/profile' onClick={props.onHendleClickClose}>Аккаунт <div className='burgerMenu__profile-icon-box'>
                        <img className='burgerMenu__icon' src={accountIcon} />
                    </div></Link>
            </div>
        </section>
    );
};

export default BurgerMenu;
