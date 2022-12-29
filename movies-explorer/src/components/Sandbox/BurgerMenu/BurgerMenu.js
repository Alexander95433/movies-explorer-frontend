import { Link } from "react-router-dom";

import accountIcon from '../../../image/movies-header-icon-account2.svg'

function BurgerMenu(props) {
    return (

        <section className={`burger-menu__wrapper ${props.onBurgerHidden ? 'burger-menu__wrapper_hidden' : ''}`}>
            <div className={`burger-menu__burger ${props.onBurgerHidden ? '' : 'burger-menu__burger_visable'}`} >
                <nav className="burger-menu__list">
                    <li className="burger-menu__list-element"><Link className="burger-menu__link" to='/' onClick={props.onHendleClickClose}>Главная</Link></li>
                    <li className="burger-menu__list-element"><Link className="burger-menu__link" to='/movies'onClick={props.onHendleClickClose}>Фильмы</Link></li>
                    <li className="burger-menu__list-element"><Link className="burger-menu__link" to='/saved-movies'onClick={props.onHendleClickClose} >Сохранённые фильмы</Link></li>
                </nav>
                <Link className='burger-menu__link burger-menu__link-account' to='/profile' onClick={props.onHendleClickClose}>Аккаунт <div className='burger-menu__profile-icon-box'>
                        <img className='burger-menu__icon' src={accountIcon} alt='Ярлык аккаунта'/>
                    </div></Link>
            </div>
        </section>
    );
};

export default BurgerMenu;
