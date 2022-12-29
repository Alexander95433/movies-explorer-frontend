import { Route, Link, Switch, useLocation } from 'react-router-dom';
import headerIcon from '../../../image/header-icon2.svg'
import accountIcon from '../../../image/movies-header-icon-account2.svg'

function Header(props) {
    const location = useLocation();

    return (
                <header className={location.pathname !== '/' ? 'header__background-movies' : 'header__background'} >
                    <img className='header__icon' src={headerIcon} alt='Иконка заголовка'/>
                    <Switch>
                        <Route exact path={'/'}>
                            <nav className='header__authentication'>
                                <li className='header__link-box'><Link className='header__link-registration' to='/signup' >Регистрация</Link></li>
                                <li className='header__link-box-grin'><Link className='header__link-entrance' to='/signin' >Войти</Link></li>
                            </nav>
                        </Route>
                        <Route >
                            <nav className='header__movies'>
                                <li className='header__link-box-movies'> <Link className='header__link-movies' to='/movies'>Фильмы</Link>  </li>
                                <li className='header__link-box-movies'> <Link className='header__link-movies header__link-movies_save-film' to='/saved-movies'>Сохранённые фильмы</Link>  </li>
                                <li className='header__link-box-movies'>
                                    <Link className='header__link-account' to='/profile'>Аккаунт <div className='header__movies-icon-box'> <img className='header__movies-icon' src={accountIcon} alt='Ярлык аккаунта'/></div></Link>
                                </li>
                            </nav>
                            <button className={`header__burger-button ${props.onBurgerHidden ? '' : 'header__burger-button_close'}`} type='button' onClick={props.onBurgerButton} />
                        </Route>
                    </Switch>
                </header>
    );
};

export default Header;
