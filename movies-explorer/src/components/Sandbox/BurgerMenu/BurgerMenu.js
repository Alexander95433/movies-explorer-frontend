import { Link } from "react-router-dom";

import accountIcon from '../../../image/movies-header-icon-account.png'

function BurgerMenu(props) {
    return (

        <section className={`burgerMenu__wrapper ${props.onBurgerHidden ? 'burgerMenu__wrapper_hidden' : ''}`}>
            <div className={`burgerMenu__burger ${props.onBurgerHidden ? '' : 'burgerMenu__burger_visable'}`} >
                <nav className="burgerMenu__list">
                    <li className="burgerMenu__list-element"><Link className="burgerMenu__link" to='/'>Главная</Link></li>
                    <li className="burgerMenu__list-element"><Link className="burgerMenu__link" to='/movies'>Фильмы</Link></li>
                    <li className="burgerMenu__list-element"><Link className="burgerMenu__link" to='/saved-movies'>Сохранённые фильмы</Link></li>
                </nav>
                <Link className='burgerMenu__link burgerMenu__link-account' to='/profile'>Аккаунт <div className='burgerMenu__profile-icon-box'>
                        <img className='burgerMenu__icon' src={accountIcon} />
                    </div></Link>
            </div>
        </section>
    );
};

export default BurgerMenu;
