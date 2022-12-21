import { Route, Link, Switch, useLocation } from 'react-router-dom';
import headerIcon from '../../../image/header-icon.png'
import accountIcon from '../../../image/movies-header-icon-account.png'

function Header() {
    const location = useLocation();

    function selectsHidden() {
        if(location.pathname === '/signup') {return true};
        if(location.pathname === '/signin') {return true};
        return false;
    };

    return (
        <div hidden={selectsHidden()}>
            <section className={ location.pathname !== '/' ?  'header__background-movies' : 'header__background'} >
                <img className='header__icon' src={headerIcon} />
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
                                <Link className='header__link-account' to ='/profile'>Аккаунт <div className='header__movies-icon-box'> <img className='header__movies-icon' src={accountIcon} /></div></Link>
                            </li>
                        </nav>
                    </Route>
                </Switch>
            </section>
            </div>
    );
};

export default Header;
