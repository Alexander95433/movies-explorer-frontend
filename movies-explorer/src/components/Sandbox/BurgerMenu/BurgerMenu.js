import { NavLink, Link } from 'react-router-dom';
import accountIcon from '../../../image/movies-header-icon-account2.svg'

function BurgerMenu(props) {

    return (
        <section className={`burger-menu__wrapper ${props.onBurgerHidden ? 'burger-menu__wrapper_hidden' : ''}`}>
            <div className={`burger-menu__burger ${props.onBurgerHidden ? '' : 'burger-menu__burger_visable'}`} >
                <nav className="burger-menu__list">
                    <li className="burger-menu__list-element"><NavLink exact to='/' className={ (isActive) => `burger-menu__link ${isActive ? "burger-menu__link_active" : ""}`} onClick={props.onHendleClickClose}>Главная</NavLink ></li>
                    <li className="burger-menu__list-element"><NavLink to='/movies' className={(isActive ) => `burger-menu__link ${isActive ? "burger-menu__link_active" : ""}`} onClick={props.onHendleClickClose}>Фильмы</NavLink ></li>
                    <li className="burger-menu__list-element"><NavLink to='/saved-movies' className={(isActive ) => `burger-menu__link ${isActive ? "burger-menu__link_active" : ""}`} onClick={props.onHendleClickClose} >Сохранённые фильмы</NavLink ></li>
                </nav>
                <NavLink to='/profile' className={(isActive ) => `burger-menu__link burger-menu__link-account ${isActive ? "burger-menu__link_active" : ""}`}   onClick={props.onHendleClickClose}>Аккаунт <div className='burger-menu__profile-icon-box'>
                    <img className='burger-menu__icon' src={accountIcon} alt='Ярлык аккаунта' />
                </div></NavLink>
            </div>
        </section>
    );
};

export default BurgerMenu;
