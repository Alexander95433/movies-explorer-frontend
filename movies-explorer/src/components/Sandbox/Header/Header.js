import { Link, NavLink} from 'react-router-dom';
import headerIcon from '../../../image/header-icon2.svg'
import accountIcon from '../../../image/movies-header-icon-account2.svg'

function Header(props) {
    return (
        <header className={!props.loggedIn ? 'header__background' : 'header__background-movies'  } >
            <Link to='/'><img className='header__icon' src={headerIcon} alt='Иконка заголовка' /></Link>
            {!props.loggedIn
                ?
                <nav className='header__authentication'>
                    <li className='header__link-box'><Link className='header__link-registration' to='/signup' >Регистрация</Link></li>
                    <li className='header__link-box-grin'><Link className='header__link-entrance' to='/signin' >Войти</Link></li>
                </nav>
                :
                <nav className='header__movies'>
                    <li className='header__link-box-movies'> <NavLink to='/movies' className={ (isActive) => `header__link-movies ${isActive ? "header__link-movies_active" : ""}`}>Фильмы</NavLink>  </li>
                    <li className='header__link-box-movies'> <NavLink to='/saved-movies' className={ (isActive) => `header__link-movies header__link-movies_save-film ${isActive ? "header__link-movies_active" : ""}`}>Сохранённые фильмы</NavLink>  </li>
                    <li className='header__link-box-movies'> <NavLink to='/profile' className={ (isActive) => `header__link-account ${isActive ? "header__link-movies_active" : ""}`}>Аккаунт <div className='header__movies-icon-box'>
                         <img className='header__movies-icon' src={accountIcon} alt='Ярлык аккаунта' /></div></NavLink>
                    </li>
                </nav>}
                {props.loggedIn ? <button className={`header__burger-button ${props.onBurgerHidden ? '' : 'header__burger-button_close'}`} type='button' onClick={props.onBurgerButton}/> : ''}
            
            
        </header>
    );
};

export default Header;
