import { Link } from 'react-router-dom'; 
import headerIcon from '../../../image/header-icon.png'

function Header() {
    return (
        <div className='header__background'>
            <img className='header__icon' src={headerIcon} />
            <nav className='header__authentication'>
                <li className='header__link-box'><Link className='header__link-registration'to='#' >Регистрация</Link></li>
                <li className='header__link-box'><Link className='header__link-entrance'to='#' >Войти</Link></li>
            </nav>
        </div>
    );
};

export default Header;
